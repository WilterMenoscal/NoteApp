import axios from "axios";
import { useEffect,useState } from "react";
import { useNavigate,useParams } from "react-router-dom";

const URI='http://localhost:8000/notes/'
const CompeditNote =()=>{
    const [title,setTitle]=useState('')
    const [content,setContent]=useState('')
    const navigate = useNavigate()
    const {id} = useParams()

    const update = async(e) => {
        e.preventDefault()
        await axios.put(URI+id,{title:title, content :content})
        navigate('/')
    }
    useEffect(()=>{
        getNotebyId()
    },[])

    const getNotebyId =async()=>{
        const res = await axios.get(URI+id)
        setTitle(res.data.title)
        setContent(res.data.content)

    }

    return(
        <div>
            <form onSubmit={update}>
            <div className="container-sm justify-content-center">
                <div className="row justify-content-center align-items-center mt-4"> 
                    <h3 className="text-center"> Update Note</h3>
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

export default CompeditNote