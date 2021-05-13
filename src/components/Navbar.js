import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import {UserContext} from '../App'
import {useHistory} from 'react-router-dom'
import '../css/Navbar.css'
const Navbar = () => {
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const renderList = ()=>{
        if(state){
            return[
                <li key="1"><Link to="/profile">Profile</Link></li>,
                <li key="2"><Link to="/create">Create Blog</Link></li>,
                <li key="3"><Link to="/explore">Explore</Link></li>,
                <li key="4"><button onClick={()=>{
                    localStorage.clear()
                    dispatch({type:'CLEAR'})
                    history.push('/')
                }}>logout</button></li>
            ]
        }else{
            return[
                <li key="1"><Link to='/signin'>Signin</Link></li>,
                <li key="2"><Link to='/signup'>Signup</Link></li>

            ]
            
        }
    }

    return (
        <nav>
            <Link className="logo" to={state ? '/' : '/signin'}>Blogger</Link>
            <ul className="navbar-list">
                {renderList()}
            </ul>
        
        </nav>
    )
}

export default Navbar
