import {useEffect, useState} from 'react'
import '../index.css';
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {useLocation, useNavigate} from 'react-router-dom'

const ServerUrl = "https://notesapp-5rdm.onrender.com"

export default function CreateNote() {

    const [users, setUsers] = useState([])
    const [userSelected, setUserSelected] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [date, setDate] = useState(new Date())

    const [notUserSelected, setNotUserSelected] = useState(false)
    const [notTitle, setNotTitle] = useState(false)
    const [notContent, setNotContent] = useState(false)
    const [editing, setEditing] = useState(false)

    const location = useLocation().pathname.replace('/edit/', '')

    const navigate = useNavigate()

    useEffect(() => {
       if(location !== '/create/'){
            GetNote()
            fecthingData()
        }
        else{
            fecthingData()
        }
    }, [])

    const GetNote = async () => {
        setEditing((location.search('create') === -1) ? true : false)
    try{
        const res = await axios.get(`${ServerUrl}/notes/${location}`)
        setTitle(res.data.title)
        setContent(res.data.title)
        setUserSelected(res.data.author)
    }
    catch(err){
        console.log(err)
    }
    }

    const fecthingData = async () => {
        try{
            const res = await axios.get(`${ServerUrl}/users/`)
            setUsers(res.data)
        }
        catch(err){
            console.log(err)
        }
    }

    const OnSubmit = async (e) => {
        e.preventDefault()
        if(userSelected.length === 0 || title.length === 0 || content.length === 0){
            console.log('No user provied')
            setNotUserSelected((userSelected.length === 0) ? true : false)
            setNotTitle((title.length === 0) ? true : false)
            setNotContent((content.length === 0) ? true : false)
        }else{
            setNotContent(false);
            setNotTitle(false);
            setNotUserSelected(false);
            const newNote = { title, content, date, author: userSelected }
            try{
                (editing) ? await axios.put(`${ServerUrl}/notes/${location}`, newNote) : await axios.post(`${ServerUrl}/notes/`, newNote)
            }
            catch(err){
                console.log('error...')
            }
        }
        navigate('/')
    }

    const OnUserChange = e => setUserSelected(e.target.value);
    const OnTitleChange = e => setTitle(e.target.value);
    const OnContentChange = e => setContent(e.target.value);
    const OnChangeDate = date => setDate(date);

    return (
        <div className="col-md-6 offset-md-3">
            <div className="card card-body">
                <h4>Create a Note</h4>
                <div className="form-group">
                <select className="form-control" onChange={OnUserChange} name="User"><option value={userSelected || ""}>{userSelected || '(select an user)'}</option>{users.map((u, i) => (<option key={i} value={u.username}>{u.username}</option>))}</select>
                <p className="notProvied">{(notUserSelected) ? 'No user provied' : ''}</p>
                </div>

                <div className="form-group">
                    <input type="text" className="form-control" onChange={OnTitleChange} placeholder="Title" name="Title" value={title || ""} required/>
                    <p className="notProvied">{(notTitle) ? 'No title provied' : ''}</p>
                </div>

                <div className="form-group">
                    <textarea className="form-control" placeholder="Content" onChange={OnContentChange} name="Content" value={content || ""} required></textarea>
                    <p className="notProvied">{(notContent) ? 'No content provied' : ''}</p>
                </div>

                <div className="form-group">
                    <DatePicker className="form-control" selected={date} onChange={OnChangeDate}></DatePicker>
                </div>

                <form onSubmit={OnSubmit}>
                    <button className="btn btn-primary" type="submit">Send</button>
                </form>
            </div>
        </div>
    )
}
