'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CookiesProvider, useCookies } from 'react-cookie';

import firebase from 'firebase/compat/app';


import initFirebase from '#/app/auth/config';

initFirebase();

export const mapUserData = async (user:any) => {
  const { uid, email } = user;
  const token = await user.getIdToken(true);
  return {
    id: uid,
    email,
    token
  };
};

type UserData = { id: any; email: any; token: any } | undefined;

  
const useUser = () => {
  const [user, setUser] = useState<UserData>(undefined);
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(['studionest_user','studionest_user_token']);


  const logout = async () => {
    removeCookie('studionest_user')
    setUser(undefined);
  };

  useEffect(() => {
    //write GET fetch here to /api/auth/user, with cookies as Authorization header
    fetch("/api/auth/user", { method: "GET", headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${cookies.studionest_user_token}` } })
    .then((res) => res.json())
    .then((data) => {
      setCookie("studionest_user",data);
      setUser(data);
      console.log(data, 'data')
    }
      ).catch((err: any) => {
          console.log(err,'errrr');
          removeCookie("studionest_user");
          removeCookie("studionest_user_token")
          setUser(undefined); 
    });
  }, []);

  return { user, logout };
};

export { useUser };