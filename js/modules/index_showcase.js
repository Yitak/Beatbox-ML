import WaveSurfer from './WAVESURFER_MAIN.js';
import Hover from './WAVESURFER_HOVER.js';

const playbuttons = document.querySelectorAll(".audio-player i");
const audioDurations = document.querySelectorAll(".audio-duration");
const waveformContainerUser = document.querySelector(".waveform-container.user");
const waveformContainerAI1 = document.querySelector(".waveform-container.ai_1");
const waveformContainerAI2 = document.querySelector(".waveform-container.ai_2");
const waveformContainerAI3 = document.querySelector(".waveform-container.ai_3");

const waveformContainerlists = [waveformContainerUser, waveformContainerAI1, waveformContainerAI2, waveformContainerAI3];
const urlList = ['assets/audio/1 first_before.mp3', 'assets/audio/2 after_basic.mp3', 'assets/audio/3 after_bassy.mp3', 'assets/audio/4 after_fillers.mp3'];
const waveColors = ['#008282', '#ad961f', '#ad961f', '#ad961f'];
const progressColors = ['#006666', '#877416', '#877416', '#877416'];

// WAVESURFER HOVER PLUGIN:
const WAVESURFER_HOVER_SETTINGS = Hover ? Hover.create({
    lineColor: '#fa8072',
    lineWidth: 1.5,
    labelBackground: '#777',
    labelColor: '#fff',
    labelSize: '12px',
}) : null;

var formatTime = function (time) {
    return [
        ('00' + Math.floor((time % 3600) / 60)).slice(-2), // minutes
        ('00' + Math.floor(time % 60)).slice(-2) // seconds
    ].join(':');
};

// Responsive waveform height calculation
function vh(percent) {
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (percent * h) / 100;
}

function vw(percent) {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (percent * w) / 100;
}

const R_PHONE = 0.462;
const R_PC = 2.101;
const P_SHIFT = 2;

function empirical(percent) {
    var r = vw(100) / vh(100);
    var d = vw(P_SHIFT) / (R_PC - R_PHONE) * (r - R_PHONE);
    return d + vw(percent);
}

for (const i of Array(4).keys()) {
    // Create waveform object
    const wavesurfer = WaveSurfer.create({
        container: waveformContainerlists[i],
        waveColor: waveColors[i],
        progressColor: progressColors[i],
        responsive: true,
        height: "auto",
        cursorWidth: 1.5,
        cursorColor: '#545454',
        sampleRate: 48000,
        plugins: [
            Hover.create({
                lineColor: '#fa8072',
                lineWidth: 1.5,
                labelBackground: '#777',
                labelColor: '#fff',
                labelSize: '12px',
            }),
        ],
    })
    wavesurfer.load(urlList[i]);
    // Audio controls
    playbuttons[i].addEventListener('click', () => {
        if (playbuttons[i].className == "bx bx-play-circle") {
            wavesurfer.playPause();
            playbuttons[i].className = "bx bx-pause-circle";
        } else {
            wavesurfer.playPause();
            playbuttons[i].className = "bx bx-play-circle";
        }
    })
    // Show current time
    wavesurfer.on('ready', function () {
        audioDurations[i].textContent = formatTime(wavesurfer.getDuration());
    });
    // Show current time
    wavesurfer.on('audioprocess', function () {
        audioDurations[i].textContent = formatTime(wavesurfer.getCurrentTime());
    });
    // When audio ends
    wavesurfer.on('finish', () => {
        playbuttons[i].className = "bx bx-play-circle";
    })
}