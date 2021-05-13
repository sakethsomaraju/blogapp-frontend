import React,{useContext, useState} from 'react'
import { UserContext } from '../App'
import {useHistory} from 'react-router-dom'
import '../css/Signin.css'

const productionURL = 'https://blogger-applicaton1.herokuapp.com'


const Signin = ()=> {

    const history = useHistory()

    const {dispatch} = useContext(UserContext)

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [mobile,setMobile] = useState('')
    const [mobileError,setMobileError] = useState('')
    const [status,setStatus] = useState('')

    const handleEmailChange = (e)=>{
        setEmail(e.target.value) 
    }
    const handlePasswordChange = (e)=>{
        setPassword(e.target.value)
    }
    const handleMobileChange = (e)=>{
        setMobile(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        password.trim()
        mobile.trim()
        if(!mobile.match('^[6789][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$')){
            setMobileError('Enter mobile number in valid format!')
        }
        else{
            setMobileError('')
           fetch(`${productionURL}/signin`,{
               method:'post',
               headers:{
                   "Content-Type":"application/json"
               },
               body:JSON.stringify({
                   email,
                   password,
                   mobile
               })
           }).then(res => res.json())
           .then(data => {
               if(data.err)
                setStatus(data.err)
                else{
                    localStorage.setItem('jwt',data.token)
                    localStorage.setItem('user',JSON.stringify(data.user))
                    dispatch({type:"USER",payload:data.user})
                    history.push('/')
                }
                
           })
           .catch(err => console.error(err))

        }

    }

    return (
        <div>
            <form className="signin-form" onSubmit={handleSubmit}>
                <input className="basic-input" required={true} type="email" name="email" placeholder="Enter registered email" value={email} onChange={handleEmailChange}></input>
                <input className="basic-input"  type="password" required={true} placeholder="Enter password" name="password" value={password} onChange={handlePasswordChange}></input>
                <input className="basic-input"  placeholder="Enter 10 digit registered mobile number" required={true} type="text" value={mobile} onChange={handleMobileChange}></input>
                <p>{mobileError}</p>
                <p>{status}</p>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Signin
