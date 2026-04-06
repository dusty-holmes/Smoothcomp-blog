const { dataRoot } = window.recentEventExplorerConfig;

document.addEventListener("DOMContentLoaded", () => {
  loadRecentEvents();
});

async function loadRecentEvents() {
  const response = await fetch(`${dataRoot}/recent_events.json`);
  const data = await response.json();
  renderRecentEventsTable(data);
}

function renderRecentEventsTable(data) {
  const container = document.getElementById("recent-events-table");

  let html = `
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Event</th>
          <th>Location</th>
          <th>Matches</th>
        </tr>
      </thead>
      <tbody>
  `;

  data.forEach(row => {
    html += `
      <tr data-event-id="${row.id}">
        <td>${formatDate(row.date)}</td>
        <td>${row.title}</td>
        <td>${row.location ?? ""}</td>
        <td>${row.match_count}</td>
      </tr>
    `;
  });

  html += `
      </tbody>
    </table>
  `;

  container.innerHTML = html;
  attachRecentEventRowHandlers(data);
}

function attachRecentEventRowHandlers(data) {
  const rows = document.querySelectorAll("#recent-events-table tbody tr");

  rows.forEach(rowEl => {
    rowEl.addEventListener("click", async () => {
      rows.forEach(r => r.classList.remove("selected"));
      rowEl.classList.add("selected");

      const eventId = rowEl.dataset.eventId;
      const selectedEvent = data.find(d => String(d.id) === String(eventId));

      console.log("Selected event:", selectedEvent);

      updateSelectedEventLabel(selectedEvent);
      await loadEventSummary(eventId);

      document.getElementById("event-summary-section").scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
}

function updateSelectedEventLabel(eventRow) {
  const label = document.getElementById("selected-event-label");

  if (!eventRow) {
    label.textContent = "Select an event above.";
    return;
  }

  label.textContent = `${eventRow.title} - ${eventRow.location}`;
}

async function loadEventSummary(eventId) {
  const container = document.getElementById("event-summary-table");

  container.innerHTML = "<p>Loading event summary...</p>";

  try {
    const response = await fetch(`${dataRoot}/events/${eventId}_summary.json`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    renderEventSummaryTable(data);
  } catch (error) {
    console.error("Failed to load event summary:", error);
    container.innerHTML = "<p>Unable to load event summary for this event.</p>";
  }
}

function renderEventSummaryTable(data) {
  const container = document.getElementById("event-summary-table");

  if (!data || data.length === 0) {
    container.innerHTML = "<p>No club summary data found for this event.</p>";
    return;
  }

  let html = `
  <div class="table-scroll">
    <table>
      <thead>
        <tr>
          <th>Club</th>
          <th>Athletes</th>
          <th>Match<br>Count</th>
          <th>Sub<br>Wins</th>
          <th>Dec<br>Wins</th>
          <th>Dec<br>Losses</th>
          <th>Sub<br>Losses</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
  `;

  data.forEach(row => {
    html += `
      <tr>
        <td>${row.club ?? ""}</td>
        <td>${row.athlete_count ?? ""}</td>
        <td>${row.match_count ?? ""}</td>
        <td>${row.submission_wins ?? ""}</td>
        <td>${row.decision_wins ?? ""}</td>
        <td>${row.decision_losses ?? ""}</td>
        <td>${row.submission_losses ?? ""}</td>
        <td>${row.score ?? ""}</td>
      </tr>
    `;
  });

  html += `
      </tbody>
    </table>
  `;

  container.innerHTML = html;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit"
  });
}