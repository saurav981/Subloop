const MessageModel = require('../models/messageModel');
const UserModel = require('../models/userModel');
const PurchaseModel = require('../models/purchaseModel');
const catchAsync = require('../utils/catchAsync');
const { socketServer, getReceiverSocketId } = require('../utils/socket');
const AppError = require('../utils/appError');

exports.getUsersForSideBar = catchAsync(async (req, res, next) => {
  const senderId = req.user._id;

  // Fetch user to find their role
  const user = await UserModel.findById(senderId);

  // FAN: Find plans the loggedin user has purchased
  const purchases = await PurchaseModel.find({
    $or: [{ buyer: senderId }, { seller: senderId }],
  });
  if (!purchases) {
    return next(new AppError('You dont have an active plan'));
  }

  // Extract user ids from purchase and save in array
  const userIds = purchases.map((purchase) =>
    user.role === 'fan' ? purchase.seller : purchase.buyer
  );

  // Fetch all creators i've subscribed to,
  const filteredUsers = await UserModel.find({ _id: { $in: userIds } });

  res.status(200).json(filteredUsers);
});

exports.getMessages = catchAsync(async (req, res, next) => {
  const senderId = req.user._id;
  const { receiverId } = req.params;

  const messages = await MessageModel.find({
    $or: [
      { senderId: senderId, receiverId: receiverId },
      { senderId: receiverId, receiverId: senderId },
    ],
  });

  // Find remaining messages from purchase
  const purchase = await PurchaseModel.findOne({
    buyer: senderId,
    seller: receiverId,
  });

  res.status(200).json({ messages, purchase });
});

exports.sendMessage = catchAsync(async (req, res, next) => {
  const senderId = req.user._id;
  const { receiverId } = req.params;
  const { textMessage } = req.body;

  // Fetch user to find their role
  const user = await UserModel.findById(senderId);

  // If logged in user is a fan, only then check for purchase and reduce
  // If logged in user is a creator, skip this
  // Only if sender has purchased a plan, allow sending message
  // Also, reduce 'remainingMessages' by 1
  let purchase;
  if (user.role === 'fan') {
    purchase = await PurchaseModel.findOneAndUpdate(
      {
        buyer: senderId,
        seller: receiverId,
        remainingMessages: { $gt: 0 }, // Only allows sending msg if remainingMessages is > 0
      },
      { $inc: { remainingMessages: -1 } },
      { new: true }
    );

    // If the sender hasnt puchased a plan from the receiver, cant send message
    if (!purchase) {
      return next(new AppError('Your message credits are over', 403));
    }
  } else {
    purchase = null;
  }

  // Save msg to DB
  const newMessage = new MessageModel({ senderId, receiverId, textMessage });
  await newMessage.save();

  // realtime functionality with socket.io
  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverSocketId) {
    socketServer.to(receiverSocketId).emit('newMessage', newMessage);
  }

  res.status(201).json({ newMessage, purchase });
});
