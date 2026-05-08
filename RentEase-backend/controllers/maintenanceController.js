const Maintenance = require("../models/Maintenance");

const createRequest = async (req, res) => {

  const { product, issue } = req.body;

  const request = new Maintenance({
    user: req.user._id,
    product,
    issue
  });

  const createdRequest = await request.save();

  res.status(201).json(createdRequest);
};


const getRequests = async (req, res) => {

  const requests = await Maintenance.find()
    .populate("user", "name email")
    .populate("product", "name");

  res.json(requests);
};
const updateMaintenanceStatus = async (req,res)=>{

 const request = await Maintenance.findById(req.params.id);

 if(!request){
  return res.status(404).json({message:"Request not found"});
 }

 request.status = req.body.status || request.status;

 const updatedRequest = await request.save();

 res.json(updatedRequest);

};
const deleteRequest = async (req, res) => {

  const request = await Maintenance.findById(req.params.id);

  if (!request) {
    return res.status(404).json({ message: "Request not found" });
  }

  await request.deleteOne();

  res.json({ message: "Maintenance request deleted" });
};
const getMyRequests = async (req, res) => {

 const requests = await Maintenance
   .find({ user: req.user._id })
   .populate("product", "name");

 res.json(requests);
};
const getAllRentals = async (req, res) => {
  const rentals = await Rental.find()
    .populate("user", "name email")
    .populate("product", "name pricePerMonth");

  res.json(rentals);
};
console.log("createRequest:", typeof createRequest);

module.exports = {
  createRequest,
  getRequests,
  updateMaintenanceStatus,
  deleteRequest,
  getMyRequests,
  
  
};