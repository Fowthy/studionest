
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';

const withAuth = (Component: React.ComponentType<any>) => {
  const WithAuth = (props: any) => {
    const [cookies] = useCookies(['studionest_user','studionest_user_token']);
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetch("/api/auth/user", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.studionest_user_token}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(cookies,'hm',data)
          if (data.detail === 'Invalid ID token') {
            router.push('/auth');
          } else {
            setLoading(false);
          }
        })
        .catch((err: any) => {
          console.log(err, 'errrr');
          router.push('/auth');
        });
    }, [cookies,cookies.studionest_user_token, router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Component {...props} />
      </div>
    );
  };

  WithAuth.displayName = `withAuth(${Component.displayName || Component.name || 'Component'})`;

  return WithAuth;
};

export default withAuth;