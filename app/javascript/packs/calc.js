(function() {
  $(document).on("turbolinks:load", function() {
    /* const stats */
    const { Chars, StatName, HeroStat, GearStat, GearOption, GearIcon, GearStar, GearSet, GearSetBonus, TMSet } = require('./config');
    let heroClassId, heroClass, heroName, heroId, gearWeaponType, advancementPhase, rangeATK, rangeHP, gearTreasureType, allTreasure = [], gearSet, armorStat, secondaryStat, jewelryStat, orbStat, jewelryType, perkTier, perkId, perkTp, weaponGreyStat, treasureGreyStat, armorGreyStat, secondaryGreyStat, jewelryGreyStat, orbGreyStat, armorSet, secondarySet, jewelrySet, orbSet, starWeapon, starTreasure, starArmor, starSecondary, statJewelry, starOrb;

    /* Loading build from Link */
    $('#btn-load').click(() => {
      event.preventDefault();
      const CryptoJS = require("crypto-js");
      let shr = $('#share_link').val().toString();
      if (shr.length !== 0) {
        $.get(shr)
          .done((data) => {
            let link_local = process.env.LINK_LOCAL;
            let link_main = process.env.LINK_MAIN;
            shr.slice(0, -12) == link_local || shr.slice(0, -12) == link_main ? rawData = $(data).find('.raw').text() : rawData = null;
            var decData = (raw) => {
              var C = CryptoJS;
              var Key = process.env.CRYPTO_KEY;
              var IV = process.env.CRYPTO_IV;
              var dcT = C.AES.decrypt(raw, Key, {
                iv: IV,
                mode: C.mode.CBC,
                padding: C.pad.Pkcs7
              });
              return JSON.parse(dcT.toString(C.enc.Utf8));
            };
            if (rawData !== null) {
              $(decData(rawData)).each(function(i, n) {
                let x = this.name;
                let y = this.value;
                $(`[name="${x}"]`).children(`[value="${y}"]`).prop('selected', true);
                switch (x) {
                  case 'calc[role_id]':
                    // let role = $('#calc_role_id :selected').text();
                    // let escaped_role = role.replace(/([ #;&,.+*~\':"!^$[\]()=>|\/@])/g, '\\$1');
                    // let options = $(Chars).filter("optgroup[label='" + escaped_role + "']").html();
                    // if (options) {
                    //   $('#calc_char_id').html(options);
                    //   $('select').not('#calc_role_id').prop('selectedIndex', 0);
                    //   change_role();
                    // };

                    if ($('.null-name').children(':first').attr('value') !== '- - - - - - - - - -')
                      $('.null-name').prepend('<option value="- - - - - - - - - -">- - - - - - - - - -</option>');
                    if ($('.null-stat').children(':first').attr('value') !== '0')
                      $('.null-stat').prepend('<option class="q" value="0">- - - -</option>');
                    $('.ay-r').children().not('.q').hide();
                    $('.gSt p, .t-st p').empty();
                    $('.gSt .rating, .gOption, .gTM').hide();
                    $('.rating label').removeClass('active');
                    $('.c-perk-img img').removeClass('pick');
                    $('.perk-tp p').text(0).css('color', 'black');
                    let role = $('#calc_role_id :selected').text();
                    let escaped_role = role.replace(/([ #;&,.+*~\':"!^$[\]()=>|\/@])/g, '\\$1');
                    let options = $(Chars).filter("optgroup[label='" + escaped_role + "']").html();
                    if (options) {
                      $('#calc_char_id').html(options);
                      $('select').not(this).prop('selectedIndex', 0);
                      change_role();
                    };
                    break;
                  case 'calc[char_id]':
                    change_char();
                    break;
                  case 'calc[gear_weapon]': case 'calc[gear_armor]': case 'calc[gear_secondary]': case 'calc[gear_treasure]': case 'calc[gear_jewelry]': case 'calc[gear_orb]':
                    // if (x.slice(10, -1) == 'jewelry') {
                    //   if (y !== '- - - - - - - - - -')
                    //     $(`[name="${x}"]`).children(`optgroup[label="${jewelryType}"]`).children(`[value="${y}"]`).prop('selected', true);
                    //   jewelrySet = y;
                    // };
                    change_gear(x.slice(10, -1));
                    break;
                  case 'calc[st_weapon]':
                    change_sw_adv();
                    break;
                  case 'calc[st_weapon_st]':
                    change_sw_eth();
                    break;
                  case 'calc[gear_artifact]':
                    change_art();
                    break;
                  case 'range': case 'add-atk': case 'add-hp':
                    $(`[name="${x}"]`).prop('value', y);
                    swStat();
                    stats();
                    break;
                  case 'calc[st_armor_op]':
                    $('#propAr').text(y);
                    break;
                  case 'calc[st_secondary_op]':
                    $('#propScnd').text(y);
                    break;
                  case 'calc[st_jewelry_op]':
                    $('#propAcs').text(y);
                    break;
                  case 'calc[st_orb_op]':
                    $('#propOrb').text(y);
                    break;
                  case 'calc[enh_type_ar]': case 'calc[enh_type_sg]': case 'calc[enh_type_j]': case 'calc[enh_type_orb]':
                    $enhName = $('[name="' + x + '"]');
                    $('[name="' + x + '"]')
                      .parent().next().find('.enh-n').html('<option value="">- - - - - - - - - -</option>')
                      .parent().next().find('.enh-v').html('<option value="">- - - </option>');
                    if ($('[name="' + x + '"]').children('option:selected').val() !== '')
                      statEnhancement();
                    break;
                  case 'calc[enh_ar]': case 'calc[enh_sg]': case 'calc[enh_j]': case 'calc[enh_orb]':
                    $enhName = $('[name="' + x + '"]');
                    $enh = $('[name="' + x + '"]').parent().next().find('.enh-v');
                    $enh.prop('selectedIndex', 0).find('optgroup').hide();
                    if ($('[name="' + x + '"]').children('option:selected').val() !== '')
                      statEnhancement();
                    break;
                  case 'calc[enh_ar_st]': case 'calc[enh_sg_st]': case 'calc[enh_j_st]': case 'calc[enh_orb_st]':
                    $('[name="' + x + '"]')
                      .children('[value="' + y + '"]').prop('selected', true).end()
                      .children('.q, option:selected').show();
                    break;
                  case 'calc[jewelry_type]':
                    jewelryType = y;
                    break;
                  case 'perk-t1': case 'perk-t2': case 'perk-t3': case 'perk-t5':
                    $(`.hero-${heroClassId} #${x}`).find(`img#${y}`).addClass('pick');
                    perkTp = perkTP();
                    if (perkTp == 0)
                      $('.perk-tp p').css('color', 'black');
                    else if (perkTp > 0 && perkTp <= 95)
                      $('.perk-tp p').css('color', 'greenyellow');
                    else if (perkTp > 95) {
                      $('.perk-tp p').css('color', 'darkred');
                      alert('Not Enogh TP');
                    };
                    $('.perk-tp p').text(perkTp);
                    break;
                  case 'we': case 'ar': case 'se': case 'tr': case 'je': case 'or':
                    $(`#${x}`).find('label').removeClass('active');
                    $(`#${x}`).find(`.bt${y}`).addClass('active');
                    stats();
                    break;
                };
              });

              stats();
              $('.share-add').remove();
            } else
              messgeBox('Enter valid link!');
          })
          .fail(function(jqXHR, textStatus, errorThrown) {
            messgeBox(`Enter valid link/code! - ${errorThrown}`);
          });
      } else
        messgeBox('Enter link!');
    });

    /* Main functions */
    $('#calc_role_id').change(function() {
      if ($('.null-name').children(':first').attr('value') !== '- - - - - - - - - -')
        $('.null-name').prepend('<option value="- - - - - - - - - -">- - - - - - - - - -</option>');
      if ($('.null-stat').children(':first').attr('value') !== '0')
        $('.null-stat').prepend('<option class="q" value="0">- - - -</option>');
      $('.ay-r').children().not('.q').hide();
      $('.gSt p, .t-st p').empty();
      $('.gSt .rating, .gOption, .gTM').hide();
      $('.rating label').removeClass('active');
      $('.c-perk-img img').removeClass('pick');
      $('.perk-tp p').text(0).css('color', 'black');
      let role = $('#calc_role_id :selected').text();
      let escaped_role = role.replace(/([ #;&,.+*~\':"!^$[\]()=>|\/@])/g, '\\$1');
      let options = $(Chars).filter("optgroup[label='" + escaped_role + "']").html();
      if (options) {
        $('#calc_char_id').html(options);
        $('select').not(this).prop('selectedIndex', 0);
      } else
        $('#calc_char_id').empty();
    });
    function change_role() {
      $('.hch').hide().end().find(`.hero-${$('#calc_char_id').children('option:selected').val()}`).css('display', 'block');
      heroClassId = $('#calc_role_id').children('option:selected').val();
      heroClass = $('#calc_role_id').children('option:selected').text();
      heroName = $('#calc_char_id').children('option:selected').text().toLowerCase();
      heroId = $('#calc_char_id').children('option:selected').val();

      $('#calc_gear_armor, #calc_gear_secondary, #calc_gear_jewelry, #calc_gear_orb')
        .parents().eq(1).find('.gOption select, .gTM select').prop('selectedIndex', 0);
      $('#calc_gear_artifact')
        .prop('selectedIndex', 0)
        .parents().eq(1).find('.gArt').hide()
        .find('.calc-art-description p').empty();
      $('#w-d').hide();
    };
    function change_char() {
      $('.hch').hide().end().find(`.hero-${$('#calc_char_id').children('option:selected').val()}`).css('display', 'block');
      heroName = $('#calc_char_id').children('option:selected').text().toLowerCase();
      heroId = $('#calc_char_id').children('option:selected').val();

      $('.ay-r').children().not('.q').hide();
      $('.gOption, .gTM, .gArt, .range, .form-input .gSt .rating').hide();
      $('.t-st, .form-input .gSt, .calc-art-description').find('p').empty();
      $('.rating').find('label').removeClass('active');
      $('.c-perk-img').find('img').removeClass('pick');
      $('.perk-tp').find('p').css('color', 'black').text(0);
      $('select').not('#calc_role_id, #calc_char_id').prop('selectedIndex', 0);
    };
    function change_sw_adv() {
      advancementPhase = $('#calc_st_weapon').children('option:selected').text().slice(-1);
      $('#calc_st_weapon_st').children().removeClass().show();
      $('.w-in').removeClass('g-fr-u a0 a1 a2');
      if (advancementPhase !== '-') {
        $('#calc_st_weapon_st')
          .prop('selectedIndex', (5 * advancementPhase + 1))
          .children().each(function() {
            if ($(this).val() < (5 * advancementPhase) || $(this).val() == '')
              $(this).hide();
          });
        rangeATK = $('#range-atk').text(parseInt(HeroStat[heroClass]['swATK']) * (2 ** advancementPhase));
        rangeHP = $('#range-hp').text(parseInt(HeroStat[heroClass]['swHP']) * (2 ** advancementPhase));
        $('.w-in').addClass(`a${advancementPhase}`);
        $('.range').show();
        gearStats();
      } else {
        $('#calc_st_weapon_st').prop('selectedIndex', 0).children().hide().first().show();
        rangeATK = $('#range-atk').text(0);
        rangeHP = $('#range-hp').text(0);
        $('.range').hide();
      };
      rangeC();
    };
    function change_sw_eth() {
      etherEnhancement = $('#calc_st_weapon_st').children('option:selected').text();
      swStat();
      stats();
    };
    function change_gear(gear) {
      $(`#calc_gear_${gear}`).parent().next().find('.rating label').removeClass('active');
      let r, y = gear.slice(0, 2);
      (gear != 'jewelry' || $(`#calc_gear_jewelry`).children('option:selected').val() == '- - - - - - - - - -') ? gearSet = $(`#calc_gear_${gear}`).children('option:selected').val()
                                                                                                                : gearSet = $(`#calc_gear_${gear}`).children().children('option:selected').val();
      if (gear == 'weapon') {
        $('#range-atk, #range-hp').text(0);
        $('#g-weapon, .range, #w-d, #we').hide();
        $('.w-in').removeClass('g-fr-u a0 a1 a2');
        $('#calc_st_weapon_st').children().hide();
        $('#calc_st_weapon, #calc_st_weapon_st').prop('selectedIndex', 0);
      };
      weaponType = $('#calc_gear_weapon').children('option:selected').val();
      treasureType = $('#calc_gear_treasure').children('option:selected').val();
      jewelryType = $(`#calc_gear_jewelry`).children().children('option:selected').parent().attr('label');

      $(`#set_${gear}`).text(gearSet);
      switch (gear) {
        case 'weapon':
          $('#heroATK').empty();
          greyStat = $('#greyATK');
          break;
        case 'treasure':
          $('#heroTR').empty();
          greyStat = $('#greyTR');
          break;
        case 'armor':
          $('#heroPDEF').empty();
          greyStat = $('#greyPDEF');
          break;
        case 'secondary':
          $('#heroMDEF').empty();
          greyStat = $('#greyMDEF');
          break;
        case 'jewelry':
          $('#heroJ').empty();
          greyStat = $('#greyJ');
          break;
        case 'orb':
          $('#heroO').empty();
          greyStat = $('#greyO');
          break;
      };
      if (gear == 'jewelry') {
        $(`#calc_gear_jewelry`).parents().eq(1).next().find('.rating label').removeClass('active');
        switch (jewelryType) {
          case 'Ring':
            jewelryStat = '4';
            break;
          case 'Earrings':
            jewelryStat = '5';
            break;
          case 'Bracelet': case 'Necklace':
            jewelryStat = '2';
            break;
        };
      };
      $('.gOption .ax, .gTM .enh-n').children().removeAttr('disabled');
      $(`#${gear}`)
        .find('.ax, .ay, .ax-tm, .ay-tm, .enh-n, .enh-v, .ax-r, .ay-r').prop('selectedIndex', 0).end()
        .find('.ay, .ay-tm, .enh-v, .ay-r')
          .children().hide().end()
          .find('.q').show();
      switch (gearSet) {
        case '- - - - - - - - - -':
          greyStat.text('');
          $(`#${y}`).hide();
          if (gear == 'treasure')
            $(`#calc_gear_treasure, .frst`).removeAttr('style');

          $(`#calc_gear_${gear}`)
            .css('background-image', `url("${GearIcon[gear]}")`)
            .removeClass('g-fr g-fr-t g-fr-u')
            .parents().eq(1).find('.gOption select, .gTM select').prop('selectedIndex', 0);
          $(`.calc_gear_${gear}`).parent().find('.gOption, .gTM').hide();
          $(`#${y} label`).filter('.active').removeClass('active');
          $(`#${gear} .ay-r`)
            .children().hide().end()
            .prop('selectedIndex', 0)
            .children('.q').show();
          $(`#prop_${gear}`).empty();
          break;
        case 'Class':
          greyStat.text(HeroStat[heroClass].ClassWeapon);
          $('#calc_gear_weapon').css('background-image', `url(/images/media/heroes/${heroClass.toLowerCase()}.webp)`);
          $('.calc_gear_weapon').parent().find('.gOption').show();
          $('#range-atk, #range-hp').text(0);
          $('#g-weapon, .range, #w-d').hide();
          $('.w-in').addClass('g-fr-u');
          $(`#${y}`).show();
          // rangeC();
          // gearStat();
          break;
        case 'Unique':
          if (gear == 'weapon') {
            greyStat.text(HeroStat[heroClass].UniqueWeapon);
            $('#calc_gear_weapon').css('background-image', `url("/images/media/heroes/${heroName}/uw.webp")`);
            $('.calc_gear_weapon').parent().find('.gOption').show();
            $('#calc_st_weapon_st').children(':first').show();
            $('#g-weapon, #w-d').show();
            $('.w-in').addClass('g-fr-u');
            // gearStat();
          } else if (gear == 'treasure') {
            allTreasure.length = 0;
            for (let i = 1; i < 5; i++)
              allTreasure.push(`url("/images/media/heroes/${heroName}/ut${i}.webp")`);
            greyStat.text(GearStat.Unique);
            $(`#calc_gear_treasure, .frst`).removeAttr('style');
            $('#calc_gear_treasure').css({
              'background-image': `${allTreasure.join(',')}`,
              'background-position': '0px, 50px, 100px, 150px',
              'background-repeat': 'no-repeat',
              'position': 'relative',
              'right': '114px',
              'width': '202px',
            }).addClass('g-fr-u').removeClass('g-fr');
            $('.calc_gear_treasure').parent().find('.frst, .scnd').show();
            // gearStat();
          };
          $(`#${y}`).show();
          break;
        case 'Mana Stone':
          greyStat.text(GearStat[gearSet]);
          $(`#${y}`).show();
          $(`#calc_gear_treasure, .frst`).removeAttr('style');
          $('#calc_gear_treasure')
            .css('background-image', 'url(/images/media/gears/9-UT/Mana.webp)')
            .addClass('g-fr').removeClass('g-fr-u');
          $('.calc_gear_treasure').parent().find('.frst').show().css({'bottom': '104px'});
          $('.scnd').hide();
          $('.scnd select').prop('selectedIndex', 0);
          // gearStat();
          break;
        case 'Reclaimed Perseverance': case 'Reclaimed Hope': case 'Reclaimed Authority':
        case 'Perseverance': case 'Hope': case 'Authority':
          gearSet.charAt(0) == 'R' ? r = 'R' : r = '';
          switch (gear) {
            case 'armor': case 'secondary':
              gearStat = GearStat[HeroStat[heroClass][`${gear}TM`] + r];
              gearIcon = `/images/media/gears/${HeroStat[heroClass][gear]}/${gearSet} ${HeroStat[heroClass].gearTM}.webp`;
              break;
            case 'jewelry':
              gearStat = GearStat[`tm${jewelryStat}` + r];
              gearIcon = `/images/media/gears/7-J/${jewelryType}/${gearSet} ${HeroStat[heroClass].gearTM}.webp`;
              break;
            case 'orb':
              gearStat = GearStat[`tm4${r}`];
              gearIcon = `/images/media/gears/8-O/${gearSet} ${HeroStat[heroClass].gearTM}.webp`;
              break;
          };
          greyStat.text(gearStat);
          $(`#calc_gear_${gear}`)
            .css('background-image', `url("${gearIcon}")`)
            .addClass('g-fr-t').removeClass('g-fr')
            .parents().eq(1).find('.gOption select').prop('selectedIndex', 0);
          $(`#${y}`).show();
          $(`.calc_gear_${gear}`)
            .parent().find('.gTM').show()
            .parent().find('.gOption').hide();
          // gearStat();
          break;
        default:
          switch (gear) {
            case 'treasure':
              allTreasure.length = 0;
              for (let i = 1; i < 5; i++)
                allTreasure.push(`url("/images/media/heroes/${heroName}/ut${i}.webp")`);
              gearStat = GearStat[gearSet];
              gearIcon = `/images/media/gears/${allTreasure.join(',')}.webp`;
              break;
            case 'armor': case 'secondary':
              gearStat = GearStat[`${gear}${HeroStat[heroClass].gearType}`];
              gearIcon = `/images/media/gears/${HeroStat[heroClass][gear]}/${gearSet}.webp`;
              break;
            case 'jewelry':
              gearStat = GearStat[jewelryType];
              gearIcon = `/images/media/gears/7-J/${jewelryType}/${gearSet}.webp`;
              break;
            case 'orb':
              gearStat = GearStat.Orb;
              gearIcon = `/images/media/gears/8-O/${gearSet}.webp`;
              break;
          };
          greyStat.text(gearStat);
          $(`#calc_gear_${gear}`)
            .css('background-image', `url("${gearIcon}")`)
            .removeClass('g-fr-t').addClass('g-fr')
            .parents().eq(1).find('.gTM select').prop('selectedIndex', 0);
          $(`#${y}`).show();
          $(`.calc_gear_${gear}`)
            .parent().find('.gOption').show()
            .parent().find('.gTM').hide();
          $(`#prop_${gear}`).empty();
      };
      $(`[tag=${gear}]`).text(greyStat.text());
    };
    function change_art() {
      let art = $('#calc_gear_artifact').children('option:selected');
      $('.calc-art-description p').text($(art).attr('desc'));
      if ($(art).val() == '- - - - - - - - - -') {
        $('#calc_gear_artifact')
          .css('background-image', `url(${GearIcon.artifact})`)
          .removeClass('g-fr-u');
        $('.gArt').hide();
      } else {
        $('#calc_gear_artifact')
          .css('background-image', `url("/images/media/artifacts/${$(art).val()}.webp")`)
          .addClass('g-fr-u');
        $('.gArt').show();
      }
    };
    function change_rune(rune, stat) {
      $(rune).prop('selectedIndex', 0).children().not('.q').hide();
      $(rune).find(`[name="${stat}"]`).show();
    };

    /* Change Inputs */
    $('select#calc_role_id').change(function() {
      change_role();
    }).change();
    $('select#calc_char_id').change(function() {
      change_char();
    }).change();
    $('select#calc_role_id, select#calc_char_id').change(function() {
      /* -------------------------------------------------------------------- */
      $('select#calc_gear_weapon').css('background-image', `url(${GearIcon.weapon})`);
      $('select#calc_gear_treasure').css({
        'background-image': `url(${GearIcon.treasure})`,
        'width': '52px',
        'position': 'relative',
        'right': '0'
      });
      $('select#calc_gear_armor').css('background-image', `url(${GearIcon.armor})`);
      $('select#calc_gear_secondary').css('background-image', `url(${GearIcon.secondary})`);
      $('select#calc_gear_jewelry').css('background-image', `url(${GearIcon.jewelry})`);
      $('select#calc_gear_orb').css('background-image', `url(${GearIcon.orb})`);
      $('select#calc_gear_artifact').css('background-image', `url(${GearIcon.artifact})`);

      $('.range').hide();
      $('#range-atk, #range-hp').text(0);
      $('.w-in').removeClass('g-fr-u a0 a1 a2');
      $('.heroGear select').removeClass('g-fr g-fr-u g-fr-t');
      /* -------------------------------------------------------------------- */

      $('.statsBase, .statsAdd').empty();
      for (let i = 0; i <= 3; i++)
        $('.statsBase').append(`<div class="r-stat"><p id="s-name"></p><p id="s-val">${HeroStat[heroClass][`B${i}`]}</p></div>`);
      for (let j = 0; j <= 19; j++)
        $('.statsAdd').append(`<div class="r-stat"><p id="s-name"></p><p id="s-val">${HeroStat[heroClass][`A${j}`]}</p><p id="s-per"></div>`);
      for (let k = 0; k <= 23; k++)
        $('.statData').find(`.r-stat:eq(${k}) #s-name`).text(StatName[`S${k}`]);
      $('p#sb, p#tms').empty();

      gearSets();
      rangeC();
    }).change();
    $('select.ax-r').change(function() {
      let runeStat = $(this).val();
      let runeVal = $(this).parents().eq(1).find('.ay-r');
      change_rune(runeVal, runeStat);
    });
    $('select#calc_gear_weapon, select#calc_gear_treasure, select#calc_gear_armor, select#calc_gear_secondary, select#calc_gear_orb').change(function() {
      change_gear($(this).parents().eq(1).attr('id'));
      stats();
    }).change();
    $('select#calc_st_weapon').change(function() {
      change_sw_adv();
      change_sw_eth();
    }).change();
    $('select#calc_st_weapon_st').change(function() {
      change_sw_eth();
    }).change();
    $('select#calc_gear_jewelry').change(function() {
      change_gear($(this).parents().eq(2).attr('id'));
      stats();
    }).change();
    $('select#calc_st_treasure, select#calc_st_armor, select#calc_st_secondary, select#calc_st_jewelry, select#calc_st_orb').change(function() {
      $(this).parents().eq(1).find('.ay, .ay-tm').prop('selectedIndex', 0);
      statOption($(this));
    });
    $('select#calc_st_armor_op, select#calc_st_secondary_op, select#calc_st_jewelry_op, select#calc_st_orb_op').change(function() {
      $(`#${$(this).attr('tag')}`).text($(`#${$(this).attr('id')}`).children('option:selected').text());
      gearSets();
    });
    $('select#armor_enh, select#secondary_enh, select#jewelry_enh, select#orb_enh').change(function() {
      $(this).parent().next().find('.enh-v').prop('selectedIndex', 0).find('option').hide();
      statEnhancement($(this));
    });
    $('select#armor_enh_tm, select#secondary_enh_tm, select#jewelry_enh_tm, select#orb_enh_tm').change(function() {
      let x = $(this);
      $(this).parent().next().find('.enh-v').prop('selectedIndex', 0).find('option').hide();
      statEnhancement_TM(x);
      $(x.parents().eq(2)).each(function() {
        let tmEnhF = $(this).find('#a0 .enh-n').children('option:selected').val();
        let tmEnhS = $(this).find('#b0 .enh-n').children('option:selected').val();
        let tmEnhT = $(this).find('#c0 .enh-n').children('option:selected').val();
        $(this).find('.enh-n').children().removeAttr('disabled');
        if (tmEnhF !== '')
          $(this).find('#b0 .enh-n, #c0 .enh-n').children(`[value="${tmEnhF}"]`).attr('disabled', 'disabled');
        if (tmEnhS !== '')
          $(this).find('#a0 .enh-n, #c0 .enh-n').children(`[value="${tmEnhS}"]`).attr('disabled', 'disabled');
        if (tmEnhT !== '')
          $(this).find('#a0 .enh-n, #b0 .enh-n').children(`[value="${tmEnhT}"]`).attr('disabled', 'disabled');
      });
    });
    $('select#calc_gear_artifact').change(function() {
      change_art();
    }).change();
    $('.ax, .ay, .ax-r, .ay-r, .ax-tm, .ay-tm, .enh-n, .enh-v').change(function() {
      stats();
    });

    /* Stats / Options / Enhancement */
    function starGears(gear) {
      starGear = $(`#${gear.slice(0, 2)}`).find('.active').next('input').val();
      let x;
      gearSet.charAt(0) == 'R' ? x = 'R' : x = '';
      if (starGear == '0' || starGear == null) {
        switch (gear) {
          case 'weapon':
            greyStat = $('#greyATK');
            break;
          case 'treasure':
            greyStat = $('#greyTR');
            break;
          case 'armor':
            greyStat = $('#greyPDEF');
            break;
          case 'secondary':
            greyStat = $('#greyMDEF');
            break;
          case 'jewelry':
            greyStat = $('#greyJ');
            break;
          case 'orb':
            greyStat = $('#greyO');
            break;
        };
        $(`[tag="${gear}"]`).text(greyStat.text());
      } else
        switch (gear) {
          case 'weapon':
            $('[tag="weapon"]').text(GearStar[heroClass][weaponType][starGear]);
            break;
          case 'treasure':
            $('[tag="treasure"]').text(GearStar[treasureType][starGear]);
            break;
          case 'armor': case 'secondary':
            $(`#calc_gear_${gear}`).hasClass('g-fr-t') ? $(`[tag="${gear}"]`).text(GearStar[HeroStat[heroClass][`${gear}TM`] + x][starGear])
                                                       : $(`[tag="${gear}"]`).text(GearStar[HeroStat[heroClass][`${gear}Type`]][starGear]);
            break;
          case 'jewelry':
            $('#calc_gear_jewelry').hasClass('g-fr-t') ? $('[tag="jewelry"]').text(GearStar['tm' + jewelryStat + x][starGear])
                                                       : $('[tag="jewelry"]').text(GearStar[`type${jewelryStat}`][starGear]);
            break;
          case 'orb':
            $('#calc_gear_orb').hasClass('g-fr-t') ? $('[tag="orb"]').text(GearStar[`tm4${x}`][starGear])
                                                   : $('[tag="orb"]').text(GearStar.type4[starGear]);
            break;
        };
    };
    function gearOptions() {
      $('.t-op p').empty();
      options($('.opt .ax').serializeArray(), $('.opt .ay').serializeArray());
      options($('.enh-n').serializeArray(), $('.enh-v').serializeArray());
      options($('.opt .ax-tm').serializeArray(), $('.opt .ay-tm').serializeArray());
      options_rune($('.opt .ax-r').serializeArray(), $('.opt .ay-r').serializeArray());

      for (let i = 0; i <= 19; i++) {
        let x = $(`.t-op p[name="${$(`.statsAdd #s-name:eq(${i})`).text()}"]`).text();
        let y;
        switch (i) {
          case 4: case 5:
            y = Number(x) + Number($(`.t-op p[name="Dodge"]`).text());
            break;
          case 6: case 7:
            y = Number(x) + Number($(`.t-op p[name="Block"]`).text());
            break;
          case 8: case 9:
            y = Number(x) + Number($(`.t-op p[name="Block DEF"]`).text());
            break;
          case 10: case 11:
            y = Number(x) + Number($(`.t-op p[name="Tough"]`).text());
            break;
          case 18: case 19:
            y = Number(x) + Number($(`.t-op p[name="Crit Resistance"]`).text());
            break;
          default:
            y = x;
        };
        if (i == 1 || i == 12)
          y == 0 ? $(`.statsAdd #s-name:eq(${i})`).next('p').text(`${HeroStat[heroClass][`A${i}`]}%`)
                 : $(`.statsAdd #s-name:eq(${i})`).next('p').text(`${parseInt(HeroStat[heroClass][`A${i}`]) + parseFloat(y)}% (${HeroStat[heroClass][`A${i}`]}%+${y}%)`);
        else
          y == 0 ? $(`.statsAdd #s-name:eq(${i})`).next('p').text(HeroStat[heroClass][`A${i}`])
                 : $(`.statsAdd #s-name:eq(${i})`).next('p').text(`${parseInt(HeroStat[heroClass][`A${i}`]) + parseFloat(y)} (${HeroStat[heroClass][`A${i}`]}+${y})`);
      };
    };
    function gearStats() {
      let grey_ATK = $('#greyATK').text();
      let weapon_ATK = $('[tag="weapon"]').text();
      $('#heroATK').text(weapon_ATK);
      let grey_TR = $('#greyTR').text();
      let treasure_HP = $('[tag="treasure"]').text();
      $('#heroTR').text(treasure_HP);
      let grey_PDEF = $('#greyPDEF').text();
      let pDEF = $('[tag="armor"]').text();
      $('#heroPDEF').text(pDEF);
      let grey_MDEF = $('#greyMDEF').text();
      let mDEF = $('[tag="secondary"]').text();
      $('#heroMDEF').text(mDEF);
      let grey_J = $('#greyJ').text();
      let jewel_S = $('[tag="jewelry"]').text();
      $('#heroJ').text(jewel_S);
      let grey_O;
      let orb_HP = $('[tag="orb"]').text();
      $('#heroO').text(orb_HP);

      let class_HP = HeroStat[heroClass].B0;
      let class_ATK = HeroStat[heroClass].B1;
      let class_PDEF = HeroStat[heroClass].B2;
      let class_MDEF = HeroStat[heroClass].B3;

      let gear_ATK;
      weapon_ATK == '' ? gear_ATK = 0 : gear_ATK = weapon_ATK;
      let gear_TR;
      treasure_HP == '' ? gear_TR = 0 : gear_TR = treasure_HP;
      let gear_P;
      pDEF == '' ? gear_P = 0 : gear_P = pDEF;
      let gear_M;
      mDEF == '' ? gear_M = 0 : gear_M = mDEF;
      let gear_J;
      jewel_S == '' ? gear_J = 0 : gear_J = jewel_S;
      let gear_O;
      orb_HP == '' ? gear_O = 0 : gear_O = orb_HP;

      $('#heroHP').text(class_HP);

      let total_ATK = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'ATK'
      }).next('p');
      let total_HP = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'MAX HP'
      }).next('p');
      let total_P = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'P.DEF'
      }).next('p');
      let total_M = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'M.DEF'
      }).next('p');

      let sum_ATK;
      let option_ATK = $('p[name="ATK"]').text();
      jewelryType == 'Earrings' ? sum_ATK = parseInt(class_ATK) + parseInt(gear_ATK) + parseInt($('#range-atk').text()) + parseInt(gear_J)
                                : sum_ATK = parseInt(class_ATK) + parseInt(gear_ATK) + parseInt($('#range-atk').text());
      sum_ATK - class_ATK == 0 && option_ATK == '' ? total_ATK.text(class_ATK)
                                                   : total_ATK.text(`${Math.trunc(sum_ATK * (option_ATK / 100 + 1))} (${class_ATK}+${Math.trunc(sum_ATK * (option_ATK / 100 + 1)) - class_ATK})`);
      let sum_HP;
      let option_HP = $('p[name="Max HP"]').text();
      jewelryType == 'Ring' ? sum_HP = parseInt(class_HP) + parseInt(gear_TR) + parseInt(gear_O) + parseInt($('#range-hp').text()) + parseInt(gear_J)
                            : sum_HP = parseInt(class_HP) + parseInt(gear_TR) + parseInt(gear_O) + parseInt($('#range-hp').text());
      sum_HP - class_HP == 0 && option_HP == '' ? total_HP.text(class_HP)
                                                : total_HP.text(`${Math.round(sum_HP * (option_HP / 100 + 1))} (${class_HP}+${Math.round(sum_HP * (option_HP / 100 + 1)) - class_HP})`);
      $('#heroHP').text(total_HP.text());
      $('#heroHPs').text(total_HP.text().split(' ')[0]);
      let sum_P;
      let option_P = parseInt(Number($('p[name="P.DEF"]').text())) + parseInt(Number($('p[name="DEF"]').text()));
      jewelryType == 'Bracelet' ? sum_P = parseInt(class_PDEF) + parseInt(gear_P) + parseInt(gear_J)
                                : sum_P = parseInt(class_PDEF) + parseInt(gear_P);
      sum_P - class_PDEF == 0 && Number(option_P) == 0 ? total_P.text(class_PDEF)
                                                       : total_P.text(`${Math.trunc(sum_P * (option_P / 100 + 1))} (${class_PDEF}+${Math.trunc(sum_P * (option_P / 100 + 1)) - class_PDEF})`);
      let sum_M;
      let option_M = $('p[name="M.DEF"]').text() + $('p[name="DEF"]').text();
      jewelryType == 'Necklace' ? sum_M = parseInt(class_MDEF) + parseInt(gear_M) + parseInt(gear_J)
                                : sum_M = parseInt(class_MDEF) + parseInt(gear_M);
      sum_M - class_MDEF == 0 && Number(option_M) == 0 ? total_M.text(class_MDEF)
                                                       : total_M.text(`${Math.trunc(sum_M * (option_M / 100 + 1))} (${class_MDEF}+${Math.trunc(sum_M * (option_M / 100 + 1)) - class_MDEF})`);
    };
    function gearSets() {
      let setBonus = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'Set Bonus'
      }).next('p');
      let tmSkill = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'TM Skill'
      }).next('p');

      $('p#sb, p#tms').empty();
      let SET = [];
      for (let i = 0; i <= 3; i++) {
        let x = $(`.set p:eq(${i})`).text();
        if (x.includes('Reclaimed'))
          x = x.split(' ').pop();
        SET.push(x);
      };
      for (let j = 0; j < 11; j++) {
        let y = GearSet[j];
        let n = SET.filter(x => x == y.name).length;

        var st;
        switch (y.name) {
          case 'Opportune Fire':
            $(`p[name="${y.stat}"]`).text() === '' ? st = 0 : st = parseInt($(`p[name="${y.stat}"]`).text());

            if (n == 2 || n == 3)
              $(`.statsAdd #s-name:eq(${0})`).next('p').text(`${parseInt(HeroStat[heroClass].A0) + st + 100} (${HeroStat[heroClass].A0}+${st + 100})`);
            else if (n == 4)
              $(`.statsAdd #s-name:eq(${0})`).next('p').text(`${parseInt(HeroStat[heroClass].A0) + st + 230} (${HeroStat[heroClass].A0}+${st + 230})`);
            // else
            //   $(`.statsAdd #s-name:eq(${0})`).next('p').text(parseInt(HeroStat[heroClass].A0) + st);
            break;
          case 'Gritty Frost':
            $(`p[name="${y.stat}"]`).text() === '' ? st = 0 : st = $(`p[name="${y.stat}"]`).text();

            let sum_HP;
            let setTR;
            $('#heroTR').text() === '' ? setTR = 0 : setTR = parseInt($('#heroTR').text());
            $('#heroO').text() === '' ? setO = 0 : setO = parseInt($('#heroO').text());
            $('#heroJ').text() === '' ? setJ = 0 : setJ = parseInt($('#heroJ').text());
            jewelryType == 'Ring' ? sum_HP = parseInt(HeroStat[heroClass].B0) + setTR + setO + parseInt($('#range-hp').text()) + setJ
                                  : sum_HP = parseInt(HeroStat[heroClass].B0) + setTR + setO + parseInt($('#range-hp').text());

            if (n == 2 || n == 3)
              $(`.statsBase #s-name:eq(${0})`).next('p').text(`${Math.round(sum_HP * (parseInt(st) / 100 + 1.1))} (${parseInt(HeroStat[heroClass].B0)}+${Math.round(sum_HP * (parseInt(st) / 100 + 1.1)) - parseInt(HeroStat[heroClass].B0)})`);
            else if (n == 4)
              $(`.statsBase #s-name:eq(${0})`).next('p').text(`${Math.round(sum_HP * (parseInt(st) / 100 + 1.23))} (${parseInt(HeroStat[heroClass].B0)}+${Math.round(sum_HP * (parseInt(st) / 100 + 1.23)) - parseInt(HeroStat[heroClass].B0)})`);
            // else
            //   sum_HP == HeroStat[heroClass].B0 ? $(`.statsBase #s-name:eq(${0})`).next('p').text(HeroStat[heroClass].B0)
            //                                    : $(`.statsBase #s-name:eq(${0})`).next('p').text(`${Math.round(sum_HP * (parseInt(st) / 100 + 1))} (${parseInt(HeroStat[heroClass].B0)}+${Math.round(sum_HP * (parseInt(st) / 100 + 1)) - parseInt(HeroStat[heroClass].B0)})`);
            break;
          case 'Unrelenting Poison':
            let stP, stM;
            $(`p[name="${y.stat}"]`).text() === '' ? st = 0 : st = parseInt($(`p[name="${y.stat}"]`).text());
            $(`p[name="P.${y.stat}"]`).text() === '' ? stP = 0 : stP = parseInt($(`p[name="P.${y.stat}"]`).text()) + st;
            $(`p[name="M.${y.stat}"]`).text() === '' ? stM = 0 : stM = parseInt($(`p[name="M.${y.stat}"]`).text()) + st;

            if (n == 2 || n == 3) {
              $(`.statsAdd #s-name:eq(${18})`).next('p').text(`${parseInt(HeroStat[heroClass].A18) + stP + 100} (${HeroStat[heroClass].A18}+${stP + 100})`);
              $(`.statsAdd #s-name:eq(${19})`).next('p').text(`${parseInt(HeroStat[heroClass].A19) + stM + 100} (${HeroStat[heroClass].A19}+${stM + 100})`);
            } else if (n == 4) {
              $(`.statsAdd #s-name:eq(${18})`).next('p').text(`${parseInt(HeroStat[heroClass].A18) + stP + 230} (${HeroStat[heroClass].A18}+${stP + 230})`);
              $(`.statsAdd #s-name:eq(${19})`).next('p').text(`${parseInt(HeroStat[heroClass].A19) + stM + 230} (${HeroStat[heroClass].A19}+${stM + 230})`);
            // } else {
            //   $(`.statsAdd #s-name:eq(${18})`).next('p').text(parseInt(HeroStat[heroClass].A18) + stP);
            //   $(`.statsAdd #s-name:eq(${19})`).next('p').text(parseInt(HeroStat[heroClass].A19) + stM);
            };
            break;
          case 'Swift Darkness':
            $(`p[name="${y.stat}"]`).text() === '' ? st = 0 : st = parseInt($(`p[name="${y.stat}"]`).text());

            if (n == 2 || n == 3)
              $(`.statsAdd #s-name:eq(${17})`).next('p').text(`${parseInt(HeroStat[heroClass].A17) + st + 200} (${HeroStat[heroClass].A17}+${st + 200})`);
            else if (n == 4)
              $(`.statsAdd #s-name:eq(${17})`).next('p').text(`${parseInt(HeroStat[heroClass].A17) + st + 460} (${HeroStat[heroClass].A17}+${st + 460})`);
            // else
            //   $(`.statsAdd #s-name:eq(${17})`).next('p').text(parseInt(HeroStat[heroClass].A17) + st);
            break;
          case 'Lava':
            $(`p[name="${y.stat}"]`).text() === '' ? st = 0 : st = parseInt($(`p[name="${y.stat}"]`).text());

            if (n == 2 || n == 3)
              $(`.statsAdd #s-name:eq(${1})`).next('p').text(`${parseInt(HeroStat[heroClass].A1) + st + 20}% (${HeroStat[heroClass].A1}%+${st + 20}%)`);
            else if (n == 4)
              $(`.statsAdd #s-name:eq(${1})`).next('p').text(`${parseInt(HeroStat[heroClass].A1) + st + 46}% (${HeroStat[heroClass].A1}%+${st + 46}%)`);
            // else
            //   $(`.statsAdd #s-name:eq(${1})`).next('p').text(`${parseInt(HeroStat[heroClass].A1) + st}%`);
            break;
          case 'Legendary':
            $(`p[name="${y.stat}"]`).text() === '' ? st = 0 : st = parseInt($(`p[name="${y.stat}"]`).text());

            if (n == 2 || n == 3)
              $(`.statsAdd #s-name:eq(${14})`).next('p').text(`${parseInt(HeroStat[heroClass].A14) + st + 100} (${HeroStat[heroClass].A14}+${st + 100})`);
            else if (n == 4)
              $(`.statsAdd #s-name:eq(${14})`).next('p').text(`${parseInt(HeroStat[heroClass].A14) + st + 230} (${HeroStat[heroClass].A14}+${st + 230})`);
            // else
            //   $(`.statsAdd #s-name:eq(${14})`).next('p').text(parseInt(HeroStat[heroClass].A14) + st);
            break;
          default:
            st = 0;
        };

        if (n == 2 || n == 3)
          $('#sb').append(`<span>${GearSetBonus[y.value + 1]}</span>`);
        else if (n == 4)
          $('#sb').append(`<span>${GearSetBonus[y.value + 1]}</span>\n<span>${GearSetBonus[y.value + 2]}</span>`);
      };
      for (var k = 11; k < 14; k++) {
        let y = GearSet[k];
        let n = SET.filter(x => x == y.name).length;

        if (y.name.includes('Perseverance') || y.name.includes('Hope') || y.name.includes('Authority'))
          if (n == 4)
            $('#sb').append(`<span>${GearSetBonus[y.value + heroClassId]}</span>`);
      };

      let PROP = [];
      for (var l = 0; l <= 3; l++) {
        let x = $(`.tm-prop p:eq(${l})`).text();
        PROP.push(x);
      };
      for (var m = 0; m < TMSet.length; m++) {
        let y = TMSet[m][`tms${m + 1}`];
        let n = PROP.filter(x => x == y).length;
        if (n > 0)
          $('#tms').append(`<span>${y} (x${n})</span>`);
      };

      statSplit();
    };
    function options(x, y) {
      $.each(x, function(i, n) {
        switch (n.value) {
          case 'Resistance':
            $('.totalStat p[name="Tough"]').text(parseFloat(y[i].value));
            break;
          case 'P.Resistance':
            $('.totalStat p[name="P.Tough"]').text(parseFloat(y[i].value));
            break;
          case 'M.Resistance':
            $('.totalStat p[name="M.Tough"]').text(parseFloat(y[i].value));
            break;
          case 'DMG Reduction upon Block':
            $('.totalStat p[name="Block DEF"]').text(parseFloat(y[i].value));
            break;
          case 'DMG Reduction upon P.Block':
            $('.totalStat p[name="P.Block DEF"]').text(parseFloat(y[i].value));
            break;
          case 'DMG Reduction upon M.Block':
            $('.totalStat p[name="M.Block DEF"]').text(parseFloat(y[i].value));
            break;
          default:
            $(`.totalStat p[name="${n.value}"]`).text() == '' ? $(`.totalStat p[name="${n.value}"]`).text(parseFloat(y[i].value))
                                                              : $(`.totalStat p[name="${n.value}"]`).text(parseFloat(y[i].value) + parseFloat($(`.totalStat p[name="${n.value}"]`).text()));
        };
      });
    };
    function options_rune(x, y) {
      $.each(x, function(i, n) {
        let r1 = parseFloat(y[i].value.split(' / ').shift());
        let r2 = parseFloat(y[i].value.split(' / ').pop());
        if ($(`[name="${n.name}"]`).children('option:selected').attr('class') == 'all') {
          $(`.totalStat p[name="${n.value.split(' / ').shift()}"]`).text() == '' ? $(`.totalStat p[name="${n.value.split(' / ').shift()}"]`).text(r1)
                                                                                 : $(`.totalStat p[name="${n.value.split(' / ').shift()}"]`).text(r1 + parseFloat($(`.totalStat p[name="${n.value.split(' / ').shift()}"]`).text()));
          $(`.totalStat p[name="${n.value.split(' / ').pop()}"]`).text() == '' ? $(`.totalStat p[name="${n.value.split(' / ').pop()}"]`).text(r2)
                                                                               : $(`.totalStat p[name="${n.value.split(' / ').pop()}"]`).text(r2 + parseFloat($(`.totalStat p[name="${n.value.split(' / ').pop()}"]`).text()));
        } else
          $(`.totalStat p[name="${n.value}"]`).text() == '' ? $(`.totalStat p[name="${n.value}"]`).text(parseFloat(y[i].value))
                                                            : $(`.totalStat p[name="${n.value}"]`).text(parseFloat(y[i].value) + parseFloat($(`.totalStat p[name="${n.value}"]`).text()));
        if (n.value == 'MP Recovery/DMG')
          $('.totalStat').find('p[name="Mana Recovery upon taking DMG"]').text(parseFloat(y[i].value));
      });
    };
    function statOption(stat) {
      $('.opt').find(stat).each(function() {
        $(this).parent().next().children().find('option').not('.q').hide();
        let x = $(this).children('option:selected').text();
        let y = $(this).parent().next().children();
        if ($(this).attr('class').slice(-2) == 'tm') {
          switch (x) {
            case 'ATK': case 'Max HP':
              y.find('.q1').show();
              break;
            case 'Crit DMG': case 'P.DEF': case 'M.DEF':
              y.find('.q2').show();
              break;
            case 'MP Recovery/Sec':
              y.find('.q3').show();
              break;
            case 'ATK Spd': case 'Crit': case 'Penetration': case 'Lifesteal':
            case 'ACC': case 'Debuff ACC': case 'CC Resist':
            case 'P.Dodge': case 'M.Dodge':
              y.find('.q4').show();
              break;
            case 'MP Recovery/Attack': case 'P.Block': case 'M.Block':
            case 'P.Crit Resistance': case 'M.Crit Resistance':
              y.find('.q5').show();
              break;
            default:
              y.find('.q').show();
          };
        } else {
          switch (x) {
            case 'ATK': case 'Max HP': case 'DEF':
              y.find('.q1').show();
              break;
            case 'MP Recovery/Sec': case 'Mana Recovery upon taking DMG':
              y.find('.q2').show();
              break;
            case 'Crit DMG': case 'P.DEF': case 'M.DEF': case 'Recovery':
              y.find('.q3').show();
              break;
            case 'ATK Spd': case 'Crit': case 'Lifesteal': case 'ACC':
            case 'Debuff ACC': case 'CC Resist': case 'Block':
            case 'Crit Resistance': case 'P.Dodge': case 'M.Dodge':
            case 'P.Tough': case 'M.Tough': case 'P.Resistance': case 'M.Resistance':
            case 'DMG Reduction upon P.Block': case 'DMG Reduction upon M.Block':
            case 'P.Block DEF': case 'M.Block DEF':
              y.find('.q4').show();
              break;
            case 'MP Recovery/Attack': case 'P.Block': case 'M.Block':
            case 'P.Crit Resistance': case 'M.Crit Resistance':
              y.find('.q5').show();
              break;
            case 'Dodge': case 'Tough': case 'Resistance': case 'DMG Reduction upon Block':
              y.find('.q6').show();
            case 'Penetration':
              $(this).attr('id').slice(8) == 'treasure' ? y.find('.q4').show() : y.find('.q7').show();
              break;
            default:
              y.find('.q').show();
          };
        };
        if ($(this).attr('id').slice(8) == 'treasure') {
          $('#treasure #g-treasure').each(function(i, n) {
            let treasureOptionFirst = $(`#a${i} .ax`).children('option:selected').val();
            let treasureOptionSecond = $(`#b${i} .ax`).children('option:selected').val();
            $(this).find('.ax').children().removeAttr('disabled');
            if (treasureOptionFirst !== '')
              $(this).find(`#b${i} .ax`).children(`[value="${treasureOptionFirst}"]`).attr('disabled', 'disabled');
            if (treasureOptionSecond !== '')
              $(this).find(`#a${i} .ax`).children(`[value="${treasureOptionSecond}"]`).attr('disabled', 'disabled');
          });
        };
      });
    };
    function statEnhancement(enh) {
      $('.opt-enh').find(enh).each(function() {
        $(this).parent().next().find('option').hide();
        $('.opt-enh').find(enh).each(function() {
          let stat = $(this).children('option:selected').val();
          let x = $(this).parent().next().children();
          switch (stat) {
            case 'ATK': case 'Max HP': case 'Mana Recovery upon taking DMG': case 'Recovery':
              x.find('.q1').show();
              break;
            case 'Crit DMG': case 'P.DEF': case 'M.DEF':
              x.find('.q2').show();
              break;
            case 'ATK Spd': case 'Crit': case 'Lifesteal': case 'ACC':
            case 'Debuff ACC': case 'CC Resist': case 'P.Crit Resistance':
            case 'M.Crit Resistance': case 'P.Dodge': case 'M.Dodge':
            case 'P.Resistance': case 'M.Resistance': case 'Penetration':
              x.find('.q3').show();
              break;
            case 'DMG Reduction upon P.Block': case 'DMG Reduction upon M.Block':
            case 'P.Block': case 'M.Block':
              x.find('.q4').show();
              break;
            default:
              x.find('.q').show();
          };
        });
      });
    };
    function statEnhancement_TM(enh) {
      $('.opt-enh').find(enh).each(function() {
        $(this).parent().next().find('option').hide();
        $('.opt-enh').find(enh).each(function() {
          let stat = $(this).children('option:selected').val();
          let gear = $(this).attr('id').slice(0, -7);
          let jewel = $('#calc_gear_jewelry').children().children('option:selected').parent().attr('label');
          let x = $(this).parent().next().children();
          switch (stat) {
            case 'ATK': case 'Max HP':
              if ((gear == 'jewelry' && jewel == 'Earrings' && stat == 'ATK') ||
                  (gear == 'jewelry' && jewel == 'Ring' && stat == 'Max HP') ||
                  (gear == 'orb' && stat == 'Max HP'))
                x.find('.q2').show().prop('selected', true);
              else
                x.find('.q1').show().prop('selected', true);
              break;
            case 'Crit DMG': case 'P.DEF': case 'M.DEF':
              if ((gear == 'armor' && stat == 'P.DEF') ||
                  (gear == 'secondary' && stat == 'M.DEF') ||
                  (gear == 'jewelry' && jewel == 'Bracelet' && stat == 'P.DEF') ||
                  (gear == 'jewelry' && jewel == 'Necklace' && stat == 'M.DEF'))
                x.find('.q6').show().prop('selected', true);
              else
                x.find('.q2').show().prop('selected', true);
              break;
            case 'MP Recovery/Sec':
              x.find('.q3').show().prop('selected', true);
              break;
            case 'ATK Spd': case 'Crit': case 'Lifesteal': case 'ACC': case 'Debuff ACC':
            case 'CC Resist': case 'P.Dodge': case 'M.Dodge': case 'Penetration':
              x.find('.q4').show().prop('selected', true);
              break;
            case 'P.Block': case 'M.Block': case 'P.Crit Resistance':
            case 'M.Crit Resistance': case 'MP Recovery/Attack':
              x.find('.q5').show().prop('selected', true);
              break;
            default:
              x.find('.q').show().prop('selected', true);
          };
        });
      });
    };

    /* Hero Perks */
    function perkTP() {
      let perkPoints = 0;
      $('.hero-img .hero-' + heroId).find('.c-p').each(function() {
        perkTier = $(this).attr('id');
        perkTier == 'perk-t1' ? $(this).find('.pick').each(() => { perkPoints += 10 })
                              : $(this).find('.pick').each(() => { perkPoints += 15 });
      });
      return perkPoints;
    };
    $(`.heroPerk .c-sub .c-perk img`).click(function() {
      perkId = $(this).attr('id');
      if (perkId.slice(2) == 'd')
        $(this).parent().prev('.c-perk-img').find('img').removeClass('pick');
      else if (perkId.slice(2) == 'l')
        $(this).parent().next('.c-perk-img').find('img').removeClass('pick');
      $(this).toggleClass('pick');

      perkTp = perkTP();
      if (perkTp == 0)
        $('.perk-tp p').css('color', 'black');
      else if (perkTp > 0 && perkTp <= 95)
        $('.perk-tp p').css('color', 'greenyellow');
      else if (perkTp > 95) {
        $('.perk-tp p').css('color', 'darkred');
        alert('Not Enogh TP');
      };
      $('.perk-tp p').text(perkTp);
    });
    $('.perk-tp #tp-r').click(function() {
      $('.perk-tp p').css('color', 'black').text(0);
      $('.c-perk-img').find('img').removeClass('pick');
    });

    /* Gear ☆'s' */
    $('.rating label').click(function() {
      let g = $(this).parents().eq(2).attr('id');
      starGears(g);
      stats();
    });

    /* Soul Weapon stats */
    (() => $('.range').each(function() {
      $('[name="range"], [name="add-atk"], [name="add-hp"]')
        .on('input', () => swStat())
        .on('change', () => stats());
    })).call(this);
    function swStat() {
      let range = $('[name="range"]').val(),
          add_atk = $('[name="add-atk"]').val(),
          add_hp = $('[name="add-hp"]').val(),
          xDef = (100 - range),
          sw_atk = 0,
          sw_hp = 0;
      (xDef % 2 == 1) || (xDef % 2 == 0) ? xDef = xDef.toFixed(0) : xDef = xDef.toFixed(1);
      $('.range-ou1').html(`${range}%`);
      $('.range-ou2').html(`${xDef}%`);
      if (advancementPhase !== '-') {
        sw_atk = parseFloat(HeroStat[heroClass]['swATK']) * GearStat.swMultiplier[etherEnhancement] * (2 ** advancementPhase) * (range / 100) * 2;
        sw_hp = parseFloat(HeroStat[heroClass]['swHP']) * GearStat.swMultiplier[etherEnhancement] * (2 ** advancementPhase) * ((100 - range) / 100) * 2;
      };
      $('.range-ad1').html(`${add_atk}%`);
      $('.range-ad2').html(`${add_hp}%`);
      rangeATK.html(Math.round(sw_atk + Math.trunc(sw_atk * (add_atk / 100))));
      rangeHP.html(Math.round(sw_hp + Math.trunc(sw_hp * (add_hp / 100))));
    };
    function rangeC() {
      $('.range-ou1, .range-ou2').text('50%');
      $('[name="range"]').val(50);
      $('.range-ad1, .range-ad2').text('0%');
      $('[name="add-atk"], [name="add-hp"]').val(0);
    };

    /* Hide all zero stats */
    function statSplit() {
      $('.statData #s-val').each(function() {
        let statSplit = $(this).text().split('(').pop().slice(0, -1).split('+').pop();
        if (statSplit == '0%' || statSplit == '0')
          $(this).html($(this).text().split(' ').shift());
        else if ($(this).is(':contains("(")') == true)
          $(this).html(`<span id="plsSt1">${$(this).text().split(' ').shift()}</span> (${$(this).text().split('(').pop().slice(0, -1).split('+').shift()}<span id="plsSt2">+${$(this).text().split('(').pop().slice(0, -1).split('+').pop()}</span>)`);
      });
      $('.statsAdd .r-stat').find('#s-val').each(function() {
        let softLock;
        let softCap = $(this).prev().text();
        let zeroStat = $(this);
        zeroStat.text() === '0' || zeroStat.text() === '0%' ? $(this).parent().hide().children().hide() : $(this).parent().show().children().show();
        $(this).find('#plsSt1').text() === '' ? softLock = parseInt(zeroStat.text()) : softLock = parseInt($(this).find('#plsSt1').text());
        switch (softCap) {
          case 'Crit': case 'ACC':
            softLock > 1500 ? $(this).next('#s-per').text((1500 + (softLock - 1500)*0.5)/10 + '%') : $(this).next('#s-per').text(softLock/10 + '%');
            break;
          case 'P.Block': case 'M.Block': case 'P.Dodge': case 'M.Dodge': case 'Lifesteal': case 'P.Crit Resistance': case 'M.Crit Resistance':
            softLock > 500 ? $(this).next('#s-per').text((500 + (softLock - 500)*0.5)/10 + '%') : $(this).next('#s-per').text(softLock/10 + '%');
            break;
          case 'CC Resist':
            softLock > 1000 ? $(this).next('#s-per').text((1000 + (softLock - 1000)*0.5)/10 + '%') : $(this).next('#s-per').text(softLock/10 + '%');
            break;
          case 'Penetration': case 'P.Tough': case 'M.Tough':
            softLock > 450 ? $(this).next('#s-per').text(((450 + (softLock - 450)*0.409)/10).toFixed(1) + '%') : $(this).next('#s-per').text(softLock/10 + '%');
            break;
          case 'ATK Spd':
            softLock > 1600 ? $(this).next('#s-per').text((1600 + (softLock - 1600)*0.5)/10 + '%') : $(this).next('#s-per').text(softLock/10 + '%');
            break;
          case 'P.Block DEF': case 'M.Block DEF':
            softLock > 225 ? $(this).next('#s-per').text((225 + (softLock - 225)*0.2)/10 + '%') : $(this).next('#s-per').text(softLock/10 + '%');
            break;
          case 'MP Recovery/Attack':
            $(this).prev().css('font-size', '12px').text('Mana Recovery/Attack');
            softLock > 1600 ? $(this).next('#s-per').text((1600 + (softLock - 1600)*0.5)/10 + '%') : $(this).next('#s-per').text(softLock/10 + '%');
            break;
          case 'Crit DMG': case 'Recovery':
            $(this).next('#s-per').text('').css('order', 0);
            break;
          default:
            $(this).next('#s-per').text(softLock/10 + '%');
        };
      });
    };

    /* Show message */
    function messgeBox(msg) {
      $('.msg').html(msg)
        .fadeIn(function() {
          $(this).show()
        })
        .fadeOut(250, function() {
          $(this).empty().hide()
          $('#clip').html('<img src="/images/clipboard.svg"><span>Copy</span>')
        })
    };

    /* Calculation all stats */
    function stats() {
      gearOptions();
      gearStats();
      gearSets();
    };
  });
}).call(this);
