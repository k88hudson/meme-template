document.addEventListener("DOMContentLoaded", function(){

  //Add button and template holder
  $("#video-container").prepend('<button id="mediabrowserbtn" class="icon-archive" data-butter-exclude></button>');
  $("body").append('<div id="mediabrowser" data-butter-exclude></div>');

  $("#mediabrowser").load("includes/archive-browser.html", function(data){

    $("#mediabrowserbtn").click(function(){ $("#mediabrowser").show(); });
    $("#search-btn").click(function(){
    //TEMPLATE PARTS
      var url='http://archive.org/details/tv?output=json&callback=mainTemplate&pop=1&rows=9&q='+$('#search-field').val();
      $("#searchresults").addClass("active");

      $.getScript(url, function(data){
        $(".video-description").each(function(i, item){
          var txt = $(item).html().replace(/\&lt;/g, '<').replace(/\&gt;/g, '>');
          $(item).html( txt );
        });
      });
    });

    $("#top-bar .close-me").click(function(e){
      e.preventDefault();
      $("#mediabrowser").hide();
    });

  }); //ajax

}, false);

function mainTemplate( data ) {
  createTemplate( "searchresults-template", data, "searchresults" );
  $("#searchresults").addClass("active");

  //Show details
  $(".show-details").click(function(e){
    e.preventDefault();
    var videoID = $(this).attr("href"),
      videoData;
    var idx=videoID.match(/\-(\d+)$/);
    idx=idx[1];
    videoData = data.data[idx];
    createTemplate( "details-template", videoData, "details" );
    $(".video-description").each(function(i, item){
      var txt = $(item).html().replace(/\&lt;/g, '<').replace(/\&gt;/g, '>');
      $(item).html( txt );
    });
    $( "#searchresults" ).removeClass("active");
    $( "#details" ).addClass("active"); 

    //Close me buttons
    $( "#details .close-me" ).click(function(e){
      e.preventDefault();
      $( "#details" ).removeClass("active");
      $( "#searchresults" ).addClass("active");
    });

    $(".btn-filetypes").click(function(){
      butter.media[0].url = $(this).attr("href");
      $("#mediabrowser").hide();
    });

  });
}

function createTemplate( templateID, data, targetID ) {
  var template = document.getElementById(templateID).innerHTML.replace(/%7B%7B/g, '{{').replace(/%7D%7D/g, '}}'),
    html = Mustache.render(template, data);
  document.getElementById(targetID).innerHTML = html;
}
