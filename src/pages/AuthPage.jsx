import React, { useState } from 'react'
import { auth, provider } from "../firebase/config"
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom"

const AuthPage = () => {
  const [signUp, setSignUp] = useState(false)
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleGoogle = () => {
    signInWithPopup(auth, provider).then(() => navigate('/feed'));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (signUp) {
      createUserWithEmailAndPassword(auth, email, pass)
        .then(() => toast.success('Hesabınız oluşturuldu'))
        .catch((err) =>
          toast.error(`Üzgünüz bir hata oluştu: ${err.code}`)
        );
    } else {
      signInWithEmailAndPassword(auth, email, pass)
        .then(() => toast.success('Hesaba giriş yapıldı'))
        .catch((err) => {
          toast.error(`Üzgünüz bir hata oluştu: ${err.code}`);
          if (err.code === 'auth/invalid-login-credentials') {
            setError(true);
          }
        });
    }
  };

  const resetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => toast.info("Şifre sıfırlama bağlantısı e postanıza gönderildi"))
  }

  return (
    <section className='h-screen grid place-items-center'>
      <div className='bg-black flex flex-col gap-18 py-16 px-32 rounded-lg'>
        <div className='flex justify-center'>
          <img className='h-[60px]' src='x-logo.webp' alt='x-logo' />
        </div>
        <h1 className='text-center font-bold text-xl'>Twitter'a giriş yap</h1>
        <button onClick={handleGoogle} className='flex items-center bg-white py-2 px-10 rounded-full
         text-black cursor-pointer mt-10'>
          <img className='h-[20px] mr-2' src='google-logo.svg' alt='google-logo' />
          <span className='whitespace-nowrap'>Google ile giriş yap</span>
        </button>
        <form className='flex flex-col' onSubmit={handleSubmit}>
          <label className='mt-5'>Email </label>
          <input onChange={(e) => setEmail(e.target.value)}
            className='text-black rounded mt-1 
        p-2 outline-none shadow-lg focus:shadow-[gray]' type='email' required />
          <label className='mt-5'>Şifre </label>
          <input onChange={(e) => setPass(e.target.value)}
            className='text-black rounded mt-1 
          p-2 outline-none shadow-lg focus:shadow-[gray]' type='password' required />
          <button className='bg-white text-black mt-10 rounded-full
           p-1 font-bold transition hover:bg-gray-300'>
            {signUp ? "Kaydol" : "Giriş Yap"}
          </button>
          <p className='mt-5 flex gap-4'>
            <span className='text-gray-500'>
              {signUp ? "Hesabınız varsa" : "Hesabınız yoksa"}
            </span>
            <span className='cursor-pointer text-blue-500' onClick={() => setSignUp(!signUp)}>
              {signUp ? "Giriş Yap" : "Kaydol"}
            </span>
          </p>
        </form>
        {error && (<p
          className='text-center text-red-500'
          onClick={resetPassword}> Şifrenizi mi unuttunuz?</p>)}
      </div>
    </section>
  )
}

export default AuthPage
