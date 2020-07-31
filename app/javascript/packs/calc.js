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
      $('#calc_gear_armor').parent().show();
      $('#calc_gear_secondary').parent().show();
      $('#calc_gear_weapon').val([]);
      $('#calc_gear_treasure').val([]);
      $('#calc_gear_armor').val([]);
      $('#calc_gear_secondary').val([]);
      $('.hero-gear').children().hide();
    });

    // Hero stats
    $('select#calc_role_id').change(function() {
      $('.r-stats').children().hide();
      $stat = $(this).children('option:selected').val();
      $statVal = $('.r-stats').children().attr('class');
      $('.r-stats').find('.role' + $stat).toggle();
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

    // Armor
    $('select#calc_gear_armor').change(function() {
      $('.g-armor').children().hide();
      $rVal = $('.role').text();
      $arVal = $('#calc_gear_armor').children('option:selected').val();
      if ($arVal == 'T6') {
        $('.g-armor .g-ar-t6').toggle();
        if ($rVal == 1 || 2) {
          $('.g-ar-t6 #g-ar-l').hide();
          $('.g-ar-t6 #g-ar-i').hide();
        } else if ($rVal == 3 || 4 || 5) {
          $('.g-ar-t6 #g-ar-h').hide();
          $('.g-ar-t6 #g-ar-i').hide();
        } else if ($rVal == 6 || 7) {
          $('.g-ar-t6 #g-ar-h').hide();
          $('.g-ar-t6 #g-ar-l').hide();
        }
      } else if ($arVal == 'T7') {
        $('.g-armor .g-ar-t7').toggle();
        if ($rVal == 1 || 2) {
          $('.g-ar-t7 #g-ar-l').hide();
          $('.g-ar-t7 #g-ar-i').hide();
        } else if ($rVal == 3 || 4 || 5) {
          $('.g-ar-t7 #g-ar-h').hide();
          $('.g-ar-t7 #g-ar-i').hide();
        } else if ($rVal == 6 || 7) {
          $('.g-ar-t7 #g-ar-h').hide();
          $('.g-ar-t7 #g-ar-l').hide();
        }
      } else if ($arVal == 'T8') {
        $('.g-armor .g-ar-t8').toggle();
        if ($rVal == 1 || 2) {
          $('.g-ar-t8 #g-ar-l').hide();
          $('.g-ar-t8 #g-ar-i').hide();
        } else if ($rVal == 3 || 4 || 5) {
          $('.g-ar-t8 #g-ar-h').hide();
          $('.g-ar-t8 #g-ar-i').hide();
        } else if ($rVal == 6 || 7) {
          $('.g-ar-t8 #g-ar-h').hide();
          $('.g-ar-t8 #g-ar-l').hide();
        }
      }
    }).change();
    // Secondary
    $('select#calc_gear_secondary').change(function() {
      $('.g-secondary').children().hide();
      $rVal = $('.role').text();
      $arVal = $('#calc_gear_secondary').children('option:selected').val();
      if ($arVal == 'T6') {
        $('.g-secondary .g-sg-t6').toggle();
        if ($rVal == 1 || 2) {
          $('.g-sg-t6 #g-sg-l').hide();
          $('.g-sg-t6 #g-sg-i').hide();
        } else if ($rVal == 3 || 4 || 5) {
          $('.g-sg-t6 #g-sg-h').hide();
          $('.g-sg-t6 #g-sg-i').hide();
        } else if ($rVal == 6 || 7) {
          $('.g-sg-t6 #g-sg-h').hide();
          $('.g-sg-t6 #g-sg-l').hide();
        }
      } else if ($arVal == 'T7') {
        $('.g-secondary .g-sg-t7').toggle();
        if ($rVal == 1 || 2) {
          $('.g-sg-t7 #g-sg-l').hide();
          $('.g-sg-t7 #g-sg-i').hide();
        } else if ($rVal == 3 || 4 || 5) {
          $('.g-sg-t7 #g-sg-h').hide();
          $('.g-sg-t7 #g-sg-i').hide();
        } else if ($rVal == 6 || 7) {
          $('.g-sg-t7 #g-sg-h').hide();
          $('.g-sg-t7 #g-sg-l').hide();
        }
      } else if ($arVal == 'T8') {
        $('.g-secondary .g-sg-t8').toggle();
        if ($rVal == 1 || 2) {
          $('.g-sg-t8 #g-sg-l').hide();
          $('.g-sg-t8 #g-sg-i').hide();
        } else if ($rVal == 3 || 4 || 5) {
          $('.g-sg-t8 #g-sg-h').hide();
          $('.g-sg-t8 #g-sg-i').hide();
        } else if ($rVal == 6 || 7) {
          $('.g-sg-t8 #g-sg-h').hide();
          $('.g-sg-t8 #g-sg-l').hide();
        }
      }
    }).change();

    // Weapon ATK
    $('#uw label').click(function() {
      $cVal = $('.char').text();
      $rVal = $('.role').text();
      $wVal = $('.weapon').text();
      $tVal = $('.treasure').text();
      $btnId = $(this).attr('class').split(' ')[0];

      if ($wVal == 'Class') {
        $rBtn = $('.hero-gear').find('.role' + $rVal);
        $btnFind = $($rBtn).find('#' + $btnId);
        $p0 = $($rBtn).find('#p0').text();
      } else if ($wVal == 'Unique') {
        $cBtn = $('.char' + $cVal).find('.uw');
        $btnFind = $($cBtn).find('#' + $btnId);
        $p0 = $($cBtn).find('#p0').text();
      }
      $classStat = parseInt($('.role' + $rVal).find('p:contains("ATK")').next('p').text());
      $gearStat = parseInt($($btnFind).text());
      $sumStat = $classStat + $gearStat;
      $('#heroATK').text($p0 + ' - ' + $sumStat);
      // alert('btnId = ' + $btnId);
      console.log('W btnId = ' + $btnId);
      // alert('p0 = ' + $p0);
      console.log('W p0 = ' + $p0);
      // alert('btnFind = ' + $btnFind);
      console.log('W btnFind = ' + $btnFind);
      // alert('classStat = ' + $classStat);
      console.log('W classStat = ' + $classStat);
      // alert('gearStat = ' + $gearStat);
      console.log('W gearStat = ' + $gearStat);
    }).change();

    $('#ut label').click(function() {
      if ($tVal == 'Mana Stone') {
        $cBtn = $('.char' + $cVal).find('.mana');
        $btnFind = $($cBtn).find('#' + $btnId);
        $p1 = $($cBtn).find('#p1').first().text();
      } else if ($tVal == 'Unique') {
        $cBtn = $('.char' + $cVal).find('.ut');
        $btnFind = $($cBtn).find('#' + $btnId);
        $p1 = $($cBtn).find('#p1').first().text();
      }
      $classStat = parseInt($('.role' + $rVal).find('p:contains("MAX HP")').next('p').text());
      $gearStat = parseInt($($btnFind).text());
      $sumStat = $classStat + $gearStat;
      $('#heroHP').text($p1 + ' - ' + $sumStat);
      // alert('btnId = ' + $btnId);
      console.log('T btnId = ' + $btnId);
      // alert('p1 = ' + $p1);
      console.log('T p1 = ' + $p1);
      // alert('btnFind = ' + $btnFind);
      console.log('T btnFind = ' + $btnFind);
      // alert('classStat = ' + $classStat);
      console.log('T classStat = ' + $classStat);
      // alert('gearStat =' + $gearStat);
      console.log('T gearStat = ' + $gearStat);
    }).change();
  });
}).call(this);
