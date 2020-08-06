(function() {
  $(document).on("turbolinks:load", function() {
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
    $gearWeaponSlot = null;
    $('select#calc_gear_weapon').change(function() {
      $('#heroAtk').empty();
      $('.hero-gear').children().hide();
      $('#calc_gear_treasure').val([]);
      $gearWeaponType = $(this).children('option:selected').val();
      if ($gearWeaponType == 'Class') {
        $gearWeaponSlot = $('#calc_role_id').children('option:selected').val();
        $('.hero-gear').find('.role' + $gearWeaponSlot).toggle();
      } else if ($gearWeaponType == 'Unique') {
        $gearWeaponSlot = $('#calc_char_id').children('option:selected').val();
        $('.hero-gear').find('.char' + $gearWeaponSlot).toggle();
      }
      $('.hero-gear').find('.uw').show();
      $('.hero-gear').find('.ut').hide();
      $('.hero-gear').find('.mana').hide();
    }).change();

    // Treasure
    $('select#calc_gear_treasure').change(function() {
      $('#heroAtk').empty();
      $('.hero-gear').children().hide();
      $gearWeaponType = $('#calc_gear_weapon').children('option:selected').val();
      $gearTreasureType = $(this).children('option:selected').val();
      $gearHero = $('#calc_char_id').children('option:selected').val();
      $gearClass = $('#calc_role_id').children('option:selected').val();
      if ($gearWeaponType == 'Class') {
        if ($gearTreasureType == 'Mana Stone') {
          $('.hero-gear').find('.role' + $gearClass).toggle();
          $sh = $('.char' + $gearHero).toggle();
          $($sh).find('.uw').hide();
          $($sh).find('.ut').hide();
          $($sh).find('.mana').show();
        } else if ($gearTreasureType == 'Unique') {
          $('.hero-gear').find('.role' + $gearClass).toggle();
          $sh = $('.char' + $gearHero).toggle();
          $($sh).find('.uw').hide();
          $($sh).find('.ut').show();
          $($sh).find('.mana').hide();
        } else if ($gearTreasureType == '') {
          $('.hero-gear').find('.role' + $gearClass).toggle();
          $sh = $('.char' + $gearHero).toggle();
          $($sh).find('.uw').hide();
          $($sh).find('.ut').hide();
          $($sh).find('.mana').hide();
        }
      } else if ($gearWeaponType == 'Unique') {
        if ($gearTreasureType == 'Mana Stone') {
          $sh = $('.char' + $gearHero).toggle();
          $($sh).find('.uw').show();
          $($sh).find('.mana').show();
          $($sh).find('.ut').hide();
        } else if ($gearTreasureType == 'Unique') {
          $sh = $('.char' + $gearHero).toggle();
          $($sh).find('.uw').show();
          $($sh).find('.ut').show();
          $($sh).find('.mana').hide();
        } else if ($gearTreasureType == '') {
          $sh = $('.char' + $gearHero).toggle();
          $($sh).find('.uw').show();
          $($sh).find('.ut').hide();
          $($sh).find('.mana').hide();
        }
      };
    }).change();

    // Armor
    $('select#calc_gear_armor').change(function() {
      $('.g-armor').children().hide();
      $gearClass = $('#calc_role_id').children('option:selected').val();
      $gearTier = $('#calc_gear_armor').children('option:selected').val();
      if ($gearTier == 'T6') {
        $('.g-armor .g-ar-t6').toggle();
        if ($gearClass == 1 || 2) {
          $('.g-ar-t6 #g-ar-l').hide();
          $('.g-ar-t6 #g-ar-i').hide();
        } else if ($gearClass == 3 || 4 || 5) {
          $('.g-ar-t6 #g-ar-h').hide();
          $('.g-ar-t6 #g-ar-i').hide();
        } else if ($gearClass == 6 || 7) {
          $('.g-ar-t6 #g-ar-h').hide();
          $('.g-ar-t6 #g-ar-l').hide();
        }
      } else if ($gearTier == 'T7') {
        $('.g-armor .g-ar-t7').toggle();
        if ($gearClass == 1 || 2) {
          $('.g-ar-t7 #g-ar-l').hide();
          $('.g-ar-t7 #g-ar-i').hide();
        } else if ($gearClass == 3 || 4 || 5) {
          $('.g-ar-t7 #g-ar-h').hide();
          $('.g-ar-t7 #g-ar-i').hide();
        } else if ($gearClass == 6 || 7) {
          $('.g-ar-t7 #g-ar-h').hide();
          $('.g-ar-t7 #g-ar-l').hide();
        }
      } else if ($gearTier == 'T8') {
        $('.g-armor .g-ar-t8').toggle();
        if ($gearClass == 1 || 2) {
          $('.g-ar-t8 #g-ar-l').hide();
          $('.g-ar-t8 #g-ar-i').hide();
        } else if ($gearClass == 3 || 4 || 5) {
          $('.g-ar-t8 #g-ar-h').hide();
          $('.g-ar-t8 #g-ar-i').hide();
        } else if ($gearClass == 6 || 7) {
          $('.g-ar-t8 #g-ar-h').hide();
          $('.g-ar-t8 #g-ar-l').hide();
        }
      }
    }).change();

    // Secondary
    $('select#calc_gear_secondary').change(function() {
      $('.g-secondary').children().hide();
      $gearClass = $('#calc_role_id').children('option:selected').val();
      $gearTier = $('#calc_gear_secondary').children('option:selected').val();
      if ($gearTier == 'T6') {
        $('.g-secondary .g-sg-t6').toggle();
        if ($gearClass == 1 || 2) {
          $('.g-sg-t6 #g-sg-l').hide();
          $('.g-sg-t6 #g-sg-i').hide();
        } else if ($gearClass == 3 || 4 || 5) {
          $('.g-sg-t6 #g-sg-h').hide();
          $('.g-sg-t6 #g-sg-i').hide();
        } else if ($gearClass == 6 || 7) {
          $('.g-sg-t6 #g-sg-h').hide();
          $('.g-sg-t6 #g-sg-l').hide();
        }
      } else if ($gearTier == 'T7') {
        $('.g-secondary .g-sg-t7').toggle();
        if ($gearClass == 1 || 2) {
          $('.g-sg-t7 #g-sg-l').hide();
          $('.g-sg-t7 #g-sg-i').hide();
        } else if ($gearClass == 3 || 4 || 5) {
          $('.g-sg-t7 #g-sg-h').hide();
          $('.g-sg-t7 #g-sg-i').hide();
        } else if ($gearClass == 6 || 7) {
          $('.g-sg-t7 #g-sg-h').hide();
          $('.g-sg-t7 #g-sg-l').hide();
        }
      } else if ($gearTier == 'T8') {
        $('.g-secondary .g-sg-t8').toggle();
        if ($gearClass == 1 || 2) {
          $('.g-sg-t8 #g-sg-l').hide();
          $('.g-sg-t8 #g-sg-i').hide();
        } else if ($gearClass == 3 || 4 || 5) {
          $('.g-sg-t8 #g-sg-h').hide();
          $('.g-sg-t8 #g-sg-i').hide();
        } else if ($gearClass == 6 || 7) {
          $('.g-sg-t8 #g-sg-h').hide();
          $('.g-sg-t8 #g-sg-l').hide();
        }
      }
    }).change();

    // Weapon ATK
    $('#uw label').click(function() {
      $gearHero = $('#calc_char_id').children('option:selected').val();
      $gearClass = $('#calc_role_id').children('option:selected').val();
      $gearWeaponType = $('#calc_gear_weapon').children('option:selected').val();
      $btnId = $(this).attr('class').split(' ')[0];

      if ($gearWeaponType == 'Class') {
        $rBtn = $('.hero-gear').find('.role' + $gearClass);
        $btnFind = $($rBtn).find('#' + $btnId);
        $p0 = $($rBtn).find('#p0').text();
      } else if ($gearWeaponType == 'Unique') {
        $cBtn = $('.char' + $gearHero).find('.uw');
        $btnFind = $($cBtn).find('#' + $btnId);
        $p0 = $($cBtn).find('#p0').text();
      }
      $classStat = parseInt($('.role' + $gearClass).find('p:contains("ATK")').next('p').text());
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
      $gearHero = $('#calc_char_id').children('option:selected').val();
      $gearClass = $('#calc_role_id').children('option:selected').val();
      $gearTreasureType = $('#calc_gear_treasure').children('option:selected').val();
      $btnId = $(this).attr('class').split(' ')[0];
      $gearId = $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().attr('id');

      if ($gearTreasureType == 'Mana Stone') {
        $cBtn = $('.char' + $gearHero).find('.mana');
        $btnFind = $('#' + $gearId).find('#' + $btnId);
        $p1 = $($cBtn).find('#p1').first().text();
      } else if ($gearTreasureType == 'Unique') {
        $cBtn = $('.char' + $gearHero).find('.ut');
        $btnFind = $('#' + $gearId).find('#' + $btnId);
        $p1 = $($cBtn).find('#p1').first().text();
      }
      $classStat = parseInt($('.role' + $gearClass).find('p:contains("MAX HP")').next('p').text());
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
