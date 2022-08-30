import clinicServices from "../services/clinicServices";
let createClinic = async (req, res) => {
  try {
    let respone = await clinicServices.handleCreateClinicService(req.body);
    return res.status(200).json(respone);
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getAllClinic = async (req, res) => {
  try {
    let respone = await clinicServices.handleGetAllClinicService();
    return res.status(200).json(respone);
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getClinicDetailById = async (req, res) => {
  try {
    let respone = await clinicServices.handleGetClinicDetailByIdService(
      parseInt(req.query.id, 10),
      req.query.location
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
module.exports = {
  createClinic,
  getClinicDetailById,
  getAllClinic,
};
