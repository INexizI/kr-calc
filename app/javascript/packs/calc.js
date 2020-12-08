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
      $('.hero-img').children().hide();
      $('.form-input .gSt p').text('');
      $('.form-input .gSt .rating').hide();
      $('.rating').find('label').removeClass('active');
      $('.c-perk-img').find('img').removeClass('pick');
      $('.perk-tp').find('p').text(0);
      $('.t-st p').empty();
      $('.gOption').hide();
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
          $('#calc_gear_jewelry').show(),
          $('#calc_gear_orb').parent().show(),
          $('#calc_gear_artifact').parent().show(),
          $('.form-input div select').show(),
          $('select').not(this).prop('selectedIndex', 0)
        ];
      } else {
        $('#calc_char_id').empty();
        return [
          $('#calc_char_id').parent().hide()
        ]
      }
    });

    // Hero
    $('select#calc_char_id').change(function() {
      $gearClass = $('#calc_role_id').children('option:selected').val();
      $classHP = $('.class-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === 'MAX HP'
      }).next('p').text();
      $('.t-total').find('.role' + $gearClass).find('p').filter(function() {
        return $(this).text() === 'MAX HP'
      }).next('p').text($classHP);
      $('.gOption').hide();
      $('.t-st p').empty();
      $('.form-input .gSt p').text('');
      $('.form-input .gSt .rating').hide();
      $('.rating').find('label').removeClass('active');
      $('.c-perk-img').find('img').removeClass('pick');
      $('.perk-tp').find('p').text(0);
      $('select').not('#calc_role_id, #calc_char_id').prop('selectedIndex', 0);
      statValue();
    }).change();

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
    $('select#calc_gear_weapon').change(function() {
      $('#heroATK').empty();
      $uw = null;
      $gearWeaponSlot = null;
      $clKn = 32730;$clWa = 37010;$clAs = 40711;$clAr = 45915;$clMe = 41867;$clWi = 42793;$clPr = 42793;$unKn = 45106;$unWa = 51120;$unAs = 56209;$unAr = 63264;$unMe = 57712;$unWi = 58985;$unPr = 58985;$arPl = 17052;$arSc = 11369;$arR = 5686;$scSh = 17052;$scC = 5686;$scH = 11369;$ms = 726278;$unTr = 1596066;$jR = 726278;$jE = 15801;$jB = 11369;$jN = 11369;$or = 726278;
      $gearWeaponType = $(this).children('option:selected').val();
      $gHero = $('#calc_char_id').children('option:selected').text().split(' ').join('');
      $gClass = $('#calc_role_id').children('option:selected').text();
      if ($gearWeaponType == 'Class') {
        $(this).css('background-image', 'url(/images/media/heroes/' + $gClass + '.png)');
        $('#wea').next('.rating').show();
        if ($gClass == 'Knight')
          $('#wea').text($clKn);
        else if ($gClass == 'Warrior')
          $('#wea').text($clWa);
        else if ($gClass == 'Assassin')
          $('#wea').text($clAs);
        else if ($gClass == 'Archer')
          $('#wea').text($clAr);
        else if ($gClass == 'Mechanic')
          $('#wea').text($clMe);
        else if ($gClass == 'Wizard')
          $('#wea').text($clWi);
        else if ($gClass == 'Priest')
          $('#wea').text($clPr);
      } else if ($gearWeaponType == 'Unique') {
        $(this).css('background-image', 'url(/images/media/heroes/' + $gHero + '/uw.png');
        $('#wea').next('.rating').show();
        if ($gClass == 'Knight')
          $('#wea').text($unKn);
        else if ($gClass == 'Warrior')
          $('#wea').text($unWa);
        else if ($gClass == 'Assassin')
          $('#wea').text($unAs);
        else if ($gClass == 'Archer')
          $('#wea').text($unAr);
        else if ($gClass == 'Mechanic')
          $('#wea').text($unMe);
        else if ($gClass == 'Wizard')
          $('#wea').text($unWi);
        else if ($gClass == 'Priest')
          $('#wea').text($unPr);
      } else {
        $(this).css('background-image', 'url(/images/media/gears/bg-weapon.png)');
        $('#wea').text('').next('.rating').hide();
      }
      $x = $('#wea').text();
      $('#greyATK').text($x);
      $('#uw label').filter('.active').removeClass('active');
    }).change();

    // Treasure
    $('select#calc_gear_treasure').change(function() {
      $('#heroHP').empty();
      $gearTreasureType = $(this).children('option:selected').val();
      $gHero = $('#calc_char_id').children('option:selected').text().split(' ').join('');
      if ($gearTreasureType == 'Mana Stone') {
        $eTr = {
          'width': '52px',
          'background-size': '50px 50px'
        }
        $(this).css('background-image', 'url(/images/media/gears/9-UT/mana.png)').css($eTr);
        $('#tre').text($ms).next('.rating').show();

        $('.calc_gear_treasure').next().next().show();
      } else if ($gearTreasureType == 'Unique') {
        $eTr1 = 'url(/images/media/heroes/' + $gHero + '/ut1.png)';
        $eTr2 = 'url(/images/media/heroes/' + $gHero + '/ut2.png)';
        $eTr3 = 'url(/images/media/heroes/' + $gHero + '/ut3.png)';
        $eTr4 = 'url(/images/media/heroes/' + $gHero + '/ut4.png)';
        $eTr = $eTr1 + ',' + $eTr2 + ',' + $eTr3 + ',' + $eTr4;
        $hTreasure = {
          'background-image': $eTr,
          'background-position': '0px, 52px, 104px, 156px',
          'background-repeat': 'no-repeat',
          'background-size': '52px 52px',
          'width': '210px'
        }
        $(this).css($hTreasure);
        $('#tre').text($unTr).next('.rating').show();
        $('.calc_gear_treasure').parent().find('.gOption').show();
      } else {
        $(this).css('background-image', 'url(/images/media/gears/bg-treasure.png)').css('width', '52px');
        $('#tre').text('').next('.rating').hide();
        $('.calc_gear_treasure').parent().find('.gOption').hide();
        $(this).parent().parent().find('.gOption select').prop('selectedIndex', 0).find('optgroup').hide();
      }
      $x = $('#tre').text();
      $('#greyTR').text($x);
      $('#ut label').filter('.active').removeClass('active');
    }).change();

    // Armor Tier
    $('select#calc_gear_armor').change(function() {
      $gType = null;
      $('#heroPDEF').empty();
      $('#setAr').text($(this).children('option:selected').text());
      $gearClass = $('#calc_role_id').children('option:selected').val();
      $gearTier = $(this).children('option:selected').val().toLowerCase();
      if ($gearTier !== '- - - - - - - - - -') {
        if (($gearClass == 1) || ($gearClass == 2)) {
          $gType = '1-1H';
          $('#arm').text($arPl);
      } else if (($gearClass == 3) || ($gearClass == 4) || ($gearClass == 5)) {
          $gType = '3-1L';
          $('#arm').text($arSc);
        } else if (($gearClass == 6) || ($gearClass == 7)) {
          $gType = '5-1I';
          $('#arm').text($arR);
        }
        $gearSet = $(this).children('option:selected').val();
        $(this).css('background-image', 'url(/images/media/gears/' + $gType + '/' + $gearSet.split(' ').join('') + '.png)');
        $('#arm').next('.rating').show();
        $('.calc_gear_armor').parent().find('.gOption').show();
      } else {
        $(this).css('background-image', 'url(/images/media/gears/bg-armor.png)');
        $('#arm').text('').next('.rating').hide();
        $('.calc_gear_armor').parent().find('.gOption').hide();
        $(this).parent().parent().find('.gOption select').prop('selectedIndex', 0).find('optgroup').hide();
      }
      $x = $('#arm').text();
      $('#greyPDEF').text($x);
      $('#ar label').filter('.active').removeClass('active');
    }).change();

    $('select#calc_st_armor').change(function() {
      $statName = $(this);
      $opt = $(this).parent().parent().find('.ay');
      $opt.prop('selectedIndex', 0).find('optgroup').hide();
      if ($(this).children('option:selected').text() !== '- - - - - - - - - -')
        statOption();
    });

    // Secondary Tier
    $('select#calc_gear_secondary').change(function() {
      $('#heroMDEF').empty();
      $('#setScnd').text($(this).children('option:selected').text());
      $gearTier = $(this).children('option:selected').val();
      $gearClass = $('#calc_role_id').children('option:selected').val();
      if ($gearTier !== '- - - - - - - - - -') {
        if (($gearClass == 1) || ($gearClass == 2)) {
          $gType = '2-2H';
          $('#sec').text($scSh);
        } else if (($gearClass == 3) || ($gearClass == 4) || ($gearClass == 5)) {
          $gType = '4-2L';
          $('#sec').text($scC);
        } else if (($gearClass == 6) || ($gearClass == 7)) {
          $gType = '6-2I';
          $('#sec').text($scH);
        }
        $gearSet = $(this).children('option:selected').val();
        $(this).css('background-image', 'url(/images/media/gears/' + $gType + '/' + $gearSet.split(' ').join('') + '.png)');
        $('#sec').next('.rating').show();
        $('.calc_gear_secondary').next().next().show();
      } else {
        $(this).css('background-image', 'url(/images/media/gears/bg-secondary.png)');
        $('#sec').text('').next('.rating').hide();
        $('.calc_gear_secondary').parent().find('.gOption').hide();
        $(this).parent().parent().find('.gOption select').prop('selectedIndex', 0).find('optgroup').hide();
      }
      $x = $('#sec').text();
      $('#greyMDEF').text($x);
      $('#sg label').filter('.active').removeClass('active');
    }).change();

    $('select#calc_st_secondary').change(function() {
      $statName = $(this);
      $opt = $(this).parent().parent().find('.ay');
      $opt.prop('selectedIndex', 0).find('optgroup').hide();
      if ($(this).children('option:selected').text() !== '- - - - - - - - - -')
        statOption();
    });

    // Jewelry Type
    $('select#calc_gear_jewelry').change(function() {
      $('#heroJ').empty();
      $('#setAcs').text($('#calc_gear_jewelry').children().children('option:selected').val());
      $gearTier = $('#calc_gear_jewelry').children().children('option:selected').val();
      $gearType = $('#calc_gear_jewelry').children().children('option:selected').parent().attr('label');
      if ($gearTier !== '- - - - - - - - - -') {
        if ($gearType == 'Ring')
          $('#acc').text($jR);
        else if ($gearType == 'Earrings')
          $('#acc').text($jE);
        else if ($gearType == 'Bracelet')
          $('#acc').text($jB);
        else if ($gearType == 'Necklace')
          $('#acc').text($jN);
        $gearSet = $(this).children().children('option:selected').val();
        $(this).css('background-image', 'url(/images/media/gears/7-J/' + $gearType + '/' + $gearSet.split(' ').join('') + '.png)');
        $('#acc').next('.rating').show();
        $('.calc_gear_jewelry').parent().find('.gOption').show();
      } else {
        $(this).css('background-image', 'url(/images/media/gears/bg-accessory.png)');
        $('#acc').text('').next('.rating').hide();
        $('.calc_gear_jewelry').parent().find('.gOption').hide();
        $(this).parent().parent().find('.gOption select').prop('selectedIndex', 0).find('optgroup').hide();
      }
      $x = $('#acc').text();
      $('#greyJ').text($x);
      $('#ac label').filter('.active').removeClass('active');
    }).change();

    $('select#calc_st_jewerly').change(function() {
      $statName = $(this);
      $opt = $(this).parent().parent().find('.ay');
      $opt.prop('selectedIndex', 0).find('optgroup').hide();
      if ($(this).children('option:selected').text() !== '- - - - - - - - - -')
        statOption();
    });

    // Orb Tier
    $('select#calc_gear_orb').change(function() {
      $('#heroO').empty();
      $('#setOrb').text($(this).children('option:selected').text());
      $gearClass = $('#calc_role_id').children('option:selected').val();
      $gearTier = $(this).children('option:selected').val().toLowerCase();
      if ($gearTier !== '- - - - - - - - - -') {
        $gearSet = $(this).children('option:selected').val();
        $(this).css('background-image', 'url(/images/media/gears/8-O/' + $gearSet.split(' ').join('') + '.png)');
        $('#orb').text($or).next('.rating').show();

        $('.calc_gear_orb').parent().find('.gOption').show();
      } else {
        $(this).css('background-image', 'url(/images/media/gears/bg-orb.png)');
        $('#orb').text('').next('.rating').hide();
        $('.calc_gear_orb').parent().find('.gOption').hide();
        $(this).parent().parent().find('.gOption select').prop('selectedIndex', 0).find('optgroup').hide();
      }
      $x = $('#orb').text();
      $('#greyO').text($x);
      $('#or label').filter('.active').removeClass('active');
    }).change();

    $('select#calc_st_orb').change(function() {
      $statName = $(this);
      $opt = $(this).parent().parent().find('.ay');
      $opt.prop('selectedIndex', 0).find('optgroup').hide();
      if ($(this).children('option:selected').text() !== '- - - - - - - - - -')
        statOption();
    });

    // Artifact
    $('select#calc_gear_artifact').change(function() {
      $(this).css('background-image', 'url(/images/media/gears/bg-art.png)');
      $('#art').text('').next('.rating').hide();
      $('#art label').filter('.active').removeClass('active');
    }).change();

    function weaponATK() {
      $uwStat = $('#greyATK').text();
      $star = $('#uw').find('.active').next('input').val();
      $gearClass = $('#calc_role_id').children('option:selected').val();
      $gearWeaponType = $('select#calc_gear_weapon').children('option:selected').val();
      if ($gearWeaponType == 'Unique') {
        if ($star == 0)
          $('#wea').text($uwStat);
        else if ($star == 1) {
          $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.1));
          if (($gearClass == 2) || ($gearClass == 4) || ($gearClass == 6) || ($gearClass == 7))
            $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.1) - 1);
        } else if ($star == 2) {
          $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.3));
          if ($gearClass == 5)
            $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.3) + 1);
        } else if ($star == 3) {
          $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.6));
          if (($gearClass == 2) || ($gearClass == 3) || ($gearClass == 4))
            $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.6) - 1);
          else if (($gearClass == 6) || ($gearClass == 7))
            $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.6) - 2);
        } else if ($star == 4) {
          $('#wea').text(2*Math.trunc(parseInt($uwStat)*0.999995));
          if (($gearClass == 6) || ($gearClass == 7))
            $('#wea').text(2*Math.trunc(parseInt($uwStat)*0.999995) - 1);
          else if ($gearClass == 5)
            $('#wea').text(2*Math.trunc(parseInt($uwStat)*0.999995) + 1);
        } else if ($star == 5) {
          $('#wea').text(2*Math.trunc(parseInt($uwStat)*0.999995) + Math.trunc(parseInt($uwStat)/2));
          if (($gearClass == 4) || ($gearClass == 6) || ($gearClass == 7))
            $('#wea').text(2*Math.trunc(parseInt($uwStat)*0.999995) + Math.trunc(parseInt($uwStat)/2) - 1);
        }
      } else if ($gearWeaponType == 'Class') {
        if ($star == 0)
          $('#wea').text($uwStat);
        else if ($star == 1) {
          $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.1));
          if (($gearClass == 5))
            $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.1) + 1);
          else if (($gearClass == 2) || ($gearClass == 3) || ($gearClass == 6) || ($gearClass == 7))
            $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.1) - 1);
        }
        else if ($star == 2) {
          $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.25));
          if ($gearClass == 1)
            $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.25) + 1);
          else if (($gearClass == 6) || ($gearClass == 7))
            $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.25) - 1);
        } else if ($star == 3) {
          $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.45));
          if ($gearClass == 1)
            $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.45) + 1);
        } else if ($star == 4) {
          $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.7));
          if (($gearClass == 1) || ($gearClass == 3) || ($gearClass == 4))
            $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.7) - 1);
          else if (($gearClass == 2) || ($gearClass == 6) || ($gearClass == 7))
            $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.7) - 2);
        } else if ($star == 5) {
          $('#wea').text(2*parseInt($uwStat));
          if (($gearClass == 2) || ($gearClass == 3) || ($gearClass == 6) || ($gearClass == 7))
            $('#wea').text(2*parseInt($uwStat) - 2);
          else if ($gearClass == 4)
            $('#wea').text(2*parseInt($uwStat) - 1);
          else if ($gearClass == 5)
            $('#wea').text(2*parseInt($uwStat) + 1);
        }
      }
    }
    function armorTR() {
      $trStat = $('#greyTR').text();
      $star = $('#ut').find('.active').next('input').val();
      $gearTreasureType = $('select#calc_gear_treasure').children('option:selected').val();
      if ($gearTreasureType == 'Unique') {
        if ($star == 0)
          $('#tre').text($trStat);
        else if ($star == 1) {
          $('#tre').text(parseInt($trStat) + Math.trunc(parseInt($trStat)*0.1) - 23);
        } else if ($star == 2) {
          $('#tre').text(parseInt($trStat) + Math.trunc(parseInt($trStat)*0.3) - 14);
        } else if ($star == 3) {
          $('#tre').text(parseInt($trStat) + Math.trunc(parseInt($trStat)*0.6) - 29);
        } else if ($star == 4) {
          $('#tre').text(2*Math.trunc(parseInt($trStat)*0.999995) - 52);
        } else if ($star == 5) {
          $('#tre').text(2*Math.trunc(parseInt($trStat)*0.999995) + Math.trunc(parseInt($trStat)/2) - 73);
        }
      } else if ($gearTreasureType == 'Mana Stone') {
        if ($star == 0)
          $('#tre').text($trStat);
        else if ($star == 1) {
          $('#tre').text(parseInt($trStat) + Math.trunc(parseInt($trStat)*0.1) + 1);
        } else if ($star == 2) {
          $('#tre').text(parseInt($trStat) + Math.trunc(parseInt($trStat)*0.2) + 1);
        } else if ($star == 3) {
          $('#tre').text(parseInt($trStat) + Math.trunc(parseInt($trStat)*0.3));
        } else if ($star == 4) {
          $('#tre').text(parseInt($trStat) + Math.trunc(parseInt($trStat)*0.4));
        } else if ($star == 5) {
          $('#tre').text(parseInt($trStat) + Math.trunc(parseInt($trStat)*0.5));
        }
      }
    }
    function armorPDEF() {
      $arStat = $('#greyPDEF').text();
      $star = $('#ar').find('.active').next('input').val();
      $gearClass = $('#calc_role_id').children('option:selected').val();
      if ($star == 0)
        $('#arm').text($arStat);
      else if ($star == 1) {
        $('#arm').text(parseInt($arStat) + Math.trunc(parseInt($arStat)*0.1) + 1);
      } else if ($star == 2) {
        $('#arm').text(parseInt($arStat) + Math.trunc(parseInt($arStat)*0.25) + 1);
      } else if ($star == 3) {
        if (($gearClass == 3) || ($gearClass == 4) || ($gearClass == 5))
          $('#arm').text(parseInt($arStat) + Math.trunc(parseInt($arStat)*0.45));
        else
          $('#arm').text(parseInt($arStat) + Math.trunc(parseInt($arStat)*0.45) + 1);
      } else if ($star == 4) {
        if (($gearClass == 6) || ($gearClass == 7))
          $('#arm').text(parseInt($arStat) + Math.trunc(parseInt($arStat)*0.7));
        else
          $('#arm').text(parseInt($arStat) + Math.trunc(parseInt($arStat)*0.7) + 1);
      } else if ($star == 5) {
        if (($gearClass == 6) || ($gearClass == 7))
          $('#arm').text(2*Math.trunc(parseInt($arStat)));
        else
          $('#arm').text(2*Math.trunc(parseInt($arStat)) + 1);
      }
    }
    function armorMDEF() {
      $sgStat = $('#greyMDEF').text();
      $star = $('#sg').find('.active').next('input').val();
      $gearClass = $('#calc_role_id').children('option:selected').val();
      if ($star == 0)
        $('#sec').text($sgStat);
      else if ($star == 1) {
        $('#sec').text(parseInt($sgStat) + Math.trunc(parseInt($sgStat)*0.1) + 1);
      } else if ($star == 2) {
        $('#sec').text(parseInt($sgStat) + Math.trunc(parseInt($sgStat)*0.25) + 1);
      } else if ($star == 3) {
        if (($gearClass == 6) || ($gearClass == 7))
          $('#sec').text(parseInt($sgStat) + Math.trunc(parseInt($sgStat)*0.45));
        else
          $('#sec').text(parseInt($sgStat) + Math.trunc(parseInt($sgStat)*0.45) + 1);
      } else if ($star == 4) {
        if (($gearClass == 3) || ($gearClass == 4) || ($gearClass == 5))
          $('#sec').text(parseInt($sgStat) + Math.trunc(parseInt($sgStat)*0.7));
        else
          $('#sec').text(parseInt($sgStat) + Math.trunc(parseInt($sgStat)*0.7) + 1);
      } else if ($star == 5) {
        if (($gearClass == 3) || ($gearClass == 4) || ($gearClass == 5))
          $('#sec').text(2*Math.trunc(parseInt($sgStat)));
        else
          $('#sec').text(2*Math.trunc(parseInt($sgStat)) + 1);
      }
    }
    function armorJ() {
      $acStat = $('#greyJ').text();
      $star = $('#ac').find('.active').next('input').val();
      $gearType = $('#calc_gear_jewelry').children().children('option:selected').parent().attr('label');
      if ($gearType == 'Ring') {
        if ($star == 0)
          $('#acc').text($acStat);
        else if ($star == 1) {
          $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.1) + 1);
        } else if ($star == 2) {
          $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.2) + 1);
        } else if ($star == 3) {
          $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.3));
        } else if ($star == 4) {
          $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.4));
        } else if ($star == 5) {
          $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.5));
        }
      } else if ($gearType == 'Earrings') {
        if ($star == 0)
          $('#acc').text($acStat);
        else if ($star == 1) {
          $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.1));
        } else if ($star == 2) {
          $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.2));
        } else if ($star == 3) {
          $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.3) + 1);
        } else if ($star == 4) {
          $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.4) + 1);
        } else if ($star == 5) {
          $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.5) + 1);
        }
      } else if (($gearType == 'Bracelet') || ($gearType == 'Necklace')) {
        if ($star == 0)
          $('#acc').text($acStat);
        else if ($star == 1) {
          $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.1) + 1);
        } else if ($star == 2) {
          $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.25) + 1);
        } else if ($star == 3) {
          $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.45));
        } else if ($star == 4) {
          $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.7) + 1);
        } else if ($star == 5) {
          $('#acc').text(2*Math.trunc(parseInt($acStat)) + 1);
        }
      }
    }
    function armorO() {
      $orStat = $('#greyO').text();
      $star = $('#or').find('.active').next('input').val();
      if ($star == 0)
        $('#orb').text($orStat);
      else if ($star == 1) {
        $('#orb').text(parseInt($orStat) + Math.trunc(parseInt($orStat)*0.1) + 1);
      } else if ($star == 2) {
        $('#orb').text(parseInt($orStat) + Math.trunc(parseInt($orStat)*0.2) + 1);
      } else if ($star == 3) {
        $('#orb').text(parseInt($orStat) + Math.trunc(parseInt($orStat)*0.3));
      } else if ($star == 4) {
        $('#orb').text(parseInt($orStat) + Math.trunc(parseInt($orStat)*0.4));
      } else if ($star == 5) {
        $('#orb').text(parseInt($orStat) + Math.trunc(parseInt($orStat)*0.5));
      }
    }
    function statOption() {
      $('.opt').find($statName).each(function() {
        $(this).parent().next().children().find('optgroup').hide();
        $st = $(this).children('option:selected').text();
        if (($st == 'ATK') || ($st == 'Max HP') || ($st == 'DEF'))
          $(this).parent().next().children().find('#q1').show();
        else if ($st == 'MP Recovery/Sec')
          $(this).parent().next().children().find('#q2').show();
        else if (($st == 'Crit DMG') || ($st == 'P.DEF') || ($st == 'M.DEF'))
          $(this).parent().next().children().find('#q3').show();
        else if (($st == 'ATK Spd') || ($st == 'Crit') || ($st == 'Lifesteal') || ($st == 'ACC') || ($st == 'Debuf ACC') || ($st == 'CC Resist') || ($st == 'Block') || ($st == 'Crit Resistance') || ($st == 'P.Dodge') || ($st == 'M.Dodge'))
          $(this).parent().next().children().find('#q4').show();
        else if (($st == 'MP Recovery/Attack') || ($st == 'P.Block') || ($st == 'M.Block') || ($st == 'P.Crit Resistance') || ($st == 'M.Crit Resistance'))
          $(this).parent().next().children().find('#q5').show();
        else if ($st == 'Penetration')
          $(this).parent().next().children().find('#q6').show();
        else if ($st == 'Dodge')
          $(this).parent().next().children().find('#q7').show();
      });
    }
    function statValue() {
      $ax = '<option value="">- - - - - - - - - -</option><option value="ATK">ATK</option><option value="ATK Spd">ATK Spd</option><option value="Crit">Crit</option><option value="Crit DMG">Crit DMG</option><option value="MP Recovery/Attack">MP Recovery/Attack</option><option value="MP Recovery/Sec">MP Recovery/Sec</option><option value="Penetration">Penetration</option><option value="Lifesteal">Lifesteal</option><option value="ACC">ACC</option><option value="Debuf ACC">Debuf ACC</option><option value="Max HP">Max HP</option><option value="CC Resist">CC Resist</option><option value="Block">Block</option><option value="P.Block">P.Block</option><option value="M.Block">M.Block</option><option value="Crit Resistance">Crit Resistance</option><option value="P.Crit Resistance">P.Crit Resistance</option><option value="M.Crit Resistance">M.Crit Resistance</option><option value="DEF">DEF</option><option value="P.DEF">P.DEF</option><option value="M.DEF">M.DEF</option><option value="Dodge">Dodge</option><option value="P.Dodge">P.Dodge</option><option value="M.Dodge">M.Dodge</option>'
      $aTr = '<option value="Tough">Tough</option><option value="P.Tough">P.Tough</option><option value="M.Tough">M.Tough</option><option value="Recovery">Recovery</option><option value="Mana Recovery upon taking DMG">Mana Recovery upon taking DMG</option><option value="DMG Reduction upon Block">DMG Reduction upon Block</option><option value="DMG Reduction upon P.Block">DMG Reduction upon P.Block</option><option value="DMG Reduction upon M.Block">DMG Reduction upon M.Block</option>'
      $ay = '<optgroup id="q"><option value="0">- - - </option></optgroup><optgroup id="q1" label="Stat"></option><option value="7">7</option><option value="7.5">7.5</option><option value="8">8</option><option value="8.5">8.5</option><option value="9">9</option><option value="9.5">9.5</option><option value="10">10</option><option value="10.5">10.5</option><option value="11">11</option><option value="11.5">11.5</option><option value="12">12</option></optgroup><optgroup id="q2" label="Stat"><option value="21">21</option><option value="22.5">22.5</option><option value="24">24</option><option value="25.5">25.5</option><option value="27">27</option><option value="28.5">28.5</option><option value="30">30</option><option value="31.5">31.5</option><option value="33">33</option><option value="34.5">34.5</option><option value="36">36</option></optgroup><optgroup id="q3" label="Stat"><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option></optgroup><optgroup id="q4" label="Stat"><option value="70">70</option><option value="75">75</option><option value="80">80</option><option value="85">85</option><option value="90">90</option><option value="95">95</option><option value="100">100</option><option value="105">105</option><option value="110">110</option><option value="115">115</option><option value="120">120</option></optgroup><optgroup id="q5" label="Stat"><option value="140">140</option><option value="150">150</option><option value="160">160</option><option value="170">170</option><option value="180">180</option><option value="190">190</option><option value="200">200</option><option value="210">210</option><option value="220">220</option><option value="230">230</option><option value="240">240</option></optgroup><optgroup id="q6" label="Stat"><option value="60">60</option><option value="65">65</option><option value="70">70</option><option value="75">75</option><option value="80">80</option><option value="85">85</option><option value="90">90</option><option value="95">95</option><option value="100">100</option><option value="105">105</option><option value="110">110</option></optgroup><optgroup id="q7" label="Stat"><option value="35">35</option><option value="37">37</option><option value="40">40</option><option value="42">42</option><option value="45">45</option><option value="47">47</option><option value="50">50</option><option value="52">52</option><option value="55">55</option><option value="57">57</option><option value="60">60</option></optgroup>'
      $('.opt').find('.ax').each(function() {
        $(this).html($ax);
      });
      $('.opt').find('.ay').each(function() {
        $(this).html($ay);
      });
      $('.opt').find('#calc_st_treasure').each(function() {
        $(this).html($ax + $aTr);
      });
    }

    // Sum Stat
    function gearStat() {
      weaponATK();
      armorTR();
      armorPDEF();
      armorMDEF();
      armorJ();
      armorO();

      $('#heroATK').text($('#wea').text());
      $('#heroTR').text($('#tre').text());
      $('#heroPDEF').text($('#arm').text());
      $('#heroMDEF').text($('#sec').text());
      $('#heroJ').text($('#acc').text());
      $('#heroO').text($('#orb').text());
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
      $classCrit = $('.class-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === 'Crit'
      }).next('p').text();
      $classCritDMG = $('.class-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === 'Crit DMG'
      }).next('p').text();
      $classMPA = $('.class-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === 'MP Recovery/Attack'
      }).next('p').text();
      $classMPS = $('.class-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === 'MP Recovery/Sec'
      }).next('p').text();
      $classPenetration = $('.class-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === 'Penetration'
      }).next('p').text();
      $classLifesteal = $('.class-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === 'Lifesteal'
      }).next('p').text();
      $classACC = $('.class-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === 'ACC'
      }).next('p').text();
      $classDACC = $('.class-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === 'Debuf ACC'
      }).next('p').text();
      $classCC = $('.class-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === ''
      }).next('p').text();
      $classB = $('.class-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === ''
      }).next('p').text();
      $classPB = $('.class-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === ''
      }).next('p').text();
      $classMB = $('.class-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === ''
      }).next('p').text();
      $classCR = $('.class-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === ''
      }).next('p').text();
      $classPCR = $('.class-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === ''
      }).next('p').text();
      $classMCR = $('.class-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === ''
      }).next('p').text();
      $classD = $('.class-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === ''
      }).next('p').text();
      $classPD = $('.class-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === ''
      }).next('p').text();
      $classMD = $('.class-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === ''
      }).next('p').text();
      $classT = $('.class-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === ''
      }).next('p').text();
      $classPT = $('.class-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === ''
      }).next('p').text();
      $classMT = $('.class-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === ''
      }).next('p').text();
      $classRec = $('.class-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === ''
      }).next('p').text();
      $classManaRec = $('.class-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === ''
      }).next('p').text();
      $classRed = $('.class-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === ''
      }).next('p').text();
      $classPRed = $('.class-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === ''
      }).next('p').text();
      $classMRed = $('.class-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === 'DMG Reduction upon M.Block'
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
      $jewel = $('select#calc_gear_jewelry').children().children('option:selected').parent().attr('label');
      $orb = $('select#calc_gear_orb').val();

      // atk
      $totalA = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'ATK'
      }).next('p');
      ($jewel == 'Earrings') ? $sumAtk = parseInt($classATK) + parseInt($gearA) + parseInt($gearJ) : $sumAtk = parseInt($classATK) + parseInt($gearA);
      $opA = $('p[name="ATK"]').text();
      ($opA === '') ? $totalA.text(parseInt($sumAtk) + ' (' + $classATK + '+' + (parseInt($sumAtk) - $classATK) + ')') : $totalA.text(parseInt($sumAtk * ($opA / 100 + 1)) + ' (' + $classATK + '+' + (parseInt($sumAtk * ($opA / 100 + 1)) - $classATK) + ')');

      // hp
      $totalH = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'MAX HP'
      }).next('p');
      ($jewel == 'Ring') ? $sumTre = parseInt($classHP) + parseInt($gearTr) + parseInt($gearJ) + parseInt($gearO) : $sumTre = parseInt($classHP) + parseInt($gearTr) + parseInt($gearO);
      $opH = $('p[name="Max HP"]').text();
      ($opH === '') ? $totalH.text(parseInt($sumTre) + ' (' + $classHP + '+' + (parseInt($sumTre) - $classHP) + ')') : $totalH.text(parseInt($sumTre * ($opH / 100 + 1)) + ' (' + $classHP + '+' + (parseInt($sumTre * ($opH / 100 + 1)) - $classHP) + ')');
      $('#heroHP').text($totalH.text());
      $('#heroHPs').text($totalH.text().split(' ')[0]);

      // p def
      $totalP = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'P.Def'
      }).next('p');
      if ($armor !== '- - - - - - - - - -') {
        $sumArm = parseInt($classPDEF) + parseInt($gearP) + parseInt($gearJ);
        if ($gearP !== 0) {
          if ($jewel == 'Bracelet') {
            if ($gearJ == 0)
              $totalP.text($sumArm + ' (' + $classPDEF + '+' + $gearP + ')');
            else
              $totalP.text($sumArm + ' (' + $classPDEF + '+' + (parseInt($gearP) + parseInt($gearJ)) + ')');
          } else
            $totalP.text((parseInt($classPDEF) + parseInt($gearP)) + ' (' + $classPDEF + '+' + $gearP + ')');
        }
      } else
        $totalP.text($classPDEF);

      // m def
      $totalM = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'M.Def'
      }).next('p');
      if ($secondary !== '- - - - - - - - - -') {
        $sumSec = parseInt($classMDEF) + parseInt($gearM) + parseInt($gearJ);
        if ($gearM !== 0) {
          if ($jewel == 'Necklace') {
            if ($gearJ == 0)
              $totalM.text($sumSec + parseInt($gearM) + ' (' + $classMDEF + '+' + $gearM + ')');
            else if ($gearJ !== 0)
              $totalM.text($sumSec + ' (' + $classMDEF + '+' + (parseInt($gearM) + parseInt($gearJ)) + ')');
          } else
            $totalM.text((parseInt($classMDEF) + parseInt($gearM)) + ' (' + $classMDEF + '+' + $gearM + ')');
        }
      } else
        $totalM.text($classMDEF);

      // jewel
      if ($jewel !== '- - - - - - - - - -') {
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
          $sumAcc = parseInt($classHP) + parseInt($gearTr) + parseInt($gearJ) + parseInt($gearO);
        }
        else if ($jewel == 'Earrings') {
          $sumAcc = parseInt($classATK) + parseInt($gearA) + parseInt($gearJ);
        }
        else if ($jewel == 'Necklace') {
          $sumAcc = parseInt($classMDEF) + parseInt($gearM) + parseInt($gearJ);
        }
        else if ($jewel == 'Bracelet') {
          $sumAcc = parseInt($classPDEF) + parseInt($gearP) + parseInt($gearJ);
        }

        if ($gearJ !== 0) {
          if ($jewel == 'Ring') {
            $opJ = $('p[name="Max HP"]').text();
            ($opJ === '') ? $totalJ.text(parseInt($sumAcc) + ' (' + $classHP + '+' + (parseInt($sumAcc) - $classHP) + ')') : $totalJ.text(parseInt($sumAcc * ($opJ / 100 + 1)) + ' (' + $classHP + '+' + (parseInt($sumAcc * ($opJ / 100 + 1)) - $classHP) + ')');
            $('#heroHP').text($totalJ.text());
            $('#heroHPs').text($totalJ.text().split(' ')[0]);
          } else if ($jewel == 'Earrings') {
            $opJ = $('p[name="ATK"]').text();
            ($opJ === '') ? $totalJ.text(parseInt($sumAcc) + ' (' + $classHP + '+' + (parseInt($sumAcc) - $classHP) + ')') : $totalJ.text(parseInt($sumAcc * ($opJ / 100 + 1)) + ' (' + $classHP + '+' + (parseInt($sumAcc * ($opJ / 100 + 1)) - $classHP) + ')');
          } else if ($jewel == 'Necklace') {
            $opJ = $('p[name="M.DEF"]').text();
            ($opJ === '') ? $totalJ.text(parseInt($sumAcc) + ' (' + $classHP + '+' + (parseInt($sumAcc) - $classHP) + ')') : $totalJ.text(parseInt($sumAcc * ($opJ / 100 + 1)) + ' (' + $classHP + '+' + (parseInt($sumAcc * ($opJ / 100 + 1)) - $classHP) + ')');
          } else if ($jewel == 'Bracelet') {
            $opJ = $('p[name="P.DEF"]').text();
            ($opJ === '') ? $totalJ.text(parseInt($sumAcc) + ' (' + $classHP + '+' + (parseInt($sumAcc) - $classHP) + ')') : $totalJ.text(parseInt($sumAcc * ($opJ / 100 + 1)) + ' (' + $classHP + '+' + (parseInt($sumAcc * ($opJ / 100 + 1)) - $classHP) + ')');
          }
        }
      }

      // orb
      $totalO = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'MAX HP'
      }).next('p');
      ($jewel == 'Ring') ? $sumOrb = parseInt($classHP) + parseInt($gearTr) + parseInt($gearJ) + parseInt($gearO) : $sumOrb = parseInt($classHP) + parseInt($gearTr) + parseInt($gearO);
      $opO = $('p[name="Max HP"]').text();
      ($opO === '') ? $totalO.text(parseInt($sumOrb) + ' (' + $classHP + '+' + (parseInt($sumOrb) - $classHP) + ')') : $totalO.text(parseInt($sumOrb * ($opO / 100 + 1)) + ' (' + $classHP + '+' + (parseInt($sumOrb * ($opO / 100 + 1)) - $classHP) + ')');
      $('#heroHP').text($totalO.text());
      $('#heroHPs').text($totalO.text().split(' ')[0]);
    };

    // Set Bonus
    function gearSet() {
      $gearClass = $('#calc_role_id').children('option:selected').val();
      $setBonus = $('.t-total .r-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === 'Set Bonus'
      }).next('p');
      if (!$setBonus.length)
        $setBonus = $('.t-total .r-stats .role' + $gearClass).append('<div class="statSet"><div class="r-set"><p id="s-name">Set Bonus</p><p id="sb"><span id="f1">2 Set: Crit +100</span><span id="f2">4 Set: Crit +130</span><span id="fr1">2 Set: Max HP +10%</span><span id="fr2">4 Set: Max HP +13%</span><span id="p1">2 Set: Crit Resistance +100</span><span id="p2">4 Set: Crit Resistance +130</span><span id="d1">2 Set: MP Recovery/Attack +200</span><span id="d2">4 Set: MP Recovery/Attack +260</span><span id="la1">2 Set: Crit DMG +20%</span><span id="la2">4 Set: Crit DMG +26%</span><span id="le1">2 Set: Debuf ACC +100</span><span id="le2">4 Set: Debuf ACC +130</span><span id="s1">2 Set: Increases DMG to Heroes by 7%</span><span id="s2">4 Set: Increases DMG to Heroes by 13%</span><span id="pr1">2 Set: Reduces DMG recevied from Heroes by 6%</span><span id="pr2">4 Set: Reduces DMG recevied from Heroes by 11%</span><span id="dl1">2 Set: Increases Crit DMG of all allies by 5%</span><span id="dl2">4 Set: Increases Crit DMG of all allies by 8%</span><span id="ch1">2 Set: Hero deals 12% more DMG and takes 12% less DMG from bosses</span><span id="ch2">4 Set: Hero deals 15% more DMG and takes 15% less DMG from bosses</span><span id="t1">2 Set: Increases DMG dealt to enemies by 2%\n This effect increases by 4 times in the Technomagic Kingdom</span><span id="t2">4 Set: Increases DMG dealt to enemies by 3%\n This effect increases by 4 times in the Technomagic Kingdom</span></p></div></div>');
      $setBonus.find('span').hide();
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
      $statDebuf = $('.class-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === 'Debuf ACC'
      }).next('p');

      $f = 0;$fr = 0;$p = 0;$d = 0;$la = 0;$le = 0;$ch = 0;$s = 0;$pr = 0;$dl = 0;$t = 0;
      $sq = $('.set').find('p').each(function() {
        if ($(this).is(':contains("Fire")'))
          $f++;
        else if ($(this).is(':contains("Frost")'))
          $fr++;
        else if ($(this).is(':contains("Poison")'))
          $p++;
        else if ($(this).is(':contains("Darkness")'))
          $d++;
        else if ($(this).is(':contains("Lava")'))
          $la++;
        else if ($(this).is(':contains("Legendary")'))
          $le++;
        else if ($(this).is(':contains("Suppression")'))
          $s++;
        else if ($(this).is(':contains("Protection")'))
          $pr++;
        else if ($(this).is(':contains("Legion")'))
          $dl++;
        else if ($(this).is(':contains("Chaos")'))
          $ch++;
        else if ($(this).is(':contains("Technomagic")'))
          $t++;
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
        return $(this).text() === 'Debuf ACC'
      }).next('p');

      $stCrit = $('p[name="Crit"]').text();
      if ($stCrit === '')
        $stCrit = 0;
      $sumCrit = parseInt($statF.text()) + parseInt($stCrit);
      if (($f > 1) && ($f < 4)) {
        $statF.text($statF.text() + 100 + ' (' + $statF.text() + '+' + (parseInt($stCrit) + 100) + ')');
        $setBonus.find('#f1').show();
      }
      else if ($f == 4) {
        $statF.text($statF.text() + 230 + ' (' + $statF.text() + '+' + (parseInt($stCrit) + 230) + ')');
        $setBonus.find('#f1, #f2').show();
      } else
        $statF.text($statF.text() + ' (' + $statF.text() + '+' + $stCrit + ')');

      if (($fr > 1) && ($fr < 4)) {
        $qe = parseInt(Math.round($statGrey * 1.1));
        $statFr.text($qe + ' (' + parseInt($statHP.text()) + '+' + ($qe - parseInt($statHP.text())) + ')');
        $setBonus.find('#fr1').show();
      } else if ($fr == 4) {
        $qe = parseInt(Math.round($statGrey * 1.23));
        $statFr.text($qe + ' (' + parseInt($statHP.text()) + '+' + ($qe - parseInt($statHP.text())) + ')');
        $setBonus.find('#fr1, #fr2').show();
      } else if ($fr == 1) {
        $statFr.text($('#heroHP').text());
      }

      if (($p > 1) && ($p < 4)) {
        $statP.text(parseInt($statCritResP.text()) + 100 + ' (' + parseInt($statCritResP.text()) + '+' + 100 + ')');
        $statM.text(parseInt($statCritResM.text()) + 100 + ' (' + parseInt($statCritResM.text()) + '+' + 100 + ')');
        $setBonus.find('#p1').show();
      } else if ($p == 4) {
        $statP.text(parseInt($statCritResP.text()) + 230 + ' (' + parseInt($statCritResP.text()) + '+' + 230 + ')');
        $statM.text(parseInt($statCritResM.text()) + 230 + ' (' + parseInt($statCritResM.text()) + '+' + 230 + ')');
        $setBonus.find('#p1, #p2').show();
      } else {
        $($statP).text($statCritResP.text());
        $($statM).text($statCritResM.text());
      }

      if (($d > 1) && ($d < 4)) {
        $statD.text(parseInt($statMP.text()) + 200 + ' (' + parseInt($statMP.text()) + '+' + 200 + ')');
        $setBonus.find('#d1').show();
      } else if ($d == 4) {
        $statD.text(parseInt($statMP.text()) + 460 + ' (' + parseInt($statMP.text()) + '+' + 460 + ')');
        $setBonus.find('#d1, #d2').show();
      } else if ($d == 1)
        $($statD).text($statMP.text());

      if (($la > 1) && ($la < 4)) {
        $statLa.text(parseInt($statCritD.text()) + 20 + '%' + ' (' + parseInt($statCritD.text()) + '+' + 20 + '%' + ')');
        $setBonus.find('#la1').show();
      } else if ($la == 4) {
        $statLa.text(parseInt($statCritD.text()) + 46 + '%' + ' (' + parseInt($statCritD.text()) + '+' + 46 + '%' + ')');
        $setBonus.find('#la1, #la2').show();
      } else if ($la == 1)
        $($statLa).text($statCritD.text());

      if (($le > 1) && ($le < 4)) {
        $statLe.text(parseInt($statDebuf.text()) + 100 + ' (' + parseInt($statDebuf.text()) + '+' + 100 + ')');
        $setBonus.find('#le1').show();
      } else if ($le == 4) {
        $statLe.text(parseInt($statDebuf.text()) + 230 + ' (' + parseInt($statDebuf.text()) + '+' + 230 + ')');
        $setBonus.find('#le1, #le2').show();
      } else if ($le == 1)
        $($statLe).text($statDebuf.text());

      if (($s > 1) && ($s < 4))
        $setBonus.find('#s1').show();
      else if ($s == 4)
        $setBonus.find('#s1, #s2').show();

      if (($pr > 1) && ($pr < 4))
        $setBonus.find('#pr1').show();
      else if ($pr == 4)
        $setBonus.find('#pr1, #pr2').show();

      if (($dl > 1) && ($dl < 4))
        $setBonus.find('#dl1').show();
      else if ($dl == 4)
        $setBonus.find('#dl1, #dl2').show();

      if (($ch > 1) && ($ch < 4))
        $setBonus.find('#ch1').show();
      else if ($ch == 4)
        $setBonus.find('#ch1, #ch2').show();

      if (($t > 1) && ($t < 4))
        $setBonus.find('#t1').show();
      else if ($t == 4)
        $setBonus.find('#t1, #t2').show();

      $('.t-total .r-stats .role' + $gearClass).find('p').each(function() {
        $zeroStat = $(this).text();
        ($zeroStat === '0') ? $(this).hide().prev('p').hide().parent().css('height', 0) : $(this).show().prev('p').show().parent().css('height', '25px');
      });
      $('.t-total .role' + $gearClass).find('p:contains(" (")').each(function() {
        $statSplit = $(this);
        ($statSplit.text().split('(').pop().slice(0, -1).split('+').pop() == 0) ? $statSplit.html($statSplit.text().split(' ').shift()) : $statSplit.html('<span id="plsSt1">' + $statSplit.text().split(' ').shift() + '</span>' + ' (' + $statSplit.text().split('(').pop().slice(0, -1).split('+').shift() + '<span id="plsSt2">' + '+' + $statSplit.text().split('(').pop().slice(0, -1).split('+').pop() + '</span>' + ')');
      });
    };

    function heroImg() {
      $('.hero-img').children().hide();
      $heroImg = $('#calc_char_id').children('option:selected').val();
      $('.hero-img').find('.hero-' + $heroImg).css('display', 'block');
    };

    function perkTP() {
      $tp_1 = 0;
      $tp_2 = 0;
      $tp_3 = 0;
      $tp_5 = 0;
      $perkHero = $('#calc_char_id').children('option:selected').val();
      $('.hero-img .hero-' + $perkHero).find('.c-p').each(function() {
        $perkTier = $(this).attr('id');
        if ($perkTier == 'perk-t1') {
          $(this).find('.pick').each(function() {
            $tp_1 += 10;
          });
        } else if ($perkTier == 'perk-t2') {
          $(this).find('.pick').each(function() {
            $tp_2 += 15;
          });
        } else if ($perkTier == 'perk-t3') {
          $(this).find('.pick').each(function() {
            $tp_3 += 15;
          });
        } else if ($perkTier == 'perk-t5') {
          $(this).find('.pick').each(function() {
            $tp_5 += 15;
          });
        }
      });
    };

    $('.heroPerk .c-sub img').click(function() {
      $perkId = $(this).attr('id');
      $perkCl = $(this);
      if ($perkCl.lenght == null) {
        if ($perkId.slice(2) == 'd')
          $(this).toggleClass('pick').parent().prev('.c-perk-img').find('img').removeClass('pick');
        else if ($perkId.slice(2) == 'l')
          $(this).toggleClass('pick').parent().next('.c-perk-img').find('img').removeClass('pick');
        else
          $(this).toggleClass('pick');
      } else
        $(this).toggleClass('pick');

      perkTP();
      $tp = parseInt($tp_1) + parseInt($tp_2) + parseInt($tp_3) + parseInt($tp_5);
        if ($tp == 0)
          $('.perk-tp p').css('color', 'black');
        else if (($tp > 0) && ($tp < 100))
          $('.perk-tp p').css('color', 'greenyellow');
        else if ($tp > 95) {
          $('.perk-tp p').css('color', 'darkred');
          alert('Not Enogh TP');
        }
      $('.perk-tp p').text($tp);
    });

    function hideOption() {
      $('option:contains("----------")').attr('disabled', 'disabled');
    };

    function hideGearImage() {
      $trCss = {
        'background-image': 'url(/images/media/gears/bg-treasure.png)',
        'width': '52px'
      }
      return [
        $('select#calc_gear_weapon').css('background-image', 'url(/images/media/gears/bg-weapon.png)'),
        $('select#calc_gear_treasure').css($trCss),
        $('select#calc_gear_armor').css('background-image', 'url(/images/media/gears/bg-armor.png)'),
        $('select#calc_gear_secondary').css('background-image', 'url(/images/media/gears/bg-secondary.png)'),
        $('select#calc_gear_jewelry').css('background-image', 'url(/images/media/gears/bg-accessory.png)'),
        $('select#calc_gear_orb').css('background-image', 'url(/images/media/gears/bg-orb.png)'),
        $('select#calc_gear_artifact').css('background-image', 'url(/images/media/gears/bg-art.png)')
      ]
    }

    $('#ut-check label').click(function() {
      $(this).toggleClass('on');
      if ($(this).attr('class').split(' ').pop() == 'on')
        $(this).parent().next('div').slideDown('fast');
      else
        $(this).parent().next('div').slideUp('fast');
    });
    $('.ut-stat label').click(function() {
      $(this).toggleClass('on');
      if ($(this).attr('class').split(' ').pop() == 'on')
        $(this).parent().next('div').fadeIn('fast');
      else
        $(this).parent().next('div').fadeOut('fast');
    });

    $gearImg = function() {
      hideGearImage();
    }

    // ???
    function option() {
      $c=0;
      $sAtk=0;$sAspd=0;$sCr=0;$sCrD=0;$sMPa=0;$sMPs=0;$sPen=0;$sLif=0;$sAcc=0;$sDAcc=0;$sHP=0;$sCC=0;$sBl=0;$sPBl=0;$sMBl=0;$sCR=0;$sPCR=0;$sMCR=0;$sDef=0;$sPDef=0;$sMDef=0;$sDod=0;$sPDod=0;$sMDod=0;$sTgh=0;$sPTgh=0;$sMTgh=0;$sRec=0;$sMRec=0;$sDRB=0;$sDRPB=0;$sDRMB=0;
      $('.t-op p').empty();
      $x = $('.opt .ax').serializeArray();
      $y = $('.opt .ay').serializeArray();
      $.each($x, function(iX, n) {
        $c = $('.opt .ay').serializeArray()[iX];
        if (n.value == 'ATK') {
          $sAtk += Number(parseFloat($c.value));
          $('.totalStat').find('p[name="ATK"]').text($sAtk);
        } else if (n.value == 'ATK Spd') {
          $sAspd += Number(parseFloat($c.value));
          $('.totalStat').find('p[name="ATK Spd"]').text($sAspd);
        } else if (n.value == 'Crit') {
          $sCr += Number(parseFloat($c.value));
          $('.totalStat').find('p[name="Crit"]').text($sCr);
        } else if (n.value == 'Crit DMG') {
          $sCrD += Number(parseFloat($c.value));
          $('.totalStat').find('p[name="Crit DMG"]').text($sCrD);
        } else if (n.value == 'MP Recovery/Attack') {
          $sMPa += Number(parseFloat($c.value));
          $('.totalStat').find('p[name="MP Recovery/Attack"]').text($sMPa);
        } else if (n.value == 'MP Recovery/Sec') {
          $sMPs += Number(parseFloat($c.value));
          $('.totalStat').find('p[name="MP Recovery/Sec"]').text($sMPs);
        } else if (n.value == 'Penetration') {
          $sPen += Number(parseFloat($c.value));
          $('.totalStat').find('p[name="Penetration"]').text($sPen);
        } else if (n.value == 'Lifesteal') {
          $sLif += Number(parseFloat($c.value));
          $('.totalStat').find('p[name="Lifesteal"]').text($sLif);
        } else if (n.value == 'ACC') {
          $sAcc += Number(parseFloat($c.value));
          $('.totalStat').find('p[name="ACC"]').text($sAcc);
        } else if (n.value == 'Debuf ACC') {
          $sDAcc += Number(parseFloat($c.value));
          $('.totalStat').find('p[name="Debuf ACC"]').text($sDAcc);
        } else if (n.value == 'Max HP') {
          $sHP += Number(parseFloat($c.value));
          $('.totalStat').find('p[name="Max HP"]').text($sHP);
        } else if (n.value == 'CC Resist') {
          $sCC += Number(parseFloat($c.value));
          $('.totalStat').find('p[name="CC Resist"]').text($sCC);
        } else if (n.value == 'Block') {
          $sBl += Number(parseFloat($c.value));
          $('.totalStat').find('p[name="Block"]').text($sBl);
        } else if (n.value == 'P.Block') {
          $sPBl += Number(parseFloat($c.value));
          $('.totalStat').find('p[name="P.Block"]').text($sPBl);
        } else if (n.value == 'M.Block') {
          $sMBl += Number(parseFloat($c.value));
          $('.totalStat').find('p[name="M.Block"]').text($sMBl);
        } else if (n.value == 'Crit Resistance') {
          $sCR += Number(parseFloat($c.value));
          $('.totalStat').find('p[name="Crit Resistance"]').text($sCR);
        } else if (n.value == 'P.Crit Resistance') {
          $sPCR += Number(parseFloat($c.value));
          $('.totalStat').find('p[name="P.Crit Resistance"]').text($sPCR);
        } else if (n.value == 'M.Crit Resistance') {
          $sMCR += Number(parseFloat($c.value));
          $('.totalStat').find('p[name="M.Crit Resistance"]').text($sMCR);
        } else if (n.value == 'DEF') {
          $sDef += Number(parseFloat($c.value));
          $('.totalStat').find('p[name="DEF"]').text($sDef);
        } else if (n.value == 'P.DEF') {
          $sPDef += Number(parseFloat($c.value));
          $('.totalStat').find('p[name="P.DEF"]').text($sPDef);
        } else if (n.value == 'M.DEF') {
          $sMDef += Number(parseFloat($c.value));
          $('.totalStat').find('p[name="M.DEF"]').text($sMDef);
        } else if (n.value == 'Dodge') {
          $sDod += Number(parseFloat($c.value));
          $('.totalStat').find('p[name="Dodge"]').text($sDod);
        } else if (n.value == 'P.Dodge') {
          $sPDod += Number(parseFloat($c.value));
          $('.totalStat').find('p[name="P.Dodge"]').text($sPDod);
        } else if (n.value == 'M.Dodge') {
          $sMDod += Number(parseFloat($c.value));
          $('.totalStat').find('p[name="M.Dodge"]').text($sMDod);
        } else if (n.value == 'Tough') {
          $sTgh += Number(parseFloat($c.value));
          $('.totalStat').find('p[name="Tough"]').text($sTgh);
        } else if (n.value == 'P.Tough') {
          $sPTgh += Number(parseFloat($c.value));
          $('.totalStat').find('p[name="P.Tough"]').text($sPTgh);
        } else if (n.value == 'M.Tough') {
          $sMTgh += Number(parseFloat($c.value));
          $('.totalStat').find('p[name="M.Tough"]').text($sMTgh);
        } else if (n.value == 'Recovery') {
          $sRec += Number(parseFloat($c.value));
          $('.totalStat').find('p[name="Recovery"]').text($sRec);
        } else if (n.value == 'Mana Recovery upon taking DMG') {
          $sMRec += Number(parseFloat($c.value));
          $('.totalStat').find('p[name="Mana Recovery upon taking DMG"]').text($sMRec);
        } else if (n.value == 'DMG Reduction upon Block') {
          $sDRB += Number(parseFloat($c.value));
          $('.totalStat').find('p[name="DMG Reduction upon Block"]').text($sDRB);
        } else if (n.value == 'DMG Reduction upon P.Block') {
          $sDRPB += Number(parseFloat($c.value));
          $('.totalStat').find('p[name="DMG Reduction upon P.Block"]').text($sDRPB);
        } else if (n.value == 'DMG Reduction upon M.Block') {
          $sDRMB += Number(parseFloat($c.value));
          $('.totalStat').find('p[name="DMG Reduction upon M.Block"]').text($sDRMB);
        }
      });
    }
    $('.ax').change(function() {
      $('.t-op p').empty();
      option();
    });
    $('.ay').change(function() {
      option();
      gearStat();
    });
    $('.form-input select').change(function() {
      gearStat();
      gearSet();
      heroImg();
      hideOption();
      $('.t-op p').empty();
      option();
    });
    $('.rating label').click(function(){
      gearStat();
      gearSet();
      heroImg();
      hideOption();
    });
    $('#calc_role_id, #calc_char_id').change($gearImg);
  });
}).call(this);
