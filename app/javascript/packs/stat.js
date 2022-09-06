(function() {
  $(document).on("turbolinks:load", function() {
    $('.h-title').click(function() {
      $('.h-main .r-stat').find('p').each(function() {
        if ($(this).text() === '0')
          $(this).hide().prev('p').hide();
      });
    });
  });
}).call(this);
