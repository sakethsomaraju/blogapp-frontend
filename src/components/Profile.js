import React, { useEffect, useState,useRef } from 'react'
import { useHistory } from 'react-router';
import '../css/Profile.css'

const productionURL = 'https://blogger-applicaton1.herokuapp.com'

const Profile = () => {

    const inputFileRef = useRef( null );

    const [profile,setProfile] = useState('')
    const [image,setImage] = useState('')

    const userId = JSON.parse( localStorage.getItem("user") )._id
    const editPost = (id,title,description,body)=>{
       // setEdit({id,title,description,body})
        // return 
        history.push({
            pathname:'/editBlog',
            state:{
                id,
                title,
                description,
                body
            }
        })
    }
    const history = useHistory()
    useEffect(()=>{
        fetch(`${productionURL}/user/${userId}`,{
            headers:{
                Authorization:'Bearer '+localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(res => setProfile(res))
        .catch(err => console.log(err))
    },[])

    useEffect(() => {
        if(image){

            const data = new FormData()
            data.append('file',image)
            data.append('upload_preset','blogspreset')
            data.append('cloud_name','blogsimagesaccount')
            fetch('https://api.cloudinary.com/v1_1/blogsimagesaccount/image/upload',{
                method:'post',
                body:data
            }).then(res=>res.json())
                .then(data=>{
                    fetch(`${productionURL}/updateProfilePic`,{
                        method:'put',
                        headers:{
                            'Content-Type':'application/json',
                            'Authorization':'Bearer '+localStorage.getItem("jwt")
                        },
                        body:JSON.stringify(
                            {pic:data.url}
                        )
                    }).then(data => data.json())
                    .then(data => {
                        const oldUser = JSON.parse(localStorage.getItem('user'))
                        oldUser.pic = data.pic
                        localStorage.setItem('user',JSON.stringify(oldUser))
                        setProfile({user:{
                            ...profile.user,
                            pic:data.pic
                          },
                          posts:profile.posts
                        })
                    })
                })


        }
        
    }, [image])
    const uploadFile = (e)=>{
        setImage(e.target.files[0])
        
    }
      const updatePic = () => {
        inputFileRef.current.click();
      }

    return (
        <div>
            
           {  profile ? <div>
            <div className="profile-user">
                <div className="profile-pic-name">
                     <button className="profile-update-button" onClick={updatePic}><img src={profile.user.pic} alt="user display" width="40px" height="50px"/></button>
                     <h2 className="profile-username">{profile.user.username}</h2>
                </div>
                <div className="followers-following">
                    <p className="profile-followers">{profile.user.followers.length} followers</p>
                    <p className="profile-following">{profile.user.following.length} following</p>
                </div>

                <input
                     hidden={true}
                    type="file"
                     ref={inputFileRef}
                    onChange={e => uploadFile(e)}
                 />
            </div>
               
                <br/>
                <hr/>
                <div className="posts-container">
                {
                    profile.posts.map(post => 
                        {return(<div className="profile-posts" key={post._id}>
                           <button className="edit-post-button" onClick={()=>editPost(post._id,post.title,post.description,post.body)}> <p className="profile-title"><strong>{post.title}</strong></p></button> 
                            <p className="profile-description">{post.description}</p>
                        </div>
                        )}
                    )
                }

                </div>
                
                
                </div>
               :
           <p>Loading...</p>
            
           }
         
        </div>
    )
}

export default Profile
