import { useEffect, useState } from 'react'
import React from 'react'
import Hero from './Hero.jsx'
import BookForm from './BookForm.jsx'
import Book from './Book.jsx'
import Footer from './Footer.jsx'

const BookContainer = (props) => {
    
    // Background functions
    const sparkleBackground = props.sparkleBackground;
    const unsparkleBackground = props.unsparkleBackground;

    // Status
    const [loading, setLoading] = useState(false);
    const [complete, setComplete] = useState(false);
    const [loadedNovel, setLoadedNovel] = useState(false);
    const [mintDisabled, setMintDisabled] = useState(true);
    const [bookLoading, setBookLoading] = props.loading;

    // Novel
    const [novel, setNovel] = useState('')
    const [novelTitle, setNovelTitle] = useState('')
    const [cover, setCover] = useState(null)
    const [novelObj, setNovelObj] = useState({})

    // NFT
    const [json, setJson] = useState({})

    // Wallet
    const [wallet, setWallet] = useState(false)

  return (
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
        <div className='flex flex-col h-fit'>
          <Book 
            novel={novel}
            cover={cover}
            title={novelTitle}
            novelObj={novelObj}
            loadedNovel={loadedNovel}
            mintDisabled={mintDisabled}
            bookLoading={[bookLoading, setBookLoading]}
            json={json}
            wallet={wallet}
          />
        </div>
      }
    </div>
    <div className='flex-1'>
      <Footer />
    </div>    
  </div>
  )
}

export default BookContainer
