const jwt = require("jsonwebtoken");

// middleware function to authenticate users
exports.authenticateUser = async(req,res,next) =>{

  // retrieve the token from cookies or set it to null if not present
    const token = req.cookies?.token;
    console.log("token:- ", token);

    if(!token) {
      return res.status(404).send({msg:"User authentication failed"})
    }

    try {
      // verify the token using SECRET key 
        const payload =  jwt.verify(token, process.env.SECRET, { ignoreExpiration: false });

        console.log("payload: ", payload);

        // Attach user information to the request object
        req.user = 
        { id: payload.id, 
          username: payload.username,
          email: payload.email
        };

        console.log("req.user: ", req.user);
        next()
      } catch (error) {
        return res
        .status(400)
        .json({ success: false, message: error.message });
      }
}