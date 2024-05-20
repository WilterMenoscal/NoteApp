import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const URI = 'http://localhost:8000/notes/';

const CompArchiveNote = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const res = await axios.get(`${URI}`, {
                params: {
                    author_id: userId,
                    active: 'no'
                }
            }); 
            setNotes(res.data);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };


    const deleteNote = async (id) => {
        await axios.delete(`${URI}${id}`);
        getNotes();
    };


    const UnarchiveNote = async (id) => {
        try {
            await axios.put('http://localhost:8000/notes/unarchive/'+id, {active:"yes"});
            getNotes();

        } catch (error) {
            console.error("Error archiving note:", error);
        }
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <div className="container justify-content-center">
                    <div className='navbar-dark'>
                        <nav class="navbar justify-content-between navbar-dark">
                           <Link to={'/'} className='btn btn-success me-2'><i class="fa-solid fa-arrow-left"></i></Link>
                            <div className="d-flex justify-content-end">
                                <h3 className=' text-left mt-4'>Archive Notes</h3>
                            </div>
                        </nav>
                    </div>
                        <table className="table mt-3 mb-3">
                            <thead className="table-primary">
                                <tr>
                                    <th>Title</th>
                                    <th>Content</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {notes.map((note) => (
                                    <tr key={note.id}>
                                        <td>{note.title}</td>
                                        <td>{note.content}</td>
                                        <td>
                                            <button onClick={() => deleteNote(note.id)} className='btn btn-danger ms-1'><i className="fa-solid fa-trash"></i></button>
                                            <button onClick={() => UnarchiveNote(note.id)} className='btn btn-success  ms-2'><i className="fa-solid fa-box-archive"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompArchiveNote;
