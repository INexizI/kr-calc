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
      //   $('.hero-img').children().hide();
      $('.t-st p').empty();
      $('.form-input .gSt p').text('');
      $('.form-input .gSt .rating').hide();
      $('.rating').find('label').removeClass('active');
      $('.c-perk-img').find('img').removeClass('pick');
      $('.perk-tp').find('p').text(0);
      $('select').not('#calc_role_id, #calc_char_id').prop('selectedIndex', 0);
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

        $('.calc_gear_treasure').next().next().show();
      } else {
        $(this).css('background-image', 'url(/images/media/gears/bg-treasure.png)').css('width', '52px');
        $('#tre').text('').next('.rating').hide();

        $('.calc_gear_treasure').next().next().hide();
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

        $('.calc_gear_armor').next().next().show();
      } else {
        $(this).css('background-image', 'url(/images/media/gears/bg-armor.png)');
        $('#arm').text('').next('.rating').hide();

        $('.calc_gear_armor').next().next().hide();
      }
      $x = $('#arm').text();
      $('#greyPDEF').text($x);
      $('#ar label').filter('.active').removeClass('active');
    }).change();

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

        $('.calc_gear_secondary').next().next().hide();
      }
      $x = $('#sec').text();
      $('#greyMDEF').text($x);
      $('#sg label').filter('.active').removeClass('active');
    }).change();

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

        $('.calc_gear_jewelry').next().next().show();
      } else {
        $(this).css('background-image', 'url(/images/media/gears/bg-accessory.png)');
        $('#acc').text('').next('.rating').hide();

        $('.calc_gear_jewelry').next().next().hide();
      }
      $x = $('#acc').text();
      $('#greyJ').text($x);
      $('#ac label').filter('.active').removeClass('active');
    }).change();

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

        $('.calc_gear_orb').next().next().show();
      } else {
        $(this).css('background-image', 'url(/images/media/gears/bg-orb.png)');
        $('#orb').text('').next('.rating').hide();

        $('.calc_gear_orb').next().next().hide();
      }
      $x = $('#orb').text();
      $('#greyO').text($x);
      $('#or label').filter('.active').removeClass('active');
    }).change();

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

    // Sum Stat
    function gearStat() {
      weaponATK();
      armorTR();
      armorPDEF();
      armorMDEF();
      armorJ();
      armorO();
      // $('.rating label').click(function() {
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
      if ($weapon !== '- - - - - - - - - -') {
        if ($jewel == 'Earrings')
          $sumAtk = parseInt($classATK) + parseInt($gearA) + parseInt($gearJ);
        else
          $sumAtk = parseInt($classATK) + parseInt($gearA);
        if ($gearA !== 0) {
          if ($jewel == 'Earrings')
            // $totalA.text((parseInt($classATK) + parseInt($gearA)) + ' (' + $classATK + '+' + $gearA + ')');
            $totalA.text($sumAtk + ' (' + $classATK + '+' + (parseInt($gearA) + parseInt($gearJ)) + ')');
          else
            $totalA.text($sumAtk + ' (' + $classATK + '+' + parseInt($gearA) + ')');
        }
      } else {
        $totalA.text($classATK);
      }
      // hp
      $totalH = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'MAX HP'
      }).next('p');
      if ($treasure !== '- - - - - - - - - -') {
        $sumTre = parseInt($classHP) + parseInt($gearTr) + parseInt($gearJ) + parseInt($gearO);
        if ($gearTr !== 0) {
          if (($gearJ == 0) && ($gearO == 0))
            $totalH.text((parseInt($classHP) + parseInt($gearTr)) + ' (' + $classHP + '+' + $gearTr + ')');
          else {
            if ($jewel == 'Ring')
              $totalH.text($sumTre + ' (' + $classHP + '+' + (parseInt($gearTr) + parseInt($gearJ) + parseInt($gearO)) + ')');
            else
              $totalH.text($sumTre + ' (' + $classHP + '+' + (parseInt($gearTr) + parseInt($gearO)) + ')');
          }
        } else {
          $totalH.text($('#heroHP').text());
        }
        $('#heroHP').text($totalH.text());
        $('#heroHPs').text($totalH.text().split(' ')[0]);
      }
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
      } else {
        $totalP.text($classPDEF);
      }
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
      } else {
        $totalM.text($classMDEF);
      }
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
            if (($gearTr == 0) && ($gearO == 0))
              $totalJ.text((parseInt($classHP) + parseInt($gearJ)) + ' (' + $classHP + '+' + $gearJ + ')');
            else
              $totalJ.text($sumAcc + ' (' + $classHP + '+' + (parseInt($gearTr) + parseInt($gearJ) + parseInt($gearO)) + ')');
            $('#heroHP').text($totalJ.text());
            $('#heroHPs').text($totalJ.text().split(' ')[0]);
          } else if ($jewel == 'Earrings') {
            if ($gearA == 0)
              $totalJ.text((parseInt($classATK) + parseInt($gearJ)) + ' (' + $classATK + '+' + $gearJ + ')');
            else
              $totalJ.text($sumAcc + ' (' + $classATK + '+' + (parseInt($gearA) + parseInt($gearJ)) + ')');
          } else if ($jewel == 'Necklace') {
            if ($gearM == 0)
              $totalJ.text((parseInt($classMDEF) + parseInt($gearJ)) + ' (' + $classMDEF + '+' + $gearJ + ')');
            else
              $totalJ.text($sumAcc + ' (' + $classMDEF + '+' + (parseInt($gearM) + parseInt($gearJ)) + ')');
          } else if ($jewel == 'Bracelet') {
            if ($gearP == 0)
              $totalJ.text((parseInt($classPDEF) + parseInt($gearJ)) + ' (' + $classPDEF + '+' + $gearJ + ')');
            else
              $totalJ.text($sumAcc + ' (' + $classPDEF + '+' + (parseInt($gearP) + parseInt($gearJ)) + ')');
          }
        }
      }
      // orb
      $totalO = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'MAX HP'
      }).next('p');
      if ($orb !== '- - - - - - - - - -') {
        $orbSplt = 0;

        if ($jewel == 'Ring')
          $sumOrb = parseInt($classHP) + parseInt($gearTr) + parseInt($gearJ) + parseInt($gearO);
        else
          $sumOrb = parseInt($classHP) + parseInt($gearTr) + parseInt($gearO);

        if ($gearO !== 0) {
          if (($gearTr == 0) && ($gearJ == 0)) {
            $totalO.text((parseInt($classHP) + parseInt($gearO)) + ' (' + $classHP + '+' + $gearO + ')');
          } else if (($gearTr == 0) || ($gearJ == 0)) {
            if ($jewel == 'Ring') {
              $totalO.text($sumOrb + ' (' + $classHP + '+' + (parseInt($gearTr) + parseInt($gearJ) + parseInt($gearO)) + ')');
            } else {
              $totalO.text($sumOrb + ' (' + $classHP + '+' + (parseInt($gearTr) + parseInt($gearO)) + ')');
            }
          }
          $('#heroHP').text($totalO.text());
          $('#heroHPs').text($totalO.text().split(' ')[0]);
        }
      } else {
        $totalO.text($('#heroHP').text());
      }
      // }); // $('.rating label').click(function() {
    };

    // Set Bonus
    function gearSet() {
    // $('.form-input select').change(function gearSet() {
      $gearClass = $('#calc_role_id').children('option:selected').val();
      $setBonus = $('.t-total .r-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === 'Set Bonus'
      }).next('p');
      if (!$setBonus.length)
        $setBonus = $('.t-total .r-stats .role' + $gearClass).append('<div class="statSet"><div class="r-set"><p id="s-name">Set Bonus</p><p id="sb"><span id="f1">2 Set: Crit +100</span><span id="f2">4 Set: Crit +130</span><span id="fr1">2 Set: Max HP +10%</span><span id="fr2">4 Set: Max HP +13%</span><span id="p1">2 Set: Crit Resistance +100</span><span id="p2">4 Set: Crit Resistance +130</span><span id="d1">2 Set: MP Recovery/Attack +200</span><span id="d2">4 Set: MP Recovery/Attack +260</span><span id="la1">2 Set: Crit DMG +20%</span><span id="la2">4 Set: Crit DMG +26%</span><span id="le1">2 Set: Debuff ACC +100</span><span id="le2">4 Set: Debuff ACC +130</span><span id="s1">2 Set: Increases DMG to Heroes by 7%</span><span id="s2">4 Set: Increases DMG to Heroes by 13%</span><span id="pr1">2 Set: Reduces DMG recevied from Heroes by 6%</span><span id="pr2">4 Set: Reduces DMG recevied from Heroes by 11%</span><span id="dl1">2 Set: Increases Crit DMG of all allies by 5%</span><span id="dl2">4 Set: Increases Crit DMG of all allies by 8%</span><span id="ch1">2 Set: Hero deals 12% more DMG and takes 12% less DMG from bosses</span><span id="ch2">4 Set: Hero deals 15% more DMG and takes 15% less DMG from bosses</span><span id="t1">2 Set: Increases DMG dealt to enemies by 2%\n This effect increases by 4 times in the Technomagic Kingdom</span><span id="t2">4 Set: Increases DMG dealt to enemies by 3%\n This effect increases by 4 times in the Technomagic Kingdom</span></p></div></div>');
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
      $statDebuff = $('.class-stats .role' + $gearClass).find('p').filter(function() {
        return $(this).text() === 'Debuff ACC'
      }).next('p');

      $f = 0;$fr = 0;$p = 0;$d = 0;$la = 0;$le = 0;$ch = 0;$s = 0;$pr = 0;$dl = 0;$t = 0;
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
        $setBonus.find('#f1').show();
      }
      else if ($f == 4) {
        $statF.text(parseInt($statCrit.text()) + 230 + ' (' + parseInt($statCrit.text()) + '+' + 230 + ')');
        $setBonus.find('#f1, #f2').show();
      } else
        $($statF).text($statCrit.text());

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
        // $statFr.text($statHP.text());
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
        $statLe.text(parseInt($statDebuff.text()) + 100 + ' (' + parseInt($statDebuff.text()) + '+' + 100 + ')');
        $setBonus.find('#le1').show();
      } else if ($le == 4) {
        $statLe.text(parseInt($statDebuff.text()) + 230 + ' (' + parseInt($statDebuff.text()) + '+' + 230 + ')');
        $setBonus.find('#le1, #le2').show();
      } else if ($le == 1)
        $($statLe).text($statDebuff.text());

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
        $statSplit.html('<span id="plsSt1">' + $statSplit.text().split(' ').shift() + '</span>' + ' (' + $statSplit.text().split('(').pop().slice(0, -1).split('+').shift() + '+' + '<span id="plsSt2">' + $statSplit.text().split('(').pop().slice(0, -1).split('+').pop() + '</span>' + ')');
      });
    // }); // $('.form-input select').change(function gearSet() {
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
            // $tp_1 = $tp_1 + 10;
            $tp_1 += 10;
          });
        } else if ($perkTier == 'perk-t2') {
          $(this).find('.pick').each(function() {
            // $tp_2 = $tp_2 + 15;
            $tp_2 += 15;
          });
        } else if ($perkTier == 'perk-t3') {
          $(this).find('.pick').each(function() {
            // $tp_3 = $tp_3 + 15;
            $tp_3 += 15;
          });
        } else if ($perkTier == 'perk-t5') {
          $(this).find('.pick').each(function() {
            // $tp_5 = $tp_5 + 15;
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

    // function ImgW() {
    //   $gearHero = $('#calc_char_id').children('option:selected').text();
    //   $gearWeapon = $('#calc_gear_weapon').children('option:selected').val();
    //   console.log($gearHero);
    //   console.log($gearWeapon);
    // };
    // $('.heroGear img').click(function() {
    //   $gearHero = $('#calc_char_id').children('option:selected').text();
    //   $gearClass = $('#calc_role_id').children('option:selected').text();
    //   $gearArmorTier = $('#calc_gear_armor').children('option:selected').val().toLowerCase();
    //   $gearSecondaryTier = $('#calc_gear_secondary').children('option:selected').val().toLowerCase();
    //   $gearWeapon = $('#calc_gear_weapon').children('option:selected').val();
    //   // weapon
    //   if ($gearWeapon == 'Unique')
    //     $('#wea').html('<img src="/images/media/heroes/' + $gearHero + '/uw.png">');
    //   else if ($gearWeapon == 'Class')
    //     $('#wea').html('<img src="/images/media/heroes/' + $gearClass + '.png">');
    //   // treasure
    //   // $('#tre').html('<img src="/images/media/heroes/' + $gearHero + '/ut.png">');
    //   // armor
    //   if (($gearClass == 'Knight') || ($gearClass == 'Warrior')) {
    //     $gearArmor = $('.g-ar-' + $gearArmorTier).find('#g-ar-h').children().children('option:selected').val();
    //     $('#arm').html('<img src="/images/media/gears/1-1H/' + $gearArmor + '.png">');
    //   }
    //   else if (($gearClass == 'Assassin') || ($gearClass == 'Archer') || ($gearClass == 'Mechanic')) {
    //     $gearArmor = $('.g-ar-' + $gearArmorTier).find('#g-ar-l').children().children('option:selected').val();
    //     $('#arm').html('<img src="/images/media/gears/3-1L/' + $gearArmor + '.png">');
    //   }
    //   else if (($gearClass == 'Wizard') || ($gearClass == 'Priest')) {
    //     $gearArmor = $('.g-ar-' + $gearArmorTier).find('#g-ar-i').children().children('option:selected').val();
    //     $('#arm').html('<img src="/images/media/gears/5-1I/' + $gearArmor + '.png">');
    //   }
    //   // secondary
    //   if (($gearClass == 'Knight') || ($gearClass == 'Warrior')) {
    //     $gearSecondary = $('.g-sg-' + $gearSecondaryTier).find('#g-sg-h').children().children('option:selected').val();
    //     $('#sec').html('<img src="/images/media/gears/2-2H/' + $gearSecondary + '.png">');
    //   }
    //   else if (($gearClass == 'Assassin') || ($gearClass == 'Archer') || ($gearClass == 'Mechanic')) {
    //     $gearSecondary = $('.g-sg-' + $gearSecondaryTier).find('#g-sg-l').children().children('option:selected').val();
    //     $('#sec').html('<img src="/images/media/gears/4-2L/' + $gearSecondary + '.png">');
    //   }
    //   else if (($gearClass == 'Wizard') || ($gearClass == 'Priest')) {
    //     $gearSecondary = $('.g-sg-' + $gearSecondaryTier).find('#g-sg-i').children().children('option:selected').val();
    //     $('#sec').html('<img src="/images/media/gears/6-2I/' + $gearSecondary + '.png">');
    //   }
    // });

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

    $gearCalc = function() {
      gearStat();
      gearSet();
      heroImg();
      hideOption();
    }
    $gearImg = function() {
      // ImgW();
      hideGearImage();
    }
    $('.form-input select').change($gearCalc);
    $('.rating label').click($gearCalc);
    // $('.heroGear img').click($gearImg);
    $('#calc_role_id, #calc_char_id').change($gearImg);
  });
}).call(this);
