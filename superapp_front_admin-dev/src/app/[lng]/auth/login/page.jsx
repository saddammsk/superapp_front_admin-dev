'use client'; // This is a client component 👈🏽

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ClipLoader from 'react-spinners/ClipLoader';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faMicrosoft, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { post } from '@/services/RestService';

export default function Login({ params: { lng } }) {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const decodedToken = Cookies.get('decodedToken');
        const token = Cookies.get('token');
        const user = decodedToken ? JSON.parse(decodedToken) : null;
        if (token && user && !user.access_type) {
            router.push(`/${lng}/admin/workflows`, undefined, { shallow: true });
        }else{
            Cookies.remove('token');
            Cookies.remove('decodedToken')
        }
    }, [router, lng]);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const { data } = await post(`:40003/auth/login`, { email, password });

      if (data.token && data.status === 200) {
        const token = data.token;
        const secretKey = process.env.JWT_SECRET_KEY;
        const decodedToken = jwt.verify(token, secretKey);
        if (decodedToken) {
          Cookies.set('decodedToken', JSON.stringify({
            ...decodedToken,
            access_type: null // "supplier" o "subscriber"
          }), { expires: 14 });
          Cookies.set('token', data.token);
          toast.success(`Operación satisfactoria`);
          // Redirigir al usuario a la página de inicio o a otra página después del inicio de sesión exitoso
          router.push(`/${lng}/admin/workflows`, undefined, { shallow: true });
        }
      }
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      toast.error(`Error al iniciar sesión. Por favor, revisar credenciales.`);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="antialiased bg-gray-200 text-gray-900 font-sans ">
      <div className="flex flex-col items-center justify-center h-screen w-full">
        <div className="w-[32rem] bg-white rounded-[40px] py-8 px-10 m-4 md:mx-auto">
          <div className="flex items-center justify-center w-full">
            <span className="block w-full text-xl font-bold mb-4 text-center">Iniciar Sesión</span>
          </div>
          {isLoading ? (
            <div className="flex items-center justify-center mb-4">
              <ClipLoader
                color={'#8049D7'}
                loading={isLoading}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            <>
              <div className="mb-4">
                <div className="mb-4 md:w-full">
                  <label htmlFor="email" className="block text-xs mb-1 capitalize">Email</label>
                  <div className="input-field">
                    <div className="flex items-center justify-center border-t border-l border-b rounded-l-lg">
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                    <div className="flex items-center justify-center border-t border-r border-b rounded-r-lg">
                      <input
                        className="w-full border rounded p-2 outline-none focus:shadow-outline mr-2"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-6 md:w-full">
                  <label htmlFor="password" className="block text-xs mb-1 capitalize">Contraseña</label>
                  <div className="input-field">
                    <div className="flex items-center justify-center border-t border-l border-b rounded-l-lg">
                      <FontAwesomeIcon icon={faLock} />
                    </div>
                    <div className="flex items-center justify-center border-t border-r border-b rounded-r-lg">
                      <input
                        className="w-full border rounded p-2 outline-none focus:shadow-outline mr-2"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center w-full">
                <span className="block w-full text-xl font-bold mb-4 text-center">Continuar con</span>
                <div className="flex items-center justify-center w-full">
                  <button className="border bg-white text-black uppercase text-sm font-semibold px-4 py-2 rounded-full mr-4">
                    <FontAwesomeIcon icon={faGoogle} />
                  </button>
                  <button className="border bg-white text-black uppercase text-sm font-semibold px-4 py-2 rounded-full mr-4">
                    <FontAwesomeIcon icon={faMicrosoft} />
                  </button>
                  <button className="border bg-white text-black uppercase text-sm font-semibold px-4 py-2 rounded-full mr-4">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </button>
                  <button className="border bg-white text-black uppercase text-sm font-semibold px-4 py-2 rounded-full mr-4">
                    <FontAwesomeIcon icon={faFacebook} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="w-[22rem] flex flex-col md:mx-auto">
          <button className="bg-green-500 hover:bg-black text-white uppercase text-sm font-semibold px-4 py-2 rounded mb-4" onClick={handleLogin}>Ingresar</button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded">Registrarse</button>
        </div>
      </div>
    </div>
  );
}
