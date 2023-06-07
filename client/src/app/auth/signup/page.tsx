'use client'
import initFirebase from '../config';
import { useCookies } from 'react-cookie';
import { mapUserData } from '#/lib/useUser';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';






export default function Page()  {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['studionest_user','studionest_user_token']);
  const [showModal, setShowModal] = useState('hidden');
  const router = useRouter();

  
  initFirebase();
  interface Values {
    email: string;
    name: string;
    password: string;
    confirmpassword: string;
    }

    async function signUp(email: string, name: string ,password: string, confirmpassword: string) {
        setLoading(true);
        fetch("/api/auth/signup", { method: "POST", body: JSON.stringify({ email, name, password }) })
          .then((res) => res.json())
          .then((data) => {
            if(data != null) {
              setData(data);
              // setLoading(false);
              // setCookie('studionest_user_token', data.token);
              router.push('/auth');
            }
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
            name: '',
            password: '',
            confirmpassword: '',
        }}

        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          console.log(values,'values?')
            signUp(values.email, values.name, values.password, values.confirmpassword)
        }}
      >
      <Form>
        <div id="defaultModal" aria-hidden="true" className={`${showModal} fixed flex m-auto z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
            <div className="relative w-full max-w-2xl max-h-full m-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Terms of Service
                        </h3>
                        <button type="button" onClick={() => setShowModal('hidden')} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-6 space-y-6">
                        <h2>1. Privacy Policy</h2>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            By using our services, you consent to such processing and you warrant that all data provided by you is accurate.
                            The user agrees to use the service as per the guidelines and usage policies provided by StudioNest. Misuse or abusive usage of the service will lead to termination of access to the service.                   </p>
                        <h2>2. Data Storage and Security</h2>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        We use Google Firebase to store your email and encrypted password to provide an additional layer of security. Only your name is stored on our own database. All data storage practices are designed to be in compliance with applicable data protection and privacy laws.
                        </p>
                        <h2>3. Limitation of Liability</h2>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        In no event shall StudioNest, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this service.     
                        </p>
                        <h2>4. Termination</h2>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        Users may terminate their account at any time, for any reason, by [explain the account deletion process, e.g., following the account deletion process in the account settings panel]. Upon account termination, we will delete your name from our database. Your email and encrypted password are stored with Google Firebase, and their deletion will be carried out in accordance with Google Firebases data retention policy.
                        We may also terminate or suspend your access to the services immediately, without prior notice or liability, for any reason whatsoever, including, without limitation, if you breach these terms and conditions.
                        Again, please make sure to consult with a legal professional before finalizing and publishing these terms and conditions. They will be able to provide advice that is more tailored to your specific service and jurisdiction.                        </p>
                        <h2>5. Changes to Terms</h2>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        We reserve the right, at our sole discretion, to modify or replace these terms at any time. If a revision is material, we will make reasonable efforts to provide at least 30 days notice prior to any new terms taking effect.                        
                        </p>
                    </div>
                    <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button data-modal-hide="defaultModal" type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                        <button data-modal-hide="defaultModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={() => setShowModal('hidden')}>Decline</button>
                    </div>
                </div>
            </div>
        </div>
          <div className="mb-6">
          <Field id="email" name="email" placeholder="Email" type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div className="mb-6">
          <Field type="name" id="name" name="name" placeholder="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
          </div>
          <div className="mb-6">
          <Field type="password" id="password" name="password" placeholder="Password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
          </div>
          <div className="mb-6">
          <Field type="confirmpassword" id="confirmpassword" name="confirmpassword" placeholder="Confirm Password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
          </div>
          <div className="mb-6 content-center grid">

          <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => setShowModal('')}>Sign Up</button>
          </div>
        <p>Already a member? Login <a href='/auth' className='text-blue'>here</a>.</p>
      </Form>

   </Formik>
   </>
  );
};
