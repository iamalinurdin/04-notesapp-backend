import { InvariantError, NotFoundError } from "../../exceptions/index.js";
import response from "../../utils/response.js";
import NoteRepository from "../../repositories/note.repository.js";

export const get = async (req, res) => {
  const notes = await NoteRepository.getNotes();

  return response(res, 200, "success", { notes });
};

export const create = async (req, res, next) => {
  const { title = "untitled", tags, body } = req.validated;
  const note = await NoteRepository.createNote({
    title,
    body,
    tags,
  });

  if (!note) {
    return next(new InvariantError("catatan gagal ditambahkan"));
  }

  return response(res, 201, "catatan berhasil ditambahkan", { note });
};

export const show = async (req, res, next) => {
  const { id } = req.params;
  const note = await NoteRepository.getNoteById(id);

  if (!note) {
    return next(new NotFoundError("catatan tidak ditemukan"));
  }

  return response(res, 200, "catatan sukses ditampilkan", { note });
};

export const update = async (req, res, next) => {
  const { id } = req.params;
  const { title, tags, body } = req.body;

  const note = await NoteRepository.editNote({
    tags,
    title,
    body,
    id,
  });

  if (!note) {
    return next(new NotFoundError("Catatan tidak ditemukan"));
  }

  return response(res, 200, "catatan berhasil diperbarui", note);
};

export const destroy = async (req, res, next) => {
  const { id } = req.params;
  const deletedNote = await NoteRepository.deleteNote(id);

  if (!deletedNote) {
    return next(new NotFoundError("Catatan tidak ditemukan"));
  }

  return response(res, 200, "Catatan berhasil dihapus", deletedNote);
};
