
    
    

select
    skill as unique_field,
    count(*) as n_records

from "dev"."main_gold"."matches_by_skill_nogi"
where skill is not null
group by skill
having count(*) > 1


