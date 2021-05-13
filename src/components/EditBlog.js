import React from 'react';
import {convertToRaw, convertFromRaw, EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../css/EditBlog.css'
import { Editor } from 'react-draft-wysiwyg';
import { withRouter } from 'react-router';

const productionURL = 'https://blogger-applicaton1.herokuapp.com'


class EditBlog extends React.Component{
    
    state = {
        editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.location.state.body))),
        title:this.props.location.state.title,
        description:this.props.location.state.description
      }
      onEditorStateChange = (editorState) => {
        this.setState({
          ...this.state,
          editorState,
        });
      };
      titleChange = (e)=>{
        this.setState({
          ...this.state,
          title:e.target.value
        })
      }
      descriptionChange = (e) =>{
        this.setState({
          ...this.state,
          description:e.target.value
        })
      }
      submitHandler = (e)=>{
        e.preventDefault()
        console.log(this.state.title,this.state.description,this.state.editorState)
        fetch(`${productionURL}/updateBlog`,{
            method:'put',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                _id:this.props.location.state.id,
                title:this.state.title,
                description:this.state.description,
                body:JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())),
                postedOn:Math.round(+new Date()/1000)
                
            })
        }).then(res => res.json()) 
        .then(res => console.log(res))
        .catch(err => console.log(err))
        
}
    
    render(){
        
        return(<form className="editor-form" onSubmit={this.submitHandler}>
            <h1>Update Blog</h1>
            <input className="editor-input" type="text"  value={this.state.title} onChange={this.titleChange} required />
            <input className="editor-input"  type="text"  value={this.state.description} onChange={this.descriptionChange} required />
            <Editor
              placeholder="Type body of the blog"
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              editorState={this.state.editorState}
              onEditorStateChange={this.onEditorStateChange}
            />
            <input className="button" type="submit" placeholder="update"/>
          </form>
        )
    }
}

export default withRouter(EditBlog)