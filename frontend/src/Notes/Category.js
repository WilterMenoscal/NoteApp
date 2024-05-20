import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const URI='http://localhost:8000/category/';

const Category = () => {
    const [NameC, setName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState('');

    useEffect(() => {
        getCategories();
        getNotes();
    }, []);

    const getCategories = async () => {
        try {
            const res = await axios.get(URI); 
            setCategories(res.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const getNotes = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const res = await axios.get('http://localhost:8000/notes/', {
                params: {
                    author_id: userId,
                    active: 'yes'
                }
            }); 
            setNotes(res.data);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    const deleteCategory = async (id) => {
        await axios.delete(`${URI}${id}`);
        getCategories();
    };

    const storeCategory = async (e) => {
        e.preventDefault();
        await axios.post(URI, { NameC: NameC });
        setName('');
        getCategories();
    };
    
    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleChange2 = (event) => {
        setSelectedNote(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(URI+'createNT/', {
                id_cat: selectedCategory,
                id_note: selectedNote
            });
            getNotes();
            selectedCategory("");
            selectedNote("");
            console.log('Data saved successfully!');
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    return (
        <div>
            <form onSubmit={storeCategory}>
                <div className="container-sm justify-content-center">
                    <div className="row justify-content-center align-items-center mt-4"> 
                       <nav class="navbar justify-content-between navbar-dark">
                            <div className="d-flex justify-content-end">
                                <h3 className=' text-center mt-4'>Create Category</h3>
                            </div>
                            <Link to={'/'} className='btn btn-success me-2'><i class="fa-solid fa-arrow-left"></i></Link>
                        </nav>
                        <div className="col-md-6"> 
                            <div className="mb-3">
                                <input
                                    value={NameC}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    className="form-control"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary align-items-center text-center">Store</button>
                        </div>
                    </div>
                </div>
            </form>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="container-sm">
                            <table className="table table-sm mt-3 mb-3">
                                <thead className="table-primary">
                                    <tr>
                                        <th>Id</th>
                                        <th>Category</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((category) => (
                                        <tr key={category.id}>
                                            <td>{category.id}</td>
                                            <td>{category.NameC}</td>
                                            <td>
                                                <button onClick={() => deleteCategory(category.id)} className='btn btn-danger ms-1'><i className="fa-solid fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>    
                    </div>
                    <div className="col-md-auto border border-dark rounded ">
                        <div className="container">
                            <form onSubmit={handleSubmit}>
                                <h3 className="text-center  mt-3 mb-3">Add category to note</h3>
                                <div className="mb-3">
                                    <label htmlFor="noteSelect" className="form-label">Select a note:</label>
                                    <select
                                        id="noteSelect"
                                        className="form-select"
                                        value={selectedNote}
                                        onChange={handleChange2}
                                    >
                                        <option value="">-- Select --</option>
                                        {notes.map(note => (
                                            <option key={note.id} value={note.id}>{`${note.title},${note.content}(${note.id})`}</option>
                                        ))}
                                    </select>
                                </div>
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
                                            <option key={category.id} value={category.id}>{`${category.NameC}(${category.id})`}</option>
                                        ))}
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary mb-3">Add Category</button>
                            </form>
                        </div>    
                    </div>                    
                </div>
            </div>
        </div>
    )
}

export default Category;
