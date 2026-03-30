
    
    

select
    style_cohort as unique_field,
    count(*) as n_records

from "dev"."main_gold"."style_event_stats"
where style_cohort is not null
group by style_cohort
having count(*) > 1


