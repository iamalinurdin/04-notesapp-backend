import express from "express";
import {
  create,
  destroy,
  get,
  show,
  update,
} from "../../controllers/note.controller.js";
import validate from "../../../middlewares/validate.js";
import { notePayloadSchema } from "../../../validator/schema.js";

const router = express.Router();

router.post("/notes", validate(notePayloadSchema), create);
router.get("/notes", get);
router.get("/notes/:id", show);
router.put("/notes/:id", validate(notePayloadSchema), update);
router.delete("/notes/:id", destroy);

export default router;
