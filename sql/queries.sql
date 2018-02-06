-- db setup commands
dropdb -U postgres -h localhost -p 5432 glocaldb
createdb -U postgres -h localhost -p 5432 glocaldb 
-- path to sql folder
psql -U postgres -h localhost -p 5432 glocaldb < glocal.sql
psql -U postgres -h localhost -p 5432 glocaldb

-- shows case with activities done 
SELECT tracking_no, account, product_name, date_of_work, activity 
FROM activities a JOIN case_monitoring c 
ON a.case_track = c.tracking_no 
WHERE engineer_id = 001;

-- show engineer with activities done 
SELECT engineer_id, first_name, last_name, activity, date_of_work, case_track as tracking_number,client, score
FROM engineer e JOIN activities a 
ON e.eng_id = a.engineer_id 
WHERE last_name ='Solomon';

--show list of products and their respective vendors
SELECT product_name, vendor 
FROM products;

-- show clients and contract status
SELECT account_name, priority_client, active_contract, no_cases
FROM client;