var video = document.getElementById("video");
var juice = document.querySelector(".color-juice");
var btn = document.getElementById("play-pause");
var timer = document.getElementById("timer");
var skipButtons = document.querySelectorAll("[data-skip]");
var ranges = document.querySelectorAll(".player-slider");
var bar = document.querySelector(".color-bar");
var resVol = document.getElementById("reset-vol");
var resSpe = document.getElementById("reset-speed");
var volume = document.querySelector(".volume");
var volContainer = document.getElementById("volume");
var volDisplay = document.getElementById("vol-display");
var speed = document.querySelector(".speed-range");
var speDisplay = document.getElementById("spe-display");
var resSpe = document.getElementById("reset-speed");
var muteBtn = document.getElementById("mute-button");
var fullscreen = document.getElementById("fullscreen");
var videoCont = document.querySelector(".c-video");
var loop = document.getElementById("loop");
var forwardBTN = document.getElementById("forward");
var backwardBTN = document.getElementById("backward");

var volDis = volDisplay.innerHTML;
function togglePlayPause() {
    if(video.paused){
        btn.className = "pause";
        video.play();
    } else {
        btn.className = "play";
        video.pause();
    }
}

btn.onclick = function () {
    togglePlayPause();
}

video.onclick = function () {
    togglePlayPause();
}

video.addEventListener("timeupdate", function (){
    var duration = video.duration;
    var current = video.currentTime;
    var cMin = Math.trunc(Math.round(current) / 60);
    var dMin = Math.trunc(Math.round(duration) / 60);
    var cSec = Math.round(current) % 60;
    var dSec = Math.round(duration) % 60;
    if(String(cSec).length < 2){
        var cSec0 = String(0+String(cSec));
    }else{
        var cSec0 = String(cSec);
    }
    if(String(dSec).length < 2){
    var dSec0 = String(0+String(dSec));
    }else{
        var dSec0 = String(dSec);
    }
    timer.innerHTML = String(cMin+":"+cSec0+" / "+dMin+":"+dSec0);

    var juicePos = current / duration;
    juice.style.width = juicePos * 100 + "%";
    if(video.ended){
        btn.className = "restart";
    }
})


function scrub(e) {
    const scrubTime = e.offsetX / bar.offsetWidth * video.duration;
    video.currentTime = scrubTime;
}

let mouseDown = false;
bar.addEventListener("click", scrub);
bar.addEventListener("mousemove", (e) => {
    if(mouseDown){
        scrub(e);
    }
});
bar.addEventListener("mousedown", () => mouseDown = true);
bar.addEventListener("mouseup", () => mouseDown = false); 

skipButtons.forEach(button => button.addEventListener('click', function(){video.currentTime += parseFloat(this.dataset.skip)}));
onload = function(){
    video.volume = 1;
    volume.value = 1;
    volDisplay.innerHTML = "100%";
    video.playbackRate = 1;
    speed.value = 1;
    speDisplay.innerHTML = "1x";
    video.muted = false;
}
resVol.onclick = function(){
    video.volume = 1;
    volume.value = 1;
    volDisplay.innerHTML = "100%";
}

volume.addEventListener("mousemove", (e)=> {
    video.volume = e.target.value;
    volDisplay.innerHTML = String(Math.trunc(e.target.value * 100) + "%");
})

volume.addEventListener("change", (e)=> {
    video.volume = e.target.value;
    volDisplay.innerHTML = String(Math.trunc(e.target.value * 100) + "%");
})

speed.addEventListener("mousemove", (e)=> {
    video.playbackRate = e.target.value;
    speDisplay.innerHTML = String(e.target.value + "x");
})

resSpe.onclick = function(){
    video.playbackRate = 1;
    speed.value = 1;
    speDisplay.innerHTML = "1x";
}

muteBtn.addEventListener("click", mute)



fullscreen.addEventListener("click", fullscreenFunc)

loop.addEventListener("click", looper)

window.addEventListener("keypress", checkPressAscii, false)
window.addEventListener("keydown", checkPressDown, false)

function checkPressDown(key){
    if(key.keyCode  == "39"){ //right arrow
        forwardBTN.click();
    }
    if(key.keyCode == "37"){ //left arrow
        backwardBTN.click();
    }
    if(key.keyCode == "27"){ //exit fullscreen escape
        fullscreen.classList.remove("full");
    video.classList.remove("full");
    videoCont.classList.remove("full");
    }
    if(key.keyCode == "38"){ //up arrow
        if(video.volume >= 0.95){
            video.volume = 1;
        }else{
            video.volume = video.volume +0.05;
        }
        if(volume.value >= 0.95){
            volume.value = 1;
        }else{
            volume.value = volume.value +0.05;
        }
        volDisplay.innerHTML = String(volume.value * 100) + "%";
    }
    if(key.keyCode == "40"){ //down arrow
        if(video.volume <= 0.05){
            video.volume = 0;
        }else{
            video.volume = video.volume -0.05;
        }
        if(volume.value >= 0.05){
            volume.value = 0;
        }else{
            volume.value = volume.value -0.05;
        }
        volDisplay.innerHTML = String(volume.value * 100) + "%";
    }
}

function checkPressAscii(key){
    if(key.keyCode == "77" || key.keyCode == "109"){ //mute m,M
        mute();
    }
    if(key.keyCode == "70" || key.keyCode == "102"){ //fullscreen f,F
        fullscreenFunc();
    }
    if(key.keyCode == "32"){ //play,pause space
        togglePlayPause();
    }
    if(key.keyCode == "76" || key.keyCode == "108"){ //loop l,L
        looper();
    }
    if(key.keyCode == "48"){ //0
        skipToPos(0);
    }if(key.keyCode == "49"){ //1
        skipToPos(1);
    }if(key.keyCode == "50"){ //2
        skipToPos(2);
    }if(key.keyCode == "51"){ //3
        skipToPos(3);
    }if(key.keyCode == "52"){ //4
        skipToPos(4);
    }if(key.keyCode == "53"){ //5
        skipToPos(5);
    }if(key.keyCode == "54"){ //6
        skipToPos(6);
    }if(key.keyCode == "55"){ //7
        skipToPos(7);
    }if(key.keyCode == "56"){ //8
        skipToPos(8);
    }if(key.keyCode == "57"){ //9
        skipToPos(9);
    }if(key.keyCode =="214" || key.keyCode == "246"){ //ö, Ö
        skipToPos(10);
    }
}

function skipToPos(value){
    switch(value){
        case 0:
            video.currentTime = 0;
        break;
        case 1:
            video.currentTime = video.duration / 10 * 1;
        break;
        case 2:
            video.currentTime = video.duration / 10 * 2;
        break;
        case 3:
            video.currentTime = video.duration / 10 * 3;
        break;
        case 4:
            video.currentTime = video.duration / 10 * 4;
        break;
        case 5:
            video.currentTime = video.duration / 10 * 5;
        break;
        case 6:
            video.currentTime = video.duration / 10 * 6;
        break;
        case 7:
            video.currentTime = video.duration / 10 * 7;
        break;
        case 8:
            video.currentTime = video.duration / 10 * 8;
        break;
        case 9:
            video.currentTime = video.duration / 10 * 9;
        break;
        case 10:
            video.currentTime = video.duration;
        break;
    }
}

function mute(){
    video.muted = !video.muted;
    muteBtn.classList.toggle("muted");
}
function fullscreenFunc(){
    fullscreen.classList.toggle("full");
    video.classList.toggle("full");
    videoCont.classList.toggle("full");
}
function looper(){
    video.loop = !video.loop;
    loop.classList.toggle("loop");
}




