
SELECT
    prior_matches_cohort,

    COUNT(*) / 2 AS total_matches,                  -- divide by 2 to account for double rows
    SUM(win) / 2 AS wins,
    SUM(submission_win) / 2 AS submission_wins,
    SUM(loss) / 2 AS losses,
    SUM(submission_loss) / 2 AS submission_losses,

    CAST(SUM(win) / 2 AS DOUBLE) / (COUNT(*) / 2) AS win_rate,
    CAST(SUM(submission_win) / 2 AS DOUBLE) / (COUNT(*) / 2) AS submission_win_rate,
    CAST(SUM(submission_loss) / 2 AS DOUBLE) / (COUNT(*) / 2) AS submission_loss_rate

FROM (
    SELECT
        athlete_id,
        match_index,
        win,
        submission_win,
        loss,
        submission_loss,

        CASE
            WHEN prior_matches_180 < 1 THEN '0'
            WHEN prior_matches_180 = 1 THEN '1'
            WHEN prior_matches_180 <= 3 THEN '2-3'
            WHEN prior_matches_180 <= 7 THEN '4-7'
            WHEN prior_matches_180 <= 15 THEN '8-15'
            WHEN prior_matches_180 <= 31 THEN '16-31'
            WHEN prior_matches_180 <= 63 THEN '32-63'
            ELSE '64+'
        END AS prior_matches_cohort

    FROM "dev"."main_silver"."matches_by_athlete_period"
) t

GROUP BY prior_matches_cohort

ORDER BY
    CASE prior_matches_cohort
        WHEN '0' THEN 1
        WHEN '1' THEN 2
        WHEN '2-3' THEN 3
        WHEN '4-7' THEN 4
        WHEN '8-15' THEN 5
        WHEN '16-31' THEN 6
        WHEN '32-63' THEN 7
        WHEN '64-127' THEN 8
        ELSE 9
    END