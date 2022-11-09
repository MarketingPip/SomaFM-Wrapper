
async function fetchChannels(arg1, arg2) {
  if(arg1){
    arg1 = arg1.toLowerCase()
  }
  
   if(arg2){
    arg2 = arg2.toLowerCase()
  }
  
  const rsp = await fetch("https://somafm.com/channels.json" ),
        data = await rsp.json();
  
  let FoundData = []
  
  let SOMAFMchannels = data.channels
  
   let validOptions = ["recent", "single", "all"]
  let validOption = false;
   function CheckIfValidOption(arg1){
   for (const option in validOptions){
    if (arg1 === validOptions[option]){
      validOption = true; 
    }
   }
    if (validOption === false){
      return FoundData = {soma_wrapper_error: "Your function did not provide a valid option.", validOptions}
    } 
     
   }
 
   CheckIfValidOption(arg1)
  
  if (arg1 === "all"){
    fetchAllChannels()
    
  }
  
   if (arg1 === "single"){
    fetchChannelByName(arg2)
    
  }
  
  async function fetchChannelByName(arg2){
    let FoundChannel = false;
    for (const item in SOMAFMchannels){
    
      if (arg2 === SOMAFMchannels[item].title.toLowerCase()){
        
        
          let results = [{title: SOMAFMchannels[item].title, description: SOMAFMchannels[item].description, image: `http://ice1.somafm.com/${SOMAFMchannels[item].id}-128-mp3`}]
           let genres = SOMAFMchannels[item].genre.split("|")
    
  let GenresList = []

   for (const genre in genres){
     let genreOBJECT =  genres[genre]
    GenresList.push({genre: genres[genre]})

    }
   
/////
    FoundChannel = true;
        
   FoundData.push({channel_info: results, genres: GenresList})

  } 
  
          
      
    } if (FoundChannel != true){
     FoundData = {soma_wrapper_error: "Channel name not found"}
    }

    
    
  }
  
  
  function fetchAllChannels(){
  for (const channel in SOMAFMchannels){
    
    let results = [{title: SOMAFMchannels[channel].title, description: SOMAFMchannels[channel].description, image: `http://ice1.somafm.com/${SOMAFMchannels[channel].id}-128-mp3`}]
    //
    
  let genres = SOMAFMchannels[channel].genre.split("|")
    
  let GenresList = []

   for (const genre in genres){
     let genreOBJECT =  genres[genre]
    GenresList.push({genre: genres[genre]})


      FoundData.push({channel_info: results, genres: GenresList})
   }
   

  } 
  

  }    
    
    return FoundData
}

async function SOMAFMchannels_Scraper(arg1, arg2)
{
  try {
    let result = await fetchChannels(arg1, arg2);
   return result
  } catch( err ) {
    return {soma_wrapper_error: err.message }
    console.error( err.message );
  }
}


SOMAFMchannels_Scraper("singlde", "Christmas Lounge").then(function(search_results) {
    console.log(search_results)
  });
