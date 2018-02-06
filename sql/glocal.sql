
CREATE TABLE engineer(
	eng_id int PRIMARY KEY NOT NULL,
	first_name varchar(50) NOT NULL,
	last_name varchar(50) NOT NULL,
	department varchar(50) NOT NULL
);

CREATE TABLE products(
	product_name varchar(50) PRIMARY KEY NOT NULL,
	vendor varchar(50) NOT NULL,
	category varchar(50) NOT NULL
);

CREATE TABLE client(
	account_name varchar(50) PRIMARY KEY NOT NULL,
	priority_client boolean NOT NULL, 
	date_expired date NOT NULL,
	active_contract boolean NOT NULL,
	no_cases int NOT NULL
);

CREATE TABLE activities(
	case_track varchar(50),
	engineer_id int references engineer(eng_id) NOT NULL,
	client varchar(50) NOT NULL,
	date_of_work date NOT NULL,
	activity varchar(100) NOT NULL,
	score int NOT NULL
);

CREATE TABLE case_monitoring(
	case_id serial PRIMARY KEY NOT NULL,
    tracking_no varchar(50),
	account varchar(50) references client(account_name) NOT NULL,
	product_name varchar(50) references products(product_name) NOT NULL,
	principal_involved varchar(50)  NOT NULL,
	date_open date NOT NULL,
	issue varchar(50) NOT NULL,  
	date_closed date NOT NULL,
	duration int NOT NULL,
	severity int NOT NULL
);

INSERT INTO engineer(eng_id,first_name, last_name, department)
VALUES 
(001,'John','Jenkins','Security'),
(002,'Isaiah','Solomon','Availability');

INSERT INTO products(product_name, vendor, category)
VALUES
('Multi-Cloud','Veritas','Security'),
('Secure Web Gateway','Symmantec','Security');

INSERT INTO client(account_name, priority_client, date_expired, active_contract, no_cases)
VALUES 
('Unionbank', TRUE, '03/08/2019', TRUE, 1),
('BPI',FALSE,'06/25/2018',TRUE,0);

INSERT INTO activities(case_track, engineer_id,client, date_of_work, activity, score)
VALUES
('81xveK',001, 'Unionbank','02/22/2017','troubleshoot',2),
('81xveK',001, 'Unionbank','02/23/2017','update software',5),
('96gysw',002, 'BPI','01/02/2017','troubleshoot',2),
('96gysw',002, 'BPI','01/04/2017','install hotfix',5);

INSERT INTO case_monitoring(case_id, tracking_no, account, product_name, principal_involved, date_open, issue, date_closed, duration, severity)
VALUES
(DEFAULT,'96gysw','BPI','Multi-Cloud','Veritas','01/02/2018','startup failed', '01/05/2018', 3, 2),
(DEFAULT,'81xveK', 'Unionbank','Secure Web Gateway','Symmantec','02/22/2017','system down', '02/24/2017', 2, 3);














