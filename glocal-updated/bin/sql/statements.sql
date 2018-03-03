SELECT glocalId, severity, customer FROM case_monitoring WHERE dateRaised BETWEEN '01/01/2018' and '02/01/2018';

SELECT count(*) count_all,
count(*) filter(where severity=1) severity_1,
count(*) filter(where severity=2) severity_2
FROM case_monitoring;

SELECT count(*) total_cases,
count(*) FILTER(WHERE case_status='Ongoing') ongoing,
count(*) FILTER(WHERE case_status='Resolved') resolved,
count(*) FILTER(WHERE case_status='Pending (Glo-cal)') pending_GC,
count(*) FILTER(WHERE case_status='Pending (Client)') pending_Cli
FROM case_monitoring;

SELECT count(*) total_cases FROM case_monitoring;

SELECT case_status, count(*) NumberofCases 
FROM case_monitoring GROUP BY case_status;

#########################################################################################################

# CUSTOMER/CLIENT FILTER
SELECT customer, case_status, assignedSystemsEngineer, severity, vendor, caseTitle, productName, dateRaised 
FROM case_monitoring
WHERE customer='BPI';

SELECT customer, case_status, assignedSystemsEngineer, severity, vendor, caseTitle, productName, dateRaised 
FROM case_monitoring
WHERE customer='Unionbank';

#STATUS FILTER
SELECT customer, case_status, assignedSystemsEngineer, severity, vendor, caseTitle, productName, dateRaised 
FROM case_monitoring
WHERE case_status='Resolved';

WHERE case_status='Ongoing';

WHERE case_status='Pending (Glo-cal)';

WHERE case_status='Pending (Client)';

#SEVERITY FILTER
SELECT customer, case_status, assignedSystemsEngineer, severity, vendor, caseTitle, productName, dateRaised 
FROM case_monitoring
WHERE severity=1;

WHERE severity=2;

WHERE severity=3;

WHERE severity=4;

