(function () {
  const config = window.clubSummaryConfig || {};
  const clubSummaryRoot =
    config.clubSummaryRoot ||
    "https://smoothcomp-data.s3.us-east-2.amazonaws.com/Summary-Pages/club-summary/";
  const eventSummaryPath = config.eventSummaryPath || "/dashboards/event-summary/";

  const elements = {
    title: document.getElementById("club-summary-title"),
    subtitle: document.getElementById("club-summary-subtitle"),
    table: document.getElementById("club-summary-table")
  };

  function getLinkedEventId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("event_id");
  }

  function scrollToEventGroup(eventId) {
    if (!eventId) return;

    const target = document.getElementById(`event-${eventId}`);
    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
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

  function formatInteger(value) {
    const number = Number(value || 0);
    if (!Number.isFinite(number)) return "—";
    return number.toLocaleString("en-US");
  }

  function displayText(value) {
    const text = String(value ?? "").trim();
    return text || "—";
  }

  function getClubSlug() {
    const params = new URLSearchParams(window.location.search);
    return params.get("club");
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

  function renderMissingClubSlug() {
    if (elements.title) {
      elements.title.textContent = "Club Summary";
    }

    if (elements.subtitle) {
      elements.subtitle.textContent = "No club slug was provided in the URL.";
    }

    if (elements.table) {
      elements.table.innerHTML = `
        <div class="empty-state">
          Select a club to open its summary dashboard.
        </div>
      `;
    }
  }

  function renderNotFound(clubSlug) {
    if (elements.title) {
      elements.title.textContent = "Club Not Found";
    }

    if (elements.subtitle) {
      elements.subtitle.textContent = `Could not find data for club ${escapeHtml(clubSlug)}.`;
    }

    if (elements.table) {
      elements.table.innerHTML = `
        <div class="empty-state">
          No club summary file was found for this club.
        </div>
      `;
    }
  }

  function groupByEvent(rows) {
    const groups = [];
    const groupMap = new Map();

    for (const row of rows) {
      const eventKey = `${row.id}__${row.date}__${row.title}`;

      if (!groupMap.has(eventKey)) {
        const group = {
          key: eventKey,
          eventId: row.id,
          date: row.date,
          title: row.title,
          athletes: []
        };
        groupMap.set(eventKey, group);
        groups.push(group);
      }

      groupMap.get(eventKey).athletes.push(row);
    }

    return groups;
  }

  function renderGroupedEvents(rows) {
    if (!elements.table) return;

    if (!Array.isArray(rows) || rows.length === 0) {
      elements.table.innerHTML = `
        <div class="empty-state">
          No competitor summary rows were found for this club.
        </div>
      `;
      return;
    }

    const groups = groupByEvent(rows);

    const groupsHtml = groups
      .map((group) => {
        const athleteRowsHtml = group.athletes
          .map((row) => {
            return `
              <tr>
                <td class="col-name" title="${escapeHtml(displayText(row.name))}">
                  <span class="cell-ellipsis">${escapeHtml(displayText(row.name))}</span>
                </td>
                <td class="col-age" title="${escapeHtml(displayText(row.age))}">
                  <span class="cell-ellipsis">${escapeHtml(displayText(row.age))}</span>
                </td>
                <td class="col-style" title="${escapeHtml(displayText(row.style))}">
                  <span class="cell-ellipsis">${escapeHtml(displayText(row.style))}</span>
                </td>
                <td class="col-skill" title="${escapeHtml(displayText(row.skill))}">
                  <span class="cell-ellipsis">${escapeHtml(displayText(row.skill))}</span>
                </td>
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

        return `
          <section class="event-group" id="event-${escapeHtml(group.eventId)}">
            <div class="event-group-header">
              <div class="event-group-meta">
                <h2 class="event-group-title">
                  <a class="event-link" href="${eventSummaryPath}?event_id=${encodeURIComponent(group.eventId)}">
                    ${escapeHtml(group.title || `Event ${group.eventId}`)}
                  </a>
                </h2>
                <p class="event-group-date">${escapeHtml(formatDate(group.date) || "—")}</p>
              </div>
            </div>

            <div class="table-wrap">
              <table class="club-summary-table">
                <thead>
                  <tr>
                    <th class="col-name">Name</th>
                    <th class="col-age">Age</th>
                    <th class="col-style">Style</th>
                    <th class="col-skill">Skill</th>
                    <th class="col-center">Match<br>Count</th>
                    <th class="col-center">Sub<br>Wins</th>
                    <th class="col-center">Dec<br>Wins</th>
                    <th class="col-center">Dec<br>Losses</th>
                    <th class="col-center">Sub<br>Losses</th>
                    <th class="col-score">Score</th>
                  </tr>
                </thead>
                <tbody>
                  ${athleteRowsHtml}
                </tbody>
              </table>
            </div>
          </section>
        `;
      })
      .join("");

    elements.table.innerHTML = groupsHtml;
  }

  async function loadClubSummary(clubSlug) {
    const response = await fetch(`${clubSummaryRoot}${encodeURIComponent(clubSlug)}.json`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Failed to load club summary: ${response.status}`);
    }

    const payload = await response.json();

    return {
      clubName: payload?.club_name || null,
      matches: Array.isArray(payload?.matches) ? payload.matches : []
    };
  }

  async function init() {
    const clubSlug = getClubSlug();

    if (!clubSlug) {
      renderMissingClubSlug();
      return;
    }

    if (elements.table) {
      elements.table.innerHTML = `
        <div class="loading-state">Loading club summary…</div>
      `;
    }

    try {
      const summary = await loadClubSummary(clubSlug);

      if (summary === null) {
        renderNotFound(clubSlug);
        return;
      }

      if (elements.title) {
        elements.title.textContent = summary.clubName || "Club Summary";
      }

      if (elements.subtitle) {
        const athleteCount = summary.matches.length;
        const totalMatches = summary.matches.reduce(
          (sum, row) => sum + Number(row.match_count || 0),
          0
        );

        elements.subtitle.textContent =
          `${formatInteger(athleteCount)} athlete rows • ${formatInteger(totalMatches)} matches`;
      }

      renderGroupedEvents(summary.matches);
      scrollToEventGroup(getLinkedEventId());
    } catch (error) {
      console.error(error);

      if (elements.title) {
        elements.title.textContent = "Club Summary";
      }

      if (elements.subtitle) {
        elements.subtitle.textContent = `club ${clubSlug}`;
      }

      if (elements.table) {
        elements.table.innerHTML = `
          <div class="empty-state">
            Could not load the club summary.
          </div>
        `;
      }
    }
  }

  init();
})();