(function() {
  $(document).on("turbolinks:load", function() {
    /* const stats */
    const Chars = $('#calc_char_id').html();
    const StatName = {
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
    };
    const HeroStat = {
      Knight: {
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
        A19: 0,
        ClassWeapon: 32730,
        UniqueWeapon: 45106,
        swATK: 3500,
        swHP: 125000,
        gearType: 'Heavy',
        gearTM: 'Protection',
        armor: '1-1H',
        armorTM: 'tm1',
        armorType: 'type1',
        secondary: '2-2H',
        secondaryTM: 'tm1',
        secondaryType: 'type1'
      },
      Warrior: {
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
        A19: 0,
        ClassWeapon: 37010,
        UniqueWeapon: 51120,
        swATK: 4000,
        swHP: 125000,
        gearType: 'Heavy',
        gearTM: 'Courage',
        armor: '1-1H',
        armorTM: 'tm1',
        armorType: 'type1',
        secondary: '2-2H',
        secondaryTM: 'tm1',
        secondaryType: 'type1'
      },
      Assassin: {
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
        A19: 0,
        ClassWeapon: 40711,
        UniqueWeapon: 56209,
        swATK: 4000,
        swHP: 125000,
        gearType: 'Light',
        gearTM: 'Coldness',
        armor: '3-1L',
        armorTM: 'tm2',
        armorType: 'type2',
        secondary: '4-2L',
        secondaryTM: 'tm3',
        secondaryType: 'type3'
      },
      Archer: {
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
        A19: 0,
        ClassWeapon: 45915,
        UniqueWeapon: 63264,
        swATK: 4500,
        swHP: 125000,
        gearType: 'Light',
        gearTM: 'Wrath',
        armor: '3-1L',
        armorTM: 'tm2',
        armorType: 'type2',
        secondary: '4-2L',
        secondaryTM: 'tm3',
        secondaryType: 'type3'
      },
      Mechanic: {
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
        A19: 0,
        ClassWeapon: 41867,
        UniqueWeapon: 57712,
        swATK: 4500,
        swHP: 125000,
        gearType: 'Light',
        gearTM: 'Passion',
        armor: '3-1L',
        armorTM: 'tm2',
        armorType: 'type2',
        secondary: '4-2L',
        secondaryTM: 'tm3',
        secondaryType: 'type3'
      },
      Wizard: {
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
        A19: 0,
        ClassWeapon: 42793,
        UniqueWeapon: 58985,
        swATK: 4500,
        swHP: 125000,
        gearType: 'Robe',
        gearTM: 'Wisdom',
        armor: '5-1I',
        armorTM: 'tm3',
        armorType: 'type3',
        secondary: '6-2I',
        secondaryTM: 'tm2',
        secondaryType: 'type2'
      },
      Priest: {
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
        A19: 0,
        ClassWeapon: 42793,
        UniqueWeapon: 58985,
        swATK: 4500,
        swHP: 125000,
        gearType: 'Robe',
        gearTM: 'Blessing',
        armor: '5-1I',
        armorTM: 'tm3',
        armorType: 'type3',
        secondary: '6-2I',
        secondaryTM: 'tm2',
        secondaryType: 'type2'
      }
    };
    const GearStat = {
      armorHeavy: 17052,
      armorLight: 11369,
      armorRobe: 5686,
      secondaryHeavy: 17052,
      secondaryLight: 5686,
      secondaryRobe: 11369,
      'Mana Stone': 726278,
      'Unique': 1596066,
      Ring: 726278,
      Earrings: 15801,
      Bracelet: 11369,
      Necklace: 11369,
      Orb: 726278,
      tm1R: 53718,
      tm1: 40928,
      tm2R: 35809,
      tm2: 27283,
      tm3R: 17908,
      tm3: 13644,
      tm4R: 1715830,
      tm4: 1307299,
      tm5R: 37327,
      tm5: 28440,
      swMultiplier: {
        0: 1,
        1: 1.03,
        2: 1.06,
        3: 1.09,
        4: 1.12,
        5: 1.16,
        6: 1.24,
        7: 1.32,
        8: 1.42,
        9: 1.52,
        10: 1.62,
        11: 1.82,
        12: 2.04,
        13: 2.28,
        14: 2.55,
        15: 2.86,
        16: 3.43,
        17: 4.12,
        18: 4.95,
        19: 5.94,
        20: 7.13
      }
    };
    const GearOption = {
      1: 'ATK',
      2: 'ATK Spd',
      3: 'Crit',
      4: 'Crit DMG',
      5: 'MP Recovery/Attack',
      6: 'MP Recovery/Sec',
      7: 'Penetration',
      8: 'Lifesteal',
      9: 'ACC',
      10: 'Debuff ACC',
      11: 'Max HP',
      12: 'CC Resist',
      13: 'Block',
      14: 'P. Block',
      15: 'M. Block',
      16: 'Crit Resistance',
      17: 'P. Crit Resistance',
      18: 'M. Crit Resistance',
      19: 'DEF',
      20: 'P. DEF',
      21: 'M. DEF',
      22: 'Dodge',
      23: 'P. Dodge',
      24: 'M. Dodge',
      25: 'Tough',
      26: 'P. Tough',
      27: 'M. Tough',
      28: 'Recovery',
      29: 'Mana Recovery upon taking DMG',
      30: 'DMG Reduction upon P.Block',
      31: 'DMG Reduction upon M.Block',
      32: 'DMG Reduction upon Block',
    };
    const GearIcon = {
      weapon: '/images/media/gears/bg-weapon.webp',
      treasure: '/images/media/gears/bg-treasure.webp',
      armor: '/images/media/gears/bg-armor.webp',
      secondary: '/images/media/gears/bg-secondary.webp',
      jewelry: '/images/media/gears/bg-accessory.webp',
      orb: '/images/media/gears/bg-orb.webp',
      artifact: '/images/media/gears/bg-art.webp'
    };
    const GearStar = {
      type1: {
        '1': 18758,
        '2': 21316,
        '3': 24726,
        '4': 28989,
        '5': 34105
      },
      type2: {
        '1': 12506,
        '2': 14212,
        '3': 16485,
        '4': 19328,
        '5': 22739
      },
      type3: {
        '1': 6255,
        '2': 7108,
        '3': 8245,
        '4': 9666,
        '5': 11372
      },
      type4: {
        '1': 798906,
        '2': 871534,
        '3': 944161,
        '4': 1016789,
        '5': 1089417
      },
      type5: {
        '1': 17381,
        '2': 18961,
        '3': 20542,
        '4': 22122,
        '5': 23702
      },
      Knight: {
        Unique: {
          '1': 49616,
          '2': 58637,
          '3': 72169,
          '4': 90210,
          '5': 112763
        },
        Class: {
          '1': 36003,
          '2': 40913,
          '3': 47459,
          '4': 55640,
          '5': 65460
        }
      },
      Warrior: {
        Unique: {
          '1': 49616,
          '2': 58637,
          '3': 72169,
          '4': 90210,
          '5': 112763
        },
        Class: {
          '1': 40710,
          '2': 46262,
          '3': 53664,
          '4': 62915,
          '5': 74018
        }
      },
      Assassin: {
        Unique: {
          '1': 61829,
          '2': 73071,
          '3': 89933,
          '4': 112416,
          '5': 140520
        },
        Class: {
          '1': 44781,
          '2': 50888,
          '3': 59030,
          '4': 69207,
          '5': 81420
        }
      },
      Archer: {
        Unique: {
          '1': 69589,
          '2': 82243,
          '3': 101221,
          '4': 126526,
          '5': 158157
        },
        Class: {
          '1': 50506,
          '2': 57393,
          '3': 66576,
          '4': 78054,
          '5': 91829
        }
      },
      Mechanic: {
        Unique: {
          '1': 63483,
          '2': 75026,
          '3': 92339,
          '4': 115423,
          '5': 144278
        },
        Class: {
          '1': 46054,
          '2': 52333,
          '3': 60707,
          '4': 71173,
          '5': 83733
        }
      },
      Wizard: {
        Unique: {
          '1': 64882,
          '2': 76680,
          '3': 94374,
          '4': 117967,
          '5': 147459
        },
        Class: {
          '1': 47071,
          '2': 53490,
          '3': 62049,
          '4': 72746,
          '5': 85584
        }
      },
      Priest: {
        Unique: {
          '1': 64882,
          '2': 76680,
          '3': 94374,
          '4': 117967,
          '5': 147459
        },
        Class: {
          '1': 47071,
          '2': 53490,
          '3': 62049,
          '4': 72746,
          '5': 85584
        }
      },
      'Mana Stone': {
        '1': 798906,
        '2': 871534,
        '3': 944161,
        '4': 1016789,
        '5': 1089417
      },
      'Unique': {
        '1': 1755649,
        '2': 2074871,
        '3': 2553676,
        '4': 3192064,
        '5': 3990076
      },
      tm1: {
        '1': 42974,
        '2': 45020,
        '3': 47067,
        '4': 49113,
        '5': 51160
      },
      tm1R: {
        '1': 56403,
        '2': 59089,
        '3': 61775,
        '4': 64461,
        '5': 67147
      },
      tm2: {
        '1': 28647,
        '2': 30011,
        '3': 31375,
        '4': 32739,
        '5': 34104
      },
      tm2R: {
        '1': 37599,
        '2': 39390,
        '3': 41180,
        '4': 42971,
        '5': 44761
      },
      tm3: {
        '1': 14327,
        '2': 15009,
        '3': 15691,
        '4': 16373,
        '5': 17056
      },
      tm3R: {
        '1': 18804,
        '2': 19699,
        '3': 20595,
        '4': 21490,
        '5': 22386
      },
      tm4: {
        '1': 1372664,
        '2': 1438029,
        '3': 1503394,
        '4': 1568759,
        '5': 1634124
      },
      tm4R: {
        '1': 1801621,
        '2': 1887413,
        '3': 1973204,
        '4': 2058996,
        '5': 2144787
      },
      tm5: {
        '1': 29862,
        '2': 31284,
        '3': 32706,
        '4': 34128,
        '5': 35550
      },
      tm5R: {
        '1': 39193,
        '2': 41060,
        '3': 42926,
        '4': 44793,
        '5': 46659
      }
    };
    /* vars */
    let heroClassId,
        heroClass,
        heroName,
        heroId,
        gearWeaponType,
        advancementPhase,
        rangeATK,
        rangeHP,
        gearTreasureType,
        allTreasure = [],
        gearSet,
        armorStat,
        secondaryStat,
        jewelryStat,
        orbStat,
        jewelryType,
        perkTier,
        perkId,
        perkTp,
        weaponGreyStat,
        treasureGreyStat,
        armorGreyStat,
        secondaryGreyStat,
        jewelryGreyStat,
        orbGreyStat,
        armorSet,
        secondarySet,
        jewelrySet,
        orbSet,
        starWeapon,
        starTreasure,
        starArmor,
        starSecondary,
        statJewelry,
        starOrb;
    /* Loading build from Link */
    $('#btn-load').click((e) => {
      e.preventDefault();
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
                $('[name="' + x + '"]').children('[value="' + y + '"]').prop('selected', true);
                switch (x) {
                  case 'calc[role_id]':
                    let role = $('#calc_role_id :selected').text();
                    let escaped_role = role.replace(/([ #;&,.+*~\':"!^$[\]()=>|\/@])/g, '\\$1');
                    let options = $(chars).filter("optgroup[label='" + escaped_role + "']").html();
                    if (options) {
                      $('#calc_char_id').html(options);
                      $('select').not('#calc_role_id').prop('selectedIndex', 0);
                      change_role();
                    }
                    break;
                  case 'calc[char_id]':
                    change_char();
                    break;
                  case 'calc[gear_weapon]':
                    change_weapon();
                    break;
                  case 'calc[st_weapon]':
                    change_sw_adv();
                    break;
                  case 'calc[st_weapon_st]':
                    change_sw_eth();
                    break;
                  case 'calc[gear_armor]':
                    change_armor();
                    break;
                  case 'calc[gear_secondary]':
                    change_secondary();
                    break;
                  case 'calc[gear_treasure]':
                    change_treasure();
                    break;
                  case 'calc[gear_jewelry]':
                    if (y !== '- - - - - - - - - -')
                      $('[name="' + x + '"]').children('optgroup[label=' + $jewelType + ']').children('[value="' + y + '"]').prop('selected', true);
                    $jewelSet = y;
                    change_jewelry();
                    break;
                  case 'calc[gear_orb]':
                    change_orb();
                    break;
                  case 'calc[gear_artifact]':
                    change_art();
                    break;
                  case 'range':
                  case 'add-atk':
                  case 'add-hp':
                    $('[name="' + x + '"]').prop('value', y);
                    swStat();
                    gearStat();
                    gearSet();
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
                  case 'calc[enh_type_ar]':
                  case 'calc[enh_type_sg]':
                  case 'calc[enh_type_j]':
                  case 'calc[enh_type_orb]':
                    $enhName = $('[name="' + x + '"]');
                    $('[name="' + x + '"]')
                      .parent().next().find('.enh-n').html('<option value="">- - - - - - - - - -</option>')
                      .parent().next().find('.enh-v').html('<option value="">- - - </option>');
                    if ($('[name="' + x + '"]').children('option:selected').val() !== '')
                      statEnhancement();
                    break;
                  case 'calc[enh_ar]':
                  case 'calc[enh_sg]':
                  case 'calc[enh_j]':
                  case 'calc[enh_orb]':
                    $enhName = $('[name="' + x + '"]');
                    $enh = $('[name="' + x + '"]').parent().next().find('.enh-v');
                    $enh.prop('selectedIndex', 0).find('optgroup').hide();
                    if ($('[name="' + x + '"]').children('option:selected').val() !== '')
                      statEnhancement();
                    break;
                  case 'calc[enh_ar_st]':
                  case 'calc[enh_sg_st]':
                  case 'calc[enh_j_st]':
                  case 'calc[enh_orb_st]':
                    $('[name="' + x + '"]')
                      .children('[value="' + y + '"]').prop('selected', true).end()
                      .children('.q, option:selected').show();
                    break;
                  case 'calc[jewelry_type]':
                    $jewelType = y;
                    break;
                  case 'perk-t1':
                  case 'perk-t2':
                  case 'perk-t3':
                  case 'perk-t5':
                    $('.hero-' + $hero + ' #' + x).find('img#' + y).addClass('pick');
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
                    break;
                  case 'uw':
                  case 'ar':
                  case 'sg':
                  case 'ut':
                  case 'ac':
                  case 'or':
                    $('#' + x).find('label').removeClass('active');
                    $('#' + x).find('.bt' + y).addClass('active');
                    option();
                    gearStat();
                    gearSet();
                    break;
                };
              });

              option();
              gearStat();
              gearSet();

              $('.share-add').remove();
            } else
              messgeBox('Enter valid link!');
          })
          .fail(function(jqXHR, textStatus, errorThrown) {
            messgeBox(`Enter valid link/code! - ${errorThrown}`);
          });
      } else
        messgeBox('Enter link!')
    });
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
      // $('option:contains("----------")').attr('disabled', 'disabled');
      $('.r-stats').children().hide();
      $('.t-total .r-stats').empty();
      heroClassId = $('#calc_role_id').children('option:selected').val();
      heroClass = $('#calc_role_id').children('option:selected').text();
      heroName = $('#calc_char_id').children('option:selected').text().toLowerCase();
      heroId = $('#calc_char_id').children('option:selected').val();

      const stats = $('.class-stats').find('.statData').clone();
      $(stats).prependTo('.t-total .r-stats');
      $('.t-total').find('.statData').show();

      $('#calc_gear_armor, #calc_gear_secondary, #calc_gear_jewelry, #calc_gear_orb')
        .parents().eq(1).find('.gOption select, .gTM select').prop('selectedIndex', 0);
      $('#calc_gear_artifact')
        .prop('selectedIndex', 0)
        .parents().eq(1).find('.gArt').hide()
        .find('.calc-art-description p').empty();
      $('#w-d').hide();

      $('.statData .statsBase, .statData .statsAdd').empty();
      for (let i = 0; i <= 3; i++) {
        let x = HeroStat[heroClass][`B${i}`];
        $('.statData .statsBase').append('<div class="r-stat"><p id="s-name"></p><p id="s-val"></p></div>');
        $('.statData .statsBase').find('.r-stat:eq(' + i + ') #s-val').text(x);
      }
      for (let j = 0; j <= 19; j++) {
        let y = HeroStat[heroClass][`A${j}`];
        $('.statData .statsAdd').append('<div class="r-stat"><p id="s-name"></p><p id="s-val"></p><p id="s-per"></div>');
        $('.statData .statsAdd').find('.r-stat:eq(' + j + ') #s-val').text(y);
      }
      for (let k = 0; k <= 23; k++) {
        let z = StatName['S' + k];
        $('.statData').find('.r-stat:eq(' + k + ') #s-name').text(z);
      }
    };
    function change_char() {
      $('.hch').hide().end().find(`.hero-${$('#calc_char_id').children('option:selected').val()}`).css('display', 'block');
      // $('option:contains("----------")').attr('disabled', 'disabled');
      heroName = $('#calc_char_id').children('option:selected').text().toLowerCase();

      $('.ay-r').children().not('.q').hide();
      $('.gOption, .gTM, .gArt, .range, .form-input .gSt .rating').hide();
      $('.t-st, .form-input .gSt, .calc-art-description').find('p').empty();
      $('.rating').find('label').removeClass('active');
      $('.c-perk-img').find('img').removeClass('pick');
      $('.perk-tp').find('p').css('color', 'black').text(0);
      $('select').not('#calc_role_id, #calc_char_id').prop('selectedIndex', 0);
    };
    function change_weapon() {
      $(`#calc_gear_weapon`).parents().eq(1).find('.rating label').removeClass('active');
      $('#heroATK').empty();
      gearWeaponType = $('#calc_gear_weapon').children('option:selected').val();
      $('.w-in').removeClass('g-fr-u a0 a1 a2');
      $('#calc_st_weapon, #calc_st_weapon_st').prop('selectedIndex', 0);
      $('#calc_st_weapon_st').children().hide();
      switch (gearWeaponType) {
        case '- - - - - - - - - -':
          $('.calc_gear_weapon').parent().find('.gOption').hide();
          $('#calc_gear_weapon')
            .css('background-image', `url(${GearIcon.weapon})`)
            .parents().eq(1).find('.gOption select').prop('selectedIndex', 0);

          $('#greyATK').text('');
          $('.w-in').removeClass('g-fr-u');
          $('#range-atk, #range-hp').text(0);
          $('#g-weapon, .range, #w-d, #we').hide();
          $('#uw label').filter('.active').removeClass('active');
          $('#weapon .ay-r')
            .children().hide().end()
            .prop('selectedIndex', 0)
            .children('.q').show();
          // rangeC();
          break;
        case 'Class':
          $('#calc_gear_weapon').css('background-image', `url(/images/media/heroes/${heroClass.toLowerCase()}.webp)`);
          $('#greyATK').text(HeroStat[heroClass].ClassWeapon);

          $('.calc_gear_weapon').parent().find('.gOption').show();
          $('#range-atk, #range-hp').text(0);
          $('#g-weapon, .range, #w-d').hide();
          $('#we').show();
          $('.w-in').addClass('g-fr-u');
          // rangeC();
          // gearStat();
          break;
        case 'Unique':
          $('#calc_gear_weapon').attr('style', `background-image: url("/images/media/heroes/${heroName}/uw.webp"); display: inline-block;`);
          $('#greyATK').text(HeroStat[heroClass].UniqueWeapon);

          $('.calc_gear_weapon').parent().find('.gOption').show();
          $('#calc_st_weapon_st').children(':first').show();
          $('#g-weapon, #w-d, #we').show();
          $('.w-in').addClass('g-fr-u');
          // gearStat();
          break;
        };
      $('[tag="weapon"]').text($('#greyATK').text());
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
        // gearStat();
      } else {
        $('#calc_st_weapon_st').prop('selectedIndex', 0).children().hide().first().show();
        rangeATK = $('#range-atk').text(0);
        rangeHP = $('#range-hp').text(0);
        if (gearWeaponType !== '- - - - - - - - - -')
          $('.w-in').addClass('g-fr-u');
        $('.range').hide();
      };
      // rangeC();
    };
    function change_sw_eth() {
      etherEnhancement = $('#calc_st_weapon_st').children('option:selected').text();
      swStat();
      // gearStat();
    };
    function change_gear(gear) {
      $(`#calc_gear_${gear}`).parent().next().find('.rating label').removeClass('active');
      let r, y = gear.slice(0, 2);
      (gear != 'jewelry' || $(`#calc_gear_jewelry`).children('option:selected').val() == '- - - - - - - - - -') ? gearSet = $(`#calc_gear_${gear}`).children('option:selected').val()
                                                                                                                : gearSet = $(`#calc_gear_${gear}`).children().children('option:selected').val();
      treasureType = $('#calc_gear_treasure').children('option:selected').val();
      jewelryType = $(`#calc_gear_jewelry`).children().children('option:selected').parent().attr('label');
      $(`#set_${gear}`).text(gearSet);
      switch (gear) {
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
            $(`#calc_gear_${gear}, .frst`).removeAttr('style');
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
        case 'Mana Stone':
          greyStat.text(GearStat[gearSet]);
          $(`#${y}`).show();
          $(`#calc_gear_${gear}, .frst`).removeAttr('style');
          $('#calc_gear_treasure')
            .css('background-image', 'url(/images/media/gears/9-UT/Mana.webp)')
            .addClass('g-fr').removeClass('g-fr-u');
          $('.calc_gear_treasure').parent().find('.frst').show().css({'bottom': '104px'});
          $('.scnd').hide();
          $('.scnd select').prop('selectedIndex', 0);
          // gearStat();
          break;
        case 'Unique':
          allTreasure.length = 0;
          for (let i = 1; i < 5; i++)
            allTreasure.push(`url("/images/media/heroes/${heroName}/ut${i}.webp")`);
          greyStat.text(GearStat[gearSet]);
          $(`#${y}`).show();
          $(`#calc_gear_${gear}, .frst`).removeAttr('style');
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
          // gearStat();
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

    $('select#calc_role_id').change(function() {
      change_role();
      statSplit();
      rangeC();
    }).change();
    $('select#calc_char_id').change(function() {
      change_char();
      statSplit();
      rangeC();
    }).change();
    $('select.ax-r').change(function() {
      let runeStat = $(this).val();
      let runeVal = $(this).parents().eq(1).find('.ay-r');
      change_rune(runeVal, runeStat);
    });
    $('select#calc_gear_weapon').change(function() {
      change_weapon();
    }).change();
    $('select#calc_st_weapon').change(function() {
      change_sw_adv();
      change_sw_eth();
    }).change();
    $('select#calc_st_weapon_st').change(function() {
      change_sw_eth();
    }).change();
    $('select#calc_gear_treasure, select#calc_gear_armor, select#calc_gear_secondary, select#calc_gear_orb').change(function() {
      change_gear($(this).parents().eq(1).attr('id'));
    }).change();
    $('select#calc_gear_jewelry').change(function() {
      change_gear($(this).parents().eq(2).attr('id'));
    }).change();
    $('select#calc_st_treasure, select#calc_st_armor, select#calc_st_secondary, select#calc_st_jewelry, select#calc_st_orb').change(function() {
      $(this).parents().eq(1).find('.ay, .ay-tm').prop('selectedIndex', 0);
      statOption($(this));
      // gearStat();
    });
    $('select#calc_st_armor_op, select#calc_st_secondary_op, select#calc_st_jewelry_op, select#calc_st_orb_op').change(function() {
      $(`#${$(this).attr('tag')}`).text($(`#${$(this).attr('id')}`).children('option:selected').text());
      // gearSet();
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

    function starGearWeapon() {
      weaponGreyStat = $('#greyATK').text();
      starWeapon = $('#we').find('.active').next('input').val();
      let x = parseInt(weaponGreyStat);
      if (starWeapon == '0' || starWeapon == null)
        $('[tag="weapon"]').text(weaponGreyStat);
      else {
        $('[tag="weapon"]').text(GearStar[heroClass][gearWeaponType][starWeapon]);
      };
    };
    function starGears(gear) {
      starGear = $(`#${gear.slice(0, 2)}`).find('.active').next('input').val();
      let x;
      gearSet.charAt(0) == 'R' ? x = 'R' : x = '';
      if (starGear == '0' || starGear == null)
        $(`[tag="${gear}"]`).text(greyStat.text());
      else
        switch (gear) {
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

    function gearStats(gear_type) {
      gear_type == 'weapon' ? starGearWeapon() : starGears(gear_type);
      let grey_ATK = $('#greyATK').text();
      let weapon_ATK = $('[tag="weapon"]').text();
      $('#heroATK').text(weapon_ATK);
      // $('#heroTR').text($('#greyTR').text());
      // $('#heroPDEF').text($('#greyPDEF').text());
      // $('#heroMDEF').text($('#greyMDEF').text());
      // $('#heroJ').text($('#greyJ').text());
      // $('#heroO').text($('#greyO').text());

      let class_ATK = $('.class-stats').find('p').filter(function() {
        return $(this).text() === 'ATK'
      }).next('p').text();
      // $classHP = $('.class-stats').find('p').filter(function() {
      //   return $(this).text() === 'MAX HP'
      // }).next('p').text();
      // $classPDEF = $('.class-stats').find('p').filter(function() {
      //   return $(this).text() === 'P.DEF'
      // }).next('p').text();
      // $classMDEF = $('.class-stats').find('p').filter(function() {
      //   return $(this).text() === 'M.DEF'
      // }).next('p').text();

      let gear_ATK;
      weapon_ATK == '' ? gear_ATK = 0 : gear_ATK = weapon_ATK;
      // $gearTr = $('#heroTR').text();
      // if ($gearTr == '') $gearTr = 0;
      // $gearP = $('#heroPDEF').text();
      // if ($gearP == '') $gearP = 0;
      // $gearM = $('#heroMDEF').text();
      // if ($gearM == '') $gearM = 0;
      // $gearJ = $('#heroJ').text();
      // if ($gearJ == '') $gearJ = 0;
      // $gearO = $('#heroO').text();
      // if ($gearO == '') $gearO = 0;
      // $('#heroHP').text($classHP);

      // $rAtk = $('#range-atk').text();
      // $rHP = $('#range-hp').text();

      let total_ATK = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'ATK'
      }).next('p');
      // $totalH = $('.t-total .r-stats').find('p').filter(function() {
      //   return $(this).text() === 'MAX HP'
      // }).next('p');
      // $totalP = $('.t-total .r-stats').find('p').filter(function() {
      //   return $(this).text() === 'P.DEF'
      // }).next('p');
      // $totalM = $('.t-total .r-stats').find('p').filter(function() {
      //   return $(this).text() === 'M.DEF'
      // }).next('p');
      // if ($jewelSet !== '- - - - - - - - - -') {
      //   if ($jewelType == 'Earrings') {
      //     $totalJ = $('.t-total .r-stats').find('p').filter(function() {
      //       return $(this).text() === 'ATK'
      //     }).next('p');
      //   } else if (($jewelType == 'Ring') || ($jewelType == 'Unequip')) {
      //     $totalJ = $('.t-total .r-stats').find('p').filter(function() {
      //       return $(this).text() === 'MAX HP'
      //     }).next('p');
      //   } else if ($jewelType == 'Necklace') {
      //     $totalJ = $('.t-total .r-stats').find('p').filter(function() {
      //       return $(this).text() === 'M.DEF'
      //     }).next('p');
      //   } else if ($jewelType == 'Bracelet') {
      //     $totalJ = $('.t-total .r-stats').find('p').filter(function() {
      //       return $(this).text() === 'P.DEF'
      //     }).next('p');
      //   }
      // }
      // $totalO = $('.t-total .r-stats').find('p').filter(function() {
      //   return $(this).text() === 'MAX HP'
      // }).next('p');

      // if ($jewelSet !== '- - - - - - - - - -')
      //   $jewelType == 'Earrings' ? $sumAtk = parseInt($classATK) + parseInt($gearA) + parseInt($gearJ) + parseInt($('#range-atk').text()) : $sumAtk = parseInt($classATK) + parseInt($gearA) + parseInt($('#range-atk').text());
      // else
      //   $sumAtk = parseInt($classATK) + parseInt($gearA) + parseInt($('#range-atk').text());
      let sum_ATK = parseInt(class_ATK) + parseInt(gear_ATK) + parseInt(rangeATK.text());
      let opA = $('p[name="ATK"]').text();
      opA === '' ? total_ATK.text(`${sum_ATK} (${class_ATK}+${sum_ATK - class_ATK})`)
                 : total_ATK.text(`${Math.trunc(sum_ATK * (opA / 100 + 1))} (${class_ATK}+${(Math.trunc(sum_ATK * (opA / 100 + 1)) - class_ATK)})`);

      // if ($jewelSet !== '- - - - - - - - - -')
      //   $jewelType == 'Ring' ? $sumTre = parseInt($classHP) + parseInt($gearTr) + parseInt($gearJ) + parseInt($gearO) + parseInt($('#range-hp').text()) : $sumTre = parseInt($classHP) + parseInt($gearTr) + parseInt($gearO) + parseInt($('#range-hp').text());
      // else
      //   $sumTre = parseInt($classHP) + parseInt($gearTr) + parseInt($gearO) + parseInt($('#range-hp').text());
      // $opH = $('p[name="Max HP"]').text();
      // $opH === '' ? $totalH.text($sumTre + ' (' + $classHP + '+' + ($sumTre - $classHP) + ')') : $totalH.text(Math.round($sumTre * ($opH / 100 + 1)) + ' (' + $classHP + '+' + (Math.round($sumTre * ($opH / 100 + 1)) - $classHP) + ')');
      // $('#heroHP').text($totalH.text());
      // $('#heroHPs').text($totalH.text().split(' ')[0]);

      // if ($armorSet !== '- - - - - - - - - -') {
      //   $sumArm = parseInt($classPDEF) + parseInt($gearP) + parseInt($gearJ);
      //   if ($gearP !== 0) {
      //     if ($jewelSet !== '- - - - - - - - - -') {
      //       if ($jewelType == 'Bracelet')
      //         $gearJ == 0 ? $totalP.text($sumArm + ' (' + $classPDEF + '+' + $gearP + ')') : $totalP.text($sumArm + ' (' + $classPDEF + '+' + ($gearP + $gearJ) + ')');
      //       else
      //         $totalP.text(($classPDEF + $gearP) + ' (' + $classPDEF + '+' + $gearP + ')');
      //     }
      //   }
      // } else
      //   $totalP.text($classPDEF);

      // if ($secondarySet !== '- - - - - - - - - -') {
      //   $sumSec = parseInt($classMDEF) + parseInt($gearM) + parseInt($gearJ);
      //   if ($gearM !== 0) {
      //     if ($jewelSet !== '- - - - - - - - - -') {
      //       if ($jewelType == 'Necklace')
      //         $gearJ == 0 ? $totalM.text($sumSec + parseInt($gearM) + ' (' + $classMDEF + '+' + $gearM + ')') : $totalM.text($sumSec + ' (' + $classMDEF + '+' + (parseInt($gearM) + parseInt($gearJ)) + ')');
      //       else
      //         $totalM.text(($classMDEF + $gearM) + ' (' + $classMDEF + '+' + $gearM + ')');
      //     }
      //   }
      // } else
      //   $totalM.text($classMDEF);

      // if ($jewelSet !== '- - - - - - - - - -') {
      //   if ($jewelType == 'Ring')
      //     $sumAcc = parseInt($classHP) + parseInt($gearTr) + parseInt($gearJ) + parseInt($gearO) + parseInt($('#range-hp').text());
      //   else if ($jewelType == 'Earrings')
      //     $sumAcc = parseInt($classATK) + parseInt($gearA) + parseInt($gearJ) + parseInt($rAtk);
      //   else if ($jewelType == 'Necklace')
      //     $sumAcc = parseInt($classMDEF) + parseInt($gearM) + parseInt($gearJ);
      //   else if ($jewelType == 'Bracelet')
      //     $sumAcc = parseInt($classPDEF) + parseInt($gearP) + parseInt($gearJ);
      //
      //   if ($gearJ !== 0) {
      //     if ($jewelType == 'Ring') {
      //       $opJ = $('p[name="Max HP"]').text();
      //       $opJ === '' ? $totalJ.text($sumAcc + ' (' + $classHP + '+' + ($sumAcc - $classHP) + ')') : $totalJ.text(Math.round($sumAcc * ($opJ / 100 + 1)) + ' (' + $classHP + '+' + (Math.round($sumAcc * ($opJ / 100 + 1)) - $classHP) + ')');
      //       $('#heroHP').text($totalJ.text());
      //       $('#heroHPs').text($totalJ.text().split(' ')[0]);
      //     } else if ($jewelType == 'Earrings') {
      //       $opJ = $('p[name="ATK"]').text();
      //       $opJ === '' ? $totalJ.text($sumAcc + ' (' + $classATK + '+' + ($sumAcc - $classATK) + ')') : $totalJ.text(Math.trunc($sumAcc * ($opJ / 100 + 1)) + ' (' + $classATK + '+' + (Math.trunc($sumAcc * ($opJ / 100 + 1)) - $classATK) + ')');
      //     } else if ($jewelType == 'Necklace') {
      //       $opJ = $('p[name="M.DEF"]').text();
      //       $opJ === '' ? $totalJ.text($sumAcc + ' (' + $classMDEF + '+' + ($sumAcc - $classMDEF) + ')') : $totalJ.text(Math.round($sumAcc * ($opJ / 100 + 1)) + ' (' + $classMDEF + '+' + (Math.round($sumAcc * ($opJ / 100 + 1)) - $classMDEF) + ')');
      //     } else if ($jewelType == 'Bracelet') {
      //       $opJ = $('p[name="P.DEF"]').text();
      //       $opJ === '' ? $totalJ.text($sumAcc + ' (' + $classPDEF + '+' + ($sumAcc - $classPDEF) + ')') : $totalJ.text(Math.round($sumAcc * ($opJ / 100 + 1)) + ' (' + $classPDEF + '+' + (Math.round($sumAcc * ($opJ / 100 + 1)) - $classPDEF) + ')');
      //     }
      //   }
      // }

      // if ($jewelSet !== '- - - - - - - - - -')
      //   $jewelType == 'Ring' ? $sumOrb = parseInt($classHP) + parseInt($gearTr) + parseInt($gearJ) + parseInt($gearO) + parseInt($('#range-hp').text()) : $sumOrb = parseInt($classHP) + parseInt($gearTr) + parseInt($gearO) + parseInt($('#range-hp').text());
      // else
      //   $sumOrb = parseInt($classHP) + parseInt($gearTr) + parseInt($gearO) + parseInt($('#range-hp').text());
      // $opO = $('p[name="Max HP"]').text();
      // $opO === '' ? $totalO.text($sumOrb + ' (' + $classHP + '+' + ($sumOrb - $classHP) + ')') : $totalO.text(Math.round($sumOrb * ($opO / 100 + 1)) + ' (' + Math.round($classHP + '+' + ($sumOrb * ($opO / 100 + 1)) - $classHP) + ')');
      // $('#heroHP').text($totalO.text());
      // $('#heroHPs').text($totalO.text().split(' ')[0]);
    };
    // function gearSet() {
    //   $setBonus = $('.t-total .r-stats').find('p').filter(function() {
    //     return $(this).text() === 'Set Bonus'
    //   }).next('p');
    //   if (!$setBonus.length)
    //     $setBonus = $('.t-total .r-stats').append('<div class="statSet"><div class="r-set"><p id="s-name">Set Bonus</p><p id="sb"><span id="f1">2 Set: Crit +100</span><span id="f2">4 Set: Crit +130</span><span id="fr1">2 Set: Max HP +10%</span><span id="fr2">4 Set: Max HP +13%</span><span id="p1">2 Set: Crit Resistance +100</span><span id="p2">4 Set: Crit Resistance +130</span><span id="d1">2 Set: MP Recovery/Attack +200</span><span id="d2">4 Set: MP Recovery/Attack +260</span><span id="la1">2 Set: Crit DMG +20%</span><span id="la2">4 Set: Crit DMG +26%</span><span id="le1">2 Set: Debuff ACC +100</span><span id="le2">4 Set: Debuff ACC +130</span><span id="s1">2 Set: Increases DMG to Heroes by 7%</span><span id="s2">4 Set: Increases DMG to Heroes by 13%</span><span id="pr1">2 Set: Reduces DMG recevied from Heroes by 6%</span><span id="pr2">4 Set: Reduces DMG recevied from Heroes by 11%</span><span id="dl1">2 Set: Increases Crit DMG of all allies by 5%</span><span id="dl2">4 Set: Increases Crit DMG of all allies by 8%</span><span id="ch1">2 Set: Hero deals 12% more DMG and takes 12% less DMG from bosses</span><span id="ch2">4 Set: Hero deals 15% more DMG and takes 15% less DMG from bosses</span><span id="t1">2 Set: Increases DMG dealt to enemies by 2%\n This effect increases by 4 times in the Technomagic Kingdom</span><span id="t2">4 Set: Increases DMG dealt to enemies by 3%\n This effect increases by 4 times in the Technomagic Kingdom</span><span id="per1">4 Set: Increases DMG dealt to enemies by 10% and takes 10% reduces All DMG. This effect increases up to max 20% over 50 sec.</span><span id="per2">4 Set: Increases DMG dealt to enemies by 10% and ATK by 10%. This effect increases up to max 25% over 100 sec.</span><span id="per3">4 Set: Increases DMG dealt to enemies by 10% and ATK by 10%. This effect increases up to max 25% over 100 sec.</span><span id="per4">4 Set: Increases DMG dealt to enemies by 10% and ATK by 10%. This effect increases up to max 25% over 100 sec.</span><span id="per5">4 Set: Increases DMG dealt to enemies by 10% and Crit DMG by 20%. This effect increases DMG dealt to enemies up to max 25%, and Crit DMG up to max 50% over 100 sec.</span><span id="per6">4 Set: Increases DMG dealt to enemies by 10% and Crit DMG by 20%. This effect increases DMG dealt to enemies up to max 25%, and Crit DMG up to max 50% over 100 sec.</span><span id="per7">4 Set: Increases the amount of own Heal Rate effects by 25% and Shield by 25%.</span><span id="hop1">4 Set: Increases all allies All DEF by 10% and ATK by 5%.</span><span id="hop2">4 Set: Increases ATK Spd of all allies by 100. The effect multiplies by 2 for melee type Heroes.</span><span id="hop3">4 Set: Increases Crit DMG by 40%. Upon Skill use, recovers 300 Mana, and additionally increases Crit DMG by 40% for 3 sec.</span><span id="hop4">4 Set: Increases Crit DMG of all allies by 20%. This effect multiplies by 2 for ranged type Heroes.</span><span id="hop5">4 Set: Recovers all allies Mana by 500 and reduces Cooldown of all Skills by 0.5 sec every 10 sec.</span><span id="hop6">4 Set: Increases all allies DMG dealt to enemies by 2%. After 30 sec, increases the effect of 1 ally who dealt the highest DMG to enemies by 4 times.</span><span id="hop7">4 Set: Increases Heal Rate of all allies by 6%. After 5 sec, increases Mana Recovery of all allies by 6%.</span><span id="aut1">4 Set: Increases own All Block Chance by 300. Upon successful Block, reduces Cooldown of all Skills by 1 sec. This effect activates only once every 2.5 sec.</span><span id="aut2">4 Set: Increases own Max HP by 30%. For 1 time only during the battle, recovers 30% of Max HP and permanently increases ATK Spd by 300 if own HP percentage falls below 50%.</span><span id="aut3">4 Set: Increases own DEF Penetration by 250 and DMG that ignores DEF by 12%. By killing an enemy, additionally increases DEF Penetration by 250 and DMG that ignores DEF by 12%.</span><span id="aut4">4 Set: Increases own ATK by 25%. At the beginning of each battle, this effect multiplies by 2 for 20 sec.</span><span id="aut5">4 Set: Increases own Crit Chance by 300. If own Crit Chance is over 1400, all hits becomes a Crit Hit.</span><span id="aut6">4 Set: After fully recovering Mana for the first time, increases Mana Recovery by 20% and ATK by 40%.</span><span id="aut7">4 Set: Increases ATK of all allies by 10%.</span></p></div></div>');
    //   $setBonus.find('span').hide();
    //
    //   $tmSkill = $('.t-total .r-stats').find('p').filter(function() {
    //     return $(this).text() === 'TM Skill'
    //   }).next('p');
    //   if (!$tmSkill.length)
    //     $tmSkill = $('.t-total .r-stats').append('<div class="statTMS"><div class="r-tms"><p id="s-name">TM Skill</p><p id="tms"><span id="tms1">Increases ATK by 35% when there is 1 enemy.</span><span id="tms2">Increases DEF by 45% when there is 1 enemy.</span><span id="tms3">Increases ATK by 35% when there is 3 enemy.</span><span id="tms4">Increases DEF by 45% when there is 3 enemy.</span><span id="tms5">Increases ATK by 50% for 10 sec when HP falls below 30%. This effect activates only once every 10 sec.</span><span id="tms6">Increases own DMG dealt to enemies by 25% when HP is above 95%.</span><span id="tms7">Increases DMG dealt to enemies by 15% for 10 sec when Mana at 100%. This effect activates only once every 15 sec.</span><span id="tms8">Immediately reduces Cooldown of all allies by 3% when Mana is at 100%. This effect activates only once every 10 sec.</span><span id="tms9">Reduces Cooldown of 1st Skill by 10% every 10 sec.</span><span id="tms10">Reduces Cooldown of 2nd Skill by 10% every 10 sec.</span><span id="tms11">Reduces Cooldown of 3rd Skill by 10% every 10 sec.</span><span id="tms12">Upon every Skill use, increases ATK by 2%. This effect can be stacked up to max 20 times.</span><span id="tms13">Upon every Skill use, takes 3% reduces DMG. This effect can be stacked up to max 8 times.</span><span id="tms14">Upon blocking the enemys attack, increases All Block by 20. This effect can be stacked up to max 20 times and activates only once every 2 sec.</span><span id="tms15">Takes 20% reduces P.DMG. This effect can increase up to 30% over 10 sec.</span><span id="tms16">Takes 20% reduces M.DMG. This effect can increase up to 30% over 10 sec.</span><span id="tms17">Increases DMG dealt to enemies by 3% every 15 sec. This effect can be stacked up to max 12 times.</span><span id="tms18">Upon blocking an enemy attack, recovers 200 Mana. This effect activates only once every 1 sec.</span><span id="tms19">Upon Skill use, increases Heal Rate by 25% for 5 sec. This effect activates only once every 10 sec.</span><span id="tms20">Increases DMG of [DMG that ignores DEF] by 25%.</span><span id="tms21">Increases DMG of [Continuous DMG] by 20%.</span><span id="tms22">Upon killing an enemy, increases ATK by 2%. This effect can be stacked up to max 25 times.</span><span id="tms23">At the beginning of each battle, increases ATK by 5%. This effect can be stacked up to max 15 times.</span><span id="tms24">Increases DEF by 7% per 1 enemy.</span><span id="tms25">Increases ATK by 6% per 1 enemy.</span><span id="tms26">Increases ATK of all allies by 5%.</span><span id="tms27">Increases Crit DMG of all allies by 10%.</span><span id="tms28">Increases All DEF of all allies by 7%.</span><span id="tms29">At the beginning of each battle, increases DMG dealt to enemies of the ally with the highest ATK by 2.5% for 200 sec.</span><span id="tms30">Increases DMG of normal attacks by 25%.</span><span id="tms31">Increases All Block by 150. At the beginning of each battle, additionally increases All Block by 200 for 10 sec.</span><span id="tms32">Increases own Shield by 25%.</span><span id="tms33">Heals HP equal to 1% of Max HP every sec.</span><span id="tms34">Recovers own Mana by 500 every 5 sec.</span><span id="tms35">Reduces All DEF by 25% and increases ATK by 50%.</span><span id="tms36">Reduces ATK by 20% and increases All DEF by 50%.</span><span id="tms37">Reduces the duration of CCs inflicted upon self by 15%.</span><span id="tms38">Increases Dodge Chance by 200. Upon dodging an enemy attack, heals HP equal 3% of Max HP. This effect can be activates only once every 3 sec.</span><span id="tms39">Fixes ATK Spd to 1000 and increases ATK by 40%.</span><span id="tms40">Increases Crit DMG by 50%.</span><span id="tms41">Increases ATK Spd by 250.</span><span id="tms42">Increases DEF Penetration by 250.</span><span id="tms43">Increases Max HP by 25%.</span><span id="tms44">Increases All Block by 250.</span><span id="tms45">Increases All DEF by 25%.</span><span id="tms46">Increases Crit Chance by 250.</span><span id="tms47">Increases ATK by 25%.</span><span id="tms48">Soul Weapon Usage Limit +1</span><span id="tms49">Level of [1st Skill] +7</span><span id="tms50">Level of [2nd Skill] +7</span><span id="tms51">Level of [3rd Skill] +7</span><span id="tms52">Level of [4th Skill] +7</span><span id="tms53">Level of [All Skill] +5</span></p></div></div>');
    //   $tmSkill.find('span').hide();
    //
    //   $statCrit = $('.class-stats').find('p').filter(function() {
    //     return $(this).text() === 'Crit'
    //   }).next('p');
    //   $statHP = $('.class-stats').find('p').filter(function() {
    //     return $(this).text() === 'MAX HP'
    //   }).next('p');
    //   $statGrey = parseInt($('#heroHP').text());
    //   $statCritResP = $('.class-stats').find('p').filter(function() {
    //     return $(this).text() === 'P.Crit Resistance'
    //   }).next('p');
    //   $statCritResM = $('.class-stats').find('p').filter(function() {
    //     return $(this).text() === 'M.Crit Resistance'
    //   }).next('p');
    //   $statMPa = $('.class-stats').find('p').filter(function() {
    //     return $(this).text() === 'MP Recovery/Attack'
    //   }).next('p');
    //   $statCritD = $('.class-stats').find('p').filter(function() {
    //     return $(this).text() === 'Crit DMG'
    //   }).next('p');
    //   $statDebuff = $('.class-stats').find('p').filter(function() {
    //     return $(this).text() === 'Debuff ACC'
    //   }).next('p');
    //   $statASpd = $('.class-stats').find('p').filter(function() {
    //     return $(this).text() === 'ATK Spd'
    //   }).next('p');
    //   $statMPs = $('.class-stats').find('p').filter(function() {
    //     return $(this).text() === 'MP Recovery/Sec'
    //   }).next('p');
    //   $statPen = $('.class-stats').find('p').filter(function() {
    //     return $(this).text() === 'Penetration'
    //   }).next('p');
    //   $statLife = $('.class-stats').find('p').filter(function() {
    //     return $(this).text() === 'Lifesteal'
    //   }).next('p');
    //   $statACC = $('.class-stats').find('p').filter(function() {
    //     return $(this).text() === 'ACC'
    //   }).next('p');
    //   $statCC = $('.class-stats').find('p').filter(function() {
    //     return $(this).text() === 'CC Resist'
    //   }).next('p');
    //   $statPB = $('.class-stats').find('p').filter(function() {
    //     return $(this).text() === 'P.Block'
    //   }).next('p');
    //   $statMB = $('.class-stats').find('p').filter(function() {
    //     return $(this).text() === 'M.Block'
    //   }).next('p');
    //   $statPBD = $('.class-stats').find('p').filter(function() {
    //     return $(this).text() === 'P.Block DEF'
    //   }).next('p');
    //   $statMBD = $('.class-stats').find('p').filter(function() {
    //     return $(this).text() === 'M.Block DEF'
    //   }).next('p');
    //   $statPDef = $('.class-stats').find('p').filter(function() {
    //     return $(this).text() === 'P.DEF'
    //   }).next('p');
    //   $statMDef = $('.class-stats').find('p').filter(function() {
    //     return $(this).text() === 'M.DEF'
    //   }).next('p');
    //   $statPD = $('.class-stats').find('p').filter(function() {
    //     return $(this).text() === 'P.Dodge'
    //   }).next('p');
    //   $statMD = $('.class-stats').find('p').filter(function() {
    //     return $(this).text() === 'M.Dodge'
    //   }).next('p');
    //   $statPT = $('.class-stats').find('p').filter(function() {
    //     return $(this).text() === 'P.Tough'
    //   }).next('p');
    //   $statMT = $('.class-stats').find('p').filter(function() {
    //     return $(this).text() === 'M.Tough'
    //   }).next('p');
    //   $statRec = $('.class-stats').find('p').filter(function() {
    //     return $(this).text() === 'Recovery'
    //   }).next('p');
    //   $statManaRec = $('.class-stats').find('p').filter(function() {
    //     return $(this).text() === 'Mana Recovery upon taking DMG'
    //   }).next('p');
    //
    //   $f = 0;$fr = 0;$p = 0;$d = 0;$la = 0;$le = 0;$ch = 0;$s = 0;$pr = 0;$dl = 0;$t = 0;$tmP = 0;$tmH = 0;$tmA = 0;
    //   $sq = $('.set').find('p').each(function() {
    //     if ($(this).is(':contains("Fire")'))
    //       $f++;
    //     else if ($(this).is(':contains("Frost")'))
    //       $fr++;
    //     else if ($(this).is(':contains("Poison")'))
    //       $p++;
    //     else if ($(this).is(':contains("Darkness")'))
    //       $d++;
    //     else if ($(this).is(':contains("Lava")'))
    //       $la++;
    //     else if ($(this).is(':contains("Legendary")'))
    //       $le++;
    //     else if ($(this).is(':contains("Suppression")'))
    //       $s++;
    //     else if ($(this).is(':contains("Protection")'))
    //       $pr++;
    //     else if ($(this).is(':contains("Legion")'))
    //       $dl++;
    //     else if ($(this).is(':contains("Chaos")'))
    //       $ch++;
    //     else if ($(this).is(':contains("Technomagic")'))
    //       $t++;
    //     else if ($(this).is(':contains("Perseverance")'))
    //       $tmP++;
    //     else if ($(this).is(':contains("Hope")'))
    //       $tmH++;
    //     else if ($(this).is(':contains("Authority")'))
    //       $tmA++;
    //   });
    //
    //   $tms1 = 0;$tms2 = 0;$tms3 = 0;$tms4 = 0;$tms5 = 0;$tms6 = 0;$tms7 = 0;$tms8 = 0;$tms9 = 0;$tms10 = 0;$tms11 = 0;$tms12 = 0;$tms13 = 0;$tms14 = 0;$tms15 = 0;$tms16 = 0;$tms17 = 0;$tms18 = 0;$tms19 = 0;$tms20 = 0;$tms21 = 0;$tms22 = 0;$tms23 = 0;$tms24 = 0;$tms25 = 0;$tms26 = 0;$tms27 = 0;$tms28 = 0;$tms29 = 0;$tms30 = 0;$tms31 = 0;$tms32 = 0;$tms33 = 0;$tms34 = 0;$tms35 = 0;$tms36 = 0;$tms37 = 0;$tms38 = 0;$tms39 = 0;$tms40 = 0;$tms41 = 0;$tms42 = 0;$tms43 = 0;$tms44 = 0;$tms45 = 0;$tms46 = 0;$tms47 = 0;$tms48 = 0;$tms49 = 0;$tms50 = 0;$tms51 = 0;$tms52 = 0;$tms53 = 0;
    //   $tmsq = $('.tm-prop').find('p').each(function() {
    //     if ($(this).is(':contains("ATK by 35% when there is 1")')) {
    //       $tms1++;
    //       $('#tms1')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("ATK by 35% when there is 1")').length + ')</span>')
    //       $('#tms1').show();
    //     }
    //     else if ($(this).is(':contains("DEF by 45% when there is 1")')) {
    //       $tms2++;
    //       $('#tms2')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("DEF by 45% when there is 1")').length + ')</span>')
    //       $('#tms2').show();
    //     }
    //     else if ($(this).is(':contains("ATK by 35% when there is 3")')) {
    //       $tms3++;
    //       $('#tms3')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("ATK by 35% when there is 3")').length + ')</span>')
    //       $('#tms3').show();
    //     }
    //     else if ($(this).is(':contains("DEF by 45% when there is 3")')) {
    //       $tms4++;
    //       $('#tms4')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("DEF by 45% when there is 3")').length + ')</span>')
    //       $('#tms4').show();
    //     }
    //     else if ($(this).is(':contains("ATK by 50% for 10 sec when HP falls below 30%")')) {
    //       $tms5++;
    //       $('#tms5')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("ATK by 50% for 10 sec when HP falls below 30%")').length + ')</span>')
    //       $('#tms5').show();
    //     }
    //     else if ($(this).is(':contains("25% when HP is above 95%")')) {
    //       $tms6++;
    //       $('#tms6')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("25% when HP is above 95%")').length + ')</span>')
    //       $('#tms6').show();
    //     }
    //     else if ($(this).is(':contains("Increases DMG dealt to enemies by 15% for 10 sec when Mana at 100%")')) {
    //       $tms7++;
    //       $('#tms7')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Increases DMG dealt to enemies by 15% for 10 sec when Mana at 100%")').length + ')</span>')
    //       $('#tms7').show();
    //     }
    //     else if ($(this).is(':contains("Immediately reduces Cooldown of all allies by 3% when Mana is at 100%")')) {
    //       $tms8++;
    //       $('#tms8')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Immediately reduces Cooldown of all allies by 3% when Mana is at 100%")').length + ')</span>')
    //       $('#tms8').show();
    //     }
    //     else if ($(this).is(':contains("Reduces Cooldown of 1st")')) {
    //       $tms9++;
    //       $('#tms9')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Reduces Cooldown of 1st")').length + ')</span>')
    //       $('#tms9').show();
    //     }
    //     else if ($(this).is(':contains("Reduces Cooldown of 2nd")')) {
    //       $tms10++;
    //       $('#tms10')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Reduces Cooldown of 2nd")').length + ')</span>')
    //       $('#tms10').show();
    //     }
    //     else if ($(this).is(':contains("Reduces Cooldown of 3rd")')) {
    //       $tms11++;
    //       $('#tms11')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Reduces Cooldown of 3rd")').length + ')</span>')
    //       $('#tms11').show();
    //     }
    //     else if ($(this).is(':contains("Upon every Skill use, increases ATK by 2%")')) {
    //       $tms12++;
    //       $('#tms12')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Upon every Skill use, increases ATK by 2%")').length + ')</span>')
    //       $('#tms12').show();
    //     }
    //     else if ($(this).is(':contains("Upon every Skill use, takes 3% reduces DMG")')) {
    //       $tms13++;
    //       $('#tms13')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Upon every Skill use, takes 3% reduces DMG")').length + ')</span>')
    //       $('#tms13').show();
    //     }
    //     else if ($(this).is(':contains("increases All Block by 20")')) {
    //       $tms14++;
    //       $('#tms14')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("increases All Block by 20")').length + ')</span>')
    //       $('#tms14').show();
    //     }
    //     else if ($(this).is(':contains("Takes 20% reduces P.DMG")')) {
    //       $tms15++;
    //       $('#tms15')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Takes 20% reduces P.DMG")').length + ')</span>')
    //       $('#tms15').show();
    //     }
    //     else if ($(this).is(':contains("Takes 20% reduces M.DMG")')) {
    //       $tms16++;
    //       $('#tms16')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Takes 20% reduces M.DMG")').length + ')</span>')
    //       $('#tms16').show();
    //     }
    //     else if ($(this).is(':contains("Increases DMG dealt to enemies by 3% every 15 sec")')) {
    //       $tms17++;
    //       $('#tms17')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Increases DMG dealt to enemies by 3% every 15 sec")').length + ')</span>')
    //       $('#tms17').show();
    //     }
    //     else if ($(this).is(':contains("Upon blocking an enemy attack, recovers 200 Mana")')) {
    //       $tms18++;
    //       $('#tms18')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Upon blocking an enemy attack, recovers 200 Mana")').length + ')</span>')
    //       $('#tms18').show();
    //     }
    //     else if ($(this).is(':contains("Upon Skill use, increases Heal Rate by 25% for 5 sec")')) {
    //       $tms19++;
    //       $('#tms19')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Upon Skill use, increases Heal Rate by 25% for 5 sec")').length + ')</span>')
    //       $('#tms19').show();
    //     }
    //     else if ($(this).is(':contains("Increases DMG of [DMG that ignores DEF] by 25%")')) {
    //       $tms20++;
    //       $('#tms20')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Increases DMG of [DMG that ignores DEF] by 25%")').length + ')</span>')
    //       $('#tms20').show();
    //     }
    //     else if ($(this).is(':contains("Increases DMG of [Continuous DMG] by 20%")')) {
    //       $tms21++;
    //       $('#tms21')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Increases DMG of [Continuous DMG] by 20%")').length + ')</span>')
    //       $('#tms21').show();
    //     }
    //     else if ($(this).is(':contains("Upon killing an enemy, increases ATK by 2%")')) {
    //       $tms22++;
    //       $('#tms22')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Upon killing an enemy, increases ATK by 2%")').length + ')</span>')
    //       $('#tms22').show();
    //     }
    //     else if ($(this).is(':contains("At the beginning of each battle, increases ATK by 5%")')) {
    //       $tms23++;
    //       $('#tms23')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("At the beginning of each battle, increases ATK by 5%")').length + ')</span>')
    //       $('#tms23').show();
    //     }
    //     else if ($(this).is(':contains("Increases DEF by 7% per 1 enemy")')) {
    //       $tms24++;
    //       $('#tms24')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Increases DEF by 7% per 1 enemy")').length + ')</span>')
    //       $('#tms24').show();
    //     }
    //     else if ($(this).is(':contains("Increases ATK by 6% per 1 enemy")')) {
    //       $tms25++;
    //       $('#tms25')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Increases ATK by 6% per 1 enemy")').length + ')</span>')
    //       $('#tms25').show();
    //     }
    //     else if ($(this).is(':contains("Increases ATK of all allies by 5%")')) {
    //       $tms26++;
    //       $('#tms26')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Increases ATK of all allies by 5%")').length + ')</span>')
    //       $('#tms26').show();
    //     }
    //     else if ($(this).is(':contains("Increases Crit DMG of all allies by 10%")')) {
    //       $tms27++;
    //       $('#tms27')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Increases Crit DMG of all allies by 10%")').length + ')</span>')
    //       $('#tms27').show();
    //     }
    //     else if ($(this).is(':contains("Increases All DEF of all allies by 7%")')) {
    //       $tms28++;
    //       $('#tms28')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Increases All DEF of all allies by 7%")').length + ')</span>')
    //       $('#tms28').show();
    //     }
    //     else if ($(this).is(':contains("At the beginning of each battle, increases DMG dealt to enemies of the ally with the highest ATK by 2.5% for 200 sec")')) {
    //       $tms29++;
    //       $('#tms29')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("At the beginning of each battle, increases DMG dealt to enemies of the ally with the highest ATK by 2.5% for 200 sec")').length + ')</span>')
    //       $('#tms29').show();
    //     }
    //     else if ($(this).is(':contains("Increases DMG of normal attacks by 25%")')) {
    //       $tms30++;
    //       $('#tms30')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Increases DMG of normal attacks by 25%")').length + ')</span>')
    //       $('#tms30').show();
    //     }
    //     else if ($(this).is(':contains("Increases All Block by 150")')) {
    //       $tms31++;
    //       $('#tms31')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Increases All Block by 150")').length + ')</span>')
    //       $('#tms31').show();
    //     }
    //     else if ($(this).is(':contains("Increases own Shield by 25%")')) {
    //       $tms32++;
    //       $('#tms32')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Increases own Shield by 25%")').length + ')</span>')
    //       $('#tms32').show();
    //     }
    //     else if ($(this).is(':contains("Heals HP equal to 1% of Max HP every sec")')) {
    //       $tms33++;
    //       $('#tms33')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Heals HP equal to 1% of Max HP every sec")').length + ')</span>')
    //       $('#tms33').show();
    //     }
    //     else if ($(this).is(':contains("Recovers own Mana by 500 every 5 sec")')) {
    //       $tms34++;
    //       $('#tms34')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Recovers own Mana by 500 every 5 sec")').length + ')</span>')
    //       $('#tms34').show();
    //     }
    //     else if ($(this).is(':contains("Reduces All DEF by 25% and increases ATK by 50%")')) {
    //       $tms35++;
    //       $('#tms35')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Reduces All DEF by 25% and increases ATK by 50%")').length + ')</span>')
    //       $('#tms35').show();
    //     }
    //     else if ($(this).is(':contains("Reduces ATK by 20% and increases All DEF by 50%")')) {
    //       $tms36++;
    //       $('#tms36')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Reduces ATK by 20% and increases All DEF by 50%")').length + ')</span>')
    //       $('#tms36').show();
    //     }
    //     else if ($(this).is(':contains("inflicted upon self by 15%")')) {
    //       $tms37++;
    //       $('#tms37')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("inflicted upon self by 15%")').length + ')</span>')
    //       $('#tms37').show();
    //     }
    //     else if ($(this).is(':contains("Increases Dodge Chance by 200. Upon dodging an enemy attack, heals HP equal 3% of Max HP")')) {
    //       $tms38++;
    //       $('#tms38')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Increases Dodge Chance by 200. Upon dodging an enemy attack, heals HP equal 3% of Max HP")').length + ')</span>')
    //       $('#tms38').show();
    //     }
    //     else if ($(this).is(':contains("Fixes ATK Spd to 1000 and increases ATK by 40%")')) {
    //       $tms39++;
    //       $('#tms39')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Fixes ATK Spd to 1000 and increases ATK by 40%")').length + ')</span>')
    //       $('#tms39').show();
    //     }
    //     else if ($(this).is(':contains("Increases Crit DMG by 50%")')) {
    //       $tms40++;
    //       $('#tms40')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Increases Crit DMG by 50%")').length + ')</span>')
    //       $('#tms40').show();
    //     }
    //     else if ($(this).is(':contains("Increases ATK Spd by 250")')) {
    //       $tms41++;
    //       $('#tms41')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Increases ATK Spd by 250")').length + ')</span>')
    //       $('#tms41').show();
    //     }
    //     else if ($(this).is(':contains("Increases DEF Penetration by 250")')) {
    //       $tms42++;
    //       $('#tms42')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Increases DEF Penetration by 250")').length + ')</span>')
    //       $('#tms42').show();
    //     }
    //     else if ($(this).is(':contains("Increases Max HP by 25%")')) {
    //       $tms43++;
    //       $('#tms43')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Increases Max HP by 25%")').length + ')</span>')
    //       $('#tms43').show();
    //     }
    //     else if ($(this).is(':contains("Increases All Block by 250")')) {
    //       $tms44++;
    //       $('#tms44')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Increases All Block by 250")').length + ')</span>')
    //       $('#tms44').show();
    //     }
    //     else if ($(this).is(':contains("Increases All DEF by 25%")')) {
    //       $tms45++;
    //       $('#tms45')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Increases All DEF by 25%")').length + ')</span>')
    //       $('#tms45').show();
    //     }
    //     else if ($(this).is(':contains("Increases Crit Chance by 250")')) {
    //       $tms46++;
    //       $('#tms46')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Increases Crit Chance by 250")').length + ')</span>')
    //       $('#tms46').show();
    //     }
    //     else if ($(this).is(':contains("Increases ATK by 25%")')) {
    //       $tms47++;
    //       $('#tms47')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Increases ATK by 25%")').length + ')</span>')
    //       $('#tms47').show();
    //     }
    //     else if ($(this).is(':contains("Soul Weapon Usage Limit +1")')) {
    //       $tms48++;
    //       $('#tms48')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Soul Weapon Usage Limit +1")').length + ')</span>')
    //       $('#tms48').show();
    //     }
    //     else if ($(this).is(':contains("Level of [1st Skill] +7")')) {
    //       $tms49++;
    //       $('#tms49')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Level of [1st Skill] +7")').length + ')</span>')
    //       $('#tms49').show();
    //     }
    //     else if ($(this).is(':contains("Level of [2nd Skill] +7")')) {
    //       $tms50++;
    //       $('#tms50')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Level of [2nd Skill] +7")').length + ')</span>')
    //       $('#tms50').show();
    //     }
    //     else if ($(this).is(':contains("Level of [3rd Skill] +7")')) {
    //       $tms51++;
    //       $('#tms51')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Level of [3rd Skill] +7")').length + ')</span>')
    //       $('#tms51').show();
    //     }
    //     else if ($(this).is(':contains("Level of [4th Skill] +7")')) {
    //       $tms52++;
    //       $('#tms52')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Level of [4th Skill] +7")').length + ')</span>')
    //       $('#tms52').show();
    //     }
    //     else if ($(this).is(':contains("Level of [All Skill] +5")')) {
    //       $tms53++;
    //       $('#tms53')
    //         .find('span').remove().end()
    //         .append('<span> (x' + $('.tm-prop').find('p:contains("Level of [All Skill] +5")').length + ')</span>')
    //       $('#tms53').show();
    //     }
    //   });
    //
    //   $tPDef = $('.t-total .r-stats').find('p').filter(function() {
    //     return $(this).text() === 'P.DEF'
    //   }).next('p');
    //   $tMDef = $('.t-total .r-stats').find('p').filter(function() {
    //     return $(this).text() === 'M.DEF'
    //   }).next('p');
    //   $tCrit = $('.t-total .r-stats').find('p').filter(function() {
    //     return $(this).text() === 'Crit'
    //   }).next('p');
    //   $tHP = $('.t-total .r-stats').find('p').filter(function() {
    //     return $(this).text() === 'MAX HP'
    //   }).next('p');
    //   $tPCritRes = $('.t-total .r-stats').find('p').filter(function() {
    //     return $(this).text() === 'P.Crit Resistance'
    //   }).next('p');
    //   $tMCritRes = $('.t-total .r-stats').find('p').filter(function() {
    //     return $(this).text() === 'M.Crit Resistance'
    //   }).next('p');
    //   $tMPa = $('.t-total .r-stats').find('p').filter(function() {
    //     return $(this).text() === 'MP Recovery/Attack'
    //   }).next('p');
    //   $tCritDMG = $('.t-total .r-stats').find('p').filter(function() {
    //     return $(this).text() === 'Crit DMG'
    //   }).next('p');
    //   $tDebuffACC = $('.t-total .r-stats').find('p').filter(function() {
    //     return $(this).text() === 'Debuff ACC'
    //   }).next('p');
    //   $tPen = $('.t-total .r-stats').find('p').filter(function() {
    //     return $(this).text() === 'Penetration'
    //   }).next('p');
    //   $tACC = $('.t-total .r-stats').find('p').filter(function() {
    //     return $(this).text() === 'ACC'
    //   }).next('p');
    //   $tPDodge = $('.t-total .r-stats').find('p').filter(function() {
    //     return $(this).text() === 'P.Dodge'
    //   }).next('p');
    //   $tMDodge = $('.t-total .r-stats').find('p').filter(function() {
    //     return $(this).text() === 'M.Dodge'
    //   }).next('p');
    //   $tPB = $('.t-total .r-stats').find('p').filter(function() {
    //     return $(this).text() === 'P.Block'
    //   }).next('p');
    //   $tMB = $('.t-total .r-stats').find('p').filter(function() {
    //     return $(this).text() === 'M.Block'
    //   }).next('p');
    //   $tPBD = $('.t-total .r-stats').find('p').filter(function() {
    //     return $(this).text() === 'P.Block DEF'
    //   }).next('p');
    //   $tMBD = $('.t-total .r-stats').find('p').filter(function() {
    //     return $(this).text() === 'M.Block DEF'
    //   }).next('p');
    //   $tPT = $('.t-total .r-stats').find('p').filter(function() {
    //     return $(this).text() === 'P.Tough'
    //   }).next('p');
    //   $tMT = $('.t-total .r-stats').find('p').filter(function() {
    //     return $(this).text() === 'M.Tough'
    //   }).next('p');
    //   $tRec = $('.t-total .r-stats').find('p').filter(function() {
    //     return $(this).text() === 'Recovery'
    //   }).next('p');
    //   $tCC = $('.t-total .r-stats').find('p').filter(function() {
    //     return $(this).text() === 'CC Resist'
    //   }).next('p');
    //   $tLife = $('.t-total .r-stats').find('p').filter(function() {
    //     return $(this).text() === 'Lifesteal'
    //   }).next('p');
    //   $tASpd = $('.t-total .r-stats').find('p').filter(function() {
    //     return $(this).text() === 'ATK Spd'
    //   }).next('p');
    //   $tMPs = $('.t-total .r-stats').find('p').filter(function() {
    //     return $(this).text() === 'MP Recovery/Sec'
    //   }).next('p');
    //   $tManaRec = $('.t-total .r-stats').find('p').filter(function() {
    //     return $(this).text() === 'Mana Recovery upon taking DMG'
    //   }).next('p');
    //
    //   $stCrit = $('p[name="Crit"]').text();
    //   if ($stCrit === '')
    //     $stCrit = 0;
    //   $sumCrit = parseInt($statCrit.text()) + parseInt($stCrit);
    //   if (($f > 1) && ($f < 4)) {
    //     $tCrit.text($sumCrit + 100 + ' (' + $statCrit.text() + '+' + (parseInt($stCrit) + 100) + ')');
    //     $setBonus.find('#f1').show();
    //   } else if ($f == 4) {
    //     $tCrit.text($sumCrit + 230 + ' (' + $statCrit.text() + '+' + (parseInt($stCrit) + 230) + ')');
    //     $setBonus.find('#f1, #f2').show();
    //   } else
    //     $tCrit.text($sumCrit + ' (' + $statCrit.text() + '+' + ($sumCrit - $statCrit.text()) + ')');
    //
    //   $stHP = $('p[name="Max HP"]').text();
    //   if ($stHP === '')
    //     $stHP = 0;
    //   $('#calc_gear_treasure').children('option:selected').val() !== '- - - - - - - - - -' ? $trhp = parseInt($('#heroTR').text()) : $trhp = 0;
    //   $('#calc_gear_jewelry').children().children('option:selected').parent().attr('label') == 'Ring' ? $jhp = parseInt($('#heroJ').text()) : $jhp = 0;
    //   $ohp = $('#heroO').text();
    //   if ($('#heroO').text() == '')
    //     $ohp = 0;
    //   $sumHP = parseInt($statHP.text()) + parseInt($trhp) + parseInt($jhp) + parseInt($ohp) + parseInt($('#range-hp').text());
    //   if (($fr > 1) && ($fr < 4)) {
    //     $qe = parseInt(Math.round($sumHP * (1.1 + $stHP/100)));
    //     $tHP.text($qe + ' (' + $statHP.text() + '+' + ($qe - $statHP.text()) + ')');
    //     $setBonus.find('#fr1').show();
    //   } else if ($fr == 4) {
    //     $qe = parseInt(Math.round($sumHP * (1.23 + $stHP/100)));
    //     $tHP.text($qe + ' (' + $statHP.text() + '+' + ($qe - $statHP.text()) + ')');
    //     $setBonus.find('#fr1, #fr2').show();
    //   } else {
    //     $qe = parseInt(Math.round($sumHP * (1 + $stHP/100)));
    //     $tHP.text($qe + ' (' + $statHP.text() + '+' + ($qe - $statHP.text()) + ')');
    //   }
    //
    //   $stCR = $('p[name="Crit Resistance"]').text();
    //   if ($stCR === '')
    //     $stCR = 0;
    //   $stPCR = $('p[name="P.Crit Resistance"]').text();
    //   if ($stPCR === '')
    //     $stPCR = 0;
    //   $sumPCR = parseInt($statCritResP.text()) + parseInt($stPCR) + parseInt($stCR);
    //   $stMCR = $('p[name="M.Crit Resistance"]').text();
    //   if ($stMCR === '')
    //     $stMCR = 0;
    //   $sumMCR = parseInt($statCritResM.text()) + parseInt($stMCR) + parseInt($stCR);
    //   if (($p > 1) && ($p < 4)) {
    //     $tPCritRes.text($sumPCR + 100 + ' (' + $statCritResP.text() + '+' + parseInt($sumPCR + 100) + ')');
    //     $tMCritRes.text($sumMCR + 100 + ' (' + $statCritResM.text() + '+' + parseInt($sumMCR + 100) + ')');
    //     $setBonus.find('#p1').show();
    //   } else if ($p == 4) {
    //     $tPCritRes.text($sumPCR + 230 + ' (' + $statCritResP.text() + '+' + parseInt($sumPCR + 230) + ')');
    //     $tMCritRes.text($sumMCR + 230 + ' (' + $statCritResM.text() + '+' + parseInt($sumMCR + 230) + ')');
    //     $setBonus.find('#p1, #p2').show();
    //   } else {
    //     $tPCritRes.text($sumPCR + ' (' + $statCritResP.text() + '+' + ($sumPCR - $statCritResP.text()) + ')');
    //     $tMCritRes.text($sumMCR + ' (' + $statCritResM.text() + '+' + ($sumMCR - $statCritResM.text()) + ')');
    //   }
    //
    //   $stDef = $('p[name="DEF"]').text();
    //   if ($stDef === '')
    //     $stDef = 0;
    //   $stPDef = $('p[name="P.DEF"]').text();
    //   if ($stPDef === '')
    //     $stPDef = 0;
    //   $apd = parseInt($('#heroPDEF').text());
    //   if ($('#heroPDEF').text() === '')
    //     $apd = 0;
    //   $('#calc_gear_jewelry').children().children('option:selected').parent().attr('label') == 'Bracelet' ? $jpd = parseInt($('#heroJ').text()) : $jpd = 0;
    //   $qPD = parseInt(Math.round((parseInt($statPDef.text()) + $apd + $jpd) * (1 + (parseInt($stPDef) + parseInt($stDef))/100)));
    //   $stMDef = $('p[name="M.DEF"]').text();
    //   if ($stMDef === '')
    //     $stMDef = 0;
    //   $amd = parseInt($('#heroMDEF').text());
    //   if ($('#heroMDEF').text() === '')
    //     $amd = 0;
    //   $('#calc_gear_jewelry').children().children('option:selected').parent().attr('label') == 'Necklace' ? $jmd = parseInt($('#heroJ').text()) : $jmd = 0;
    //   $qMD = parseInt(Math.round((parseInt($statMDef.text()) + $amd + $jmd) * (1 + (parseInt($stMDef) + parseInt($stDef))/100)));
    //   $tPDef.text($qPD + ' (' + $statPDef.text() + '+' + ($qPD - parseInt($statPDef.text())) + ')');
    //   $tMDef.text($qMD + ' (' + $statMDef.text() + '+' + ($qMD - parseInt($statMDef.text())) + ')');
    //
    //   $stMPa = $('p[name="MP Recovery/Attack"]').text();
    //   if ($stMPa === '')
    //     $stMPa = 0;
    //   $sumMPa = parseInt($statMPa.text()) + parseInt($stMPa);
    //   if (($d > 1) && ($d < 4)) {
    //     $tMPa.text($sumMPa + 200 + ' (' + $statMPa.text() + '+' + (parseInt($stMPa) + 200) + ')');
    //     $setBonus.find('#d1').show();
    //   } else if ($d == 4) {
    //     $tMPa.text($sumMPa + 460 + ' (' + $statMPa.text() + '+' + (parseInt($stMPa) + 460) + ')');
    //     $setBonus.find('#d1, #d2').show();
    //   } else
    //     $tMPa.text($sumMPa + ' (' + $statMPa.text() + '+' + ($sumMPa - $statMPa.text()) + ')');
    //
    //   $stCritD = $('p[name="Crit DMG"]').text();
    //   if ($stCritD === '')
    //     $stCritD = 0;
    //   $sumCritD = parseInt($statCritD.text()) + parseInt($stCritD);
    //   if (($la > 1) && ($la < 4)) {
    //     $tCritDMG.text($sumCritD + 20 + '% (' + $statCritD.text() + '%+' + (parseInt($stCritD) + 20) + '%)');
    //     $setBonus.find('#la1').show();
    //   } else if ($la == 4) {
    //     $tCritDMG.text($sumCritD + 46 + '% (' + $statCritD.text() + '%+' + (parseInt($stCritD) + 46) + '%)');
    //     $setBonus.find('#la1, #la2').show();
    //   } else
    //     $tCritDMG.text($sumCritD + '%' + ' (' + $statCritD.text() + '%+' + ($sumCritD - $statCritD.text()) + '%)');
    //
    //   $stDebuff = $('p[name="Debuff ACC"]').text();
    //   if ($stDebuff === '')
    //     $stDebuff = 0;
    //   $sumDebuff = parseInt($statDebuff.text()) + parseInt($stDebuff);
    //   if (($le > 1) && ($le < 4)) {
    //     $tDebuffACC.text($sumDebuff + 100 + ' (' + $statDebuff.text() + '+' + parseInt($sumDebuff + 100) + ')');
    //     $setBonus.find('#le1').show();
    //   } else if ($le == 4) {
    //     $tDebuffACC.text($sumDebuff + 230 + ' (' + $statDebuff.text() + '+' + parseInt($sumDebuff + 230) + ')');
    //     $setBonus.find('#le1, #le2').show();
    //   } else
    //     $tDebuffACC.text($sumDebuff + ' (' + $statDebuff.text() + '+' + ($sumDebuff - $statDebuff.text()) + ')');
    //
    //   $stPen = $('p[name="Penetration"]').text();
    //   if ($stPen === '')
    //     $stPen = 0;
    //   $sumPen = parseInt($statPen.text()) + parseInt($stPen);
    //   $tPen.text($sumPen + ' (' + $statPen.text() + '+' + ($sumPen - $statPen.text()) + ')');
    //
    //   $stLife = $('p[name="Lifesteal"]').text();
    //   if ($stLife === '')
    //     $stLife = 0;
    //   $sumLife = parseInt($statLife.text()) + parseInt($stLife);
    //   $tLife.text($sumLife + ' (' + $statLife.text() + '+' + ($sumLife - $statLife.text()) + ')');
    //
    //   $stASpd = $('p[name="ATK Spd"]').text();
    //   if ($stASpd === '')
    //     $stASpd = 0;
    //   $sumASpd = parseInt($statASpd.text()) + parseInt($stASpd);
    //   $tASpd.text($sumASpd + ' (' + $statASpd.text() + '+' + ($sumASpd - $statASpd.text()) + ')');
    //
    //   $stACC = $('p[name="ACC"]').text();
    //   if ($stACC === '')
    //     $stACC = 0;
    //   $sumACC = parseInt($statACC.text()) + parseInt($stACC);
    //   $tACC.text($sumACC + ' (' + $statACC.text() + '+' + ($sumACC - $statACC.text()) + ')');
    //
    //   $stCC = $('p[name="CC Resist"]').text();
    //   if ($stCC === '')
    //     $stCC = 0;
    //   $sumCC = parseInt($statCC.text()) + parseInt($stCC);
    //   $tCC.text($sumCC + ' (' + $statCC.text() + '+' + ($sumCC - $statCC.text()) + ')');
    //
    //   $stRec = $('p[name="Recovery"]').text();
    //   if ($stRec === '')
    //     $stRec = 0;
    //   $sumRec = parseInt($statRec.text()) + parseInt($stRec);
    //   $tRec.text($sumRec + '%' + ' (' + $statRec.text() + '%+' + ($sumRec - $statRec.text()) + '%)');
    //
    //   $stMPs = $('p[name="MP Recovery/Sec"]').text();
    //   if ($stMPs === '')
    //     $stMPs = 0;
    //   $sumMPs = parseInt($statMPs.text()) + parseInt($stMPs);
    //   $tMPs.text($sumMPs + ' (' + $statMPs.text() + '+' + ($sumMPs - $statMPs.text()) + ')');
    //
    //   $stDodge = $('p[name="Dodge"]').text();
    //   if ($stDodge === '')
    //     $stDodge = 0;
    //   $stPDodge = $('p[name="P.Dodge"]').text();
    //   if ($stPDodge === '')
    //     $stPDodge = 0;
    //   $sumPDodge = parseInt($statPD.text()) + parseInt($stPDodge) + parseInt($stDodge);
    //   $stMDodge = $('p[name="M.Dodge"]').text();
    //   if ($stMDodge === '')
    //     $stMDodge = 0;
    //   $sumMDodge = parseInt($statMD.text()) + parseInt($stMDodge) + parseInt($stDodge);
    //   $tPDodge.text($sumPDodge + ' (' + $statPD.text() + '+' + ($sumPDodge - $statPD.text()) + ')');
    //   $tMDodge.text($sumMDodge + ' (' + $statMD.text() + '+' + ($sumMDodge - $statMD.text()) + ')');
    //
    //   $stB = $('p[name="Block"]').text();
    //   if ($stB === '')
    //     $stB = 0;
    //   $stPB = $('p[name="P.Block"]').text();
    //   if ($stPB === '')
    //     $stPB = 0;
    //   $sumPB = parseInt($statPB.text()) + parseInt($stPB) + parseInt($stB);
    //   $stMB = $('p[name="M.Block"]').text();
    //   if ($stMB === '')
    //     $stMB = 0;
    //   $sumMB = parseInt($statMB.text()) + parseInt($stMB) + parseInt($stB);
    //   $tPB.text($sumPB + ' (' + $statPB.text() + '+' + ($sumPB - $statPB.text()) + ')');
    //   $tMB.text($sumMB + ' (' + $statMB.text() + '+' + ($sumMB - $statMB.text()) + ')');
    //
    //   $stBD = $('p[name="Block DEF"]').text();
    //   if ($stBD === '')
    //     $stBD = 0;
    //   $stPBD = $('p[name="P.Block DEF"]').text();
    //   if ($stPBD === '')
    //     $stPBD = 0;
    //   $sumPBD = parseInt($statPBD.text()) + parseInt($stPBD) + parseInt($stBD);
    //   $stMBD = $('p[name="M.Block DEF"]').text();
    //   if ($stMBD === '')
    //     $stMBD = 0;
    //   $sumMBD = parseInt($statMBD.text()) + parseInt($stMBD) + parseInt($stBD);
    //   $tPBD.text($sumPBD + ' (' + $statPBD.text() + '+' + ($sumPBD - $statPBD.text()) + ')');
    //   $tMBD.text($sumMBD + ' (' + $statMBD.text() + '+' + ($sumMBD - $statMBD.text()) + ')');
    //
    //   $stT = $('p[name="Tough"]').text();
    //   if ($stT === '')
    //     $stT = 0;
    //   $stPT = $('p[name="P.Tough"]').text();
    //   if ($stPT === '')
    //     $stPT = 0;
    //   $sumPT = parseInt($statPT.text()) + parseInt($stPT) + parseInt($stT);
    //   $stMT = $('p[name="M.Tough"]').text();
    //   if ($stMT === '')
    //     $stMT = 0;
    //   $sumMT = parseInt($statMT.text()) + parseInt($stMT) + parseInt($stT);
    //   $tPT.text($sumPT + ' (' + $statPT.text() + '+' + ($sumPT - $statPT.text()) + ')');
    //   $tMT.text($sumMT + ' (' + $statMT.text() + '+' + ($sumMT - $statMT.text()) + ')');
    //
    //   if (($s > 1) && ($s < 4))
    //     $setBonus.find('#s1').show();
    //   else if ($s == 4)
    //     $setBonus.find('#s1, #s2').show();
    //
    //   if (($pr > 1) && ($pr < 4))
    //     $setBonus.find('#pr1').show();
    //   else if ($pr == 4)
    //     $setBonus.find('#pr1, #pr2').show();
    //
    //   if (($dl > 1) && ($dl < 4))
    //     $setBonus.find('#dl1').show();
    //   else if ($dl == 4)
    //     $setBonus.find('#dl1, #dl2').show();
    //
    //   if (($ch > 1) && ($ch < 4))
    //     $setBonus.find('#ch1').show();
    //   else if ($ch == 4)
    //     $setBonus.find('#ch1, #ch2').show();
    //
    //   if (($t > 1) && ($t < 4))
    //     $setBonus.find('#t1').show();
    //   else if ($t == 4)
    //     $setBonus.find('#t1, #t2').show();
    //
    //   if ($tmP == 4)
    //     $setBonus.find('#per' + $heroClass).show();
    //   if ($tmH == 4)
    //     $setBonus.find('#hop' + $heroClass).show();
    //   if ($tmA == 4)
    //     $setBonus.find('#aut' + $heroClass).show();
    //
    //   statSplit();
    // };

    function perkTP() {
      let perkPoints = 0;
      $('.hero-img .hero-' + heroId).find('.c-p').each(function() {
        perkTier = $(this).attr('id');
        if (perkTier == 'perk-t1')
          $(this).find('.pick').each(function() { perkPoints += 10 })
        else
          $(this).find('.pick').each(function() { perkPoints += 15 });
      });
      return perkPoints;
    };
    $('.heroPerk .c-sub .c-perk img').click(function() {
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
    function hideGearImage() {
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
    };
    $('#calc_role_id, #calc_char_id').change(function() {
      hideGearImage();
    });
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
    // function option() {
    //   $sAtk=0;$sAspd=0;$sCr=0;$sCrD=0;$sMPa=0;$sMPs=0;$sPen=0;$sLif=0;$sAcc=0;$sDAcc=0;$sHP=0;$sCC=0;$sBl=0;$sPBl=0;$sMBl=0;$sCR=0;$sPCR=0;$sMCR=0;$sDef=0;$sPDef=0;$sMDef=0;$sDod=0;$sPDod=0;$sMDod=0;$sTgh=0;$sPTgh=0;$sMTgh=0;$sRec=0;$sMRec=0;$sDRB=0;$sDRPB=0;$sDRMB=0;
    //   var x = 0;
    //   var y = 0;
    //   $('.t-op p').empty();
    //   $opN = $('.opt .ax').serializeArray();
    //   $.each($opN, function(iN, n) {
    //     $opV = $('.opt .ay').serializeArray()[iN];
    //     $('.totalStat').find('p[name="' + n.value + '"]').text() == '' ? $('.totalStat').find('p[name="' + n.value + '"]').text(parseFloat($opV.value)) : $('.totalStat').find('p[name="' + n.value + '"]').text(parseFloat($opV.value) + parseFloat($('.totalStat').find('p[name="' + n.value + '"]').text()));
    //     if (n.value == 'Resistance') {
    //       $sTgh += Number(parseFloat($opV.value));
    //       $('.totalStat').find('p[name="Tough"]').text($sTgh);
    //     } else if (n.value == 'P.Resistance') {
    //       $sPTgh += Number(parseFloat($opV.value));
    //       $('.totalStat').find('p[name="P.Tough"]').text($sPTgh);
    //     } else if (n.value == 'M.Resistance') {
    //       $sMTgh += Number(parseFloat($opV.value));
    //       $('.totalStat').find('p[name="M.Tough"]').text($sMTgh);
    //     } else if (n.value == 'DMG Reduction upon Block') {
    //       $sDRB += Number(parseFloat($opV.value));
    //       $('.totalStat').find('p[name="Block DEF"]').text($sDRB);
    //     } else if (n.value == 'DMG Reduction upon P.Block') {
    //       $sDRPB += Number(parseFloat($opV.value));
    //       $('.totalStat').find('p[name="P.Block DEF"]').text($sDRPB);
    //     } else if (n.value == 'DMG Reduction upon M.Block') {
    //       $sDRMB += Number(parseFloat($opV.value));
    //       $('.totalStat').find('p[name="M.Block DEF"]').text($sDRMB);
    //     }
    //   });
    //   $enhN = $('.enh-n').serializeArray();
    //   $.each($enhN, function(iN, n) {
    //     $enhV = $('.enh-v').serializeArray()[iN];
    //     $('.totalStat').find('p[name="' + n.value + '"]').text() == '' ? $('.totalStat').find('p[name="' + n.value + '"]').text(parseFloat($enhV.value)) : $('.totalStat').find('p[name="' + n.value + '"]').text(parseFloat($enhV.value) + parseFloat($('.totalStat').find('p[name="' + n.value + '"]').text()));
    //     if (n.value == 'P.Resistance') {
    //       $sPTgh += Number(parseFloat($enhV.value));
    //       $('.totalStat').find('p[name="P.Tough"]').text($sPTgh);
    //     } else if (n.value == 'M.Resistance') {
    //       $sMTgh += Number(parseFloat($enhV.value));
    //       $('.totalStat').find('p[name="M.Tough"]').text($sMTgh);
    //     } else if (n.value == 'DMG Reduction upon P.Block') {
    //       $sDRPB += Number(parseFloat($enhV.value));
    //       $('.totalStat').find('p[name="P.Block DEF"]').text($sDRPB);
    //     } else if (n.value == 'DMG Reduction upon M.Block') {
    //       $sDRMB += Number(parseFloat($enhV.value));
    //       $('.totalStat').find('p[name="M.Block DEF"]').text($sDRMB);
    //     }
    //   });
    //   $tmN = $('.opt .ax-tm').serializeArray();
    //   $.each($tmN, function(iN, n) {
    //     $tmV = $('.opt .ay-tm').serializeArray()[iN];
    //     $('.totalStat').find('p[name="' + n.value + '"]').text() == '' ? $('.totalStat').find('p[name="' + n.value + '"]').text(parseFloat($tmV.value)) : $('.totalStat').find('p[name="' + n.value + '"]').text(parseFloat($tmV.value) + parseFloat($('.totalStat').find('p[name="' + n.value + '"]').text()));
    //   });
    //   $runN = $('.opt .ax-r').serializeArray();
    //   $.each($runN, function(iN, n) {
    //     $runV = $('.opt .ay-r').serializeArray()[iN];
    //     x = parseFloat($runV.value.split(' / ').shift());
    //     y = parseFloat($runV.value.split(' / ').pop());
    //     if ($('[name="' + n.name + '"]').children('option:selected').attr('class') == 'all') {
    //       $('.totalStat').find('p[name="' + n.value.split(' / ').shift() + '"]').text() == '' ? $('.totalStat').find('p[name="' + n.value.split(' / ').shift() + '"]').text(x) : $('.totalStat').find('p[name="' + n.value.split(' / ').shift() + '"]').text(x + parseFloat($('.totalStat').find('p[name="' + n.value.split(' / ').shift() + '"]').text()));
    //       $('.totalStat').find('p[name="' + n.value.split(' / ').pop() + '"]').text() == '' ? $('.totalStat').find('p[name="' + n.value.split(' / ').pop() + '"]').text(y) : $('.totalStat').find('p[name="' + n.value.split(' / ').pop() + '"]').text(y + parseFloat($('.totalStat').find('p[name="' + n.value.split(' / ').pop() + '"]').text()));
    //     } else
    //       $('.totalStat').find('p[name="' + n.value + '"]').text() == '' ? $('.totalStat').find('p[name="' + n.value + '"]').text(parseFloat($runV.value)) : $('.totalStat').find('p[name="' + n.value + '"]').text(parseFloat($runV.value) + parseFloat($('.totalStat').find('p[name="' + n.value + '"]').text()));
    //     if (n.value == 'MP Recovery/DMG') {
    //       $sMRec += Number(parseFloat($runV.value));
    //       $('.totalStat').find('p[name="Mana Recovery upon taking DMG"]').text($sMRec);
    //     }
    //   });
    // };
    $('.rating label').click(function() {
      let g = $(this).parents().eq(2).attr('id');
      g == 'weapon' ? starGearWeapon() : starGears(g);

      // option();
      gearStats(g);
      // gearSet();
    });
    (function rangeSlider() {
      $('.range').each(function() {
        $('[name="range"], [name="add-atk"], [name="add-hp"]').on('input', () => swStat());
      });
    }).call(this);
    $('[name="range"], [name="add-atk"], [name="add-hp"]').change(function() {
      // gearStat();
      // gearSet();
    });
    function swStat() {
      let x = $('[name="range"]').val(),
          y = $('[name="add-atk"]').val(),
          z = $('[name="add-hp"]').val(),
          xDef = (100 - x),
          sw_atk = 0,
          sw_hp = 0;
      (xDef % 2 == 1) || (xDef % 2 == 0) ? xDef = xDef.toFixed(0) : xDef = xDef.toFixed(1);
      $('.range-ou1').html(x + '%');
      $('.range-ou2').html(xDef + '%');
      if (advancementPhase !== '-') {
        sw_atk = parseFloat(HeroStat[heroClass]['swATK']) * GearStat.swMultiplier[etherEnhancement] * (2 ** advancementPhase) * (x / 100) * 2;
        sw_hp = parseFloat(HeroStat[heroClass]['swHP']) * GearStat.swMultiplier[etherEnhancement] * (2 ** advancementPhase) * ((100 - x) / 100) * 2;
      };
      $('.range-ad1').html(y + '%');
      $('.range-ad2').html(z + '%');
      y > 0 ? $('#range-atk').html(Math.round(sw_atk + Math.trunc(sw_atk * (y / 100)))) : $('#range-atk').html(Math.round(sw_atk));
      z > 0 ? $('#range-hp').html(Math.round(sw_hp + Math.trunc(sw_hp * (z / 100)))) : $('#range-hp').html(Math.round(sw_hp));
    };
    function rangeC() {
      $('.range-ou1, .range-ou2').text('50%');
      $('[name="range"]').val(50);
      $('.range-ad1, .range-ad2').text('0%');
      $('[name="add-atk"], [name="add-hp"]').val(0);
    };
    function statSplit() {
      $('.t-total').find('#s-val').each(function() {
        let statSplit = $(this).text().split('(').pop().slice(0, -1).split('+').pop();
        if (statSplit == '0%' || statSplit == '0')
          $(this).html($(this).text().split(' ').shift());
        else if ($(this).is(':contains("(")') == true)
          // $(this).html('<span id="plsSt1">' + $(this).text().split(' ').shift() + '</span>' + ' (' + $(this).text().split('(').pop().slice(0, -1).split('+').shift() + '<span id="plsSt2">' + '+' + $(this).text().split('(').pop().slice(0, -1).split('+').pop() + '</span>' + ')');
          $(this).html(`<span id="plsSt1">${$(this).text().split(' ').shift()}</span> (${$(this).text().split('(').pop().slice(0, -1).split('+').shift()}<span id="plsSt2">+${$(this).text().split('(').pop().slice(0, -1).split('+').pop()}</span>)`);
      });
      $('.t-total .r-stats').find('#s-val').each(function() {
        let softLock,
            softCap = $(this).prev().text(),
            zeroStat = $(this);
        zeroStat.text() === '0' || zeroStat.text() === '0%' ? $(this).parent().hide().children().hide() : $(this).parent().show().children().show();
        $(this).find('#plsSt1').text() === '' ? softLock = zeroStat.text() : softLock = $(this).find('#plsSt1').text();
        switch (softCap) {
          case 'Crit' | 'ACC':
            softLock > 1500 ? $(this).next('#s-per').text((1500 + (softLock - 1500)*0.5)/10 + '%') : $(this).next('#s-per').text(softLock/10 + '%');
            break;
          case 'P.Block' | 'M.Block' | 'P.Dodge' | 'M.Dodge' | 'Lifesteal' | 'P.Crit Resistance' | 'M.Crit Resistance':
            softLock > 500 ? $(this).next('#s-per').text((500 + (softLock - 500)*0.5)/10 + '%') : $(this).next('#s-per').text(softLock/10 + '%');
            break;
          case 'CC Resist':
            softLock > 1000 ? $(this).next('#s-per').text((1000 + (softLock - 1000)*0.5)/10 + '%') : $(this).next('#s-per').text(softLock/10 + '%');
            break;
          case 'Penetration' | 'P.Tough' | 'M.Tough':
            softLock > 450 ? $(this).next('#s-per').text(((450 + (softLock - 450)*0.409)/10).toFixed(1) + '%') : $(this).next('#s-per').text(softLock/10 + '%');
            break;
          case 'ATK Spd':
            softLock > 1600 ? $(this).next('#s-per').text((1600 + (softLock - 1600)*0.5)/10 + '%') : $(this).next('#s-per').text(softLock/10 + '%');
            break;
          case 'P.Block DEF' | 'M.Block DEF':
            softLock > 225 ? $(this).next('#s-per').text((225 + (softLock - 225)*0.2)/10 + '%') : $(this).next('#s-per').text(softLock/10 + '%');
            break;
          case 'MP Recovery/Attack':
            softLock > 1600 ? $(this).next('#s-per').text((1600 + (softLock - 1600)*0.5)/10 + '%') : $(this).next('#s-per').text(softLock/10 + '%');
            break;
          case 'Crit DMG' | 'Recovery':
            $(this).next('#s-per').text('').css('order', 0);
            break;
          default:
            $(this).next('#s-per').text(softLock/10 + '%');
        };
      });
    };
    // statSplit();
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
    // $('#calc_role_id, #calc_char_id, #calc_gear_weapon, #calc_gear_treasure, #calc_gear_armor, #calc_gear_secondary, #calc_gear_jewelry, #calc_gear_orb, #calc_st_weapon, #calc_st_weapon_st, .ax, .ay, .enh-t, .enh-n, .enh-v, .ax-tm, .ay-tm, .ax-r, .ay-r').change(function() {
    //   option();
    //   gearStat();
    //   gearSet();
    // });
  });
}).call(this);
