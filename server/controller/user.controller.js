const { UserModel } = require("../models/user.model.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// to register user
exports.userSignUp = async(req,res) => {

    const {name, email, password, username, bio} = req.body;


    if (!name || !email || !password || !username || !bio) {
        res.status(400).send({
            msg: "Every Fields are required"
        })
    }

    try {
        const newUser = new UserModel(req.body);
        console.log("New user object:", newUser);

        const result = await newUser.save(); 
        console.log("newUser: ", result);
        return res.status(200).send({
            msg:"SignUp Success",
            data: result
        });


    } catch (error) {
        console.error("Error during signup:", error);
        if (error.code === 11000) {
            return res.status(401).send({
                msg: "Account already exists with provided emil id"
            })
        }
        res.status(501).send({msg:error.message})
    }
}

// to login user
exports.userLogin = async(req,res) => {
    const {username,password} = req.body;
    try {
        const getuserData=await UserModel.findOne({username}).select("+password");

        if(getuserData && getuserData.username ){
            const result= await bcrypt.compare(password,getuserData.password)
            if(result){

                const token = await getuserData.jwtToken()

                // console.log("token: ", token);
                const cookieOption = {
                    maxAge: 24 * 60 * 60 * 1000, //24hr
                    
                    httpOnly: true //  not able to modify  the cookie in client side
                  };
              
                  res.cookie("token", token, cookieOption);
                  res.status(200).json({
                    success: true,
                    data: getuserData
                  });

            }else{
                res.status(404).send({msg:"Password is Incorrect, Try Again!"})
            }
        }else{  
            res.status(404).send({msg:"No Account Found Associated with this username"})
        }

        
    } catch (error) {
        res.status(501).send({msg:error.message})
    }
}


// get user Details

exports.getUserDetails = async(req,res) => {
    const {id,username} = req.user;
    try{
        const userData = await UserModel.findOne({username});
        res.status(200).send({
            msg:"Success",
            data:userData
        })

    }
    catch(err){
        res.status(501).send({msg:err.message})
    }

}