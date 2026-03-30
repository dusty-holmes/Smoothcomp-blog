
With event_indexed as (
    SELECT
        event_id,
        athlete_id,
        date,
        ROW_NUMBER() OVER ( 
            PARTITION BY athlete_id
            ORDER BY date
        ) as event_index,
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
        date
)
SELECT
    athlete_id,
    event_id,
    date,
    event_index,
    CASE
        WHEN event_index <= 1   then '1st'
        when event_index <= 2   then '2nd'
        WHEN event_index <= 4   then '3rd-4th'
        WHEN event_index <= 8   then '5th-8th'
        WHEN event_index <= 16  then '9th-16th'
        ELSE '17+'
    END AS event_index_grouping,
    total_matches,
    wins,
    submission_wins,
    losses,
    submission_losses
FROM
    event_indexed
ORDER BY
    athlete_id,
    event_index