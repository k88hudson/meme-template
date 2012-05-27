// PLUGIN: LOOP

(function ( Popcorn, global ) {

  Popcorn.plugin( "looper", {
    manifest: {
      about: {
        name: "Popcorn Loop Plugin",
        version: "0.1",
        author: "Kate Hudson, @k88hudson",
        website: "github.com/k88hudson"
      },
      options: {
        disable: {
          elem: "input",
          type: "checkbox",
          label: "Disable?"
        },
        mute: {
          elem: "input",
          type: "checkbox",
          label: "Mute? "
        },
        start: {
          elem: "input",
          type: "number",
          label: "Start"
        },
        end: {
          elem: "input",
          type: "number",
          label: "End"
        },
      }
    },
    _setup: function( options ) {
      if( options.mute === "on" ) {
        this.mute();
      }
      options._theLoop = function(){
        var time = this.currentTime();
        if(time < options.start - .25 || time > options.end) {
          this.currentTime( options.start );
        }
      };

      if( options.disable === "off" ) {
        this.off("timeupdate", options._theLoop);
      } else {
        this.on("timeupdate", options._theLoop);
      }
    },
    start: function( event, options ) {
    },
    end: function( event, options ) {
   //
    },
    _teardown: function( options ) {
      this.off("timeupdate", options._theLoop);
       if( options.mute === "on" ) {
        this.unmute();
      }
    }
  });
})( Popcorn, this );