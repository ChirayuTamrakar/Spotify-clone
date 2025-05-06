console.log("started...")

function playMusic(track){
    

    console.log("track",track);
    currentSong.src = track;
    currentSong.play();

    document.querySelector(".songinfo").innerHTML=`${track.split("/songs/")[1].replace(".mp3","").replaceAll("%20"," ")}`;
    document.querySelector(".songtime").innerHTML=`00:00 / 00:00`;
    if(currentSong.paused) {
        document.querySelector(".songbuttons").getElementsByTagName("img")[1].src="./assets/logos/button-play.svg";
    }
    else {
        document.querySelector(".songbuttons").getElementsByTagName("img")[1].src="./assets/logos/pause.svg";
    } 
}

let currentSong = new Audio();
let songs;
let prefix;

function formatTime(seconds) {
    if (isNaN(seconds)) return "00:00"; // Handles cases when duration isn't loaded yet
    const totalSeconds = Math.floor(seconds);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    const formattedMins = String(mins).padStart(2, '0');
    const formattedSecs = String(secs).padStart(2, '0');
    return `${formattedMins}:${formattedSecs}`;
  }

async function getSongLink(){
    try {
        let response = await fetch("http://127.0.0.1:5500/SigmaWebDevelopment/FullProject/Spotify/assets/songs/");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.text();
        let div =  document.createElement("div");
        div.innerHTML = data;
        let links = div.getElementsByTagName("a");
        songs=[];
        prefix = links[1].href.split("/songs/")[0];
        for(let i=0; i<links.length ; i++){
            const element = links[i];
            if(element.href.endsWith(".mp3")){
                songs.push(element.href.split("/songs/")[1]);
            }
        }
        
        
        //Array to songs name Array:
        //Putting [0] here indicates first element of the ul collection ....
        //It will NOT work, because getElementsByTagName("ul") returns a collection, not a single element.
        //You’re trying to set innerHTML on a collection — and that throws an error.
        
        for(let i in songs){
            let prevData = document.querySelector(".songList").getElementsByTagName("ul")[0].innerHTML;
            document.querySelector(".songList").getElementsByTagName("ul")[0].innerHTML = prevData + 
                    `<li>
                        <div class="info">
                            <div>${songs[i].replaceAll("%20"," ").replaceAll(".mp3","")}</div>
                            <div>Artist Name</div>
                        </div>
                        <img class="library-playbutton" src="./assets/logos/music.svg" alt="" >
                    </li>`
        }

        //Attach an event listernet to each list item in library:
        //✅ 3. Array.from(...)
        //Since getElementsByTagName returns an HTMLCollection, we use Array.from() to convert it into a real array so we can use array methods like forEach.
      
        Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach( e=>{
            e.addEventListener("click", element => {
                playMusic(`${prefix}` + `/FullProject/Spotify/assets/songs/` + e.querySelector(".info").firstElementChild.innerHTML.replaceAll(" ", "%20") + `.mp3`)   
            })
        })

        ///Attach song button event Listener:

        play.addEventListener("click", ()=>{
            if(currentSong.paused) {
                document.querySelector(".songbuttons").getElementsByTagName("img")[1].src="./assets/logos/pause.svg";
                currentSong.play();
            }
            else {
                currentSong.pause();
                document.querySelector(".songbuttons").getElementsByTagName("img")[1].src="./assets/logos/button-play.svg";
            }   
        })
        
        //Listen for timeupdate event
        currentSong.addEventListener("timeupdate",()=>{
            document.querySelector(".songtime").innerHTML=`
            ${formatTime(currentSong.currentTime)} / 
            ${formatTime(currentSong.duration)} `
            document.querySelector(".circle").style.left=(currentSong.currentTime/currentSong.duration)*100 + "%"
        })

        //Add an event Listner to Seekbar
        //Transition don't work when position of circle was absolute 
        document.querySelector(".seekbar").addEventListener("click", e=>{
            let percent = (e.offsetX/e.target.getBoundingClientRect().width * 100); 
            document.querySelector(".circle").style.left = percent + "%";
            currentSong.currentTime = ((currentSong.duration)*percent)/100;
        })

        //Add an event Listner to Hamburger:
        document.querySelector(".hamburger").addEventListener("click",()=>{
            document.querySelector(".sideNav").style.left=0+"%";
            document.querySelector(".dashboard").style.opacity=0.2;
        })
        document.querySelector(".close").addEventListener("click",()=>{
            document.querySelector(".sideNav").style.left=-100+"%";
            document.querySelector(".dashboard").style.opacity=1;

        })

        //Add event listner to prev and next:
        prev.addEventListener("click",()=>{
            let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
            if( !(index == 0) )
                playMusic(`${prefix}` + `/FullProject/Spotify/assets/songs/` + songs[index-1].replaceAll(" ", "%20") )   
        })

        next.addEventListener("click",()=>{
            let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
            if((index+1) < songs.length)
                playMusic(`${prefix}` + `/FullProject/Spotify/assets/songs/` + songs[index+1].replaceAll(" ", "%20") )   

        })

        document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
            currentSong.volume = parseInt(e.target.value)/100;
        })


    } catch (error) {
        console.log("Error fetching song link:", error);
    }

}

function playSong(){
    console.log("Inside playsong function");
}

getSongLink();

  function setVanta() {
    if (window.VANTA) {
      window.VANTA.WAVES({
        el: ".container",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x000000,
        shininess: 97.00,
        waveHeight: 12.00,
        waveSpeed: 0.50,
        zoom: 1.10
      });
    }
  }
  window.addEventListener("DOMContentLoaded", setVanta);

