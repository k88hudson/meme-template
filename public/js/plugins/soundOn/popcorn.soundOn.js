// PLUGIN: soundOn

(function ( Popcorn, global ) {

  Popcorn.plugin( "soundOn", {
    manifest: {
      about: {
        name: "Popcorn soundOn Plugin",
        version: "0.1",
        author: "Kate Hudson, @k88hudson",
        website: "github.com/k88hudson"
      },
      options: {
        start: {
          elem: "input",
          type: "number",
          label: "Start"
        },
        end: {
          elem: "input",
          type: "number",
          label: "End"
        }
      }
    },
    _setup: function( options ) {
      _popcorn = this;
      _popcorn.mute();
      var _status = "off";

      options._thesoundOn = function(){
        var time = _popcorn.currentTime();
        console.log(time);
        if(time > options.start && time < options.end) {
          if (_status === "off") { 
            _popcorn.unmute();
          }
          _status = "on";
        } else {
          if (_status === "on") { 
            _popcorn.mute();
          }
          _status = "off";
        }
      };

    this.media.addEventListener("timeupdate", options._thesoundOn, true);

    },
    start: function( event, options ) {
    },
    end: function( event, options ) {
   //
    },
    _teardown: function( options ) {
      this.media.removeEventListener("timeupdate", options._thesoundOn);
      this.unmute();
    }
  });
})( Popcorn, this );