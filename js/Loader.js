/**
 * Created by Sophia on 09.12.2014.
 */

function Loader(){
    if (window.File && window.FileReader && window.FileList && window.Blob){
        var that = this;
        that.Song1 = new Player("Musik/doinitright.mp3", "doinitright.mp3");
        that.Song2 = new Player("Musik/bumaye.mp3", "bumaye.mp3");
    }
    else{
        alert('Leider unterstützt der Browser File API nicht.');
    }
}

Loader.prototype.loadAudio = function(files, i){

    var file = files[0];
    if (file.type.match(/audio.*/)) {
        var src = URL.createObjectURL(file);
        var songname = file.name;
        if (i == 1) {
            this.Song1 = new Player(src, songname);
        }
        if (i == 2) {
            this.Song2 = new Player(src, songname);
        }
    }
    else{
        alert('Bitte waehlen Sie eine Audiodatei aus!');
    }
};

Loader.prototype.getSong = function(i){

    if (i == 1) {
        return this.Song1;
    }
    if (i == 2) {
        return this.Song2;
    }
};
