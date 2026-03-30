
    
    

select
    prior_matches_cohort as unique_field,
    count(*) as n_records

from "dev"."main_gold"."matches_period_180_stats"
where prior_matches_cohort is not null
group by prior_matches_cohort
having count(*) > 1


