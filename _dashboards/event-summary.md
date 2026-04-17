---
layout: dashboard-page
title: "Event Summary"
permalink: /dashboards/event-summary/
description: Event-level club summary table for a selected recent event.
toc: false
---

<link rel="stylesheet" href="{{ '/assets/css/event-summary.css' | relative_url }}">

<section class="event-summary-page">
  <div class="event-summary-topbar">
    <a class="back-link" href="{{ '/dashboards/recent-events/' | relative_url }}">
      ← Back to Recent Events
    </a>
  </div>

  <header class="event-summary-header">
    <p class="event-summary-kicker">Dashboards</p>
    <h1 id="event-summary-title" class="event-summary-title">Event Summary</h1>
    <p id="event-summary-subtitle" class="event-summary-subtitle">
      Loading selected event...
    </p>
  </header>

  <section id="event-summary-stats" class="event-summary-stats-panel" aria-live="polite"></section>

  <section class="event-summary-panel">
    <div id="event-summary-table" class="table-shell" aria-live="polite"></div>
  </section>
</section>

<script>
  window.eventSummaryConfig = {
    recentEventsPath: "{{ '/assets/data/recent_event_explorer/recent_events.json' | relative_url }}",
    eventSummaryRoot: "https://smoothcomp-data.s3.us-east-2.amazonaws.com/Summary-Pages/event-summary/",
    clubSummaryPath: "{{ '/dashboards/club-summary/' | relative_url }}"
  };
</script>

<script src="{{ '/assets/js/event-summary.js' | relative_url }}"></script>