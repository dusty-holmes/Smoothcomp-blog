
WITH monthly_counts AS (
    SELECT
        event_month,
        COUNT(DISTINCT id) AS event_count,
        sum(match_count)   AS match_count
    FROM "dev"."main_silver"."events"
    GROUP BY 1
),

monthly_rolling AS (
    SELECT
        event_month,
        event_count,
        match_count,
        AVG(event_count) OVER (
            ORDER BY event_month
            ROWS BETWEEN 11 PRECEDING AND CURRENT ROW
        ) AS event_rolling_avg_12mo,
        AVG(match_count) OVER (
            ORDER BY event_month
            ROWS BETWEEN 11 PRECEDING AND CURRENT ROW
        ) AS match_rolling_avg_12mo
    FROM monthly_counts
)

SELECT *
FROM monthly_rolling
ORDER BY event_month