import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const URI='http://localhost:8000/notes/'

const CompCreateNote =()=>{
    const [title,setTitle]=useState('')
    const [content,setContent]=useState('')
    const navigate = useNavigate()

    const store = async(e) => {
        e.preventDefault()
        const userId = localStorage.getItem('userId'); 
        await axios.post(URI, { title: title, content: content, author_id: userId });
        navigate('/')
    }
    return(
        <div>
            <form onSubmit={store}>
            <div className="container-sm justify-content-center">
                <div className="row justify-content-center align-items-center mt-4"> 
                    <h3 className="text-center"> Create Note</h3>
                    <div className="col-md-6"> 
                        <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Content</label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary align-items-center text-center">Store</button>
                    </div>
                </div>
            </div>
            </form>
        </div>
    )
}

export default CompCreateNote