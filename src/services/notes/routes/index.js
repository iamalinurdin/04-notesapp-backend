import express from "express";
import {
  create,
  destroy,
  get,
  show,
  update,
} from "../../controllers/note.controller.js";
import validate from "../../../middlewares/validate.js";
import {
  notePayloadSchema,
  noteQuerySchema,
} from "../../../validator/schema.js";
import validateQuery from "../../../middlewares/validateQuery.js";

const router = express.Router();

router.post("/notes", validate(notePayloadSchema), create);
router.get("/notes", validateQuery(noteQuerySchema), get);
router.get("/notes/:id", show);
router.put("/notes/:id", validate(notePayloadSchema), update);
router.delete("/notes/:id", destroy);

export default router;
