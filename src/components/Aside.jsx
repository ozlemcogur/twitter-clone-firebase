import React from 'react'

const Aside = () => {
  return (
    <div className='justify-start items-start hidden p-6 lg:flex'>
      <ul className='border p-8 rounded border-gray'>
        <li className='border-b-[1px] border-gray py-2'>#Gündem</li>
        <li className='border-b-[1px] border-gray py-2'>#SonDakika</li>
        <li className='border-b-[1px] border-gray py-3'>#Türkiye</li>
        <li className='py-2'>#Sanat</li>
      </ul>
    </div>
  )
}

export default Aside
