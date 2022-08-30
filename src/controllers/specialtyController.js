import specialtyServices from "../services/specialtyServices";
let createSpecialty = async (req, res) => {
  try {
    let respone = await specialtyServices.handleCreateSpecialtyService(
      req.body
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
const getAllSpecialty = async (req, res) => {
  try {
    let respone = await specialtyServices.handleGetAllSpecialtyService();
    return res.status(200).json(respone);
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getSpecialtyDetailById = async (req, res) => {
  try {
    let respone = await specialtyServices.handleGetDetailSpecialtyByIdService(
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
  createSpecialty,
  getAllSpecialty,
  getSpecialtyDetailById,
};
