import React from 'react'
import Posts from '../components/Posts';

const posts = async() => {
   await new Promise(res => setTimeout(res, 2000))
   const res = await fetch(`https://dummyjson.com/posts?limit=20`);
   const data = await res.json()
  return (
    <div>
      {data.posts.map((el : object, index : number) => {
         return <Posts key={index} {...el}/>
      })}
    </div>
  )
}

export default posts
