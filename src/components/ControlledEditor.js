import React, { Component } from 'react';
import { EditorState,convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../css/ControlledEditor.css'



import { Editor } from 'react-draft-wysiwyg';


class ControlledEditor extends Component {
  productionURL = 'https://blogger-applicaton1.herokuapp.com'

  state = {
      editorState: EditorState.createEmpty(),
      title:'',
      description:''
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
    // console.log(this.state.title,this.state.description,JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())))
    fetch(`${this.productionURL}/create`,{
      method:'post',
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem('jwt')
    },
    body:JSON.stringify({
      title:this.state.title,
      description:this.state.description,
      body:JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())),
      postedOn:Math.round(+new Date()/1000)
    })
  }).then(res=>res.json()).then(result => console.log(result))
  .catch(err=>console.log(err))
}
  render() {
    const { editorState } = this.state;
    // console.log(JSON.stringify(convertToRaw(editorState.getCurrentContent())))
    // console.log(this.state.title,this.state.description,convertToRaw(editorState.getCurrentContent()))
    return (
      <div>
      <form className="editor-form" onSubmit={this.submitHandler}>
        <input className="editor-input" type="text" placeholder="Enter Title" value={this.state.title} onChange={this.titleChange} required />
        <input  className="editor-input" type="text" placeholder="Enter Description" value={this.state.description} onChange={this.descriptionChange} required />
        <Editor
          placeholder="Type body of the blog"
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
        <input className="button" type="submit" />
      </form>
      </div>
    )
  }
}

export default  ControlledEditor