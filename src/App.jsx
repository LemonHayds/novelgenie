import { useEffect, useState } from 'react'
import './App.css'
import ParticleBackground from './components/ParticleBackground'
import Hero from './components/Hero'
import BookForm from './components/BookForm'
import Book from './components/Book.jsx'
import Footer from './components/Footer'
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
      <ParticleBackground size={size} speed={speed} />
      <div className='flex flex-col h-screen z-10000' data-aos="zoom-in-up">
        <div className='flex-1 ml-8 mr-8'>
          <Hero />
        </div>

        <div className='flex-1 w-full justify-center items-center'>
          { complete === true &&
            <div className='flex flex-col'>
              <Book />
            </div>
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

        <div className='flex-1'>
          <Footer />
        </div>    
      </div>
    </div>
  )
}

export default App
