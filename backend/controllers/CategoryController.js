import CategoryModel from "../models/CreateCategory.js";
import NoteCategoryModel from "../models/NoteCategory.js";
import NoteModel from "../models/BlogModel.js";
export const createCategory= async (req,res)=>{
    try{
        await CategoryModel.create(req.body)
        res.json({
            "message":"Category created!"
        })
    }catch(error){
        res.json({message:error.message})
    }
}

export const createNoteCategory = async (req, res) => {
    try {
        await NoteCategoryModel.create(req.body);
        res.json({ message: 'Category created!'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getCategory= async (req,res)=>{
    try{
        const Note=await CategoryModel.findAll({
            where:{id:req.params.id}
        })
        res.json(Note[0])
    }catch(error){
        res.json({message:error.message})
    }
}

export const getNoteCategory= async (req,res)=>{
    try{
        const Note=await NoteCategoryModel.findAll({
            where:{id:req.params.id}
        })
        res.json(Note[0])
    }catch(error){
        res.json({message:error.message})
    }
}

 export const deleteCategories= async (req,res)=>{
    try{
        await CategoryModel.destroy({
            where:{id:req.params.id}
        })
        res.json({
            "message":"Register deleted!"
        })
    }catch(error){
        res.json({message:error.message})
    }
}

export const getNotesByCategory = async (req, res) => {
    const id = req.params.id;
    try {
        const filteredNotes = await NoteCategoryModel.findAll({
            where: { id_cat: id },
            include: [
                {
                    model: NoteModel, 
                    attributes: ['title', 'content'] 
                }
            ]
        });
        res.json(filteredNotes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteNoteCategory = async (req, res) => {
    const { noteId, categoryId } = req.params;
    try {
        await NoteCategoryModel.destroy({
            where: { id_note: noteId, id_cat: categoryId }
        });
        res.json({ message: "Note successfully removed from category." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
