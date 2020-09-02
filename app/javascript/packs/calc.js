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
      $('#heroHP').text($trsSt);
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
    $('.rating label').click(function() {
      $classATK = $('.class-stats .role' + $gearClass).find('p:contains("ATK")').next('p').text();
      $classHP = $('.class-stats .role' + $gearClass).find('p:contains("MAX HP")').next('p').text();
      $classPDEF = $('.class-stats .role' + $gearClass).find('p:contains("P.Def")').next('p').text();
      $classMDEF = $('.class-stats .role' + $gearClass).find('p:contains("M.Def")').next('p').text();

      $gearA = $('#heroATK').text();
      $gearH = $('#heroHP').text();
      $gearP = $('#heroPDEF').text();
      $gearM = $('#heroMDEF').text();
      $gearJ = $('#heroJ').text();
      $gearO = $('#heroO').text();

      $weapon = $('select#calc_gear_weapon').val();
      $treasure = $('select#calc_gear_treasure').val();
      $armor = $('select#calc_gear_armor').val();
      $secondary = $('select#calc_gear_secondary').val();
      $jewel = $('select#calc_gear_jewelry_type').val();
      $orb = $('select#calc_gear_orb').val();

      // atk
      if ($weapon !== '') {
        $atkSplt = 0;
        $totalA = $('.t-total .r-stats').find('p:contains("ATK")').next('p');
        if ($totalA.find(':contains("+")')) {
          $totalA.text().slice(0, -1).split('+')[1];
        }
        $atkSum = parseInt($atkSplt) + parseInt($gearA);
        $sumA = parseInt($classATK) + parseInt($atkSum);
        if ($gearA == '') {
          $totalA.text($classATK);
        } else {
          $totalA.text($sumA + ' (' + $classATK + '+' + $atkSum + ')');
        }
      }
      // hp
      if ($treasure == null) {
        $totalH = $classHP;
      } else {
        $hpSplt = 0;
        $totalH = $('.t-total .r-stats').find('p:contains("MAX HP")').next('p');
        if ($totalH.find(':contains("+")')) {
          $totalH.text().slice(0, -1).split('+')[1];
        }
        $hpSum = parseInt($hpSplt) + parseInt($gearH);
        $sumH = parseInt($classHP) + parseInt($hpSum);
        if ($gearH == '') {
          $totalH.text($classHP);
        } else {
          $totalH.text($sumH + ' (' + $classHP + '+' + $hpSum + ')');
        }
      }
      // p def
      if ($armor !== '') {
        $pdefSplt = 0;
        $totalP = $('.t-total .r-stats').find('p:contains("P.Def")').next('p');
        if ($totalP.find(':contains("+")')) {
          $totalP.text().slice(0, -1).split('+')[1];
        }
        $pdefSum = parseInt($pdefSplt) + parseInt($gearP);
        $sumP = parseInt($classPDEF) + parseInt($pdefSum);
        if ($gearP == '') {
          $totalP.text($classPDEF);
        } else {
          $totalP.text($sumP + ' (' + $classPDEF + '+' + $pdefSum + ')');
        }
      }
      // m def
      if ($secondary !== '') {
        $mdefSplt = 0;
        $totalM = $('.t-total .r-stats').find('p:contains("M.Def")').next('p');
        if ($totalM.find(':contains("+")')) {
          $totalM.text().slice(0, -1).split('+')[1];
        }
        $mdefSum = parseInt($mdefSplt) + parseInt($gearM);
        $sumM = parseInt($classMDEF) + parseInt($mdefSum);
        if ($gearM == '') {
          $totalM.text($classMDEF);
        } else {
          $totalM.text($sumM + ' (' + $classMDEF + '+' + $mdefSum + ')');
        }
      }
      // jewel
      if ($jewel !== '') {
        $totalJ = 0;
        $jewelSplt = 0;
        if ($jewel == 'Earrings') {
          $totalJ = $('.t-total .r-stats').find('p:contains("ATK")').next('p');
          $classStat = $classATK;
          $jwlCh = $gearA;
        } else if ($jewel == 'Ring') {
          $totalJ = $('.t-total .r-stats').find('p:contains("MAX HP")').next('p');
          $classStat = $classHP;
          $jwlCh = $gearH;
        } else if ($jewel == 'Necklace') {
          $totalJ = $('.t-total .r-stats').find('p:contains("M.Def")').next('p');
          $classStat = $classMDEF;
          $jwlCh = $gearM;
        } else if ($jewel == 'Bracelet') {
          $totalJ = $('.t-total .r-stats').find('p:contains("P.Def")').next('p');
          $classStat = $classPDEF;
          $jwlCh = $gearP;
        }
        if ($totalJ.find(':contains("+")')) {
          $jewelSplt = $totalJ.text().slice(0, -1).split('+')[1];
        }
        $jwlSum = parseInt($jewelSplt) + parseInt($gearJ);
        $sumJ = parseInt($classStat) + parseInt($jwlSum);
        if ($gearJ == '') {
          $totalJ.text($classStat);
        } else if (($gearJ !== '') && ($jwlCh == '')) {
          $totalJ.text((parseInt($classStat) + parseInt($gearJ)) + ' (' + $classStat + '+' + $gearJ + ')');
        } else {
          $totalJ.text($sumJ + ' (' + $classStat + '+' + $jwlSum + ')');
        }
      }
      // orb
      if ($orb !== '') {
        $orbSplt = 0;
        $totalO = $('.t-total .r-stats').find('p:contains("MAX HP")').next('p');
        if ($totalO.find(':contains("+")')) {
          $orbSplt = $totalO.text().slice(0, -1).split('+')[1];
        }
        $orbSum = parseInt($orbSplt) + parseInt($gearO);
        $sumO = parseInt($classHP) + parseInt($orbSum);
        if (($gearO == '') && ($gearH == '')) {
          $totalO.text($classHP);
        } else if (($gearO !== '') && ($gearH == '')) {
          $totalO.text((parseInt($classHP) + parseInt($gearO)) + ' (' + $classHP + '+' + $gearO + ')');
        } else {
          $totalO.text($sumO + ' (' + $classHP + '+' + $orbSum + ')');
        }
      }
    });
    // Set Bonus
    $('.form-input select').change(function() {
      $setBonus = 0;
      $a = $('#setAr').text();
      $s = $('#setScnd').text();
      $j = $('#setAcs').text();
      $o = $('#setOrb').text();
      if ($o == $j) {
        $setBonus = 2;
        // TEMP
        console.log($setBonus);
      // } else if () {
      //   $setBonus = 4;
      //   // TEMP
      //   console.log($setBonus);
      } else {
        console.log('meh');
      }
    });
  });
}).call(this);
