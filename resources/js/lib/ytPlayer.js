//youtube API 불러오는 부분
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//플레이어 변수 설정
var player;
function onYouTubeIframeAPIReady() {
	player = new YT.Player('mainVideo', {
		videoId: 'W5g9Cfl-MBc',
		events: {
			'autoplay' : 1,
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange,
			'rel' : 0
		}
	});
}

function onPlayerReady(event) {
	event.target.mute();
	event.target.playVideo();
}

var done = false;
function onPlayerStateChange(event) {
	if (event.data == 0 ) {
		event.target.playVideo();
	}
}