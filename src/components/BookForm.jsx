import React, { useState } from 'react'

const BookForm = (props) => {

  const result = "Lemon\
  By Julia Smith\
  Chapter One: The Origin of the Lemon\
  The lemon is native to Southeast Asia and has a long, rich history. It is believed to have first been cultivated in India around 500 BC, and was spread throughout the world by trade routes. The Egyptians were among the first to cultivate it, and used it for its refreshing flavor and as an ingredient in many dishes. In ancient Rome, lemons were used as a remedy for respiratory illnesses, while in the Middle Ages they were believed to have magical properties. \
  The lemon has long been associated with health benefits due to its high levels of vitamins C and A, folate, potassium, calcium, magnesium, copper and other antioxidants. Studies have shown that it can help protect against cardiovascular disease, aid digestion, reduce inflammation and boost immunity. It is also thought to have anti-cancer properties due to its high levels of phytonutrients. \
  Chapter Two: Uses for Lemons \
  Lemons are incredibly versatile; they can be used in cooking as well as for cleaning purposes. They can be juiced or zested for use in sauces or drinks such as lemonade or cocktails. The juice can also be used as a natural bleaching agent or an antibacterial cleaner for surfaces. Lemons are often used in baking recipes like cakes and muffins for their zesty flavor; they can also be added to salads or marinades to give them a zingy kick. \
  Lemon essential oil has a wide range of uses too; it’s often used in aromatherapy due to its calming and uplifting scent which can help reduce anxiety and promote relaxation. It’s also popular with those suffering from skin issues such as acne or eczema because of its antiseptic properties which help reduce inflammation and redness. Lemon oil is even thought to help reduce stress levels when inhaled through diffusers or rubbed onto the temples or back of the neck area; making it perfect for those who suffer from insomnia or anxiety disorders. \
  Chapter Three: Health Benefits of Lemons \
  As mentioned previously lemons are packed full of vitamins which make them incredibly beneficial for our health including vitamins C and A which help boost our immune system whilst giving us an additional energy boost when we need it most! The antioxidants found within lemons are also thought to be helpful when it comes to protecting against heart disease due to their ability to reduce inflammation throughout the body – something we all need! Additionally studies have shown that drinking lemon juice on a regular basis may help lower cholesterol levels whilst helping us maintain healthy blood pressure too! \
  When consumed regularly lemons may also assist with weight loss by aiding digestion; their Vitamin C content helps flush out toxins from our bodies whilst their acidic qualities balance pH levels within our stomachs – both of which can lead us towards improved digestive health! Finally lemons have been known to improve our skin complexion; when applied directly onto blemishes they can naturally dry out spots whilst reducing redness - leaving us looking brighter than ever! \
  So there you have it – three chapters full of interesting facts on the humble yet highly beneficial lemon! Hopefully this book has given you enough information on why incorporating this yellow beauty into your diet could potentially benefit your health significantly - experience these advantages yourself by stocking up on lemons today!"

  // Status
  const [loading, setLoading] = props.loading;
  const [complete, setComplete] = props.complete;
  const [process, setProcess] = useState(null)

  // API Data
  const [apiKey, setApiKey] = useState(false)

  // Story Data
  const [plot, setPlot] = useState(false)
  const [whoElse, setWhoElse] = useState(false)
  const [moral, setMoral] = useState(false)
  const [style, setStyle] = useState(false)
  
  // Novel
  const [novel, setNovel] = props.novel

  // Functions
  async function supportGenie(){
    //Transaction here
    return
  }

  async function callOpenAIAPI(apiKeyParam){
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
            console.log(data.choices[0].text.trim())
            return data.choices[0].text.trim();
          }
          else{
            stopLoading();
            alert(data.error.message);
            console.error(data.error.message);
            return data;
          }
        }
        else{
          stopLoading();
          alert('Unexpected error occured!')
          return data;
        }
      })
    } catch (e) {
      console.error(e);
    }
  }
  
  async function generateNovel(result){
    setProcess('Formatting novel');

    setNovel(result);
    return result
  }

  async function mintNovel(){
    return
  }

  async function handleSubmit(){
    beginLoading();

    // NO API KEY SUPPORT GENIE
    if(apiKey === false || apiKey === ''){
      //1. Support Genie
      await supportGenie();
      setApiKey((import.meta.env.VITE_REACT_APP_OPENAI_API_KEY).toString());
    }  

    //2. Call OpenAI
    const result = await callOpenAIAPI(apiKey);
    
    //3. Prepare Novel
    await generateNovel(result)
      
    stopLoading();

    //4. Display novel
    if(novel){
      setComplete(true);
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

  return (
    <div>
      <div className="book-form cover p-8">
          <form className='flex items-center flex-col mt-1'>
              { loading === false &&
                <h1 className="form-title text-center text-black text-5xl">
                  Create Your Story              
                </h1> 
              }
              { loading === true && 
                <h1 className="form-title h-4text-center text-black text-5xl">
                  {process}
                </h1>
              }

            <div className='w-full'>
              <div className='flex'>
                <div className='flex-auto'>
                  <div className='flex justify-start'>
                    <div className='form-step-no'>
                      <label>1. &nbsp; </label>
                    </div>
                    <div>
                      <label htmlFor="apikey">
                        Enter your API Key
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
              <div className='flex justify-center mt-3'>
                <div className='flex items-center'>
                  <p className='text-black'>📜&nbsp; Leave a story info step empty for a random result&nbsp;🧞‍♂️</p>
                </div>
              </div>
            </div>

          </form>
      </div>
    </div>
  )
}

export default BookForm
