
SELECT
    event_id,
    match_id,
    athlete_id,
    name,
    club,
    win,
    submission_win,
    loss,
    submission_loss,
    style,
    age,
    gender,
    CASE
        WHEN m.skill = 'Absolute'
            THEN 'absolute'
        WHEN m.skill IN ('Advanced', 'Purple', 'Brown', 'Black')
            THEN 'advanced'
        WHEN m.skill IN ('Intermediate', 'Blue')
            THEN 'intermediate'
        WHEN m.skill IN ('Beginner', 'White')
            THEN 'beginner'
    END AS skill
FROM "dev"."main_silver"."matches" m
WHERE
    m.style = 'No Gi'
    AND m.age <> 'Youth'
    AND m.skill <> 'NA'