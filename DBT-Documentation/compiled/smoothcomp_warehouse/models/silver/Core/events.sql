

WITH base AS (
    SELECT
        events.id,
        events.title,
        events.href,
        events.location,
        events.federation,
        events.date,
        date_trunc('month', events.date) AS event_month,
        month(events.date) AS month_num,
        
            strftime('%b', events.date) AS month_name,
        
        matches.match_count,
        ROW_NUMBER() OVER (
            PARTITION BY events.id
            ORDER BY events.date DESC
        ) AS rn
    FROM "dev"."main_bronze"."stg_events_raw" events
    INNER JOIN (
        SELECT 
            event_id,
            SUM(win) AS match_count
        FROM "dev"."main_bronze"."stg_matches_raw"
        GROUP BY event_id
    ) matches
        ON matches.event_id = events.id
)

SELECT *
FROM base
WHERE rn = 1
ORDER BY date