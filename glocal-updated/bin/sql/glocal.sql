
CREATE TABLE engineer(
	engId int  unique PRIMARY KEY NOT NULL,
	department varchar(50) NOT NULL,
	firstName varchar(50) NOT NULL,
	lastName varchar(50) NOT NULL
);

CREATE TABLE vendor(
	principal varchar(50) unique PRIMARY KEY NOT NULL
);

CREATE TABLE client(
	accountName varchar(50) PRIMARY KEY NOT NULL,
	contact_details text[][] NOT NULL,
	company_address varchar(100) NOT NULL,
	systemEngineerLead varchar(50),
	accountManager varchar(50) NOT NULL
);

CREATE TABLE products(
	productName varchar(50) unique PRIMARY KEY NOT NULL,
	vendor varchar(50) references vendor(principal) ON UPDATE CASCADE NOT NULL
);

CREATE TABLE license(
	product varchar(50) references products(productName) NOT NULL,
	license varchar(200) NOT NULL
);

CREATE TABLE contact_person(
	client varchar(50) references client(accountName) NOT NULL,
	personName varchar(50) unique NOT NULL
);

CREATE TABLE case_monitoring(
	glocalId serial unique PRIMARY KEY NOT NULL,
    vendorCaseId varchar(50),
	dateIdCreated date NOT NULL, 
	dateRaised date NOT NULL,
	caseTitle varchar(50) NOT NULL,
	caseDescription varchar(100) NOT NULL,
	severity int NOT NULL,
	vendor varchar(50) NOT NULL,
	customer varchar(50) references client(accountName) NOT NULL,
	productName varchar(50) references products(productName) NOT NULL,
	customerName varchar(50) NOT NULL,
	systemsEngineerLead varchar(50),
	assignedAccountManager varchar(50) NOT NULL,
	assignedSystemsEngineer text[][] NOT NULL,
	case_status varchar(50) NOT NULL
);

CREATE TABLE activities(
	trackingNo int NOT NULL,
	timeIn timestamp NOT NULL, 
	timeOuts timestamp NOT NULL,
	productName varchar(50) references products(productName) NOT NULL,
	client varchar(50) NOT NULL,
	contactCustomer varchar(50) references contact_person(personName) NOT NULL,
	addres varchar(50) NOT NULL, 
	typeOfActivity varchar(50) NOT NULL, 
	purposeOfVisit varchar(50) NOT NULL,
	activityPerformed varchar(250) NOT NULL,
	nextActivity varchar(250) NOT NULL,
	recommendations varchar(250),
	engid int references engineer(engId) NOT NULL,
	engineerName varchar(50)
);

INSERT INTO engineer(engId, department, firstName, lastName)
VALUES 
(001,'Security','John','Jenkins'),
(002,'Availability','Isaiah','Solomon'),
(003, 'Security','Aaron','Hernandez');

INSERT INTO vendor(principal)
VALUES
('Symmantec'),
('Veritas');

INSERT INTO client(accountName, contact_details, company_address, systemEngineerLead, accountManager)
VALUES
('Unionbank', ARRAY[['Mareeah Koochenera','marreah@gmail.com','09178456789']],'157 HV Dela Costa','Richard','Mei' ),
('BPI', ARRAY[['Garrosh','garrosh@gmail.com','09176230789']],'15 Jupiter','Jonathan','Mara');

INSERT INTO products(productName, vendor)
VALUES
('Multi-Cloud','Veritas'),
('Secure Web Gateway','Symmantec');

INSERT INTO license(product, license)
VALUES
('Multi-Cloud','1yr warranty'),
('Secure Web Gateway','3 yrs warranty');

INSERT INTO contact_person(client, personName)
VALUES
('BPI','John Vincent'),
('Unionbank','John Karlo');

INSERT INTO case_monitoring(glocalId, vendorCaseId, dateIdCreated, dateRaised, caseTitle, caseDescription, severity, vendor, customer, productName, customerName, systemsEngineerLead, assignedAccountManager, assignedSystemsEngineer, case_status)
VALUES
(2018-001,'2018-100','01/08/2018','01/07/2018','Attend to failure of backup','troubleshoot',1,'Veritas','Unionbank','Multi-Cloud','John Karlo Tabios','Jefferson','Mei',ARRAY[['John Jenkins'],['Isaiah Solomon']], 'may status'),
(2018-002,'2018-111','03/08/2018','03/07/2018','Fix server for backup','install updates',1,'Symmantec','BPI','Secure Web Gateway','John Vincent Agbayani','Jeffrey','Maan',ARRAY['Aaron Hernandez'], 'anong status status')
(2018-004, '2018-112','04/04/2018', '04/01/2018', 'Error 404', 'fix error', 2, 'Veritas', 'BPI', 'Secure Web Gateway', 'John Karlo Tabios', 'Jefferson', 'Mei', ARRAY[['Aaron Hernandez']], 'may status');


INSERT INTO activities(trackingNo, timeIn, timeOuts, productName, client,  contactCustomer, addres, typeOfActivity, purposeOfVisit, activityPerformed, nextActivity, recommendations, engid, engineerName)
VALUES
(2018-001, '2018-01-08 12:24:00', '2018-01-08 15:05:00', 'Multi-Cloud','Unionbank','John Karlo','unionbank','OnSite','troubleshoot','checked if modules are up to date','install updates', 'no recommendations',001,'Jenkins'),
(2018-002,'2018-03-08 13:32:00','2018-03-08 16:22:00', 'Secure Web Gateway','BPI', 'John Vincent', 'BPI','Remote','troubleshooting','check version of software','install updates',' no recommendations',002,'Solomon');













