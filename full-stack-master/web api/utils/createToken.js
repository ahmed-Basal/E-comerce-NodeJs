const jwt = require("jsonwebtoken");

const createToken = (payload) =>
  jwt.sign(
    { userId: payload },
    process.env.ACCESS_TOKEN_SECRET ||
      process.env.JWT_SECRET_KEY ||
      "thesecretkey",
    {
      expiresIn: process.env.JWT_EXPIRE_TIME || "1d",
    }
  );

const createRefreshToken = (payload) =>
  jwt.sign(
    { userId: payload },
    process.env.REFRESH_TOKEN_SECRET ||
      process.env.JWT_SECRET_KEY ||
      "thesecretkey",
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME || "90d",
    }
  );

createToken.createToken = createToken;
createToken.createAccessToken = createToken;
createToken.createRefreshToken = createRefreshToken;

module.exports = createToken;
