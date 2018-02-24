const { Router } = require('express');

//engineer table
const engId = require('./engineer/engId');
const name = require('./engineer/name');
const department = require('./engineer/department');

//vendor table
const principal = require('./vendor/vendor');

//products table
const productName = require('./products/productName');
const productvendor = require('./products/productvendor');

//client table
const accountName = require('./client/accountname');


//contact person
const contactPerson = require('./contact person/contactp');
const contactClient = require('./contact person/contactc');

//license
const license = require('./license/license');

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

const router = Router();

//engineer routes
router.use('/engineer', engId);
router.use('/name', name);
router.use('/department', department);

//vendor routes
router.use('/vendor', principal);

//products routes
router.use('/products', productName);
router.use('/productvendor', productvendor);

//client
router.use('/client', accountName);

//contact person
router.use('/contactp', contactPerson);
router.use('/contactc', contactClient);

//license route
router.use('/license', license);

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

//case monitoring
router.use('/glocalid', glocalid);
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

module.exports = router;