import HTMLFlipBook from "react-pageflip";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

function Book(props) {

  var novel = props.novel;
  var cover = props.cover;
  var title = 'The book about a lemon, by novel genie'

  const [novelSplit, setNovelSplit] = useState([])
  var bookLoaded = false

  var bookHeight = 0

  useEffect(() => {

    setNovelSplit(novel.split(/(.{450})/).filter(O=>O));

    //Get the width of the book
    const handleBookSize = () => {
      var element = document.querySelectorAll('[id=bookPage]:not([style*="display: none;"]');
      bookHeight = element[0].offsetHeight;
      //bookHeight = positionInfo.height;  
      hackyBookSize()   
    };
    
    window.addEventListener('resize', handleBookSize); 
    return () => {
      window.removeEventListener('resize', handleBookSize);
    };  
  }, []);

  function hackyBookSize(){
    //Fit text onto book
    if(bookHeight >= 360 && bookHeight < 370){
      setNovelSplit(novel.split(/(.{430})/).filter(O=>O));
    }
    else if(bookHeight >= 370 && bookHeight < 380){
      setNovelSplit(novel.split(/(.{470})/).filter(O=>O));
    }
    else if(bookHeight >= 380 && bookHeight < 390){
      setNovelSplit(novel.split(/(.{510})/).filter(O=>O));
    }
    else if(bookHeight >= 390 && bookHeight < 400){
      setNovelSplit(novel.split(/(.{550})/).filter(O=>O));
    }
    else if(bookHeight >= 400 && bookHeight < 410){
      setNovelSplit(novel.split(/(.{590})/).filter(O=>O));
    }
    else if(bookHeight >= 410 && bookHeight < 420){
      setNovelSplit(novel.split(/(.{630})/).filter(O=>O));
    }
    else if(bookHeight >= 420 && bookHeight < 430){
      setNovelSplit(novel.split(/(.{670})/).filter(O=>O));
    }
    else if(bookHeight >= 430 && bookHeight < 440){
      setNovelSplit(novel.split(/(.{710})/).filter(O=>O));
    }
    else if(bookHeight >= 440 && bookHeight < 450){
      setNovelSplit(novel.split(/(.{750})/).filter(O=>O));
    }
    else if(bookHeight >= 450 && bookHeight < 460){
      setNovelSplit(novel.split(/(.{790})/).filter(O=>O));
    }
    else if(bookHeight >= 460 && bookHeight < 470){
      setNovelSplit(novel.split(/(.{830})/).filter(O=>O));
    }
    else if(bookHeight >= 470 && bookHeight < 480){
      setNovelSplit(novel.split(/(.{870})/).filter(O=>O));
    }
    else if(bookHeight >= 480 && bookHeight < 490){
      setNovelSplit(novel.split(/(.{910})/).filter(O=>O));
    }
    else if(bookHeight >= 490 && bookHeight < 500){
      setNovelSplit(novel.split(/(.{950})/).filter(O=>O));
    }
    else if(bookHeight >= 500 && bookHeight < 510){
      setNovelSplit(novel.split(/(.{990})/).filter(O=>O));
    }
    else if(bookHeight >= 510 && bookHeight < 520){
      setNovelSplit(novel.split(/(.{1030})/).filter(O=>O));
    }
    else if(bookHeight >= 520 && bookHeight < 530){
      setNovelSplit(novel.split(/(.{1070})/).filter(O=>O));
    }
    else if(bookHeight >= 530 && bookHeight < 540){
      setNovelSplit(novel.split(/(.{1110})/).filter(O=>O));
    }
    else if(bookHeight >= 540 && bookHeight <= 550){
      setNovelSplit(novel.split(/(.{1150})/).filter(O=>O));
    }
  }

  // Simplified download function
  function downloadBook(){
    const bookData = {
      title: title,
      cover: cover,
      novel: novel,
    };

    const fileData = JSON.stringify(bookData, null, 4);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "novelgenie.json";
    link.href = url;
    link.click();
  }

  return (
    <div className="flex flex-col justify-center items-center h-full w-full" >
      <HTMLFlipBook
        width={500} 
        height={550}
        minWidth={330}
        maxWidth={500}
        minHeight={500}
        maxHeight={550}
        autoSize={true}
        showCover={true}
        dropShadow={false}
        maxShadowOpacity={0}
        flippingTime={1300}
        size={"stretch"}
      >
        <div id="bookPage" className="cover p-4 cursor-grab">
          <div className="h-1/5 flex justify-center items-center">
            <h1 className="book-text text-2xl text-center">{title}</h1>
          </div>
          <div className="h-4/5 p-8 flex justify-center items-center">
            <img className="rounded border-2 border-solid border-amber-900" src={cover} />
          </div>
        </div>

        {
          novelSplit.map((page, index) => {
            return (
              <div id="bookPage" key={index} className="bookPage p-4 cursor-grab">
                <div>
                  <p className="bookText">{page}</p>
                </div>
                <div className="w-full bottom-0 right-0 fixed flex justify-center items-center">
                  <p className="text-black">{index+1}</p>
                </div>
              </div>  
            )
          })
        }    
      </HTMLFlipBook>

      <div className='mt-4 flex flex-row'>
        <div className='flex-1 flex justify-center items-center'>
          <button 
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold h-10 py-2 px-4 border-b-4 border-yellow-600 hover:border-yellow-500 rounded disabled:bg-yellow-600 disabled:border-yellow-700 disabled:cursor-not-allowed"
            onClick={downloadBook}>
            Download
          </button>  
        </div>
        <div className='ml-4 flex-1 flex justify-center items-center'>
          <button 
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold h-10 py-2 px-4 border-b-4 border-yellow-600 hover:border-yellow-500 rounded disabled:bg-yellow-600 disabled:border-yellow-700 disabled:cursor-not-allowed">
            Mint NFT
          </button>   
        </div>
      </div>
      <h1 className="pt-2">Click <a className="underline cursor-pointer" target="_blank" onClick={(e) => window.location.reload()}>here</a> to start again</h1>
    </div>
  );
}

export default Book
