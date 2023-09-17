const jwt = require("jsonwebtoken");
const secretKey = "secretKey"; 

const requireAuth = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    console.error("Unauthorized: No token provided");
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const [tokenType, token] = authorizationHeader.split(" ");

  if (tokenType !== "Bearer" || !token) {
    console.error("Unauthorized: Invalid token format");
    return res.status(401).json({ error: "Unauthorized: Invalid token format" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.userId = decoded.userId;
    next();
  } catch (e) {
    console.error("Unauthorized: Invalid token", e);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

module.exports = requireAuth;
