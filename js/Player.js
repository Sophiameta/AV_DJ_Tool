function Player(source,songname){

    var that = this;
    that.audioContext = new AudioContext();
    that.isPlaying = false;
    that.source = source;
    that.buffer = null;
    that.isLoaded = false;
    that.timeplayed = 0.0;
    that.starttime = 0;
    that.startOffset = 0;
    that.time = 0;
    that.forwardSpeed = 2;

    //GainNode
    that.volume = that.audioContext.createGain();

    //SPEED
    that.playbackSpeed = 1;
    //LowpassNode
    that.lowpass = that.audioContext.createBiquadFilter();
    that.lowpass.type = "lowpass";

    //THE 2-BAND EQUALIZER---------------------------------
    that.bass = that.audioContext.createBiquadFilter();
    that.bass.type = "lowshelf";
    that.midandtreble = that.audioContext.createBiquadFilter();
    that.midandtreble.type = "peaking";

    var getSound = new XMLHttpRequest();
    getSound.open("GET", that.source,true);
    getSound.responseType = "arraybuffer";
    getSound.onload = function() {
        that.audioContext.decodeAudioData(getSound.response,function(buffer){
            that.buffer = buffer;
            that.duration = buffer.duration;
            if(that.isLoaded = true) {
               // alert(songname + " wurde geladen.");
               console.log(songname + "("+ that.duration + ") wurde geladen.");
            }
        })
    };
    that.playSound = that.audioContext.createBufferSource();
    getSound.send();
}

Player.prototype.setIsPlaying = function(bool) {
    if (!this.isPlaying && bool && !this.ended){
        this.isPlaying = bool;
    }
    else{
        this.isPlaying = false;
    }
};

//PLAY & Audio Graph Connections
Player.prototype.play = function() {

    if (this.isLoaded) {
        if(!this.isPlaying){
            this.playSound = this.audioContext.createBufferSource();
            this.playSound.buffer = this.buffer;
            //Connecting the Nodes
            this.playSound.playbackRate.value = this.playbackSpeed;
            this.playSound.connect(this.lowpass);
            this.lowpass.connect(this.bass);
            this.bass.connect(this.midandtreble);
            this.midandtreble.connect(this.volume);
            this.volume.connect(this.audioContext.destination);
            this.playSound.start(0,this.startOffset );
            this.setIsPlaying(true);
            this.starttime = this.audioContext.currentTime;
            console.log("Start bei: " + this.startOffset);
        }
        else{
           // alert("Der Song spielt bereits.");
            console.log("Der Song spielt bereits.");

        }
    }
    else {
       // alert("Warten Sie bitte bis die Datei geladen wurde.");
        console.log("Warten Sie bitte bis die Datei geladen wurde.");
    }
};

//STOP
Player.prototype.stop = function(){
    if(this.isPlaying){
        this.playSound.stop(0);
        this.setIsPlaying(false);
        this.startOffset = 0;
    }
    else{
        //alert("Der Song spielt noch nicht.");
        console.log("Der Song spielt noch nicht.");
    }
};
//PAUSE
Player.prototype.pause = function(){
    if(this.isPlaying){
        this.playSound.stop(0);
        this.setIsPlaying(false);
        this.startOffset += this.audioContext.currentTime - this.starttime;
        console.log("Pause bei: " + this.startOffset);
    }
    else{
        //alert("Der Song spielt noch nicht.");
        console.log("Der Song spielt noch nicht.");
    }
};

Player.prototype.forwardOn = function(){
    if(this.isPlaying){
        /*this.playbackSpeed = this.playSound.playbackRate.value;
        this.playSound.playbackRate.value = 4;*/
        this.playSound.stop(0);
        this.setIsPlaying(false);
        this.startOffset += this.audioContext.currentTime - this.starttime;
        console.log("Pausenzeit:"+this.startOffset);
        var currentdate = new Date();
        this.time = currentdate.getSeconds();
        console.log("Anfangszeit:"+this.time);

    }
    else{
        //alert("Der Song spielt noch nicht.");
        console.log("Der Song spielt noch nicht.");
    }
};

Player.prototype.forwardOff = function(){
    //this.playSound.playbackRate.value = this.playbackSpeed;
    var currentdate = new Date();
    var seconds = currentdate.getSeconds();
    if (seconds < this.time){
        seconds += 60;
    }
    console.log("Endzeit:"+seconds);
    console.log("Spulgeschwindigkeit:" + this.forwardSpeed);
    console.log ("zu addierende Zeit:"+(seconds - this.time)*this.forwardSpeed);
    this.startOffset += (seconds - this.time)*this.forwardSpeed;
    if (this.startOffset > this.duration){
        this.startOffset = 0;
        console.log("Der Song ist zu Ende.");
    }
    else{
        this.time = 0;
        this.play();
    }
};

Player.prototype.rewindOn = function(){
    if(this.isPlaying){
        /*this.playbackSpeed = this.playSound.playbackRate.value;
         this.playSound.playbackRate.value = 4;*/
        this.playSound.stop(0);
        this.setIsPlaying(false);
        this.startOffset += this.audioContext.currentTime - this.starttime;
        console.log("Pausenzeit:"+this.startOffset);
        var currentdate = new Date();
        this.time = currentdate.getSeconds();
        console.log("Anfangszeit:"+this.time);

    }
    else{
        //alert("Der Song spielt noch nicht.");
        console.log("Der Song spielt noch nicht.");
    }
};

Player.prototype.rewindOff = function(){
    //this.playSound.playbackRate.value = this.playbackSpeed;
    var currentdate = new Date();
    var seconds = currentdate.getSeconds();
    if (seconds < this.time){
        seconds += 60;
    }
    console.log("Spulgeschwindigkeit:" + this.forwardSpeed);
    console.log("Endzeit:"+seconds);
    console.log ("zu subtrahierende Zeit:"+(seconds - this.time)*this.forwardSpeed);
    this.startOffset -= (seconds - this.time)*this.forwardSpeed;
    if (this.startOffset < 0){
        this.startOffset = 0;
    }
    this.time = 0;
    this.play();
};

//SET VOLUME
Player.prototype.setVolume = function(level) {
    this.volume.gain.value = level;

};

//SET LOWPASS FREQUENCY
Player.prototype.setLowpassFreq = function(freq) {
    this.lowpass.frequency.value = 20000;
    this.lowpass.frequency.value = freq;
};


//SET BASS GAIN
Player.prototype.setBassGain = function(amount) {
    this.bass.gain.value = 0;
    this.bass.gain.value = amount;
};

//SET BASS FREQUENCY
Player.prototype.setBassFreq = function(amount){
    this.bass.frequency.value = 200;
    this.bass.frequency.value = amount;
};

//SET MIDS GAIN
Player.prototype.setMidsGain = function(amount) {
    this.midandtreble.gain.value = 0;
    this.midandtreble.gain.value = amount;
};


//SET MIDS FREQUENCY
Player.prototype.setMidsFreq = function(amount) {
    this.midandtreble.frequency.value = 1000;
    this.midandtreble.frequency.value = amount;
};

//SET PLAYBACK SPEED
Player.prototype.setSpeed = function(amount) {
    this.playSound.playbackRate.value = amount;
    this.playbackSpeed = amount;
};

//SET REWIND/FORWARD SPEED
Player.prototype.setForwardSpeed = function(amount) {
    this.forwardSpeed = amount;
};

Player.prototype.setLoop= function(bool) {
    this.playSound.loop = bool;
};

