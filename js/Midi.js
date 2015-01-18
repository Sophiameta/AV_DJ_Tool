

function midiMessage(event) {
    console.log(
        event.target.name,
        event.data,
        event.receivedTime
    );


    switch(event.data[1]){
            //LEFT CHANNEL
            //Play
            case 19:
                var button_play1 = document.getElementById('start1');
                button_play1.value = event.data[2];
                Load.getSong(1).play();
                break;

            //Pause
            case 20:
                var button_pause1 = document.getElementById('pause1');
                button_pause1.value = event.data[2];
                Load.getSong(1).pause();
                break;

            //Stop
            case 23:
                var button_stop1 = document.getElementById('stop1');
                button_stop1.value = event.data[2];
                Load.getSong(1).stop();
                break;

            //Rewind
            case 24:
                if(event.data[2] == 127) {
                    Load.getSong(1).rewindOn();
                    console.log('Rewind on');
                }else if(event.data[2] == 0){
                    Load.getSong(1).rewindOff();
                    console.log('Rewind off');
                }
                break;


            //Forward
            case 27:
                if(event.data[2] == 127) {
                    Load.getSong(1).forwardOn();
                    console.log('Forward on');
                }else if(event.data[2] == 0){
                    Load.getSong(1).forwardOff();
                    console.log('Forward off');
                }
                break;

            //Volume
            case 48:
                var slider_volume1 = document.getElementById('volumeIn1');
                slider_volume1.value = event.data[2]/127 * 100;
                Load.getSong(1).setVolume((slider_volume1.value)/100);
                break;

            //Speed
            case 6:
                var speedSlider = document.getElementById('speedIn1');
                speedSlider.value = event.data[2]/127 *2  ;
                Load.getSong(1).setSpeed(speedSlider.value);
                break;

            //Lowpass
            case 10:
                var slider_lowpass = document.getElementById('lowpassIn1');
                slider_lowpass.value = event.data[2]/127 * 20000;
                Load.getSong(1).setLowpassFreq(slider_lowpass.value);
                break;

            //Mids
            case 14:
                var slider_mids = document.getElementById('midsIn1');
                slider_mids.value = -10 + ((event.data[2]/127) * 20)    ;
                Load.getSong(1).setMidsGain((slider_mids.value));
                break;

            //Bass
            case 18:
                var slider_bass = document.getElementById('bassIn1');
                slider_bass.value =  -10 + event.data[2]/127 * 20;
                Load.getSong(1).setBassGain((slider_bass.value));
                break;


            //RIGHT CHANNEL
            //Play
            case 28:
                var button_play2 = document.getElementById('start2');
                button_play2.value = event.data[2];
                Load.getSong(2).play();
                break;

            //Pause
            case 31:
                var button_pause2 = document.getElementById('pause2');
                button_pause2.value = event.data[2];
                Load.getSong(2).pause();
                break;

            //Stop
            case 32:
                var button_stop2 = document.getElementById('stop2');
                button_stop2.value = event.data[2];
                Load.getSong(2).stop();
                break;

            //Rewind
            case 49:
                if(event.data[2] == 127) {
                    Load.getSong(2).rewindOn();
                    console.log('Rewind on');
                }else if(event.data[2] == 0){
                    Load.getSong(2).rewindOff();
                    console.log('Rewind off');
                }
                break;


            //Forward
            case 50:
                if(event.data[2] == 127) {
                    Load.getSong(2).forwardOn();
                    console.log('Forward on');
                }else if(event.data[2] == 0){
                    Load.getSong(2).forwardOff();
                    console.log('Forward off');
                }
                break;

            //Volume
            case 51:
                var slider_volume2 = document.getElementById('volumeIn2');
                slider_volume2.value = event.data[2]/127 * 100;
                Load.getSong(2).setVolume((slider_volume2.value)/100);
                break;

            //Speed
            case 9:
                var slider_speed2 = document.getElementById('speedIn2');
                slider_speed2.value = event.data[2]/127 *2  ;
                Load.getSong(2).setSpeed(slider_speed2.value);
                break;

            //Lowpass
            case 13:
                var slider_lowpass2 = document.getElementById('lowpassIn2');
                slider_lowpass2.value = event.data[2]/127 * 20000;
                Load.getSong(2).setLowpassFreq(slider_lowpass2.value);
                break;

            //Mids
            case 17:
                var slider_mids2 = document.getElementById('midsIn2');
                slider_mids2.value = -10 + ((event.data[2]/127) * 20)    ;
                Load.getSong(2).setMidsGain((slider_mids2.value));
                break;

            //Bass
            case 21:
                var slider_bass2 = document.getElementById('bassIn2');
                slider_bass2.value =  -10 + event.data[2]/127 * 20;
                Load.getSong(2).setBassGain((slider_bass2.value));
                break;



            //Crossfader

            case 64:
                var crossfader = document.getElementById('crossfader');
                crossfader.value = event.data[2]/127;
                Load.getSong(1).setVolume((100 - crossfader.value) / 100);
                Load.getSong(2).setVolume((0 + crossfader.value)/100 );
                break;


            default:
                console.log("Kein gültiger Kanal");
                break;


        }
}

function onMIDISuccess(midi) {
    console.log("MIDI ready!");
    console.log(midi.inputs);
    var inputs = midi.inputs;
    console.log("hallo" + inputs);
    for (var input of inputs.values()) {
        input.addEventListener('midimessage', midiMessage);
        input.onmidimessage = midiMessage;
    }
}

function onMIDIFailure(msg) {
    console.log("Failed to get MIDI access - " + msg);
}

function midiInit() {
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
    }
    else {
        onMIDIFailure();
    }
}




window.addEventListener('load', midiInit);

