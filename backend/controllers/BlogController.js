import NoteModel from "../models/BlogModel.js";

//Show all registers
export const getAllNotes = async (req, res) => {
    try {
        const userId = req.query.author_id; 
        const notes = await NoteModel.findAll({
            where: { 
                author_id: userId,
                active: req.query.active 
            } 
        });
        res.json(notes);
    } catch (error) {
        res.json({ message: error.message });
    }
}


//Show a register
 export const getNote= async (req,res)=>{
    try{
        const Note=await NoteModel.findAll({
            where:{id:req.params.id}
        })
        res.json(Note[0])
    }catch(error){
        res.json({message:error.message})
    }
}

//Create a register
 export const createNote= async (req,res)=>{
    try{
        await NoteModel.create(req.body)
        res.json({
            "message":"Register created!"
        })
    }catch(error){
        res.json({message:error.message})
    }
}

//Update a register
 export const updateNote= async (req,res)=>{
    try{
        await NoteModel.update(req.body,{
            where:{id:req.params.id}
        })
        res.json({
            "message":"Register update!"
        })
    }catch(error){
        res.json({message:error.message})
    }
}

 //Delete a register
 export const deleteNote= async (req,res)=>{
    try{
        await NoteModel.destroy({
            where:{id:req.params.id}
        })
        res.json({
            "message":"Register deleted!"
        })
    }catch(error){
        res.json({message:error.message})
    }
}

export const archiveNote = async (req, res) => {
    try {
        const { id } = req.params;
        await NoteModel.update({ active: 'no' }, { where: { id } });
        res.json({ message: "Note archived successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const unarchiveNote = async (req, res) => {
    try {
        const { id } = req.params;
        await NoteModel.update({ active: 'yes' }, { where: { id } });
        res.json({ message: "Note unarchived successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
