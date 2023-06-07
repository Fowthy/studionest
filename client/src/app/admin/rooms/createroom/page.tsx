"use client";
import { host } from "#/constants";
// import { Studio } from "#/types";
// import "#/app/globals.css";
// import { redirect } from 'next/navigation';
import { useState } from "react";
import { ModernAlert } from "#/ui/alerts/modern-alert";
import { Button } from "#/ui/buttons/button";
import { Spinner } from "#/ui/spinner";
import * as Yup from 'yup'
import { useFormik } from "formik";
import Image from "next/image";

export default function Page() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required('First name is required').min(1,'Too short'),
    location: Yup.string().required('Last name is required'),
    description: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
  const formik = useFormik({
    initialValues: {
      name: '',
      location: '',
    },
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });


  async function handleSubmit(event: any) {
    event.preventDefault();

    try {
      setLoading(true);

      await validationSchema.validate(JSON.stringify({ name, location, description }));
      const response = await fetch("/api/createstudio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, location, description }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data, "data");
      } else {
        console.log(response,'hmhmhm')
        // Handle the error, e.g., show an error message
      }
      setAdded(true);
      setLoading(false);
      console.log('adde?')
    } catch (error) {
      console.error("Error adding studio:", error);
      setLoading(false);
      // Handle the error, e.g., show an error message
    }
  }

  return (
    <form onSubmit={formik.handleSubmit} className="relative items-center block ">
            <Spinner position="right" visible={loading} />
      <div className="container grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
        {/* <Image
          className="rounded w-36 h-36 m-auto"
          src="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/rockcms/2023-01/230101-joe-biden-jm-0944-489dbe.jpg"
          alt="Extra large avatar"
        /> */}
      </div>
      <div className="container grid mt-5 grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium leading-6"
          >
            Room name
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              // value={name}
              // onChange={(e) => setName(e.target.value)}
              required
              className={`${formik.errors.name ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400' : 'block w-full dark rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset00 dark:bg-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'}`}
            />
            {formik.touched.name && formik.errors.name ? (
              <div>{formik.errors.name}</div>
            ) : null}
          </div>
        </div>
        <div className="">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 "
          >
            Location
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>
      <div className="container grid mt-5 grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4">
        <div className=" mt-5">
          <label
            htmlFor="last-name"
            className="block text-sm font-medium leading-6"
          >
            Description
          </label>
          <div className="">
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className=" mt-5">
          <label
            htmlFor="country"
            className="block text-sm font-medium leading-6 "
          >
            Type
          </label>
          <div className="mt-5">
            <select
              id="country"
              name="country"
              autoComplete="country-name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option>Rehearsal Room</option>
              <option>Studio</option>
            </select>
          </div>
        </div>
        <div className="mt-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 "
            >
              Price per Hour
            </label>
            <div className="mt-5">
              <input
                type="text"
                id="location"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        {added && <ModernAlert badge="Done" text="Studio added" timeout={3000} />}
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Button text={"Cancel"} type={"button"} color={"cancel"} loading={false}/>

        <Button text={"Save"} type={"submit"} color={"purple"} loading={loading}/>
      </div>
    </form>
  );
}
