---
layout: page
title: Categories
date: 2023-01-01
permalink: /categories/
---

<ul class="category-list">
  {% for category in site.categories %}
    <li>
      <a href="{{ site.baseurl }}/categories/{{ category[0] | slugify }}/">
        {{ category[0] }} ({{ category[1].size }})
      </a>
    </li>
  {% endfor %}
</ul>