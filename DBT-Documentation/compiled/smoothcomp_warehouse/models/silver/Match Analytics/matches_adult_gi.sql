
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
        WHEN m.skill IN ('Advanced', 'Black')
            THEN 'black'
        WHEN m.skill = 'Brown'
            THEN 'brown'
        WHEN m.skill = 'Purple'
            THEN 'purple'
        WHEN m.skill IN ('Intermediate', 'Blue')
            THEN 'blue'
        WHEN m.skill IN ('White', 'Beginner')
            THEN 'white'
    END AS skill
FROM "dev"."main_silver"."matches" m
WHERE
    m.style = 'Gi'
    AND m.age <> 'Youth'
    AND m.skill <> 'NA'