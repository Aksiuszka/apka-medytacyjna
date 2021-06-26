const song = document.querySelector(".song");
const play = document.querySelector(".play");
const outline = document.querySelector(".moving-outline circle");
const video = document.querySelector(".video video");
const sounds = document.querySelector(".dzwiek button");

const timeDisplay = document.querySelector(".czas-medytacji");
const outlineLength = outline.getTotalLength();
const timeSelect = document.querySelectorAll(".czas button");
let duration = 600;

outline.style.strokeDashoffset = outlineLength;
outline.style.strokeDasharray = outlineLength;


play.addEventListener("click", function() {
    sprawdzCzyGra(song);
  });


  //wybierz piosenke

  timeSelect.forEach(option => {
    option.addEventListener("click", function(){
        duration=this.getAttribute("data-time");
        timeDisplay.textContent=`${Math.floor(duration / 60)}:${Math.floor(
            duration % 60)}`;
    });
  });

  const sprawdzCzyGra = song => {
    if(song.paused){
        song.play();
        video.play();
        play.src="./svg/pause.svg";
    }
    else{
        song.pause();
        video.pause();
        play.src="./svg/play.svg";

    }
}

song.ontimeupdate = function(){
    let currentTime = song.currentTime;
    let elapsed = duration - currentTime;
    let seconds = Math.floor(elapsed%60);
    let minutes = Math.floor(elapsed/60);
    let progress = outlineLength - (currentTime / duration) * outlineLength;
    outline.style.strokeDashoffset = progress;
    timeDisplay.textContent = `${minutes}:${seconds}`;

}

if(currentTime>=duration){
    song.pause();
    song.currentTime=0;
    play.src="./svg/play.svg";
    video.pause();
}