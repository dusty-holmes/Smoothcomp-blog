
WITH base AS (
    SELECT
        m.athlete_id,
        m.match_id,
        mi.match_index,
        m.date,
        m.win,
        m.submission_win,
        m.loss,
        m.submission_loss
    FROM "dev"."main_silver"."matches" m
    LEFT JOIN "dev"."main_silver"."athlete_match_index" mi
        ON mi.athlete_id = m.athlete_id
       AND mi.match_id = m.match_id
)

SELECT
    b1.athlete_id,
    b1.match_index,
    b1.date,

    COALESCE(SUM(CASE WHEN b2.date > b1.date - INTERVAL '180' DAY THEN b2.win + b2.loss END), 0) AS prior_matches_180,
    COALESCE(SUM(CASE WHEN b2.date > b1.date - INTERVAL '180' DAY THEN b2.win END), 0) AS prior_win_180,
    COALESCE(SUM(CASE WHEN b2.date > b1.date - INTERVAL '180' DAY THEN b2.submission_win END), 0) AS prior_submission_win_180,
    COALESCE(SUM(CASE WHEN b2.date > b1.date - INTERVAL '180' DAY THEN b2.loss END), 0) AS loss_180,
    COALESCE(SUM(CASE WHEN b2.date > b1.date - INTERVAL '180' DAY THEN b2.submission_loss END), 0) AS prior_submission_loss_180,

    COALESCE(SUM(b2.win + b2.loss), 0) AS prior_matches_360,
    COALESCE(SUM(b2.win), 0) AS prior_win_360,
    COALESCE(SUM(b2.submission_win), 0) AS prior_submission_win_360,
    COALESCE(SUM(b2.loss), 0) AS loss_360,
    COALESCE(SUM(b2.submission_loss), 0) AS prior_submission_loss_360,

    b1.win,
    b1.submission_win,
    b1.loss,
    b1.submission_loss

FROM base b1

LEFT JOIN LATERAL (
    SELECT *
    FROM base b2
    WHERE b2.athlete_id = b1.athlete_id
      AND (
           b2.date > b1.date - INTERVAL '360' DAY  -- in the last 360 days
           AND (b2.date < b1.date 
                OR (b2.date = b1.date AND b2.match_index < b1.match_index))
          )
) b2 ON TRUE

--WHERE b1.athlete_id = 3613

GROUP BY
    b1.athlete_id,
    b1.match_index,
    b1.date,
    b1.win,
    b1.submission_win,
    b1.loss,
    b1.submission_loss

ORDER BY
    b1.athlete_id,
    b1.match_index