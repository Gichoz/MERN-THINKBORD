import Note from '../models/notes.model.js';
import mongoose from 'mongoose';

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json({success: true, data: notes});
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching notes', error });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid note ID' });
    }
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }
    res.status(200).json({ success: true, data: note });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching note', error });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json({ success: true, message: 'Note created successfully!', note: newNote });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating note', error });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
    if (!updatedNote) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }
    res.status(200).json({ success: true, message: 'Note updated successfully!', note: updatedNote });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating note', error });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }
    res.status(200).json({ success: true, message: 'Note deleted successfully!', note: deletedNote });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting note', error });
  }
};
