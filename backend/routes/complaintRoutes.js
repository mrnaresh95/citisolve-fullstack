import express from "express";
import multer from "multer";
import Complaint from "../models/Complaint.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// Submit complaint
router.post("/", auth, upload.single("photo"), async (req, res) => {
  try {
    const complaint = await Complaint.create({
      user: req.user.id,
      ward: req.body.ward,
      location: req.body.location,
      category: req.body.category,
      description: req.body.description,
      photo: req.file ? req.file.filename : null
    });

    res.json({ message: "Complaint submitted", complaint });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get my complaints
router.get("/my", auth, async (req, res) => {
  const complaints = await Complaint.find({ user: req.user.id });
  res.json(complaints);
});

// Delete complaint
router.delete("/:id", auth, async (req, res) => {
  await Complaint.findByIdAndDelete(req.params.id);
  res.json({ message: "Complaint deleted" });
});

export default router;