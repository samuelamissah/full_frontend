import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


function CreatePost() {

  const initialValues = {
    title: '',
    postText: '',
    userName: ''
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('You must input a title'),
    postText: Yup.string().required('You must input a post'),
    userName: Yup.string().min(3).max(15).required('You must input a name')
  });

  const onSubmit = (data) => {
    axios.post("http://127.0.0.1:3001/posts", data).then((response)=>{
      console.log('it worked');});
  }; 

  return (
    <div className='createPostPage'>
    <Formik 
    onSubmit={onSubmit}
    initialValues={initialValues}
    validationSchema={validationSchema}
    >
      <Form className='formContainer'>
        <label>Title</label>
        <ErrorMessage name='title' component='span'/>
        <Field
        autoComplete='off'
        id='inputCreatePost'
        name='title'
        placeholder='Title'

        />
        <label>Post:</label>
        <ErrorMessage name='postText' component='span'/>
        <Field
        autoComplete='off'
        id='inputCreatePost'
        name='postText'
        placeholder='Text Mesg'

        />
        <label>UserName:</label>
        <ErrorMessage name='userName' component='span'/>
        <Field
        autoComplete='off'
        id='inputCreatePost'
        name='userName'
        placeholder='Name'

        />
        <button type='submit'>Create Post</button>
      </Form>

    </Formik>
      
    </div>
  )
}

export default CreatePost
