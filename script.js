console.log("Aa gaya bhidu")

async function getSongsList(){
    let a =  await fetch("http://127.0.0.1:5500/SigmaWebDevelopment/FullProject/Spotify/assets/songs/")
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    console.log(as);
    let songs=[];
    for(let index=0; index < as.length; index++){
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("/songs/")[1])
        }
    }
    return songs;
}

async function updateLibrary(){
    let songs = await getSongsList();
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for(const song of songs){
        songUL.innerHTML = songUL.innerHTML + ``;
    }
    

    
}
updateLibrary()




