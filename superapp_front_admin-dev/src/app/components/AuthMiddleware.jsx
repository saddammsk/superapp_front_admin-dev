'use client'; // This is a client component 👈🏽

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const AuthMiddleware = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = Cookies.get('token');
      const decodedToken = Cookies.get('decodedToken');
      if (!token || !decodedToken) {
        router.push('/es/auth/login'); // Redirigir a la nueva ruta
      }
    };

    checkAuth();
  }, [router]);

  return (
    <>
      {children}
    </>
  );
};

export default AuthMiddleware;
