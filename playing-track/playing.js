let pre = document.querySelector('#pre')
let play = document.querySelector('#play')
let next = document.querySelector('#next')
let title = document.querySelector('#track-title')
let artist = document.querySelector('#track-artist')
let percent_volume = document.querySelector('#volume_bar')
let percent_track = document.querySelector('#duration_bar')
let image = document.querySelector('#track_img')
let volume_value = document.querySelector('#show_volume')
let like = document.querySelector('#like')
let timer;
let playing_song = false;
let index = 0;
let track = document.createElement('audio');
let all=[
    {
        name: "Tan vo",
        path: "./sound/tanvo.mp3",
        img: "./img/chidan.jpg",
        singer: "Chi Dan",
        like: false
    },
    {
        name: "Ha con vuong nang",
        path: "./sound/haconvuongnang.mp3",
        img: "./img/datkaa.png",
        singer: "Datkaa",
        like: false
    }
]
console.log(title)
function load_track(index){    
    clearInterval(timer);
    reset_slider();
    track.src=all[index].path;

    title.innerHTML = all[index].name;
    artist.innerHTML = all[index].singer;
    image.src = all[index].img;
    like_track();
    track.load();  
    setInterval(range_slider,1000) ; 
}
load_track(index)
function mute_sound(){
    track.volume = 0;
    volume_value.innerHTML = 0;
    percent_volume.value = 0
}
function justplay(){
    if(playing_song==true)
    {
        pausesong()
    }
    else playsong()
}
function reset_slider(){
    percent_track.value = 0
}
function playsong(){
    track.play()
    playing_song = true
    play.innerHTML= '<i class="bi bi-pause-circle-fill" aria-hidden="true"></i>'
}
function pausesong(){
    track.pause()
    playing_song=false
    play.innerHTML = '<i class="bi bi-play-circle-fill" aria-hidden="true"></i>'
}
function next_song(){
    if(index < all.length -1)
    {
        index +=1
        load_track(index)
        playsong()
    }
    else{
        index = 0
        load_track(index)
        playsong()
    }
}
function pre_song(){
    if(index > 0)
    {
        index -=1
        load_track(index)
        playsong()
    }
    else{
        index = all.length -1
        load_track(index)
        playsong()
    }
}
function change_volume(){
    volume_value.innerHTML = percent_volume.value
    track.volume = percent_volume.value / 100
}
function change_duration(){
    track.currentTime = track.duration * (percent_track.value/100)
}
function range_slider(){
	if(!track.ended){
		percent_track.value =  track.currentTime * (100 / track.duration);
	}
    else{
        if(index < all.length - 1)
        {
            index +=1;
        }
        else index = 0;
        load_track(index);
        playsong(index);
	}
}
function liked(){
    if(all[index].like == true)
    {
        all[index].like = false
    }        
    else
        all[index].like = true
    like_track()
}
function like_track(){
    if(all[index].like == true)
    {
        like.className = 'bi bi-check-circle-fill'
    }        
    else
    {
        like.className = 'bi bi-heart'
    }  
}
function plus(){
    percent_volume.value++;
    volume_value.innerHTML = percent_volume.value;
    track.volume = percent_volume.value / 100;
}
function minus(){
    percent_volume.value-=1;
    volume_value.innerHTML = percent_volume.value;
    track.volume = percent_volume.value / 100;
}