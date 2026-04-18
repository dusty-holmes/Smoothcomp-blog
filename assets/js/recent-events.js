(function () {
  const config = window.recentEventExplorerConfig || {};
  const recentEventsPath =
    config.recentEventsPath ||
    "https://smoothcomp-data.s3.us-east-2.amazonaws.com/Summary-Pages/recent-events/recent_events.json";

  const baseurl = config.baseurl || "";
  const eventSummaryBaseUrl = config.eventSummaryBaseUrl || `${baseurl}/explorer/event-summary/`;

  console.log("recentEventExplorerConfig:", config);
  console.log("baseurl:", baseurl);
  console.log("eventSummaryBaseURL:", eventSummaryBaseUrl);

  const elements = {
    table: document.getElementById("recent-events-table"),
    search: document.getElementById("event-search"),
    federationFilter: document.getElementById("event-federation-filter"),
    sort: document.getElementById("event-sort"),
    kpiEvents: document.getElementById("kpi-events"),
    kpiMatches: document.getElementById("kpi-matches")
  };

  const state = {
    allEvents: [],
    filteredEvents: []
  };

  function formatInteger(value) {
    const number = Number(value || 0);
    if (!Number.isFinite(number)) return "—";
    return number.toLocaleString("en-US");
  }

  function formatDate(value) {
    if (!value) return "—";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function getEventExplorerUrl(eventId) {
    return `${eventSummaryBaseUrl}?event_id=${encodeURIComponent(eventId)}`;
  }

  function buildSearchText(event) {
    return [
      event.title,
      event.location,
      event.federation,
      formatDate(event.date)
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
  }

  function updateKpis(events) {
    const totals = events.reduce(
      (acc, event) => {
        acc.events += 1;
        acc.matches += Number(event.match_count || 0);
        return acc;
      },
      { events: 0, matches: 0 }
    );

    if (elements.kpiEvents) {
      elements.kpiEvents.textContent = formatInteger(totals.events);
    }

    if (elements.kpiMatches) {
      elements.kpiMatches.textContent = formatInteger(totals.matches);
    }
  }

  function sortEvents(events, sortValue) {
    const sorted = [...events];

    sorted.sort((a, b) => {
      switch (sortValue) {
        case "event_date_asc":
          return new Date(a.date) - new Date(b.date);

        case "matches_desc":
          return Number(b.match_count || 0) - Number(a.match_count || 0);

        case "event_name_asc":
          return String(a.title || "").localeCompare(String(b.title || ""));

        case "event_date_desc":
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

    return sorted;
  }

  function populateFederationFilter(events) {
    if (!elements.federationFilter) return;

    const previousValue = elements.federationFilter.value || "all";

    const federations = [
      ...new Set(
        events
          .map((event) => (event.federation || "").trim())
          .filter(Boolean)
      )
    ].sort((a, b) => a.localeCompare(b));

    elements.federationFilter.innerHTML = `
      <option value="all">All</option>
      ${federations
        .map(
          (federation) => `
          <option value="${escapeHtml(federation)}">
            ${escapeHtml(federation.toUpperCase())}
          </option>
        `
        )
        .join("")}
    `;

    const stillExists = federations.some(
      (federation) => federation === previousValue
    );

    elements.federationFilter.value = stillExists ? previousValue : "all";
  }

  function renderTable() {
    if (!elements.table) return;

    if (!state.filteredEvents.length) {
      elements.table.innerHTML = `
        <div class="empty-state">
          No events matched your filters.
        </div>
      `;
      return;
    }

    const rowsHtml = state.filteredEvents
      .map((event) => {
        const eventUrl = getEventExplorerUrl(event.id);

        return `
          <tr>
            <td class="date-cell">${escapeHtml(formatDate(event.date))}</td>
            <td class="event-name-cell">
              <a class="event-link cell-ellipsis"
                href="${eventUrl}"
                title="${escapeHtml(event.title || "Unnamed Event")}">
                ${escapeHtml(event.title || "Unnamed Event")}
              </a>
            </td>
            <td class="location-cell">
              <span class="cell-ellipsis" title="${escapeHtml(event.location || "—")}">
                ${escapeHtml(event.location || "—")}
              </span>
            </td>
            <td class="federation-cell">
              ${escapeHtml(String(event.federation || "—").toUpperCase())}
            </td>
            <td class="numeric matches-cell">${formatInteger(event.match_count)}</td>
          </tr>
        `;
      })
      .join("");

    elements.table.innerHTML = `
      <div class="table-wrap">
        <table class="explorer-table explorer-table--recent-events">
          <thead>
            <tr>
              <th>Date</th>
              <th>Event</th>
              <th>Location</th>
              <th>Federation</th>
              <th class="numeric">Matches</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    `;
  }

  function filterEvents() {
    const query = elements.search
      ? (elements.search.value || "").trim().toLowerCase()
      : "";
    const federationValue = elements.federationFilter
      ? elements.federationFilter.value
      : "all";
    const sortValue = elements.sort
      ? elements.sort.value
      : "event_date_desc";

    const filtered = state.allEvents.filter((event) => {
      const matchesSearch = !query || buildSearchText(event).includes(query);
      const matchesFederation =
        federationValue === "all" || (event.federation || "") === federationValue;

      return matchesSearch && matchesFederation;
    });

    state.filteredEvents = sortEvents(filtered, sortValue);
    updateKpis(state.filteredEvents);
    renderTable();
  }

  async function loadEvents() {
    const response = await fetch(recentEventsPath);

    if (!response.ok) {
      throw new Error(`Failed to load recent events: ${response.status}`);
    }

    const payload = await response.json();
    return Array.isArray(payload) ? payload : [];
  }

  function bindControls() {
    if (elements.search) {
      elements.search.addEventListener("input", filterEvents);
    }

    if (elements.federationFilter) {
      elements.federationFilter.addEventListener("change", filterEvents);
    }

    if (elements.sort) {
      elements.sort.addEventListener("change", filterEvents);
    }
  }

  async function init() {
    try {
      if (elements.table) {
        elements.table.innerHTML =
          `<div class="loading-state">Loading recent events…</div>`;
      }

      state.allEvents = await loadEvents();
      populateFederationFilter(state.allEvents);
      bindControls();
      filterEvents();
    } catch (error) {
      console.error(error);

      if (elements.table) {
        elements.table.innerHTML = `
          <div class="empty-state">
            Could not load recent events.
          </div>
        `;
      }
    }
  }

  init();
})();