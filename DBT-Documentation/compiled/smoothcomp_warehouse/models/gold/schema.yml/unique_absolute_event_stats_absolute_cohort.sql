
    
    

select
    absolute_cohort as unique_field,
    count(*) as n_records

from "dev"."main_gold"."absolute_event_stats"
where absolute_cohort is not null
group by absolute_cohort
having count(*) > 1


