"use client"
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  return (
      <div>
        <h1 className=' text-center text-3xl py-4 mb-4'>Home 🦕 Page</h1>
       
        <form onSubmit={ async (e) => {
          e.preventDefault();

         const formData =  new FormData()
         formData.append("picture", file)
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          })
          const data = await response.json();
          console.log(data)
          setImageUrl(data.url)

        }}>
        
          <input type='file' onChange={(e) => {
            setFile(e.target.files[0])
          }} />
          <button className=" bg-cyan-700 text-white p-2">
            Enviar Che
          </button>
        </form>
        {
          imageUrl && (
            <img src={imageUrl} alt="la imagen" />
          )
        }


      </div>
  )
}


//    console.log(e.target.files[0])