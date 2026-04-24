import JWT from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed: Invalid or missing token",
      });
    }

    const token = authHeader.split(" ")[1];

    // Verify the token
    JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Authentication failed: Invalid or expired token",
        });
      }

      // Set the decoded user information in the request object
      req.user = { userId: decoded.userId };
      next();
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Authentication failed: Unauthorized",
    });
  }
};
