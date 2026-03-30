
SELECT
    club,
    event_id,
    count(distinct athlete_id) as athlete_count,
    sum(win)+sum(loss) as match_count,
    sum(win) as wins,
    sum(submission_win) as submission_wins,
    sum(loss) as loss,
    sum(submission_loss) as submission_loss
FROM
    "dev"."main_silver"."matches"
GROUP BY
    club,
    event_id