import express from "express";
import upload from "../cloud/multer.js";
import cloudinary from "../cloud/cloudinary.js";
import streamifier from "streamifier";

const router = express.Router();

// router.post("/upload", upload.single("file"), async (req, res) => {
//   try {
//     console.log("FILE:", req.file);
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const streamUpload = () => {
//       return new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//           { folder: "job_portal_uploads" },
//           (error, result) => {
//             if (result) resolve(result);
//             else reject(error);
//           }
//         );
//         streamifier.createReadStream(req.file.buffer).pipe(stream);
//       });
//     };

//     const result = await streamUpload();
// console.log("✅ Upload route loaded");
//     res.status(200).json({
//       success: true,
//       url: result.secure_url,
//       public_id: result.public_id,
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Upload failed" });
//   }
// });






router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const streamUpload = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "job_portal_uploads" },
          (error, result) => {
            if (error) {
              console.log("❌ CLOUDINARY ERROR:", error); // 🔥 IMPORTANT
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await streamUpload();

    res.status(200).json({
      success: true,
      url: result.secure_url,
    });

  } catch (error) {
    console.log("❌ FINAL ERROR:", error); // 🔥 IMPORTANT
    res.status(500).json({ error: error.message });
  }
});

export default router;
