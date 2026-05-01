import jwt from "jsonwebtoken";
import User  from "../models/userModel.js";
import bcrypt,{  hash } from 'bcryptjs';
// import userModel from "../models/userModel.js";
import cloudinary from "../cloud/cloudinary.js";
import streamifier from 'streamifier';
import { sendVerificationEmail } from "../config/sendEmail.js";

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
    const newUser = await User.create({
      fullname,
      phone,
      email,
      password: hashedPassword,
      role,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "14d"
    });

    await sendVerificationEmail(newUser.email, token);

    return res.status(200).json({
            message:'Account created successfully, please verify your email',
            success: true
        })
    } catch (error) {
  console.log("REGISTER ERROR:", error);
  return res.status(500).json({
    success: false,
    message: error.message
  });
}
}

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.isVerified) {
      return res.json({ message: "Email already verified" });
    }

    user.isVerified = true;
    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};


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

//     if (!user.isVerified) {
//   return res.status(401).json({
//     message: "Please verify your email first",
//     success: false,
//   });
// }

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
    console.log("🔥 APPLY ERROR:", error);
  return res.status(500).json({
    success: false,
    message: error.message,
    fullError: error,
  });
  }
};


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


export const updateController = async (req, res) => {
  try {
    const { fullname, phone, bio, skills, profilePhoto, resume } = req.body;
console.log("🔥 UPDATE API HIT");
console.log("BODY:", req.body);
    console.log("Update request received:", { fullname, phone, bio, skills, profilePhoto, resume });

    const skillsArray = skills
      ? skills.split(",").map((s) => s.trim())
      : [];

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    // Ensure profile object exists
    if (!user.profile) {
      user.profile = {
        bio: '',
        skills: [],
        resume: '',
        profilePhoto: ''
      };
    }

    if (fullname) user.fullname = fullname;
    if (phone) user.phone = phone;
    if (bio) user.profile.bio = bio;
    if (skillsArray.length > 0) user.profile.skills = skillsArray;

    // 🔥 Save URLs directly - explicitly set even if empty
    if (profilePhoto) {
      console.log("Setting profile photo:", profilePhoto);
      user.profile.profilePhoto = profilePhoto;
    }
    if (resume) {
      console.log("Setting resume:", resume);
      user.profile.resume = resume;
    }

    // Mark the profile as modified so Mongoose picks up nested changes
    user.markModified('profile');
    
    const updatedUser = await user.save();

    console.log("User updated successfully:", updatedUser);
    console.log("Profile photo in DB:", updatedUser.profile.profilePhoto);

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Error updating profile: " + error.message,
      error: error.message,
    });
  }
};

export const userProfileController = async(req,res) => {
  try {
    const userId = req.user._id
    const user = await User.findById(userId)
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