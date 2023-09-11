import { RequestHandler } from "express";
import Note, { newDocument } from "../models/ note";

//export is using to use these somewhere else also
export interface BodyType {
  title: string;
  description?: string;
}

//middlewhere function it runs before the actual logic and it can be multiple
export const create: RequestHandler = async (req, res) => {
  const newNote = await Note.create<newDocument>({
    title: (req.body as BodyType).title,
    description: (req.body as BodyType).description,
  });

  res.json({
    note: {
      id: newNote._id,
      title: newNote.title,
      description: newNote.description,
    },
  });
};

export const updateSingleNote: RequestHandler = async (req, res) => {
  const { noteID } = req.params;
  const { title, description } = req.body as BodyType;

  const note = await Note.findByIdAndUpdate(
    noteID,
    { title, description },
    { new: true }
  );
  if (!note) {
    return res.json({ error: "Note not found!" });
  }
  res.json({ note: {
    id: note._id,
    title: note.title,
    description: note.description,
  }, });
};

export const deleteSingleNote: RequestHandler = async (req, res) => {
  const { noteID } = req.params;
  const removedNote = await Note.findByIdAndDelete(noteID);
  if (!removedNote) {
    return res.json({ error: "Could not remove note" });
  }
  res.json({ message: "note removed successfully!" });
};

export const getAllNotes: RequestHandler = async (req, res) => {
  const notes = await Note.find();
  res.json({
    notes: notes.map((note) => {
      return {
        id: note._id,
        title: note.title,
        description: note.description,
      };
    }),
  });
};

export const getSingleNote: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const note = await Note.findById(id);
  if (!note) {
    return res.json({ error: "Note not found!" });
  }
  res.json({ note });
};
