const jwt = require("jsonwebtoken");
const genarateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = genarateToken;

// const jwt = require("jsonwebtoken");
// const genarateToken = (user) => {
//   return jwt.sign(user, process.env.JWT_SECRET, {
//     expiresIn: "30d",
//   });
// };

// module.exports = genarateToken;
