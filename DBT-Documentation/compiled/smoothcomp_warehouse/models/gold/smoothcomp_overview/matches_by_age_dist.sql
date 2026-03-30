
WITH match_counts as (
    SELECT
        age,
        style,
        count(distinct match_id) as match_count
    FROM "dev"."main_silver"."matches" m
    WHERE
        age   <> 'NA' and 
        style <> 'NA'
    GROUP BY
        age,
        style
    ORDER BY
        age,
        style
),
totals AS (
    SELECT
        age,
        style,
        match_count,
        SUM(match_count) OVER (PARTITION BY age) AS age_total
    FROM match_counts
)
SELECT
    age,
    style,
    match_count,
    match_count * 1.0 / age_total AS pct_within_age
FROM totals
ORDER BY
    CASE age
        WHEN 'Youth' THEN 1
        WHEN 'Adult' THEN 2
        WHEN 'Master' THEN 3
    END,
    style