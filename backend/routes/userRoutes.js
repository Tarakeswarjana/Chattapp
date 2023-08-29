const express = require("express");
const {
  registerUser,
  authUser,
  allUser,
} = require("../controller/userControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();
router.route("/").get(protect, allUser);
router.route("/").post(registerUser);
router.post("/login", authUser);
//router.route("/").get(protect, allUser);

module.exports = router;
