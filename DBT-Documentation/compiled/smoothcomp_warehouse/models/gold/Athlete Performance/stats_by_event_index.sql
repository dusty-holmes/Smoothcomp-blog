
WITH BASE AS (
    SELECT
        event_index_grouping,
        /* divide by 2 for two competitors per match */
        sum(total_matches) / 2 as total_matches,
        sum(wins) / 2 as wins,
        sum(submission_wins) / 2 as submission_wins,
        sum(losses) / 2 as losses,
        sum(submission_losses) / 2 as submission_losses
    FROM
        "dev"."main_silver"."athlete_event_index" 
    
    WHERE
        event_index_grouping is not null
    GROUP BY
        event_index_grouping
)
SELECT
    *,
    
    ROUND(CAST(wins AS DOUBLE) / total_matches, 3)
 AS win_rate,
    
    ROUND(CAST(submission_wins AS DOUBLE) / total_matches, 3)
 AS submission_win_rate,
    
    ROUND(CAST(submission_losses AS DOUBLE) / total_matches, 3)
 AS submission_loss_rate
FROM
    BASE
WHERE
    event_index_grouping is not null
ORDER BY
    event_index_grouping asc