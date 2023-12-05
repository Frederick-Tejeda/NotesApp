import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import CreateNote from './components/CreateNote'
import CreateUser from './components/CreateUser'
import Navegation from './components/Navegation'
import Noteslist from './components/Noteslist'

import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <>
    <Navegation />
    <div className="container p-4">
    <Routes>
      <Route path='/' Component={Noteslist} />
      <Route path='/create/' Component={CreateNote} />
      <Route path='/edit/:id' Component={CreateNote} />
      <Route path='/user/' Component={CreateUser} />
    </Routes>
    </div>
    </>
  );
}

export default App;
