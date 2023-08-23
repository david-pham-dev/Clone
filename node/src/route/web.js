import express from 'express';
import homecontroller from '../controller/homecontroller.js';
import userController from '../controller/userController.js';
import doctorController from '../controller/doctorController.js';
import patientController from '../controller/patientController';
import specialtyController from '../controller/specialtyController.js';
import clinicController from '../controller/clinicController.js';

let router = express.Router(); // default function from express

let initWebRoutes = (app) => {
  router.get('/', homecontroller.getHomePage);
  router.get('/about', homecontroller.getAboutPage);
  router.get('/contact', homecontroller.getContactPage);
  router.get('/crud', homecontroller.getCRUD);
  router.post('/post-crud', homecontroller.postCRUD);
  router.get('/get-crud', homecontroller.displayGetCRUD);
  router.get('/edit-crud', homecontroller.getEditCRUD);
  router.post('/put-crud', homecontroller.putCRUD);
  router.get('/delete-crud', homecontroller.deleteCRUD);

  router.post('/api/login', userController.handleLogin);
  router.get('/api/get-all-users', userController.handleGetAllUsers);
  router.put('/api/edit-user', userController.handleEditUser);
  router.post('/api/create-new-user', userController.handleCreateNewUsers);
  router.delete('/api/delete-user', userController.handleDeleteUser);

  router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);
  router.get('/api/get-all-doctors', doctorController.getAllDoctors);
  router.post('/api/save-infor-doctors', doctorController.postInforDoctor);
  router.get('/api/allcode', userController.getAllCode);
  router.get(
    '/api/get-detail-doctor-by-id',
    doctorController.getDetailDoctorById
  );

  router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule);
  router.get(
    '/api/get-schedule-doctor-by-date',
    doctorController.getScheduleByDate
  );
  router.get(
    '/api/get-extra-infor-doctor-by-id',
    doctorController.getExtraInforDoctorById
  );
  router.get(
    '/api/get-profile-doctor-by-id',
    doctorController.getProfileDoctorById
  );
  router.post(
    '/api/patient-book-appointment',
    patientController.postBookAppointment
  );
  router.get(
    '/api/get-list-patient-for-doctor',
    doctorController.getListPatientForDoctor
  );
  router.post('/api/send-remedy', doctorController.sendRemedy);
  router.post(
    '/api/verify-book-appointment',
    patientController.postVerifyBookAppointment
  );
  router.post('/api/create-new-specialty', specialtyController.createSpecialty);
  router.get('/api/get-specialty', specialtyController.getAllSpecialty);
  router.get(
    '/api/get-detail-specialty-by-id',
    specialtyController.getDetailSpecialtyById
  );
  router.post('/api/create-new-clinic', clinicController.createClinic);
  router.get('/api/get-clinic', clinicController.getAllClinic);
  router.get(
    '/api/get-detail-clinic-by-id',
    clinicController.getDetailClinicById
  );

  return app.use('/', router);
};
module.exports = initWebRoutes;
