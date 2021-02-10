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
    // Hero stats
    $('select#calc_role_id').change(function() {
      heroImg();
      hideOption();
      $('.r-stats').children().hide();
      $('.t-total .r-stats').empty();
      $heroName = $('#calc_char_id').children('option:selected').text();
      $heroClass = $('#calc_role_id').children('option:selected').val();
      if ($heroClass == 1)
        $heroClassName = 'Knight';
      else if ($heroClass == 2)
        $heroClassName = 'Warrior';
      else if ($heroClass == 3)
        $heroClassName = 'Assassin';
      else if ($heroClass == 4)
        $heroClassName = 'Archer';
      else if ($heroClass == 5)
        $heroClassName = 'Mechanic';
      else if ($heroClass == 6)
        $heroClassName = 'Wizard';
      else if ($heroClass == 7)
        $heroClassName = 'Priest';

      $stats = $('.class-stats').find('.statData').clone();
      $($stats).prependTo('.t-total .r-stats');
      $('.t-total').find('.statData').show();
      $('select#calc_gear_treasure').css('background-image', 'url(/images/media/gears/bg-treasure.png)').css({'width': '52px', 'position': 'relative', 'right': '0'});
      $heroClass !== '' ? $('.t-total .r-stats').show() : $('.t-total .r-stats').hide();
      $('#calc_st_weapon_st').html('<option value="">- - -</option>');
      $('#range-atk').text(0);
      $('#range-hp').text(0);
      $('.range').hide();

      Stat = {
        S0: 'MAX HP',
        S1: 'ATK',
        S2: 'P.DEF',
        S3: 'M.DEF',
        S4: 'Crit',
        S5: 'Crit DMG',
        S6: 'Penetration',
        S7: 'ACC',
        S8: 'P.Dodge',
        S9: 'M.Dodge',
        S10: 'P.Block',
        S11: 'M.Block',
        S12: 'P.Block DEF',
        S13: 'M.Block DEF',
        S14: 'P.Tough',
        S15: 'M.Tough',
        S16: 'Recovery',
        S17: 'CC Resist',
        S18: 'Debuff ACC',
        S19: 'Lifesteal',
        S20: 'ATK Spd',
        S21: 'MP Recovery/Attack',
        S22: 'P.Crit Resistance',
        S23: 'M.Crit Resistance'
      }
      Knight = {
        B0: 1706672,
        B1: 19792,
        B2: 8792,
        B3: 6840,
        A0: 50,
        A1: 0,
        A2: 0,
        A3: 0,
        A4: 0,
        A5: 0,
        A6: 100,
        A7: 100,
        A8: 0,
        A9: 0,
        A10: 250,
        A11: 250,
        A12: 0,
        A13: 0,
        A14: 0,
        A15: 0,
        A16: 1000,
        A17: 0,
        A18: 0,
        A19: 0
      };
      Warrior = {
        B0: 1449520,
        B1: 22488,
        B2: 7328,
        B3: 8792,
        A0: 150,
        A1: 0,
        A2: 150,
        A3: 100,
        A4: 100,
        A5: 100,
        A6: 0,
        A7: 0,
        A8: 0,
        A9: 0,
        A10: 0,
        A11: 0,
        A12: 0,
        A13: 150,
        A14: 0,
        A15: 0,
        A16: 1000,
        A17: 0,
        A18: 0,
        A19: 0
      };
      Assassin = {
        B0: 1384992,
        B1: 24688,
        B2: 7816,
        B3: 6840,
        A0: 200,
        A1: 30,
        A2: 0,
        A3: 100,
        A4: 200,
        A5: 200,
        A6: 0,
        A7: 0,
        A8: 0,
        A9: 0,
        A10: 0,
        A11: 0,
        A12: 0,
        A13: 0,
        A14: 0,
        A15: 0,
        A16: 1000,
        A17: 0,
        A18: 0,
        A19: 0
      };
      Archer = {
        B0: 1066728,
        B1: 27864,
        B2: 5376,
        B3: 4392,
        A0: 150,
        A1: 0,
        A2: 250,
        A3: 100,
        A4: 0,
        A5: 0,
        A6: 0,
        A7: 0,
        A8: 0,
        A9: 0,
        A10: 0,
        A11: 0,
        A12: 0,
        A13: 0,
        A14: 0,
        A15: 0,
        A16: 1000,
        A17: 0,
        A18: 0,
        A19: 0
      };
      Mechanic = {
        B0: 1157176,
        B1: 25416,
        B2: 5376,
        B3: 4392,
        A0: 150,
        A1: 50,
        A2: 100,
        A3: 200,
        A4: 0,
        A5: 0,
        A6: 0,
        A7: 0,
        A8: 0,
        A9: 0,
        A10: 0,
        A11: 0,
        A12: 0,
        A13: 0,
        A14: 0,
        A15: 0,
        A16: 1000,
        A17: 0,
        A18: 0,
        A19: 0
      };
      Wizard = {
        B0: 985328,
        B1: 29328,
        B2: 3904,
        B3: 5864,
        A0: 100,
        A1: 0,
        A2: 150,
        A3: 100,
        A4: 0,
        A5: 200,
        A6: 0,
        A7: 250,
        A8: 0,
        A9: 0,
        A10: 0,
        A11: 0,
        A12: 0,
        A13: 0,
        A14: 0,
        A15: 0,
        A16: 1000,
        A17: 0,
        A18: 0,
        A19: 0
      };
      Priest = {
        B0: 1104864,
        B1: 23216,
        B2: 4888,
        B3: 6104,
        A0: 100,
        A1: 0,
        A2: 0,
        A3: 100,
        A4: 0,
        A5: 0,
        A6: 0,
        A7: 500,
        A8: 0,
        A9: 250,
        A10: 0,
        A11: 150,
        A12: 0,
        A13: 0,
        A14: 0,
        A15: 0,
        A16: 1000,
        A17: 0,
        A18: 0,
        A19: 0
      };
      $('.statData .statsBase, .statData .statsAdd').empty();
      for (var i=0; i<=3; i++) {
        if ($heroClass == 1)
          var x = Knight['B' + i];
        else if ($heroClass == 2)
          var x = Warrior['B' + i];
        else if ($heroClass == 3)
          var x = Assassin['B' + i];
        else if ($heroClass == 4)
          var x = Archer['B' + i];
        else if ($heroClass == 5)
          var x = Mechanic['B' + i];
        else if ($heroClass == 6)
          var x = Wizard['B' + i];
        else if ($heroClass == 7)
          var x = Priest['B' + i];
        $('.statData .statsBase').append('<div class="r-stat"><p id="s-name"></p><p id="s-val"></p></div>');
        $('.statData .statsBase').find('.r-stat:eq(' + i + ') #s-val').text(x);
      }
      for (var j=0; j<=19; j++) {
        if ($heroClass == 1)
          var y = Knight['A' + j];
        else if ($heroClass == 2)
          var y = Warrior['A' + j];
        else if ($heroClass == 3)
          var y = Assassin['A' + j];
        else if ($heroClass == 4)
          var y = Archer['A' + j];
        else if ($heroClass == 5)
          var y = Mechanic['A' + j];
        else if ($heroClass == 6)
          var y = Wizard['A' + j];
        else if ($heroClass == 7)
          var y = Priest['A' + j];
        $('.statData .statsAdd').append('<div class="r-stat"><p id="s-name"></p><p id="s-val"></p><p id="s-per"></div>');
        $('.statData .statsAdd').find('.r-stat:eq(' + j + ') #s-val').text(y);
      }
      for (var k=0; k<=23; k++) {
        var z = Stat['S' + k];
        $('.statData').find('.r-stat:eq(' + k + ') #s-name').text(z);
      }
    }).change();
    // Hero
    $('select#calc_char_id').change(function() {
      heroImg();
      hideOption();
      $hero = $(this).children('option:selected').val();
      $heroName = $('#calc_char_id').children('option:selected').text();
      $stats = $('.class-stats').find('.statData').clone();
      $('.t-total').find('.r-stats').empty();
      $($stats).prependTo('.t-total .r-stats');
      $('.t-total').find('.statData').show();
      $('.gOption').hide();
      $('.t-st p').empty();
      $('.form-input .gSt p').text('');
      $('.form-input .gSt .rating').hide();
      $('.rating').find('label').removeClass('active');
      $('.c-perk-img').find('img').removeClass('pick');
      $('.perk-tp').find('p').text(0);
      $('select').not('#calc_role_id, #calc_char_id').prop('selectedIndex', 0);
      $('#calc_st_weapon_st').html('<option value="">- - -</option>');
      $('#range-atk').text(0);
      $('#range-hp').text(0);
      $('.range').hide();
      $('select#calc_gear_treasure').css('background-image', 'url(/images/media/gears/bg-treasure.png)').css({'width': '52px', 'position': 'relative', 'right': '0'});
      statValue();
    }).change();
    // Class / Unique Weapon
    $('select#calc_gear_weapon').change(function() {
      $('#heroATK').empty();
      $uw = null;
      $gearWeaponSlot = null;
      $clKn = 32730;$clWa = 37010;$clAs = 40711;$clAr = 45915;$clMe = 41867;$clWi = 42793;$clPr = 42793;$unKn = 45106;$unWa = 51120;$unAs = 56209;$unAr = 63264;$unMe = 57712;$unWi = 58985;$unPr = 58985;$arPl = 17052;$arSc = 11369;$arR = 5686;$scSh = 17052;$scC = 5686;$scH = 11369;$ms = 726278;$unTr = 1596066;$jR = 726278;$jE = 15801;$jB = 11369;$jN = 11369;$or = 726278;
      $gearWeaponType = $(this).children('option:selected').val();
      if ($gearWeaponType == 'Class') {
        $(this).css('background-image', 'url(/images/media/heroes/' + $heroClassName + '.png)');
        $('#wea').next('.rating').show();
        if ($heroClass == 1)
          $('#wea').text($clKn);
        else if ($heroClass == 2)
          $('#wea').text($clWa);
        else if ($heroClass == 3)
          $('#wea').text($clAs);
        else if ($heroClass == 4)
          $('#wea').text($clAr);
        else if ($heroClass == 5)
          $('#wea').text($clMe);
        else if ($heroClass == 6)
          $('#wea').text($clWi);
        else if ($heroClass == 7)
          $('#wea').text($clPr);
        $('.calc_gear_weapon').parent().find('.gOption').show();
        $('#g-weapon').hide();
        $('#range-atk').text(0);
        $('#range-hp').text(0);
        $('.range').hide();
        rangeC();
        $('#calc_st_weapon').prop('selectedIndex', 0);
        $('#calc_st_weapon_st').html('<option value="">- - -</option>');
      } else if ($gearWeaponType == 'Unique') {
        $(this).attr('style', 'background-image: url("/images/media/heroes/' + $heroName + '/uw.png"); display: inline-block;');
        $('#wea').next('.rating').show();
        if ($heroClass == 1)
          $('#wea').text($unKn);
        else if ($heroClass == 2)
          $('#wea').text($unWa);
        else if ($heroClass == 3)
          $('#wea').text($unAs);
        else if ($heroClass == 4)
          $('#wea').text($unAr);
        else if ($heroClass == 5)
          $('#wea').text($unMe);
        else if ($heroClass == 6)
          $('#wea').text($unWi);
        else if ($heroClass == 7)
          $('#wea').text($unPr);

        if ($heroClass == 1)
          $swA = 3500;
        else if (($heroClass == 2) || ($heroClass == 3))
          $swA = 4000;
        else if (($heroClass == 4) || ($heroClass == 5) || ($heroClass == 6) || ($heroClass == 7))
          $swA = 4500;
        $swH = 125000;

        $('.calc_gear_weapon').parent().find('.gOption').show();
        $('#g-weapon').show();
      } else {
        $(this).css('background-image', 'url(/images/media/gears/bg-weapon.png)');
        $('#wea').text('').next('.rating').hide();
        $('.calc_gear_weapon').parent().find('.gOption').hide();
        $('#g-weapon').hide();
        $('#range-atk').text(0);
        $('#range-hp').text(0);
        $('.range').hide();
        rangeC();
        $('#calc_st_weapon').prop('selectedIndex', 0);
        $('#calc_st_weapon_st').html('<option value="">- - -</option>');
      }
      $('#greyATK').text($('#wea').text());
      $('#uw label').filter('.active').removeClass('active');
      gearStat();
    }).change();
    // Soul Weapon
    $('select#calc_st_weapon').change(function() {
      $adv = $('#calc_st_weapon').children('option:selected').text();
      if ($adv == '- - - - - - - - - -') {
        $rAtk = $('#range-atk').text(0);
        $rHP = $('#range-hp').text(0);
        $('.range').hide();
        rangeC();
      } else if ($adv == 'Adv.0') {
        $rAtk = $('#range-atk').text(parseInt($swA));
        $rHP = $('#range-hp').text(parseInt($swH));
        $('.range').show();
        rangeC();
      } else if ($adv == 'Adv.1') {
        $rAtk = $('#range-atk').text(parseInt($swA)*2);
        $rHP = $('#range-hp').text(parseInt($swH)*2);
        $('.range').show();
        rangeC();
      } else if ($adv == 'Adv.2') {
        $rAtk = $('#range-atk').text(parseInt($swA)*4);
        $rHP = $('#range-hp').text(parseInt($swH)*4);
        $('.range').show();
        rangeC();
      }
      gearStat();
    }).change();
    $('select#calc_st_weapon_st').change(function() {
      $adv = $('#calc_st_weapon').children('option:selected').text();
      $eth = $('#calc_st_weapon_st').children('option:selected').text();
      if (($eth == 0) || ($eth == '- - -'))
        $mltp = 1;
      else if ($eth == 1)
        $mltp = 1.03;
      else if ($eth == 2)
        $mltp = 1.06;
      else if ($eth == 3)
        $mltp = 1.09;
      else if ($eth == 4)
        $mltp = 1.12;
      else if ($eth == 5)
        $mltp = 1.16;
      else if ($eth == 6)
        $mltp = 1.24;
      else if ($eth == 7)
        $mltp = 1.32;
      else if ($eth == 8)
        $mltp = 1.42;
      else if ($eth == 9)
        $mltp = 1.52;
      else if ($eth == 10)
        $mltp = 1.62;
      else if ($eth == 11)
        $mltp = 1.82;
      else if ($eth == 12)
        $mltp = 2.04;
      else if ($eth == 13)
        $mltp = 2.28;
      else if ($eth == 14)
        $mltp = 2.55;
      else if ($eth == 15)
        $mltp = 2.86;
      else if ($eth == 16)
        $mltp = 3.43;
      else if ($eth == 17)
        $mltp = 4.12;
      else if ($eth == 18)
        $mltp = 4.95;
      else if ($eth == 19)
        $mltp = 5.94;
      else if ($eth == 20)
        $mltp = 7.13;
      swStat();
      gearStat();
    }).change();
    // Treasure
    $('select#calc_gear_treasure').change(function() {
      $('#heroHP').empty();
      $gearTreasureType = $(this).children('option:selected').val();
      $heroName = $('#calc_char_id').children('option:selected').text();
      if ($gearTreasureType == 'Mana Stone') {
        $eTr = {
          'width': '52px',
          'background-size': '50px 50px',
          'position': 'relative',
          'right': '0'
        }
        $(this).css('background-image', 'url(/images/media/gears/9-UT/mana.png)').css($eTr);
        $('#tre').text($ms).next('.rating').show();
        $('.calc_gear_treasure').parent().find('.frst').show().css({'position': 'relative', 'bottom': '104px'});
        $('.scnd').hide();
        $('.scnd select').prop('selectedIndex', 0);
        gearStat();
      } else if ($gearTreasureType == 'Unique') {
        $eTr1 = 'url("/images/media/heroes/' + $heroName + '/ut1.png")';
        $eTr2 = 'url("/images/media/heroes/' + $heroName + '/ut2.png")';
        $eTr3 = 'url("/images/media/heroes/' + $heroName + '/ut3.png")';
        $eTr4 = 'url("/images/media/heroes/' + $heroName + '/ut4.png")';
        $eTr = $eTr1 + ',' + $eTr2 + ',' + $eTr3 + ',' + $eTr4;
        $hTreasure = {
          'background-position': '0px, 52px, 104px, 156px',
          'background-repeat': 'no-repeat',
          'background-size': '52px 50px',
          'position': 'relative',
          'right': '120px',
          'width': '209px',
          'height': '50px'
        }
        $(this).attr('style', 'background-image: ' + $eTr + '; display: inline-block;').css($hTreasure);
        $(this).css($hTreasure);
        $('#tre').text($unTr).next('.rating').show();
        $('.calc_gear_treasure').parent().find('.frst, .scnd').show().css({'position': 'relative', 'bottom': '210px'});
        gearStat();
      } else {
        $(this).css('background-image', 'url(/images/media/gears/bg-treasure.png)').css({'width': '52px', 'position': 'relative', 'right': '0'});
        $('#tre').text('').next('.rating').hide();
        $('.calc_gear_treasure').parent().find('.gOption').hide();
        $(this).parent().parent().find('.gOption select').prop('selectedIndex', 0).find('optgroup').hide();
      }
      statValue();
      $('#greyTR').text($('#tre').text());
      $('#ut label').filter('.active').removeClass('active');
    }).change();
    $('select#calc_st_treasure').change(function() {
      $statName = $(this);
      $opt = $(this).parent().parent().find('.ay');
      $opt.prop('selectedIndex', 0).find('optgroup').hide();
      if ($(this).children('option:selected').text() !== '- - - - - - - - - -') {
        statOption();
        gearStat();
      }
      $('#treasure #g-treasure').each(function(i, n) {
        $trOptf = $('#a' + i + ' .ax').children('option:selected').val();
        $trOpts = $('#b' + i + ' .ax').children('option:selected').val();
        $(this).find('.ax').children().removeAttr('disabled');
        if ($trOptf !== '')
          $(this).find('#b' + i + ' .ax').children('[value="' + $trOptf + '"]').attr('disabled', 'disabled');
        if ($trOpts !== '')
          $(this).find('#a' + i + ' .ax').children('[value="' + $trOpts + '"]').attr('disabled', 'disabled');
      });
    });
    // Armor Tier
    $('select#calc_gear_armor').change(function() {
      $('#heroPDEF').empty();
      $('#setAr').text($(this).children('option:selected').text());
      $armorSet = $(this).children('option:selected').val();
      if ($armorSet !== '- - - - - - - - - -') {
        if (($heroClass == 1) || ($heroClass == 2)) {
          $gType = '1-1H';
          $('#arm').text($arPl);
      } else if (($heroClass == 3) || ($heroClass == 4) || ($heroClass == 5)) {
          $gType = '3-1L';
          $('#arm').text($arSc);
        } else if (($heroClass == 6) || ($heroClass == 7)) {
          $gType = '5-1I';
          $('#arm').text($arR);
        }
        $(this).attr('style', 'background-image: url("/images/media/gears/' + $gType + '/' + $armorSet + '.png"); display: inline-block;');
        $('#arm').next('.rating').show();
        $('.calc_gear_armor').parent().find('.gOption').show();
        gearStat();
      } else {
        $(this).css('background-image', 'url(/images/media/gears/bg-armor.png)');
        $('#arm').text('').next('.rating').hide();
        $('.calc_gear_armor').parent().find('.gOption').hide();
        $(this).parent().parent().find('.gOption select').prop('selectedIndex', 0).find('optgroup').hide();
      }
      $('#greyPDEF').text($('#arm').text());
      $('#ar label').filter('.active').removeClass('active');
    }).change();
    $('select#calc_st_armor').change(function() {
      $statName = $(this);
      $opt = $(this).parent().parent().find('.ay');
      $opt.prop('selectedIndex', 0).find('optgroup').hide();
      if ($(this).children('option:selected').text() !== '- - - - - - - - - -') {
        statOption();
        gearStat();
      }
    });
    // Secondary Tier
    $('select#calc_gear_secondary').change(function() {
      $('#heroMDEF').empty();
      $('#setScnd').text($(this).children('option:selected').text());
      $secondarySet = $(this).children('option:selected').val();
      if ($secondarySet !== '- - - - - - - - - -') {
        if (($heroClass == 1) || ($heroClass == 2)) {
          $gType = '2-2H';
          $('#sec').text($scSh);
        } else if (($heroClass == 3) || ($heroClass == 4) || ($heroClass == 5)) {
          $gType = '4-2L';
          $('#sec').text($scC);
        } else if (($heroClass == 6) || ($heroClass == 7)) {
          $gType = '6-2I';
          $('#sec').text($scH);
        }
        $(this).attr('style', 'background-image: url("/images/media/gears/' + $gType + '/' + $secondarySet + '.png"); display: inline-block;');
        $('#sec').next('.rating').show();
        $('.calc_gear_secondary').next().next().show();
        gearStat();
      } else {
        $(this).css('background-image', 'url(/images/media/gears/bg-secondary.png)');
        $('#sec').text('').next('.rating').hide();
        $('.calc_gear_secondary').parent().find('.gOption').hide();
        $(this).parent().parent().find('.gOption select').prop('selectedIndex', 0).find('optgroup').hide();
      }
      $('#greyMDEF').text($('#sec').text());
      $('#sg label').filter('.active').removeClass('active');
    }).change();
    $('select#calc_st_secondary').change(function() {
      $statName = $(this);
      $opt = $(this).parent().parent().find('.ay');
      $opt.prop('selectedIndex', 0).find('optgroup').hide();
      if ($(this).children('option:selected').text() !== '- - - - - - - - - -') {
        statOption();
        gearStat();
      }
    });
    // Jewelry Type
    $('select#calc_gear_jewelry').change(function() {
      $('#heroJ').empty();
      $('#setAcs').text($('#calc_gear_jewelry').children().children('option:selected').val());
      $jewelSet = $('#calc_gear_jewelry').children().children('option:selected').val();
      $jewelType = $('#calc_gear_jewelry').children().children('option:selected').parent().attr('label');
      if ($jewelSet !== '- - - - - - - - - -') {
        if ($jewelType == 'Ring')
          $('#acc').text($jR);
        else if ($jewelType == 'Earrings')
          $('#acc').text($jE);
        else if ($jewelType == 'Bracelet')
          $('#acc').text($jB);
        else if ($jewelType == 'Necklace')
          $('#acc').text($jN);
        $(this).attr('style', 'background-image: url("/images/media/gears/7-J/' + $jewelType + '/' + $jewelSet + '.png"); display: inline-block;');
        $('#acc').next('.rating').show();
        $('.calc_gear_jewelry').parent().find('.gOption').show();
        gearStat();
      } else {
        $(this).css('background-image', 'url(/images/media/gears/bg-accessory.png)');
        $('#acc').text('').next('.rating').hide();
        $('.calc_gear_jewelry').parent().find('.gOption').hide();
        $(this).parent().parent().find('.gOption select').prop('selectedIndex', 0).find('optgroup').hide();
      }
      $('#greyJ').text($('#acc').text());
      $('#ac label').filter('.active').removeClass('active');
    }).change();
    $('select#calc_st_jewerly').change(function() {
      $statName = $(this);
      $opt = $(this).parent().parent().find('.ay');
      $opt.prop('selectedIndex', 0).find('optgroup').hide();
      if ($(this).children('option:selected').text() !== '- - - - - - - - - -') {
        statOption();
        gearStat();
      }
    });
    // Orb Tier
    $('select#calc_gear_orb').change(function() {
      $('#heroO').empty();
      $('#setOrb').text($(this).children('option:selected').text());
      $orbSet = $(this).children('option:selected').val();
      if ($orbSet !== '- - - - - - - - - -') {
        $(this).attr('style', 'background-image: url("/images/media/gears/8-O/' + $orbSet + '.png"); display: inline-block;');
        $('#orb').text($or).next('.rating').show();
        $('.calc_gear_orb').parent().find('.gOption').show();
        gearStat();
      } else {
        $(this).css('background-image', 'url(/images/media/gears/bg-orb.png)');
        $('#orb').text('').next('.rating').hide();
        $('.calc_gear_orb').parent().find('.gOption').hide();
        $(this).parent().parent().find('.gOption select').prop('selectedIndex', 0).find('optgroup').hide();
      }
      $('#greyO').text($('#orb').text());
      $('#or label').filter('.active').removeClass('active');
    }).change();
    $('select#calc_st_orb').change(function() {
      $statName = $(this);
      $opt = $(this).parent().parent().find('.ay');
      $opt.prop('selectedIndex', 0).find('optgroup').hide();
      if ($(this).children('option:selected').text() !== '- - - - - - - - - -') {
        statOption();
        gearStat();
      }
    });
    // Artifact
    $('select#calc_gear_artifact').change(function() {
      $(this).css('background-image', 'url(/images/media/gears/bg-art.png)');
      $('#art').text('').next('.rating').hide();
      $('#art label').filter('.active').removeClass('active');
    }).change();
    // Gear Star Stats
    function weaponATK() {
      $uwStat = $('#greyATK').text();
      $starW = $('#uw').find('.active').next('input').val();
      $gearWeaponType = $('#calc_gear_weapon').children('option:selected').val();
      if ($gearWeaponType == 'Unique') {
        if ($starW == 0)
          $('#wea').text($uwStat);
        else if ($starW == 1) {
          $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.1));
          if (($heroClass == 2) || ($heroClass == 4) || ($heroClass == 6) || ($heroClass == 7))
            $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.1) - 1);
        } else if ($starW == 2) {
          $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.3));
          if ($heroClass == 5)
            $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.3) + 1);
        } else if ($starW == 3) {
          $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.6));
          if (($heroClass == 2) || ($heroClass == 3) || ($heroClass == 4))
            $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.6) - 1);
          else if (($heroClass == 6) || ($heroClass == 7))
            $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.6) - 2);
        } else if ($starW == 4) {
          $('#wea').text(2*Math.trunc(parseInt($uwStat)*0.999995));
          if (($heroClass == 6) || ($heroClass == 7))
            $('#wea').text(2*Math.trunc(parseInt($uwStat)*0.999995) - 1);
          else if ($heroClass == 5)
            $('#wea').text(2*Math.trunc(parseInt($uwStat)*0.999995) + 1);
        } else if ($starW == 5) {
          $('#wea').text(2*Math.trunc(parseInt($uwStat)*0.999995) + Math.trunc(parseInt($uwStat)/2));
          if (($heroClass == 4) || ($heroClass == 6) || ($heroClass == 7))
            $('#wea').text(2*Math.trunc(parseInt($uwStat)*0.999995) + Math.trunc(parseInt($uwStat)/2) - 1);
        }
      } else if ($gearWeaponType == 'Class') {
        if ($starW == 0)
          $('#wea').text($uwStat);
        else if ($starW == 1) {
          $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.1));
          if (($heroClass == 5))
            $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.1) + 1);
          else if (($heroClass == 2) || ($heroClass == 3) || ($heroClass == 6) || ($heroClass == 7))
            $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.1) - 1);
        }
        else if ($starW == 2) {
          $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.25));
          if ($heroClass == 1)
            $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.25) + 1);
          else if (($heroClass == 6) || ($heroClass == 7))
            $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.25) - 1);
        } else if ($starW == 3) {
          $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.45));
          if ($heroClass == 1)
            $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.45) + 1);
        } else if ($starW == 4) {
          $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.7));
          if (($heroClass == 1) || ($heroClass == 3) || ($heroClass == 4))
            $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.7) - 1);
          else if (($heroClass == 2) || ($heroClass == 6) || ($heroClass == 7))
            $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.7) - 2);
        } else if ($starW == 5) {
          $('#wea').text(2*parseInt($uwStat));
          if (($heroClass == 2) || ($heroClass == 3) || ($heroClass == 6) || ($heroClass == 7))
            $('#wea').text(2*parseInt($uwStat) - 2);
          else if ($heroClass == 4)
            $('#wea').text(2*parseInt($uwStat) - 1);
          else if ($heroClass == 5)
            $('#wea').text(2*parseInt($uwStat) + 1);
        }
      }
    };
    function armorTR() {
      $trStat = $('#greyTR').text();
      $starTr = $('#ut').find('.active').next('input').val();
      $gearTreasureType = $('#calc_gear_treasure').children('option:selected').val();
      if ($gearTreasureType == 'Unique') {
        if ($starTr == 0)
          $('#tre').text($trStat);
        else if ($starTr == 1)
          $('#tre').text(parseInt($trStat) + Math.trunc(parseInt($trStat)*0.1) - 23);
        else if ($starTr == 2)
          $('#tre').text(parseInt($trStat) + Math.trunc(parseInt($trStat)*0.3) - 14);
        else if ($starTr == 3)
          $('#tre').text(parseInt($trStat) + Math.trunc(parseInt($trStat)*0.6) - 29);
        else if ($starTr == 4)
          $('#tre').text(2*Math.trunc(parseInt($trStat)*0.999995) - 52);
        else if ($starTr == 5)
          $('#tre').text(2*Math.trunc(parseInt($trStat)*0.999995) + Math.trunc(parseInt($trStat)/2) - 73);
      } else if ($gearTreasureType == 'Mana Stone') {
        if ($starTr == 0)
          $('#tre').text($trStat);
        else if ($starTr == 1)
          $('#tre').text(parseInt($trStat) + Math.trunc(parseInt($trStat)*0.1) + 1);
        else if ($starTr == 2)
          $('#tre').text(parseInt($trStat) + Math.trunc(parseInt($trStat)*0.2) + 1);
        else if ($starTr == 3)
          $('#tre').text(parseInt($trStat) + Math.trunc(parseInt($trStat)*0.3));
        else if ($starTr == 4)
          $('#tre').text(parseInt($trStat) + Math.trunc(parseInt($trStat)*0.4));
        else if ($starTr == 5)
          $('#tre').text(parseInt($trStat) + Math.trunc(parseInt($trStat)*0.5));
      }
    };
    function armorPDEF() {
      $arStat = $('#greyPDEF').text();
      $starAr = $('#ar').find('.active').next('input').val();
      $armorSet = $('#calc_gear_armor').children('option:selected').val();
      if ($starAr == 0)
        $('#arm').text($arStat);
      else if ($starAr == 1) {
        $('#arm').text(parseInt($arStat) + Math.trunc(parseInt($arStat)*0.1) + 1);
      } else if ($starAr == 2) {
        $('#arm').text(parseInt($arStat) + Math.trunc(parseInt($arStat)*0.25) + 1);
      } else if ($starAr == 3) {
        if (($heroClass == 3) || ($heroClass == 4) || ($heroClass == 5))
          $('#arm').text(parseInt($arStat) + Math.trunc(parseInt($arStat)*0.45));
        else
          $('#arm').text(parseInt($arStat) + Math.trunc(parseInt($arStat)*0.45) + 1);
      } else if ($starAr == 4) {
        if (($heroClass == 6) || ($heroClass == 7))
          $('#arm').text(parseInt($arStat) + Math.trunc(parseInt($arStat)*0.7));
        else
          $('#arm').text(parseInt($arStat) + Math.trunc(parseInt($arStat)*0.7) + 1);
      } else if ($starAr == 5) {
        if (($heroClass == 6) || ($heroClass == 7))
          $('#arm').text(2*Math.trunc(parseInt($arStat)));
        else
          $('#arm').text(2*Math.trunc(parseInt($arStat)) + 1);
      }
    };
    function armorMDEF() {
      $sgStat = $('#greyMDEF').text();
      $starSe = $('#sg').find('.active').next('input').val();
      $secondarySet = $('#calc_gear_secondary').children('option:selected').val();
      if ($starSe == 0)
        $('#sec').text($sgStat);
      else if ($starSe == 1) {
        $('#sec').text(parseInt($sgStat) + Math.trunc(parseInt($sgStat)*0.1) + 1);
      } else if ($starSe == 2) {
        $('#sec').text(parseInt($sgStat) + Math.trunc(parseInt($sgStat)*0.25) + 1);
      } else if ($starSe == 3) {
        if (($heroClass == 6) || ($heroClass == 7))
          $('#sec').text(parseInt($sgStat) + Math.trunc(parseInt($sgStat)*0.45));
        else
          $('#sec').text(parseInt($sgStat) + Math.trunc(parseInt($sgStat)*0.45) + 1);
      } else if ($starSe == 4) {
        if (($heroClass == 3) || ($heroClass == 4) || ($heroClass == 5))
          $('#sec').text(parseInt($sgStat) + Math.trunc(parseInt($sgStat)*0.7));
        else
          $('#sec').text(parseInt($sgStat) + Math.trunc(parseInt($sgStat)*0.7) + 1);
      } else if ($starSe == 5) {
        if (($heroClass == 3) || ($heroClass == 4) || ($heroClass == 5))
          $('#sec').text(2*Math.trunc(parseInt($sgStat)));
        else
          $('#sec').text(2*Math.trunc(parseInt($sgStat)) + 1);
      }
    };
    function armorJ() {
      $acStat = $('#greyJ').text();
      $starJ = $('#ac').find('.active').next('input').val();
      $jewelSet = $('#calc_gear_jewelry').children().children('option:selected').val();
      $jewelType = $('#calc_gear_jewelry').children().children('option:selected').parent().attr('label');
      if ($jewelType == 'Ring') {
        if ($starJ == 0)
          $('#acc').text($acStat);
        else if ($starJ == 1) {
          $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.1) + 1);
        } else if ($starJ == 2) {
          $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.2) + 1);
        } else if ($starJ == 3) {
          $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.3));
        } else if ($starJ == 4) {
          $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.4));
        } else if ($starJ == 5) {
          $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.5));
        }
      } else if ($jewelType == 'Earrings') {
        if ($starJ == 0)
          $('#acc').text($acStat);
        else if ($starJ == 1) {
          $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.1));
        } else if ($starJ == 2) {
          $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.2));
        } else if ($starJ == 3) {
          $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.3) + 1);
        } else if ($starJ == 4) {
          $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.4) + 1);
        } else if ($starJ == 5) {
          $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.5) + 1);
        }
      } else if (($jewelType == 'Bracelet') || ($jewelType == 'Necklace')) {
        if ($starJ == 0)
          $('#acc').text($acStat);
        else if ($starJ == 1) {
          $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.1) + 1);
        } else if ($starJ == 2) {
          $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.25) + 1);
        } else if ($starJ == 3) {
          $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.45));
        } else if ($starJ == 4) {
          $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.7) + 1);
        } else if ($starJ == 5) {
          $('#acc').text(2*Math.trunc(parseInt($acStat)) + 1);
        }
      }
    };
    function armorO() {
      $orStat = $('#greyO').text();
      $starO = $('#or').find('.active').next('input').val();
      $orbSet = $('#calc_gear_orb').children('option:selected').val();
      if ($starO == 0)
        $('#orb').text($orStat);
      else if ($starO == 1) {
        $('#orb').text(parseInt($orStat) + Math.trunc(parseInt($orStat)*0.1) + 1);
      } else if ($starO == 2) {
        $('#orb').text(parseInt($orStat) + Math.trunc(parseInt($orStat)*0.2) + 1);
      } else if ($starO == 3) {
        $('#orb').text(parseInt($orStat) + Math.trunc(parseInt($orStat)*0.3));
      } else if ($starO == 4) {
        $('#orb').text(parseInt($orStat) + Math.trunc(parseInt($orStat)*0.4));
      } else if ($starO == 5) {
        $('#orb').text(parseInt($orStat) + Math.trunc(parseInt($orStat)*0.5));
      }
    };
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

      $classATK = $('.class-stats').find('p').filter(function() {
        return $(this).text() === 'ATK'
      }).next('p').text();
      $classHP = $('.class-stats').find('p').filter(function() {
        return $(this).text() === 'MAX HP'
      }).next('p').text();
      $classPDEF = $('.class-stats').find('p').filter(function() {
        return $(this).text() === 'P.Def'
      }).next('p').text();
      $classMDEF = $('.class-stats').find('p').filter(function() {
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

      $rAtk = $('#range-atk').text();
      $rHP = $('#range-hp').text();

      $totalA = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'ATK'
      }).next('p');
      $totalH = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'MAX HP'
      }).next('p');
      $totalP = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'P.Def'
      }).next('p');
      $totalM = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'M.Def'
      }).next('p');
      if ($jewelType == 'Earrings') {
        $totalJ = $('.t-total .r-stats').find('p').filter(function() {
          return $(this).text() === 'ATK'
        }).next('p');
      } else if (($jewelType == 'Ring') || ($jewelType == 'Unequip')) {
        $totalJ = $('.t-total .r-stats').find('p').filter(function() {
          return $(this).text() === 'MAX HP'
        }).next('p');
      } else if ($jewelType == 'Necklace') {
        $totalJ = $('.t-total .r-stats').find('p').filter(function() {
          return $(this).text() === 'M.DEF'
        }).next('p');
      } else if ($jewelType == 'Bracelet') {
        $totalJ = $('.t-total .r-stats').find('p').filter(function() {
          return $(this).text() === 'P.DEF'
        }).next('p');
      }
      $totalO = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'MAX HP'
      }).next('p');

      // atk
      $jewelType == 'Earrings' ? $sumAtk = parseInt($classATK) + parseInt($gearA) + parseInt($gearJ) + parseInt($('#range-atk').text()) : $sumAtk = parseInt($classATK) + parseInt($gearA) + parseInt($('#range-atk').text());
      $opA = $('p[name="ATK"]').text();
      $opA === '' ? $totalA.text($sumAtk + ' (' + $classATK + '+' + ($sumAtk - $classATK) + ')') : $totalA.text(Math.round($sumAtk * ($opA / 100 + 1)) + ' (' + $classATK + '+' + (Math.round($sumAtk * ($opA / 100 + 1)) - $classATK) + ')');
      // hp
      $jewelType == 'Ring' ? $sumTre = parseInt($classHP) + parseInt($gearTr) + parseInt($gearJ) + parseInt($gearO) + parseInt($('#range-hp').text()) : $sumTre = parseInt($classHP) + parseInt($gearTr) + parseInt($gearO) + parseInt($('#range-hp').text());
      $opH = $('p[name="Max HP"]').text();
      $opH === '' ? $totalH.text($sumTre + ' (' + $classHP + '+' + ($sumTre - $classHP) + ')') : $totalH.text(Math.round($sumTre * ($opH / 100 + 1)) + ' (' + $classHP + '+' + (Math.round($sumTre * ($opH / 100 + 1)) - $classHP) + ')');
      $('#heroHP').text($totalH.text());
      $('#heroHPs').text($totalH.text().split(' ')[0]);
      // p def
      if ($armorSet !== '- - - - - - - - - -') {
        $sumArm = parseInt($classPDEF) + parseInt($gearP) + parseInt($gearJ);
        if ($gearP !== 0) {
          if ($jewelType == 'Bracelet')
            $gearJ == 0 ? $totalP.text($sumArm + ' (' + $classPDEF + '+' + $gearP + ')') : $totalP.text($sumArm + ' (' + $classPDEF + '+' + ($gearP + $gearJ) + ')');
          else
            $totalP.text(($classPDEF + $gearP) + ' (' + $classPDEF + '+' + $gearP + ')');
        }
      } else
        $totalP.text($classPDEF);
      // m def
      if ($secondarySet !== '- - - - - - - - - -') {
        $sumSec = parseInt($classMDEF) + parseInt($gearM) + parseInt($gearJ);
        if ($gearM !== 0) {
          if ($jewelType == 'Necklace')
            $gearJ == 0 ? $totalM.text($sumSec + parseInt($gearM) + ' (' + $classMDEF + '+' + $gearM + ')') : $totalM.text($sumSec + ' (' + $classMDEF + '+' + (parseInt($gearM) + parseInt($gearJ)) + ')');
          else
            $totalM.text(($classMDEF + $gearM) + ' (' + $classMDEF + '+' + $gearM + ')');
        }
      } else
        $totalM.text($classMDEF);
      // jewel
      if ($jewelSet !== '- - - - - - - - - -') {
        if ($jewelType == 'Ring')
          $sumAcc = parseInt($classHP) + parseInt($gearTr) + parseInt($gearJ) + parseInt($gearO) + parseInt($('#range-hp').text());
        else if ($jewelType == 'Earrings')
          $sumAcc = parseInt($classATK) + parseInt($gearA) + parseInt($gearJ) + parseInt($rAtk);
        else if ($jewelType == 'Necklace')
          $sumAcc = parseInt($classMDEF) + parseInt($gearM) + parseInt($gearJ);
        else if ($jewelType == 'Bracelet')
          $sumAcc = parseInt($classPDEF) + parseInt($gearP) + parseInt($gearJ);

        if ($gearJ !== 0) {
          if ($jewelType == 'Ring') {
            $opJ = $('p[name="Max HP"]').text();
            $opJ === '' ? $totalJ.text($sumAcc + ' (' + $classHP + '+' + ($sumAcc - $classHP) + ')') : $totalJ.text(Math.round($sumAcc * ($opJ / 100 + 1)) + ' (' + $classHP + '+' + (Math.round($sumAcc * ($opJ / 100 + 1)) - $classHP) + ')');
            $('#heroHP').text($totalJ.text());
            $('#heroHPs').text($totalJ.text().split(' ')[0]);
          } else if ($jewelType == 'Earrings') {
            $opJ = $('p[name="ATK"]').text();
            $opJ === '' ? $totalJ.text($sumAcc + ' (' + $classATK + '+' + ($sumAcc - $classATK) + ')') : $totalJ.text(Math.round($sumAcc * ($opJ / 100 + 1)) + ' (' + $classATK + '+' + (Math.round($sumAcc * ($opJ / 100 + 1)) - $classATK) + ')');
          } else if ($jewelType == 'Necklace') {
            $opJ = $('p[name="M.DEF"]').text();
            $opJ === '' ? $totalJ.text($sumAcc + ' (' + $classMDEF + '+' + ($sumAcc - $classMDEF) + ')') : $totalJ.text(Math.round($sumAcc * ($opJ / 100 + 1)) + ' (' + $classMDEF + '+' + (Math.round($sumAcc * ($opJ / 100 + 1)) - $classMDEF) + ')');
          } else if ($jewelType == 'Bracelet') {
            $opJ = $('p[name="P.DEF"]').text();
            $opJ === '' ? $totalJ.text($sumAcc + ' (' + $classPDEF + '+' + ($sumAcc - $classPDEF) + ')') : $totalJ.text(Math.round($sumAcc * ($opJ / 100 + 1)) + ' (' + $classPDEF + '+' + (Math.round($sumAcc * ($opJ / 100 + 1)) - $classPDEF) + ')');
          }
        }
      }
      // orb
      $jewelType == 'Ring' ? $sumOrb = parseInt($classHP) + parseInt($gearTr) + parseInt($gearJ) + parseInt($gearO) + parseInt($('#range-hp').text()) : $sumOrb = parseInt($classHP) + parseInt($gearTr) + parseInt($gearO) + parseInt($('#range-hp').text());
      $opO = $('p[name="Max HP"]').text();
      $opO === '' ? $totalO.text($sumOrb + ' (' + $classHP + '+' + ($sumOrb - $classHP) + ')') : $totalO.text(Math.round($sumOrb * ($opO / 100 + 1)) + ' (' + Math.round($classHP + '+' + ($sumOrb * ($opO / 100 + 1)) - $classHP) + ')');
      $('#heroHP').text($totalO.text());
      $('#heroHPs').text($totalO.text().split(' ')[0]);
    };
    // Set Bonus
    function gearSet() {
      $setBonus = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'Set Bonus'
      }).next('p');
      if (!$setBonus.length)
        $setBonus = $('.t-total .r-stats').append('<div class="statSet"><div class="r-set"><p id="s-name">Set Bonus</p><p id="sb"><span id="f1">2 Set: Crit +100</span><span id="f2">4 Set: Crit +130</span><span id="fr1">2 Set: Max HP +10%</span><span id="fr2">4 Set: Max HP +13%</span><span id="p1">2 Set: Crit Resistance +100</span><span id="p2">4 Set: Crit Resistance +130</span><span id="d1">2 Set: MP Recovery/Attack +200</span><span id="d2">4 Set: MP Recovery/Attack +260</span><span id="la1">2 Set: Crit DMG +20%</span><span id="la2">4 Set: Crit DMG +26%</span><span id="le1">2 Set: Debuff ACC +100</span><span id="le2">4 Set: Debuff ACC +130</span><span id="s1">2 Set: Increases DMG to Heroes by 7%</span><span id="s2">4 Set: Increases DMG to Heroes by 13%</span><span id="pr1">2 Set: Reduces DMG recevied from Heroes by 6%</span><span id="pr2">4 Set: Reduces DMG recevied from Heroes by 11%</span><span id="dl1">2 Set: Increases Crit DMG of all allies by 5%</span><span id="dl2">4 Set: Increases Crit DMG of all allies by 8%</span><span id="ch1">2 Set: Hero deals 12% more DMG and takes 12% less DMG from bosses</span><span id="ch2">4 Set: Hero deals 15% more DMG and takes 15% less DMG from bosses</span><span id="t1">2 Set: Increases DMG dealt to enemies by 2%\n This effect increases by 4 times in the Technomagic Kingdom</span><span id="t2">4 Set: Increases DMG dealt to enemies by 3%\n This effect increases by 4 times in the Technomagic Kingdom</span></p></div></div>');
      $setBonus.find('span').hide();
      $statCrit = $('.class-stats').find('p').filter(function() {
        return $(this).text() === 'Crit'
      }).next('p');
      $statHP = $('.class-stats').find('p').filter(function() {
        return $(this).text() === 'MAX HP'
      }).next('p');
      $statGrey = parseInt($('#heroHP').text());
      $statCritResP = $('.class-stats').find('p').filter(function() {
        return $(this).text() === 'P.Crit Resistance'
      }).next('p');
      $statCritResM = $('.class-stats').find('p').filter(function() {
        return $(this).text() === 'M.Crit Resistance'
      }).next('p');
      $statMPa = $('.class-stats').find('p').filter(function() {
        return $(this).text() === 'MP Recovery/Attack'
      }).next('p');
      $statCritD = $('.class-stats').find('p').filter(function() {
        return $(this).text() === 'Crit DMG'
      }).next('p');
      $statDebuff = $('.class-stats').find('p').filter(function() {
        return $(this).text() === 'Debuff ACC'
      }).next('p');
      $statASpd = $('.class-stats').find('p').filter(function() {
        return $(this).text() === 'ATK Spd'
      }).next('p');
      $statMPs = $('.class-stats').find('p').filter(function() {
        return $(this).text() === 'MP Recovery/Sec'
      }).next('p');
      $statPen = $('.class-stats').find('p').filter(function() {
        return $(this).text() === 'Penetration'
      }).next('p');
      $statLife = $('.class-stats').find('p').filter(function() {
        return $(this).text() === 'Lifesteal'
      }).next('p');
      $statACC = $('.class-stats').find('p').filter(function() {
        return $(this).text() === 'ACC'
      }).next('p');
      $statCC = $('.class-stats').find('p').filter(function() {
        return $(this).text() === 'CC Resist'
      }).next('p');
      $statPB = $('.class-stats').find('p').filter(function() {
        return $(this).text() === 'P.Block'
      }).next('p');
      $statMB = $('.class-stats').find('p').filter(function() {
        return $(this).text() === 'M.Block'
      }).next('p');
      $statPBD = $('.class-stats').find('p').filter(function() {
        return $(this).text() === 'P.Block DEF'
      }).next('p');
      $statMBD = $('.class-stats').find('p').filter(function() {
        return $(this).text() === 'M.Block DEF'
      }).next('p');
      $statPDef = $('.class-stats').find('p').filter(function() {
        return $(this).text() === 'P.DEF'
      }).next('p');
      $statMDef = $('.class-stats').find('p').filter(function() {
        return $(this).text() === 'M.DEF'
      }).next('p');
      $statPD = $('.class-stats').find('p').filter(function() {
        return $(this).text() === 'P.Dodge'
      }).next('p');
      $statMD = $('.class-stats').find('p').filter(function() {
        return $(this).text() === 'M.Dodge'
      }).next('p');
      $statPT = $('.class-stats').find('p').filter(function() {
        return $(this).text() === 'P.Tough'
      }).next('p');
      $statMT = $('.class-stats').find('p').filter(function() {
        return $(this).text() === 'M.Tough'
      }).next('p');
      $statRec = $('.class-stats').find('p').filter(function() {
        return $(this).text() === 'Recovery'
      }).next('p');
      $statManaRec = $('.class-stats').find('p').filter(function() {
        return $(this).text() === 'Mana Recovery upon taking DMG'
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

      $tPDef = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'P.DEF'
      }).next('p');
      $tMDef = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'M.DEF'
      }).next('p');
      $tCrit = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'Crit'
      }).next('p');
      $tHP = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'MAX HP'
      }).next('p');
      $tPCritRes = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'P.Crit Resistance'
      }).next('p');
      $tMCritRes = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'M.Crit Resistance'
      }).next('p');
      $tMPa = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'MP Recovery/Attack'
      }).next('p');
      $tCritDMG = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'Crit DMG'
      }).next('p');
      $tDebuffACC = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'Debuff ACC'
      }).next('p');
      $tPen = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'Penetration'
      }).next('p');
      $tACC = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'ACC'
      }).next('p');
      $tPDodge = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'P.Dodge'
      }).next('p');
      $tMDodge = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'M.Dodge'
      }).next('p');
      $tPB = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'P.Block'
      }).next('p');
      $tMB = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'M.Block'
      }).next('p');
      $tPBD = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'P.Block DEF'
      }).next('p');
      $tMBD = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'M.Block DEF'
      }).next('p');
      $tPT = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'P.Tough'
      }).next('p');
      $tMT = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'M.Tough'
      }).next('p');
      $tRec = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'Recovery'
      }).next('p');
      $tCC = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'CC Resist'
      }).next('p');
      $tLife = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'Lifesteal'
      }).next('p');
      $tASpd = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'ATK Spd'
      }).next('p');
      $tMPs = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'MP Recovery/Sec'
      }).next('p');
      $tManaRec = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'Mana Recovery upon taking DMG'
      }).next('p');

      $stCrit = $('p[name="Crit"]').text();
      if ($stCrit === '')
        $stCrit = 0;
      $sumCrit = parseInt($statCrit.text()) + parseInt($stCrit);
      if (($f > 1) && ($f < 4)) {
        $tCrit.text($sumCrit + 100 + ' (' + $statCrit.text() + '+' + (parseInt($stCrit) + 100) + ')');
        $setBonus.find('#f1').show();
      }
      else if ($f == 4) {
        $tCrit.text($sumCrit + 230 + ' (' + $statCrit.text() + '+' + (parseInt($stCrit) + 230) + ')');
        $setBonus.find('#f1, #f2').show();
      } else
        $tCrit.text($sumCrit + ' (' + $statCrit.text() + '+' + ($sumCrit - $statCrit.text()) + ')');

      $stHP = $('p[name="Max HP"]').text();
      if ($stHP === '')
        $stHP = 0;
      $('#calc_gear_treasure').children('option:selected').val() !== '- - - - - - - - - -' ? $trhp = parseInt($('#heroTR').text()) : $trhp = 0;
      $('#calc_gear_jewelry').children().children('option:selected').parent().attr('label') == 'Ring' ? $jhp = parseInt($('#heroJ').text()) : $jhp = 0;
      $ohp = $('#heroO').text();
      if ($('#heroO').text() == '')
        $ohp = 0;
      $sumHP = parseInt($statHP.text()) + parseInt($trhp) + parseInt($jhp) + parseInt($ohp) + parseInt($('#range-hp').text());
      if (($fr > 1) && ($fr < 4)) {
        $qe = parseInt(Math.round($sumHP * (1.1 + $stHP/100)));
        $tHP.text($qe + ' (' + $statHP.text() + '+' + ($qe - $statHP.text()) + ')');
        $setBonus.find('#fr1').show();
      } else if ($fr == 4) {
        $qe = parseInt(Math.round($sumHP * (1.23 + $stHP/100)));
        $tHP.text($qe + ' (' + $statHP.text() + '+' + ($qe - $statHP.text()) + ')');
        $setBonus.find('#fr1, #fr2').show();
      } else {
        $qe = parseInt(Math.round($sumHP * (1 + $stHP/100)));
        $tHP.text($qe + ' (' + $statHP.text() + '+' + ($qe - $statHP.text()) + ')');
      }

      $stCR = $('p[name="Crit Resistance"]').text();
      if ($stCR === '')
        $stCR = 0;
      $stPCR = $('p[name="P.Crit Resistance"]').text();
      if ($stPCR === '')
        $stPCR = 0;
      $sumPCR = parseInt($statCritResP.text()) + parseInt($stPCR) + parseInt($stCR);
      $stMCR = $('p[name="M.Crit Resistance"]').text();
      if ($stMCR === '')
        $stMCR = 0;
      $sumMCR = parseInt($statCritResM.text()) + parseInt($stMCR) + parseInt($stCR);
      if (($p > 1) && ($p < 4)) {
        $tPCritRes.text($sumPCR + 100 + ' (' + $statCritResP.text() + '+' + parseInt($sumPCR + 100) + ')');
        $tMCritRes.text($sumMCR + 100 + ' (' + $statCritResM.text() + '+' + parseInt($sumMCR + 100) + ')');
        $setBonus.find('#p1').show();
      } else if ($p == 4) {
        $tPCritRes.text($sumPCR + 230 + ' (' + $statCritResP.text() + '+' + parseInt($sumPCR + 230) + ')');
        $tMCritRes.text($sumMCR + 230 + ' (' + $statCritResM.text() + '+' + parseInt($sumMCR + 230) + ')');
        $setBonus.find('#p1, #p2').show();
      } else {
        $tPCritRes.text($sumPCR + ' (' + $statCritResP.text() + '+' + ($sumPCR - $statCritResP.text()) + ')');
        $tMCritRes.text($sumMCR + ' (' + $statCritResM.text() + '+' + ($sumMCR - $statCritResM.text()) + ')');
      }

      $stDef = $('p[name="DEF"]').text();
      if ($stDef === '')
        $stDef = 0;
      $stPDef = $('p[name="P.DEF"]').text();
      if ($stPDef === '')
        $stPDef = 0;
      $apd = parseInt($('#heroPDEF').text());
      if ($('#heroPDEF').text() === '')
        $apd = 0;
      $('#calc_gear_jewelry').children().children('option:selected').parent().attr('label') == 'Bracelet' ? $jpd = parseInt($('#heroJ').text()) : $jpd = 0;
      $qPD = parseInt(Math.round((parseInt($statPDef.text()) + $apd + $jpd) * (1 + (parseInt($stPDef) + parseInt($stDef))/100)));
      $stMDef = $('p[name="M.DEF"]').text();
      if ($stMDef === '')
        $stMDef = 0;
      $amd = parseInt($('#heroMDEF').text());
      if ($('#heroMDEF').text() === '')
        $amd = 0;
      $('#calc_gear_jewelry').children().children('option:selected').parent().attr('label') == 'Necklace' ? $jmd = parseInt($('#heroJ').text()) : $jmd = 0;
      $qMD = parseInt(Math.round((parseInt($statMDef.text()) + $amd + $jmd) * (1 + (parseInt($stMDef) + parseInt($stDef))/100)));
      $tPDef.text($qPD + ' (' + $statPDef.text() + '+' + ($qPD - parseInt($statPDef.text())) + ')');
      $tMDef.text($qMD + ' (' + $statMDef.text() + '+' + ($qMD - parseInt($statMDef.text())) + ')');

      $stMPa = $('p[name="MP Recovery/Attack"]').text();
      if ($stMPa === '')
        $stMPa = 0;
      $sumMPa = parseInt($statMPa.text()) + parseInt($stMPa);
      if (($d > 1) && ($d < 4)) {
        $tMPa.text($sumMPa + 200 + ' (' + $statMPa.text() + '+' + (parseInt($stMPa) + 200) + ')');
        $setBonus.find('#d1').show();
      } else if ($d == 4) {
        $tMPa.text($sumMPa + 460 + ' (' + $statMPa.text() + '+' + (parseInt($stMPa) + 460) + ')');
        $setBonus.find('#d1, #d2').show();
      } else
        $tMPa.text($sumMPa + ' (' + $statMPa.text() + '+' + ($sumMPa - $statMPa.text()) + ')');

      $stCritD = $('p[name="Crit DMG"]').text();
      if ($stCritD === '')
        $stCritD = 0;
      $sumCritD = parseInt($statCritD.text()) + parseInt($stCritD);
      if (($la > 1) && ($la < 4)) {
        $tCritDMG.text($sumCritD + 20 + '% (' + $statCritD.text() + '%+' + (parseInt($stCritD) + 20) + '%)');
        $setBonus.find('#la1').show();
      } else if ($la == 4) {
        $tCritDMG.text($sumCritD + 46 + '% (' + $statCritD.text() + '%+' + (parseInt($stCritD) + 46) + '%)');
        $setBonus.find('#la1, #la2').show();
      } else
        $tCritDMG.text($sumCritD + '%' +' (' + $statCritD.text() + '%+' + ($sumCritD - $statCritD.text()) + '%)');

      $stDebuff = $('p[name="Debuff ACC"]').text();
      if ($stDebuff === '')
        $stDebuff = 0;
      $sumDebuff = parseInt($statDebuff.text()) + parseInt($stDebuff);
      if (($le > 1) && ($le < 4)) {
        $tDebuffACC.text($sumDebuff + 100 + ' (' + $statDebuff.text() + '+' + parseInt($sumDebuff + 100) + ')');
        $setBonus.find('#le1').show();
      } else if ($le == 4) {
        $tDebuffACC.text($sumDebuff + 230 + ' (' + $statDebuff.text() + '+' + parseInt($sumDebuff + 230) + ')');
        $setBonus.find('#le1, #le2').show();
      } else
        $tDebuffACC.text($sumDebuff + ' (' + $statDebuff.text() + '+' + ($sumDebuff - $statDebuff.text()) + ')');

      $stPen = $('p[name="Penetration"]').text();
      if ($stPen === '')
        $stPen = 0;
      $sumPen = parseInt($statPen.text()) + parseInt($stPen);
      $tPen.text($sumPen + ' (' + $statPen.text() + '+' + ($sumPen - $statPen.text()) + ')');

      $stLife = $('p[name="Lifesteal"]').text();
      if ($stLife === '')
        $stLife = 0;
      $sumLife = parseInt($statLife.text()) + parseInt($stLife);
      $tLife.text($sumLife + ' (' + $statLife.text() + '+' + ($sumLife - $statLife.text()) + ')');

      $stASpd = $('p[name="ATK Spd"]').text();
      if ($stASpd === '')
        $stASpd = 0;
      $sumASpd = parseInt($statASpd.text()) + parseInt($stASpd);
      $tASpd.text($sumASpd + ' (' + $statASpd.text() + '+' + ($sumASpd - $statASpd.text()) + ')');

      $stACC = $('p[name="ACC"]').text();
      if ($stACC === '')
        $stACC = 0;
      $sumACC = parseInt($statACC.text()) + parseInt($stACC);
      $tACC.text($sumACC + ' (' + $statACC.text() + '+' + ($sumACC - $statACC.text()) + ')');

      $stCC = $('p[name="CC Resist"]').text();
      if ($stCC === '')
        $stCC = 0;
      $sumCC = parseInt($statCC.text()) + parseInt($stCC);
      $tCC.text($sumCC + ' (' + $statCC.text() + '+' + ($sumCC - $statCC.text()) + ')');

      $stRec = $('p[name="Recovery"]').text();
      if ($stRec === '')
        $stRec = 0;
      $sumRec = parseInt($statRec.text()) + parseInt($stRec);
      $tRec.text($sumRec + '%' + ' (' + $statRec.text() + '%+' + ($sumRec - $statRec.text()) + '%)');

      $stMPs = $('p[name="MP Recovery/Sec"]').text();
      if ($stMPs === '')
        $stMPs = 0;
      $sumMPs = parseInt($statMPs.text()) + parseInt($stMPs);
      $tMPs.text($sumMPs + ' (' + $statMPs.text() + '+' + ($sumMPs - $statMPs.text()) + ')');

      $stDodge = $('p[name="Dodge"]').text();
      if ($stDodge === '')
        $stDodge = 0;
      $stPDodge = $('p[name="P.Dodge"]').text();
      if ($stPDodge === '')
        $stPDodge = 0;
      $sumPDodge = parseInt($statPD.text()) + parseInt($stPDodge) + parseInt($stDodge);
      $stMDodge = $('p[name="M.Dodge"]').text();
      if ($stMDodge === '')
        $stMDodge = 0;
      $sumMDodge = parseInt($statMD.text()) + parseInt($stMDodge) + parseInt($stDodge);
      $tPDodge.text($sumPDodge + ' (' + $statPD.text() + '+' + ($sumPDodge - $statPD.text()) + ')');
      $tMDodge.text($sumMDodge + ' (' + $statMD.text() + '+' + ($sumMDodge - $statMD.text()) + ')');

      $stB = $('p[name="Block"]').text();
      if ($stB === '')
        $stB = 0;
      $stPB = $('p[name="P.Block"]').text();
      if ($stPB === '')
        $stPB = 0;
      $sumPB = parseInt($statPB.text()) + parseInt($stPB) + parseInt($stB);
      $stMB = $('p[name="M.Block"]').text();
      if ($stMB === '')
        $stMB = 0;
      $sumMB = parseInt($statMB.text()) + parseInt($stMB) + parseInt($stB);
      $tPB.text($sumPB + ' (' + $statPB.text() + '+' + ($sumPB - $statPB.text()) + ')');
      $tMB.text($sumMB + ' (' + $statMB.text() + '+' + ($sumMB - $statMB.text()) + ')');

      $stBD = $('p[name="Block DEF"]').text();
      if ($stBD === '')
        $stBD = 0;
      $stPBD = $('p[name="P.Block DEF"]').text();
      if ($stPBD === '')
        $stPBD = 0;
      $sumPBD = parseInt($statPBD.text()) + parseInt($stPBD) + parseInt($stBD);
      $stMBD = $('p[name="M.Block DEF"]').text();
      if ($stMBD === '')
        $stMBD = 0;
      $sumMBD = parseInt($statMBD.text()) + parseInt($stMBD) + parseInt($stBD);
      $tPBD.text($sumPBD + ' (' + $statPBD.text() + '+' + ($sumPBD - $statPBD.text()) + ')');
      $tMBD.text($sumMBD + ' (' + $statMBD.text() + '+' + ($sumMBD - $statMBD.text()) + ')');

      $stT = $('p[name="Tough"]').text();
      if ($stT === '')
        $stT = 0;
      $stPT = $('p[name="P.Tough"]').text();
      if ($stPT === '')
        $stPT = 0;
      $sumPT = parseInt($statPT.text()) + parseInt($stPT) + parseInt($stT);
      $stMT = $('p[name="M.Tough"]').text();
      if ($stMT === '')
        $stMT = 0;
      $sumMT = parseInt($statMT.text()) + parseInt($stMT) + parseInt($stT);
      $tPT.text($sumPT + ' (' + $statPT.text() + '+' + ($sumPT - $statPT.text()) + ')');
      $tMT.text($sumMT + ' (' + $statMT.text() + '+' + ($sumMT - $statMT.text()) + ')');

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

      statSplit();
    };
    // Hero Icon
    function heroImg() {
      $('.hero-img').children().hide();
      $heroImg = $('#calc_char_id').children('option:selected').val();
      $('.hero-img').find('.hero-' + $heroImg).css('display', 'block');
    };
    // Perk Icons
    function perkTP() {
      $tp_1 = 0;$tp_2 = 0;$tp_3 = 0;$tp_5 = 0;
      $hero = $('#calc_char_id').children('option:selected').val();
      $('.hero-img .hero-' + $hero).find('.c-p').each(function() {
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
    // Disabled non-Class
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
    };
    // Gear Options
    function statOption() {
      $('.opt').find($statName).each(function() {
        $(this).parent().next().children().find('optgroup').hide();
        $st = $(this).children('option:selected').text();
        if (($st == 'ATK') || ($st == 'Max HP') || ($st == 'DEF'))
          $(this).parent().next().children().find('#q1').show();
        else if (($st == 'MP Recovery/Sec') || ($st == 'Mana Recovery upon taking DMG'))
          $(this).parent().next().children().find('#q2').show();
        else if (($st == 'Crit DMG') || ($st == 'P.DEF') || ($st == 'M.DEF') || ($st == 'Recovery'))
          $(this).parent().next().children().find('#q3').show();
        else if (($st == 'ATK Spd') || ($st == 'Crit') || ($st == 'Lifesteal') || ($st == 'ACC') || ($st == 'Debuff ACC') || ($st == 'CC Resist') || ($st == 'Block') || ($st == 'Crit Resistance') || ($st == 'P.Dodge') || ($st == 'M.Dodge') || ($st == 'P.Tough') || ($st == 'M.Tough') || ($st == 'P.Resistance') || ($st == 'M.Resistance') || ($st == 'DMG Reduction upon P.Block') || ($st == 'DMG Reduction upon M.Block') || ($st == 'P.Block DEF') || ($st == 'M.Block DEF'))
          $(this).parent().next().children().find('#q4').show();
        else if (($st == 'MP Recovery/Attack') || ($st == 'P.Block') || ($st == 'M.Block') || ($st == 'P.Crit Resistance') || ($st == 'M.Crit Resistance'))
          $(this).parent().next().children().find('#q5').show();
        else if ($st == 'Penetration')
          $(this).parent().next().children().find('#q6').show();
        else if (($st == 'Dodge') || ($st == 'Tough') || ($st == 'Resistance') || ($st == 'DMG Reduction upon Block'))
          $(this).parent().next().children().find('#q7').show();
        else
          $(this).parent().next().children().find('#q').show();
      });
    };
    function statOptionTr() {
      $starTr = $('#ut').find('.active').next('input').val();
      $ayTr0 = '<optgroup id="q"><option value="0">- - - </option></optgroup><optgroup id="q1" label="Stat"><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></optgroup><optgroup id="q2" label="Stat"><option value="15">15</option><option value="18">18</option><option value="21">21</option><option value="24">24</option><option value="27">27</option></optgroup><optgroup id="q3" label="Stat"><option value="10">10</option><option value="12">12</option><option value="14">14</option><option value="16">16</option><option value="18">18</option></optgroup><optgroup id="q4" label="Stat"><option value="50">50</option><option value="60">60</option><option value="70">70</option><option value="80">80</option><option value="90">90</option></optgroup><optgroup id="q5" label="Stat"><option value="100">100</option><option value="120">120</option><option value="140">140</option><option value="160">160</option><option value="180">180</option></optgroup><optgroup id="q6" label="Stat"><option value="50">50</option><option value="60">60</option><option value="70">70</option><option value="80">80</option><option value="90">90</option></optgroup><optgroup id="q7" label="Stat"><option value="25">25</option><option value="30">30</option><option value="35">35</option><option value="40">40</option><option value="45">45</option></optgroup>'
      $ayTr1 = '<optgroup id="q"><option value="0">- - - </option></optgroup><optgroup id="q1" label="Stat"><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></optgroup><optgroup id="q2" label="Stat"><option value="18">18</option><option value="21">21</option><option value="24">24</option><option value="27">27</option><option value="30">30</option></optgroup><optgroup id="q3" label="Stat"><option value="12">12</option><option value="14">14</option><option value="16">16</option><option value="18">18</option><option value="20">20</option></optgroup><optgroup id="q4" label="Stat"><option value="60">60</option><option value="70">70</option><option value="80">80</option><option value="90">90</option><option value="100">100</option></optgroup><optgroup id="q5" label="Stat"><option value="120">120</option><option value="140">140</option><option value="160">160</option><option value="180">180</option><option value="200">200</option></optgroup><optgroup id="q6" label="Stat"><option value="60">60</option><option value="70">70</option><option value="80">80</option><option value="90">90</option><option value="100">100</option></optgroup><optgroup id="q7" label="Stat"><option value="30">30</option><option value="35">35</option><option value="40">40</option><option value="45">45</option><option value="50">50</option></optgroup>'
      $ayTr2 = '<optgroup id="q"><option value="0">- - - </option></optgroup><optgroup id="q1" label="Stat"><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option></optgroup><optgroup id="q2" label="Stat"><option value="18">18</option><option value="21">21</option><option value="24">24</option><option value="27">27</option><option value="30">30</option></optgroup><optgroup id="q3" label="Stat"><option value="12">12</option><option value="14">14</option><option value="16">16</option><option value="18">18</option><option value="20">20</option></optgroup><optgroup id="q4" label="Stat"><option value="60">60</option><option value="70">70</option><option value="80">80</option><option value="90">90</option><option value="100">100</option></optgroup><optgroup id="q5" label="Stat"><option value="100">100</option><option value="120">120</option><option value="140">140</option><option value="160">160</option><option value="180">180</option></optgroup><optgroup id="q6" label="Stat"><option value="50">50</option><option value="60">60</option><option value="70">70</option><option value="80">80</option><option value="90">90</option></optgroup><optgroup id="q7" label="Stat"><option value="25">25</option><option value="30">30</option><option value="35">35</option><option value="40">40</option><option value="45">45</option></optgroup>'
      $ayTr3 = '<optgroup id="q"><option value="0">- - - </option></optgroup><optgroup id="q1" label="Stat"><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option></optgroup><optgroup id="q2" label="Stat"><option value="21">21</option><option value="24">24</option><option value="27">27</option><option value="30">30</option><option value="33">33</option></optgroup><optgroup id="q3" label="Stat"><option value="14">14</option><option value="16">16</option><option value="18">18</option><option value="20">20</option><option value="22">22</option></optgroup><optgroup id="q4" label="Stat"><option value="70">70</option><option value="80">80</option><option value="90">90</option><option value="100">100</option><option value="110">110</option></optgroup><optgroup id="q5" label="Stat"><option value="120">120</option><option value="140">140</option><option value="160">160</option><option value="180">180</option><option value="200">200</option></optgroup><optgroup id="q6" label="Stat"><option value="60">60</option><option value="70">70</option><option value="80">80</option><option value="90">90</option><option value="100">100</option></optgroup><optgroup id="q7" label="Stat"><option value="30">30</option><option value="35">35</option><option value="40">40</option><option value="45">45</option><option value="60">60</option></optgroup>'
      $ayTr4 = '<optgroup id="q"><option value="0">- - - </option></optgroup><optgroup id="q1" label="Stat"><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option></optgroup><optgroup id="q2" label="Stat"><option value="24">24</option><option value="27">27</option><option value="30">30</option><option value="33">33</option><option value="36">36</option></optgroup><optgroup id="q3" label="Stat"><option value="16">16</option><option value="18">18</option><option value="20">20</option><option value="22">22</option><option value="24">24</option></optgroup><optgroup id="q4" label="Stat"><option value="80">80</option><option value="90">90</option><option value="100">100</option><option value="110">110</option><option value="120">120</option></optgroup><optgroup id="q5" label="Stat"><option value="120">120</option><option value="140">140</option><option value="160">160</option><option value="180">180</option><option value="200">200</option><option value="240">240</option></optgroup><optgroup id="q6" label="Stat"><option value="60">60</option><option value="70">70</option><option value="80">80</option><option value="90">90</option><option value="100">100</option><option value="110">110</option></optgroup><optgroup id="q7" label="Stat"><option value="35">35</option><option value="40">40</option><option value="45">45</option><option value="60">60</option><option value="65">65</option></optgroup>'
      $ayTr5 = '<optgroup id="q"><option value="0">- - - </option></optgroup><optgroup id="q1" label="Stat"><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option></optgroup><optgroup id="q2" label="Stat"><option value="27">27</option><option value="30">30</option><option value="33">33</option><option value="36">36</option><option value="39">39</option></optgroup><optgroup id="q3" label="Stat"><option value="18">18</option><option value="20">20</option><option value="22">22</option><option value="24">24</option><option value="26">26</option></optgroup><optgroup id="q4" label="Stat"><option value="90">90</option><option value="100">100</option><option value="110">110</option><option value="120">120</option><option value="130">130</option></optgroup><optgroup id="q5" label="Stat"><option value="140">140</option><option value="160">160</option><option value="180">180</option><option value="200">200</option><option value="240">240</option></optgroup><optgroup id="q6" label="Stat"><option value="70">70</option><option value="80">80</option><option value="90">90</option><option value="100">100</option><option value="110">110</option><option value="120">120</option></optgroup><optgroup id="q7" label="Stat"><option value="40">40</option><option value="45">45</option><option value="60">60</option><option value="65">65</option><option value="70">70</option></optgroup>'
      $('#treasure').find('.ay').each(function() {
        if ($starTr == 0)
          $(this).html($ayTr0);
        else if ($starTr == 1)
          $(this).html($ayTr1);
        else if ($starTr == 2)
          $(this).html($ayTr2);
        else if ($starTr == 3)
          $(this).html($ayTr3);
        else if ($starTr == 4)
          $(this).html($ayTr4);
        else if ($starTr == 5)
          $(this).html($ayTr5);
      });
      $('#treasure').find('.ax').each(function() {
        $(this).parent().next().children().find('optgroup').hide();
        $stTr = $(this).children('option:selected').text();
        if (($stTr == 'ATK') || ($stTr == 'Max HP') || ($stTr == 'DEF'))
          $(this).parent().next().children().find('#q1').show();
        else if (($stTr == 'MP Recovery/Sec') || ($stTr == 'Mana Recovery upon taking DMG'))
          $(this).parent().next().children().find('#q2').show();
        else if (($stTr == 'Crit DMG') || ($stTr == 'P.DEF') || ($stTr == 'M.DEF') || ($stTr == 'Recovery'))
          $(this).parent().next().children().find('#q3').show();
        else if (($stTr == 'ATK Spd') || ($stTr == 'Crit') || ($stTr == 'LifestTreal') || ($stTr == 'ACC') || ($stTr == 'Debuff ACC') || ($stTr == 'CC ResistTr') || ($stTr == 'Block') || ($stTr == 'Crit ResistTrance') || ($stTr == 'P.Dodge') || ($stTr == 'M.Dodge') || ($stTr == 'P.Tough') || ($stTr == 'M.Tough') || ($stTr == 'P.ResistTrance') || ($stTr == 'M.ResistTrance') || ($stTr == 'DMG Reduction upon P.Block') || ($stTr == 'DMG Reduction upon M.Block') || ($stTr == 'P.Block DEF') || ($stTr == 'M.Block DEF'))
          $(this).parent().next().children().find('#q4').show();
        else if (($stTr == 'MP Recovery/Attack') || ($stTr == 'P.Block') || ($stTr == 'M.Block') || ($stTr == 'P.Crit ResistTrance') || ($stTr == 'M.Crit ResistTrance'))
          $(this).parent().next().children().find('#q5').show();
        else if ($stTr == 'Penetration')
          $(this).parent().next().children().find('#q6').show();
        else if (($stTr == 'Dodge') || ($stTr == 'Tough') || ($stTr == 'ResistTrance') || ($stTr == 'DMG Reduction upon Block'))
          $(this).parent().next().children().find('#q7').show();
      });
    };
    function statValue() {
      $ax = '<option value="">- - - - - - - - - -</option><option value="ATK">ATK</option><option value="ATK Spd">ATK Spd</option><option value="Crit">Crit</option><option value="Crit DMG">Crit DMG</option><option value="MP Recovery/Attack">MP Recovery/Attack</option><option value="MP Recovery/Sec">MP Recovery/Sec</option><option value="Penetration">Penetration</option><option value="Lifesteal">Lifesteal</option><option value="ACC">ACC</option><option value="Debuff ACC">Debuff ACC</option><option value="Max HP">Max HP</option><option value="CC Resist">CC Resist</option><option value="Block">Block</option><option value="P.Block">P.Block</option><option value="M.Block">M.Block</option><option value="Crit Resistance">Crit Resistance</option><option value="P.Crit Resistance">P.Crit Resistance</option><option value="M.Crit Resistance">M.Crit Resistance</option><option value="DEF">DEF</option><option value="P.DEF">P.DEF</option><option value="M.DEF">M.DEF</option><option value="Dodge">Dodge</option><option value="P.Dodge">P.Dodge</option><option value="M.Dodge">M.Dodge</option>'
      $axTr = '<option value="Resistance">Resistance</option><option value="P.Resistance">P.Resistance</option><option value="M.Resistance">M.Resistance</option><option value="Recovery">Recovery</option><option value="Mana Recovery upon taking DMG">Mana Recovery upon taking DMG</option><option value="DMG Reduction upon Block">DMG Reduction upon Block</option><option value="DMG Reduction upon P.Block">DMG Reduction upon P.Block</option><option value="DMG Reduction upon M.Block">DMG Reduction upon M.Block</option>'
      $ay = '<option value="0" id="q">- - - </option><optgroup id="q1" label="Stat"><option value="7">7</option><option value="7.5">7.5</option><option value="8">8</option><option value="8.5">8.5</option><option value="9">9</option><option value="9.5">9.5</option><option value="10">10</option><option value="10.5">10.5</option><option value="11">11</option><option value="11.5">11.5</option><option value="12">12</option></optgroup><optgroup id="q2" label="Stat"><option value="21">21</option><option value="22.5">22.5</option><option value="24">24</option><option value="25.5">25.5</option><option value="27">27</option><option value="28.5">28.5</option><option value="30">30</option><option value="31.5">31.5</option><option value="33">33</option><option value="34.5">34.5</option><option value="36">36</option></optgroup><optgroup id="q3" label="Stat"><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option></optgroup><optgroup id="q4" label="Stat"><option value="70">70</option><option value="75">75</option><option value="80">80</option><option value="85">85</option><option value="90">90</option><option value="95">95</option><option value="100">100</option><option value="105">105</option><option value="110">110</option><option value="115">115</option><option value="120">120</option></optgroup><optgroup id="q5" label="Stat"><option value="140">140</option><option value="150">150</option><option value="160">160</option><option value="170">170</option><option value="180">180</option><option value="190">190</option><option value="200">200</option><option value="210">210</option><option value="220">220</option><option value="230">230</option><option value="240">240</option></optgroup><optgroup id="q6" label="Stat"><option value="60">60</option><option value="65">65</option><option value="70">70</option><option value="75">75</option><option value="80">80</option><option value="85">85</option><option value="90">90</option><option value="95">95</option><option value="100">100</option><option value="105">105</option><option value="110">110</option></optgroup><optgroup id="q7" label="Stat"><option value="35">35</option><option value="37">37</option><option value="40">40</option><option value="42">42</option><option value="45">45</option><option value="47">47</option><option value="50">50</option><option value="52">52</option><option value="55">55</option><option value="57">57</option><option value="60">60</option></optgroup>'
      $ayTr0 = '<optgroup id="q"><option value="0">- - - </option></optgroup><optgroup id="q1" label="Stat"><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></optgroup><optgroup id="q2" label="Stat"><option value="15">15</option><option value="18">18</option><option value="21">21</option><option value="24">24</option><option value="27">27</option></optgroup><optgroup id="q3" label="Stat"><option value="10">10</option><option value="12">12</option><option value="14">14</option><option value="16">16</option><option value="18">18</option></optgroup><optgroup id="q4" label="Stat"><option value="50">50</option><option value="60">60</option><option value="70">70</option><option value="80">80</option><option value="90">90</option></optgroup><optgroup id="q5" label="Stat"><option value="100">100</option><option value="120">120</option><option value="140">140</option><option value="160">160</option><option value="180">180</option></optgroup><optgroup id="q6" label="Stat"><option value="50">50</option><option value="60">60</option><option value="70">70</option><option value="80">80</option><option value="90">90</option></optgroup><optgroup id="q7" label="Stat"><option value="25">25</option><option value="30">30</option><option value="35">35</option><option value="40">40</option><option value="45">45</option></optgroup>'
      $('.opt').find('.ax').each(function() {
        $(this).html($ax);
      });
      $('.opt').find('.ay').each(function() {
        $(this).html($ay);
      });
      $('.opt').find('#calc_st_treasure').each(function() {
        $(this).html($ax + $axTr);
      });
      $('.opt').find('#calc_st_treasure_st').each(function() {
        $(this).html($ayTr0);
      });
    };
    function option() {
      $sAtk=0;$sAspd=0;$sCr=0;$sCrD=0;$sMPa=0;$sMPs=0;$sPen=0;$sLif=0;$sAcc=0;$sDAcc=0;$sHP=0;$sCC=0;$sBl=0;$sPBl=0;$sMBl=0;$sCR=0;$sPCR=0;$sMCR=0;$sDef=0;$sPDef=0;$sMDef=0;$sDod=0;$sPDod=0;$sMDod=0;$sTgh=0;$sPTgh=0;$sMTgh=0;$sRec=0;$sMRec=0;$sDRB=0;$sDRPB=0;$sDRMB=0;
      $('.t-op p').empty();
      $x = $('.opt .ax').serializeArray();
      $.each($x, function(iX, n) {
        $y = $('.opt .ay').serializeArray()[iX];
        if (n.value == 'ATK') {
          $sAtk += Number(parseFloat($y.value));
          $('.totalStat').find('p[name="ATK"]').text($sAtk);
        } else if (n.value == 'ATK Spd') {
          $sAspd += Number(parseFloat($y.value));
          $('.totalStat').find('p[name="ATK Spd"]').text($sAspd);
        } else if (n.value == 'Crit') {
          $sCr += Number(parseFloat($y.value));
          $('.totalStat').find('p[name="Crit"]').text($sCr);
        } else if (n.value == 'Crit DMG') {
          $sCrD += Number(parseFloat($y.value));
          $('.totalStat').find('p[name="Crit DMG"]').text($sCrD);
        } else if (n.value == 'MP Recovery/Attack') {
          $sMPa += Number(parseFloat($y.value));
          $('.totalStat').find('p[name="MP Recovery/Attack"]').text($sMPa);
        } else if (n.value == 'MP Recovery/Sec') {
          $sMPs += Number(parseFloat($y.value));
          $('.totalStat').find('p[name="MP Recovery/Sec"]').text($sMPs);
        } else if (n.value == 'Penetration') {
          $sPen += Number(parseFloat($y.value));
          $('.totalStat').find('p[name="Penetration"]').text($sPen);
        } else if (n.value == 'Lifesteal') {
          $sLif += Number(parseFloat($y.value));
          $('.totalStat').find('p[name="Lifesteal"]').text($sLif);
        } else if (n.value == 'ACC') {
          $sAcc += Number(parseFloat($y.value));
          $('.totalStat').find('p[name="ACC"]').text($sAcc);
        } else if (n.value == 'Debuff ACC') {
          $sDAcc += Number(parseFloat($y.value));
          $('.totalStat').find('p[name="Debuff ACC"]').text($sDAcc);
        } else if (n.value == 'Max HP') {
          $sHP += Number(parseFloat($y.value));
          $('.totalStat').find('p[name="Max HP"]').text($sHP);
        } else if (n.value == 'CC Resist') {
          $sCC += Number(parseFloat($y.value));
          $('.totalStat').find('p[name="CC Resist"]').text($sCC);
        } else if (n.value == 'Block') {
          $sBl += Number(parseFloat($y.value));
          $('.totalStat').find('p[name="Block"]').text($sBl);
        } else if (n.value == 'P.Block') {
          $sPBl += Number(parseFloat($y.value));
          $('.totalStat').find('p[name="P.Block"]').text($sPBl);
        } else if (n.value == 'M.Block') {
          $sMBl += Number(parseFloat($y.value));
          $('.totalStat').find('p[name="M.Block"]').text($sMBl);
        } else if (n.value == 'Crit Resistance') {
          $sCR += Number(parseFloat($y.value));
          $('.totalStat').find('p[name="Crit Resistance"]').text($sCR);
        } else if (n.value == 'P.Crit Resistance') {
          $sPCR += Number(parseFloat($y.value));
          $('.totalStat').find('p[name="P.Crit Resistance"]').text($sPCR);
        } else if (n.value == 'M.Crit Resistance') {
          $sMCR += Number(parseFloat($y.value));
          $('.totalStat').find('p[name="M.Crit Resistance"]').text($sMCR);
        } else if (n.value == 'DEF') {
          $sDef += Number(parseFloat($y.value));
          $('.totalStat').find('p[name="DEF"]').text($sDef);
        } else if (n.value == 'P.DEF') {
          $sPDef += Number(parseFloat($y.value));
          $('.totalStat').find('p[name="P.DEF"]').text($sPDef);
        } else if (n.value == 'M.DEF') {
          $sMDef += Number(parseFloat($y.value));
          $('.totalStat').find('p[name="M.DEF"]').text($sMDef);
        } else if (n.value == 'Dodge') {
          $sDod += Number(parseFloat($y.value));
          $('.totalStat').find('p[name="Dodge"]').text($sDod);
        } else if (n.value == 'P.Dodge') {
          $sPDod += Number(parseFloat($y.value));
          $('.totalStat').find('p[name="P.Dodge"]').text($sPDod);
        } else if (n.value == 'M.Dodge') {
          $sMDod += Number(parseFloat($y.value));
          $('.totalStat').find('p[name="M.Dodge"]').text($sMDod);
        } else if (n.value == 'Tough') {
          $sTgh += Number(parseFloat($y.value));
          $('.totalStat').find('p[name="Tough"]').text($sTgh);
        } else if (n.value == 'P.Tough') {
          $sPTgh += Number(parseFloat($y.value));
          $('.totalStat').find('p[name="P.Tough"]').text($sPTgh);
        } else if (n.value == 'M.Tough') {
          $sMTgh += Number(parseFloat($y.value));
          $('.totalStat').find('p[name="M.Tough"]').text($sMTgh);
        } else if (n.value == 'Resistance') {
          $sTgh += Number(parseFloat($y.value));
          $('.totalStat').find('p[name="Tough"]').text($sTgh);
        } else if (n.value == 'P.Resistance') {
          $sPTgh += Number(parseFloat($y.value));
          $('.totalStat').find('p[name="P.Tough"]').text($sPTgh);
        } else if (n.value == 'M.Resistance') {
          $sMTgh += Number(parseFloat($y.value));
          $('.totalStat').find('p[name="M.Tough"]').text($sMTgh);
        } else if (n.value == 'Recovery') {
          $sRec += Number(parseFloat($y.value));
          $('.totalStat').find('p[name="Recovery"]').text($sRec);
        } else if (n.value == 'Mana Recovery upon taking DMG') {
          $sMRec += Number(parseFloat($y.value));
          $('.totalStat').find('p[name="Mana Recovery upon taking DMG"]').text($sMRec);
        } else if (n.value == 'DMG Reduction upon Block') {
          $sDRB += Number(parseFloat($y.value));
          $('.totalStat').find('p[name="Block DEF"]').text($sDRB);
        } else if (n.value == 'DMG Reduction upon P.Block') {
          $sDRPB += Number(parseFloat($y.value));
          $('.totalStat').find('p[name="P.Block DEF"]').text($sDRPB);
        } else if (n.value == 'DMG Reduction upon M.Block') {
          $sDRMB += Number(parseFloat($y.value));
          $('.totalStat').find('p[name="M.Block DEF"]').text($sDRMB);
        }
      });
    };
    // Gear Star changes
    $('.rating label').click(function() {
      if ($(this).parent().parent().parent().attr('id') == 'treasure')
        statOptionTr();
      option();
      gearStat();
      gearSet();
    });
    $('#calc_role_id, #calc_char_id').change(function() {
      hideGearImage();
    });
    // SW Stats changes
    function rangeSlider() {
      $('.range').each(function() {
        $('[name="range"], [name="add-atk"], [name="add-hp"]').on('input', function() {
          swStat();
        });
      });
    };
    rangeSlider();
    $('[name="range"], [name="add-atk"], [name="add-hp"]').change(function() {
      gearStat();
      gearSet();
    });
    $('.w-ad').change(function() {
      var x = '<option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option>',
          y = '<option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option>',
          z = '<option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option>';
      if ($('.w-ad').val() === 'Adv.0')
        $('.w-ad-ench').html(x);
      else if ($('.w-ad').val() === 'Adv.1')
        $('.w-ad-ench').html(y);
      else if ($('.w-ad').val() === 'Adv.2')
        $('.w-ad-ench').html(z);
      else
        $('.w-ad-ench').html('<option value="">- - -</option>');
    });
    function swStat() {
      $sw_atk = 0;
      $sw_hp = 0;
      $sw_atk_b = 0;
      $sw_hp_b = 0;
      var x = parseFloat($('[name="range"]').val()).toFixed(1);
      var y = $('[name="add-atk"]').val();
      var z = $('[name="add-hp"]').val();
      $('.range-ou1').html(x + '%');
      $('.range-ou2').html((100 - x).toFixed(1) + '%');
      if ($adv == 'Adv.0') {
        $sw_atk = parseFloat($swA) * $mltp * (x / 100) * 2;
        $sw_hp = parseFloat($swH) * $mltp * ((100 - x) / 100) * 2;
      } else if ($adv == 'Adv.1') {
        $sw_atk = parseFloat($swA) * $mltp * 2 * (x / 100) * 2;
        $sw_hp = parseFloat($swH) * $mltp * 2 * ((100 - x) / 100) * 2;
      } else if ($adv == 'Adv.2') {
        $sw_atk = parseFloat($swA) * $mltp * 4 * (x / 100) * 2;
        $sw_hp = parseFloat($swH) * $mltp * 4 * ((100 - x) / 100) * 2;
      } else {
        $sw_atk = 0;
        $sw_hp = 0;
      }
      $('.range-ad1').html(y + '%');
      $('.range-ad2').html(z + '%');
      y > 0 ? $('#range-atk').html(Math.round($sw_atk + ($sw_atk * (y / 100)))) : $('#range-atk').html(Math.round($sw_atk));
      z > 0 ? $('#range-hp').html(Math.round($sw_hp + ($sw_hp * (z / 100)))) : $('#range-hp').html(Math.round($sw_hp));
    };
    function rangeC(){
      $('.range-ou1, .range-ou2').text('50.0%');
      $('[name="range"]').val(50);
      $('.range-ad1, .range-ad2').text('0%');
      $('[name="add-atk"], [name="add-hp"]').val(0);
    };
    // Hero split/hide 0-stat
    function statSplit() {
      $('.t-total').find('#s-val').each(function() {
        $statSplit = $(this).text().split('(').pop().slice(0, -1).split('+').pop();
        if (($statSplit == '0%') || ($statSplit == '0'))
          $(this).html($(this).text().split(' ').shift());
        else if ($(this).is(':contains("(")') == true)
          $(this).html('<span id="plsSt1">' + $(this).text().split(' ').shift() + '</span>' + ' (' + $(this).text().split('(').pop().slice(0, -1).split('+').shift() + '<span id="plsSt2">' + '+' + $(this).text().split('(').pop().slice(0, -1).split('+').pop() + '</span>' + ')');
      });
      $('.t-total .r-stats').find('#s-val').each(function() {
        $zeroStat = $(this);
        $softcap = $($zeroStat).prev().text();
        $zeroStat.text() === '0' || $zeroStat.text() === '0%' ? $(this).parent().css('height', 0).children().hide() : $(this).parent().css('height', '25px').children().show();
        $(this).find('#plsSt1').text() === '' ? $softn = $zeroStat.text() : $softn = $(this).find('#plsSt1').text();
        if (($softcap == 'Crit') || ($softcap == 'ACC'))
          $softn > 1500 ? $(this).next('#s-per').text((1500 + ($softn - 1500)*0.5)/10 + '%') : $(this).next('#s-per').text($softn/10 + '%');
        else if (($softcap == 'P.Block') || ($softcap == 'M.Block') || ($softcap == 'P.Dodge') || ($softcap == 'M.Dodge') || ($softcap == 'Lifesteal') || ($softcap == 'P.Crit Resistance') || ($softcap == 'M.Crit Resistance'))
          $softn > 500 ? $(this).next('#s-per').text((500 + ($softn - 500)*0.5)/10 + '%') : $(this).next('#s-per').text($softn/10 + '%');
        else if ($softcap == 'CC Resist')
          $softn > 1000 ? $(this).next('#s-per').text((1000 + ($softn - 1000)*0.5)/10 + '%') : $(this).next('#s-per').text($softn/10 + '%');
        else if (($softcap == 'Penetration') || ($softcap == 'P.Tough') || ($softcap == 'M.Tough'))
          $softn > 450 ? $(this).next('#s-per').text(((450 + ($softn - 450)*0.409)/10).toFixed(1) + '%') : $(this).next('#s-per').text($softn/10 + '%');
        else if ($softcap == 'ATK Spd')
          $softn > 1600 ? $(this).next('#s-per').text((1600 + ($softn - 1600)*0.5)/10 + '%') : $(this).next('#s-per').text($softn/10 + '%');
        else if (($softcap == 'P.Block DEF') || ($softcap == 'M.Block DEF'))
          $softn > 225 ? $(this).next('#s-per').text((225 + ($softn - 225)*0.2)/10 + '%') : $(this).next('#s-per').text($softn/10 + '%');
        else if ($softcap == 'MP Recovery/Attack')
          $softn > 1600 ? $(this).next('#s-per').text((1600 + ($softn - 1600)*0.5)/10 + '%') : $(this).next('#s-per').text($softn/10 + '%');
        else if (($softcap == 'Crit DMG') || ($softcap == 'Recovery'))
          $(this).next('#s-per').text('')
        else
          $(this).next('#s-per').text($softn/10 + '%')
      });
    };

    $('#calc_role_id, #calc_char_id, #calc_gear_weapon, #calc_gear_treasure, #calc_gear_armor, #calc_gear_secondary, #calc_gear_jewelry, #calc_gear_orb, #calc_st_weapon, #calc_st_weapon_st, .ax, .ay').change(function() {
      option();
      gearStat();
      gearSet();
    });
  });
}).call(this);
