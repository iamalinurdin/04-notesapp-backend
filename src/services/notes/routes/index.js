import express from "express";
import {
  create,
  destroy,
  get,
  show,
  update,
} from "../controllers/note.controller.js";
import validate from "../../../middlewares/validate.js";
import {
  notePayloadSchema,
  noteQuerySchema,
} from "../../../validator/schema.js";
import validateQuery from "../../../middlewares/validateQuery.js";
import authenticateToken from "../../../middlewares/auth.js";

const router = express.Router();

router.post("/notes", authenticateToken, validate(notePayloadSchema), create);
router.get("/notes", authenticateToken, validateQuery(noteQuerySchema), get);
router.get("/notes/:id", authenticateToken, show);
router.put(
  "/notes/:id",
  authenticateToken,
  validate(notePayloadSchema),
  update,
);
router.delete("/notes/:id", authenticateToken, destroy);

export default router;
