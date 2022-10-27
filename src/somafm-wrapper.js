
async function fetchChannels() {
  const rsp = await fetch("https://somafm.com/channels.json" ),
        data = await rsp.json();
  
  let FoundData = []
  
  let SOMAFMchannels = data.channels
  
  for (const channel in SOMAFMchannels){
    
    let results = [{title: SOMAFMchannels[channel].title, description: SOMAFMchannels[channel].description, image: `http://ice1.somafm.com/${SOMAFMchannels[channel].id}-128-mp3`}]
    
  let genres = SOMAFMchannels[channel].genre.split("|")
    
  let GenresList = []

   for (const genre in genres){
     let genreOBJECT =  genres[genre]
    GenresList.push({genre: genres[genre]})

 }
    results.push({genres: GenresList})
    
   FoundData.push(results)
  
  }
  
  return FoundData;
}

async function SOMAFMchannels_Scraper()
{
  try {
    let result = await fetchChannels();
   return result
  } catch( err ) {
    console.error( err.message );
  }
}


SOMAFMchannels_Scraper().then(function(search_results) {
    console.log(search_results)
  });
