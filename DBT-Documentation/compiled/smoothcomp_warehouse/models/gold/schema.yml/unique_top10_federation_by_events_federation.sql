
    
    

select
    federation as unique_field,
    count(*) as n_records

from "dev"."main_gold"."top10_federation_by_events"
where federation is not null
group by federation
having count(*) > 1


