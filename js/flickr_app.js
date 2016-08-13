$(document).ready(function() {
  
 var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";


 $('form').submit(function (evt) {
    var $submitButton = $('#submit');
    var $searchPictureField = $('#search');
    evt.preventDefault();
    $searchPictureField.prop("disabled",true);
    $submitButton.attr("disabled", true).val("searching....");
    var searchTerm = $searchPictureField.val();
    $('#pictures').html('');
    $.getJSON(flickerAPI, {
        tags: searchTerm,
        format: "json"
      },
    function(data){
      var pictureHTML = '';
      if (data.items.length > 0) {
        $.each(data.items,function(i,photo) {
          pictureHTML += '<li class="grid-25 tablet-grid-50">';
          pictureHTML += '<a href="' + photo.link + '" class="image">';
          pictureHTML += '<img src="' + photo.media.m + '"></a></li>';
        }); // end each
      } else {
        pictureHTML = "<p>No photos found that match: " + searchTerm + ".</p>"
      }
      $('#pictures').html(pictureHTML);
      $searchPictureField.prop("disabled", false);
      $submitButton.attr("disabled", false).val("Search");
    }); // end getJSON

  }); // end click

}); // end ready