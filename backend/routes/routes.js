import express from 'express';
import { createNote, deleteNote, getAllNotes, getNote, updateNote,archiveNote,unarchiveNote } from '../controllers/BlogController.js';

const router = express.Router();
router.get('/', getAllNotes);
router.get('/:id', getNote);
router.post('/', createNote);
router.put('/:id',  updateNote);
router.delete('/:id',  deleteNote);
router.put('/archive/:id', archiveNote);
router.put('/unarchive/:id',unarchiveNote);


export default router;
 