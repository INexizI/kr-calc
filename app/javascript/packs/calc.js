(function() {
  $(document).on("turbolinks:load", function() {
    $('select#calc_char_id').change(function() {
      $selectedHero = $(this).children('option:selected').val();
      $('.char').text($selectedHero);
    }).change();
    $('select#calc_role_id').change(function() {
      $selectedRole = $(this).children('option:selected').val();
      $('.role').text($selectedRole);
    }).change();
    $('select#calc_gear_weapon').change(function() {
      $selectedW = $(this).children('option:selected').val();
      $('.weapon').text($selectedW);
    }).change();
    $('select#calc_gear_treasure').change(function() {
      $selectedT = $(this).children('option:selected').val();
      $('.treasure').text($selectedT);
    }).change();

    // Class -> Hero
    $chars = $('#calc_char_id').html();
    $('#calc_role_id').change(function() {
      $('#heroAtk').empty();
      // Hero stuff
      $('#calc_char_id').parent().hide();
      $('.class-stats').children().hide();
      // Gear stuff
      $('#calc_gear_weapon').parent().hide();
      $('#calc_gear_treasure').parent().hide();
      $('.hero-gear').children().hide();
      $role = $('#calc_role_id :selected').text();
      $escaped_role = $role.replace(/([ #;&,.+*~\':"!^$[\]()=>|\/@])/g, '\\$1');
      $options = $($chars).filter("optgroup[label='" + $escaped_role + "']").html();
      if ($options) {
        $('#calc_char_id').html($options);
        $('.class-stats').children().show();
        return $('#calc_char_id').parent().show();
      } else {
        $('#calc_char_id').empty();
        return $('#calc_char_id').parent().hide();
      }
    });

    // Hero -> Weapon
    $('#calc_char_id').change(function() {
      $('#heroAtk').empty();
      $('.hero-gear').children().show();
      $('#calc_gear_weapon').parent().show();
      $('#calc_gear_treasure').parent().show();
      $('#calc_gear_weapon').val([]);
      $('#calc_gear_treasure').val([]);
      $('.hero-gear').children().hide();
    });

    // Hero stats
    $('select#calc_role_id').change(function() {
      $('.class-stats').children().hide();
      $stat = $(this).children('option:selected').val();
      $statVal = $('.class-stats').children().attr('class');
      $('.class-stats').find('.role' + $stat).toggle();
    }).change();

    // Class / Unique Weapon
    $('select#calc_gear_weapon').change(function() {
      $('#heroAtk').empty();
      $('.hero-gear').children().hide();
      $('.v').hide();
      $cVal = $('.char').text();
      $rVal = $('.role').text();
      $wVal = $('.weapon').text();
      if ($wVal == 'Class') {
        $('.hero-gear').find('.role' + $rVal).toggle();
      } else if ($wVal == 'Unique') {
        $qwe = $('.char' + $cVal).toggle();
        $($qwe).find('.ut').hide();
        $($qwe).find('.mana').hide();
      }
    }).change();

    // Treasure
    $('select#calc_gear_treasure').change(function() {
      $('#heroAtk').empty();
      $('.hero-gear').children().hide();
      $('.v').hide();
      $cVal = $('.char').text();
      $rVal = $('.role').text();
      $wVal = $('.weapon').text();
      $tVal = $('.treasure').text();
      if ($wVal == 'Class') {
        if ($tVal == 'Mana Stone') {
          $('.hero-gear').find('.role' + $rVal).toggle();
          $qwe = $('.char' + $cVal).toggle();
          $($qwe).find('.uw').hide();
          $($qwe).find('.ut').hide();
          $($qwe).find('.mana').show();
        } else if ($tVal == 'Unique') {
          $('.hero-gear').find('.role' + $rVal).toggle();
          $qwe = $('.char' + $cVal).toggle();
          $($qwe).find('.uw').hide();
          $($qwe).find('.ut').show();
          $($qwe).find('.mana').hide();
        } else if ($tVal == '') {
          $('.hero-gear').find('.role' + $rVal).toggle();
          $qwe = $('.char' + $cVal).toggle();
          $($qwe).find('.uw').hide();
          $($qwe).find('.ut').hide();
          $($qwe).find('.mana').hide();
        }
      } else if ($wVal == 'Unique') {
        if ($tVal == 'Mana Stone') {
          $qwe = $('.char' + $cVal).toggle();
          $($qwe).find('.mana').show();
          $($qwe).find('.ut').hide();
        } else if ($tVal == 'Unique') {
          $qwe = $('.char' + $cVal).toggle();
          $($qwe).find('.ut').show();
          $($qwe).find('.mana').hide();
        } else if ($tVal == '') {
          $qwe = $('.char' + $cVal).toggle();
          $($qwe).find('.ut').hide();
          $($qwe).find('.mana').hide();
        }
      }
    }).change();

    // Weapon ATK
    $('button').click(function() {
      $cVal = $('.char').text();
      $rVal = $('.role').text();
      $wVal = $('.weapon').text();
      $btnId = $(this).attr('class');
      if ($wVal == 'Class') {
        $rBtn = $('.hero-gear').find('.role' + $rVal);
        $btnFind = $($rBtn).find('#' + $btnId);
      } else if ($wVal == 'Unique') {
        $cBtn = $('.char' + $cVal).find('.uw');
        $btnFind = $($cBtn).find('#' + $btnId);
      }
      $classAtk = parseInt($('.role' + $rVal).find('p:contains("ATK")').next('p').text());
      $gearAtk = parseInt($($btnFind).text());
      $sumAtk = $classAtk + $gearAtk;
      $('#heroAtk').text('ATK - ' + $sumAtk);
    }).change();
  });
}).call(this);
