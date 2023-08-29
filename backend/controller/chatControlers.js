const asyncHandler = require("express-async-handler");
const Chat = require("../chatModel");
const User = require("../userModel");

const accesChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  console.log("=======================", req.user);
  // const userId = req.body.userId;
  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }
  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };
    try {
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat.id }).populate(
        "users",
        "-password"
      );
      res.statusCode(200).send(FullChat);
    } catch (error) {
      res.statusCode(400);
      throw new Error(error.message);
    }
  }
});

const fetchChats = asyncHandler(async (req, res) => {
  console.log("=======================", req.user);
  console.log("hellow");

  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } }).then(
      (result) => {
        res.send(result);
        console.log("pppppp" + result);
      }
    );
  } catch (error) {
    res.send(error);
  }
});

module.exports = { accesChat, fetchChats };
