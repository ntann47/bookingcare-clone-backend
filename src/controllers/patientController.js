import patientServices from "../services/patientServices";
const postPatientBookAppointment = async (req, res) => {
  try {
    let respone = await patientServices.handlePostPatientBookAppointment(
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
const postVerifyBookAppointment = async (req, res) => {
  try {
    let respone = await patientServices.handlePostVerifyBookAppointment(
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
module.exports = {
  postPatientBookAppointment,
  postVerifyBookAppointment,
};
