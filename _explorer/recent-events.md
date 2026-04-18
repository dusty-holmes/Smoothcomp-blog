---
layout: explorer-page
title: "Explore Recent Events"
permalink: /explorer/recent-events/
description: Browse recent tournaments from the last 3 months and open a dedicated event explorer.
toc: false
---

<link rel="stylesheet" href="{{ '/assets/css/recent-events.css' | relative_url }}">

<section class="explorer-page">
  <div class="explorer-header">
    <div>
      <p class="explorer-kicker">Explorer</p>
      <h1 class="explorer-title">{{ page.title }}</h1>
      <p class="explorer-description">
      </p>
    </div>
  </div>

  <section class="kpi-grid kpi-grid--compact" aria-label="Recent event summary metrics">
    <article class="kpi-card">
      <div class="kpi-label">Events</div>
      <div id="kpi-events" class="kpi-value">—</div>
    </article>

    <article class="kpi-card">
      <div class="kpi-label">Matches</div>
      <div id="kpi-matches" class="kpi-value">—</div>
    </article>
  </section>

  <section class="explorer-panel">
    <div class="panel-header">
      <div class="table-controls">
        <label class="search-control">
          <span class="visually-hidden">Search recent events</span>
          <input id="event-search"
                 type="search"
                 placeholder="Search event or location"
                 autocomplete="off">
        </label>

        <label class="filter-control">
          <span>Federation</span>
          <select id="event-federation-filter">
            <option value="all">All</option>
          </select>
        </label>

        <label class="sort-control">
          <span>Sort</span>
          <select id="event-sort">
            <option value="event_date_desc">Newest first</option>
            <option value="event_date_asc">Oldest first</option>
            <option value="matches_desc">Most matches</option>
            <option value="event_name_asc">Event name A–Z</option>
          </select>
        </label>
      </div>
    </div>

    <div id="recent-events-table" class="table-shell" aria-live="polite"></div>
  </section>
</section>

<script>
  window.recentEventExplorerConfig = {
    recentEventsPath: "https://smoothcomp-data.s3.us-east-2.amazonaws.com/Summary-Pages/recent-events/recent_events.json",
    eventSummaryBaseUrl: "{{ '/explorer/event-summary/' | relative_url }}"
  };
</script>

<script src="{{ '/assets/js/recent-events.js' | relative_url }}"></script>