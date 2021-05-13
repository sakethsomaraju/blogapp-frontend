import React,{useContext,useReducer,createContext, useEffect} from 'react'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Home from './components/Home'
import Explore from './components/Explore'
import { initialState, reducer } from './reducer/userReducer'
import {BrowserRouter,Route, Switch, useHistory} from 'react-router-dom'
import Navbar from './components/Navbar'
import ControlledEditor from './components/ControlledEditor'
import Profile from './components/Profile'
import UserProfile from './components/UserProfile'
import EditBlog from './components/EditBlog'

export const UserContext = createContext()

const Routing = ()=>{
    const history = useHistory()
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"))
        if(user){
            dispatch({type:'USER',payload:user})
        }else{
            history.push('/signin')
        }
    },[])

    return (
        <Switch>
            <Route exact path='/'>
                <Home />
            </Route>
            <Route path='/signup'>
            <Signup />
          </Route>
          <Route path='/signin'>
            <Signin />
          </Route>
          <Route path='/create'>
            <ControlledEditor />
          </Route>
          <Route path='/explore'>
            <Explore />
          </Route>
          <Route exact path='/profile'>
            <Profile />
          </Route>
          <Route path='/profile/:userid'>
            <UserProfile />
          </Route>
          <Route path='/editBlog'>
            <EditBlog />
          </Route>
 
        </Switch>
    )
}


const App =()=> {

    const [state,dispatch] = useReducer(reducer,initialState)

    return (
        
          <UserContext.Provider value={{state,dispatch}}>
          <BrowserRouter>
             <Navbar />
             <Routing />
          </BrowserRouter>
          </UserContext.Provider>
    )
}

export default App
