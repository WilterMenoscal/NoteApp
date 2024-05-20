import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NoteCategoryFilter = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [filteredNotes, setFilteredNotes] = useState([]);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        try {
            const res = await axios.get('http://localhost:8000/category');
            setCategories(res.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };
    
    const getNotesByCategory = async (categoryId) => {
        try {
            const res = await axios.get(`http://localhost:8000/category/filter/${categoryId}`);
            const formattedNotes = res.data.map(item => ({
                id: item.id_note,
                title: item.note.title,
                content: item.note.content
            }));
            setFilteredNotes(formattedNotes);
        } catch (error) {
            console.error("Error fetching notes by category:", error);
        }
    };
    
    const deleteNoteFromCategory = async (noteId) => {
        try {
            await axios.delete(`http://localhost:8000/category/filter/${selectedCategory}/${noteId}`);
            setFilteredNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
        } catch (error) {
            console.error("Error deleting note from category:", error);
        }
    };
    
    const handleChange = async (event) => {
        const categoryId = event.target.value;
        setSelectedCategory(categoryId);
        await getNotesByCategory(categoryId);
    };

    return (
        <div className="container">
            <div className='navbar-dark'>
                <nav class="navbar justify-content-between navbar-dark">
                     <div className="d-flex justify-content-end">
                        <h3 className=' text-left mt-4'>Filter Notes by Category</h3>
                    </div>
                    <Link to={'/'} className='btn btn-success me-2'><i class="fa-solid fa-arrow-left"></i></Link>
                </nav>
            </div>
            <div className="row justify-content-center mt-4">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="categorySelect" className="form-label">Select a category:</label>
                        <select
                            id="categorySelect"
                            className="form-select"
                            value={selectedCategory}
                            onChange={handleChange}
                        >
                            <option value="">-- Select --</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.NameC} ({category.id})</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center mt-4">
                <div className="col-md-8">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Note</th>
                                <th>Content</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredNotes.map(note => (
                                <tr key={note.id}>
                                    <td>{note.title}</td>
                                    <td>{note.content}</td>
                                    <td>
                                        <button onClick={() => deleteNoteFromCategory(note.id) } className="btn btn-danger " >Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default NoteCategoryFilter;
