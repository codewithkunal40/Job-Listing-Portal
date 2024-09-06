import JWT from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if auth header exists and starts with "Bearer"
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).send({
        success: false,
        message: "Authentication failed: Invalid token format",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token
    const payload = JWT.verify(token, process.env.JWT_SECRET);

    // Attach user info to request object
    req.user = { userId: payload.userId };

    next();
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Authentication failed: Invalid or expired token",
    });
  }
};
