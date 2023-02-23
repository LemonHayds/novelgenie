import { useEffect, useState, useTimeout } from 'react'
import './App.css'
import ParticleBackground from './components/ParticleBackground'
import BookForm from './components/BookForm'
import Book from './components/Book.jsx'
import Genie from './assets/images/genie.png'
import AOS from 'aos'
import "aos/dist/aos.css";

function App() {
  
  useEffect(() => {
    AOS.init();
  }, []);

  // Particle Background
  const [size, setSize] = useState(2.5)
  const [speed, setSpeed] = useState(1)

  // Status
  const [loading, setLoading] = useState(false)
  const [complete, setComplete] = useState(false)

  // Novel
  const [novel, setNovel] = useState(null)


  function sparkleBackground(){
    setSize(5)
    setSpeed(10)
  }
  
  function unsparkleBackground(){
    setSize(2.5)
    setSpeed(1)
  }

  return (
    <div className='App'>
      <div className=''>
        <ParticleBackground size={size} speed={speed} />
      </div>
      <div className='h-full z-10000' data-aos="zoom-in-up">
        <div className='grid place-items-center h-full pl-12 pr-12 pb-6 pt-6'>
          <div className='flex flex-col w-full justify-center text-center'>
            <div className='flex justify-center'>
            </div>
            <div className='title relative'>
              <div className='title in'>NovelGenie</div>
              <div className='title out'>NovelGenie</div>
            </div>      
          </div>

          <div className='flex w-full h-full justify-center items-center'>
            { complete === true &&
              <Book />
            }
            { complete === false &&
              <BookForm 
                loading={[loading, setLoading]}
                sparkleBackground={sparkleBackground}
                unsparkleBackground={unsparkleBackground}
                complete={[complete, setComplete]}
                novel={[novel, setNovel]}
              />
            }
          </div>
          <div className='flex flex-col w-full justify-center text-center'>
            <h1>Designed and developed by <a className="underline" href='https://lemonsqueasy.dev/' target='_blank'>LemonHayds</a>🍋</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
