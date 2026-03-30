
SELECT
    teammates_cohort,

    COUNT(*) / 2 AS total_matches,
    SUM(wins) / 2 AS wins,
    SUM(losses) / 2 AS losses,
    SUM(submission_wins) / 2 AS submission_wins,
    SUM(submission_losses) / 2 AS submission_losses,

    CAST(SUM(wins) AS DOUBLE) / COUNT(*) AS win_rate,
    CAST(SUM(submission_wins) AS DOUBLE) / COUNT(*) AS submission_win_rate,
    CAST(SUM(submission_losses) AS DOUBLE) / COUNT(*) AS submission_loss_rate,

    CAST(SUM(submission_wins) AS DOUBLE) / NULLIF(SUM(wins),0) 
        AS submission_share_of_wins,

    CAST(SUM(submission_losses) AS DOUBLE) / NULLIF(SUM(losses),0) 
        AS submission_share_of_losses
FROM (
    SELECT
        wins,
        losses,
        submission_wins,
        submission_losses,
        CASE
            WHEN teammates_at_event = 0 THEN '0'
            WHEN teammates_at_event = 1 THEN '1'
            WHEN teammates_at_event <= 3 THEN '2-3'
            WHEN teammates_at_event <= 7 THEN '4-7'
            WHEN teammates_at_event <= 15 THEN '8-15'
            WHEN teammates_at_event <= 31 THEN '16-31'
            WHEN teammates_at_event <= 63 THEN '32-63'
            ELSE '64+'
        END AS teammates_cohort

    FROM "dev"."main_silver"."athlete_event_club_index"

) t

GROUP BY teammates_cohort

ORDER BY
    CASE teammates_cohort
        WHEN '0' THEN 1
        WHEN '1' THEN 2
        WHEN '2-3' THEN 3
        WHEN '4-7' THEN 4
        WHEN '8-15' THEN 5
        WHEN '16-31' THEN 6
        ELSE 7
    END