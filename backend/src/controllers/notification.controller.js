import Notification from "../models/notification.model.js";
import asyncHandler from 'express-async-handler'

export const getNotifications = asyncHandler(async (req, res) => {
  
  const notifications = await Notification.find({ recipient: req.user._id })
  .populate('sender', 'name')
  .exec()

  res.status(200).json(notifications)

})


export const readNotification = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const notification = await Notification.findById(id).exec()
  if(!notification) {
    return res.status(404).json({ message: "Notification not found" })
  }
  if(notification.recipient.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "You are not allowed to read this notification" })
  }

  notification.isRead = true
  await notification.save()

  res.sendStatus(204)
})