const { Router } = require('express');

//engineer table
const engId = require('./engineer/engId');
const name = require('./engineer/name');
const department = require('./engineer/department');
const isLead = require('./engineer/isLead');
const engActivities = require('./engineer/engactivities');

//vendor table
const principal = require('./vendor/vendor');

//products table
const productName = require('./products/productName');
const productvendor = require('./products/productvendor');

//client table
const accountName = require('./client/accountname');
const accountManager = require('./client/accountmanager');

//contact person
const contactPerson = require('./contact person/contactp');
const contactClient = require('./contact person/contactc');

//license
const license = require('./license/license');
const clientLicense = require('./license/vendor');
const on_site = require('./license/onsite');

//activities
const timeIn = require('./activities/timeIn');
const timeOuts = require('./activities/timeOuts');
const activity_client = require('./activities/client');
const addres = require('./activities/addres');
const typeOfActivity = require('./activities/typeOfActivity');
const purpose = require('./activities/purposeOfVisit');
const performed = require('./activities/activityPerformed');
const nextActivity = require('./activities/nextActivity');
const recommendations = require('./activities/recommendations');
const engineername = require('./activities/engineername');
const engid = require('./activities/engid');
const activityNo = require('./activities/activityNo');
const lastupdate = require('./activities/lastupdate');
const glocal = require('./activities/glocal');

//case monitoring
const glocalid = require('./casemonitoring/glocalid');
const vendorcaseid = require('./casemonitoring/vendorcaseid');
const datecreated = require('./casemonitoring/datecreated');
const dateraised = require('./casemonitoring/dateraised');
const casetitle = require('./casemonitoring/casetitle');
const casedesc = require('./casemonitoring/casedesc');
const severity = require('./casemonitoring/severity');
const customerName = require('./casemonitoring/customerName');
const seLead = require('./casemonitoring/systemsEngineerLead');
const assignedAM = require('./casemonitoring/assignedAccountManager');
const assignedSE = require('./casemonitoring/assignedSystemsEngineer');
const caseStatus = require('./casemonitoring/case_status');
const nextId = require('./casemonitoring/nextid');

//stats
const totalCases = require('./stats/totalCases');

const router = Router();

//engineer routes
router.use('/engineer', engId); //create and update
router.use('/name', name);
router.use('/department', department);
router.use('/isLead', isLead);
router.use('/engactivities', engActivities);

//vendor routes
router.use('/vendor', principal); //create and update

//products routes
router.use('/products', productName); //create and update
router.use('/productvendor', productvendor);

//client
router.use('/client', accountName); //create and update
router.use('/accountmanager', accountManager);

//contact person
router.use('/contactp', contactPerson); //create and update
router.use('/contactc', contactClient);

//license route
router.use('/license', license);
router.use('/clientlicense', clientLicense);
router.use('/onsite', on_site);

//activities
router.use('/timeIn', timeIn);
router.use('/timeOuts', timeOuts);
router.use('/activity_client', activity_client);
router.use('/addres', addres);
router.use('/typeOfActivity', typeOfActivity);
router.use('/purposeOfVisit', purpose);
router.use('/activityPerformed', performed);
router.use('/nextActivity', nextActivity);
router.use('/recommendations', recommendations);
router.use('/engineername', engineername);
router.use('/engid', engid);
router.use('/activityno', activityNo); //create and update
router.use('/lastupdate', lastupdate);
router.use('/tracking', glocal);

//case monitoring
router.use('/glocalid', glocalid); //create and update
router.use('/vendorcaseid', vendorcaseid);
router.use('/datecreated', datecreated);
router.use('/dateraised', dateraised);
router.use('/casetitle', casetitle);
router.use('/casedesc', casedesc);
router.use('/severity', severity);
router.use('/customerName', customerName);
router.use('/systemsEngineerLead', seLead);
router.use('/assignedAccountManager', assignedAM);
router.use('/assignedSystemsEngineer', assignedSE);
router.use('/case_status', caseStatus);
router.use('/nextid', nextId);

//stats
router.use('/totalCases', totalCases);

module.exports = router;