import React from 'react'



const Posts = async({...props}) => {
   await new Promise(res => setTimeout(res,2000))
  return (
    <div>
      {props.title}    </div>
  )
}

export default Posts
