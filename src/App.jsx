import { useEffect, useState } from 'react'
import './App.css'
import ParticleBackground from './components/ParticleBackground'
import Hero from './components/Hero'
import BookForm from './components/BookForm'
import Book from './components/Book.jsx'
import Footer from './components/Footer'
import AOS from 'aos'
import BookLoading from "./components/BookLoading.jsx";
import "aos/dist/aos.css";

function App() {
   
  // Particle Background
  const [size, setSize] = useState(2.5)
  const [speed, setSpeed] = useState(1)

  // Status
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [bookLoading, setBookLoading] = useState(false);
  const [loadedNovel, setLoadedNovel] = useState(false);
  const [mintDisabled, setMintDisabled] = useState(true);

  // Novel
  const [novel, setNovel] = useState('')
  const [novelTitle, setNovelTitle] = useState('')
  const [cover, setCover] = useState(null)
  const [novelObj, setNovelObj] = useState({})

  // NFT
  const [json, setJson] = useState({})

  // Wallet
  const [wallet, setWallet] = useState(false)

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
      <div className='flex flex-col h-screen z-10000' data-aos="zoom-in-up">
        <div className='flex-1 ml-8 mr-8'>
          <Hero 
            wallet={[wallet, setWallet]}
            setMintDisabled={setMintDisabled}
          />
        </div>

        <div className='flex-1 w-full justify-center items-center'>
          { complete === false &&
            <BookForm 
              loading={[loading, setLoading]}
              setBookLoading={setBookLoading}
              sparkleBackground={sparkleBackground}
              unsparkleBackground={unsparkleBackground}
              complete={[complete, setComplete]}
              novel={[novel, setNovel]}
              novelTitle={[novelTitle, setNovelTitle]}
              cover={[cover, setCover]}
              json={[json, setJson]}
              novelObj={[novelObj, setNovelObj]}
              setLoadedNovel={setLoadedNovel}
            />
          }
          { complete === true &&
            <div className='flex flex-col'>
              <Book 
                novel={novel}
                cover={cover}
                title={novelTitle}
                novelObj={novelObj}
                loadedNovel={loadedNovel}
                mintDisabled={mintDisabled}
                bookLoading={[bookLoading, setBookLoading]}
              />
            </div>
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
