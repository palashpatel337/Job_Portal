import express from "express";
import upload from "../cloud/multer.js";
import cloudinary from "../cloud/cloudinary.js";
import streamifier from "streamifier";

const router = express.Router();




router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const mime = req.file.mimetype;

    let resourceType = "auto";
    let folder = "job_portal_uploads";

    if (mime === "application/pdf") {
      folder = "job_portal_uploads/resumes";
      resourceType = "raw";
    } else {
      folder = "job_portal_uploads/images";
      resourceType = "image";
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: resourceType,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    return res.status(200).json({
      success: true,
      url: result.secure_url,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
