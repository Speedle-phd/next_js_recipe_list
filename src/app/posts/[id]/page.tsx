import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'

type PostPageProps = {
   params: { id: string }
}

const Post = async ({ params }: PostPageProps) => {
   const response = await fetch(`https://dummyjson.com/posts/${params.id}`)
   const data = await response.json()
   await new Promise(res => setTimeout(res, 2000))
   return (
      <div>
         <h2>{data.title}</h2>
         <p>{data.body}</p>
         <SyntaxHighlighter className="text-left">
            {`function(){
               return "Hello world";
            }`}
         </SyntaxHighlighter>
      </div>
   )
}

export default Post
