const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

var oscilator = null;

var keySources = {};
var keyIsPlaying ={};


function getAscii(ch){
    const index = 0;
    return ch.charCodeAt(index);
}

const page = document.getElementById('page');

//start new sine oscilator
page.addEventListener('keydown', (e) => {
    let ch = e.key;
    console.log('started ' + ch);
    if(keyIsPlaying[ch] === true){
        return;
    }
    if(keySources[ch] == null) {
        keySources[ch] = audioContext.createOscillator();
        keySources[ch].frequency.value = 220 + getAscii(ch)/8;
        keySources[ch].type = 'sine';
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



