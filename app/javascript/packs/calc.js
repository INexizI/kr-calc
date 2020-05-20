(function() {
  $(document).on("turbolinks:load", function() {
    $('#char_name').change(function () {
      var str = '';
      $('#char_name option:selected').each(function() {
        str += $(this).text() + ' ';
      });
      $('.calc-stat').text(str);
    }).change();
  });
}).call(this);
