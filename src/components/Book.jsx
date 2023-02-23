import HTMLFlipBook from "react-pageflip";
import React from "react";



function Book(props) {

  function clickTest(){
    console.log('clicked!!!!!!!!')
  }

    return (

        <div className="flex justify-center items-center h-full w-full">
          <HTMLFlipBook 
            width={500} 
            height={600}
            autoSize={true}
            showCover={true}
            dropShadow={false}
            maxShadowOpacity={0}
            flippingTime={2000}
            size={"fixed"}
          >
            <div className="cover p-8 ">
              <h1 className="book-text text-2xl text-center">Book Title</h1>
            </div>
            <div className="bookPage"></div>
            <div className="bookPage"></div>
            <div className="bookPage"></div>
            <div className="bookPage"></div>
            <div className="bookPage"></div>
            <div className="bookPage"></div>
          </HTMLFlipBook>
        </div>

    );
}

export default Book
