-- db setup commands
dropdb -U postgres -h localhost -p 5432 glocaldb
createdb -U postgres -h localhost -p 5432 glocaldb 
-- path to sql folder
psql -U postgres -h localhost -p 5432 glocaldb < glocal.sql
psql -U postgres -h localhost -p 5432 glocaldb

-- shows case with activities done(shows engineers also)
SELECT glocal_id, date_id_created, case_title, product_code, customer, assigned_systems_engineer, activity_performed, recommendations
FROM case_monitoring c JOIN activities a 
ON c. glocal_id = a.tracking_no 
WHERE glocal_id = 2018-001;

-- show engineer with activities done 
SELECT last_name||', '||first_name as full_name, purpose_of_visit, activity_performed, score
FROM engineer e join activities a 
ON e.last_name = engineer_name
WHERE last_name = 'Jenkins';

--show list of products and their respective vendors
SELECT product_name, product_line, vendor 
FROM products;

-- show clients and contract status
SELECT account_name, priority_client, active_contract, no_cases
FROM client;

-- show products with cases and activities
SELECT product_name, vendor, client, type_of_activity, activity_performed, engineer_name
FROM products p JOIN activities a 
ON p.product_line = a.product_code
WHERE product_name = 'Multi-Cloud';








