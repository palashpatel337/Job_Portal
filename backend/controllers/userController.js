import jwt from "jsonwebtoken";
import User  from "../models/userModel.js";
import bcrypt,{  hash } from 'bcryptjs';
import userModel from "../models/userModel.js";

export const registerController = async (req,res) => {
    try {
        const {fullname, phone, email, password, role} = req.body;
        if( !fullname || !phone || !email || !password || !role){
            return res.status(400).json({
                message:'Something is missing',
                success: false
            })
        }
    const user = await User.findOne({email});
    if(user){
        return res.status(400).json({
            message:'User already exists',
            success: false
        })
    } 
    
    const hashedPassword = await bcrypt.hash(password,10);

    await User.create({
      fullname,
      phone,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(200).json({
            message:'Account created successfully',
            success: true
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const loginController = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User doesn't exist",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Role mismatch",
        success: false,
      });
    }

    const token = jwt.sign(
      { _id: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "14d" }
    );

    return res.status(200).json({
      message: "Login successful",
      success: true,
      token, // ✅ IMPORTANT
      user: {
        userId: user._id,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        role: user.role,
        profile: user.profile,
      },
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// };    try {
//         const { email, password, role } = req.body;

//         if (!email || !password || !role) {
//             return res.status(400).json({
//                 message: "All fields are required",
//                 success: false
//             });
//         }

//         let user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({
//                 message: "User doesn't exist",
//                 success: false
//             });
//         }

//         const isPasswordMatch = await bcrypt.compare(password, user.password);
//         if (!isPasswordMatch) {
//             return res.status(400).json({
//                 message: "Password is incorrect",
//                 success: false
//             });
//         }

//         if (role !== user.role) {
//             return res.status(400).json({
//                 message: "User doesn't exist with current role",
//                 success: false
//             });
//         }

//         const tokenData = {
//             _id: user._id
//         };

//         const token = jwt.sign(
//             tokenData,
//             process.env.SECRET_KEY,
//             { expiresIn: "1d" }
//         );

//         user = {
//             userId: user._id,
//             fullname: user.fullname,
//             email: user.email,
//             phone: user.phone,
//             role: user.role,
//             profile: user.profile
//         };

// return res.status(200).json({
//     message: "Logged in successfully",
//     user,
//     token,   // 🔥 add this
//     success: true
// });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             message: "Internal server error",
//             success: false
//         });
//     }


export const logoutController = async (req, res) => {
    try {
        return res
            .status(200)
            .cookie("token", "", {
                maxAge: 0,
                httpOnly: true,
                sameSite: "strict"
            })
            .json({
                message: "Logged out successfully",
                success: true
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const updateController = async (req,res) => {
    try {
        let {fullname, phone, email, bio, skills} = req.body;

    const profilePhoto = req.files?.profilePhoto?.[0];
    const resume = req.files?.resume?.[0];
        const skillsArray = skills
        ? skills.split(",").map((s) => s.trim())
        : [];

        const userId = req.user;

        let user = await User.findById(userId);

        if(!user){
            return res.status(400).json({
                message:"User doesn't exist",
                success:false
            })
        }
        if(!user.profile){
            user.profile = {};
        }

        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phone) user.phone = phone
        if(bio) user.profile.bio = bio

        if(skillsArray.length > 0){
            user.profile.skills = skillsArray
        }

        // 🔥 PROFILE PHOTO
    if (profilePhoto) {
      user.profile.profilePhoto = profilePhoto.filename;
    }

    // resume
    if (resume) {
      user.profile.resume = resume.filename;
    }

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phone: user.phone,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message:'Profile updated successfully',
            user,
            success:true
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message:"Internal server error",
            success:false
        });
    }
}

export const userProfileController = async(req,res) => {
  try {
    const userId = req.user
    const user = await userModel.findById(userId)
    if(!user){
      return res.status(404).json({
        message: "User Profile Missing",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Profile fetched successfully",
      success: true,
      user
    })

  } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
  }
}