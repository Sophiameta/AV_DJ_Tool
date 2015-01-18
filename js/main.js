Load = new Loader();

function init(){

    var button_file1 = document.getElementById('file1');
    button_file1.addEventListener('change', function(){Load.getSong(1).stop(); Load.loadAudio(this.files, 1)});

    var button_rewind1 = document.getElementById('rewind1');
    button_rewind1.addEventListener('mousedown', function(){Load.getSong(1).rewindOn()});
    button_rewind1.addEventListener('mouseup', function(){Load.getSong(1).rewindOff()});

    var button_play1 = document.getElementById('start1');
    button_play1.addEventListener('click',function(){Load.getSong(1).play()});

    var button_pause1 = document.getElementById('pause1');
    button_pause1.addEventListener('click',function(){Load.getSong(1).pause()});

    var button_stop1 = document.getElementById('stop1');
    button_stop1.addEventListener('click',function(){Load.getSong(1).stop();});

    var button_forward1 = document.getElementById('forward1');
    button_forward1.addEventListener('mousedown', function(){Load.getSong(1).forwardOn();});
    button_forward1.addEventListener('mouseup', function(){Load.getSong(1).forwardOff();});

    var slider_volume1 = document.getElementById('volumeIn1');
    slider_volume1.addEventListener('input',function(){Load.getSong(1).setVolume((slider_volume1.value)/100)});

    var slider_speed1 = document.getElementById('speedIn1');
    slider_speed1.addEventListener('input', function(){Load.getSong(1).setSpeed(slider_speed1.value)});

    var slider_forwardspeed1 = document.getElementById('forwardspeedIn1');
    slider_forwardspeed1.addEventListener('input', function(){Load.getSong(1).setForwardSpeed(slider_forwardspeed1.value)});

    var slider_lowpass1 = document.getElementById('lowpassIn1');
    slider_lowpass1.addEventListener('input', function(){Load.getSong(1).setLowpassFreq(slider_lowpass1.value)});

    var slider_bass1 = document.getElementById('bassIn1');
    slider_bass1.addEventListener('input', function(){Load.getSong(1).setBassGain((slider_bass1.value)/10)});

    var slider_bassfreq1 = document.getElementById('bassfreqIn1');
    slider_bassfreq1.addEventListener('input', function(){Load.getSong(1).setBassFreq(slider_bassfreq1.value)});

    var slider_mids1 = document.getElementById('midsIn1');
    slider_mids1.addEventListener('input', function(){Load.getSong(1).setMidsGain((slider_mids1.value)/10)});

    var slider_midsfreq1 = document.getElementById('midsfreqIn1');
    slider_midsfreq1.addEventListener('input', function(){Load.getSong(1).setMidsFreq(slider_midsfreq1.value)});




    var button_file2 = document.getElementById('file2');
    button_file2.addEventListener('change', function(){Load.getSong(2).stop(); Load.loadAudio(this.files, 2)});

    var button_rewind2 = document.getElementById('rewind2');
    button_rewind2.addEventListener('mousedown', function(){Load.getSong(2).rewindOn()});
    button_rewind2.addEventListener('mouseup', function(){Load.getSong(2).rewindOff()});

    var button_play2 = document.getElementById('start2');
    button_play2.addEventListener('click',function(){Load.getSong(2).play()});

    var button_pause2 = document.getElementById('pause2');
    button_pause2.addEventListener('click',function(){Load.getSong(2).pause()});

    var button_stop2 = document.getElementById('stop2');
    button_stop2.addEventListener('click',function(){Load.getSong(2).stop()});

    var button_forward2 = document.getElementById('forward2');
    button_forward2.addEventListener('mousedown', function(){Load.getSong(2).forwardOn()});
    button_forward2.addEventListener('mouseup', function(){Load.getSong(2).forwardOff()});

    var slider_volume2 = document.getElementById('volumeIn2');
    slider_volume2.addEventListener('input',function(){Load.getSong(2).setVolume((slider_volume2.value)/100)});

    var slider_speed2 = document.getElementById('speedIn2');
    slider_speed2.addEventListener('input', function(){Load.getSong(2).setSpeed(slider_speed2.value)});

    var slider_forwardspeed2 = document.getElementById('forwardspeedIn2');
    slider_forwardspeed2.addEventListener('input', function(){Load.getSong(2).setForwardSpeed(slider_forwardspeed.value)});

    var slider_lowpass2 = document.getElementById('lowpassIn2');
    slider_lowpass2.addEventListener('input', function(){Load.getSong(2).setLowpassFreq(slider_lowpass2.value)});

    var slider_bass2 = document.getElementById('bassIn2');
    slider_bass2.addEventListener('input', function(){Load.getSong(2).setBassGain((slider_bass2.value)/10)});

    var slider_bassfreq2 = document.getElementById('bassfreqIn2');
    slider_bassfreq2.addEventListener('input', function(){Load.getSong(2).setBassFreq(slider_bassfreq2.value)});

    var slider_mids2 = document.getElementById('midsIn2');
    slider_mids2.addEventListener('input', function(){Load.getSong(2).setMidsGain((slider_mids2.value)/10)});

    var slider_midsfreq2 = document.getElementById('midsfreqIn2');
    slider_midsfreq2.addEventListener('input', function(){Load.getSong(2).setMidsFreq(slider_midsfreq2.value)});




    var crossfader = document.getElementById('crossfader');
    crossfader.addEventListener('input', function(){
        Load.getSong(1).setVolume((100 - crossfader.value) / 100);
        Load.getSong(2).setVolume((0 + crossfader.value)/100 );
    });

    //console.log(slider_bass.value);
    console.log("laedt");

}

window.addEventListener('load',init);


