import Parallax from '@/components/Parallax';
import { useAuth } from '@/context/AuthContext';
import React, { useEffect } from 'react';
import Router from 'next/router';

const Home=()=> {
  const {
  user
  } = useAuth();

  useEffect(()=>{
    if(user)
    Router.push("/crops");
  })
  return (
    <Parallax/>
  )
}

export default Home;