import {  Events } from "../models/eventsSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const createEvents = async (req, res, next) => {
  console.log(req.body);
  const { events } = req.body;
  try {
  if (!events ) {
    return next("Please Fill Form!", 400);
  }
  const newEvent = await Events.create({ events });
  res.status(200).json({
    success: true,
    message: "Event is Created!",
    event: newEvent,
  });    
  }  catch (err) {
    next(err);
  }
};

export const getAllEvents = async (req, res, next) => {
  try {
   const event = await Events.find();
  res.status(200).json({
    success: true,
    event,
  });   
}  catch (err) {
  next(err);
}
};

export const deleteEvents = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: "Event ID is required" });
    }
    const deletedEvent = await Events.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }
    res.status(200).json({
      success: true,
      message: "Event deleted successfully!",
    });
  } catch (err) {
    next(err);
  }
};
 
