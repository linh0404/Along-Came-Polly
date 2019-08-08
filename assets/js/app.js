// scroll into view function
$(".spotify_results").click(function(){
  var offset = $(this).offset();
  offset.left -= 20;
  offset.top -= 20;
  $('html,body').animate({
    scrollTop: offset.top,
    scrollLeft: offset.left
  });
});
