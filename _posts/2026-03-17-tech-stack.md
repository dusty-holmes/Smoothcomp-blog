---
layout: post
title:  "The Tech Stack: An Overview of The Data Pipeline"
date:   2026-03-17 
categories: python web-scrape dbt matplotlib sql aws Athena Glue
---
## Introduction
There are many steps that go into taking raw data scraped from web pages to the actual plots and insights found on this website.
This post will touch on some of the biggest problems faced as well as the tools used to solve them.

At a high level, the main tasks to solve are:
* **Collecting Raw Data** from [Smoothcomp](https://smoothcomp.com/en) in an automated and organized way
* **Parsing web pages** into records that fit in a table or database
* **Storing records** in the cloud in a usable format 
* **Transforming raw records** into intermediate and aggregated and summarized tables
* **Importing and Plotting** summarized data to understand data and create actionable insights
* **Delivering Results** using this blog


## Collecting Raw Data

Two primary web pages to scrape are past events and match results.

Results are filtered to only include grappling sports, only take place in the USA, and limited to the year 2017 and beyond.
To make search results easier to organize, one month is searched at a time and saved with timestamp and pagination for months with more than 40 events.
The HTML pages of all search results are saved.

From each event card, we gather
* The name and ID of the event
* The location (as it's written)
* The date of event
* The URL to the event itself 

After scraping every event, the matches from the event are scraped. Although each event has a large amount of data, only the list of matches from the "Matches" 
tab is saved.


## Parsing web pages
## Storing records
## Transforming raw records
## Importing and Plotting
## Delivering Results
