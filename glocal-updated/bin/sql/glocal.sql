CREATE TYPE post AS ENUM('Director','Sales Manager','Technical Manager','System Engineer','Account Manager');

CREATE TABLE users(
	userid serial unique PRIMARY KEY, 
	full_name varchar(50) unique,
	username varchar(50),
	pw varchar (50),
	email varchar(50),
	contactnumber varchar(50),
	position post
);

CREATE TABLE vendor(
	principal varchar(50) unique PRIMARY KEY NOT NULL
);

CREATE TABLE client(
	accountName varchar(50) unique PRIMARY KEY NOT NULL,
	contact_details text[][][] NOT NULL,
	company_address varchar(100) NOT NULL,
	accountManager varchar(50) references users(full_name) NOT NULL
);

CREATE TABLE products(
	productName varchar(50) unique PRIMARY KEY NOT NULL,
	vendor varchar(50) references vendor(principal) ON UPDATE CASCADE NOT NULL
);

CREATE TABLE license(
	licenseId serial, 
	date_start date NOT NULL,
	date_end date NOT NULL,
	vendor varchar(50) references vendor(principal) ON UPDATE CASCADE NOT NULL,
	productName varchar(50) references products(productName) ON UPDATE CASCADE NOT NULL,
	client varchar(50) references client(accountName) ON UPDATE CASCADE NOT NULL,
	particulars varchar(200) NOT NULL,
	on_site varchar(50),
	support_date_start date NOT NULL,
	support_date_end date NOT NULL,
	man_days int NOT NULL,
	remaining_man_days int NOT NULL,
	quarterly_hc boolean NOT NULL,
	remarks varchar(2000) 
);

CREATE TABLE contact_person(
	client varchar(50) references client(accountName) ON UPDATE CASCADE NOT NULL,
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
	customer varchar(50) references client(accountName) ON UPDATE CASCADE NOT NULL,
	productName varchar(50) references products(productName) ON UPDATE CASCADE NOT NULL,
	systemsEngineerLead varchar(50),
	case_status varchar(50) NOT NULL
);

CREATE TYPE typeAct AS ENUM('Onsite','Implementation','Remote','POC');

CREATE TABLE activities(
	trackingNo int references case_monitoring(glocalId) ON UPDATE CASCADE NOT NULL,
	activityNo serial,
	timeIn timestamp NOT NULL, 
	timeOuts timestamp NOT NULL,
	productName varchar(50) references products(productName) ON UPDATE CASCADE NOT NULL,
	client varchar(50) NOT NULL,
	addres varchar(100) NOT NULL, 
	typeOfActivity typeAct, 
	purposeOfVisit varchar(50) NOT NULL,
	activityPerformed varchar(2000) NOT NULL,
	nextActivity varchar(2000) NOT NULL,
	recommendations varchar(2000),
	assignedSystemsEngineer text[][] NOT NULL
);

INSERT INTO users(full_name, username, pw, email, contactnumber, position)
VALUES
('John Jenkins','JJenkins','jjenkins','jjenkins@gmail.com','911','System Engineer'),
('Isaiah Solomon','ISolomon','isolomon','icesolomon@gmail.com','112','System Engineer'),
('Aaron Hernandez','Ahernz','ahernz','ahernandez@gmail.com','711','System Engineer'),
('Sonny Pascasio','SonnyP','sonnyp','sonny@gmail.com','123235','Director'),
('Dominique Pascasio','Domp','domp','dom@gmail.com','91284435','Account Manager'),
('Avery Si','AveSi','avesi','ave@gmail.com','0917234452345','Technical Manager'),
('Jefferson Ong','JOng','jong','jong@gmail.com','091242351253','System Engineer'),
('Jeffrey Jonas','JJonas','jonas','jonas@gmail.com','32134512514225','System Engineer'),
('Oliver de los Santos','OdlSantos','osantos','oliver@gmail.com','23413451452','System Engineer'),
('Mei Wang','mei','meiop','mei@gmail.com','1293423932','Account Manager'),
('Mara Mondragon','mhar','msadf','mhar@gmail.com','1324132','Account Manager'),
('Alexis Collado','Alex','alex','alex@gmail.com','90127236123','Sales Manager');

