import express from 'express';
import { createCategory,createNoteCategory,getAllCategories,deleteCategories,getNotesByCategory,deleteNoteCategory } from '../controllers/CategoryController.js';

const router = express.Router();
router.post('/',createCategory);
router.post('/createNT/',createNoteCategory);
router.get('/', getAllCategories);
router.delete('/:id',deleteCategories);
router.get('/filter/:id',getNotesByCategory);
router.delete('/filter/:categoryId/:noteId', deleteNoteCategory); 

export default router;