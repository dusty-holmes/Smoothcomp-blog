---
layout: dashboard-page
title: "Explore Recent Events"
permalink: /dashboards/recent-events/
description: Browse recent tournaments from the last 3 months and open a dedicated event dashboard.
toc: false
---

<link rel="stylesheet" href="{{ '/assets/css/recent-event-explorer.css' | relative_url }}">

<section class="dashboard-page">
  <div class="dashboard-header">
    <div>
      <p class="dashboard-kicker">Dashboards</p>
      <h1 class="dashboard-title">{{ page.title }}</h1>
      <p class="dashboard-description">
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

  <section class="dashboard-panel">
    <div class="panel-header">
        <div class="table-controls">
            <label class="search-control">
                <span class="visually-hidden">Search recent events</span>
                <input id="event-search" 
                       type="search"
                       placeholder="Search event or location"
                       autocomplete="off" >
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
    dataRoot: "{{ '/assets/data/recent_event_explorer' | relative_url }}",
    eventSummaryBaseUrl: "{{ '/dashboards/event-summary/' | relative_url }}"
  };
</script>

<script src="{{ '/assets/js/recent-event-explorer.js' | relative_url }}"></script>