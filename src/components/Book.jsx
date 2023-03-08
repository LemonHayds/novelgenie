import HTMLFlipBook from "react-pageflip";
import React, { useEffect, useState } from "react";

function Book(props) {

  // Novel Data
  var novel = props.novel;
  var cover = props.cover;
  var title = props.title;
  var [bookLoading, setBookLoading] = props.bookLoading;
  var [novelSplit, setNovelSplit] = useState(splitString(novel, 450));

  // First render of the book
  useEffect(() => {
    console.log('setting pages')
    console.log(novel);
    console.log(novelSplit);
    setTimeout(() => {
      var bookElement = document.getElementById('bookPage')
      var bookHeight = bookElement.offsetHeight;
      console.log('Initial book height: ' + bookHeight);
      hackyBookSize(bookHeight)
      setBookLoading(false);
      console.log(novelSplit[0]);
    }, 4000);
  }, []);

  function hackyBookSize(bookHeight){
    //Fit text onto bookRef
    if(bookHeight >= 360 && bookHeight < 370){
      setNovelSplit(splitString(novel, 430));
    }
    else if(bookHeight >= 370 && bookHeight < 380){
      setNovelSplit(splitString(novel, 470));
    }
    else if(bookHeight >= 380 && bookHeight < 390){
      setNovelSplit(splitString(novel, 510));
    }
    else if(bookHeight >= 390 && bookHeight < 400){
      setNovelSplit(splitString(novel, 550));
    }
    else if(bookHeight >= 400 && bookHeight < 410){
      setNovelSplit(splitString(novel, 590));
    }
    else if(bookHeight >= 410 && bookHeight < 420){
      setNovelSplit(splitString(novel, 630));
    }
    else if(bookHeight >= 420 && bookHeight < 430){
      setNovelSplit(splitString(novel, 670));
    }
    else if(bookHeight >= 430 && bookHeight < 440){
      setNovelSplit(splitString(novel, 710));
    }
    else if(bookHeight >= 440 && bookHeight < 450){
      setNovelSplit(splitString(novel, 750));
    }
    else if(bookHeight >= 450 && bookHeight < 460){
      setNovelSplit(splitString(novel, 790));
    }
    else if(bookHeight >= 460 && bookHeight < 470){
      setNovelSplit(splitString(novel, 830));
    }  
    else if(bookHeight >= 470 && bookHeight < 480){
      setNovelSplit(splitString(novel, 870));
    }
    else if(bookHeight >= 480 && bookHeight < 490){
      setNovelSplit(splitString(novel, 910));
    }
    else if(bookHeight >= 490 && bookHeight < 500){
      setNovelSplit(splitString(novel, 950));
    }
    else if(bookHeight >= 500 && bookHeight < 510){
      setNovelSplit(splitString(novel, 990));
    }
    else if(bookHeight >= 510 && bookHeight < 520){
      setNovelSplit(splitString(novel, 1030));
    }
    else if(bookHeight >= 520 && bookHeight < 530){
      setNovelSplit(splitString(novel, 1070));
    }
    else if(bookHeight >= 530 && bookHeight < 540){
      setNovelSplit(splitString(novel, 1100));
    }
    else if(bookHeight >= 540 && bookHeight <= 550){
      setNovelSplit(splitString(novel, 1150));
    }

    return;
  }

  function splitString(str, N) {
    const arr = [];
    for (let i = 0; i < str.length; i += N) {
      arr.push(str.substring(i, i + N));
    }
    return arr;
  }

  /* Function to be implemented. Used when nouse move event occurs to resize the book text to fit onto the page.
  function fixBookText(){
    var bookElement = document.querySelectorAll('[id=bookPage]:not([style*="display: none;"]');
    var bookHeight = bookElement[0].offsetHeight;
    console.log('Changing text for book height: ' + bookHeight);
    setBookDisabled(true);
    hackyBookSize(bookHeight);
    setTextFixed(true);
  }
  */

  function downloadBook(){
    const link = document.createElement("a");
    link.download = "novelgenie.json";
    link.href = props.novelObj;
    link.click();
  }

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">      
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
              <h1 className="bookRef-text text-2xl text-center">{title}</h1>
            </div>
            <div className="h-4/5 p-8 flex justify-center items-center">
              <img className="rounded border-2 border-solid border-amber-900" src={cover} />
            </div>
          </div>

          { 
            novelSplit.map((page, index) => {
              if(index <= novelSplit.length)
              return (
                <div id="bookPage" key={index} className="bookPage p-4 cursor-grab overflow-hidden">
                  <div className="overflow-hidden">
                    <p className="bookText overflow-hidden ">{page}</p>
                  </div>

                  <div className="w-full bottom-0 right-0 fixed flex justify-center items-center">
                    <p className="text-black">{index+1}</p>
                  </div>
                </div>  
              )
            })
          }    
          
          <div className="bookPage lastPage p-4">
            <div className="h-full flex justify-center items-center">
              <p className="text-black">The End.</p>
            </div>
          </div>


      </HTMLFlipBook>
        
      <div className='mt-4 flex flex-row'>
        <div className='flex-1 flex justify-center items-center'>
          <button 
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold h-10 py-2 px-4 border-b-4 border-yellow-600 hover:border-yellow-500 rounded disabled:bg-yellow-600 disabled:border-yellow-700 disabled:cursor-not-allowed"
            onClick={downloadBook}>
            Download
          </button>  
        </div>
        { props.loadedNovel === false &&
          <div className='ml-4 flex-1 flex justify-center items-center'>
            <button 
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold h-10 py-2 px-4 border-b-4 border-yellow-600 hover:border-yellow-500 rounded disabled:bg-yellow-600 disabled:border-yellow-700 disabled:cursor-not-allowed"
              disabled={props.mintDisabled}>
              Mint NFT
            </button>   
          </div>
        }
      </div>
      <h1 className="pt-2">Click <a className="underline cursor-pointer" target="_blank" onClick={() => window.location.reload()}>here</a> to start again</h1>
    </div>
  );
}

export default Book
