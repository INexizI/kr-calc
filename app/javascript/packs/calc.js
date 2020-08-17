(function() {
  $(document).on("turbolinks:load", function() {
    // Class -> Hero
    $chars = $('#calc_char_id').html();
    $('#calc_role_id').change(function() {
      // Gear stuff
      $('#calc_gear_weapon').parent().hide();
      $('#calc_gear_treasure').parent().hide();
      $('#calc_gear_armor').parent().hide(),
      $('#calc_gear_secondary').parent().hide(),
      $('#calc_gear_jewelry').parent().hide(),
      $('#calc_gear_jewelry_type').parent().hide(),
      $('#calc_gear_orb').parent().hide(),
      $('.hero-gear').children().hide();

      // Options
      $role = $('#calc_role_id :selected').text();
      $escaped_role = $role.replace(/([ #;&,.+*~\':"!^$[\]()=>|\/@])/g, '\\$1');
      $options = $($chars).filter("optgroup[label='" + $escaped_role + "']").html();
      if ($options) {
        $('#calc_char_id').html($options);
        return [
          $('#calc_char_id').parent().show(),
          $('#calc_gear_weapon').parent().show(),
          $('#calc_gear_treasure').parent().show(),
          $('#calc_gear_armor').parent().show(),
          $('#calc_gear_secondary').parent().show(),
          $('#calc_gear_jewelry').parent().show(),
          $('#calc_gear_orb').parent().show(),
          $('.g-armor').children().hide(),
          $('.g-armor').children().children().show(),
          $('.g-secondary').children().hide(),
          $('.g-secondary').children().children().show(),
          $('.g-jewelry').children().hide(),
          $('.g-jewelry').children().children().show(),
          $('.g-orb').children().hide(),
          $('select').not(this).prop('selectedIndex', 0)
        ];
      } else {
        $('#calc_char_id').empty();
        return [
          $('.g-armor').children().hide(),
          $('.g-armor').children().children().show(),
          $('.g-secondary').children().hide(),
          $('.g-secondary').children().children().show(),
          $('.g-jewelry').children().hide(),
          $('.g-jewelry').children().children().show(),
          $('.g-orb').children().hide(),
          $('#calc_char_id').parent().hide()
        ]
      }
    });

    // Hero -> Weapon
    $('#calc_char_id').change(function() {
      $('.hero-gear').children().hide();
      $('select').not('#calc_role_id, #calc_char_id').prop('selectedIndex', 0);
      return [
        $('.g-armor').children().hide(),
        $('.g-armor').children().children().show(),
        $('.g-secondary').children().hide(),
        $('.g-secondary').children().children().show(),
        $('.g-jewelry').children().hide(),
        $('.g-jewelry').children().children().show(),
        $('.g-jewelry-type').children().hide(),
        $('.g-jewelry-type').children().children().show(),
        $('.g-orb').children().hide()
      ]
    });

    // Hero stats
    $('select#calc_role_id').change(function() {
      $('.r-stats').children().hide();
      $stat = $(this).children('option:selected').val();
      // $statLocal = $('.r-stats').find('.role' + $stat).show();
      // $($statLocal).find('.r-stat').each(function(i, el) {
      //   $convStat = $(this).find('p').last()
      //   $conv = parseInt($($convStat).text())
      //   $convStat.replaceWith('<p>' + $conv + '</p>')
      // });
      $('.r-stats').find('.role' + $stat).show();
    }).change();

    // Class / Unique Weapon
    $gearWeaponSlot = null;
    $('select#calc_gear_weapon').change(function() {
      $('.hero-gear').children().hide();
      $('#calc_gear_treasure').val([]);
      $gearWeaponType = $(this).children('option:selected').val();
      if ($gearWeaponType == 'Class') {
        $gearWeaponSlot = $('#calc_role_id').children('option:selected').val();
        $('.role' + $gearWeaponSlot).show();
      } else if ($gearWeaponType == 'Unique') {
        $gearWeaponSlot = $('#calc_char_id').children('option:selected').val();
        $('.char' + $gearWeaponSlot).show();
      }
      $('.hero-gear').find('.uw').show();
      $('.hero-gear').find('.ut').hide();
      $('.hero-gear').find('.mana').hide();
      $('.hero-gear').find('.armor').hide();
    }).change();

    // Treasure
    $('select#calc_gear_treasure').change(function() {
      $('.hero-gear').children().hide();
      $gearWeaponType = $('#calc_gear_weapon').children('option:selected').val();
      $gearTreasureType = $(this).children('option:selected').val();
      $gearHero = $('#calc_char_id').children('option:selected').val();
      $gearClass = $('#calc_role_id').children('option:selected').val();
      if ($gearWeaponType == 'Class') {
        $('.role' + $gearClass).show();
        $sh = $('.char' + $gearHero).toggle();
        if ($gearTreasureType == 'Mana Stone') {
          $($sh).find('.uw').hide();
          $($sh).find('.ut').hide();
          $($sh).find('.mana').show();
        } else if ($gearTreasureType == 'Unique') {
          $($sh).find('.uw').hide();
          $($sh).find('.ut').show();
          $($sh).find('.mana').hide();
        } else if ($gearTreasureType == '') {
          $($sh).find('.uw').hide();
          $($sh).find('.ut').hide();
          $($sh).find('.mana').hide();
        }
      } else if ($gearWeaponType == 'Unique') {
        $sh = $('.char' + $gearHero).toggle();
        if ($gearTreasureType == 'Mana Stone') {
          $($sh).find('.uw').show();
          $($sh).find('.mana').show();
          $($sh).find('.ut').hide();
        } else if ($gearTreasureType == 'Unique') {
          $($sh).find('.uw').show();
          $($sh).find('.ut').show();
          $($sh).find('.mana').hide();
        } else if ($gearTreasureType == '') {
          $($sh).find('.uw').show();
          $($sh).find('.ut').hide();
          $($sh).find('.mana').hide();
        }
      };
    }).change();

    // Armor Tier
    $('select#calc_gear_armor').change(function() {
      $('.g-armor').children().hide();
      $('.g-armor').children().children().show();
      $gearClass = $('#calc_role_id').children('option:selected').val();
      $gearTier = $(this).children('option:selected').val();
      $gearBlockClass = $('.g-armor').children('.g-ar-' + $gearTier.toLowerCase()).attr('class');
      if ($gearTier !== '') {
        if (($gearClass == 1) || ($gearClass == 2)) {
          $sh = $('.' + $gearBlockClass).toggle();
          $($sh).children().toggle();
          $($sh).find('#g-ar-h').show();
      } else if (($gearClass == 3) || ($gearClass == 4) || ($gearClass == 5)) {
          $sh = $('.' + $gearBlockClass).toggle();
          $($sh).children().toggle();
          $($sh).find('#g-ar-l').show();
        } else if (($gearClass == 6) || ($gearClass == 7)) {
          $sh = $('.' + $gearBlockClass).toggle();
          $($sh).children().toggle();
          $($sh).find('#g-ar-i').show();
        }
      }
      $('#calc_gear_armor_id').prop('selectedIndex', 0);
    }).change();

    // Armor Set
    $('select#calc_gear_armor_id').change(function() {
      $gearClass = $('#calc_role_id').children('option:selected').val();
      $gearTier = $('#calc_gear_armor').children('option:selected').val();
      $gearSetId = $(this).children('option:selected').val();
      if ($gearClass !== '') {
        $('.armor').parent().hide();
        $sh = $('.gear' + $gearSetId).toggle();
        $($sh).find('.armor').show();
      }
    }).change();

    // Secondary Tier
    $('select#calc_gear_secondary').change(function() {
      $('.g-secondary').children().hide();
      $('#calc_gear_secondary_id').prop('selectedIndex', 0);
      $gearClass = $('#calc_role_id').children('option:selected').val();
      $gearTier = $(this).children('option:selected').val();
      $gearBlockClass = $('.g-secondary').children('.g-sg-' + $gearTier.toLowerCase()).attr('class');
      if ($gearTier !== '') {
        if (($gearClass == 1) || ($gearClass == 2)) {
          $sh = $('.' + $gearBlockClass).toggle();
          $($sh).children().toggle();
          $($sh).find('#g-sg-h').show();
        } else if (($gearClass == 3) || ($gearClass == 4) || ($gearClass == 5)) {
          $sh = $('.' + $gearBlockClass).toggle();
          $($sh).children().toggle();
          $($sh).find('#g-sg-l').show();
        } else if (($gearClass == 6) || ($gearClass == 7)) {
          $sh = $('.' + $gearBlockClass).toggle();
          $($sh).children().toggle();
          $($sh).find('#g-sg-i').show();
        }
      } else {
        $('#calc_gear_secondary_id').prop('selectedIndex', 0);
      }
    }).change();

    // Secondary Set
    $('select#calc_gear_secondary_id').change(function() {
      $gearClass = $('#calc_role_id').children('option:selected').val();
      $gearTier = $('#calc_gear_secondary').children('option:selected').val();
      $gearSetId = $(this).children('option:selected').val();
      if ($gearClass !== '') {
        $('.secondary').parent().hide();
        $sh = $('.gear' + $gearSetId).toggle();
        $($sh).find('.secondary').show();
      }
    }).change();

    // Jewelry Type
    $('select#calc_gear_jewelry').change(function() {
      $('.g-jewelry-type').hide();
      $gearTier = $('#calc_gear_jewelry').children('option:selected').val();
      if ($gearTier === '') {
        $('.calc_gear_jewelry_type').hide();
        $('.g-jewelry').children().children().hide();
      } else {
        $('.g-jewelry-type').show();
        $('.calc_gear_jewelry_type').show();
      }
      $('#calc_gear_jewelry_type').prop('selectedIndex', 0);
    }).change();

    // Jewelry Tier
    $('select#calc_gear_jewelry_type').change(function() {
      $('.g-jewelry').children().hide();
      $('.g-jewelry').children().children().show();
      $('#calc_gear_jewelry_id').prop('selectedIndex', 0);
      $gearType = $(this).children('option:selected').val();
      $gearTier = $('#calc_gear_jewelry').children('option:selected').val();
      $gearBlockClass = $('.g-jewelry').children('.g-j-' + $gearTier.toLowerCase()).attr('class');
      if ($gearTier !== '') {
        $('.g-jewelry').show();
        $sh = $('.' + $gearBlockClass).toggle();
        $($sh).children().toggle();
        $($sh).find('#g-j-' + $gearType.toLowerCase()).show();
      } else {
        $('.g-jewelry').children().children().hide();
        $('#calc_gear_jewelry_id').prop('selectedIndex', 0);
      }
    }).change();

    // Jewelry Set
    $('select#calc_gear_jewelry_id').change(function() {
      $gearType = $('#calc_gear_jewelry_type').children('option:selected').val();
      $gearTier = $('#calc_gear_jewelry').children('option:selected').val();
      $gearSetId = $(this).children('option:selected').val();
      if ($gearType !== '') {
        $('.jewelry').parent().hide();
        $sh = $('.gear' + $gearSetId).toggle();
        $($sh).find('.jewelry').show();
      }
    }).change();

    // Orb Tier
    $('select#calc_gear_orb').change(function() {
      $('.g-orb').children().hide();
      $('#calc_gear_orb_id').prop('selectedIndex', 0);
      $gearClass = $('#calc_role_id').children('option:selected').val();
      $gearTier = $(this).children('option:selected').val();
      $gearBlockClass = $('.g-orb').children('.g-o-' + $gearTier.toLowerCase()).attr('class');
      if ($gearTier !== '') {
        $sh = $('.' + $gearBlockClass).toggle();
      } else {
        $('#calc_gear_orb_id').prop('selectedIndex', 0);
      }
    }).change();

    // Orb Set
    $('select#calc_gear_orb_id').change(function() {
      $gearClass = $('#calc_role_id').children('option:selected').val();
      $gearTier = $('#calc_gear_orb').children('option:selected').val();
      $gearSetId = $(this).children('option:selected').val();
      if ($gearClass !== '') {
        $('.orb').parent().hide();
        $sh = $('.gear' + $gearSetId).toggle();
        $($sh).find('.orb').show();
      }
    }).change();

    // Weapon ATK
    $wpnSt = 0;
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

      if ($('#heroATK').is(':empty')) {
        $atk = $('.role' + $gearClass).find('p:contains("ATK")').next('p').text();
      } else {
        $atk = $('#heroATK').text();
      }

      $wpnSt = parseInt($($btnFind).text());
      $sumStat = (parseInt($atk) + $wpnSt);
      $('#heroATK').text($sumStat);

      console.log('W btnId = ' + $btnId);
      console.log('W p0 = ' + $p0);
      console.log('W btnFind = ' + $btnFind);
      console.log('W classStat = ' + $atk);
      console.log('W gearStat = ' + $wpnSt);
    }).change();

    // Treasure HP
    $trsSt = 0;
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

      if ($('#heroHP').is(':empty')) {
        $hp = $('.role' + $gearClass).find('p:contains("MAX HP")').next('p').text();
      } else {
        $hp = $('#heroHP').text();
      }

      $trsSt = parseInt($($btnFind).text());
      $sumStat = (parseInt($hp) + $trsSt);
      $('#heroHP').text($sumStat);

      console.log('T btnId = ' + $btnId);
      console.log('T p1 = ' + $p1);
      console.log('T btnFind = ' + $btnFind);
      console.log('T classStat = ' + $trsSt);
      console.log('T gearStat = ' + $hp);
    }).change();

    // Armor Stat
    $arSt = 0;
    $('#ar label').click(function() {
      $gearClass = $('#calc_role_id').children('option:selected').val();
      $btnId = $(this).attr('class').split(' ')[0];
      $gearId = $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().attr('id');

      $cBtn = $('.gear' + $gearId).find('.armor');
      $btnFind = $('#' + $gearId).find('#' + $btnId);
      $p2 = $($cBtn).find('#p2').first().text();

      if ($('#heroPDEF').is(':empty')) {
        $pdef = $('.role' + $gearClass).find('p:contains("P.Def")').next('p').text();
      } else {
        $pdef = $('#heroPDEF').text();
      }

      $arSt = parseInt($($btnFind).text());
      $sumStat = (parseInt($pdef) + $arSt);
      $('#heroPDEF').text($sumStat);

      console.log('AM btnId = ' + $btnId);
      console.log('AM p2 = ' + $p2);
      console.log('AM btnFind = ' + $btnFind);
      console.log('AM classStat = ' + $pdef);
      console.log('AM gearStat = ' + $arSt);
    }).change();

    // Secondary Stat
    $scndSt = 0;
    $('#sg label').click(function() {
      $gearClass = $('#calc_role_id').children('option:selected').val();
      $btnId = $(this).attr('class').split(' ')[0];
      $gearId = $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().attr('id');

      $cBtn = $('.gear' + $gearId).find('.secondary');
      $btnFind = $('#' + $gearId).find('#' + $btnId);
      $p3 = $($cBtn).find('#p3').first().text();

      if ($('#heroMDEF').is(':empty')) {
        $mdef = $('.role' + $gearClass).find('p:contains("M.Def")').next('p').text();
      } else {
        $mdef = $('#heroPDEF').text();
      }

      $scndSt = parseInt($($btnFind).text());
      $sumStat = (parseInt($mdef) + $scndSt);
      $('#heroMDEF').text($sumStat);

      console.log('AS btnId = ' + $btnId);
      console.log('AS p3 = ' + $p3);
      console.log('AS btnFind = ' + $btnFind);
      console.log('AS classStat = ' + $mdef);
      console.log('AS gearStat = ' + $scndSt);
    }).change();

    // Jewelry Stat
    $jwlSt = 0;
    $('#j label').click(function() {
      $gearClass = $('#calc_role_id').children('option:selected').val();
      $gearType = $('#calc_gear_jewelry_type').children('option:selected').val();
      $btnId = $(this).attr('class').split(' ')[0];
      $gearId = $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().attr('id');

      $cBtn = $('.gear' + $gearId).find('.jewelry');
      $btnFind = $('#' + $gearId).find('#' + $btnId);
      $p4 = $($cBtn).find('#p4').first().text();

      if ($gearType == 'Ring') {
        if ($('#heroHP').is(':empty')) {
          $jewel = $('.role' + $gearClass).find('p:contains("MAX HP")').next('p').text();
        } else {
          $jewel = $('#heroHP').text();
        }
        $jwlSt = parseInt($($btnFind).text());
        $sumStat = (parseInt($jewel) + $jwlSt);
        $('#heroHP').text($sumStat);
      } else if ($gearType == 'Earrings') {
        if ($('#heroATK').is(':empty')) {
          $jewel = $('.role' + $gearClass).find('p:contains("ATK")').next('p').text();
        } else {
          $jewel = $('#heroATK').text();
        }
        $jwlSt = parseInt($($btnFind).text());
        $sumStat = (parseInt($jewel) + $jwlSt);
        $('#heroATK').text($sumStat);
      } else if ($gearType == 'Necklace') {
        if ($('#heroMDEF').is(':empty')) {
          $jewel = $('.role' + $gearClass).find('p:contains("M.Def")').next('p').text();
        } else {
          $jewel = $('#heroMDEF').text();
        }
        $jwlSt = parseInt($($btnFind).text());
        $sumStat = (parseInt($jewel) + $jwlSt);
        $('#heroMDEF').text($sumStat);
      } else if ($gearType == 'Bracelet') {
        if ($('#heroPDEF').is(':empty')) {
          $jewel = $('.role' + $gearClass).find('p:contains("P.Def")').next('p').text();
        } else {
          $jewel = $('#heroPDEF').text();
        }
        $jwlSt = parseInt($($btnFind).text());
        $sumStat = (parseInt($jewel) + $jwlSt);
        $('#heroPDEF').text($sumStat);
      }

      console.log('AJ btnId = ' + $btnId);
      console.log('AJ p4 = ' + $p4);
      console.log('AJ btnFind = ' + $btnFind);
      console.log('AJ classStat = ' + $jewel);
      console.log('AJ gearStat = ' + $jwlSt);
    }).change();

    // Orb Stat
    $orbSt = 0;
    $('#o label').click(function() {
      $gearClass = $('#calc_role_id').children('option:selected').val();
      $btnId = $(this).attr('class').split(' ')[0];
      $gearId = $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().attr('id');

      $cBtn = $('.gear' + $gearId).find('.orb');
      $btnFind = $('#' + $gearId).find('#' + $btnId);
      $p5 = $($cBtn).find('#p5').first().text();

      if ($('#heroHP').is(':empty')) {
        $hp = $('.role' + $gearClass).find('p:contains("MAX HP")').next('p').text();
      } else {
        $hp = $('#heroHP').text();
      }

      $orbSt = parseInt($($btnFind).text());
      $sumStat = (parseInt($hp) + $orbSt);
      $('#heroHP').text($sumStat);

      console.log('AO btnId = ' + $btnId);
      console.log('AO p5 = ' + $p5);
      console.log('AO btnFind = ' + $btnFind);
      console.log('AO classStat = ' + $hp);
      console.log('AO gearStat = ' + $orbSt);
    }).change();
  });
}).call(this);
