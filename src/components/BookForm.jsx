import React, { useState } from 'react'
import InfoModal from './InfoModal.jsx';

const BookForm = (props) => {

  // Modal Open
  const [modalOpen, setModalOpen] = useState(false)

  // Status
  const [loading, setLoading] = props.loading;
  const [complete, setComplete] = props.complete;
  const [process, setProcess] = useState(null);

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
  var novelSuccess = false;
  
  // Cover
  const [cover, setCover] = props.cover;
  var coverSuccess = false;

  // Functions
  async function handleSubmit(){
    beginLoading();

    // NO API KEY SUPPORT GENIE
    if(apiKey === false || apiKey === ''){
      setApiKey((import.meta.env.VITE_REACT_APP_OPENAI_API_KEY).toString());
      //1. Support Genie
      await supportGenie();
    }  

    //2. Call OpenAI APIs
    await getNovel(apiKey);
    await getCover(apiKey);

    //TEMP FOR TESTING:
    //setNovel('Once upon a time, there was a lemon. It was perfectly round, perfectly yellow and perfectly ripe. The lemon originated from a small town in the south of Spain. It had been picked by an elderly lady who had tended her garden with such care that it had produced the most succulent and juicy lemons.The lemon had been shipped to London where it was purchased by an aspiring chef. He carefully chose this particular lemon for his recipe, knowing that it would impart the perfect amount of flavor to the dish he was preparing. The chef took such care as he cut the lemon into thin slices, making sure to preserve as much of its juice as possible for later use.Once his dish was complete, the chef presented it to his guests with great pride. After tasting the dish they all agreed that nothing else could have made it so delicious. They praised him for using such a special ingredient - they knew that he must have taken great care in choosing just the right lemon for his recipe. The chef thanked them graciously and thought to himself how wonderful life could be when one pays attention to detail and chooses only the finest ingredients available. He knew deep down that this lemon had been special and there would never be another one quite like it ever again.The story made its way around town until eventually everyone knew about “the Lemon” - a rare treat that could make even bland dishes taste delicious. Everyone wanted to get their hands on this magical fruit but unfortunately no one seemed to know where it came from or how to get it again! The chef kept quiet about his little secret, refusing to divulge how he got “the Lemon” in the first place. Eventually people stopped asking him about it but he never forgot what he had learned - if you want something truly special you have to go out of your way to find it and take care with every detail along the way!  That is why we still tell stories about “the Lemon” today - because no matter where you are or what you are trying to achieve in life, if you pay attention and choose only the best ingredients available then you can make something truly amazing!')
    //setCover('https://oaidalleapiprodscus.blob.core.windows.net/private/org-qPHTDu9hi4WRnTogR2Ug4wQW/user-n1icKoDvpBH13h2ktk2dBbIn/img-RLakRIhKqtDEe9rqluDGVx5F.png?st=2023-03-02T15%3A58%3A12Z&se=2023-03-02T17%3A58%3A12Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-02T05%3A46%3A40Z&ske=2023-03-03T05%3A46%3A40Z&sks=b&skv=2021-08-06&sig=4UIbmy7bYDiBehYOPJ4hOftYRsvYJOHVXJVtoxTUpcI%3D')
    //novelSuccess = true;
    //coverSuccess = true;

    stopLoading();

    //3. Display novel
    if(novelSuccess === true && coverSuccess === true){
      setComplete(true);
    }
    else{
      alert('Error retrieving novel assets.')
    }
  }

  async function supportGenie(){
    //Transaction here
    return true
  }
  
  async function getNovel(apiKeyParam){
    setProcess('Creating novel');

    const APIBody = {
      "model": "text-davinci-003",
      "prompt": `Write me a 1000 word book about a lemon' `,
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
            console.log('Novel:' , data.choices[0].text.trim())
            novelSuccess = true;
            setNovel(data.choices[0].text.trim().toString());
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
    setProcess('Creating cover');

    const APIBody = {
      "prompt": `Give me an image that is the book cover that represents a novel which is about a drunk lemon raving in a warehouse with his best friends lenny the orange and carlos the cucumber. Ensure there is no text on the image.`,
      "n": 1,
      "size": '1024x1024',
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
            console.log('Cover:' , data.data[0].url)
            coverSuccess = true;
            setCover(data.data[0].url);
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
  
  function beginLoading(){
    setLoading(true)
    props.sparkleBackground()
  }

  function stopLoading(){
    setLoading(false)
    props.unsparkleBackground()
  }

  function DisplayPrice(){
    if(!apiKey){
      return (
        <h1 className='text-black'>&nbsp;(0.005 ETH)</h1>
      )
    }
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
        setComplete(true);
      }
      else{
        alert('Invalid novel')
      }
    };  
  };

  return (
    <div className='flex flex-col justify-center items-center h-full'>
      <InfoModal open={[modalOpen, setModalOpen]} />
      <div className='book-form cover p-4 m-2'>
      <form className='flex flex-col'>
        <div className='flex-1 w-full'>
          <div className='hidden sm:block pb-4'>
            { loading === false &&
              <h1 className="form-title text-center text-black text-4xl w-full sm:text-5xl">
                Create Your Novel              
              </h1> 
            }
            { loading === true && 
              <h1 className="form-title text-center text-black text-4xl w-ful sm:text-5xl">
                {process}
              </h1>
            }
            <h1 className="text-center text-xl">What is <a className="underline cursor-pointer" target="_blank" onClick={() => setModalOpen(true)}>Novel Genie</a>?</h1>
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
                className='disabled:cursor-not-allowed disabled:bg-gray-500'
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
                  className='disabled:cursor-not-allowed disabled:bg-gray-500'
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
                  className='disabled:cursor-not-allowed disabled:bg-gray-500'
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
                  className='disabled:cursor-not-allowed disabled:bg-gray-500'
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
                  className='disabled:cursor-not-allowed disabled:bg-gray-500'
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
                  <DisplayPrice />
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
