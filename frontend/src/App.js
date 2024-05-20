import './App.css';
import CompShowNote from './Notes/Shownotes.js';
import CompCreateNote from './Notes/Createnote.js';
import CompeditNote from './Notes/Editnote.js';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './HomeLog/Login.js'; 
import Home from './HomeLog/home.js';
import Register from './HomeLog/Register.js';
import CompArchiveNote from './Notes/ArchiveNote.js';
import Category from './Notes/Category.js';
import Createcategory from './Notes/NoteCategory.js';

function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path="/create" element={<CompCreateNote />} />
        <Route path="/archive" element={<CompArchiveNote/>} />
        <Route path="/notes" element={<CompShowNote />} />
        <Route path="/edit/:id" element={<CompeditNote />} />
        <Route path="/Category/" element={<Category />} />
        <Route path="/filter/" element={<Createcategory />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
