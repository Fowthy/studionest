'use client'
import  Firebase  from 'firebase/compat/app';
import 'firebase/auth';
import initFirebase from '../config';
import { useCookies } from 'react-cookie';
// import { mapUserData } from '../../../../lib/useUser';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { useState } from 'react';






const FirebaseAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['studionest_user']);

  
  initFirebase();
  interface Values {
    email: string;
    password: string;
}

    async function signInWithEmailAndPassword(email: string, password: string) {
        setLoading(true);
        fetch("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) })
          .then((res) => res.json())
          .then((data) => {
            setData(data);
            setLoading(false);
            setCookie('studionest_user', data.token
            );
          
            console.log(data,'test')
          }).catch((err) => {
            console.log(err,'errrr');
          })
        }

  return (
<>
    <Formik
      initialValues={{
          email: '',
          password: '',
      }}

      onSubmit={(
        values: Values,
        { setSubmitting }: FormikHelpers<Values>
      ) => {
        console.log(values,'values?')
          signInWithEmailAndPassword(values.email, values.password)
      }}
    >
      <Form>
          <div className="mb-6">
          <Field id="email" name="email" placeholder="Email" type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div className="mb-6">
          <Field id="name" name="name" placeholder="Email" type="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div className="mb-6">
          <Field type="password" id="password" name="password" placeholder="Password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
          </div>
          <div className="mb-6">
          <Field type="confirmpassword" id="confirmpassword" name="confirmpassword" placeholder="confirmpassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
          </div>
          <div className="mb-6">
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
          </div>
           <p>Already have an account? Login <a href='/web/auth'>here</a>.</p>
      </Form>
   </Formik>
   </>
  );
};

export default FirebaseAuth;