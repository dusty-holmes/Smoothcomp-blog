
WITH aggregate AS (

    SELECT
        style_cohort,
        count(DISTINCT e.athlete_id) athlete_count,

        /* divide by 2 for two competitors per match */
        SUM(total_matches) / 2 AS total_matches,
        SUM(wins) / 2 AS wins,
        SUM(submission_wins) / 2 AS submission_wins,
        SUM(losses) / 2 AS losses,
        SUM(submission_losses) / 2 AS submission_losses

    FROM "dev"."main_silver"."athlete_event_index" e
    JOIN "dev"."main_silver"."athlete_event_style_cohort" c
        ON e.athlete_id = c.athlete_id

    WHERE
        style_cohort IS NOT NULL
        AND TRIM(style_cohort) <> ''

    GROUP BY
        style_cohort
)

SELECT
    style_cohort,
    athlete_count,

    
    ROUND(total_matches, 0)
 AS total_matches,
    
    ROUND(CAST(wins AS DOUBLE) / total_matches, 3)
 AS win_rate,
    
    ROUND(CAST(submission_wins AS DOUBLE) / total_matches, 3)
 AS submission_win_rate,
    
    ROUND(CAST(submission_losses AS DOUBLE) / total_matches, 3)
 AS submission_loss_rate

FROM aggregate
ORDER BY
    athlete_count