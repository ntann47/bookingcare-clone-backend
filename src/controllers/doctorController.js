import doctorServices from "../services/doctorServices";
const getTopDoctorsHome = async (req, res) => {
  let limit = parseInt(req.query.limit, 10);
  if (!limit) {
    limit = 12;
  } else {
    limit = parseInt(req.query.limit, 10);
  }
  try {
    let respone = await doctorServices.getTopDoctorsHome(limit);
    return res.status(200).json(respone);
  } catch (err) {
    console.error(err);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from server",
    });
  }
};
const getAllDoctors = async (req, res) => {
  try {
    let doctors = await doctorServices.getAllDoctors();
    return res.status(200).json({
      errCode: 0,
      errMessage: "Ok",
      data: doctors,
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from server",
    });
  }
};
const postDoctorInfo = async (req, res) => {
  try {
    let respone = await doctorServices.postDoctorInfoService(req.body);
    return res.status(200).json(respone);
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from server",
    });
  }
};
const getDoctorDetailById = async (req, res) => {
  try {
    let doctorId = parseInt(req.query.id, 10);
    let respone = await doctorServices.getDoctorDetailByIdService(doctorId);
    return res.status(200).json(respone);
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const bulkCreateSchedule = async (req, res) => {
  try {
    let respone = await doctorServices.handleBulkCreateSchedule(req.body);
    return res.status(200).json(respone);
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getDoctorScheduleByDate = async (req, res) => {
  try {
    console.log(req.query.doctorId);
    console.log(req.query.date);
    let respone = await doctorServices.handleGetDoctorScheduleByDateService(
      req.query.doctorId,
      req.query.date
    );
    return res.status(200).json(respone);
  } catch (err) {
    console.log(err);

    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getMoreDoctorInfoById = async (req, res) => {
  try {
    let doctorId = parseInt(req.query.doctorId, 10);
    let respone = await doctorServices.handleGetMoreDoctorInfoByIdService(
      doctorId
    );
    return res.status(200).json(respone);
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getDoctorProfileById = async (req, res) => {
  try {
    let doctorId = parseInt(req.query.doctorId, 10);
    let respone = await doctorServices.handleGetDoctorProfileByIdService(
      doctorId
    );
    return res.status(200).json(respone);
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getListPatientForDoctor = async (req, res) => {
  try {
    let doctorId = parseInt(req.query.doctorId, 10);
    let respone = await doctorServices.handleGetListPatientForDoctorService(
      doctorId,
      req.query.date
    );
    return res.status(200).json(respone);
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const sendRemedy = async (req, res) => {
  try {
    let respone = await doctorServices.handleSendRemedyService(req.body);
    return res.status(200).json(respone);
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  getTopDoctorsHome,
  getAllDoctors,
  postDoctorInfo,
  getDoctorDetailById,
  bulkCreateSchedule,
  getDoctorScheduleByDate,
  getMoreDoctorInfoById,
  getDoctorProfileById,
  getListPatientForDoctor,
  sendRemedy,
};
