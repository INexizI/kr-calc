(function() {
  $(document).on("turbolinks:load", function() {
    $('select#char_name').change(function () {
      var selectedHero = $(this).children('option:selected').val();
      $('.char-id').text(selectedHero);
    }).change();
    $('select#role_name').change(function () {
      var selectedRole = $(this).children('option:selected').val();
      $('.role-id').text(selectedRole);
    }).change();

    (function() {
      var states;
      $('#calc_char_id').parent().hide();
      states = $('#calc_char_id').html();
      $('#calc_role_id').change(function() {
        var country, escaped_country, options;
        country = $('#calc_role_id :selected').text();
        escaped_country = country.replace(/([ #;&,.+*~\':"!^$[\]()=>|\/@])/g, '\\$1');
        options = $(states).filter("optgroup[label='" + escaped_country + "']").html();
        if (options) {
          $('#calc_char_id').html(options);
          return $('#calc_char_id').parent().show();
        } else {
          $('#calc_char_id').empty();
          return $('#calc_char_id').parent().hide();
        }
      });
    }).call(this);
  });
}).call(this);
