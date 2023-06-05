'use client'
import withAuth from '#/lib/withAuth';
import { useUser } from '#/lib/useUser';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

function Page()  {
  const { user, logout } = useUser();
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [cookies, setCookie] = useCookies(['studionest_user_token']);

  useEffect(() => {
    setLoading(true);
    fetch("/api/auth/user", {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${cookies.studionest_user_token}}`
      }
    }
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
  }, ["studionest_user_token"]);

  if(loading) return <div>Loading...</div>

  console.log(data)

  return (
    <div >
      <div>Your Profile</div>
      {
        user?.email &&
        <div>
          <div>Email: {user.email}</div>
          {/* <div>Username: {user.username}</div> */}
          {/* <div>First Name: {data.name}</div> */}
          <button onClick={() => logout()}>Logout</button>
        </div> 
      }
    </div>
  )
}

export default withAuth(Page)