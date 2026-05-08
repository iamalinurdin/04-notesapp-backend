import { nanoid } from "nanoid";
import notes from "./notes.js";

export const get = (req, res) => {
  return res.json({
    status: "success",
    data: {
      notes,
    },
  });
};

export const create = (req, res) => {
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

  if (success) {
    return res.status(201).json({
      status: "success",
      message: "berhasil ditambahkan",
      data: {
        id,
      },
    });
  }

  return res.status(500).json({
    status: "fail",
    message: "gagal menambahkan",
  });
};

export const show = (req, res) => {
  const { id } = req.params;
  const note = notes.find((note) => note.id === id);

  if (note) {
    return res.status(200).json({
      status: "success",
      message: "berhasil",
      data: {
        note,
      },
    });
  }

  return res.status(404).json({
    status: "fail",
    message: "gagal",
  });
};

export const update = (req, res) => {
  const { id } = req.params;
  const { title, tags, body } = req.body;
  const updatedAt = new Date().toISOString();
  const index = notes.findIndex((n) => n.id === id);

  if (index !== -1) {
    notes[index] = { ...notes[index], title, tags, body, updatedAt };

    return res.status(200).json({
      status: "success",
      message: "berhasil",
    });
  }

  return res.status(404).json({
    status: "fail",
    message: "gagal",
  });
};

export const destroy = (req, res) => {
  const { id } = req.params;
  const index = notes.findIndex((n) => n.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    return res.json({
      status: "success",
      message: "Catatan berhasil dihapus",
    });
  }

  return res.status(404).json({
    status: "fail",
    message: "Catatan gagal dihapus. Id tidak ditemukan",
  });
};
