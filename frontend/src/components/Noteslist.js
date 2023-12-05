import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {format} from 'timeago.js'
import {Link, useLocation} from 'react-router-dom'

export default function Noteslist() {

    const [notes, setNotes] = useState([])

    useEffect(() => {
        fetchingData()
    }, [])


    const fetchingData = async () => {
        try{
            const res = await axios.get('http://localhost:4000/notes/')
            setNotes(res.data)
        }
        catch(err){
            console.log(err)
        }
    }

    const DeleteNote = async (e) => {await axios.delete('http://localhost:4000/notes/' + e); fetchingData()}

    return (
        <div className="row">
            {
                notes.map(n => (
                    <div className="col-md-4 p-2" key={n._id}>
                        <div className="card">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h5>{n.title}</h5>
                                <Link className="btn btn-secondary" to={"/edit/" + n._id} >Edit</Link>
                            </div>
                            <div className="card-body">
                                <p>{n.content}</p>
                                <aside><p>{n.author}</p>
                                <p>{format(n.date)}</p></aside>
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-danger" onClick={() => DeleteNote(n._id)}>Delete</button>
                            </div>
                        </div>

                    </div>
                ))
            }
        </div>
    )
}
