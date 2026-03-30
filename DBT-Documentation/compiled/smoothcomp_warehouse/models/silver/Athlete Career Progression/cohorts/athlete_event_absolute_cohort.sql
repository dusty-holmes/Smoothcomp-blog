
WITH abs_counts AS (

    SELECT
        athlete_id,
        COUNT(distinct event_id) AS absolute_events
    FROM "dev"."main_silver"."matches"
    WHERE skill = 'Absolute'
    GROUP BY athlete_id
)

SELECT
    a.athlete_id,
    CASE
        WHEN absolute_events IS NULL THEN 'Never'
        WHEN absolute_events = 1     THEN 'Once'
        WHEN absolute_events <= 3    THEN '2-3'
        ELSE 'More than 3'
    END AS absolute_cohort
FROM "dev"."main_silver"."athlete_event_index" a
LEFT JOIN abs_counts b
    ON a.athlete_id = b.athlete_id
GROUP BY
    a.athlete_id,
    absolute_events