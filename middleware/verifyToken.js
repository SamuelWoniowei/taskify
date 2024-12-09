import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const verifyToken = (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.redirect("/");
  }

  try {
    const user = jwt.verify(token, SECRET_KEY);
    res.locals.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.clearCookie("authToken");
    res.redirect("/");
  }
};

export default verifyToken;
