
WITH base AS (
    SELECT
        event_month,
        style,
        sum(match_count) match_count
    FROM "dev"."main_silver"."matches_by_style"
    GROUP BY 1, 2
)

SELECT
    event_month,
    style,
    match_count,
    AVG(match_count) OVER (
        PARTITION BY style
        ORDER BY event_month
        ROWS BETWEEN 11 PRECEDING AND CURRENT ROW
    ) AS rolling_12mo_avg
FROM base
ORDER BY style, event_month