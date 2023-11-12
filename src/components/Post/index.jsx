import React, { useEffect, useState } from 'react'
import { BiMessageRounded } from 'react-icons/bi';
import { FaRetweet } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import { AiOutlineHeart } from 'react-icons/ai';
import { FiShare2 } from 'react-icons/fi';
import moment from 'moment/moment';
import "moment/locale/tr"
import { auth, db } from '../../firebase/config';
import DropDown from './DropDown';
import { arrayRemove, arrayUnion, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { BiSolidSave } from "react-icons/bi"
import { ImCancelCircle } from "react-icons/im"
import { BsTrashFill } from "react-icons/bs"
import EditMode from './EditMode';

const Post = ({ tweet }) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [isPicDeleting, setIsPicDeleting] = useState(false)
  const [isLiked, setIsLiked] = useState()
  const date = moment(tweet?.createdAt?.toDate()).fromNow()

  useEffect(() => {
    const found = tweet.likes.find((id) => id === auth.currentUser.uid)
    setIsLiked(found)
  }, [tweet])
  const handleDelete = async () => {
    if (confirm("Tweet'i silmeyi onaylıyor musunuz?")) {
      const tweetRef = doc(db, "tweets", tweet.id)
      await deleteDoc(tweetRef)
    }
  }
  const toggleLike = async () => {
    const tweetRef = doc(db, "tweets", tweet.id)
    await updateDoc(tweetRef, {
      likes: isLiked
        ? arrayRemove(auth.currentUser.uid)
        : arrayUnion(auth.currentUser.uid)
    })
  }
  return (
    <div className='relative flex gap-3 p-3 border-b-[1px] border-gray-700'>
      <img className='w-12 h-12 rounded-full' src={tweet.user.photo} />
      <div className='w-full'>
        <div className='flex justify-between'>
          <div className='flex items-center gap-3'>
            <p className='font-bold'>{tweet.user.name}</p>
            <p>@{tweet.user.name?.toLowerCase().replace("", "")}</p>
            <p className='text-gray'>{date}</p>
          </div>
          {tweet.user.id === auth.currentUser.uid && <DropDown
            handleDelete={handleDelete}
            handleEdit={() => { setIsEditMode(true) }} />}
          <p></p>
        </div>
        <div className='my-3'>
          {isEditMode ?
            (
              <EditMode
                close={() => {
                  setIsEditMode(false)
                  setIsPicDeleting(false)
                }}
                isPicDeleting={isPicDeleting}
                setIsPicDeleting={setIsPicDeleting}
                id={tweet.id}
                isImage={tweet.imageContent}
                text={tweet.textContent} />
            ) : (
              <p>{tweet.textContent}</p>
            )}
          {tweet.imageContent && (
            <img
              className={`${isPicDeleting ? 'blur-sm' : ''}
                my-2 rounded-lg w-full object-cover mx-auto max-h-[340px] `}
              src={tweet.imageContent} />
          )}
        </div>
        <div className='flex justify-between'>
          <div className='p-2 px-3 rounded-full transition cursor-pointer hover:bg-[blue]'>
            <BiMessageRounded />
          </div>
          <div className='p-2 px-3 rounded-full transition cursor-pointer hover:bg-[#00ff2a]'>
            <FaRetweet />
          </div>
          <div onClick={toggleLike} className='flex items-center gap-1 p-2 px-3 rounded-full transition cursor-pointer hover:bg-[#8c347e]'>
            {isLiked ? <FcLike /> : <AiOutlineHeart />}
            {tweet.likes.length}
          </div>
          <div className='p-2 px-3 rounded-full transition cursor-pointer hover:bg-[#7e7e8a]'>
            <FiShare2 />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
