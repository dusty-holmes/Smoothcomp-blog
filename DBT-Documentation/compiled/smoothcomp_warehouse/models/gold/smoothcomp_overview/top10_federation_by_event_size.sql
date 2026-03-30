
SELECT
    federation,
    COUNT(DISTINCT id) as event_count,
    sum(match_count) / COUNT(DISTINCT id) as avg_matches_per_event
FROM
    "dev"."main_silver"."events"
WHERE
    federation <> 'None'
GROUP BY
    federation
HAVING
    COUNT(DISTINCT id) >= 20
ORDER BY
    sum(match_count) / COUNT(DISTINCT id) desc
LIMIT 10