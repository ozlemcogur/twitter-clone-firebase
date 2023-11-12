import React, { useEffect, useState } from 'react'
import Aside from '../components/Aside'
import Main from '../components/Main'
import Nav from '../components/nav'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/config'

const FeedPage = () => {
  const [user, setUser] = useState()
  useEffect(()=>{
    onAuthStateChanged(auth, (res)=>{
      setUser(res)
    })
  },[])
  return (
    <div className='feed h-screen bg-black overflow-hidden'>
      <Nav user={user}/>
      <Main user={user}/>
      <Aside/>
    </div>
  )
}

export default FeedPage
