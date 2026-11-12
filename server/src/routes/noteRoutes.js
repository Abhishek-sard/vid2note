import express from "express";
import protect from "../middleware/authMiddleware.js";
import {deleteNote, getNoteById, getNotes} from "../controllers/noteController.js";

const router = express.Router();

router.use(protect);
router.get("/", getNotes);
router.get("/:id", getNoteById);
router.delete("/:id", deleteNote);

export default router;
