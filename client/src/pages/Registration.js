import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const initialValues = {
  userName: '',
  password: '',
};

const validationSchema = Yup.object({
  userName: Yup.string().required('Required'),
  password: Yup.string().required('Required').min(6, 'Must be at least 6 characters'),
});

const onSubmit = (data) => {
axios.post('http://127.0.0.1:3001/auth', data).then(() => {
console.log(data);
});
};


const RegistrationPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-4 bg-white rounded shadow-md">
        <h1 className="text-3xl font-bold text-center">Registration</h1>
        <p className="mt-2 text-center text-sm text-gray-600">
                        Or{' '}
                        <a href="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Sign in to your account
                        </a>
                    </p>
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form className="space-y-4">
              <div>
                <label htmlFor="userName" className="block text-sm font-bold text-gray-700">
                  UserName:
                </label>
                <Field
                  type="text"
                  id="userName"
                  name="userName"
                  autoComplete="off"
                  placeholder="Enter your username"
                  className="w-full px-3 py-2 mt-1 border rounded-md"
                />
                <ErrorMessage name="userName" component="p" className="text-red-500 text-sm" />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-bold text-gray-700">
                  Password:
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="off"
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 mt-1 border rounded-md"
                />
                <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Register Here!!!
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
