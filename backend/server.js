const express = require("express");
const { chats } = require("./data");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

dotenv.config();

connectDB();
const app = express();
app.use(express.json());

const port = process.env.PORT || 4000;

app.listen(port, console.log(`server started at ${port}`));

app.get("/", (req, res) => {
  res.send("request send");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use(notFound);
app.use(errorHandler);

// app.get("/app/chat", (req, res) => {
//   res.send(chats);
// });

// app.get("/app/chat/:id", (req, res) => {
//   const singlechatt = chats.find((ele) => ele._id === req.params.id);
//   res.send(singlechatt);
// });
