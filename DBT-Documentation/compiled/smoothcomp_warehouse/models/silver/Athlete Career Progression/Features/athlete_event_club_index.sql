
WITH athlete_event_club AS (

    -- Get one club per athlete per event
    SELECT
        athlete_id,
        event_id,
        ANY_VALUE(club) AS club
    FROM "dev"."main_silver"."matches"
    WHERE club IS NOT NULL 
    GROUP BY
        athlete_id,
        event_id

),

club_event_counts AS (

    SELECT
        event_id,
        club,
        COUNT(*) AS club_athletes_at_event
    FROM athlete_event_club
    GROUP BY
        event_id,
        club

),

club_size AS (
    SELECT
        a.athlete_id,
        a.event_id,
        a.club,

        COALESCE(c.club_athletes_at_event - 1, 0) AS teammates_at_event

    FROM athlete_event_club a

    LEFT JOIN club_event_counts c
        ON a.event_id = c.event_id
        AND a.club = c.club
)

SELECT
    m.*,
    c.teammates_at_event

FROM "dev"."main_silver"."athlete_match_index" m

LEFT JOIN club_size c
    ON m.athlete_id = c.athlete_id
    AND m.event_id = c.event_id