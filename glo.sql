CREATE TABLE case_monitoring(
	track_no serial PRIMARY KEY,
	date_open date,
	account varchar(50),
	issue varchar(50),
	case_id int,
	date_closed date, 
	no_days int, 
	tracking_no varchar(50),
	steps_taken text[]
);

CREATE TABLE client(
	id serial,
	account_name varchar(50),
	priority_client boolean, 
	date_expired date,
	active_contract boolean,
	no_cases_filed int
);

CREATE TABLE engineer(
	name varchar(50),
	department varchar(50),
	score int,
	date_of_work date,
	client_attended varchar(50)
);



INSERT INTO case_monitoring(track_no, date_open, account, issue, case_id, date_closed, no_days, tracking_no) 
VALUES
(100, '05/27/2017', 'Unionbank', 'system down', '81xveK', '2/22/2017', 65, 'update software'),
(16, '12/10/2017', 'Causeway', 'error 404', '84mkcD', '9/22/2017', 50, 'clean tape drives'),
(87, '12/31/2017', 'Burger King', 'backup failed', '50viaV', '3/13/2017', 91, 'clean tape drives'),
(1, '06/10/2017', 'Burger King', 'error 404', '57xioK', '3/31/2017', 23, 'update software'),
(82, '01/19/2017', 'Unionbank', 'startup failed', '68vgwX', '11/25/2017', 59, 'troubleshoot'),
(69, '06/23/2017', 'Burger King', 'crash', '57yqyD', '3/31/2017', 51, 'clean tape drives'),
(67, '04/26/2017', 'Arellano', 'error 404', '02ssgL', '8/9/2017', 20, 'clean tape drives'),
(36, '07/28/2017', 'Causeway', 'error 404', '67yenI', '10/11/2017', 72, 'troubleshoot'),
(46, '01/12/2017', 'BPI', 'startup failed', '88bxuL', '6/5/2017', 43, 'troubleshoot'),
(14, '08/18/2017', 'Causeway', 'backup failed', '35fkjJ', '5/7/2017', 51, 'clean tape drives'),
(37, '07/04/2017', 'Mineski', 'startup failed', '18nsdU', '7/23/2017', 98, 'update software'),
(9, '12/26/2017', 'Arellano', 'crash', '12uycQ', '5/20/2017', 50, 'update software'),
(9, '12/28/2017', 'BPI', 'startup failed', '41sukB', '4/27/2017', 50, 'update software'),
(68, '09/02/2017', 'Unionbank', 'backup failed', '62mwuX', '1/8/2017', 18, 'troubleshoot'),
(19, '07/30/2017', 'Mineski', 'error 404', '83rnhL', '12/19/2017', 25, 'clean tape drives'),
(37, '05/24/2017', 'Landbank', 'backup failed', '50uhoA', '2/10/2017', 77, 'clean tape drives'),
(43, '02/08/2017', 'Arellano', 'crash', '68npmT', '6/2/2017', 52, 'troubleshoot'),
(81, '03/24/2017', 'Mineski', 'startup failed', '40uunD', '5/16/2017', 14, 'troubleshoot'),
(97, '07/01/2017', 'Arellano', 'startup failed', '03yvgA', '4/9/2017', 31, 'troubleshoot'),
(59, '07/16/2017', 'Arellano', 'startup failed', '92uujZ', '5/15/2017', 27, 'update software'),
(30, '08/16/2017', 'Causeway', 'error 404', '10ubqW', '3/4/2017', 78, 'update software'),
(76, '11/30/2017', 'Burger King', 'system down', '66smgQ', '6/21/2017', 85, 'troubleshoot'),
(83, '10/05/2017', 'BPI', 'system down', '81otaO', '12/23/2017', 69, 'troubleshoot'),
(6, '02/28/2017', 'Arellano', 'crash', '92fdkI', '4/27/2017', 51, 'update software'),
(30, '05/03/2017', 'Burger King', 'error 404', '58szfN', '10/16/2017', 20, 'update software'),
(59, '05/22/2017', 'Unionbank', 'crash', '02reqX', '4/17/2017', 6, 'clean tape drives'),
(58, '01/20/2017', 'Causeway', 'error 404', '07vodQ', '2/12/2017', 79, 'troubleshoot'),
(53, '10/28/2017', 'Mineski', 'error 404', '59ltlE', '1/9/2017', 94, 'troubleshoot'),
(3, '12/12/2017', 'Burger King', 'crash', '14lrvY', '12/18/2017', 90, 'clean tape drives'),
(84, '09/29/2017', 'Burger King', 'system down', '91jcjZ', '6/17/2017', 71, 'troubleshoot'),
(53, '07/31/2017', 'Causeway', 'crash', '79oxaT', '8/15/2017', 49, 'troubleshoot'),
(49, '12/14/2017', 'Mineski', 'crash', '65qkrQ', '3/17/2017', 35, 'troubleshoot'),
(84, '04/19/2017', 'Unionbank', 'backup failed', '65kpiP', '7/22/2017', 12, 'troubleshoot'),
(16, '06/05/2017', 'Mineski', 'startup failed', '52xzzU', '1/14/2017', 62, 'clean tape drives'),
(82, '05/21/2017', 'Unionbank', 'crash', '93bbxV', '12/11/2017', 73, 'troubleshoot'),
(23, '07/28/2017', 'Arellano', 'backup failed', '38cjcR', '12/13/2017', 96, 'update software'),
(37, '06/03/2017', 'BPI', 'system down', '60mzvA', '6/3/2017', 36, 'update software'),
(3, '03/01/2017', 'Mineski', 'crash', '86xmgM', '10/5/2017', 99, 'troubleshoot'),
(24, '05/15/2017', 'Causeway', 'crash', '77iqlU', '7/6/2017', 21, 'update software'),
(78, '09/24/2017', 'Mineski', 'error 404', '35vhcG', '12/2/2017', 92, 'update software'),
(92, '10/11/2017', 'Arellano', 'crash', '91lisI', '1/9/2017', 78, 'troubleshoot'),
(63, '05/24/2017', 'Arellano', 'startup failed', '96gysW', '3/29/2017', 84, 'clean tape drives'),
(30, '01/15/2017', 'Arellano', 'backup failed', '33mkeY', '7/10/2017', 60, 'troubleshoot'),
(50, '08/28/2017', 'Causeway', 'system down', '18xxdI', '10/14/2017', 92, 'troubleshoot'),
(20, '04/04/2017', 'Mineski', 'crash', '89wnoB', '3/23/2017', 93, 'update software'),
(1, '03/10/2017', 'Causeway', 'system down', '52deaX', '5/23/2017', 8, 'clean tape drives'),
(92, '02/25/2017', 'Mineski', 'crash', '99ymeB', '1/11/2017', 45, 'update software'),
(39, '03/15/2017', 'Causeway', 'error 404', '23tnlY', '1/30/2017', 76, 'update software'),
(77, '11/27/2017', 'Arellano', 'system down', '43snvT', '4/17/2017', 90, 'clean tape drives'),
(89, '08/18/2017', 'BPI', 'error 404', '25zlsQ', '7/16/2017', 67, 'clean tape drives');
