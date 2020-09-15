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
      $('.t-st p').empty();

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
          $('.g-mana-stone').hide(),
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
      $('.t-st p').empty();
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
      $('.t-total .r-stats').empty();
      $stat = $(this).children('option:selected').val();
      $stats = $('.r-stats').find('.role' + $stat).clone();
      $($stats).prependTo('.t-total .r-stats');
      $('.t-total').find('.role' + $stat).show();
    }).change();

    // Class / Unique Weapon
    $gearWeaponSlot = null;
    $uw = null;
    $('select#calc_gear_weapon').change(function() {
      $('#heroATK').empty();
      $('.hero-gear').find('.uw').hide();
      $gearWeaponType = $(this).children('option:selected').val();
      if ($gearWeaponType == 'Class') {
        $gearWeaponSlot = $('#calc_role_id').children('option:selected').val();
        $uw = $('.hero-gear .role' + $gearWeaponSlot).show();
        $($uw).find('.uw').show();
      } else if ($gearWeaponType == 'Unique') {
        $gearWeaponSlot = $('#calc_char_id').children('option:selected').val();
        $uw = $('.hero-gear .char' + $gearWeaponSlot).show();
        $($uw).find('.uw').show();
      } else {
        $('.hero-gear').find('.uw').hide();
      }
    }).change();

    // Treasure
    $('select#calc_gear_treasure').change(function() {
      $('#heroHP').empty();
      $('.hero-gear').find('.ut, .mana').hide();
      $gearWeaponType = $('#calc_gear_weapon').children('option:selected').val();
      $gearTreasureType = $(this).children('option:selected').val();
      $gearHero = $('#calc_char_id').children('option:selected').val();
      $gearClass = $('#calc_role_id').children('option:selected').val();
      if ($gearTreasureType == 'Mana Stone') {
        $('.g-mana-stone').show().children().show();
      } else if ($gearTreasureType == 'Unique') {
        $('.g-mana-stone').hide().children().hide();
        $sh = $('.char' + $gearHero).show();
        $($sh).find('.ut').show();
      }
      if ($gearTreasureType === '') {
        $('.g-mana-stone').hide().children().hide();
      }
    }).change();

    // Treasure (Mana Stone Tier)
    $('select#calc_gear_treasure_tier').change(function() {
      $('#heroHP').empty();
      $('.hero-gear').find('.ut, .mana').hide();
      $gearTier = $('select#calc_gear_treasure_tier').children('option:selected').val();
      $gearHero = $('#calc_char_id').children('option:selected').val();
      $sh = $('.char' + $gearHero).show();
      $($sh).find('.mana').hide();
      if ($gearTier !== '') {
        $($sh).find('.' + $gearTier).show();
      }
    }).change();

    // Armor Tier
    $('select#calc_gear_armor').change(function() {
      $('#heroPDEF').empty();
      $('.armor').parent().hide();
      $('.g-armor').children().hide();
      $('.g-armor').children().children().show();
      $gearClass = $('#calc_role_id').children('option:selected').val();
      $gearTier = $(this).children('option:selected').val();
      $gearBlockClass = $('.g-armor').children('.g-ar-' + $gearTier.toLowerCase()).attr('class');
      if ($gearTier !== '') {
        if (($gearClass == 1) || ($gearClass == 2)) {
          $sh = $('.' + $gearBlockClass).show();
          $($sh).children().toggle();
          $($sh).find('#g-ar-h').show();
      } else if (($gearClass == 3) || ($gearClass == 4) || ($gearClass == 5)) {
          $sh = $('.' + $gearBlockClass).show();
          $($sh).children().toggle();
          $($sh).find('#g-ar-l').show();
        } else if (($gearClass == 6) || ($gearClass == 7)) {
          $sh = $('.' + $gearBlockClass).show();
          $($sh).children().toggle();
          $($sh).find('#g-ar-i').show();
        }
      } else {
        $('.armor').parent().hide();
      }
    }).change();

    // Armor Set
    $('select#calc_gear_armor_id').change(function() {
      $('#heroPDEF').empty();
      $('.armor').parent().hide();
      $('#setAr').text($(this).children('option:selected').text());
      $gearClass = $('#calc_role_id').children('option:selected').val();
      $gearTier = $('#calc_gear_armor').children('option:selected').val();
      $gearSetId = $(this).children('option:selected').val();
      if ($gearClass !== '') {
        $('.armor').parent().hide();
        $sh = $('.gear' + $gearSetId).show();
        $($sh).find('.armor').show();
      } else {
        $('.armor').parent().hide();
      }
    }).change();

    // Secondary Tier
    $('select#calc_gear_secondary').change(function() {
      $('#heroMDEF').empty();
      $('.secondary').parent().hide();
      $('.g-secondary').children().hide();
      $gearTier = $(this).children('option:selected').val();
      $gearClass = $('#calc_role_id').children('option:selected').val();
      $gearBlockClass = $('.g-secondary').children('.g-sg-' + $gearTier.toLowerCase()).attr('class');
      if ($gearTier !== '') {
        if (($gearClass == 1) || ($gearClass == 2)) {
          $sh = $('.' + $gearBlockClass).show();
          $($sh).children().toggle();
          $($sh).find('#g-sg-h').show();
        } else if (($gearClass == 3) || ($gearClass == 4) || ($gearClass == 5)) {
          $sh = $('.' + $gearBlockClass).show();
          $($sh).children().toggle();
          $($sh).find('#g-sg-l').show();
        } else if (($gearClass == 6) || ($gearClass == 7)) {
          $sh = $('.' + $gearBlockClass).show();
          $($sh).children().toggle();
          $($sh).find('#g-sg-i').show();
        }
      } else {
        $('.secondary').parent().hide();
      }
    }).change();

    // Secondary Set
    $('select#calc_gear_secondary_id').change(function() {
      $('#heroMDEF').empty();
      $('.secondary').parent().hide();
      $('#setScnd').text($(this).children('option:selected').text());
      $gearClass = $('#calc_role_id').children('option:selected').val();
      $gearTier = $('#calc_gear_secondary').children('option:selected').val();
      $gearSetId = $(this).children('option:selected').val();
      if ($gearClass !== '') {
        $('.secondary').parent().hide();
        $sh = $('.gear' + $gearSetId).show();
        $($sh).find('.secondary').show();
      } else {
        $('.secondary').parent().hide();
      }
    }).change();

    // Jewelry Type
    $('select#calc_gear_jewelry').change(function() {
      $('#heroJ').empty();
      $('.g-jewelry-type').hide();
      $('.jewelry').parent().hide();
      $gearTier = $('#calc_gear_jewelry').children('option:selected').val();
      if ($gearTier === '') {
        $('.calc_gear_jewelry_type').hide();
        $('.g-jewelry').children().children().hide();
        $('.jewelry').parent().hide();
      } else {
        $('.g-jewelry-type').show();
        $('.calc_gear_jewelry_type').show();
      }
    }).change();

    // Jewelry Tier
    $('select#calc_gear_jewelry_type').change(function() {
      $('#heroJ').empty();
      $('.jewelry').parent().hide();
      $('.g-jewelry').children().hide();
      $('.g-jewelry').children().children().show();
      $gearType = $(this).children('option:selected').val();
      $gearTier = $('#calc_gear_jewelry').children('option:selected').val();
      $gearBlockClass = $('.g-jewelry').children('.g-j-' + $gearTier.toLowerCase()).attr('class');
      if ($gearTier !== '') {
        $('.g-jewelry').show();
        $sh = $('.' + $gearBlockClass).show();
        $($sh).children().toggle();
        $($sh).find('#g-j-' + $gearType.toLowerCase()).show();
      } else {
        $('.jewelry').parent().hide();
        $('.g-jewelry').children().children().hide();
      }
    }).change();

    // Jewelry Set
    $('select#calc_gear_jewelry_id').change(function() {
      $('#heroJ').empty();
      $('.jewelry').parent().hide();
      $('#setAcs').text($(this).children('option:selected').text());
      $gearType = $('#calc_gear_jewelry_type').children('option:selected').val();
      $gearTier = $('#calc_gear_jewelry').children('option:selected').val();
      $gearSetId = $(this).children('option:selected').val();
      if ($gearType !== '') {
        $('.jewelry').parent().hide();
        $sh = $('.gear' + $gearSetId).show();
        $($sh).find('.jewelry').show();
      } else {
        $('.jewelry').parent().hide();
      }
    }).change();

    // Orb Tier
    $('select#calc_gear_orb').change(function() {
      $('#heroO').empty();
      $('.orb').parent().hide();
      $('.g-orb').children().hide();
      $gearClass = $('#calc_role_id').children('option:selected').val();
      $gearTier = $(this).children('option:selected').val();
      $gearBlockClass = $('.g-orb').children('.g-o-' + $gearTier.toLowerCase()).attr('class');
      if ($gearTier !== '') {
        $sh = $('.' + $gearBlockClass).show();
      } else {
        $('.orb').parent().hide();
      }
    }).change();

    // Orb Set
    $('select#calc_gear_orb_id').change(function() {
      $('#heroO').empty();
      $('.orb').parent().hide();
      $('#setOrb').text($(this).children('option:selected').text());
      $gearClass = $('#calc_role_id').children('option:selected').val();
      $gearTier = $('#calc_gear_orb').children('option:selected').val();
      $gearSetId = $(this).children('option:selected').val();
      if ($gearClass !== '') {
        $('.orb').parent().hide();
        $sh = $('.gear' + $gearSetId).show();
        $($sh).find('.orb').show();
      } else {
        $('.orb').parent().hide();
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

      $wpnSt = parseInt($($btnFind).text());
      $('#heroATK').text($wpnSt);
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

      $trsSt = parseInt($($btnFind).text());
      $('#heroTR').text($trsSt);
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

      $arSt = parseInt($($btnFind).text());
      $('#heroPDEF').text($arSt);
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

      $scndSt = parseInt($($btnFind).text());
      $('#heroMDEF').text($scndSt);
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

      $jwlSt = parseInt($($btnFind).text());
      $('#heroJ').text($jwlSt);
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

      $orbSt = parseInt($($btnFind).text());
      $('#heroO').text($orbSt);
    }).change();

    // Sum Stat
    function gearStat() {
    // $('.rating label').click(function() {
      $gearClass = $('#calc_role_id').children('option:selected').val();

      $classATK = $('.class-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === 'ATK'
      }).next('p').text();
      $classHP = $('.class-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === 'MAX HP'
      }).next('p').text();
      $classPDEF = $('.class-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === 'P.Def'
      }).next('p').text();
      $classMDEF = $('.class-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === 'M.Def'
      }).next('p').text();

      $gearA = $('#heroATK').text();
      if ($gearA == '')
        $gearA = 0;
      $gearTr = $('#heroTR').text();
      if ($gearTr == '')
        $gearTr = 0;
      $gearP = $('#heroPDEF').text();
      if ($gearP == '')
        $gearP = 0;
      $gearM = $('#heroMDEF').text();
      if ($gearM == '')
        $gearM = 0;
      $gearJ = $('#heroJ').text();
      if ($gearJ == '')
        $gearJ = 0;
      $gearO = $('#heroO').text();
      if ($gearO == '')
        $gearO = 0;
      $('#heroHP').text($classHP);

      $weapon = $('select#calc_gear_weapon').val();
      $treasure = $('select#calc_gear_treasure').val();
      $armor = $('select#calc_gear_armor').val();
      $secondary = $('select#calc_gear_secondary').val();
      $jewel = $('select#calc_gear_jewelry_type').val();
      $orb = $('select#calc_gear_orb').val();

      // atk
      if ($weapon !== '') {
        $totalA = $('.t-total .r-stats').find('p').filter(function() {
          return $(this).text() === 'ATK'
        }).next('p');
        $sumAll = parseInt($classATK) + parseInt($gearA) + parseInt($gearJ);
        if ($gearA !== 0) {
          if (($jewel == 'Earrings') && ($gearJ == 0)) {
            $totalA.text((parseInt($classATK) + parseInt($gearA)) + ' (' + $classATK + '+' + $gearA + ')');
          } else {
            $totalA.text($sumAll + ' (' + $classATK + '+' + (parseInt($gearA) + parseInt($gearJ)) + ')');
          }
        }
      }
      // hp
      if ($treasure !== '') {
        $totalH = $('.t-total .r-stats').find('p').filter(function() {
          return $(this).text() === 'MAX HP'
        }).next('p');
        $sumAll = parseInt($classHP) + parseInt($gearTr) + parseInt($gearJ) + parseInt($gearO);
        if ($gearTr !== 0) {
          if (($gearJ == 0) && ($gearO == 0))
            $totalH.text((parseInt($classHP) + parseInt($gearTr)) + ' (' + $classHP + '+' + $gearTr + ')');
          else {
            if ($jewel == 'Ring')
              $totalH.text($sumAll + ' (' + $classHP + '+' + (parseInt($gearTr) + parseInt($gearJ) + parseInt($gearO)) + ')');
            else
              $totalH.text($sumAll + ' (' + $classHP + '+' + (parseInt($gearTr) + parseInt($gearO)) + ')');
          }
        }
        $('#heroHP').text($totalH.text());
        $('#heroHPs').text($totalH.text().split(' ')[0]);
      }
      // p def
      if ($armor !== '') {
        $totalP = $('.t-total .r-stats').find('p').filter(function() {
          return $(this).text() === 'P.Def'
        }).next('p');
        if ($gearP !== 0) {
          if ($jewel == 'Bracelet') {
            if ($gearJ == 0)
              $totalP.text($sumAll + ' (' + $classPDEF + '+' + $gearP + ')');
            else
              $totalP.text($sumAll + ' (' + $classPDEF + '+' + (parseInt($gearP) + parseInt($gearJ)) + ')');
          } else
            $totalP.text((parseInt($classPDEF) + parseInt($gearP)) + ' (' + $classPDEF + '+' + $gearP + ')');
        }
      }
      // m def
      if ($secondary !== '') {
        $totalM = $('.t-total .r-stats').find('p').filter(function() {
          return $(this).text() === 'M.Def'
        }).next('p');
        $sumAll = parseInt($classMDEF) + parseInt($gearM) + parseInt($gearJ);
        if ($gearM !== 0) {
          if ($jewel == 'Necklace') {
            if ($gearJ == 0)
              $totalM.text($sumAll + parseInt($gearM) + ' (' + $classMDEF + '+' + $gearM + ')');
            else if ($gearJ !== 0)
              $totalM.text($sumAll + ' (' + $classMDEF + '+' + (parseInt($gearM) + parseInt($gearJ)) + ')');
          } else
            $totalM.text((parseInt($classMDEF) + parseInt($gearM)) + ' (' + $classMDEF + '+' + $gearM + ')');
        }
      }
      // jewel
      if ($jewel !== '') {
        if ($jewel == 'Earrings') {
          $totalJ = $('.t-total .r-stats').find('p').filter(function() {
            return $(this).text() === 'ATK'
          }).next('p');
        } else if ($jewel == 'Ring') {
          $totalJ = $('.t-total .r-stats').find('p').filter(function() {
            return $(this).text() === 'MAX HP'
          }).next('p');
        } else if ($jewel == 'Necklace') {
          $totalJ = $('.t-total .r-stats').find('p').filter(function() {
            return $(this).text() === 'M.Def'
          }).next('p');
        } else if ($jewel == 'Bracelet') {
          $totalJ = $('.t-total .r-stats').find('p').filter(function() {
            return $(this).text() === 'P.Def'
          }).next('p');
        }

        if ($jewel == 'Ring') {
          $sumAll = parseInt($classHP) + parseInt($gearTr) + parseInt($gearJ) + parseInt($gearO);
        }
        else if ($jewel == 'Earrings') {
          $sumAll = parseInt($classATK) + parseInt($gearA) + parseInt($gearJ);
        }
        else if ($jewel == 'Necklace') {
          $sumAll = parseInt($classMDEF) + parseInt($gearM) + parseInt($gearJ);
        }
        else if ($jewel == 'Bracelet') {
          $sumAll = parseInt($classPDEF) + parseInt($gearP) + parseInt($gearJ);
        }

        if ($gearJ !== 0) {
          if ($jewel == 'Ring') {
            if (($gearTr == 0) && ($gearO == 0))
              $totalJ.text((parseInt($classHP) + parseInt($gearJ)) + ' (' + $classHP + '+' + $gearJ + ')');
            else
              $totalJ.text($sumAll + ' (' + $classHP + '+' + (parseInt($gearTr) + parseInt($gearJ) + parseInt($gearO)) + ')');
            $('#heroHP').text($totalJ.text());
            $('#heroHPs').text($totalJ.text().split(' ')[0]);
          } else if ($jewel == 'Earrings') {
            if ($gearA == 0)
              $totalJ.text((parseInt($classATK) + parseInt($gearJ)) + ' (' + $classATK + '+' + $gearJ + ')');
            else
              $totalJ.text($sumAll + ' (' + $classATK + '+' + (parseInt($gearA) + parseInt($gearJ)) + ')');
          } else if ($jewel == 'Necklace') {
            if ($gearM == 0)
              $totalJ.text((parseInt($classMDEF) + parseInt($gearJ)) + ' (' + $classMDEF + '+' + $gearJ + ')');
            else
              $totalJ.text($sumAll + ' (' + $classMDEF + '+' + (parseInt($gearM) + parseInt($gearJ)) + ')');
          } else if ($jewel == 'Bracelet') {
            if ($gearP == 0)
              $totalJ.text((parseInt($classPDEF) + parseInt($gearJ)) + ' (' + $classPDEF + '+' + $gearJ + ')');
            else
              $totalJ.text($sumAll + ' (' + $classPDEF + '+' + (parseInt($gearP) + parseInt($gearJ)) + ')');
          }
        }
      }
      // orb
      if ($orb !== '') {
        $orbSplt = 0;
        $totalO = $('.t-total .r-stats').find('p').filter(function() {
          return $(this).text() === 'MAX HP'
        }).next('p');

        if ($jewel == 'Ring')
          $sumAll = parseInt($classHP) + parseInt($gearTr) + parseInt($gearJ) + parseInt($gearO);
        else
          $sumAll = parseInt($classHP) + parseInt($gearTr) + parseInt($gearO);

        if ($gearO !== 0) {
          if (($gearTr == 0) && ($gearJ == 0)) {
            $totalO.text((parseInt($classHP) + parseInt($gearO)) + ' (' + $classHP + '+' + $gearO + ')');
          } else if (($gearTr == 0) || ($gearJ == 0)) {
            if ($jewel == 'Ring') {
              $totalO.text($sumAll + ' (' + $classHP + '+' + (parseInt($gearTr) + parseInt($gearJ) + parseInt($gearO)) + ')');
            } else {
              $totalO.text($sumAll + ' (' + $classHP + '+' + (parseInt($gearTr) + parseInt($gearO)) + ')');
            }
          }
          $('#heroHP').text($totalO.text());
          $('#heroHPs').text($totalO.text().split(' ')[0]);
        }
      }
    // }); // $('.rating label').click(function() {
    };

    // Set Bonus
    function gearSet() {
    // $('.form-input select').change(function gearSet() {
      $f = 0;
      $fr = 0;
      $p = 0;
      $d = 0;
      $la = 0;
      $le = 0;
      $ch = 0;
      $s = 0;
      $pr = 0;
      $dl = 0;
      $t = 0;
      $setBS = 0;
      $gearClass = $('#calc_role_id').children('option:selected').val();
      $setBonus = $('.t-total .r-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === 'Set Bonus'
      }).next('p');
      if (!$setBonus.length)
        $setBonus = $('.t-total .r-stats .role' + $gearClass).append('<div class="r-stat"><p>Set Bonus</p><p>0</p></div>');
      $statCrit = $('.class-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === 'Crit'
      }).next('p');
      $statHP = $('.class-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === 'MAX HP'
      }).next('p');
      $statGrey = parseInt($('#heroHP').text());
      $statCritResP = $('.class-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === 'P.Crit Resistance'
      }).next('p');
      $statCritResM = $('.class-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === 'M.Crit Resistance'
      }).next('p');
      $statMP = $('.class-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === 'MP Recovery/Attack'
      }).next('p');
      $statCritD = $('.class-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === 'Crit DMG'
      }).next('p');
      $statDebuff = $('.class-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === 'Debuff ACC'
      }).next('p');

      $sq = $('.set').find('p').each(function() {
        if ($(this).is(':contains("Fire")')) {
          $f++;
        } else if ($(this).is(':contains("Frost")')) {
          $fr++;
        } else if ($(this).is(':contains("Poison")')) {
          $p++;
        } else if ($(this).is(':contains("Darkness")')) {
          $d++;
        } else if ($(this).is(':contains("Lava")')) {
          $la++;
        } else if ($(this).is(':contains("Legendary")')) {
          $le++;
        } else if ($(this).is(':contains("Suppression")')) {
          $s++;
        } else if ($(this).is(':contains("Protection")')) {
          $pr++;
        } else if ($(this).is(':contains("Legion")')) {
          $dl++;
        } else if ($(this).is(':contains("Chaos")')) {
          $ch++;
        } else if ($(this).is(':contains("Technomagic")')) {
          $t++;
        }
      });

      $statF = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'Crit'
      }).next('p');
      $statFr = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'MAX HP'
      }).next('p');
      $statP = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'P.Crit Resistance'
      }).next('p');
      $statM = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'M.Crit Resistance'
      }).next('p');
      $statD = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'MP Recovery/Attack'
      }).next('p');
      $statLa = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'Crit DMG'
      }).next('p');
      $statLe = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'Debuff ACC'
      }).next('p');

      if (($f > 1) && ($f < 4)) {
        $statF.text(parseInt($statCrit.text()) + 100 + ' (' + parseInt($statCrit.text()) + '+' + 100 + ')');
        if (($setBS == 0) || ($setBS == '2 Set: Crit +100'))
          $setBonus.text('2 Set: Crit +100');
        else
          // $setBonus.text($setBS + $setBS.split('4')[0]);
          $setBonus.text($setBS + '2 Set: Crit +100');
          // $setBonus.text('2 Set: Crit +100' + $setBS.split('4')[0]);
      } else if ($f == 4) {
        $statF.text(parseInt($statCrit.text()) + 230 + ' (' + parseInt($statCrit.text()) + '+' + 230 + ')');
        $setBonus.html('2 Set: Crit +100' + '<br>' + '4 Set: Crit +130');
      } else
        $($statF).text($statCrit.text());

      if (($fr > 1) && ($fr < 4)) {
        $qe = parseInt(Math.round($statGrey * 1.1));
        $statFr.text($qe + ' (' + parseInt($statHP.text()) + '+' + ($qe - parseInt($statHP.text())) + ')');
        if (($setBS == 0) || ($setBS == '2 Set: Max HP +10%'))
          $setBonus.text('2 Set: Max HP +10%');
        else
          // $setBonus.text($setBS + $setBS.split('4')[0]);
          $setBonus.text($setBS + '2 Set: Max HP +10%');
          // $setBonus.text('2 Set: Max HP +10%' + $setBS.split('4')[0]);
      } else if ($fr == 4) {
        $qe = parseInt(Math.round($statGrey * 1.23));
        $statFr.text($qe + ' (' + parseInt($statHP.text()) + '+' + ($qe - parseInt($statHP.text())) + ')');
        $setBonus.html('2 Set: Max HP +10%' + '<br>' + '4 Set: Max HP +13%');
      } else
        $statFr.text($('#heroHP').text());

      if (($p > 1) && ($p < 4)) {
        $statP.text(parseInt($statCritResP.text()) + 100 + ' (' + parseInt($statCritResP.text()) + '+' + 100 + ')');
        $statM.text(parseInt($statCritResM.text()) + 100 + ' (' + parseInt($statCritResM.text()) + '+' + 100 + ')');
        if ($setBS == 0)
          $setBonus.text('2 Set: Crit Resistance +100.');
        else
          $setBonus.text($setBS.split('4')[0]);
      } else if ($p == 4) {
        $statP.text(parseInt($statCritResP.text()) + 230 + ' (' + parseInt($statCritResP.text()) + '+' + 230 + ')');
        $statM.text(parseInt($statCritResM.text()) + 230 + ' (' + parseInt($statCritResM.text()) + '+' + 230 + ')');
        $setBonus.html('2 Set: Crit Resistance +100' + '<br>' + '4 Set: Crit Resistance +130');
      } else {
        $($statP).text($statCritResP.text());
        $($statM).text($statCritResM.text());
      }

      if (($d > 1) && ($d < 4)) {
        $statD.text(parseInt($statMP.text()) + 200 + ' (' + parseInt($statMP.text()) + '+' + 200 + ')');
        if ($setBS == 0)
          $setBonus.text('2 Set: MP Recovery/Attack +200.');
        else
          $setBonus.text($setBS.split('4')[0]);
      } else if ($d == 4) {
        $statD.text(parseInt($statMP.text()) + 460 + ' (' + parseInt($statMP.text()) + '+' + 460 + ')');
        $setBonus.html('2 Set: MP Recovery/Attack +200' + '<br>' + '4 Set: MP Recovery/Attack +260');
      } else
        $($statD).text($statMP.text());

      if (($la > 1) && ($la < 4)) {
        $statLa.text(parseInt($statCritD.text()) + 20 + '%' + ' (' + parseInt($statCritD.text()) + '+' + 20 + '%' + ')');
        if ($setBS == 0)
          $setBonus.text('2 Set: Crit DMG +20%.');
        else {
          $setBS = $setBonus.text().split('.')[1];
          $setBonus.html($setBS + '<br>' + '2 Set: Crit DMG +20%');
        }
      } else if ($la == 4) {
        $statLa.text(parseInt($statCritD.text()) + 46 + '%' + ' (' + parseInt($statCritD.text()) + '+' + 46 + '%' + ')');
        $setBonus.html('2 Set: Crit DMG +20%' + '<br>' + '4 Set: Crit DMG +26%');
      } else
        $($statLa).text($statCritD.text() + '%');

      if (($le > 1) && ($le < 4)) {
        $statLe.text(parseInt($statDebuff.text()) + 100 + ' (' + parseInt($statDebuff.text()) + '+' + 100 + ')');
        if ($setBS == 0)
          $setBonus.text('2 Set: Debuff ACC +100.');
        else {
          $setBS = $setBonus.text().split('.')[1];
          $setBonus.html($setBS + '<br>' + '2 Set: Debuff ACC +100');
        }
      } else if ($le == 4) {
        $statLe.text(parseInt($statDebuff.text()) + 230 + ' (' + parseInt($statDebuff.text()) + '+' + 230 + ')');
        $setBonus.html('2 Set: Debuff ACC +100' + '<br>' + '4 Set: Debuff ACC +130');
      } else
        $($statLe).text($statDebuff.text());

      if (($s > 1) && ($s < 4)) {
        if ($setBS == 0)
          $setBonus.text('2 Set: Increases DMG to Heroes by 7%.');
        else {
          $setBS = $setBonus.text().split('.')[1];
          $setBonus.html($setBS + '<br>' + '2 Set: Increases DMG to Heroes by 7%');
        }
      } else if ($s == 4)
        $setBonus.html('2 Set: Increases DMG to Heroes by 7%' + '<br>' + '4 Set: Increases DMG to Heroes by 13%');

      if (($pr > 1) && ($pr < 4)) {
        if ($setBS == 0)
          $setBonus.text('2 Set: Reduces DMG recevied from Heroes by 6%.');
        else {
          $setBS = $setBonus.text().split('.')[1];
          $setBonus.html($setBS + '<br>' + '2 Set: Reduces DMG recevied from Heroes by 6%');
        }
      } else if ($pr == 4)
        $setBonus.html('2 Set: Reduces DMG recevied from Heroes by 6%' + '<br>' + '4 Set: Reduces DMG recevied from Heroes by 11%');

      if (($dl > 1) && ($dl < 4)) {
        if ($setBS == 0)
          $setBonus.html('2 Set: Increases Crit DMG of all allies by 5%.');
        else {
          $setBS = $setBonus.text().split('.')[1];
          $setBonus.html($setBS + '<br>' + '2 Set: Increases Crit DMG of all allies by 5%');
        }
      } else if ($dl == 4)
        $setBonus.html('2 Set: Increases Crit DMG of all allies by 5%' + '<br>' + '4 Set: Increases Crit DMG of all allies by 8%');

      if (($ch > 1) && ($ch < 4)) {
        if ($setBS == 0)
          $setBonus.html('2 Set: Hero deals 12% more DMG and takes 12% less DMG from bosses.');
        else {
          $setBS = $setBonus.text().split('.')[1];
          $setBonus.html($setBS + '<br>' + '2 Set: Hero deals 12% more DMG and takes 12% less DMG from bosses');
        }
      } else if ($ch == 4)
        $setBonus.html('2 Set: Hero deals 12% more DMG and takes 12% less DMG from bosses' + '<br>' + '4 Set: Hero deals 15% more DMG and takes 15% less DMG from bosses');

      if (($t > 1) && ($t < 4)) {
        if ($setBS == 0)
          $setBonus.html('2 Set: Increases DMG dealt to enemies by 2%\n This effect increases by 4 times in the Technomagic Kingdom.');
        else {
          $setBS = $setBonus.text().split('.')[1];
          $setBonus.html($setBS + '<br>' + '2 Set: Increases DMG dealt to enemies by 2%\n This effect increases by 4 times in the Technomagic Kingdom');
        }
      } else if ($t == 4)
        $setBonus.html('2 Set: Increases DMG dealt to enemies by 2%\n This effect increases by 4 times in the Technomagic Kingdom' + '<br>' + '4 Set: Increases DMG dealt to enemies by 3%\n This effect increases by 4 times in the Technomagic Kingdom');
    // }); // $('.form-input select').change(function gearSet() {
    };

    $gearCalc = function() {
      gearStat();
      gearSet();
    }
    $('.form-input select').change($gearCalc);
    $('.rating label').click($gearCalc);
  });
}).call(this);
