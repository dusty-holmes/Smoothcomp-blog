---
layout: explorer-page
title: "Club Summary"
permalink: /explorer/club-summary/
description: Club-level competitor summary table for a selected club.
toc: false
---

<link rel="stylesheet" href="{{ '/assets/css/club-summary.css' | relative_url }}">

<section class="club-summary-page">
  <div class="club-summary-topbar">
    <a class="back-link" href="{{ '/explorer/recent-events/' | relative_url }}">
      ← Back to Recent Events
    </a>
  </div>

  <header class="club-summary-header">
    <p class="club-summary-kicker">Explorer</p>
    <h1 id="club-summary-title" class="club-summary-title">Club Summary</h1>
    <p id="club-summary-subtitle" class="club-summary-subtitle">
      Loading selected club...
    </p>
  </header>

  <section class="club-summary-panel">
    <div id="club-summary-table" class="table-shell" aria-live="polite"></div>
  </section>
</section>

<script>
  window.clubSummaryConfig = {
    clubSummaryRoot: "https://smoothcomp-data.s3.us-east-2.amazonaws.com/Summary-Pages/club-summary/",
    eventSummaryPath: "{{ '/explorer/event-summary/' | relative_url }}"
  };
</script>

<script src="{{ '/assets/js/club-summary.js' | relative_url }}"></script>