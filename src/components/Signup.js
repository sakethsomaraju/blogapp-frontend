import React,{useState,useEffect} from 'react'
import {useHistory } from 'react-router-dom'
import '../css/Signup.css'

const productionURL = 'https://blogger-applicaton1.herokuapp.com'


const Signup = ()=> {
 
    const history = useHistory()

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [error,setError] = useState('') 
    const [mobileError,setMobileError] = useState('')
    const [username,setUsername]=useState('')
    const [mobile,setMobile]= useState('')
    const [image,setImage] = useState(undefined) 
    const [check,setCheck] = useState(false)
    const [url,setUrl] = useState('')
    const [checkError,setCheckError] = useState('')
    const [status,setStatus] = useState('')

    useEffect(()=>{
        if(url){
            uploadFields()
        }
 
    },[url])
    const emailHandler = (e)=>{
        setEmail(e.target.value)
    }
    const passwordHandler = (e)=>{
        setPassword(e.target.value)

    } 
    const confirmPasswordHandler = (e)=>{
        setConfirmPassword(e.target.value)
    }
    const handleNameChange = (e)=>{
        setUsername(e.target.value)
    }
    const handleMobileChange =(e)=>{
        
      setMobile(e.target.value)
    
  }
  const uploadPic = ()=>{
    const data = new FormData()
    data.append('file',image)
    data.append('upload_preset','blogspreset')
    data.append('cloud_name','blogsimagesaccount')
    fetch('https://api.cloudinary.com/v1_1/blogsimagesaccount/image/upload',{
        method:'post',
        body:data
    }).then(res=>res.json())
    .then(data=>setUrl(data.url))
    .catch(err=>console.error(err))
  }
  const uploadFields = ()=>{

    fetch(`${productionURL}/signup`,{
        method:'post', 
       headers:{
           "content-Type":"application/json"
       },
       body:JSON.stringify({
           username,
           email,
           mobile,
           password,
           check,
           pic:url || 'https://res.cloudinary.com/blogsimagesaccount/image/upload/v1610867243/default-profile-picture_p1nqbe.png',
           timeOfCreation:Date.now()


       })
    }).then(res=>res.json())
    .then(data=>{
        if(data.error){
          setStatus(data.error)
        }
        else{
          setStatus(data.message)
           history.push('/signin')
        }
}).catch(err=>console.log(err)).catch(err=>console.log(err))
  }
        
    
    const submitHandler = (e)=>{
        e.preventDefault()
        email.trim()
        password.trim()
        username.trim()
        mobile.trim()
        if(password === confirmPassword && mobile.match('^[6789][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$') && check ) {
            setError('')
            setMobileError('')
            setCheckError('')
            
            if(image){
                uploadPic()
            }else{
                uploadFields()
            }
        } 
        else{ 
            if(password !== confirmPassword)
         setError('Enter same passwords')
        
        if(!mobile.match('^[6789][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$'))
            setMobileError('Enter valid mobile number')
        if(!check)
            setCheckError('Please accept all terms and conditions to continue...')
        }
    }

    return (
        <div>
            <form className="signup-form" onSubmit={submitHandler}>
                <input className="basic-input" type="text" placeholder="Enter Name" value={username} onChange={handleNameChange} required={true} autoFocus={true}/>
                <input className="basic-input" type="text" placeholder="Enter mobile number " value={mobile} inputMode="numeric" onChange={handleMobileChange} required={true} />
                <input  className="basic-input"  type="email" placeholder="Email" value={email} onChange={emailHandler} required={true}  />
                <input className="basic-input"  type="password" placeholder="enter password" value={password} onChange={passwordHandler} required={true} autoComplete="off"/>
                <input  className="basic-input"  type="password" placeholder="re-enter password" value={confirmPassword} onChange={confirmPasswordHandler} required={true} autoComplete="off"/>
               <span className="signup-span">
               <label className="profile-picture-label" htmlFor="dp">Upload profile picture</label>
               <input type="file" className="profile-picture-input" placeholder="Display piture" name="dp" onChange = {(e)=>setImage(e.target.files[0])} />
               </span>
               <span className="signup-span"> <input type="checkbox" name="terms" value="accept" onChange={()=>setCheck(!check)}></input>
                <label htmlFor="terms">I accept all <a href="#">terms and conditions.</a></label></span>
                <p>{error}</p>
                <p>{mobileError}</p>
                <p>{checkError}</p>
                <p>{status}</p>
                <button type="submit" >Signup</button>
            </form>
            
        </div>
    )
}

export default Signup
