---
layout: page
title: Categories
date: 2023-01-01
permalink: /categories/
order: 6
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

[Explore DBT Model Documentation Here](/Smoothcomp-blog/DBT-Documentation/index.html)