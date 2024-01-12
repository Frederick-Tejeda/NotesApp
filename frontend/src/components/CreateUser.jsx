import {useEffect, useState} from 'react'
import axios from 'axios'

const ServerUrl = "https://notesapp-5rdm.onrender.com"

export default function CreateUser(){

    const [users, setUsers] = useState([])
    const [username, setUsername] = useState('')
    var usingUser = false

    useEffect(() => {
        fetchingData()
    }, [])

    const fetchingData = async () => {
        try{
            const res = await axios.get(`${ServerUrl}/users/`)
            setUsers(res.data)
        }
        catch(err){
            console.log(err)
        }
    }

    const onChangeUsername = (e) => setUsername(e.target.value);

    const verifyingUser = async () => {
        const userAllready = await axios.get(`${ServerUrl}/users`)
        if(userAllready.data.find((u) => u.username === username) === undefined){
        return false
        }
        return true
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        usingUser = await verifyingUser()
        if(!usingUser){
            try{
                await axios.post(`${ServerUrl}/users`, {username})
                setUsername('')
                fetchingData()
            }
            catch(err){
                console.log(err)
            }
        }
    }

    const deleteUser = async (id) => {
       await axios.delete(`${ServerUrl}/users/${id}`)
       fetchingData()
    }

    return(
        <div className="row">
            <div className="col-md-4">
                <div className="card card-body">
                    <h3>Create New User</h3>
                    <form onSubmit={onSubmit}>
                        <div className='form-group'>
                            <input name="username" type="text" value={username} className="form-control" onChange={onChangeUsername}/>
                        </div>
                        <div style={{height: 20, width: '100%', marginTop: 5, color: 'red', fontStyle: 'italic'}}>
                        {usingUser && <p>User allready used</p>}
                        </div>
                        <button type="submit" className="btn btn-primary" style={{marginTop: 10}}>Save</button>
                    </form>
                </div>
            </div>
            <div className="col-md-8">
                <ul className="list-group" style={{height: '80vh', overflowY: 'auto'}}>
                    {users.map((user, i) => (
                        <li className="list-group-item list-group-item-action" key={i} onDoubleClick={() => deleteUser(user._id)}>
                            {user.username}
                        </li>))
                    }
                </ul>
            </div>
        </div>
    )
}
