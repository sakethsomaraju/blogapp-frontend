import React, { useEffect,useState} from 'react'
import BlogCard from './BlogCard'
import '../css/Explore.css'

const productionURL = 'https://blogger-applicaton1.herokuapp.com'


const Explore = () => {
    const [blogs,setBlogs] = useState('')

    let currentPage = 1

    useEffect(()=>{
        fetch('/blogs/1',{
            method:'get',
            headers:{
                'Authorization':'Bearer '+localStorage.getItem('jwt')
            }
        }).then(res =>res.json())
        .then(res => setBlogs(res))
        .catch(err => console.log(err))
    },[])

    const nextHandler = ()=>{
        currentPage += 1
        fetch(`/blogs/${currentPage}`,{
            method:'get',
            headers:{
                'Authorization':'Bearer '+localStorage.getItem('jwt')
            }
        }).then(res =>res.json()) 
        .then(res => setBlogs(res))
        .catch(err => console.log(err))
    }

    

    return (
        
        <div>
    <h1>In Explore</h1>
    
    <div className="blogs-container">
    {
        blogs ? blogs.map(blog => <BlogCard title={blog.title} 
    
                                           className="blogs"
                                           key={blog._id}
                                          description={blog.description} 
                                          body={blog.body} 
                                          postedByPic={blog.postedByPic} 
                                          postedByUsername={blog.postedByUsername} 
                                          postedOn={blog.postedOn}
                                          postedBy={blog.postedBy}
                                    />
                            ) : <p></p>
                           
                           
                           }
    
    </div>
    
    <button className="next-button" onClick={nextHandler}>Next</button>

    
    </div>
    )
}

export default Explore
