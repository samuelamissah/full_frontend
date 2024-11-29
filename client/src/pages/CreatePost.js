import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Prevent scrolling on mount
    document.body.style.overflow = 'hidden';
    return () => {
      // Re-enable scrolling when component unmounts
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    // Check if access token is available in session storage
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const initialValues = {
    title: '',
    postText: '',
    userName: ''
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('You must input a title'),
    postText: Yup.string().required('You must input a post'),
    userName: Yup.string().min(3).max(15).required('You must input a name'),
  });

  const onSubmit = (data) => {
    const accessToken = sessionStorage.getItem('accessToken');
    axios.post('http://127.0.0.1:3001/posts', data, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then((response) => {
      navigate('/home');
    }).catch((error) => {
      console.error('There was an error creating the post!', error);
    });
  };

  return (
    <div
      style={{
        backgroundImage: `url('/tre.jpg')`,
        // backgroundSize: 'no-cover',
        // backgroundRepeat: 'no-repeat no-repeat',
        // backgroundPosition: 'center'
  }}
  className="min-h-screen flex items-center justify-center p-4  bg-cover bg-no-repeat bg-center h-full w-full "
>
      <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl p-6 rounded-lg mt-12 shadow bg-transparent border-8 border-sky-300">
        {isAuthenticated ? (
          <>
            <h1 className="text-center text-3xl font-extrabold text-gray-900 mb-8 text-black-800">Create Your Post</h1>
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
          </>
        ) : (
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-red-500">You must be logged in to create a post</h1>
            <button
              onClick={() => navigate('/')}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log In
            </button>
            <button
              onClick={() => navigate('/registration')}
              className="group relative w-full flex justify-center mt-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Create Account
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreatePost;
