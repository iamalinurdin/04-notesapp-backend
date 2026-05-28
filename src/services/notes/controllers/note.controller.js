import {
  InvariantError,
  NotFoundError,
  AuthorizationError,
} from "../../../exceptions/index.js";
import response from "../../../utils/response.js";
import NoteRepository from "../../../repositories/note.repository.js";

export const get = async (req, res) => {
  const { id: owner } = req.user;
  const notes = await NoteRepository.getNotes(owner);

  return response(res, 200, "success", { notes });
};

export const create = async (req, res, next) => {
  const { title = "untitled", tags, body } = req.validated;
  const { id: owner } = req.user;
  const note = await NoteRepository.createNote({
    title,
    body,
    tags,
    owner,
  });

  if (!note) {
    return next(new InvariantError("catatan gagal ditambahkan"));
  }

  return response(res, 201, "catatan berhasil ditambahkan", { note });
};

export const show = async (req, res, next) => {
  const { id } = req.params;
  const { id: owner } = req.user;

  const isOwner = await NoteRepository.verifyNoteAccess(id, owner);

  if (!isOwner) {
    return next(
      new AuthorizationError("Anda tidak berhak mengakses resource ini"),
    );
  }

  const note = await NoteRepository.getNoteById(id);

  if (!note) {
    return next(new NotFoundError("catatan tidak ditemukan"));
  }

  return response(res, 200, "catatan sukses ditampilkan", { note });
};

export const update = async (req, res, next) => {
  const { id } = req.params;
  const { title, tags, body } = req.body;
  const { id: owner } = req.user;

  const isOwner = await NoteRepository.verifyNoteAccess(id, owner);

  if (!isOwner) {
    return next(
      new AuthorizationError("Anda tidak berhak mengakses resource ini"),
    );
  }

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
  const { id: owner } = req.user;
  const isOwner = await NoteRepository.verifyNoteAccess(id, owner);

  if (!isOwner) {
    return next(
      new AuthorizationError("Anda tidak berhak mengakses resource ini"),
    );
  }

  const deletedNote = await NoteRepository.deleteNote(id);

  if (!deletedNote) {
    return next(new NotFoundError("Catatan tidak ditemukan"));
  }

  return response(res, 200, "Catatan berhasil dihapus", deletedNote);
};
