
WITH style_counts AS (

    SELECT
        athlete_id,
        COUNT(DISTINCT CASE WHEN style = 'Gi' THEN event_id END)    AS gi_events,
        COUNT(DISTINCT CASE WHEN style = 'No Gi' THEN event_id END) AS nogi_events
    FROM "dev"."main_silver"."matches"
    GROUP BY athlete_id

),

ratios AS (

    SELECT
        athlete_id,
        gi_events,
        nogi_events,
        gi_events + nogi_events AS total_events,
        CAST(gi_events AS DOUBLE) / NULLIF(gi_events + nogi_events, 0) AS gi_ratio
    FROM style_counts

)

SELECT
    a.athlete_id,

    CASE
        WHEN gi_ratio IS NULL
            THEN NULL

        WHEN gi_ratio = 1
            THEN 'Gi Specialist'

        WHEN gi_ratio >= 0.6
            THEN 'Mostly Gi'

        WHEN gi_ratio >= 0.4
            THEN 'Balanced'

        WHEN gi_ratio > 0
            THEN 'Mostly No Gi'

        WHEN gi_ratio = 0
            THEN 'No Gi Specialist'

    END AS style_cohort

FROM "dev"."main_silver"."athlete_event_index" a
LEFT JOIN ratios r
    ON a.athlete_id = r.athlete_id

GROUP BY
    a.athlete_id,
    gi_ratio