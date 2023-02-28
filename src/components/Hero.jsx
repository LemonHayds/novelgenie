import React, { useState } from 'react'
import mute from '../assets/images/mute.png'
import speaker from '../assets/images/speaker.png'
import eightbit from '../assets/audio/eightbit.mp3'

const Hero = () => {

  const [soundOn, setSoundOn] = useState(false);

  function playMusic(){
    if(soundOn === true){
      document.getElementById("song").pause();
      setSoundOn(false);
    }
    else{
      document.getElementById("song").play();
      setSoundOn(true);
    }
  }

  return (
    <div className='flex w-full h-full justify-center text-center'>
        <audio id="song" loop>
          <source src={eightbit} />
        </audio>
        <div className='flex-none w-32 flex items-center'>
          <div className='w-14'>
            <button
              onClick={playMusic}
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold h-10 py-2 px-4 border-b-4 border-yellow-600 hover:border-yellow-500 rounded disabled:bg-yellow-600 disabled:border-yellow-700 disabled:cursor-not-allowed">
              { soundOn === true &&
                <img src={speaker}/>
              }
              { soundOn === false &&
                <img src={mute}/>
              }
            </button>
          </div>
        </div>
        <div className='title invisible sm:visible text-5xl flex-auto flex justify-center text-center items-center'>
            <h1 className='title in'>NovelGenie</h1>
            <h1 className='title out'>NovelGenie</h1>
        </div>
        <div className=' flex-none w-32 flex justify-center items-center'>
          <div className=''>
            <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold h-10 py-2 px-4 border-b-4 border-yellow-600 hover:border-yellow-500 rounded disabled:bg-yellow-600 disabled:border-yellow-700 disabled:cursor-not-allowed">
              Connect
            </button>
          </div>
        </div>
    </div>
  )
}

export default Hero
