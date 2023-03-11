import React, { useState } from 'react'
4
const BookForm = (props) => {

  // Status
  const [loading, setLoading] = props.loading;
  const [complete, setComplete] = props.complete;
  const [process, setProcess] = useState(null);
  var novelSuccess = false;
  var coverSuccess = false;
  var uploadSuccess = false;

  // API Data
  const [apiKey, setApiKey] = useState(false);

  // Story Data
  const [plot, setPlot] = useState(false);
  const [whoElse, setWhoElse] = useState(false);
  const [moral, setMoral] = useState(false);
  const [style, setStyle] = useState(false);
  
  // Novel
  const [novel, setNovel] = props.novel;
  const [novelTitle, setNovelTitle] = props.novelTitle;
  const [novelObj, setNovelObj] = props.novelObj;
  
  // Cover
  var b64 = null;
  var coverFile = null;
  var coverCID = null;
  const [cover, setCover] = props.cover;

  // NFT
  const [json, setJson] = props.json;
  var tempNovel = null;
  var tempNovelTitle = null;
  var tempNovelObjCID = null;
  var tempNFTCID = null;

  // Functions
  async function handleSubmit(){
    beginLoading();

    /* NO API KEY SUPPORT GENIE
    if(apiKey === false || apiKey === ''){
      setApiKey((import.meta.env.VITE_REACT_APP_OPENAI_API_KEY).toString());
      //1. Support Genie
      await supportGenie();
    }*/  

    //2. Call OpenAI APIs
    try{
      await getNovel(apiKey);

      try {
        await getTitle(apiKey);

        try{
          await getCover(apiKey);
          
          try{
            //3. NFT Upload
            await uploadCover();
            await uploadNovel();
            await uploadJSON();
          } catch (err) {
            console.log(err);
            return false;
          }
        } catch(err){
          console.log(err);
          return false;
        }
      } catch(err){
        console.log(err);
        return false;
      }
    } catch(err) {
      console.log(err);
      return false;
    }

    //4. Display novel
    stopLoading();
    if(novelSuccess === true && coverSuccess === true && uploadSuccess === true){
      props.setBookLoading(true);
      setComplete(true);
      return;
    }
    else{
      alert('Error retrieving novel assets.')
      return;
    }
  }
  
  async function getNovel(apiKeyParam){
    setProcess('✍️ Creating Novel 📖');

    const APIBody = {
      "model": "text-davinci-003",
      "prompt": `Write me a novel/story with atleast 2000 words and a maximum for 4000 words about ${isPromptRandom(plot)}. Additional characters: ${isPromptRandom(whoElse)}. Story moral: ${isPromptRandom(moral)}. Story style: ${isPromptRandom(style)}.`,
      "temperature": 0.8,
      "max_tokens": 4000,
      "top_p": 1.0,
      "frequency_penalty": 0.5,
      "presence_penalty": 0.0
    }
    try{
      await fetch("https://api.openai.com/v1/completions" , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + apiKeyParam
        },
        body: JSON.stringify(APIBody)
      }).then((data) => {
        return data.json();
      }).then((data) => {
        if(data){
          if(data.choices){
            novelSuccess = true;
            tempNovel = data.choices[0].text.trim().toString();
            setNovel(tempNovel);
            return true;
          }
          else{
            stopLoading();
            alert(data.error.message);
            console.error(data.error.message);
            novelSuccess = false;
            return false;
          }
        }
        else{
          stopLoading();
          alert('Unexpected error occured!')
          novelSuccess = false;
          return false;
        }
      })
    } catch (e) {
      console.error(e);
      novelSuccess = false;
    }
  }

  async function getTitle(apiKeyParam){
    const APIBody = {
      "model": "text-davinci-003",
      "prompt": `Give me a novel title for the following story: ${tempNovel}. The title must not include quotes.`,
      "temperature": 0.8,
      "max_tokens": 1000,
      "top_p": 1.0,
      "frequency_penalty": 0.5,
      "presence_penalty": 0.0
    }
    try{
      await fetch("https://api.openai.com/v1/completions" , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + apiKeyParam
        },
        body: JSON.stringify(APIBody)
      }).then((data) => {
        return data.json();
      }).then((data) => {
        if(data){
          if(data.choices){
            novelSuccess = true;
            tempNovelTitle = data.choices[0].text.trim()
            setNovelTitle(tempNovelTitle)
            return true;
          }
          else{
            stopLoading();
            alert(data.error.message);
            console.error(data.error.message);
            novelSuccess = false;
            return false;
          }
        }
        else{
          stopLoading();
          alert('Unexpected error occured!')
          novelSuccess = false;
          return false;
        }
      })
    } catch (e) {
      console.error(e);
      novelSuccess = false;
    }
  }

  async function getCover(apiKeyParam){
    setProcess('🖌️ Creating Cover 🖼️');

    const APIBody = {
      "prompt": `Create an image, illustration or abstract painting that does NOT include text, that represents a story titled: ${tempNovelTitle}.`,
      "n": 1,
      "size": '1024x1024',
      "response_format": 'b64_json'
    }
    try{
      await fetch("https://api.openai.com/v1/images/generations" , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + apiKeyParam.toString()
        },
        body: JSON.stringify(APIBody)
      }).then((data) => {
        return data.json();
      }).then((data) => {
        if(data){
          if(data.data[0]){    
            coverSuccess = true;
            b64 = data.data[0].b64_json;
            return true;
          }
          else{
            stopLoading();
            coverSuccess = false;
            alert(data.error.message);
            console.error(data.error.message);
            return false;
          }
        }
        else{
          coverSuccess = false;
          stopLoading();
          alert('Unexpected error occured!')
          return false;
        }
      })
    } catch (e) {
      coverSuccess = false;
      console.error(e);
      return false;
    }
  }

  async function uploadCover(){
    setProcess('⬆️ Uploading Cover 🖼️');

    //Cover from b64 to png format
    await fetch("data:image/png;base64," + b64)
    .then(res => res.blob())
    .then(blob => {
      coverFile = new File([blob], 'cover.png');
    });

    setCover("data:image/png;base64," + b64);

    await fetch("https://api.nft.storage/upload",{
        method: 'POST',
        headers: {
                    'accept': 'image/png',
                    'Content-Type': '*/*',
                    'Authorization': `Bearer ${import.meta.env.VITE_REACT_APP_NFTSTORAGE_API_KEY}`
                },
        body: coverFile
    })
    .then(response => response.json())
    .then(result => {
      coverCID = result.value.cid
      uploadSuccess = true;
    })
    .catch(error => {
      console.log('error', error);
      alert(error);
      uploadSuccess = false;
    });
    
    return
  }

  async function uploadNovel(){
    setProcess('⬆️ Uploading Novel 📖');

    const accessibleCoverURL = `https://ipfs.io/ipfs/${coverCID}`

    const novelData = {
      title: tempNovelTitle,
      cover: accessibleCoverURL,
      novel: tempNovel,
    };

    const fileData = JSON.stringify(novelData, null, 4);
    const blob = new Blob([fileData], { type: "text/plain" });
    setNovelObj(URL.createObjectURL(blob));

    var novelObjFile = new File([blob], 'novel.txt');
    await fetch("https://api.nft.storage/upload",{
        method: 'POST',
        headers: {
                    'accept': 'application/txt',
                    'Content-Type': '*/*',
                    'Authorization': `Bearer ${import.meta.env.VITE_REACT_APP_NFTSTORAGE_API_KEY}`
                },
        body: novelObjFile
    })
    .then(response => response.json())
    .then(result => {
      tempNovelObjCID = result.value.cid
      uploadSuccess = true;
    })
    .catch(error => {
      console.log('error', error);
      alert(error);
      uploadSuccess = false;
    });

    return;
  }

  async function uploadJSON(){
    setProcess('🧞 Prepping NFT 📦');

    const accessibleNovelURL = `https://ipfs.io/ipfs/${tempNovelObjCID}`;

    const json = {
      "name": tempNovelTitle,
      "description": `[NovelGenie](https://www.novelgenie.xyz) allows anyone to create and own authentic digital novels that are generated using state-of-the-art AI technology. This novel is accessible [here](${accessibleNovelURL}).`,
      "image": `ipfs://${coverCID}`
    }

    var nftjson = JSON.stringify(json);
    const blob = new Blob([nftjson], { type: 'application/json' });
    const file = new File([blob], 'novelgenie.json');

    await fetch("https://api.nft.storage/upload",{
        method: 'POST',
        headers: {
                    'accept': 'application/json',
                    'Content-Type': '*/*',
                    'Authorization': `Bearer ${import.meta.env.VITE_REACT_APP_NFTSTORAGE_API_KEY}`
                },
        body: file
    })
    .then(response => response.json())
    .then(result => {
      tempNFTCID = result.value.cid
      uploadSuccess = true;
    })
    .catch(error => {
      console.log('error', error);
      alert(error);
      uploadSuccess = false;
    });

    setJson(`ipfs://${tempNFTCID}`);
    return;
  }

  function isPromptRandom(prompt){
    if(prompt === '' || prompt === undefined || prompt === null || prompt === ' ' || prompt === false || prompt.length <= 1){
      return 'random'
    }
    else{
      return prompt;
    }
  }

  function beginLoading(){
    setLoading(true)
    props.sparkleBackground()
  }

  function stopLoading(){
    setLoading(false)
    props.unsparkleBackground()
  }

  const loadNovel = e => {
    var novelUpload = {}
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      novelUpload = JSON.parse(e.target.result);
      if(novelUpload.title && novelUpload.cover && novelUpload.novel){
        setNovelTitle(novelUpload.title);
        setCover(novelUpload.cover);
        setNovel(novelUpload.novel);
        props.setLoadedNovel(true);
        props.setBookLoading(true);
        setComplete(true);
      }
      else{
        alert('Invalid novel')
      }
    };  
  };

  return (
    <div className='flex flex-col justify-center items-center h-full'>
      <div className='book-form cover p-4 m-2'>
      <form className='flex flex-col'>
        <div className='flex-1 w-full'>
          <div className='hidden sm:block pb-4'>
            { loading === false &&
              <h1 className="form-title text-center text-black text-4xl w-full sm:text-4xl">
                Create Your Novel       
              </h1> 
            }
            { loading === true && 
              <h1 className="form-title text-center text-black text-4xl w-ful sm:text-4xl">
                {process}
              </h1>
            }
          </div>
          <div className='form-title pb-8 pt-3 block sm:hidden'>
            <div className='title fixed flex-auto flex justify-center text-center items-center'>
              <h1 className='title in'>NovelGenie</h1>
              <h1 className='title out'>NovelGenie</h1>
            </div>
          </div>  
        </div>

        <div className='flex-1 w-full'>
          <div className='flex'>
            <div className='flex-auto'>
              <div className='flex justify-start'>
                <div className='form-step-no'>
                  <label>1. &nbsp; </label>
                </div>
                <div className=''>
                  <label htmlFor="apikey">
                    Enter your API Key &nbsp;
                    <a className='hover:underline hover:cursor-pointer text-yellow-300' href='https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key' target='_blank'>(Need help?)</a>
                  </label> 
                </div>
              </div>
              <input 
                type="text" 
                className='disabled:cursor-not-allowed disabled:bg-gray-500 focus:outline-none'
                id="apikey" 
                placeholder="API Key here (or leave empty to support genie)"
                onChange={(e) => setApiKey(e.target.value)}
                disabled={loading === true}
              />
            </div>
          </div>

          <div className='flex'>
            <div className='flex-auto'>
                <div className='flex justify-start'>
                  <div className='form-step-no'>
                      <label>2. &nbsp; </label>
                  </div>
                  <div>
                    <label htmlFor="plot">
                      Plot and characters                        
                    </label> 
                  </div>
                </div>
                <textarea 
                  id="plot"
                  className='disabled:cursor-not-allowed disabled:bg-gray-500 focus:outline-none'
                  name="multiliner" 
                  placeholder="Define your plot. Who are the main characters? Define the setting..."
                  onChange={(e) => setPlot(e.target.value)}
                  disabled={loading === true}
                  />
            </div>
          </div>

          <div className='flex'>
            <div className='flex-auto'>
                <div className='flex justify-start'>
                  <div className='form-step-no'>
                      <label>3. &nbsp; </label>
                  </div>
                  <div>
                    <label htmlFor="whoElse">
                      Who else is in the story?                        
                    </label> 
                  </div>
                </div>
                <textarea 
                  id="whoElse" 
                  className='disabled:cursor-not-allowed disabled:bg-gray-500 focus:outline-none'
                  name="multiliner" 
                  placeholder="Mention any other characters you would like to include in this story..."
                  onChange={(e) => setWhoElse(e.target.value)}
                  disabled={loading === true}
                  />
            </div>
          </div>

          <div className='flex'>
            <div className='flex-auto'>
                <div className='flex justify-start'>
                  <div className='form-step-no'>
                      <label>4. &nbsp; </label>
                  </div>
                  <div>
                    <label htmlFor="moral">
                      Whats the moral of the story?                        
                    </label> 
                  </div>
                </div>
                <textarea 
                  id="moral"
                  className='disabled:cursor-not-allowed disabled:bg-gray-500 focus:outline-none'
                  name="multiliner" 
                  placeholder="What is the moral of the story, what do you want the reader to feel?"
                  onChange={(e) => setMoral(e.target.value)}
                  disabled={loading === true}
                  />
            </div>
          </div>

          <div className='flex'>
            <div className='flex-auto'>
                <div className='flex justify-start'>
                  <div className='form-step-no'>
                      <label>5. &nbsp; </label>
                  </div>
                  <div>
                    <label htmlFor="style">
                      Define the story of writing?                        
                    </label> 
                  </div>
                </div>
                <textarea 
                  id="style" 
                  className='disabled:cursor-not-allowed disabled:bg-gray-500 focus:outline-none'
                  name="multiliner" 
                  placeholder="Please ensure they are a well known individual and the name is spelt correctly. Example: Write my story like the Genie from..."
                  onChange={(e) => setStyle(e.target.value)}
                  disabled={loading === true}
                />
            </div>
          </div>

          <button 
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold h-10 py-2 px-4 border-b-4 border-yellow-600 hover:border-yellow-500 rounded disabled:bg-yellow-600 disabled:border-yellow-700 disabled:cursor-not-allowed"
            disabled={loading === true}
            onClick={() => handleSubmit()}
            >
            <div className='flex justify-center'>
              { loading === false &&
                <div className='flex items-center'>
                  <h1 className='text-black'>Generate Novel</h1>
                </div>
              } 
              { loading === true &&
                <div className='flex items-center'>
                  <svg className="w-5 h-5 text-black animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                  </svg>
                </div>                      
              }
            </div>

          </button>

        </div>

        <div className='flex-1 w-full'>
          <div className='flex justify-center items-center pt-4'>
            <p className='text-black text-xs sm:text-sm'>📜&nbsp; Leave a story info step empty for a random result&nbsp;🧞‍♂️</p>
          </div>
        </div>
      </form>
      </div>
      <div>
        <h1 className="">Already have a novel? Click <a className="underline cursor-pointer" target="_blank" onClick={() => document.getElementById("loadNovel").click()}>here</a> to load it.</h1>
        <input id="loadNovel" type="file" className="hidden" onChange={loadNovel} />
      </div>
    </div>
  )
}

export default BookForm
