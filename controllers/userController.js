import userModel from "../models/userModel.js";

export const updateUserController = async (req,res,next ) => {
           const {name,email,lastname,location,phoneNumber,role} = req.body;
           if(!name ||!email || !lastname  || !location || !phoneNumber || !role){
            next('Please Provide All Fields');
           }
           const user = await userModel.findOne({_id: req.user.userId});
           user.name = name;
           user.lastname= lastname;
           user.email = email;
           user.location = location;
           user.phoneNumber = phoneNumber;
           user.role = role;
 
           await user.save();
           const token =user.createJWT();
           res.status(500).json({
            user,
            token,
           });
};