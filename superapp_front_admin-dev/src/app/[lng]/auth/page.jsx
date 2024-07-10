'use client'; // This is a client component 👈🏽

import React from 'react'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const router = useRouter();
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    router.push('/es/auth/login');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  return (<></>)
}
