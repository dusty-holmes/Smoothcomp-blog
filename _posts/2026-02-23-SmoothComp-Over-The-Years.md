---
layout: post
title:  "1. An Overview of Smoothcomp"
date:   2026-02-23 
categories: jekyll update
---
# Smoothcomp Over The Years

## Introduction
Smoothcomp has become one of the primary platforms for organizing and registering Brazilian Jiu-Jitsu competitions around the world. Over more than a decade of operation, 
it has facilitated tens of thousands of events and millions of individual matches across gi, no-gi, youth, adult, and masters.

That scale makes it more than just a registration tool — it’s one of the best and most complete records of the modern competitive jiu-jitsu.

In this project, I explore what that record actually looks like. 
How has match volume changed over time? 
How many athletes are competing each year? 
Are certain regions or federations growing faster than others?
What does the competitive landscape really look like beneath the surface?

This first post is an overview of the data itself — a high-level look at trends, scale, and structure.
Later posts will attempt to answer different questions like 
how much does competing improve results,
can we rank athletes with ELO in the same way chess ranks players,
and can we do better than ELO,
and hopefully much more.

All analysis is based on publicly available historical match data.  While I made every effort to include all recorded events, a small number are excluded due to limited visibility or 
incomplete results, including private events and matches without a recorded winner.

---

## How Many Events Are There?

![Monthly Volume]({{ '/assets/images/2026-02-23/fig01-total-Match-Overview.png' | relative_url }})

The chart shows the number of events by month, average number of matches per event, as well as a 12 month rolling averages to show the overall trend. Aside from the pandemic years, 
the number of competitions have increased steadily over time reaching over 80 competitions a month. The average number of matches per event usually sits around 400 matches, but has 
been steadily declining over the past few years.  This could be from an increase in new competitions and not from existing events getting smaller.  There was a spike from 2021-2022 in event
size, averaging closer to 500 matches per event. This bump up in size directly follows the dip in number of events in 2020-2021.  This suggests that many of the larger events were the first
to start offering events again and athletes were eager to get back on the mats!

**Takeaway:**
Brazilian Jiu-Jitsu has seen steady growth for almost a decade. Today athletes have many more events and opportunities for matches, and it only looks like it will continue to grow 
going forward. 

---

## What Skill Levels are Most Popular?

![Skill Distribution]({{ '/assets/images/2026-02-23/fig02-matches-by-skill.png' | relative_url }})

**NOTE:** This visualization includes only adult divisions. Youth belt and skill classifications are structured differently and have proven difficult to standardize reliably 
within the dataset (I'm working on it).

Matches on Smoothcomp are heavily biased towards lower skill levels.  For no-gi matches, each jump in skill level approximately cuts the total number of matches in half.
There appears to be a bigger drop off after blue belt in gi, but if purple, brown, and black were all grouped like advanced is for no-gi, the numbers would be more consistent.

The absolute division appears to make up a larger share of No-Gi matches than Gi matches, which may reflect stylistic differences between the formats. Without the friction and grip advantages of the Gi, 
No-Gi tends to reward pace, scrambling ability, and overall athleticism, potentially lowering the barrier for competitors to feel competitive across weight classes. In contrast, the Gi’s emphasis on 
grips and positional control may amplify the technical advantages of size and experience, making weight classes more strategically important. Leg locks may also play a part in neutralizing any advantage that size gives.

**Takeaway:**
Most competitions favor beginner skill levels.  If you are new and looking to compete, you will be competing alongside many peers at the same experience level. If the goal 
is a long competitive career with many matches, start early in beginner divisions when brackets are large and matches are easy to come by. 

Further analysis of the absolute division is necessary to understand the increaded popularity in no-gi. A breakdown of weight and skill level of absolute athletes in gi vs no-gi could shed some light on how big (or small)
size differences in competitors plays in gi vs no-gi matches. 

## Who are the biggest Federations?

![Skill Distribution]({{ '/assets/images/2026-02-23/fig03-top10-federations.png' | relative_url }})

A federation is an organizing body or promotion that manages and sanctions multiple grappling events under a shared brand, rule set, and competitive structure.
Over half of all events and matches are hosted by federations. **Grappling Industries** is by far the largest federation, hosting over 800 events in 10 years and holds the 
4th largest size of events.  **NAGA** holds the second most events and has events of very similar sizes to grappling industries. **Newbreedbjj** has the third most 
number of events, but doesn't crack the top 10 in terms of event size.

**ADCC** is a bit newer to Smoothcomp; it began hosting **ADCC** events starting in 2023. **ADCC** only hosts about 1 event per month, but the events are by far the largest 
Smoothcomp events. Excluding **ADCC** and **subleague** as front-runners, most of the larger events start to cluster around 400-600 matches per event, which appears to be about 
as many matches as will fit into a single day competition.

**Takeaway:**
Thankfully the federations with the most number of events tend to have some of the biggest events.  For many grapplers looking to compete in or watch as many matches as possible, 
these larger federations are a great option.

Keep in mind that a large number of total matches in an event doesn't mean a large number of matches *per athlete* and many events. **ADCC**, for example, will only 
give you many matches if you keep winning.

---

## How Popular Are Youth and Master Divisions? 

![Age Distribution]({{ '/assets/images/2026-02-23/fig04-matches-by-age-style.png' | relative_url }})

In youth and masters divisions, the Gi remains more popular, making up 60% and 58% of total matches for youth and masters divisions, respectively.  The adult division tips the scale slightly
in favor of no-gi, composing 52% of total matches.

### Is the Gi Dying?

![Matches by Style]({{ '/assets/images/2026-02-23/fig05-matches-by-style-month.png' | relative_url }})

Nope, it sure aint.  The gi has remained slightly more popular than no-gi since the beginning, but that gap has narrowed in the last year. This chart includes all matches regardless
of age. The previous chart showed that no-gi is slightly more popular than gi in the adult division.

---

## Summary

Brazilian Jiu-Jitsu competition has grown steadily year over year, reaching more than 80 events and 30,000 matches per month by 2026, with no clear signs of slowing. Match distribution is heavily concentrated in beginner divisions, with total match counts declining consistently at each higher belt level. A relatively small number of major federations drive a significant share of this growth — organizations like **Grappling Industries** have hosted hundreds of events, while large **ADCC** tournaments can generate over 1,600 matches in a single competition.

Adult divisions account for the largest portion of total matches, with youth divisions not far behind, while masters divisions represent only a small fraction of overall participation. And despite frequent claims to the contrary, the Gi is not disappearing — it remains more popular than No-Gi, though the gap is narrowing as No-Gi continues to grow rapidly.