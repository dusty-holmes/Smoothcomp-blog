
    
    

select
    event_index_grouping as unique_field,
    count(*) as n_records

from "dev"."main_gold"."stats_by_event_index"
where event_index_grouping is not null
group by event_index_grouping
having count(*) > 1


