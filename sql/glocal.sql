
CREATE TABLE engineer(
	eng_id int PRIMARY KEY NOT NULL,
	department varchar(50) NOT NULL,
	first_name varchar(50) NOT NULL,
	last_name varchar(50) NOT NULL
);

CREATE TABLE vendor(
	principal varchar(50) unique NOT NULL
);

CREATE TABLE client(
	account_name varchar(50) PRIMARY KEY NOT NULL,
	priority_client boolean NOT NULL, 
	date_expired date NOT NULL,
	active_contract boolean NOT NULL,
	contact_email varchar(50),
	contact_number int,
	no_cases int NOT NULL
);

CREATE TABLE products(
	product_name varchar(50) PRIMARY KEY NOT NULL,
	product_line varchar(50) unique NOT NULL,	
	vendor varchar(50) references vendor(principal) NOT NULL,
	category varchar(50) NOT NULL
);

CREATE TABLE license(
	product varchar(50) references products(product_name) NOT NULL,
	license varchar(200)
);

CREATE TABLE contact_person(
	client varchar(50) references client(account_name) NOT NULL,
	person_name varchar(50) unique NOT NULL
);

CREATE TABLE case_monitoring(
	glocal_id serial unique PRIMARY KEY NOT NULL,
    vendor_case_id varchar(50),
	date_id_created date NOT NULL, 
	date_raised date NOT NULL,
	case_title varchar(50) NOT NULL,
	case_description varchar(100) NOT NULL,
	severity int NOT NULL,
	vendor varchar(50) NOT NULL,
	customer varchar(50) references client(account_name) NOT NULL,
	product_line varchar(50) references products(product_line) NOT NULL,
	customer_name varchar(50) NOT NULL,
	systems_engineer_lead varchar(50),
	assigned_account_manager varchar(50) NOT NULL,
	assigned_systems_engineer text[][] NOT NULL
);

#vendor_case_id varchar(50) references case_monitoring(vendor_case_id) NOT NULL
CREATE TABLE activities(
	tracking_no int references case_monitoring(glocal_id) NOT NULL,
	time_in timestamp NOT NULL, 
	time_out timestamp NOT NULL,
	product_code varchar(50) references products(product_line) NOT NULL,
	client varchar(50) NOT NULL,
	contact_customer varchar(50) references contact_person(person_name) NOT NULL,
	address_of_work varchar(50) NOT NULL, 
	type_of_activity varchar(50) NOT NULL, 
	purpose_of_visit varchar(50) NOT NULL,
	activity_performed varchar(250) NOT NULL,
	next_activity varchar(250) NOT NULL,
	recommendations varchar(250),
	engineer_name varchar(50) references case_monitoring NOT NULL, 
	score int NOT NULL
);

INSERT INTO engineer(eng_id, department, first_name, last_name)
VALUES 
(001,'Security','John','Jenkins'),
(002,'Availability','Isaiah','Solomon'),
(003, 'Security','Aaron','Hernandez');

INSERT INTO vendor(principal)
VALUES
('Symmantec'),
('Veritas');

INSERT INTO client(account_name, priority_client, date_expired, active_contract, contact_email, contact_number, no_cases)
VALUES
('Unionbank', TRUE, '03/08/2019', TRUE, 'unionbank@gmail.com',854321, 1),
('BPI',FALSE,'06/25/2018',TRUE, 'bpi@gmail.com',123456, 0);

INSERT INTO products(product_name, product_line, vendor, category)
VALUES
('Multi-Cloud','SFVVR','Veritas','Security'),
('Secure Web Gateway','JHTEY','Symmantec','Security');

INSERT INTO contact_person(client, person_name)
VALUES
('BPI','John Vincent'),
('Unionbank','John Karlo');


INSERT INTO case_monitoring(glocal_id, vendor_case_id, date_id_created, date_raised, case_title, case_description, severity, vendor, customer, product_line, customer_name, systems_engineer_lead, assigned_account_manager, assigned_systems_engineer)
VALUES
(2018-001,'2018-100','01/08/2018','01/07/2018','Attend to failure of backup','troubleshoot',1,'Veritas','Unionbank','SFVVR','John Karlo Tabios','Jefferson','Mei',ARRAY[['John Jenkins'],['Isaiah Solomon']]),
(2018-002,'2018-111','03/08/2018','03/07/2018','Fix server for backup','install updates',1,'Symmantec','BPI','JHTEY','John Vincent Agbayani','Jeffrey','Maan',ARRAY['Aaron Hernandez']);

INSERT INTO activities(tracking_no, time_in, time_out, product_code, client,  contact_customer, address_of_work, type_of_activity, purpose_of_visit,activity_performed, next_activity, recommendations, engineer_name, score)
VALUES
(2018-001, '2018-01-08 12:24:00', '2018-01-08 15:05:00', 'SFVVR','Unionbank','John Karlo','unionbank','OnSite','troubleshoot','checked if modules are up to date','install updates','no recommendations','Jenkins', 5),
(2018-002,'2018-03-08 13:32:00','2018-03-08 16:22:00', 'JHTEY','BPI', 'John Vincent', 'BPI','Remote','troubleshooting','check version of software','install updates',' no recommendations','Hernandez',4);













