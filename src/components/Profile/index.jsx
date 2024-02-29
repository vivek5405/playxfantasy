import React, { memo } from 'react'

const Profile = () => {
    console.log("render Profile")
  return (
    <>
     <p className='text-white'>Profile</p>
    </>
  )
}

export default memo(Profile)