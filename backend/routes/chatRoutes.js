const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { accesChat, fetchChats } = require("../controller/chatControlers");
const router = express.Router();

router.route("/").post(protect, accesChat);
router.route("/").get(protect, fetchChats);

// router.route("/group").post(protect, createGroupChat);
// router.route("/rename").put(protect, renameGroup);
// router.route("/groupremove").put(protect, romoveFromGroup);
// router.route("/groupadd").put(protect, addToGroup)

module.exports = router;
