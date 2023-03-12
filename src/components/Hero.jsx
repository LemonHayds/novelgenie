import React, { useState } from 'react'
import mute from '../../public/assets/images/mute.png'
import speaker from '../../public/assets/images/speaker.png'
import eightbit from '../../public/assets/audio/eightbit.mp3'
import { ethers } from 'ethers'

const Hero = (props) => {

  function truncateWallet() {
    if (wallet.length > 5) {
      return wallet.slice(0, 4) + '...' + wallet.slice(39, 42)
    }
    return wallet;
  }

  const [soundOn, setSoundOn] = useState(false);
  const [wallet, setWallet] = props.wallet;

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

  async function connectWallet(){
    //Check if metamask exists
    if(window.ethereum){
      try{
        var provider = new ethers.providers.Web3Provider(window.ethereum);
        var signer = provider.getSigner();
        props.setSigner(signer);
        await window.ethereum.enable();
        ethereum.request({ 
          method: 'eth_accounts' 
        }).then(response => {
          setWallet(response[0]);
        });
        props.setMintDisabled(false);
      } catch(err){
        console.error(err);
      }
    }
    else{
      alert("Please install Metamask");
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
        <div className='flex-auto invisible sm:visible flex flex-col'>
          <div className='title flex-auto text-5xl flex justify-center text-center items-center'>
              <h1 className='title in'>NovelGenie</h1>
              <h1 className='title out'>NovelGenie</h1>
          </div>
        </div>
        <div className=' flex-none w-32 flex justify-center items-center'>
          <div className=''>
            <button 
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold h-10 py-2 px-4 border-b-4 border-yellow-600 hover:border-yellow-500 rounded disabled:bg-yellow-600 disabled:border-yellow-700 disabled:cursor-not-allowed"
              onClick={connectWallet}>
              { wallet === false &&
                <p className='text-black'>Connect</p>
              }
              <p className='text-black'>{truncateWallet()}</p>
            </button>
          </div>
        </div>
    </div>
  )
}

export default Hero
