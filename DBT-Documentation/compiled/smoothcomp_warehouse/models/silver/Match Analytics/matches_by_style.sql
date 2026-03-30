
SELECT
    event_month,
    style,
    count(distinct match_id) as match_count
FROM "dev"."main_silver"."matches" m
LEFT JOIN 
    "dev"."main_silver"."events" e
    on e.id = m.event_id
WHERE
    style <> 'NA'
GROUP BY
    event_month,
    style
ORDER BY
    event_month,
    style