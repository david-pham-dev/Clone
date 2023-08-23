import axios from '../axios';
const handleLoginApi = (userEmail, UserPassword) => {
  return axios.post('http://localhost:8080/api/login', {
    email: userEmail,
    password: UserPassword,
  });
};
const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};
const createNewUserService = (data) => {
  console.log('data from service ', data);
  return axios.post('/api/create-new-user', data);
};
const deleteUserService = (userId) => {
  return axios.delete('/api/delete-user', { data: { id: userId } });
};
const editUserService = (inputData) => {
  return axios.put('/api/edit-user', inputData);
};
const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};
const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit = ${limit}`);
};
const getAllDoctors = () => {
  return axios.get(`/api/get-all-doctors`);
};
const saveDetailDoctorService = (data) => {
  return axios.post('/api/save-infor-doctors', data);
};
const getDetailInforDoctor = (inputId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};
const saveBulkScheduleDoctor = (data) => {
  return axios.post('/api/bulk-create-schedule', data);
};
const getScheduleDoctorByDate = (inputId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${inputId}&date=${date}`
  );
};
const getExtraInforDoctorById = (inputId) => {
  return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${inputId}`);
};
const getProfileDoctorById = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};
const postPatientBookAppointment = (data) => {
  return axios.post(`/api/patient-book-appointment`, data);
};
const postVerifyBookAppointment = (data) => {
  return axios.post(`/api/verify-book-appointment`, data);
};
const createNewSpecialty = (data) => {
  return axios.post(`/api/create-new-specialty`, data);
};
const getAllSpecialty = () => {
  return axios.get(`/api/get-specialty`);
};
const getAllClinic = () => {
  return axios.get(`/api/get-clinic`);
};

const getAllDetailSpecialtyById = (data) => {
  return axios.get(
    `/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
  );
};
const createNewClinic = (data) => {
  return axios.post('/api/create-new-clinic', data);
};
const getAllDetailClinicById = (data) => {
  return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
};
const getAllPatientForDoctor = (data) => {
  return axios.get(
    `/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`
  );
};
const postSendRemedy = (data) => {
  return axios.post('/api/send-remedy', data);
};
export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctorService,
  getDetailInforDoctor,
  saveBulkScheduleDoctor,
  getScheduleDoctorByDate,
  getExtraInforDoctorById,
  getProfileDoctorById,
  postPatientBookAppointment,
  postVerifyBookAppointment,
  createNewSpecialty,
  getAllSpecialty,
  getAllDetailSpecialtyById,
  createNewClinic,
  getAllClinic,
  getAllPatientForDoctor,
  getAllDetailClinicById,
  postSendRemedy,
};
