(function() {
  $(document).on("turbolinks:load", function() {
    $('.g-title').click(function() {
      var cssVal = {
        'display':'flex',
        'flex-wrap':'wrap'
      }
      $(this).next('.g-main').fadeToggle('fast').css(cssVal);
    });
  });
}).call(this);
