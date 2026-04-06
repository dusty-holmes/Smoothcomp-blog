---
layout: post
title:  "Explore Recent Events"
date:   2026-04-02 
categories: explorer events-summary club-summary
---

Below are the recent events from the previous 3 months.

---

<link rel="stylesheet" href="{{ '/assets/css/recent-event-explorer.css' | relative_url }}">

<div id="recent-events-table"></div>


<div id="event-summary-section">
</div>

## Event Club Summary
### Scoring System
Score is calculated per match using the following rules:

- **+2** — Win by submission  
- **+1** — Win by decision  
- **-1** — Loss by decision  
- **-2** — Loss by submission

<div id="selected-event-label" class="event-summary-title">Select an event above.</div>
<div id="event-summary-table"></div>

<script>
  window.recentEventExplorerConfig = {
    dataRoot: "{{ '/assets/data/recent_event_explorer' | relative_url }}"
  };
</script>

<script src="{{ '/assets/js/recent-event-explorer.js' | relative_url }}"></script>

---
