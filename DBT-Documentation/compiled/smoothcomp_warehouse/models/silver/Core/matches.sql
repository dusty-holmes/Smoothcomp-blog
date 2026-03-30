
select
    m.event_id,
    e.date,
    m.match_id,
    m.athlete_id,
    m.name,
    m.club,
    m.win,
    m.submission_win,
    m.loss,
    m.submission_loss,
    st.style,
    a.age,
    g.gender,
    sk.skill
from "dev"."main_bronze"."stg_matches_raw" m
inner join "dev"."main_bronze"."stg_age_raw" a
        on a.value = m.age

inner join "dev"."main_bronze"."stg_gender_raw" g
        on g.value = m.gender

inner join "dev"."main_bronze"."stg_skill_raw" sk
        on sk.value = m.skill

inner join "dev"."main_bronze"."stg_style_raw" st
        on st.value = m.style

INNER JOIN "dev"."main_silver"."events" e 
        ON m.event_id = e.id