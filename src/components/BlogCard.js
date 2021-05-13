import React from 'react'
import draftToHtml from 'draftjs-to-html'
import { Link } from 'react-router-dom'
import '../css/BlogCard.css'


const BlogCard = ({title,postedBy,description,body,postedByPic,postedByUsername,postedOn}) => {
    body = draftToHtml( JSON.parse(body) )
    return (
        <div className="blog-card">
        <div className="top-banner">
        <span className="image-name">
            <img className="posted-profile-image"
                src={postedByPic} alt="profile display img"
            /> 
            <Link className="posted-username"
             to={postedBy===JSON.parse(localStorage.getItem("user"))._id ? `/profile` : `/profile/${postedBy}`}> <h4>{postedByUsername}</h4> </Link>
          </span> 
           <p className="posted-date">{new Date(Number(postedOn)).toDateString().substr(4,14)}</p>
        </div>
           
           <div className="content">
           <h2 className="posted-title">{title}</h2>
            
            <h5 className="posted-description">{description}</h5>
            <div className="posted-body" dangerouslySetInnerHTML={{__html: body}}></div>
           </div> 
           
        </div>
    )
}

export default BlogCard
