
WITH match_indexed as (
    SELECT
        event_id,
        athlete_id,
        match_id,
        date,
        ROW_NUMBER() OVER ( 
            PARTITION BY athlete_id
            ORDER BY date, match_id
        ) as match_index,
        sum(win)+sum(loss) as total_matches,
        sum(win) as wins,
        sum(submission_win) as submission_wins,
        sum(loss) as losses,
        sum(submission_loss) as submission_losses
    FROM 
        "dev"."main_silver"."matches"        
    GROUP BY
        event_id,
        athlete_id,
        match_id,
        date
)
SELECT
    athlete_id,
    event_id,
    match_id,
    match_index,
    total_matches,
    wins,
    submission_wins,
    losses,
    submission_losses
FROM
    match_indexed
ORDER BY
    athlete_id,
    match_index