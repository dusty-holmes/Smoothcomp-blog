
WITH career_calc AS (
    SELECT
        athlete_id,
        event_id,
        date,

        MIN(date) OVER (
            PARTITION BY athlete_id
        ) AS first_comp_date,

        date_diff(
            'day',
            MIN(date) OVER (PARTITION BY athlete_id),
            date
        ) AS career_length_days
    FROM "dev"."main_silver"."matches"
)

SELECT DISTINCT
    athlete_id,
    event_id,
    date,
    first_comp_date,
    career_length_days
FROM career_calc
ORDER BY
    athlete_id,
    career_length_days ASC