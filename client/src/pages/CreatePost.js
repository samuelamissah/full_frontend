import React, { useEffect } from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function CreatePost() {
  useEffect(() => {
    // Prevent scrolling on mount
    document.body.style.overflow = 'hidden';
    return () => {
      // Re-enable scrolling when component unmounts
      document.body.style.overflow = 'unset';
    };
  }, []);
  
  
  let navigate = useNavigate();
  const initialValues = {
    title: '',
    postText: '',
    userName: ''
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('You must input a title'),
    postText: Yup.string().required('You must input a post'),
    userName: Yup.string().min(3).max(15).required('You must input a name'),
    // commentBody should have a minimum length of 3 characters and maximum length of 1000 characters
    commentBody: Yup.string().min(3).max(1000).required('You must input a comment'),
  });

  const onSubmit = (data) => {
    axios.post("http://127.0.0.1:3001/posts", data).then((response)=>{
      navigate('/home');
    });
     
  }; 


  return (
    <div
    style={{
      backgroundImage:`url('/kk.jpg')`
    }}
    
    className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center ">
    <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl bg-white p-6 rounded-lg shadow bg-transparent border-8 border-sky-300">
      <h1 className="text-center text-3xl font-extrabold text-gray-900 mb-8 text-red-500">Create Your Post</h1>
      <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
        <Form className="space-y-8">
          <div>
            <label htmlFor="title" className="block text-md font-bold text-gray-700">
              Title
            </label>
            <ErrorMessage name="title" component="span" className="text-xs text-red-500" />
            <Field
              autoComplete="off"
              id="inputCreatePost"
              name="title"
              placeholder="Title"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="postText" className="block text-md font-bold text-gray-700">
              Post:
            </label>
            <ErrorMessage name="postText" component="span" className="text-xs text-red-500" />
            <Field
              as="textarea"
              autoComplete="off"
              id="inputCreatePostText"
              name="postText"
              placeholder="Text Mesg"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="userName" className="block text-md font-bold text-gray-700">
              UserName:
            </label>
            <ErrorMessage name="userName" component="span" className="text-xs text-red-500" />
            <Field
              autoComplete="off"
              id="inputCreatePostUser"
              name="userName"
              placeholder="Name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Post
          </button>
        </Form>
      </Formik>
    </div>
  </div>
  
  
  

  )
}

export default CreatePost
