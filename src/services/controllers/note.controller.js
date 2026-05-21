import { nanoid } from "nanoid";
import notes from "../notes/notes.js";
import { InvariantError, NotFoundError } from "../../exceptions/index.js";
import response from "../../utils/response.js";

export const get = (req, res) => {
  return response(res, 200, "success", { notes });
};

export const create = (req, res, next) => {
  const { title = "untitled", tags, body } = req.body;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  notes.push({
    id,
    title,
    tags,
    body,
    createdAt,
    updatedAt,
  });

  const success = notes.filter((note) => note.id === id).length > 0;

  if (!success) {
    return next(new InvariantError("catatan gagal ditambahkan"));
  }

  return response(res, 201, "catatan berhasil ditambahkan", { noteId: id });
};

export const show = (req, res, next) => {
  const { id } = req.params;
  const note = notes.find((note) => note.id === id);

  if (!note) {
    return next(new NotFoundError("catatan tidak ditemukan"));
  }

  return response(res, 200, "catatan sukses ditampilkan", { note });
};

export const update = (req, res, next) => {
  const { id } = req.params;
  const { title, tags, body } = req.body;
  const updatedAt = new Date().toISOString();
  const index = notes.findIndex((n) => n.id === id);

  if (index === -1) {
    return next(new NotFoundError("catatan tidak ditemukan"));
  }

  notes[index] = { ...notes[index], title, tags, body, updatedAt };

  return response(res, 200, "catatan berhasil diperbarui", notes[index]);
};

export const destroy = (req, res, next) => {
  const { id } = req.params;
  const index = notes.findIndex((n) => n.id === id);

  if (index === -1) {
    return next(new NotFoundError("catatan tidak ditemukan"));
  }

  notes.splice(index, 1);

  return response(res, 200, "catatan berhasil dihapus");
};
