const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ", 2);
  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    req.user = user;
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, "Not authorized"));
    }
  } catch {
    next(HttpError(401, "Not authorized"));
  }
  next();
};

module.exports = authenticate;
