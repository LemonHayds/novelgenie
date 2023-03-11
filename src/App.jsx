import { useEffect, useState } from 'react'
import './App.css'
import ParticleBackground from './components/ParticleBackground'
import BookLoading from "./components/BookLoading.jsx";
import BookContainer from './components/BookContainer';
import AOS from 'aos'
import "aos/dist/aos.css";

function App() {
   
  // Particle Background
  const [size, setSize] = useState(2.5)
  const [speed, setSpeed] = useState(1)

  const [bookLoading, setBookLoading] = useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

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
      <BookLoading
        loading={[bookLoading, setBookLoading]}
      />
      <BookContainer 
        loading={[bookLoading, setBookLoading]}
        unsparkleBackground={unsparkleBackground}
        sparkleBackground={sparkleBackground}
      />
    </div>
  )
}

export default App
