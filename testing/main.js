const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
var oscilator = null;

var keySources = {};

var keyIsPlaying ={};


const page = document.getElementById('page');

var isPlaiyingWA = false;

function playWebAudio() {
    
    isPlaiyingWA = !isPlaiyingWA;
    if(!isPlaiyingWA){
        oscilator.disconnect();
        oscilator.stop();
        return;
    } 
    
    oscilator = audioContext.createOscillator();
    var gain = audioContext.createGain();
    oscilator.frequency.value = 500;
    oscilator.type = 'sine';
    gain.gain.value = 0.5;
    oscilator.connect(gain).connect(audioContext.destination);
    oscilator.start(0);
}

function getAscii(ch){
    const index = 0;
    return ch.charCodeAt(index);
}

//start new sine oscilator
page.addEventListener('keydown', (e) => {
    let ch = e.key;
    console.log('started ' + ch);
    if(keyIsPlaying[ch] === true){
        return;
    }
    if(keySources[ch] == null) {
        keySources[ch] = audioContext.createOscillator();
        keySources[ch].frequency.value = getAscii(ch)*(1000/127);
        keySources[ch].type = 'sin';
        let gain = audioContext.createGain();
        gain.gain.value = 0.3;
        keySources[ch].connect(gain).connect(audioContext.destination);
    }

    keySources[ch].start(0);
    keyIsPlaying[ch]=true;
});

//stop oscilator
page.addEventListener('keyup', (e) => {
    let ch = e.key;
    console.log('stopped ' + ch);
    keySources[ch].disconnect();
    keySources[ch].stop();
    keySources[ch]=null;
    keyIsPlaying[ch]=false;
});