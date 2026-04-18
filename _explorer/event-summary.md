---
layout: explorer-page
title: "Event Summary"
permalink: /explorer/event-summary/
description: Event-level club summary table for a selected event.
toc: false
---

<link rel="stylesheet" href="{{ '/assets/css/event-summary.css' | relative_url }}">

<section class="event-summary-page">
  <div class="event-summary-topbar">
    <a class="back-link" href="{{ '/explorer/recent-events/' | relative_url }}">
      ← Back to Recent Events
    </a>
  </div>

  <header class="event-summary-header">
    <div>
      <h1 id="event-summary-title" class="event-summary-title">Event Summary</h1>
      <p id="event-summary-subtitle" class="event-summary-subtitle">
        Select an event to view its club summary.
      </p>
    </div>
    <div class="event-selector-shell">
      <select id="event-selector" class="event-selector">
        <option value="">Choose an event</option>
      </select>
    </div>
  </header>

  <section id="event-summary-stats" class="event-summary-stats-panel" aria-live="polite"></section>

  <section class="event-summary-panel">
    <div id="event-summary-table" class="table-shell" aria-live="polite"></div>
  </section>
</section>

<script>
  window.eventSummaryConfig = {
    recentEventsPath: "https://smoothcomp-data.s3.us-east-2.amazonaws.com/Summary-Pages/recent-events/recent_events.json",
    eventSummaryRoot: "https://smoothcomp-data.s3.us-east-2.amazonaws.com/Summary-Pages/event-summary/",
    eventSummaryPagePath: "{{ '/explorer/event-summary/' | relative_url }}",
    clubSummaryPath: "{{ '/explorer/club-summary/' | relative_url }}"
  };
</script>

<script src="{{ '/assets/js/event-summary.js' | relative_url }}"></script>