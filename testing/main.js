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
        // console.log('parando som');
        oscilator.disconnect();
        oscilator.stop();
        return;
    } 
    
    // console.log('iniciando som');
    
    oscilator = audioContext.createOscillator();
    var gain = audioContext.createGain();
    oscilator.frequency.value = 150;
    oscilator.type = 'sine';
    gain.gain.value = 0.5;
    oscilator.connect(gain);
    gain.connect(audioContext.destination);
    oscilator.start(0);
}

function getAscii(ch){
    const index = 0;
    return ch.charCodeAt(index);
}

page.addEventListener('keydown', (e) => {//start new sine oscilator
    let ch = e.key;
    console.log('started ' + ch);
    if(keyIsPlaying[ch] === true){
        return;
    }
    if(keySources[ch] == null) {
        console.log(`tentando de novo`)
        keySources[ch] = audioContext.createOscillator();
    }
    let gain = audioContext.createGain();
    gain.gain.value = 0.3;
    keySources[ch].frequency.value = getAscii(ch);
    keySources[ch].type = 'sine';
    keySources[ch].connect(gain);
    gain.connect(audioContext.destination);
    keySources[ch].start(0);
    keyIsPlaying[ch]=true;
    console.log(keySources);
});

page.addEventListener('keyup', (e) => {//stop oscilator
    let ch = e.key;
    console.log('stopped ' + ch);
    keySources[ch].disconnect();
    keySources[ch].stop();
    keySources[ch]=null;
    keyIsPlaying[ch]=false;
    console.log(keySources);
});