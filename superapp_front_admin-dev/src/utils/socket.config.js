/* 'use client'; // This is a client component 👈🏽 */


import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";
import { getDecodedToken } from '@/utils/utils'

export const generateSocket = ()=>{
    let decodedToken = JSON.stringify(getDecodedToken());
    console.log(decodedToken)
    return io("https://xerify.onrender.com", 
        {query: { user: decodedToken }} 
    );
}