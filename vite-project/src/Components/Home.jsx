import React, { useEffect, useState } from 'react'
import logo from '../Img/troll.png'
import '../Styles/Home.css'
function Navbar(){
    return (
        <div className='navbar'>
            <div className='navbar-img'>
            <img src={logo} width={50} height={50}/>
            <h1>Meme Generator</h1>
            </div>
            <h4 className='navbar-project'>React-Small Project</h4>
            
        </div>
    )
}

function Home() {
    const [meme,setMeme]=useState({
        topText:"",
        bottomText:"",
        imageURL:""
    })
    const [memeFile,setMemeFile]=useState('');
    useEffect(()=>{
          fetch("https://api.imgflip.com/get_memes")
          .then((res)=>res.json())
          .then((data)=>setMemeFile(data.data.memes))
          .catch((err)=>console.log(err));
          console.log(memeFile.length)
    },[])

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setMeme((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    const getNewImage=()=>{
        const size=memeFile.length;
        const random=Math.floor(Math.random() * size+1);
        const image=memeFile[random].url;
        setMeme((prev)=>({
            ...prev,
            imageURL:image
        }))
    }
  return (
    <div>
      <Navbar/>
      <div className='home'>
      <div className='input'>
        <input 
        className='inputOne'
        type='text' placeholder='input one' name='topText' value={meme.topText} onChange={(e)=>{
            handleChange(e);
        }}/>
        <input
        className='inputTwo'
        type='text' placeholder='input two' name='bottomText' value={meme.bottomText} onChange={(e)=>{
            handleChange(e);
        }}/>
      </div>
      <input className='submit' type='submit' value="Get New Meme Image" onClick={getNewImage}/>
      {/* for image and top text and bottom text */}
      <div className='memeShow'>
        <div className='memeText memeShow--topText'>
            {meme.topText}
        </div>
        <div className='memeText memeShow--bottomText'>
            {meme.bottomText}
        </div>
     <img className='memeShow--img' src={meme.imageURL}/>
      </div>
      </div>
    </div>
  )
}

export default Home
