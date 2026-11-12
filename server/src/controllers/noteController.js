import mongoose from "mongoose";
import Video from "../models/Video.js";

const getNotes = async (req, res) => {
  try {
    const notes = await Video.find({
      createdBy: req.user._id,
      summary: {$ne: ""},
    })
      .select("title summary createdAt")
      .sort({createdAt: -1});

    return res.status(200).json({success: true, notes});
  } catch (error) {
    console.error("Get notes error:", error);
    return res.status(500).json({
      success: false,
      message: "Could not load notes.",
    });
  }
};

const getNoteById = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid note ID.",
    });
  }

  try {
    const note = await Video.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found.",
      });
    }

    return res.status(200).json({success: true, note});
  } catch (error) {
    console.error("Get note error:", error);
    return res.status(500).json({
      success: false,
      message: "Could not load note.",
    });
  }
};

const deleteNote = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid note ID.",
    });
  }

  try {
    const note = await Video.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note deleted successfully.",
    });
  } catch (error) {
    console.error("Delete note error:", error);
    return res.status(500).json({
      success: false,
      message: "Could not delete note.",
    });
  }
};

export {getNotes, getNoteById, deleteNote};
