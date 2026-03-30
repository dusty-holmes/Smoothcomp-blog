
    
    

select
    teammates_cohort as unique_field,
    count(*) as n_records

from "dev"."main_gold"."club_event_stats"
where teammates_cohort is not null
group by teammates_cohort
having count(*) > 1


