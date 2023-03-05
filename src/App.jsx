import { useEffect, useState } from 'react'
import './App.css'
import ParticleBackground from './components/ParticleBackground'
import Hero from './components/Hero'
import BookForm from './components/BookForm'
import Book from './components/Book.jsx'
import Footer from './components/Footer'
import AOS from 'aos'
import "aos/dist/aos.css";
import cover_placeholder from './assets/images/book_cover_example.png';

function App() {
   
  // Particle Background
  const [size, setSize] = useState(2.5)
  const [speed, setSpeed] = useState(1)

  // Status
  const [loading, setLoading] = useState(false)
  const [complete, setComplete] = useState(false)

  // Novel
  const [novel, setNovel] = useState("What is Lorem Ipsum?Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Why do we use it?It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).Where does it come from?Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.Where can I get some?There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.")
  const [novelTitle, setNovelTitle] = useState('Title Example')
  const [cover, setCover] = useState(cover_placeholder)

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
      <div className='flex flex-col h-screen z-10000' data-aos="zoom-in-up">
        <div className='flex-1 ml-8 mr-8'>
          <Hero />
        </div>

        <div className='flex-1 w-full justify-center items-center'>
          { complete === false &&
            <BookForm 
              loading={[loading, setLoading]}
              sparkleBackground={sparkleBackground}
              unsparkleBackground={unsparkleBackground}
              complete={[complete, setComplete]}
              novel={[novel, setNovel]}
              novelTitle={[novelTitle, setNovelTitle]}
              cover={[cover, setCover]}
            />
          }
          { complete === true &&
            <div className='flex flex-col'>
              <Book 
                novel={novel}
                cover={cover}
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
