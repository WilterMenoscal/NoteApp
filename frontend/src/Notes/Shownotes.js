import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

const URI = 'http://localhost:8000/notes/';

const CompShowNote = () => {
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
                    active: 'yes' 
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

    const archiveNote = async (id) => {
        try {
            await axios.put('http://localhost:8000/notes/archive/'+id, {active:"no"});
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
                            <h3 className=' text-left mt-4'>Active Notes</h3>
                            <div className="d-flex justify-content-end">
                                <Link to={'/archive/'} className='btn btn-success me-2'>View archived notes</Link>
                                <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    Category
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item ><Link to={'/Category/'} className='btn btn-success'>Create/set</Link></Dropdown.Item>
                                    <Dropdown.Item ><Link to={'/filter/'} className='btn btn-success'>Filter</Link></Dropdown.Item>
                                </Dropdown.Menu>
                                </Dropdown>
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
                                            <Link to={`/edit/${note.id}`} className='btn btn-info me-1'><i className="fa-solid fa-pen-to-square"></i></Link>
                                            <button onClick={() => deleteNote(note.id)} className='btn btn-danger ms-1'><i className="fa-solid fa-trash"></i></button>
                                            <button onClick={() => archiveNote(note.id)} className='btn btn-success  ms-2'><i className="fa-solid fa-box-archive"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Link to="/create" className='btn btn-primary mt-3 mb-3 float-end'><i className='fas fa-plus'> Add new note</i></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompShowNote;
