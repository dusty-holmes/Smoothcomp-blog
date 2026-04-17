(function () {
  const config = window.eventSummaryConfig || {};
  const eventSummaryRoot =
    config.eventSummaryRoot ||
    "https://smoothcomp-data.s3.us-east-2.amazonaws.com/Summary-Pages/event-summary/";
  const recentEventsPath =
    config.recentEventsPath ||
    "/assets/data/recent_event_explorer/recent_events.json";
  const clubSummaryPath = config.clubSummaryPath || "/dashboards/club-summary/";

  const elements = {
    title: document.getElementById("event-summary-title"),
    subtitle: document.getElementById("event-summary-subtitle"),
    stats: document.getElementById("event-summary-stats"),
    table: document.getElementById("event-summary-table")
  };

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function formatInteger(value) {
    const number = Number(value || 0);
    if (!Number.isFinite(number)) return "—";
    return number.toLocaleString("en-US");
  }

  function getEventId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("event_id");
  }

  function formatDate(value) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }

  function renderMissingEventId() {
    if (elements.title) {
      elements.title.textContent = "Event Summary";
    }

    if (elements.subtitle) {
      elements.subtitle.textContent = "No event_id was provided in the URL.";
    }

    if (elements.stats) {
      elements.stats.innerHTML = "";
    }

    if (elements.table) {
      elements.table.innerHTML = `
        <div class="empty-state">
          Select an event from Recent Events to open its summary dashboard.
        </div>
      `;
    }
  }

  function renderNotFound(eventId) {
    if (elements.title) {
      elements.title.textContent = "Event Not Found";
    }

    if (elements.subtitle) {
      elements.subtitle.textContent = `Could not find data for event_id ${escapeHtml(eventId)}.`;
    }

    if (elements.stats) {
      elements.stats.innerHTML = "";
    }

    if (elements.table) {
      elements.table.innerHTML = `
        <div class="empty-state">
          No event summary file was found for this event.
        </div>
      `;
    }
  }

  function renderStats(stats) {
    if (!elements.stats) return;

    if (!stats) {
      elements.stats.innerHTML = "";
      return;
    }

    elements.stats.innerHTML = `
      <div class="event-overview">
        <div class="event-overview-block event-overview-block-primary">
          <h2 class="event-overview-title">Event Overview</h2>
          <div class="event-overview-kpis">
            <div class="overview-kpi">
              <span class="overview-kpi-label">Total Matches</span>
              <span class="overview-kpi-value">${formatInteger(stats.total_matches)}</span>
              <span class="overview-kpi-label">Total Athletes</span>
              <span class="overview-kpi-value">${formatInteger(stats.total_athletes)}</span>
            </div>
          </div>
        </div>

        <div class="event-overview-grid">
          <section class="event-overview-block">
            <h2 class="event-overview-subtitle">Total Matches by Age</h2>
            <div class="overview-table-wrap">
              <table class="event-overview-table">
                <tbody>
                  <tr>
                    <th>Youth</th>
                    <td>${formatInteger(stats.total_matches_youth)}</td>
                  </tr>
                  <tr>
                    <th>Adult</th>
                    <td>${formatInteger(stats.total_matches_adult)}</td>
                  </tr>
                  <tr>
                    <th>No Label</th>
                    <td>${formatInteger(stats.total_matches_age_na)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section class="event-overview-block">
            <h2 class="event-overview-subtitle">Total Matches by Style</h2>
            <div class="overview-table-wrap">
              <table class="event-overview-table">
                <tbody>
                  <tr>
                    <th>Gi</th>
                    <td>${formatInteger(stats.total_matches_gi)}</td>
                  </tr>
                  <tr>
                    <th>No Gi</th>
                    <td>${formatInteger(stats.total_matches_nogi)}</td>
                  </tr>
                  <tr>
                    <th>No Label</th>
                    <td>${formatInteger(stats.total_matches_style_na)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    `;
  }  

  function renderTable(rows, eventId) {
    if (!elements.table) return;

    if (!Array.isArray(rows) || rows.length === 0) {
      elements.table.innerHTML = `
        <div class="empty-state">
          No club summary rows were found for this event.
        </div>
      `;
      return;
    }

    const bodyHtml = rows
      .map((row) => {
        const clubName = row.club || "—";
        const clubSlug = row.club_slug || "";

        const clubCell = clubSlug
          ? `
            <a class="table-link" href="${clubSummaryPath}?club=${encodeURIComponent(clubSlug)}&event_id=${encodeURIComponent(eventId)}">
              <span class="cell-ellipsis">${escapeHtml(clubName)}</span>
            </a>
          `
          : `
            <span class="cell-ellipsis">${escapeHtml(clubName)}</span>
          `;

        return `
          <tr>
            <td class="col-club" title="${escapeHtml(clubName)}">
              ${clubCell}
            </td>
            <td class="col-center">${formatInteger(row.athlete_count)}</td>
            <td class="col-center">${formatInteger(row.match_count)}</td>
            <td class="col-center">${formatInteger(row.submission_wins)}</td>
            <td class="col-center">${formatInteger(row.decision_wins)}</td>
            <td class="col-center">${formatInteger(row.decision_losses)}</td>
            <td class="col-center">${formatInteger(row.submission_losses)}</td>
            <td class="col-score">${formatInteger(row.score)}</td>
          </tr>
        `;
      })
      .join("");

    elements.table.innerHTML = `
      <div class="table-wrap">
        <table class="event-summary-table">
          <thead>
            <tr>
              <th class="col-club">Club</th>
              <th class="col-center">Athletes</th>
              <th class="col-center">Match<br>Count</th>
              <th class="col-center">Sub<br>Wins</th>
              <th class="col-center">Dec<br>Wins</th>
              <th class="col-center">Dec<br>Losses</th>
              <th class="col-center">Sub<br>Losses</th>
              <th class="col-score">Score</th>
            </tr>
          </thead>
          <tbody>
            ${bodyHtml}
          </tbody>
        </table>
      </div>
    `;
  }

  async function loadRecentEvents() {
    const response = await fetch(recentEventsPath);
    if (!response.ok) {
      throw new Error(`Failed to load recent events metadata: ${response.status}`);
    }
    const payload = await response.json();
    return Array.isArray(payload) ? payload : [];
  }

  async function loadEventSummary(eventId) {
    const response = await fetch(`${eventSummaryRoot}${eventId}_summary.json`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Failed to load event summary: ${response.status}`);
    }

    const payload = await response.json();

    return {
      eventMatchStats: payload?.event_match_stats || null,
      clubSummaries: Array.isArray(payload?.club_summaries) ? payload.club_summaries : []
    };
  }

  async function init() {
    const eventId = getEventId();

    if (!eventId) {
      renderMissingEventId();
      return;
    }

    if (elements.stats) {
      elements.stats.innerHTML = `
        <div class="loading-state">Loading event details…</div>
      `;
    }

    if (elements.table) {
      elements.table.innerHTML = `
        <div class="loading-state">Loading event summary…</div>
      `;
    }

    try {
      const [recentEvents, summaryPayload] = await Promise.all([
        loadRecentEvents(),
        loadEventSummary(eventId)
      ]);

      if (summaryPayload === null) {
        renderNotFound(eventId);
        return;
      }

      const eventMeta = recentEvents.find(
        (event) => String(event.id) === String(eventId)
      );

      if (elements.title) {
        elements.title.textContent = eventMeta?.title || `Event ${eventId}`;
      }

      if (elements.subtitle) {
        const subtitleParts = [];
        if (eventMeta?.date) subtitleParts.push(formatDate(eventMeta.date));
        if (eventMeta?.location) subtitleParts.push(eventMeta.location);
        elements.subtitle.textContent =
          subtitleParts.join(" • ") || `event_id ${eventId}`;
      }

      renderStats(summaryPayload.eventMatchStats);
      renderTable(summaryPayload.clubSummaries, eventId);
    } catch (error) {
      console.error(error);

      if (elements.title) {
        elements.title.textContent = "Event Summary";
      }

      if (elements.subtitle) {
        elements.subtitle.textContent = `event_id ${eventId}`;
      }

      if (elements.stats) {
        elements.stats.innerHTML = "";
      }

      if (elements.table) {
        elements.table.innerHTML = `
          <div class="empty-state">
            Could not load the event summary.
          </div>
        `;
      }
    }
  }

  init();
})();