INSERT INTO vendor(principal)
VALUES
('Symantec'),
('Veritas');

INSERT INTO client(accountName, contact_details, company_address, accountManager)
VALUES
('Unionbank', ARRAY[['Mareeah Koochenera'],['marreah@gmail.com'],['09178456789']],'157 HV Dela Costa','Mei Wang' ),
('BPI', ARRAY[['Garrosh'],['garrosh@gmail.com'],['09176230789']],'15 Jupiter','Mara Mondragon');

INSERT INTO products(productName, vendor)
VALUES
('Multi-Cloud','Veritas'),
('Secure Web Gateway','Symantec');

INSERT INTO license(date_start, date_end, vendor, productName, client, particulars,on_site, support_date_start, support_date_end, man_days, remaining_man_days, quarterly_hc, remarks)
VALUES
('05/01/2018','05/01/2019','Symantec','Multi-Cloud','BPI','particular 1','8x5','06/05/2018','06/15/2018',13,12,TRUE,'remarks'),
('11/28/2018','05/01/2019','Veritas','Secure Web Gateway','Unionbank','particular 2','24x7','12/05/2018','12/15/2018',13,12,TRUE,'remarks');

INSERT INTO contact_person(client, personName)
VALUES
('BPI','John Vincent Agbayani'),
('Unionbank','John Karlo Tabios');

INSERT INTO case_monitoring(vendorCaseId, dateIdCreated, dateRaised, caseTitle, caseDescription, severity, vendor, customer, productName, systemsEngineerLead, case_status)
VALUES
('JF1','01/08/2018','01/07/2018','Attend to failure of backup','troubleshoot',1,'Veritas','Unionbank','Multi-Cloud','Jefferson Ong','Ongoing'),
('JF2','03/08/2018','03/07/2018','Fix server for backup','install updates',1,'Symantec','BPI','Secure Web Gateway','Jeffrey Jonas', 'Resolved'),
('JF3','04/04/2018', '04/01/2018', 'Error 404', 'fix error', 2, 'Veritas', 'BPI', 'Secure Web Gateway', 'Jefferson Ong', 'Ongoing'),
('JF4', '04/07/2018', '04/06/2018', 'Fix server for backup', 'install updates', 2, 'Symantec', 'Unionbank', 'Multi-Cloud', 'Oliver de los Santos', 'Pending (Glo-cal)'),
('JF5', '05/11/2018', '05/09/2018', 'Attend to failure of backup', 'troubleshoot', 2, 'Veritas', 'BPI', 'Secure Web Gateway', 'Jeffrey Jonas', 'Pending (Client)'),
('JF6', '05/11/2018', '05/09/2018', 'Attend to failure of backup', 'troubleshoot', 2, 'Veritas', 'BPI', 'Secure Web Gateway', 'Jeffrey Jonas', 'Pending (Client)');

INSERT INTO activities(trackingNo, timeIn, timeOuts, productName, client, addres, typeOfActivity, purposeOfVisit, activityPerformed, nextActivity, recommendations, assignedSystemsEngineer)
VALUES
(001,'2018-01-08 12:24:00', '2018-01-08 15:05:00', 'Multi-Cloud','Unionbank','unionbank','Onsite','troubleshoot','checked if modules are up to date','install updates', 'no recommendations', ARRAY[['Isaiah Solomon'],['Aaron Hernandez']]),
(001, '2018-03-08 13:32:00','2018-03-08 16:22:00', 'Secure Web Gateway','BPI', 'BPI','Remote','troubleshooting','check version of software','install updates', ' no recommendations',ARRAY[['John Jenkins']] );












