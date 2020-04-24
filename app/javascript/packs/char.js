(function() {
  $(document).on("turbolinks:load", function() {
    $('.h-title').click(function() {
      var cssVal = {
        'display':'flex',
        'flex-wrap':'wrap'
      }
      $(this).next('.h-main').fadeToggle('fast').css(cssVal);
    });
  });
}).call(this);
