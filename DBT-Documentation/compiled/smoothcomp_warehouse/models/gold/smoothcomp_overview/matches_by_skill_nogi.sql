
SELECT
    skill,
    count(distinct match_id) as match_count
FROM
    "dev"."main_silver"."matches_adult_nogi"
WHERE skill IS NOT NULL
GROUP BY
    skill
ORDER BY
    count(distinct match_id)