"use client";
import { host } from "#/constants";
// import { Studio } from "#/types";
// import "#/app/globals.css";
// import { redirect } from 'next/navigation';
import { useEffect, useState } from "react";
import { ModernAlert } from "#/ui/alerts/modern-alert";
import { Button } from "#/ui/buttons/button";
import { Spinner } from "#/ui/spinner";
import * as Yup from 'yup'
import { useFormik } from "formik";
import Image from "next/image";
import { useCookies } from "react-cookie";

export default function Page() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [desc, setDescription] = useState("");
  const [type, setType] = useState("");
  const [pricePerHour, setPricePerHour] = useState("");
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const [user, setUser] = useState<any>();
  const [cookies, setCookie] = useCookies(['studionest_user_token']);


  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required').min(1,'Too short'),
    location: Yup.string().required('Location is required'),
    desc: Yup.string(),
    pricePerHour: Yup.string().required('Price is required'),
    type: Yup.string(),
  });
  const formik = useFormik({
    initialValues: {
      name: name,
      location: location,
      desc: desc,
      pricePerHour: pricePerHour,
      type: type,

    },
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
  
      try {
        const response = await fetch("/api/auth/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${cookies.studionest_user_token}`
          }
        });
        const data = await response.json();
        setUser(data);

  
        setLoading(false);
      } catch (error) {
        console.log(error, 'errrr');
        setLoading(false);
      }
    };
  
    fetchData();
  }, [cookies.studionest_user_token]);


  async function handleSubmit(event: any) {
    event.preventDefault();

    try {
      setLoading(true);
      console.log(name,desc,type,pricePerHour,location, 'values')
      let ttype = "Rehearsal Room"

      await validationSchema.validate({ name, location, desc, pricePerHour, ttype });
      const response = await fetch("/api/admin/rooms/createroom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, location, desc, pricePerHour, type, owner: user.name, owner_uid: user.uid}),
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
    <form onSubmit={handleSubmit} className="relative items-center block ">
            <Spinner position="right" visible={loading} />
      <div className="container grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
        <Image
          className="rounded w-36 h-36 m-auto"
          src="https://amplify-amplify7ba61ed5c67b4-staging-234108-deployment.s3.amazonaws.com/648248915f6c1b63152b7a6a-de63554f-b252-4b91-95d6-f62a1a417744.jpg"
          alt="Extra large avatar"
          width={144}
          height={144}
        />
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
              // onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              // value={formik.values.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              className={`${formik.errors.location ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400' : 'block w-full dark rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset00 dark:bg-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'}`}
            />
          </div>
        </div>
      </div>
      
      <div className="container grid mt-5 grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
      <div className="mt-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 "
            >
              Price per Hour
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="priceperhour"
                name="priceperhour"
                value={pricePerHour}
                onChange={(e) => setPricePerHour(e.target.value)}
                required
                className={`${formik.errors.pricePerHour ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400' : 'block w-full dark rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset00 dark:bg-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'}`}
                />
            </div>
          </div>
        <div className=" mt-5">
          <label
            htmlFor="last-name"
            className="block text-sm font-medium leading-6"
          >
            Description
          </label>
          <div className="mt-2">
            <textarea
              id="desc"
              name="desc"
              value={desc}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
              className={`${formik.errors.desc ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400' : 'block w-full dark rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset00 dark:bg-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'}`}
            />
          </div>
        </div>
       

          <div className=" mt-2">
          <label
            htmlFor="country"
            className="block text-sm font-medium leading-6 "
          >
            Type
          </label>
          <div className="mt-5">
            <select
              id="type"
              name="type"
              autoComplete="type"
              className={`${formik.errors.type ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400' : 'block w-full dark rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset00 dark:bg-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'}`}
            >
              <option>Rehearsal Room</option>
              <option>Studio</option>
            </select>
          </div>
        </div>
        </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        {added && <ModernAlert badge="Done" text="Studio added" timeout={3000} />}
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Button text={"Cancel"} type={"button"} color={"cancel"} loading={false}/>

        <Button text={"Create"} type={"submit"} color={"purple"} loading={loading}/>
      </div>
    </form>
  );
}
