import express from "express";
import {
  create,
  destroy,
  get,
  show,
  update,
} from "../../controllers/note.controller.js";

const router = express.Router();

router.post("/notes", create);
router.get("/notes", get);
router.get("/notes/:id", show);
router.put("/notes/:id", update);
router.delete("/notes/:id", destroy);

export default router;
