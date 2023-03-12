import HTMLFlipBook from "react-pageflip";
import React, { useEffect, useState } from "react";
import {ethers, BigNumber } from "ethers";
import NovelGenie from '../NovelGenie.json';

function Book(props) {

  // Polygon
  const contractAddress = "0x285e2cadB98bb00B8125FA096E532d2F798A2B2B";

  // Status
  const [minted, setMinted] = useState(false);
  const [minting, setMinting] = useState(false);
  const [tx, setTx] = useState({});

  // Novel Data
  var novel = props.novel;
  var cover = props.cover;
  var title = props.title;
  var [bookLoading, setBookLoading] = props.bookLoading;
  var [novelSplit, setNovelSplit] = useState(splitString(novel, 450));

  // First render of the book
  useEffect(() => {
    setTimeout(() => {
      var bookElement = document.getElementById('bookPage')
      var bookHeight = bookElement.offsetHeight;
      hackyBookSize(bookHeight)
      setBookLoading(false);
    }, 5000);
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

  async function handleMint() {
    if(window.ethereum) {
      const contract = new ethers.Contract(contractAddress, NovelGenie.abi, props.signer);
      try {
        setMinting(true);
        const response = await contract.mint(props.json, { value: ethers.utils.parseUnits("5.0", 18) });
        console.log(response);
        if(response) {
          setTx(response.hash);
          setMinting(false);
          setMinted(true);
        }
      } catch (error) {
        setMinting(false);
        alert(error.message);
        console.error(error.message);
      }
    }
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
      <div className="flex flex-col book-container w-full h-fit flex justify-center items-center">
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
                <h1 className="bookRef-text text-2xl text-center book-title m-6 mb-2 mt-2  rounded-md">{title}</h1>
              </div>
              <div className="h-4/5 p-8 flex justify-center items-center">
                <img className="rounded border-2 border-solid border-inherit" src={cover} />
              </div>
            </div>

            { 
              novelSplit.map((page, index) => {
                if(index <= novelSplit.length)
                return (
                  <div id="bookPage" key={index} className="bookPage p-4 cursor-grab overflow-hidden h-full">
                    <div className="overflow-hidden h-full">
                      <p className="bookText overflow-hidden">{page}</p>
                    </div>

                    <div className="w-full bottom-0 right-0 fixed flex justify-center items-center">
                      <p className="text-black ">{index+1}</p>
                    </div>
                  </div>  
                )
              })
            }    

            <div className="bookPage lastPage p-4">
              <div className="flex flex-col h-full flex justify-center items-center">
                <p className="text-black pb-6">The End.</p>
                <p className="signature text-black">Novel Genie</p>
              </div>
            </div>
        </HTMLFlipBook>
        <div className="w-full h-full"></div>
      </div>
      <div className='mt-4 flex flex-row'>
        <div className='grow flex justify-center items-center'>
          <button 
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold h-10 py-2 px-4 border-b-4 border-yellow-600 hover:border-yellow-500 rounded disabled:bg-yellow-600 disabled:border-yellow-700 disabled:cursor-not-allowed"
            onClick={downloadBook}>
            Download Novel
          </button>  
        </div>
        { props.loadedNovel === false &&
          <div className='ml-4 grow flex justify-center items-center'>
            { minted === false &&
              <button 
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold h-10 py-2 px-4 border-b-4 border-yellow-600 hover:border-yellow-500 rounded disabled:bg-yellow-600 disabled:border-yellow-700 disabled:cursor-not-allowed"
                disabled={props.mintDisabled}
                onClick={handleMint}
                >
                { minting === false &&
                  <p className="text-black"> Mint (5 Matic) </p>
                }
                { minting === true &&
                  <svg className="w-5 h-5 text-black animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                  </svg>
                }
              </button>  
            }
            { minted === true &&
              <div className="mt-3 flex justify-center items-center">
                <p>Transaction <a className="underline cursor-pointer" href={`https://polygonscan.com/tx/${tx}`} target="_blank" >here</a></p>
              </div>
            }
          </div>
        }
      </div>
      <h1 className="pt-2">Click <a className="underline cursor-pointer" target="_blank" onClick={() => window.location.reload()}>here</a> to start again</h1>
    </div>
  );
}

export default Book
