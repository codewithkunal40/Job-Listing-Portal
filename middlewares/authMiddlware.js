import JWT from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
  try {
    // Retrieve the authorization header
    const authHeader = req.headers.authorization;

    // Log the authorization header for debugging
    console.log("Authorization Header:", authHeader);

    // Check if the authorization header exists and starts with "Bearer"
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed: Invalid or missing token",
      });
    }

    // Extract the token from the header
    const token = authHeader.split(" ")[1];

    // Verify the token using JWT
    const payload = JWT.verify(token, process.env.JWT_SECRET);

    // Log the decoded payload for debugging
    console.log("Decoded Payload:", payload);

    // Attach user info to the request object for use in other routes
    req.user = { userId: payload.userId };

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Log the error for debugging
    console.error("Authentication Error:", error.message);

    // Send error response
    res.status(401).json({
      success: false,
      message: "Authentication failed: Invalid or expired token",
    });
  }
};
