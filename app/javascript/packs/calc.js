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
      $('#calc_gear_armor').parent().hide(),
      $('#calc_gear_secondary').parent().hide(),
      $('.hero-gear').children().hide();
      // Options
      $role = $('#calc_role_id :selected').text();
      $escaped_role = $role.replace(/([ #;&,.+*~\':"!^$[\]()=>|\/@])/g, '\\$1');
      $options = $($chars).filter("optgroup[label='" + $escaped_role + "']").html();
      if ($options) {
        $('#calc_char_id').html($options);
        $('.class-stats').children().show();
        return [
          $('#calc_char_id').parent().show(),
          $('#calc_gear_weapon').parent().show(),
          $('#calc_gear_treasure').parent().show(),
          $('#calc_gear_armor').parent().show(),
          $('#calc_gear_secondary').parent().show(),
          $('#calc_gear_armor').prop('selectedIndex', 0),
          $('#calc_gear_secondary').prop('selectedIndex', 0)
        ];
      } else {
        $('#calc_char_id').empty();
        // $('.g-armor').children().hide();
        // $('.g-secondary').children().hide();
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
      $('.hero-gear').find('.armor').hide();
      // $('.hero-gear').find('.secondary').hide();
    }).change();

    // Treasure
    $('select#calc_gear_treasure').change(function() {
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

    // Armor Tier
    $('select#calc_gear_armor').change(function() {
      $('.g-armor').children().hide();
      $('.armor').parent().hide();
      $('#calc_gear_armor_id').prop('selectedIndex', 0);
      $gearClass = $('#calc_role_id').children('option:selected').val();
      $gearTier = $(this).children('option:selected').val();
      $gearBlockClass = $('.g-armor').children('.g-ar-' + $gearTier.toLowerCase()).attr('class');
      if ($gearTier == 'T6') {
        if ($gearClass == (1 || 2)) {
          $('.' + $gearBlockClass).toggle();
          $('.' + $gearBlockClass).find('#g-ar-h').show();
          $('.' + $gearBlockClass).find('#g-ar-l').hide();
          $('.' + $gearBlockClass).find('#g-ar-i').hide();
        } else if ($gearClass == (3 || 4 || 5)) {
          $('.' + $gearBlockClass).toggle();
          $('.' + $gearBlockClass).find('#g-ar-h').hide();
          $('.' + $gearBlockClass).find('#g-ar-l').show();
          $('.' + $gearBlockClass).find('#g-ar-i').hide();
        } else if ($gearClass == (6 || 7)) {
          $('.' + $gearBlockClass).toggle();
          $('.' + $gearBlockClass).find('#g-ar-h').hide();
          $('.' + $gearBlockClass).find('#g-ar-l').hide();
          $('.' + $gearBlockClass).find('#g-ar-i').show();
        }
      } else if ($gearTier == 'T7') {
        if ($gearClass == (1 || 2)) {
          $('.' + $gearBlockClass).toggle();
          $('.' + $gearBlockClass).find('#g-ar-h').show();
          $('.' + $gearBlockClass).find('#g-ar-l').hide();
          $('.' + $gearBlockClass).find('#g-ar-i').hide();
        } else if ($gearClass == (3 || 4 || 5)) {
          $('.' + $gearBlockClass).toggle();
          $('.' + $gearBlockClass).find('#g-ar-h').hide();
          $('.' + $gearBlockClass).find('#g-ar-l').show();
          $('.' + $gearBlockClass).find('#g-ar-i').hide();
        } else if ($gearClass == (6 || 7)) {
          $('.' + $gearBlockClass).toggle();
          $('.' + $gearBlockClass).find('#g-ar-h').hide();
          $('.' + $gearBlockClass).find('#g-ar-l').hide();
          $('.' + $gearBlockClass).find('#g-ar-i').show();
        }
      } else if ($gearTier == 'T8') {
        if ($gearClass == (1 || 2)) {
          $('.' + $gearBlockClass).toggle();
          $('.' + $gearBlockClass).find('#g-ar-h').show();
          $('.' + $gearBlockClass).find('#g-ar-l').hide();
          $('.' + $gearBlockClass).find('#g-ar-i').hide();
        } else if ($gearClass == (3 || 4 || 5)) {
          $('.' + $gearBlockClass).toggle();
          $('.' + $gearBlockClass).find('#g-ar-h').hide();
          $('.' + $gearBlockClass).find('#g-ar-l').show();
          $('.' + $gearBlockClass).find('#g-ar-i').hide();
        } else if ($gearClass == (6 || 7)) {
          $('.' + $gearBlockClass).toggle();
          $('.' + $gearBlockClass).find('#g-ar-h').hide();
          $('.' + $gearBlockClass).find('#g-ar-l').hide();
          $('.' + $gearBlockClass).find('#g-ar-i').show();
        }
      } else {
        $('#calc_gear_armor_id').prop('selectedIndex', 0);
      }
    }).change();

    // Armor Set
    $('select#calc_gear_armor_id').change(function() {
      $('.armor').parent().hide();
      $gearClass = $('#calc_role_id').children('option:selected').val();
      $gearTier = $('#calc_gear_armor').children('option:selected').val();
      $gearSetId = $(this).children('option:selected').val();
      if ($gearClass == (1 || 2)) {
        $sh = $('.gear' + $gearSetId).toggle();
        $($sh).find('.armor').show();
      } else if ($gearClass == (3 || 4 || 5)) {
        $sh = $('.gear' + $gearSetId).toggle();
        $($sh).find('.armor').show();
      } else if ($gearClass == (6 || 7)) {
        $sh = $('.gear' + $gearSetId).toggle();
        $($sh).find('.armor').show();
      }
    }).change();

    // Secondary Tier
    $('select#calc_gear_secondary').change(function() {
      $('.g-secondary').children().hide();
      $('.secondary').parent().hide();
      $('#calc_gear_secondary_id').prop('selectedIndex', 0);
      $gearClass = $('#calc_role_id').children('option:selected').val();
      $gearTier = $(this).children('option:selected').val();
      $gearBlockClass = $('.g-secondary').children('.g-sg-' + $gearTier.toLowerCase()).attr('class');
      if ($gearTier == 'T6') {
        if ($gearClass == (1 || 2)) {
          $('.' + $gearBlockClass).toggle();
          $('.' + $gearBlockClass).find('#g-sg-h').show();
          $('.' + $gearBlockClass).find('#g-sg-l').hide();
          $('.' + $gearBlockClass).find('#g-sg-i').hide();
        } else if ($gearClass == (3 || 4 || 5)) {
          $('.' + $gearBlockClass).toggle();
          $('.' + $gearBlockClass).find('#g-sg-h').hide();
          $('.' + $gearBlockClass).find('#g-sg-l').show();
          $('.' + $gearBlockClass).find('#g-sg-i').hide();
        } else if ($gearClass == 6 || 7) {
          $('.' + $gearBlockClass).toggle();
          $('.' + $gearBlockClass).find('#g-sg-h').hide();
          $('.' + $gearBlockClass).find('#g-sg-l').hide();
          $('.' + $gearBlockClass).find('#g-sg-i').show();
        }
      } else if ($gearTier == 'T7') {
        if ($gearClass == (1 || 2)) {
          $('.' + $gearBlockClass).toggle();
          $('.' + $gearBlockClass).find('#g-sg-h').show();
          $('.' + $gearBlockClass).find('#g-sg-l').hide();
          $('.' + $gearBlockClass).find('#g-sg-i').hide();
        } else if ($gearClass == (3 || 4 || 5)) {
          $('.' + $gearBlockClass).toggle();
          $('.' + $gearBlockClass).find('#g-sg-h').hide();
          $('.' + $gearBlockClass).find('#g-sg-l').show();
          $('.' + $gearBlockClass).find('#g-sg-i').hide();
        } else if ($gearClass == (6 || 7)) {
          $('.' + $gearBlockClass).toggle();
          $('.' + $gearBlockClass).find('#g-sg-h').hide();
          $('.' + $gearBlockClass).find('#g-sg-l').hide();
          $('.' + $gearBlockClass).find('#g-sg-i').show();
        }
      } else if ($gearTier == 'T8') {
        if ($gearClass == (1 || 2)) {
          $('.' + $gearBlockClass).toggle();
          $('.' + $gearBlockClass).find('#g-sg-h').show();
          $('.' + $gearBlockClass).find('#g-sg-l').hide();
          $('.' + $gearBlockClass).find('#g-sg-i').hide();
        } else if ($gearClass == (3 || 4 || 5)) {
          $('.' + $gearBlockClass).toggle();
          $('.' + $gearBlockClass).find('#g-sg-h').hide();
          $('.' + $gearBlockClass).find('#g-sg-l').show();
          $('.' + $gearBlockClass).find('#g-sg-i').hide();
        } else if ($gearClass == (6 || 7)) {
          $('.' + $gearBlockClass).toggle();
          $('.' + $gearBlockClass).find('#g-sg-h').hide();
          $('.' + $gearBlockClass).find('#g-sg-l').hide();
          $('.' + $gearBlockClass).find('#g-sg-i').show();
        }
      } else {
        $('#calc_gear_secondary_id').prop('selectedIndex', 0);
      }
    }).change();

    // Secondary Set
    $('select#calc_gear_secondary_id').change(function() {
      $('.secondary').parent().hide();
      $gearClass = $('#calc_role_id').children('option:selected').val();
      $gearTier = $('#calc_gear_secondary').children('option:selected').val();
      $gearSetId = $(this).children('option:selected').val();
      if ($gearClass == (1 || 2)) {
        $sh = $('.gear' + $gearSetId).toggle();
        $($sh).find('.secondary').show();
      } else if ($gearClass == (3 || 4 || 5)) {
        $sh = $('.gear' + $gearSetId).toggle();
        $($sh).find('.secondary').show();
      } else if ($gearClass == (6 || 7)) {
        $sh = $('.gear' + $gearSetId).toggle();
        $($sh).find('.secondary').show();
      }
    }).change();

    // Weapon ATK
    $('#uw label').click(function() {
      $gearHero = $('#calc_char_id').children('option:selected').val();
      $gearClass = $('#calc_role_id').children('option:selected').val();
      $gearWeaponType = $('#calc_gear_weapon').children('option:selected').val();
      $btnId = $(this).attr('class').split(' ')[0];

      if ($gearWeaponType == 'Class') {
        $rBtn = $('.role' + $gearClass).find('.uw');
        $btnFind = $($rBtn).find('#' + $btnId);
        $p0 = $($rBtn).find('#p0').text();
      } else if ($gearWeaponType == 'Unique') {
        $cBtn = $('.char' + $gearHero).find('.uw');
        $btnFind = $($cBtn).find('#' + $btnId);
        $p0 = $($cBtn).find('#p0').text();
      }
      $classStat = parseInt($('.role' + $gearClass).find('p:contains("ATK")').next('p').text());
      $gearStat = parseInt($($btnFind).text());
      $sumStat = ($classStat + $gearStat).toLocaleString();
      $('#heroATK').text($p0 + ' - ' + $sumStat);

      console.log('W btnId = ' + $btnId);
      console.log('W p0 = ' + $p0);
      console.log('W btnFind = ' + $btnFind);
      console.log('W classStat = ' + $classStat);
      console.log('W gearStat = ' + $gearStat);
    }).change();

    // Treasure HP
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
      $sumStat = ($classStat + $gearStat).toLocaleString();
      $('#heroHP').text($p1 + ' - ' + $sumStat);

      console.log('T btnId = ' + $btnId);
      console.log('T p1 = ' + $p1);
      console.log('T btnFind = ' + $btnFind);
      console.log('T classStat = ' + $classStat);
      console.log('T gearStat = ' + $gearStat);
    }).change();

    // Armor P.DEF
    $('#ar label').click(function() {
      $gearClass = $('#calc_role_id').children('option:selected').val();
      $btnId = $(this).attr('class').split(' ')[0];
      $gearId = $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().attr('id');

      $cBtn = $('.gear' + $gearId).find('.armor');
      $btnFind = $('#' + $gearId).find('#' + $btnId);
      $p2 = $($cBtn).find('#p2').first().text();

      $classStat = parseInt($('.role' + $gearClass).find('p:contains("P.Def")').next('p').text());
      $gearStat = parseInt($($btnFind).text());
      $sumStat = ($classStat + $gearStat).toLocaleString();
      $('#heroPDEF').text($p2 + ' - ' + $sumStat);

      console.log('AM btnId = ' + $btnId);
      console.log('AM p2 = ' + $p2);
      console.log('AM btnFind = ' + $btnFind);
      console.log('AM classStat = ' + $classStat);
      console.log('AM gearStat = ' + $gearStat);
    }).change();

    // Armor M.DEF
    $('#sg label').click(function() {
      $gearClass = $('#calc_role_id').children('option:selected').val();
      $btnId = $(this).attr('class').split(' ')[0];
      $gearId = $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().attr('id');

      $cBtn = $('.gear' + $gearId).find('.secondary');
      $btnFind = $('#' + $gearId).find('#' + $btnId);
      $p3 = $($cBtn).find('#p3').first().text();

      $classStat = parseInt($('.role' + $gearClass).find('p:contains("M.Def")').next('p').text());
      $gearStat = parseInt($($btnFind).text());
      $sumStat = ($classStat + $gearStat).toLocaleString();
      $('#heroMDEF').text($p3 + ' - ' + $sumStat);

      console.log('AS btnId = ' + $btnId);
      console.log('AS p3 = ' + $p3);
      console.log('AS btnFind = ' + $btnFind);
      console.log('AS classStat = ' + $classStat);
      console.log('AS gearStat = ' + $gearStat);
    }).change();
  });
}).call(this);
