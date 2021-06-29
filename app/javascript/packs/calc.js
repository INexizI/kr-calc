(function() {
  $(document).on("turbolinks:load", function() {
    $('#genLink').click(function() {
      disableGenerateButton();
    });
    $('#btn-load').click(function(e) {
      e.preventDefault();
      disableGenerateButton();
      var shr = $('#share_link').val().toString();
      if (shr.slice(0, 46) == "https://krsharelink.herokuapp.com/api/v1/links") {  /* --- KRCalc API ---  */
        $.get(shr)
          .done(function(data) {
            var decData = function(shr, key) {
              var C = CryptoJS;
              var Key = C.enc.Utf8.parse("6il7YCRSqIOB9NooY225lPKQ0KuAF/nkFX6cY3vJkS0=");
              var IV = C.enc.Utf8.parse("br2fg9b3e7fb12q");
              var dcT = C.AES.decrypt(data.text, Key, {
                iv: IV,
                mode: C.mode.CBC,
                padding: C.pad.Pkcs7
              });
              return JSON.parse(dcT.toString(CryptoJS.enc.Utf8));
            };
            $(decData(shr)).each(function(i, n) {
              var x = this.name;
              var y = this.value;
              $('[name="' + x + '"]').children('[value="' + y + '"]').prop('selected', true);
              if (x == 'calc[role_id]') {
                $role = $('#calc_role_id :selected').text();
                $escaped_role = $role.replace(/([ #;&,.+*~\':"!^$[\]()=>|\/@])/g, '\\$1');
                $options = $($chars).filter("optgroup[label='" + $escaped_role + "']").html();
                if ($options) {
                  $('#calc_char_id').html($options);
                  return [
                    $('#char').show(),
                    $('#calc_char_id').parent().show(),
                    $('#calc_gear_weapon').parent().show(),
                    $('#calc_gear_treasure').parent().show(),
                    $('#calc_gear_armor').parent().show(),
                    $('#calc_gear_secondary').parent().show(),
                    $('#calc_gear_jewelry').parent().show(),
                    $('#calc_gear_orb').parent().show(),
                    $('#calc_gear_artifact').parent().show(),
                    $('.form-input div select').show(),
                    $('select').not('#calc_role_id').prop('selectedIndex', 0),
                    change_role()
                  ]
                }
              }
              if (x == 'calc[char_id]')
                change_char();
              if (x == 'calc[gear_weapon]')
                change_weapon();
              if (x == 'calc[st_weapon]')
                change_sw_adv();
              if (x == 'calc[st_weapon_st]')
                change_sw_eth();
              if (x == 'calc[gear_armor]')
                change_armor();
              if (x == 'calc[gear_secondary]')
                change_secondary();
              if (x == 'calc[gear_treasure]')
                change_treasure();
              if ((x == 'calc[gear_jewelry]') && (y !== '- - - - - - - - - -')) {
                $('[name="' + x + '"]').children('optgroup[label=' + $jewelType + ']').children('[value="' + y + '"]').prop('selected', true);
                $jewelSet = y;
                change_jewerly();
              } else if ((x == 'calc[gear_jewelry]') && (y == '- - - - - - - - - -')) {
                $jewelSet = y;
                change_jewerly();
              }
              if (x == 'calc[gear_orb]')
                change_orb();
              if (x == 'calc[gear_artifact]')
                change_art();
              if ((x == 'range') || (x == 'add-atk') || (x == 'add-hp')) {
                $('[name="' + x + '"]').prop('value', y);
                swStat();
                gearStat();
                gearSet();
              }
              if (x.slice(0, -3) + ']' == 'calc[treasure]') {
                $statName = $('[name="' + x + '"]');
                $('#treasure .opt').find($statName).each(function() {
                  $(this).parent().next().children().find('option').not('.q').hide();
                  $stTr = $(this).children('option:selected').text();
                  if (($stTr == 'ATK') || ($stTr == 'Max HP') || ($stTr == 'DEF')) {
                    $(this).parent().next().children().find('.q1').show();
                    $tr = 'q1'
                  } else if (($stTr == 'MP Recovery/Sec') || ($stTr == 'Mana Recovery upon taking DMG')) {
                    $(this).parent().next().children().find('.q2').show();
                    $tr = 'q2'
                  } else if (($stTr == 'Crit DMG') || ($stTr == 'P.DEF') || ($stTr == 'M.DEF') || ($stTr == 'Recovery')) {
                    $(this).parent().next().children().find('.q3').show();
                    $tr = 'q3'
                  } else if (($stTr == 'ATK Spd') || ($stTr == 'Crit') || ($stTr == 'Lifesteal') || ($stTr == 'ACC') || ($stTr == 'Debuff ACC') || ($stTr == 'CC Resist') || ($stTr == 'Block') || ($stTr == 'Crit Resistance') || ($stTr == 'P.Dodge') || ($stTr == 'M.Dodge') || ($stTr == 'P.Tough') || ($stTr == 'M.Tough') || ($stTr == 'P.Resistance') || ($stTr == 'M.Resistance') || ($stTr == 'DMG Reduction upon P.Block') || ($stTr == 'DMG Reduction upon M.Block') || ($stTr == 'P.Block DEF') || ($stTr == 'M.Block DEF') || ($stTr == 'Penetration')) {
                    $(this).parent().next().children().find('.q4').show();
                    $tr = 'q4'
                  } else if (($stTr == 'MP Recovery/Attack') || ($stTr == 'P.Block') || ($stTr == 'M.Block') || ($stTr == 'P.Crit Resistance') || ($stTr == 'M.Crit Resistance')) {
                    $(this).parent().next().children().find('.q5').show();
                    $tr = 'q5'
                  } else if (($stTr == 'Dodge') || ($stTr == 'Tough') || ($stTr == 'Resistance') || ($stTr == 'DMG Reduction upon Block')) {
                    $(this).parent().next().children().find('.q6').show();
                    $tr = 'q6'
                  } else
                    $(this).parent().next().children().find('.q').show();
                });
                $('#treasure #g-treasure').each(function(i, n) {
                  $trOptf = $('#a' + i + ' .ax').children('option:selected').val();
                  $trOpts = $('#b' + i + ' .ax').children('option:selected').val();
                  $(this).find('.ax').children().removeAttr('disabled');
                  if ($trOptf !== '')
                    $(this).find('#b' + i + ' .ax').children('[value="' + $trOptf + '"]').attr('disabled', 'disabled');
                  if ($trOpts !== '')
                    $(this).find('#a' + i + ' .ax').children('[value="' + $trOpts + '"]').attr('disabled', 'disabled');
                });
              }
              if ((x.slice(0, -3) + ']' == 'calc[armor]') || (x.slice(0, -3) + ']' == 'calc[secondary]') || (x.slice(0, -3) + ']' == 'calc[jewerly]') || (x.slice(0, -3) + ']' == 'calc[orb]')) {
                $statName = $('[name="' + x + '"]');
                $opt = $('[name="' + x + '"]').parents().eq(1).find('.ay');
                $opt.prop('selectedIndex', 0).find('optgroup').hide();
                statOption();
              }
              if ((x.slice(0, -3) + ']' == 'calc[armor_tm]') || (x.slice(0, -3) + ']' == 'calc[secondary_tm]') || (x.slice(0, -3) + ']' == 'calc[jewerly_tm]') || (x.slice(0, -3) + ']' == 'calc[orb_tm]')) {
                $statName = $('[name="' + x + '"]');
                $opt = $('[name="' + x + '"]').parents().eq(1).find('.ay-tm');
                $opt.prop('selectedIndex', 0).find('optgroup').hide();
                statTM();
              }
              if ((x.slice(0, -3) + ']' == 'calc[st_armor]') || (x.slice(0, -3) + ']' == 'calc[st_secondary]') || (x.slice(0, -3) + ']' == 'calc[st_jewerly]') || (x.slice(0, -3) + ']' == 'calc[st_orb]'))
                $('.gOption').find('[name="' + x + '"]').children().children('[value="' + y + '"]').prop('selected', true);
              if ((x.slice(0, -3) + ']' == 'calc[st_armor_tm]') || (x.slice(0, -3) + ']' == 'calc[st_secondary_tm]') || (x.slice(0, -3) + ']' == 'calc[st_jewerly_tm]') || (x.slice(0, -3) + ']' == 'calc[st_orb_tm]'))
                $('.gTM').find('[name="' + x + '"]').children().children('[value="' + y + '"]').prop('selected', true);
              if ((x.slice(0, -3) + ']' == 'calc[rune]') || (x.slice(0, -5) + ']' == 'calc[rune]') || (x.slice(0, -3) + ']' == 'calc[rune_w]')) {
                $('[name="' + x + '"]').parents().eq(1).find('.ay-r').each(function() {
                  $(this).children('[name="' + y + '"], option:first').show();
                });
                $r = y;
              }
              if (x.slice(0, -3) + ']' == 'calc[rune_tm]') {
                $('[name="' + x + '"]').parents().eq(1).find('.ay-r').each(function() {
                  $(this).children('[name="' + y + '"], option:first').show();
                });
                $r = y;
              }
              if ((x.slice(0, -3) + ']' == 'calc[st_rune]') || (x.slice(0, -3) + ']' == 'calc[st_rune_w]') || (x.slice(0, -3) + ']' == 'calc[st_rune_tm]'))
                $('[name="' + x + '"]')
                  .children().hide().end()
                  .prop('selectedIndex', 0)
                  .find('[name="' + $r + '"]')
                  .prop('selected', true).show().end()
                  .children('.q').show();
              if (x.slice(0, -3) + ']' == 'calc[st_treasure]')
                $('[name="' + x + '"]')
                  .children().hide().end()
                  .prop('selectedIndex', 0)
                  .children('.' + $tr + '[value="' + y + '"]').show().prop('selected', true).end()
                  .children('.q, .' + $tr).show();
              if ((x == 'calc[ench_type_ar]') || (x == 'calc[ench_type_sg]') || (x == 'calc[ench_type_j]') || (x == 'calc[ench_type_orb]')) {
                $enchName = $('[name="' + x + '"]');
                $('[name="' + x + '"]').parent().next().find('.ench-n').html('<option value="">- - - - - - - - - -</option>').parent().next().find('.ench-v').html('<option value="">- - - </option>');
                if ($('[name="' + x + '"]').children('option:selected').val() !== '')
                  statOptionEnchant();
              }
              if ((x == 'calc[ench_ar]') || (x == 'calc[ench_sg]') || (x == 'calc[ench_j]') || (x == 'calc[ench_orb]')) {
                $enchName = $('[name="' + x + '"]');
                $ench = $('[name="' + x + '"]').parent().next().find('.ench-v');
                $ench.prop('selectedIndex', 0).find('optgroup').hide();
                if ($('[name="' + x + '"]').children('option:selected').val() !== '')
                  statEnchant();
              }
              if ((x.slice(0, -3) + ']' == 'calc[ench_ar_tm]') || (x.slice(0, -3) + ']' == 'calc[ench_sg_tm]') || (x.slice(0, -3) + ']' == 'calc[ench_j_tm]') || (x.slice(0, -3) + ']' == 'calc[ench_orb_tm]')) {
                $enchTMName = $('[name="' + x + '"]');
                $ench = $('[name="' + x + '"]').parent().next().find('.ench-v');
                $ench.prop('selectedIndex', 0).find('optgroup').hide();
                if ($('[name="' + x + '"]').children('option:selected').val() !== '')
                  statEnchantTM();
              }
              if ((x.slice(0, -3) + ']' == 'calc[ench_ar_tm_st]') || (x.slice(0, -3) + ']' == 'calc[ench_sg_tm_st]') || (x.slice(0, -3) + ']' == 'calc[ench_j_tm_st]') || (x.slice(0, -3) + ']' == 'calc[ench_orb_tm_st]'))
                $('[name="' + x + '"]')
                  .children('[value="' + y + '"]').prop('selected', true).end()
                  .children('.q, option:selected').show();
              if ((x == 'calc[ench_ar_st]') || (x == 'calc[ench_sg_st]') || (x == 'calc[ench_j_st]') || (x == 'calc[ench_orb_st]'))
                $('[name="' + x + '"]')
                  .children('[value="' + y + '"]').prop('selected', true).end()
                  .children('.q, option:selected').show();
              if (x == 'calc[jewelry_type]')
                $jewelType = y;
              if ((x == 'uw') || (x == 'ar') || (x == 'sg') || (x == 'ut') || (x == 'ac') || (x == 'or')) {
                $('#' + x).find('label').removeClass('active');
                $('#' + x).find('.bt' + y).addClass('active');
                option();
                gearStat();
                gearSet();
              }
              if ((x == 'perk-t1') || (x == 'perk-t2') || (x == 'perk-t3') || (x == 'perk-t5')) {
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
              }
            });
            heroImg();
            option();
            gearStat();
            gearSet();
          })
          .fail(function(jqXHR, textStatus, errorThrown) {
            alert("Enter valid link/code!\n" + errorThrown);
          });
      } else if ((shr.slice(0, 27) == "http://localhost:3000/links") || (shr.slice(0, 35) == "https://kr-calc.herokuapp.com/links") || (shr.slice(0, 29) == "https://www.kr-calc.com/links")) { /* --- localhost API --- */
        $.get(shr)
          .done(function(data) {
            var decData = function(shr, key) {
              var C = CryptoJS;
              var Key = C.enc.Utf8.parse("6il7YCRSqIOB9NooY225lPKQ0KuAF/nkFX6cY3vJkS0=");
              var IV = C.enc.Utf8.parse("br2fg9b3e7fb12q");
              var dcT = C.AES.decrypt($(data).find('.raw').text(), Key, {
                iv: IV,
                mode: C.mode.CBC,
                padding: C.pad.Pkcs7
              });
              return JSON.parse(dcT.toString(CryptoJS.enc.Utf8));
            };
            $(decData(shr)).each(function(i, n) {
              var x = this.name;
              var y = this.value;
              $('[name="' + x + '"]').children('[value="' + y + '"]').prop('selected', true);
              if (x == 'calc[role_id]') {
                $role = $('#calc_role_id :selected').text();
                $escaped_role = $role.replace(/([ #;&,.+*~\':"!^$[\]()=>|\/@])/g, '\\$1');
                $options = $($chars).filter("optgroup[label='" + $escaped_role + "']").html();
                if ($options) {
                  $('#calc_char_id').html($options);
                  return [
                    $('#char').show(),
                    $('#calc_char_id').parent().show(),
                    $('#calc_gear_weapon').parent().show(),
                    $('#calc_gear_treasure').parent().show(),
                    $('#calc_gear_armor').parent().show(),
                    $('#calc_gear_secondary').parent().show(),
                    $('#calc_gear_jewelry').parent().show(),
                    $('#calc_gear_orb').parent().show(),
                    $('#calc_gear_artifact').parent().show(),
                    $('.form-input div select').show(),
                    $('select').not('#calc_role_id').prop('selectedIndex', 0),
                    change_role()
                  ]
                }
              }
              if (x == 'calc[char_id]')
                change_char();
              if (x == 'calc[gear_weapon]')
                change_weapon();
              if (x == 'calc[st_weapon]')
                change_sw_adv();
              if (x == 'calc[st_weapon_st]')
                change_sw_eth();
              if (x == 'calc[gear_armor]')
                change_armor();
              if (x == 'calc[gear_secondary]')
                change_secondary();
              if (x == 'calc[gear_treasure]')
                change_treasure();
              if ((x == 'calc[gear_jewelry]') && (y !== '- - - - - - - - - -')) {
                $('[name="' + x + '"]').children('optgroup[label=' + $jewelType + ']').children('[value="' + y + '"]').prop('selected', true);
                $jewelSet = y;
                change_jewerly();
              } else if ((x == 'calc[gear_jewelry]') && (y == '- - - - - - - - - -')) {
                $jewelSet = y;
                change_jewerly();
              }
              if (x == 'calc[gear_orb]')
                change_orb();
              if (x == 'calc[gear_artifact]')
                change_art();
              if ((x == 'range') || (x == 'add-atk') || (x == 'add-hp')) {
                $('[name="' + x + '"]').prop('value', y);
                swStat();
                gearStat();
                gearSet();
              }
              if (x.slice(0, -3) + ']' == 'calc[treasure]') {
                $statName = $('[name="' + x + '"]');
                $('#treasure .opt').find($statName).each(function() {
                  $(this).parent().next().children().find('option').not('.q').hide();
                  $stTr = $(this).children('option:selected').text();
                  if (($stTr == 'ATK') || ($stTr == 'Max HP') || ($stTr == 'DEF')) {
                    $(this).parent().next().children().find('.q1').show();
                    $tr = 'q1'
                  } else if (($stTr == 'MP Recovery/Sec') || ($stTr == 'Mana Recovery upon taking DMG')) {
                    $(this).parent().next().children().find('.q2').show();
                    $tr = 'q2'
                  } else if (($stTr == 'Crit DMG') || ($stTr == 'P.DEF') || ($stTr == 'M.DEF') || ($stTr == 'Recovery')) {
                    $(this).parent().next().children().find('.q3').show();
                    $tr = 'q3'
                  } else if (($stTr == 'ATK Spd') || ($stTr == 'Crit') || ($stTr == 'Lifesteal') || ($stTr == 'ACC') || ($stTr == 'Debuff ACC') || ($stTr == 'CC Resist') || ($stTr == 'Block') || ($stTr == 'Crit Resistance') || ($stTr == 'P.Dodge') || ($stTr == 'M.Dodge') || ($stTr == 'P.Tough') || ($stTr == 'M.Tough') || ($stTr == 'P.Resistance') || ($stTr == 'M.Resistance') || ($stTr == 'DMG Reduction upon P.Block') || ($stTr == 'DMG Reduction upon M.Block') || ($stTr == 'P.Block DEF') || ($stTr == 'M.Block DEF') || ($stTr == 'Penetration')) {
                    $(this).parent().next().children().find('.q4').show();
                    $tr = 'q4'
                  } else if (($stTr == 'MP Recovery/Attack') || ($stTr == 'P.Block') || ($stTr == 'M.Block') || ($stTr == 'P.Crit Resistance') || ($stTr == 'M.Crit Resistance')) {
                    $(this).parent().next().children().find('.q5').show();
                    $tr = 'q5'
                  } else if (($stTr == 'Dodge') || ($stTr == 'Tough') || ($stTr == 'Resistance') || ($stTr == 'DMG Reduction upon Block')) {
                    $(this).parent().next().children().find('.q6').show();
                    $tr = 'q6'
                  } else
                    $(this).parent().next().children().find('.q').show();
                });
                $('#treasure #g-treasure').each(function(i, n) {
                  $trOptf = $('#a' + i + ' .ax').children('option:selected').val();
                  $trOpts = $('#b' + i + ' .ax').children('option:selected').val();
                  $(this).find('.ax').children().removeAttr('disabled');
                  if ($trOptf !== '')
                    $(this).find('#b' + i + ' .ax').children('[value="' + $trOptf + '"]').attr('disabled', 'disabled');
                  if ($trOpts !== '')
                    $(this).find('#a' + i + ' .ax').children('[value="' + $trOpts + '"]').attr('disabled', 'disabled');
                });
              }
              if ((x.slice(0, -3) + ']' == 'calc[armor]') || (x.slice(0, -3) + ']' == 'calc[secondary]') || (x.slice(0, -3) + ']' == 'calc[jewerly]') || (x.slice(0, -3) + ']' == 'calc[orb]')) {
                $statName = $('[name="' + x + '"]');
                $opt = $('[name="' + x + '"]').parents().eq(1).find('.ay');
                $opt.prop('selectedIndex', 0).find('optgroup').hide();
                statOption();
              }
              if ((x.slice(0, -3) + ']' == 'calc[armor_tm]') || (x.slice(0, -3) + ']' == 'calc[secondary_tm]') || (x.slice(0, -3) + ']' == 'calc[jewerly_tm]') || (x.slice(0, -3) + ']' == 'calc[orb_tm]')) {
                $statName = $('[name="' + x + '"]');
                $opt = $('[name="' + x + '"]').parents().eq(1).find('.ay-tm');
                $opt.prop('selectedIndex', 0).find('optgroup').hide();
                statTM();
              }
              if ((x.slice(0, -3) + ']' == 'calc[st_armor]') || (x.slice(0, -3) + ']' == 'calc[st_secondary]') || (x.slice(0, -3) + ']' == 'calc[st_jewerly]') || (x.slice(0, -3) + ']' == 'calc[st_orb]'))
                $('.gOption').find('[name="' + x + '"]').children().children('[value="' + y + '"]').prop('selected', true);
              if ((x.slice(0, -3) + ']' == 'calc[st_armor_tm]') || (x.slice(0, -3) + ']' == 'calc[st_secondary_tm]') || (x.slice(0, -3) + ']' == 'calc[st_jewerly_tm]') || (x.slice(0, -3) + ']' == 'calc[st_orb_tm]'))
                $('.gTM').find('[name="' + x + '"]').children().children('[value="' + y + '"]').prop('selected', true);
              if ((x.slice(0, -3) + ']' == 'calc[rune]') || (x.slice(0, -5) + ']' == 'calc[rune]') || (x.slice(0, -3) + ']' == 'calc[rune_w]')) {
                $('[name="' + x + '"]').parents().eq(1).find('.ay-r').each(function() {
                  $(this).children('[name="' + y + '"], option:first').show();
                });
                $r = y;
              }
              if (x.slice(0, -3) + ']' == 'calc[rune_tm]') {
                $('[name="' + x + '"]').parents().eq(1).find('.ay-r').each(function() {
                  $(this).children('[name="' + y + '"], option:first').show();
                });
                $r = y;
              }
              if ((x.slice(0, -3) + ']' == 'calc[st_rune]') || (x.slice(0, -3) + ']' == 'calc[st_rune_w]') || (x.slice(0, -3) + ']' == 'calc[st_rune_tm]'))
                $('[name="' + x + '"]')
                  .children().hide().end()
                  .prop('selectedIndex', 0)
                  .find('[name="' + $r + '"]')
                  .prop('selected', true).show().end()
                  .children('.q').show();
              if (x.slice(0, -3) + ']' == 'calc[st_treasure]')
                $('[name="' + x + '"]')
                  .children().hide().end()
                  .prop('selectedIndex', 0)
                  .children('.' + $tr + '[value="' + y + '"]').show().prop('selected', true).end()
                  .children('.q, .' + $tr).show();
              if ((x == 'calc[ench_type_ar]') || (x == 'calc[ench_type_sg]') || (x == 'calc[ench_type_j]') || (x == 'calc[ench_type_orb]')) {
                $enchName = $('[name="' + x + '"]');
                $('[name="' + x + '"]').parent().next().find('.ench-n').html('<option value="">- - - - - - - - - -</option>').parent().next().find('.ench-v').html('<option value="">- - - </option>');
                if ($('[name="' + x + '"]').children('option:selected').val() !== '')
                  statOptionEnchant();
              }
              if ((x == 'calc[ench_ar]') || (x == 'calc[ench_sg]') || (x == 'calc[ench_j]') || (x == 'calc[ench_orb]')) {
                $enchName = $('[name="' + x + '"]');
                $ench = $('[name="' + x + '"]').parent().next().find('.ench-v');
                $ench.prop('selectedIndex', 0).find('optgroup').hide();
                if ($('[name="' + x + '"]').children('option:selected').val() !== '')
                  statEnchant();
              }
              if ((x.slice(0, -3) + ']' == 'calc[ench_ar_tm]') || (x.slice(0, -3) + ']' == 'calc[ench_sg_tm]') || (x.slice(0, -3) + ']' == 'calc[ench_j_tm]') || (x.slice(0, -3) + ']' == 'calc[ench_orb_tm]')) {
                $enchTMName = $('[name="' + x + '"]');
                $ench = $('[name="' + x + '"]').parent().next().find('.ench-v');
                $ench.prop('selectedIndex', 0).find('optgroup').hide();
                if ($('[name="' + x + '"]').children('option:selected').val() !== '')
                  statEnchantTM();
              }
              if ((x.slice(0, -3) + ']' == 'calc[ench_ar_tm_st]') || (x.slice(0, -3) + ']' == 'calc[ench_sg_tm_st]') || (x.slice(0, -3) + ']' == 'calc[ench_j_tm_st]') || (x.slice(0, -3) + ']' == 'calc[ench_orb_tm_st]'))
                $('[name="' + x + '"]')
                  .children('[value="' + y + '"]').prop('selected', true).end()
                  .children('.q, option:selected').show();
              if ((x == 'calc[ench_ar_st]') || (x == 'calc[ench_sg_st]') || (x == 'calc[ench_j_st]') || (x == 'calc[ench_orb_st]'))
                $('[name="' + x + '"]')
                  .children('[value="' + y + '"]').prop('selected', true).end()
                  .children('.q, option:selected').show();
              if (x == 'calc[jewelry_type]')
                $jewelType = y;
              if ((x == 'uw') || (x == 'ar') || (x == 'sg') || (x == 'ut') || (x == 'ac') || (x == 'or')) {
                $('#' + x).find('label').removeClass('active');
                $('#' + x).find('.bt' + y).addClass('active');
                option();
                gearStat();
                gearSet();
              }
              if ((x == 'perk-t1') || (x == 'perk-t2') || (x == 'perk-t3') || (x == 'perk-t5')) {
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
              }
            });
            heroImg();
            option();
            gearStat();
            gearSet();
          })
          .fail(function(jqXHR, textStatus, errorThrown) {
            alert("Enter valid link/code!\n" + errorThrown);
          });
      } else
        alert("Enter valid link/code!");
    });
    $('#clip').click(function () {
      checkShare();
      if ($chk == 0)
        $msg = 'Create a Build!';
      else if ($('#this-link').text() == '')
        $msg = 'Generate Link or Code!';
      else {
        $tmp = $('<input>');
        $('body').append($tmp);
        $tmp.val($('#this-link').text()).select();
        document.execCommand('copy');
        $tmp.remove();
        $msg = 'Copied!';
      };
      $('#clip p').fadeOut(150, function () {
        $(this).html($msg).fadeIn(150);
      });
      setTimeout(function() {
        $('#clip p').text('Copy');
      }, 1000);
    });
    // $('#bg').parent().css('background-image', 'url(/images/media/background/bg' + Math.trunc(1 + Math.random() * 31) + '.png)');
    $chars = $('#calc_char_id').html();
    $('#calc_role_id').change(function() {
      $('#calc_gear_weapon').parent().hide();
      $('#calc_gear_treasure').parent().hide();
      $('#calc_gear_armor').parent().hide();
      $('#calc_gear_secondary').parent().hide();
      $('#calc_gear_jewelry').parent().hide();
      if ($('#calc_gear_jewelry').children(':first').attr('value') == null)
        $('#calc_gear_jewelry').prepend('<option value="- - - - - - - - - -">- - - - - - - - - -</option>')
      $('#calc_gear_orb').parent().hide();
      $('.hero-img').children().hide();
      $('.form-input .gSt p').text('');
      $('.form-input .gSt .rating').hide();
      $('.rating').find('label').removeClass('active');
      $('.c-perk-img').find('img').removeClass('pick');
      $('.perk-tp').find('p').text(0).css('color', 'black');
      $('.t-st p').empty();
      $('.gOption, .gTM').hide();
      $('.ay, .ay-tm, .ench-v').find('option').not('.q').hide();
      $('select#calc_st_rune_w, select#calc_st_rune_a, select#calc_st_rune_s').find('option').not('.q').hide();
      $('.opt').find('#q-velk').children().hide();
      $role = $('#calc_role_id :selected').text();
      $escaped_role = $role.replace(/([ #;&,.+*~\':"!^$[\]()=>|\/@])/g, '\\$1');
      $options = $($chars).filter("optgroup[label='" + $escaped_role + "']").html();
      if ($options) {
        $('#calc_char_id').html($options);
        return [
          $('#char').show(),
          $('#calc_char_id').parent().show(),
          $('#calc_gear_weapon').parent().show(),
          $('#calc_gear_treasure').parent().show(),
          $('#calc_gear_armor').parent().show(),
          $('#calc_gear_secondary').parent().show(),
          $('#calc_gear_jewelry').parent().show(),
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
    function change_role() {
      heroImg();
      hideOption();
      $('.r-stats').children().hide();
      $('.t-total .r-stats').empty();
      $heroName = $('#calc_char_id').children('option:selected').text().toLowerCase();
      $heroClass = $('#calc_role_id').children('option:selected').val();
      $heroClass == '' ? $('.share').hide() : $('.share').show();
      if ($heroClass == 1) {
        $heroClassName = 'Knight';
        $gTM = 'Protection';
      } else if ($heroClass == 2) {
        $heroClassName = 'Warrior';
        $gTM = 'Courage';
      } else if ($heroClass == 3) {
        $heroClassName = 'Assassin';
        $gTM = 'Coldness';
      } else if ($heroClass == 4) {
        $heroClassName = 'Archer';
        $gTM = 'Wrath';
      } else if ($heroClass == 5) {
        $heroClassName = 'Mechanic';
        $gTM = 'Passion';
      } else if ($heroClass == 6) {
        $heroClassName = 'Wizard';
        $gTM = 'Wisdom';
      } else if ($heroClass == 7) {
        $heroClassName = 'Priest';
        $gTM = 'Blessing';
      }

      $stats = $('.class-stats').find('.statData').clone();
      $($stats).prependTo('.t-total .r-stats');
      $('.t-total').find('.statData').show();
      $('#calc_gear_weapon')
        .css('background-image', 'url(/images/media/gears/bg-weapon.png)')
        .parents().eq(1).find('.gOption select').prop('selectedIndex', 0);
      $('#calc_gear_armor').css('background-image', 'url(/images/media/gears/bg-armor.png)');
      $('#calc_gear_secondary').css('background-image', 'url(/images/media/gears/bg-secondary.png)');
      $('#calc_gear_treasure').css({
        'background-image': 'url(/images/media/gears/bg-treasure.png)',
        'width': '52px',
        'position': 'relative',
        'right': '0'
      });
      $('#calc_gear_jewelry').css('background-image', 'url(/images/media/gears/bg-accessory.png)');
      $('#calc_gear_orb').css('background-image', 'url(/images/media/gears/bg-orb.png)');
      $('#calc_gear_armor, #calc_gear_secondary, #calc_gear_jewelry, #calc_gear_orb')
        .removeClass('g-fr g-fr-t')
        .parents().eq(1).find('.gOption select, .gTM select').prop('selectedIndex', 0);
      $heroClass !== '' ? $('.t-total .r-stats').show() : $('.t-total .r-stats').hide();
      $('.w-in').removeClass('g-fr-u a0 a1 a2');
      $('.img').removeClass('g-fr g-fr-u g-fr-t');
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
    };
    function change_char() {
      heroImg();
      hideOption();
      $hero = $('#calc_char_id').children('option:selected').val();
      $heroName = $('#calc_char_id').children('option:selected').text().toLowerCase();
      $stats = $('.class-stats').find('.statData').clone();
      $('.t-total').find('.r-stats').empty();
      $($stats).prependTo('.t-total .r-stats');
      $('.t-total').find('.statData').show();
      $('.gOption, .gTM, .gArt').hide();
      $('.t-st p').empty();
      $('.form-input .gSt p').text('');
      $('.form-input .gSt .rating').hide();
      $('.rating').find('label').removeClass('active');
      $('.c-perk-img').find('img').removeClass('pick');
      $('.perk-tp').find('p').css('color', 'black').text(0);
      $('select').not('#calc_role_id, #calc_char_id').prop('selectedIndex', 0);
      $('#range-atk').text(0);
      $('#range-hp').text(0);
      $('.range').hide();
      $('select#calc_gear_treasure').css('background-image', 'url(/images/media/gears/bg-treasure.png)').css({
        'width': '52px',
        'position': 'relative',
        'right': '0'
      });
      $('.w-in').removeClass('g-fr-u a0 a1 a2');
      $('.img').removeClass('g-fr g-fr-u g-fr-t');
    };
    function change_weapon() {
      $('#heroATK').empty();
      $uw = null;
      $gearWeaponSlot = null;
      $clKn = 32730;$clWa = 37010;$clAs = 40711;$clAr = 45915;$clMe = 41867;$clWi = 42793;$clPr = 42793;$unKn = 45106;$unWa = 51120;$unAs = 56209;$unAr = 63264;$unMe = 57712;$unWi = 58985;$unPr = 58985;$arPl = 17052;$arSc = 11369;$arR = 5686;$scSh = 17052;$scC = 5686;$scH = 11369;$ms = 726278;$unTr = 1596066;$jR = 726278;$jE = 15801;$jB = 11369;$jN = 11369;$or = 726278;
      $tm1R = 53718;$tm1 = 40928;$tm2R = 35809;$tm2 = 27283;$tm3R = 17908;$tm3 = 13644;$tm4R = 1715830;$tm4 = 1307299;$tm5R = 37327;$tm5 = 28440;
      $gearWeaponType = $('#calc_gear_weapon').children('option:selected').val();
      $('.w-in').removeClass('g-fr-u a0 a1 a2');
      $('#calc_st_weapon, #calc_st_weapon_st').prop('selectedIndex', 0);
      $('#calc_st_weapon_st').children().hide();
      if ($gearWeaponType == 'Class') {
        $('#calc_gear_weapon').css('background-image', 'url(/images/media/heroes/' + $heroClassName.toLowerCase() + '.png)');
        $('#wea').next('.rating').show();
        if ($heroClass == 1)
          $('#greyATK').text($clKn);
        else if ($heroClass == 2)
          $('#greyATK').text($clWa);
        else if ($heroClass == 3)
          $('#greyATK').text($clAs);
        else if ($heroClass == 4)
          $('#greyATK').text($clAr);
        else if ($heroClass == 5)
          $('#greyATK').text($clMe);
        else if ($heroClass == 6)
          $('#greyATK').text($clWi);
        else if ($heroClass == 7)
          $('#greyATK').text($clPr);
        $('.calc_gear_weapon').parent().find('.gOption').show();
        $('.w-in').addClass('g-fr-u');
        $('#g-weapon').hide();
        $('#range-atk').text(0);
        $('#range-hp').text(0);
        $('.range').hide();
        rangeC();
        gearStat();
      } else if ($gearWeaponType == 'Unique') {
        $('#calc_gear_weapon').attr('style', 'background-image: url("/images/media/heroes/' + $heroName + '/uw.png"); display: inline-block;');
        $('#wea').next('.rating').show();
        if ($heroClass == 1)
          $('#greyATK').text($unKn);
        else if ($heroClass == 2)
          $('#greyATK').text($unWa);
        else if ($heroClass == 3)
          $('#greyATK').text($unAs);
        else if ($heroClass == 4)
          $('#greyATK').text($unAr);
        else if ($heroClass == 5)
          $('#greyATK').text($unMe);
        else if ($heroClass == 6)
          $('#greyATK').text($unWi);
        else if ($heroClass == 7)
          $('#greyATK').text($unPr);

        if ($heroClass == 1)
          $swA = 3500;
        else if (($heroClass == 2) || ($heroClass == 3))
          $swA = 4000;
        else if (($heroClass == 4) || ($heroClass == 5) || ($heroClass == 6) || ($heroClass == 7))
          $swA = 4500;
        $swH = 125000;

        $('.calc_gear_weapon').parent().find('.gOption').show();
        $('#calc_st_weapon_st').children(':first').show();
        $('.w-in').addClass('g-fr-u');
        $('#g-weapon').show();
        gearStat();
      } else if ($gearWeaponType == '- - - - - - - - - -') {
        $('.calc_gear_weapon').parent().find('.gOption').hide();
        $('#calc_gear_weapon')
          .css('background-image', 'url(/images/media/gears/bg-weapon.png)')
          .parents().eq(1).find('.gOption select').prop('selectedIndex', 0);
        $('#greyATK').text('');
        $('#wea').text('').next('.rating').hide();
        $('.w-in').removeClass('g-fr-u');
        $('#g-weapon').hide();
        $('#range-atk').text(0);
        $('#range-hp').text(0);
        $('.range').hide();
        rangeC();
        $('#uw label').filter('.active').removeClass('active');
        $('#weapon .ay-r')
          .children().hide().end()
          .prop('selectedIndex', 0)
          .children('.q').show();
      }
      $('#wea').text($('#greyATK').text());
    };
    function change_sw_adv() {
      $adv = $('#calc_st_weapon').children('option:selected').text();
      $('#calc_st_weapon_st').children('option').show();
      $('.w-in').removeClass('g-fr-u a0 a1 a2');
      if ($adv == '- - - - - - - - - -') {
        $('#calc_st_weapon_st')
          .children().each(function() {
            if ($(this).text() !== '- - -')
              return $(this).hide()
          }).end()
          .prop('selectedIndex', 0);
        $rAtk = $('#range-atk').text(0);
        $rHP = $('#range-hp').text(0);
        $('.range').hide();
        rangeC();
        if ($('#calc_gear_weapon').children('option:selected').text() !== '- - - - - - - - - -')
          $('.w-in').addClass('g-fr-u');
      } else if ($adv == 'Adv.0') {
        $('#calc_st_weapon_st')
          .children().each(function() {
            if ($(this).text() == '- - -')
              return $(this).hide()
          }).end()
          .prop('selectedIndex', 1);
        $rAtk = $('#range-atk').text(parseInt($swA));
        $rHP = $('#range-hp').text(parseInt($swH));
        $('.range').show();
        rangeC();
        $('.w-in').addClass('a0');
        gearStat();
      } else if ($adv == 'Adv.1') {
        $('#calc_st_weapon_st')
          .children().each(function() {
            if (($(this).val() < 5) || ($(this).text() == '- - -'))
              return $(this).hide()
          }).end()
          .prop('selectedIndex', 6);
        $rAtk = $('#range-atk').text(parseInt($swA)*2);
        $rHP = $('#range-hp').text(parseInt($swH)*2);
        $('.range').show();
        rangeC();
        $('.w-in').addClass('a1');
        gearStat();
      } else if ($adv == 'Adv.2') {
        $('#calc_st_weapon_st')
          .children().each(function() {
            if (($(this).val() < 10) || ($(this).text() == '- - -'))
              return $(this).hide()
          }).end()
          .prop('selectedIndex', 11);
        $rAtk = $('#range-atk').text(parseInt($swA)*4);
        $rHP = $('#range-hp').text(parseInt($swH)*4);
        $('.range').show();
        rangeC();
        $('.w-in').addClass('a2');
        gearStat();
      }
    };
    function change_sw_eth() {
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
      if ($eth !== '- - -') {
        swStat();
        gearStat();
      }
    };
    function change_treasure() {
      $('#heroHP').empty();
      $gearTreasureType = $('#calc_gear_treasure').children('option:selected').val();
      $heroName = $('#calc_char_id').children('option:selected').text().toLowerCase();
      $('.gOption .ax').children().removeAttr('disabled');
      $('#treasure')
        .find('.ax, .ay').prop('selectedIndex', 0).end()
        .find('.ay')
          .children().hide().end()
          .find('.q').show();
      if ($gearTreasureType == '- - - - - - - - - -') {
        $('#greyTR').text('');
        $('#tre').text('').next('.rating').hide();
        $('#calc_gear_treasure')
          .css({
            'background-image': 'url(/images/media/gears/bg-treasure.png)',
            'width': '52px',
            'position': 'relative',
            'right': '0'
          })
          .removeClass('g-fr g-fr-u')
          .parents().eq(1).find('.gOption select').prop('selectedIndex', 0);
        $('.calc_gear_treasure').parent().find('.gOption').hide();
        $('#ut label').filter('.active').removeClass('active');
      } else if ($gearTreasureType == 'Mana Stone') {
        $('#greyTR').text($ms);
        $('#tre').next('.rating').show();
        $('#calc_gear_treasure')
          .css('background-image', 'url(/images/media/gears/9-UT/Mana.png)').css({
            'width': '52px',
            'background-size': '50px 50px',
            'position': 'relative',
            'right': '0'
          })
          .addClass('g-fr').removeClass('g-fr-u');
        $('.calc_gear_treasure').parent().find('.frst').show().css({
          'position': 'relative',
          'bottom': '104px'
        });
        $('.scnd').hide();
        $('.scnd select').prop('selectedIndex', 0);
        gearStat();
      } else if ($gearTreasureType == 'Unique') {
        $eTr1 = 'url("/images/media/heroes/' + $heroName + '/ut1.png")';
        $eTr2 = 'url("/images/media/heroes/' + $heroName + '/ut2.png")';
        $eTr3 = 'url("/images/media/heroes/' + $heroName + '/ut3.png")';
        $eTr4 = 'url("/images/media/heroes/' + $heroName + '/ut4.png")';
        $eTr = $eTr1 + ',' + $eTr2 + ',' + $eTr3 + ',' + $eTr4;
        $('#greyTR').text($unTr);
        $('#tre').next('.rating').show();
        $('#calc_gear_treasure')
          .attr('style', 'background-image: ' + $eTr + '; display: inline-block;').css({
            'background-position': '0px, 52px, 104px, 156px',
            'background-repeat': 'no-repeat',
            'background-size': '52px 50px',
            'position': 'relative',
            'right': '120px',
            'width': '209px',
            'height': '50px'
          })
          .addClass('g-fr-u').removeClass('g-fr');
        $('.calc_gear_treasure').parent().find('.frst, .scnd').show().css({
          'position': 'relative',
          'bottom': '210px'
        });
        gearStat();
      }
      $('#tre').text($('#greyTR').text());
    };
    function change_armor() {
      $('#heroPDEF').empty();
      $('#setAr').text($('#calc_gear_armor').children('option:selected').text());
      $('.gTM .ench-n').children().removeAttr('disabled');
      $('#armor')
        .find('.ax, .ay, .ax-tm, .ay-tm, .ench-n, .ench-v, .ax-r, .ay-r').prop('selectedIndex', 0).end()
        .find('.ay, .ay-tm, .ench-v, .ay-r')
          .children().hide().end()
          .find('.q').show();
      $armorSet = $('#calc_gear_armor').children('option:selected').val();
      $heroClass = $('#calc_role_id').children('option:selected').val();
      if ($armorSet == '- - - - - - - - - -') {
        $('#greyPDEF').text('');
        $('#arm').text('').next('.rating').hide();
        $('.calc_gear_armor').parent().find('.gOption, .gTM').hide();
        $('#calc_gear_armor')
          .css('background-image', 'url(/images/media/gears/bg-armor.png)')
          .removeClass('g-fr g-fr-t')
          .parents().eq(1).find('.gOption select, .gTM select').prop('selectedIndex', 0);
        $('#ar label').filter('.active').removeClass('active');
        $('#armor .ay-r')
          .children().hide().end()
          .prop('selectedIndex', 0)
          .children('.q').show();
      } else if (($armorSet == 'Reclaimed Perseverance') || ($armorSet == 'Reclaimed Hope') || ($armorSet == 'Reclaimed Authority')) {
        if (($heroClass == 1) || ($heroClass == 2)) {
          $gType = '1-1H';
          $('#greyPDEF').text($tm1R);
        } else if (($heroClass == 3) || ($heroClass == 4) || ($heroClass == 5)) {
          $gType = '3-1L';
          $('#greyPDEF').text($tm2R);
        } else if (($heroClass == 6) || ($heroClass == 7)) {
          $gType = '5-1I';
          $('#greyPDEF').text($tm3R);
        }
        $('#arm').next('.rating').show();
        $('#calc_gear_armor')
          .attr('style', 'background-image: url("/images/media/gears/' + $gType + '/' + $armorSet + ' ' + $gTM + '.png"); display: inline-block;')
          .addClass('g-fr-t').removeClass('g-fr')
          .parents().eq(1).find('.gOption select').prop('selectedIndex', 0);
        $('.calc_gear_armor')
          .parent().find('.gTM').show()
          .parent().find('.gOption').hide();
        gearStat();
      } else if (($armorSet == 'Perseverance') || ($armorSet == 'Hope') || ($armorSet == 'Authority')) {
        if (($heroClass == 1) || ($heroClass == 2)) {
          $gType = '1-1H';
          $('#greyPDEF').text($tm1);
        } else if (($heroClass == 3) || ($heroClass == 4) || ($heroClass == 5)) {
          $gType = '3-1L';
          $('#greyPDEF').text($tm2);
        } else if (($heroClass == 6) || ($heroClass == 7)) {
          $gType = '5-1I';
          $('#greyPDEF').text($tm3);
        }
        $('#arm').next('.rating').show();
        $('#calc_gear_armor')
          .attr('style', 'background-image: url("/images/media/gears/' + $gType + '/' + $armorSet + ' ' + $gTM + '.png"); display: inline-block;')
          .addClass('g-fr-t').removeClass('g-fr')
          .parents().eq(1).find('.gOption select').prop('selectedIndex', 0);
        $('.calc_gear_armor')
          .parent().find('.gTM').show()
          .parent().find('.gOption').hide();
        gearStat();
      } else {
        if (($heroClass == 1) || ($heroClass == 2)) {
          $gType = '1-1H';
          $('#greyPDEF').text($arPl);
        } else if (($heroClass == 3) || ($heroClass == 4) || ($heroClass == 5)) {
          $gType = '3-1L';
          $('#greyPDEF').text($arSc);
        } else if (($heroClass == 6) || ($heroClass == 7)) {
          $gType = '5-1I';
          $('#greyPDEF').text($arR);
        }
        $('#arm').next('.rating').show();
        $('#calc_gear_armor')
          .attr('style', 'background-image: url("/images/media/gears/' + $gType + '/' + $armorSet + '.png"); display: inline-block;')
          .removeClass('g-fr-t').addClass('g-fr')
          .parents().eq(1).find('.gTM select').prop('selectedIndex', 0);
        $('.calc_gear_armor')
          .parent().find('.gOption').show()
          .parent().find('.gTM').hide();
        gearStat();
      }
      $('#arm').text($('#greyPDEF').text());
    };
    function change_secondary() {
      $('#heroMDEF').empty();
      $('#setScnd').text($('#calc_gear_secondary').children('option:selected').text());
      $('.gTM .ench-n').children().removeAttr('disabled');
      $('#secondary')
        .find('.ax, .ay, .ax-tm, .ay-tm, .ench-n, .ench-v, .ax-r, .ay-r').prop('selectedIndex', 0).end()
        .find('.ay, .ay-tm, .ench-v, .ay-r')
          .children().hide().end()
          .find('.q').show();
      $secondarySet = $('#calc_gear_secondary').children('option:selected').val();
      $heroClass = $('#calc_role_id').children('option:selected').val();
      if ($secondarySet == '- - - - - - - - - -') {
        $('#greyMDEF').text('');
        $('#sec').next('.rating').hide();
        $('.calc_gear_secondary').parent().find('.gOption, .gTM').hide();
        $('#calc_gear_secondary')
          .css('background-image', 'url(/images/media/gears/bg-secondary.png)')
          .removeClass('g-fr g-fr-t')
          .parents().eq(1).find('.gOption select, .gTM select').prop('selectedIndex', 0);
        $('#sg label').filter('.active').removeClass('active');
        $('#secondary .ay-r')
          .children().hide().end()
          .prop('selectedIndex', 0)
          .children('.q').show();
      } else if (($secondarySet == 'Reclaimed Perseverance') || ($secondarySet == 'Reclaimed Hope') || ($secondarySet == 'Reclaimed Authority')) {
        if (($heroClass == 1) || ($heroClass == 2)) {
          $gType = '2-2H';
          $('#greyMDEF').text($tm1R);
        } else if (($heroClass == 3) || ($heroClass == 4) || ($heroClass == 5)) {
          $gType = '4-2L';
          $('#greyMDEF').text($tm3R);
        } else if (($heroClass == 6) || ($heroClass == 7)) {
          $gType = '6-2I';
          $('#greyMDEF').text($tm2R);
        }
        $('#sec').next('.rating').show();
        $('#calc_gear_secondary')
          .attr('style', 'background-image: url("/images/media/gears/' + $gType + '/' + $secondarySet + ' ' + $gTM + '.png"); display: inline-block;')
          .addClass('g-fr-t').removeClass('g-fr')
          .parents().eq(1).find('.gOption select').prop('selectedIndex', 0);
        $('.calc_gear_secondary')
          .parent().find('.gTM').show()
          .parent().find('.gOption').hide();
        gearStat();
      } else if (($secondarySet == 'Perseverance') || ($secondarySet == 'Hope') || ($secondarySet == 'Authority')) {
        if (($heroClass == 1) || ($heroClass == 2)) {
          $gType = '2-2H';
          $('#greyMDEF').text($tm1);
        } else if (($heroClass == 3) || ($heroClass == 4) || ($heroClass == 5)) {
          $gType = '4-2L';
          $('#greyMDEF').text($tm3);
        } else if (($heroClass == 6) || ($heroClass == 7)) {
          $gType = '6-2I';
          $('#greyMDEF').text($tm2);
        }
        $('#sec').next('.rating').show();
        $('#calc_gear_secondary')
          .attr('style', 'background-image: url("/images/media/gears/' + $gType + '/' + $secondarySet + ' ' + $gTM + '.png"); display: inline-block;')
          .addClass('g-fr-t').removeClass('g-fr')
          .parents().eq(1).find('.gOption select').prop('selectedIndex', 0);
        $('.calc_gear_secondary')
          .parent().find('.gTM').show()
          .parent().find('.gOption').hide();
        gearStat();
      } else {
        if (($heroClass == 1) || ($heroClass == 2)) {
          $gType = '2-2H';
          $('#greyMDEF').text($scSh);
        } else if (($heroClass == 3) || ($heroClass == 4) || ($heroClass == 5)) {
          $gType = '4-2L';
          $('#greyMDEF').text($scC);
        } else if (($heroClass == 6) || ($heroClass == 7)) {
          $gType = '6-2I';
          $('#greyMDEF').text($scH);
        }
        $('#sec').next('.rating').show();
        $('#calc_gear_secondary')
          .attr('style', 'background-image: url("/images/media/gears/' + $gType + '/' + $secondarySet + '.png"); display: inline-block;')
          .addClass('g-fr').removeClass('g-fr-t')
          .parents().eq(1).find('.gTM select').prop('selectedIndex', 0);
        $('.calc_gear_secondary')
          .parent().find('.gOption').show()
          .parent().find('.gTM').hide();
        gearStat();
      }
      $('#sec').text($('#greyMDEF').text());
    };
    function change_jewerly() {
      $('#heroJ').empty();
      $('#setAcs').text($('#calc_gear_jewelry').children().children('option:selected').val());
      $('.gTM .ench-n').children().removeAttr('disabled');
      $('#jewerly')
        .find('.ax, .ay, .ax-tm, .ay-tm, .ench-n, .ench-v, .ax-r, .ay-r').prop('selectedIndex', 0).end()
        .find('.ay, .ay-tm, .ench-v, .ay-r')
          .children().hide().end()
          .find('.q').show();
      if ($('#calc_gear_jewelry').children('option:selected').val() == '- - - - - - - - - -')
        $jewelSet = $('#calc_gear_jewelry').children('option:selected').val();
      else {
        $jewelSet = $('#calc_gear_jewelry').children().children('option:selected').val();
        if ($('#calc_gear_jewelry').children().children('option:selected').parent().attr('label') !== null)
          $jewelType = $('#calc_gear_jewelry').children().children('option:selected').parent().attr('label');
      }
      if ($jewelSet == '- - - - - - - - - -') {
        $('#greyJ').text('');
        $('#acc').next('.rating').hide();
        $('.calc_gear_jewelry').parent().find('.gOption, .gTM').hide();
        $('#calc_gear_jewelry')
          .css('background-image', 'url(/images/media/gears/bg-accessory.png)')
          .removeClass('g-fr g-fr-t')
          .parents().eq(1).find('.gOption select, .gTM select').prop('selectedIndex', 0);
        $('#ac label').filter('.active').removeClass('active');
      } else if (($jewelSet == 'Reclaimed Perseverance') || ($jewelSet == 'Reclaimed Hope') || ($jewelSet == 'Reclaimed Authority')) {
        if ($jewelType == 'Ring')
          $('#greyJ').text($tm4R);
        else if ($jewelType == 'Earrings')
          $('#greyJ').text($tm5R);
        else if (($jewelType == 'Bracelet') || ($jewelType == 'Necklace'))
          $('#greyJ').text($tm2R);
          $('#acc').next('.rating').show();
        $('#calc_gear_jewelry')
          .attr('style', 'background-image: url("/images/media/gears/7-J/' + $jewelType + '/' + $jewelSet + ' ' + $gTM + '.png"); display: inline-block;')
          .addClass('g-fr-t').removeClass('g-fr')
          .parents().eq(1).find('.gOption select').prop('selectedIndex', 0);
        $('.calc_gear_jewelry')
          .parent().find('.gTM').show()
          .parent().find('.gOption').hide();
        gearStat();
      } else if (($jewelSet == 'Perseverance') || ($jewelSet == 'Hope') || ($jewelSet == 'Authority')) {
        if ($jewelType == 'Ring')
          $('#greyJ').text($tm4);
        else if ($jewelType == 'Earrings')
          $('#greyJ').text($tm5);
        else if (($jewelType == 'Bracelet') || ($jewelType == 'Necklace'))
          $('#greyJ').text($tm2);
          $('#acc').next('.rating').show();
        $('#calc_gear_jewelry')
          .attr('style', 'background-image: url("/images/media/gears/7-J/' + $jewelType + '/' + $jewelSet + ' ' + $gTM + '.png"); display: inline-block;')
          .addClass('g-fr-t').removeClass('g-fr')
          .parents().eq(1).find('.gOption select').prop('selectedIndex', 0);
        $('.calc_gear_jewelry')
          .parent().find('.gTM').show()
          .parent().find('.gOption').hide();
        gearStat();
      } else {
        if ($jewelType == 'Ring')
          $('#greyJ').text($jR);
        else if ($jewelType == 'Earrings')
          $('#greyJ').text($jE);
        else if ($jewelType == 'Bracelet')
          $('#greyJ').text($jB);
        else if ($jewelType == 'Necklace')
          $('#greyJ').text($jN);
          $('#acc').next('.rating').show();
        $('#calc_gear_jewelry')
          .attr('style', 'background-image: url("/images/media/gears/7-J/' + $jewelType + '/' + $jewelSet + '.png"); display: inline-block;')
          .addClass('g-fr').removeClass('g-fr-t')
          .parents().eq(1).find('.gTM select').prop('selectedIndex', 0);
        $('.calc_gear_jewelry')
          .parent().find('.gOption').show()
          .parent().find('.gTM').hide();
        gearStat();
      }
      $('#acc').text($('#greyJ').text());
    };
    function change_orb() {
      $('#heroO').empty();
      $('#setOrb').text($('#calc_gear_orb').children('option:selected').text());
      $('.gTM .ench-n').children().removeAttr('disabled');
      $('#_orb')
        .find('.ax, .ay, .ax-tm, .ay-tm, .ench-n, .ench-v, .ax-r, .ay-r').prop('selectedIndex', 0).end()
        .find('.ay, .ay-tm, .ench-v, .ay-r')
          .children().hide().end()
          .find('.q').show();
      $orbSet = $('#calc_gear_orb').children('option:selected').val();
      if ($orbSet == '- - - - - - - - - -') {
        $('#greyO').text('');
        $('#orb').text('').next('.rating').hide();
        $('.calc_gear_orb').parent().find('.gOption, .gTM').hide();
        $('#calc_gear_orb')
          .css('background-image', 'url(/images/media/gears/bg-orb.png)')
          .removeClass('g-fr g-fr-t')
          .parents().eq(1).find('.gOption select, .gTM select').prop('selectedIndex', 0);
        $('#or label').filter('.active').removeClass('active');
      } else if (($orbSet == 'Reclaimed Perseverance') || ($orbSet == 'Reclaimed Hope') || ($orbSet == 'Reclaimed Authority')) {
        $('#greyO').text($tm4R);
        $('#orb').next('.rating').show();
        $('.calc_gear_orb').parent().find('.gTM').show().parent().find('.gOption').hide();
        $('#calc_gear_orb')
          .attr('style', 'background-image: url("/images/media/gears/8-O/' + $orbSet + ' ' + $gTM + '.png"); display: inline-block;')
          .addClass('g-fr-t').removeClass('g-fr')
          .parents().eq(1).find('.gOption select').prop('selectedIndex', 0);
        $('.calc_gear_orb')
          .parent().find('.gTM').show()
          .parent().find('.gOption').hide();
        gearStat();
      } else if (($orbSet == 'Perseverance') || ($orbSet == 'Hope') || ($orbSet == 'Authority')) {
        $('#greyO').text($tm4);
        $('#orb').next('.rating').show();
        $('#calc_gear_orb')
          .attr('style', 'background-image: url("/images/media/gears/8-O/' + $orbSet + ' ' + $gTM + '.png"); display: inline-block;')
          .addClass('g-fr-t').removeClass('g-fr')
          .parents().eq(1).find('.gOption select').prop('selectedIndex', 0);
        $('.calc_gear_orb')
          .parent().find('.gTM').show()
          .parent().find('.gOption').hide();
        gearStat();
      } else {
        $('#greyO').text($or);
        $('#orb').next('.rating').show();
        $('#calc_gear_orb')
          .attr('style', 'background-image: url("/images/media/gears/8-O/' + $orbSet + '.png"); display: inline-block;')
          .addClass('g-fr').removeClass('g-fr-t')
          .parents().eq(1).find('.gTM select').prop('selectedIndex', 0);
        $('.calc_gear_orb')
          .parent().find('.gOption').show()
          .parent().find('.gTM').hide();
        gearStat();
      }
      $('#orb').text($('#greyO').text());
    };
    function change_art() {
      $artSet = $('#calc_gear_artifact').children('option:selected');
      $('.calc-art-description').find('p').text($($artSet).attr('desc'));
      if ($($artSet).val() == '- - - - - - - - - -') {
        $('#art').text('').next('.rating').hide();
        $('#art label').filter('.active').removeClass('active');
        $('#calc_gear_artifact')
          .css('background-image', 'url(/images/media/gears/bg-art.png)')
          .removeClass('g-fr-u');
        $('.gArt').hide();
      } else {
        $('#calc_gear_artifact').attr('style', 'background-image: url("/images/media/artifacts/' + $($artSet).val() + '.png"); display: inline-block;').addClass('g-fr-u');
        $('.gArt').show();
      }
    };
    function change_rune() {
      $($rc)
        .children().hide().end()
        .prop('selectedIndex', 0)
        .children('[name="' + $statVal + '"], option:first').show();
    };
    $('select#calc_role_id').change(function() {
      change_role();
    }).change();
    $('select#calc_char_id').change(function() {
      change_char();
    }).change();
    $('select#calc_gear_weapon').change(function() {
      change_weapon();
    }).change();
    $('select#calc_st_weapon').change(function() {
      change_sw_adv();
    }).change();
    $('select#calc_st_weapon_st').change(function() {
      change_sw_eth();
    }).change();
    $('select#calc_rune_w').change(function() {
      $statName = $(this);
      $statVal = $(this).val();
      $rc = $(this).parents().eq(1).find('.ay-r');
      change_rune();
    });
    $('select#calc_gear_treasure').change(function() {
      change_treasure();
    }).change();
    $('select#calc_st_treasure').change(function() {
      $statName = $(this);
      $opt = $(this).parents().eq(1).find('.ay');
      $opt.prop('selectedIndex', 0);
      statOptionTreasure();
      gearStat();
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
    $('select#calc_gear_armor').change(function() {
      change_armor();
    }).change();
    $('select#calc_st_armor').change(function() {
      $statName = $(this);
      $opt = $(this).parents().eq(1).find('.ay, .ay-tm');
      $opt.prop('selectedIndex', 0);
      $gName = $(this).parents().eq(2).attr('class');
      if ($gName == 'gTM') {
        statTM();
        gearStat();
      } else if ($gName == 'gOption') {
        statOption();
        gearStat();
      }
    });
    $('select#calc_ench_ar').change(function() {
      $enchName = $(this);
      $ench = $(this).parent().next().find('.ench-v');
      $ench.prop('selectedIndex', 0).find('optgroup').hide();
      if ($(this).children('option:selected').val() !== '')
        statEnchant();
    });
    $('select#calc_ench_ar_tm').change(function() {
      $enchTMName = $(this);
      $ench = $(this).parent().next().find('.ench-v');
      $ench.prop('selectedIndex', 0).find('optgroup').hide();
      if ($(this).children('option:selected').val() !== '')
        statEnchantTM();
      $('#armor .gTM .opt-tm-ench').each(function() {
        $tmEnchF = $(this).find('#a0 .ench-n').children('option:selected').val();
        $tmEnchS = $(this).find('#b0 .ench-n').children('option:selected').val();
        $tmEnchT = $(this).find('#c0 .ench-n').children('option:selected').val();
        $(this).find('.ench-n').children().removeAttr('disabled');
        if ($tmEnchF !== '')
          $(this).find('#b0 .ench-n, #c0 .ench-n').children('[value="' + $tmEnchF + '"]').attr('disabled', 'disabled');
        if ($tmEnchS !== '')
          $(this).find('#a0 .ench-n, #c0 .ench-n').children('[value="' + $tmEnchS + '"]').attr('disabled', 'disabled');
        if ($tmEnchT !== '')
          $(this).find('#a0 .ench-n, #b0 .ench-n').children('[value="' + $tmEnchT + '"]').attr('disabled', 'disabled');
      });
    });
    $('select#calc_rune_a').change(function() {
      $statName = $(this);
      $statVal = $(this).val();
      $rc = $(this).parents().eq(1).find('.ay-r');
      change_rune();
    });
    $('select#calc_gear_secondary').change(function() {
      change_secondary();
    }).change();
    $('select#calc_st_secondary').change(function() {
      $statName = $(this);
      $opt = $(this).parents().eq(1).find('.ay, .ay-tm');
      $opt.prop('selectedIndex', 0).find('optgroup').hide();
      $gName = $(this).parents().eq(2).attr('class');
      if ($gName == 'gTM') {
        statTM();
        gearStat();
      } else if ($gName == 'gOption') {
        statOption();
        gearStat();
      }
    });
    $('select#calc_ench_sg').change(function() {
      $enchName = $(this);
      $ench = $(this).parent().next().find('.ench-v');
      $ench.prop('selectedIndex', 0);
      if ($(this).children('option:selected').val() !== '')
        statEnchant();
    });
    $('select#calc_ench_sg_tm').change(function() {
      $enchTMName = $(this);
      $ench = $(this).parent().next().find('.ench-v');
      $ench.prop('selectedIndex', 0).find('optgroup').hide();
      if ($(this).children('option:selected').val() !== '')
        statEnchantTM();
      $('#secondary .gTM .opt-tm-ench').each(function() {
        $tmEnchF = $(this).find('#a0 .ench-n').children('option:selected').val();
        $tmEnchS = $(this).find('#b0 .ench-n').children('option:selected').val();
        $tmEnchT = $(this).find('#c0 .ench-n').children('option:selected').val();
        $(this).find('.ench-n').children().removeAttr('disabled');
        if ($tmEnchF !== '')
          $(this).find('#b0 .ench-n, #c0 .ench-n').children('[value="' + $tmEnchF + '"]').attr('disabled', 'disabled');
        if ($tmEnchS !== '')
          $(this).find('#a0 .ench-n, #c0 .ench-n').children('[value="' + $tmEnchS + '"]').attr('disabled', 'disabled');
        if ($tmEnchT !== '')
          $(this).find('#a0 .ench-n, #b0 .ench-n').children('[value="' + $tmEnchT + '"]').attr('disabled', 'disabled');
      });
    });
    $('select#calc_rune_s').change(function() {
      $statName = $(this);
      $statVal = $(this).val();
      $rc = $(this).parents().eq(1).find('.ay-r');
      change_rune();
    });
    $('select#calc_gear_jewelry').change(function() {
      change_jewerly();
    }).change();
    $('select#calc_st_jewerly').change(function() {
      $statName = $(this);
      $opt = $(this).parents().eq(1).find('.ay, .ay-tm');
      $opt.prop('selectedIndex', 0);
      $gName = $(this).parents().eq(2).attr('class');
      if ($gName == 'gTM') {
        statTM();
        gearStat();
      } else if ($gName == 'gOption') {
        statOption();
        gearStat();
      }
    });
    $('select#calc_ench_j').change(function() {
      $enchName = $(this);
      $ench = $(this).parent().next().find('.ench-v');
      $ench.prop('selectedIndex', 0).find('optgroup').hide();
      if ($(this).children('option:selected').val() !== '')
        statEnchant();
    });
    $('select#calc_ench_j_tm').change(function() {
      $enchTMName = $(this);
      $ench = $(this).parent().next().find('.ench-v');
      $ench.prop('selectedIndex', 0).find('optgroup').hide();
      if ($(this).children('option:selected').val() !== '')
        statEnchantTM();
      $('#jewerly .gTM .opt-tm-ench').each(function() {
        $tmEnchF = $(this).find('#a0 .ench-n').children('option:selected').val();
        $tmEnchS = $(this).find('#b0 .ench-n').children('option:selected').val();
        $tmEnchT = $(this).find('#c0 .ench-n').children('option:selected').val();
        $(this).find('.ench-n').children().removeAttr('disabled');
        if ($tmEnchF !== '')
          $(this).find('#b0 .ench-n, #c0 .ench-n').children('[value="' + $tmEnchF + '"]').attr('disabled', 'disabled');
        if ($tmEnchS !== '')
          $(this).find('#a0 .ench-n, #c0 .ench-n').children('[value="' + $tmEnchS + '"]').attr('disabled', 'disabled');
        if ($tmEnchT !== '')
          $(this).find('#a0 .ench-n, #b0 .ench-n').children('[value="' + $tmEnchT + '"]').attr('disabled', 'disabled');
      });
    });
    $('select#calc_gear_orb').change(function() {
      change_orb();
    }).change();
    $('select#calc_st_orb').change(function() {
      $statName = $(this);
      $opt = $(this).parents().eq(1).find('.ay, .ay-tm');
      $opt.prop('selectedIndex', 0);
      $gName = $(this).parents().eq(2).attr('class');
      if ($gName == 'gTM') {
        statTM();
        gearStat();
      } else if ($gName == 'gOption') {
        statOption();
        gearStat();
      }
    });
    $('select#calc_ench_orb').change(function() {
      $enchName = $(this);
      $ench = $(this).parent().next().find('.ench-v');
      $ench.prop('selectedIndex', 0).find('optgroup').hide();
      if ($(this).children('option:selected').val() !== '')
        statEnchant();
    });
    $('select#calc_ench_orb_tm').change(function() {
      $enchTMName = $(this);
      $ench = $(this).parent().next().find('.ench-v');
      $ench.prop('selectedIndex', 0).find('optgroup').hide();
      if ($(this).children('option:selected').val() !== '')
        statEnchantTM();
      $('#_orb .gTM .opt-tm-ench').each(function() {
        $tmEnchF = $(this).find('#a0 .ench-n').children('option:selected').val();
        $tmEnchS = $(this).find('#b0 .ench-n').children('option:selected').val();
        $tmEnchT = $(this).find('#c0 .ench-n').children('option:selected').val();
        $(this).find('.ench-n').children().removeAttr('disabled');
        if ($tmEnchF !== '')
          $(this).find('#b0 .ench-n, #c0 .ench-n').children('[value="' + $tmEnchF + '"]').attr('disabled', 'disabled');
        if ($tmEnchS !== '')
          $(this).find('#a0 .ench-n, #c0 .ench-n').children('[value="' + $tmEnchS + '"]').attr('disabled', 'disabled');
        if ($tmEnchT !== '')
          $(this).find('#a0 .ench-n, #b0 .ench-n').children('[value="' + $tmEnchT + '"]').attr('disabled', 'disabled');
      });
    });
    $('select#calc_gear_artifact').change(function() {
      change_art();
    }).change();
    function weaponATK() {
      $uwStat = $('#greyATK').text();
      $starW = $('#uw').find('.active').next('input').val();
      $gearWeaponType = $('#calc_gear_weapon').children('option:selected').val();
      if ($gearWeaponType == 'Unique') {
        if ($starW == 0)
          $('#wea').text($uwStat);
        else if ($starW == 1)
          if (($heroClass == 2) || ($heroClass == 4) || ($heroClass == 6) || ($heroClass == 7))
            $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.1) - 1);
          else
            $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.1));
        else if ($starW == 2)
          if ($heroClass == 5)
            $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.3) + 1);
          else
            $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.3));
        else if ($starW == 3)
          if (($heroClass == 2) || ($heroClass == 3) || ($heroClass == 4))
            $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.6) - 1);
          else if (($heroClass == 6) || ($heroClass == 7))
            $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.6) - 2);
          else
            $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.6));
        else if ($starW == 4)
          if (($heroClass == 6) || ($heroClass == 7))
            $('#wea').text(2*Math.trunc(parseInt($uwStat)*0.999995) - 1);
          else if ($heroClass == 5)
            $('#wea').text(2*Math.trunc(parseInt($uwStat)*0.999995) + 1);
          else
            $('#wea').text(2*Math.trunc(parseInt($uwStat)*0.999995));
        else if ($starW == 5)
          if (($heroClass == 4) || ($heroClass == 6) || ($heroClass == 7))
            $('#wea').text(2*Math.trunc(parseInt($uwStat)*0.999995) + Math.trunc(parseInt($uwStat)/2) - 1);
          else
            $('#wea').text(2*Math.trunc(parseInt($uwStat)*0.999995) + Math.trunc(parseInt($uwStat)/2));
      } else if ($gearWeaponType == 'Class') {
        if ($starW == 0)
          $('#wea').text($uwStat);
        else if ($starW == 1)
          if (($heroClass == 5))
            $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.1) + 1);
          else if (($heroClass == 2) || ($heroClass == 3) || ($heroClass == 6) || ($heroClass == 7))
            $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.1) - 1);
          else
            $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.1));
        else if ($starW == 2)
          if ($heroClass == 1)
            $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.25) + 1);
          else if (($heroClass == 6) || ($heroClass == 7))
            $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.25) - 1);
          else
            $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.25));
        else if ($starW == 3)
          if ($heroClass == 1)
            $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.45) + 1);
          else
            $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.45));
        else if ($starW == 4)
          if (($heroClass == 1) || ($heroClass == 3) || ($heroClass == 4))
            $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.7) - 1);
          else if (($heroClass == 2) || ($heroClass == 6) || ($heroClass == 7))
            $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.7) - 2);
          else
            $('#wea').text(parseInt($uwStat) + Math.trunc(parseInt($uwStat)*0.7));
        else if ($starW == 5)
          if (($heroClass == 2) || ($heroClass == 3) || ($heroClass == 6) || ($heroClass == 7))
            $('#wea').text(2*parseInt($uwStat) - 2);
          else if ($heroClass == 4)
            $('#wea').text(2*parseInt($uwStat) - 1);
          else if ($heroClass == 5)
            $('#wea').text(2*parseInt($uwStat) + 1);
          else
            $('#wea').text(2*parseInt($uwStat));
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
      (($armorSet == 'Reclaimed Perseverance') || ($armorSet == 'Reclaimed Hope') || ($armorSet == 'Reclaimed Authority') || ($armorSet == 'Perseverance') || ($armorSet == 'Hope') || ($armorSet == 'Authority')) ? $armorTM = true : $armorTM = false;
      if (($armorSet == 'Reclaimed Perseverance') || ($armorSet == 'Reclaimed Hope') || ($armorSet == 'Reclaimed Authority')) {
        if ($starAr == 0)
          $('#arm').text($arStat);
        else if ($starAr == 1)
          if (($heroClass == 6) || ($heroClass == 7))
            $('#arm').text(parseInt($arStat) + Math.trunc(parseInt($arStat)*0.05) + 1);
          else
            $('#arm').text(parseInt($arStat) + Math.trunc(parseInt($arStat)*0.05));
        else if ($starAr == 2)
          if (($heroClass == 3) || ($heroClass == 4) || ($heroClass == 5) || ($heroClass == 6) || ($heroClass == 7))
            $('#arm').text(parseInt($arStat) + Math.trunc(parseInt($arStat)*0.1) + 1);
          else
            $('#arm').text(parseInt($arStat) + Math.trunc(parseInt($arStat)*0.1));
        else if ($starAr == 3)
          if (($heroClass == 6) || ($heroClass == 7))
            $('#arm').text(parseInt($arStat) + Math.trunc(parseInt($arStat)*0.15) + 1);
          else
            $('#arm').text(parseInt($arStat) + Math.trunc(parseInt($arStat)*0.15));
        else if ($starAr == 4)
          if (($heroClass == 3) || ($heroClass == 4) || ($heroClass == 5) || ($heroClass == 6) || ($heroClass == 7))
            $('#arm').text(parseInt($arStat) + Math.trunc(parseInt($arStat)*0.2) + 1);
          else
            $('#arm').text(parseInt($arStat) + Math.trunc(parseInt($arStat)*0.2));
        else if ($starAr == 5)
          if (($heroClass == 6) || ($heroClass == 7))
            $('#arm').text(parseInt($arStat) + Math.trunc(parseInt($arStat)*0.25) + 1);
          else
            $('#arm').text(parseInt($arStat) + Math.trunc(parseInt($arStat)*0.25));
      } else if (($armorSet == 'Perseverance') || ($armorSet == 'Hope') || ($armorSet == 'Authority')) {
        if ($starAr == 0)
          $('#arm').text($arStat);
        else if ($starAr == 1)
          if (($heroClass == 6) || ($heroClass == 7))
            $('#arm').text(parseInt($arStat) + Math.trunc(parseInt($arStat)*0.05) + 1);
          else
            $('#arm').text(parseInt($arStat) + Math.trunc(parseInt($arStat)*0.05));
        else if ($starAr == 2)
          if (($heroClass == 6) || ($heroClass == 7))
            $('#arm').text(parseInt($arStat) + Math.trunc(parseInt($arStat)*0.1) + 1);
          else
            $('#arm').text(parseInt($arStat) + Math.trunc(parseInt($arStat)*0.1));
        else if ($starAr == 3)
          if (($heroClass == 6) || ($heroClass == 7))
            $('#arm').text(parseInt($arStat) + Math.trunc(parseInt($arStat)*0.15) + 1);
          else
            $('#arm').text(parseInt($arStat) + Math.trunc(parseInt($arStat)*0.15));
        else if ($starAr == 4)
          if (($heroClass == 6) || ($heroClass == 7))
            $('#arm').text(parseInt($arStat) + Math.trunc(parseInt($arStat)*0.2) + 1);
          else
            $('#arm').text(parseInt($arStat) + Math.trunc(parseInt($arStat)*0.2));
        else if ($starAr == 5)
          if (($heroClass == 3) || ($heroClass == 4) || ($heroClass == 5) || ($heroClass == 6) || ($heroClass == 7))
            $('#arm').text(parseInt($arStat) + Math.trunc(parseInt($arStat)*0.25) + 1);
          else
            $('#arm').text(parseInt($arStat) + Math.trunc(parseInt($arStat)*0.25));
      } else {
        if ($starAr == 0)
          $('#arm').text($arStat);
        else if ($starAr == 1)
          $('#arm').text(parseInt($arStat) + Math.trunc(parseInt($arStat)*0.1) + 1);
        else if ($starAr == 2)
          $('#arm').text(parseInt($arStat) + Math.trunc(parseInt($arStat)*0.25) + 1);
        else if ($starAr == 3)
          if (($heroClass == 3) || ($heroClass == 4) || ($heroClass == 5))
            $('#arm').text(parseInt($arStat) + Math.trunc(parseInt($arStat)*0.45));
          else
            $('#arm').text(parseInt($arStat) + Math.trunc(parseInt($arStat)*0.45) + 1);
        else if ($starAr == 4)
          if (($heroClass == 6) || ($heroClass == 7))
            $('#arm').text(parseInt($arStat) + Math.trunc(parseInt($arStat)*0.7));
          else
            $('#arm').text(parseInt($arStat) + Math.trunc(parseInt($arStat)*0.7) + 1);
        else if ($starAr == 5)
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
      (($secondarySet == 'Reclaimed Perseverance') || ($secondarySet == 'Reclaimed Hope') || ($secondarySet == 'Reclaimed Authority') || ($secondarySet == 'Perseverance') || ($secondarySet == 'Hope') || ($secondarySet == 'Authority')) ? $secondaryTM = true : $secondaryTM = false;
      if (($secondarySet == 'Reclaimed Perseverance') || ($secondarySet == 'Reclaimed Hope') || ($secondarySet == 'Reclaimed Authority')) {
        if ($starSe == 0)
          $('#sec').text($sgStat);
        else if ($starSe == 1)
          if (($heroClass == 3) || ($heroClass == 4) || ($heroClass == 5))
            $('#sec').text(parseInt($sgStat) + Math.trunc(parseInt($sgStat)*0.05) + 1);
          else
            $('#sec').text(parseInt($sgStat) + Math.trunc(parseInt($sgStat)*0.05));
        else if ($starSe == 2)
          if (($heroClass == 3) || ($heroClass == 4) || ($heroClass == 5) || ($heroClass == 6) || ($heroClass == 7))
            $('#sec').text(parseInt($sgStat) + Math.trunc(parseInt($sgStat)*0.1) + 1);
          else
            $('#sec').text(parseInt($sgStat) + Math.trunc(parseInt($sgStat)*0.1));
        else if ($starSe == 3)
          if (($heroClass == 3) || ($heroClass == 4) || ($heroClass == 5))
            $('#sec').text(parseInt($sgStat) + Math.trunc(parseInt($sgStat)*0.15) + 1);
          else
            $('#sec').text(parseInt($sgStat) + Math.trunc(parseInt($sgStat)*0.15));
        else if ($starSe == 4)
          if (($heroClass == 3) || ($heroClass == 4) || ($heroClass == 5) || ($heroClass == 6) || ($heroClass == 7))
            $('#sec').text(parseInt($sgStat) + Math.trunc(parseInt($sgStat)*0.2) + 1);
          else
            $('#sec').text(parseInt($sgStat) + Math.trunc(parseInt($sgStat)*0.2));
        else if ($starSe == 5)
          if (($heroClass == 3) || ($heroClass == 4) || ($heroClass == 5))
            $('#sec').text(parseInt($sgStat) + Math.trunc(parseInt($sgStat)*0.25) + 1);
          else
            $('#sec').text(parseInt($sgStat) + Math.trunc(parseInt($sgStat)*0.25));
      } else if (($secondarySet == 'Perseverance') || ($secondarySet == 'Hope') || ($secondarySet == 'Authority')) {
        if ($starSe == 0)
          $('#sec').text($sgStat);
        else if ($starSe == 1)
          if (($heroClass == 3) || ($heroClass == 4) || ($heroClass == 5))
            $('#sec').text(parseInt($sgStat) + Math.trunc(parseInt($sgStat)*0.05) + 1);
          else
            $('#sec').text(parseInt($sgStat) + Math.trunc(parseInt($sgStat)*0.05));
        else if ($starSe == 2)
          if (($heroClass == 3) || ($heroClass == 4) || ($heroClass == 5))
            $('#sec').text(parseInt($sgStat) + Math.trunc(parseInt($sgStat)*0.1) + 1);
          else
            $('#sec').text(parseInt($sgStat) + Math.trunc(parseInt($sgStat)*0.1));
        else if ($starSe == 3)
          if (($heroClass == 3) || ($heroClass == 4) || ($heroClass == 5))
            $('#sec').text(parseInt($sgStat) + Math.trunc(parseInt($sgStat)*0.15) + 1);
          else
            $('#sec').text(parseInt($sgStat) + Math.trunc(parseInt($sgStat)*0.15));
        else if ($starSe == 4)
          if (($heroClass == 3) || ($heroClass == 4) || ($heroClass == 5))
            $('#sec').text(parseInt($sgStat) + Math.trunc(parseInt($sgStat)*0.2) + 1);
          else
            $('#sec').text(parseInt($sgStat) + Math.trunc(parseInt($sgStat)*0.2));
        else if ($starSe == 5)
          if (($heroClass == 3) || ($heroClass == 4) || ($heroClass == 5) || ($heroClass == 6) || ($heroClass == 7))
            $('#sec').text(parseInt($sgStat) + Math.trunc(parseInt($sgStat)*0.25) + 1);
          else
            $('#sec').text(parseInt($sgStat) + Math.trunc(parseInt($sgStat)*0.25));
      } else {
        if ($starSe == 0)
          $('#sec').text($sgStat);
        else if ($starSe == 1)
          $('#sec').text(parseInt($sgStat) + Math.trunc(parseInt($sgStat)*0.1) + 1);
        else if ($starSe == 2)
          $('#sec').text(parseInt($sgStat) + Math.trunc(parseInt($sgStat)*0.25) + 1);
        else if ($starSe == 3)
          if (($heroClass == 6) || ($heroClass == 7))
            $('#sec').text(parseInt($sgStat) + Math.trunc(parseInt($sgStat)*0.45));
          else
            $('#sec').text(parseInt($sgStat) + Math.trunc(parseInt($sgStat)*0.45) + 1);
        else if ($starSe == 4)
          if (($heroClass == 3) || ($heroClass == 4) || ($heroClass == 5))
            $('#sec').text(parseInt($sgStat) + Math.trunc(parseInt($sgStat)*0.7));
          else
            $('#sec').text(parseInt($sgStat) + Math.trunc(parseInt($sgStat)*0.7) + 1);
        else if ($starSe == 5)
          if (($heroClass == 3) || ($heroClass == 4) || ($heroClass == 5))
            $('#sec').text(2*Math.trunc(parseInt($sgStat)));
          else
            $('#sec').text(2*Math.trunc(parseInt($sgStat)) + 1);
      }
    };
    function armorJ() {
      $acStat = $('#greyJ').text();
      $starJ = $('#ac').find('.active').next('input').val();
      if ($('#calc_gear_jewelry').children('option:selected').val() == '- - - - - - - - - -')
        $jewelSet = $('#calc_gear_jewelry').children('option:selected').val();
      else {
        $jewelSet = $('#calc_gear_jewelry').children().children('option:selected').val();
        if ($('#calc_gear_jewelry').children().children('option:selected').parent().attr('label') !== null)
          $jewelType = $('#calc_gear_jewelry').children().children('option:selected').parent().attr('label');
      }
      (($jewelSet == 'Reclaimed Perseverance') || ($jewelSet == 'Reclaimed Hope') || ($jewelSet == 'Reclaimed Authority') || ($jewelSet == 'Perseverance') || ($jewelSet == 'Hope') || ($jewelSet == 'Authority')) ? $jTM = true : $jTM = false;
      if (($jewelSet == 'Reclaimed Perseverance') || ($jewelSet == 'Reclaimed Hope') || ($jewelSet == 'Reclaimed Authority')) {
        if ($jewelType == 'Ring') {
          if ($starJ == 0)
            $('#acc').text($acStat);
          else if ($starJ == 1)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.05));
          else if ($starJ == 2)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.1));
          else if ($starJ == 3)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.15));
          else if ($starJ == 4)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.2));
          else if ($starJ == 5)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.25));
        } else if ($jewelType == 'Earrings') {
          if ($starJ == 0)
            $('#acc').text($acStat);
          else if ($starJ == 1)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.05));
          else if ($starJ == 2)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.1) + 1);
          else if ($starJ == 3)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.15));
          else if ($starJ == 4)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.2) + 1);
          else if ($starJ == 5)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.25) + 1);
        } else if (($jewelType == 'Bracelet') || ($jewelType == 'Necklace')) {
          if ($starJ == 0)
            $('#acc').text($acStat);
          else if ($starJ == 1)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.05));
          else if ($starJ == 2)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.1) + 1);
          else if ($starJ == 3)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.15));
          else if ($starJ == 4)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.2) + 1);
          else if ($starJ == 5)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.25));
          }
      } else if (($jewelSet == 'Perseverance') || ($jewelSet == 'Hope') || ($jewelSet == 'Authority')) {
        if ($jewelType == 'Ring') {
          if ($starJ == 0)
            $('#acc').text($acStat);
          else if ($starJ == 1)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.05) + 1);
          else if ($starJ == 2)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.1) + 1);
          else if ($starJ == 3)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.15) + 1);
          else if ($starJ == 4)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.2) + 1);
          else if ($starJ == 5)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.25) + 1);
        } else if ($jewelType == 'Earrings') {
          if ($starJ == 0)
            $('#acc').text($acStat);
          else if ($starJ == 1)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.05));
          else if ($starJ == 2)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.1));
          else if ($starJ == 3)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.15));
          else if ($starJ == 4)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.2));
          else if ($starJ == 5)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.25));
        } else if (($jewelType == 'Bracelet') || ($jewelType == 'Necklace')) {
          if ($starJ == 0)
            $('#acc').text($acStat);
          else if ($starJ == 1)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.05));
          else if ($starJ == 2)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.1));
          else if ($starJ == 3)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.15));
          else if ($starJ == 4)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.2));
          else if ($starJ == 5)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.25) + 1);
        }
      } else if ($jewelSet == '- - - - - - - - - -') {
        // console.log('PEW-PEW');
      } else {
        if ($jewelType == 'Ring') {
          if ($starJ == 0)
            $('#acc').text($acStat);
          else if ($starJ == 1)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.1) + 1);
          else if ($starJ == 2)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.2) + 1);
          else if ($starJ == 3)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.3));
          else if ($starJ == 4)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.4));
          else if ($starJ == 5)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.5));
        } else if ($jewelType == 'Earrings') {
          if ($starJ == 0)
            $('#acc').text($acStat);
          else if ($starJ == 1)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.1));
          else if ($starJ == 2)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.2));
          else if ($starJ == 3)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.3) + 1);
          else if ($starJ == 4)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.4) + 1);
          else if ($starJ == 5)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.5) + 1);
        } else if (($jewelType == 'Bracelet') || ($jewelType == 'Necklace')) {
          if ($starJ == 0)
            $('#acc').text($acStat);
          else if ($starJ == 1)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.1) + 1);
          else if ($starJ == 2)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.25) + 1);
          else if ($starJ == 3)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.45));
          else if ($starJ == 4)
            $('#acc').text(parseInt($acStat) + Math.trunc(parseInt($acStat)*0.7) + 1);
          else if ($starJ == 5)
            $('#acc').text(2*Math.trunc(parseInt($acStat)) + 1);
        }
      }
    };
    function armorO() {
      $orStat = $('#greyO').text();
      $starO = $('#or').find('.active').next('input').val();
      $orbSet = $('#calc_gear_orb').children('option:selected').val();
      (($orbSet == 'Reclaimed Perseverance') || ($orbSet == 'Reclaimed Hope') || ($orbSet == 'Reclaimed Authority') || ($orbSet == 'Perseverance') || ($orbSet == 'Hope') || ($orbSet == 'Authority')) ? $orbTM = true : $orbTM = false;
      if (($orbSet == 'Reclaimed Perseverance') || ($orbSet == 'Reclaimed Hope') || ($orbSet == 'Reclaimed Authority')) {
        if ($starO == 0)
          $('#orb').text($orStat);
        else if ($starO == 1)
          $('#orb').text(parseInt($orStat) + Math.trunc(parseInt($orStat)*0.05));
        else if ($starO == 2)
          $('#orb').text(parseInt($orStat) + Math.trunc(parseInt($orStat)*0.1));
        else if ($starO == 3)
          $('#orb').text(parseInt($orStat) + Math.trunc(parseInt($orStat)*0.15));
        else if ($starO == 4)
          $('#orb').text(parseInt($orStat) + Math.trunc(parseInt($orStat)*0.2));
        else if ($starO == 5)
          $('#orb').text(parseInt($orStat) + Math.trunc(parseInt($orStat)*0.25));
      } else if (($orbSet == 'Perseverance') || ($orbSet == 'Hope') || ($orbSet == 'Authority')) {
        if ($starO == 0)
          $('#orb').text($orStat);
        else if ($starO == 1)
          $('#orb').text(parseInt($orStat) + Math.trunc(parseInt($orStat)*0.05) + 1);
        else if ($starO == 2)
          $('#orb').text(parseInt($orStat) + Math.trunc(parseInt($orStat)*0.1) + 1);
        else if ($starO == 3)
          $('#orb').text(parseInt($orStat) + Math.trunc(parseInt($orStat)*0.15) + 1);
        else if ($starO == 4)
          $('#orb').text(parseInt($orStat) + Math.trunc(parseInt($orStat)*0.2) + 1);
        else if ($starO == 5)
          $('#orb').text(parseInt($orStat) + Math.trunc(parseInt($orStat)*0.25) + 1);
      } else {
        if ($starO == 0)
          $('#orb').text($orStat);
        else if ($starO == 1)
          $('#orb').text(parseInt($orStat) + Math.trunc(parseInt($orStat)*0.1) + 1);
        else if ($starO == 2)
          $('#orb').text(parseInt($orStat) + Math.trunc(parseInt($orStat)*0.2) + 1);
        else if ($starO == 3)
          $('#orb').text(parseInt($orStat) + Math.trunc(parseInt($orStat)*0.3));
        else if ($starO == 4)
          $('#orb').text(parseInt($orStat) + Math.trunc(parseInt($orStat)*0.4));
        else if ($starO == 5)
          $('#orb').text(parseInt($orStat) + Math.trunc(parseInt($orStat)*0.5));
      }
    };
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
        return $(this).text() === 'P.DEF'
      }).next('p').text();
      $classMDEF = $('.class-stats').find('p').filter(function() {
        return $(this).text() === 'M.DEF'
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
        return $(this).text() === 'P.DEF'
      }).next('p');
      $totalM = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'M.DEF'
      }).next('p');
      if ($jewelSet !== '- - - - - - - - - -') {
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
      }
      $totalO = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'MAX HP'
      }).next('p');

      if ($jewelSet !== '- - - - - - - - - -')
        $jewelType == 'Earrings' ? $sumAtk = parseInt($classATK) + parseInt($gearA) + parseInt($gearJ) + parseInt($('#range-atk').text()) : $sumAtk = parseInt($classATK) + parseInt($gearA) + parseInt($('#range-atk').text());
      else
        $sumAtk = parseInt($classATK) + parseInt($gearA) + parseInt($('#range-atk').text());
      $opA = $('p[name="ATK"]').text();
      $opA === '' ? $totalA.text($sumAtk + ' (' + $classATK + '+' + ($sumAtk - $classATK) + ')') : $totalA.text(Math.trunc($sumAtk * ($opA / 100 + 1)) + ' (' + $classATK + '+' + (Math.trunc($sumAtk * ($opA / 100 + 1)) - $classATK) + ')');

      if ($jewelSet !== '- - - - - - - - - -')
        $jewelType == 'Ring' ? $sumTre = parseInt($classHP) + parseInt($gearTr) + parseInt($gearJ) + parseInt($gearO) + parseInt($('#range-hp').text()) : $sumTre = parseInt($classHP) + parseInt($gearTr) + parseInt($gearO) + parseInt($('#range-hp').text());
      else
        $sumTre = parseInt($classHP) + parseInt($gearTr) + parseInt($gearO) + parseInt($('#range-hp').text());
      $opH = $('p[name="Max HP"]').text();
      $opH === '' ? $totalH.text($sumTre + ' (' + $classHP + '+' + ($sumTre - $classHP) + ')') : $totalH.text(Math.round($sumTre * ($opH / 100 + 1)) + ' (' + $classHP + '+' + (Math.round($sumTre * ($opH / 100 + 1)) - $classHP) + ')');
      $('#heroHP').text($totalH.text());
      $('#heroHPs').text($totalH.text().split(' ')[0]);

      if ($armorSet !== '- - - - - - - - - -') {
        $sumArm = parseInt($classPDEF) + parseInt($gearP) + parseInt($gearJ);
        if ($gearP !== 0) {
          if ($jewelSet !== '- - - - - - - - - -') {
            if ($jewelType == 'Bracelet')
              $gearJ == 0 ? $totalP.text($sumArm + ' (' + $classPDEF + '+' + $gearP + ')') : $totalP.text($sumArm + ' (' + $classPDEF + '+' + ($gearP + $gearJ) + ')');
            else
              $totalP.text(($classPDEF + $gearP) + ' (' + $classPDEF + '+' + $gearP + ')');
          }
        }
      } else
        $totalP.text($classPDEF);

      if ($secondarySet !== '- - - - - - - - - -') {
        $sumSec = parseInt($classMDEF) + parseInt($gearM) + parseInt($gearJ);
        if ($gearM !== 0) {
          if ($jewelSet !== '- - - - - - - - - -') {
            if ($jewelType == 'Necklace')
              $gearJ == 0 ? $totalM.text($sumSec + parseInt($gearM) + ' (' + $classMDEF + '+' + $gearM + ')') : $totalM.text($sumSec + ' (' + $classMDEF + '+' + (parseInt($gearM) + parseInt($gearJ)) + ')');
            else
              $totalM.text(($classMDEF + $gearM) + ' (' + $classMDEF + '+' + $gearM + ')');
          }
        }
      } else
        $totalM.text($classMDEF);

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
            $opJ === '' ? $totalJ.text($sumAcc + ' (' + $classATK + '+' + ($sumAcc - $classATK) + ')') : $totalJ.text(Math.trunc($sumAcc * ($opJ / 100 + 1)) + ' (' + $classATK + '+' + (Math.trunc($sumAcc * ($opJ / 100 + 1)) - $classATK) + ')');
          } else if ($jewelType == 'Necklace') {
            $opJ = $('p[name="M.DEF"]').text();
            $opJ === '' ? $totalJ.text($sumAcc + ' (' + $classMDEF + '+' + ($sumAcc - $classMDEF) + ')') : $totalJ.text(Math.round($sumAcc * ($opJ / 100 + 1)) + ' (' + $classMDEF + '+' + (Math.round($sumAcc * ($opJ / 100 + 1)) - $classMDEF) + ')');
          } else if ($jewelType == 'Bracelet') {
            $opJ = $('p[name="P.DEF"]').text();
            $opJ === '' ? $totalJ.text($sumAcc + ' (' + $classPDEF + '+' + ($sumAcc - $classPDEF) + ')') : $totalJ.text(Math.round($sumAcc * ($opJ / 100 + 1)) + ' (' + $classPDEF + '+' + (Math.round($sumAcc * ($opJ / 100 + 1)) - $classPDEF) + ')');
          }
        }
      }

      if ($jewelSet !== '- - - - - - - - - -')
        $jewelType == 'Ring' ? $sumOrb = parseInt($classHP) + parseInt($gearTr) + parseInt($gearJ) + parseInt($gearO) + parseInt($('#range-hp').text()) : $sumOrb = parseInt($classHP) + parseInt($gearTr) + parseInt($gearO) + parseInt($('#range-hp').text());
      else
        $sumOrb = parseInt($classHP) + parseInt($gearTr) + parseInt($gearO) + parseInt($('#range-hp').text());
      $opO = $('p[name="Max HP"]').text();
      $opO === '' ? $totalO.text($sumOrb + ' (' + $classHP + '+' + ($sumOrb - $classHP) + ')') : $totalO.text(Math.round($sumOrb * ($opO / 100 + 1)) + ' (' + Math.round($classHP + '+' + ($sumOrb * ($opO / 100 + 1)) - $classHP) + ')');
      $('#heroHP').text($totalO.text());
      $('#heroHPs').text($totalO.text().split(' ')[0]);
    };
    function gearSet() {
      $setBonus = $('.t-total .r-stats').find('p').filter(function() {
        return $(this).text() === 'Set Bonus'
      }).next('p');
      if (!$setBonus.length)
        $setBonus = $('.t-total .r-stats').append('<div class="statSet"><div class="r-set"><p id="s-name">Set Bonus</p><p id="sb"><span id="f1">2 Set: Crit +100</span><span id="f2">4 Set: Crit +130</span><span id="fr1">2 Set: Max HP +10%</span><span id="fr2">4 Set: Max HP +13%</span><span id="p1">2 Set: Crit Resistance +100</span><span id="p2">4 Set: Crit Resistance +130</span><span id="d1">2 Set: MP Recovery/Attack +200</span><span id="d2">4 Set: MP Recovery/Attack +260</span><span id="la1">2 Set: Crit DMG +20%</span><span id="la2">4 Set: Crit DMG +26%</span><span id="le1">2 Set: Debuff ACC +100</span><span id="le2">4 Set: Debuff ACC +130</span><span id="s1">2 Set: Increases DMG to Heroes by 7%</span><span id="s2">4 Set: Increases DMG to Heroes by 13%</span><span id="pr1">2 Set: Reduces DMG recevied from Heroes by 6%</span><span id="pr2">4 Set: Reduces DMG recevied from Heroes by 11%</span><span id="dl1">2 Set: Increases Crit DMG of all allies by 5%</span><span id="dl2">4 Set: Increases Crit DMG of all allies by 8%</span><span id="ch1">2 Set: Hero deals 12% more DMG and takes 12% less DMG from bosses</span><span id="ch2">4 Set: Hero deals 15% more DMG and takes 15% less DMG from bosses</span><span id="t1">2 Set: Increases DMG dealt to enemies by 2%\n This effect increases by 4 times in the Technomagic Kingdom</span><span id="t2">4 Set: Increases DMG dealt to enemies by 3%\n This effect increases by 4 times in the Technomagic Kingdom</span><span id="per1">4 Set: Increases DMG dealt to enemies by 10% and takes 10% reduces All DMG. This effect increases up to max 20% over 50 sec.</span><span id="per2">4 Set: Increases DMG dealt to enemies by 10% and ATK by 10%. This effect increases up to max 25% over 100 sec.</span><span id="per3">4 Set: Increases DMG dealt to enemies by 10% and ATK by 10%. This effect increases up to max 25% over 100 sec.</span><span id="per4">4 Set: Increases DMG dealt to enemies by 10% and ATK by 10%. This effect increases up to max 25% over 100 sec.</span><span id="per5">4 Set: Increases DMG dealt to enemies by 10% and Crit DMG by 20%. This effect increases DMG dealt to enemies up to max 25%, and Crit DMG up to max 50% over 100 sec.</span><span id="per6">4 Set: Increases DMG dealt to enemies by 10% and Crit DMG by 20%. This effect increases DMG dealt to enemies up to max 25%, and Crit DMG up to max 50% over 100 sec.</span><span id="per7">4 Set: Increases the amount of own Heal Rate effects by 25% and Shield by 25%.</span><span id="hop1">4 Set: Increases all allies All DEF by 10% and ATK by 5%.</span><span id="hop2">4 Set: Increases ATK Spd of all allies by 100. The effect multiplies by 2 for melee type Heroes.</span><span id="hop3">4 Set: Increases Crit DMG by 40%. Upon Skill use, recovers 300 Mana, and additionally increases Crit DMG by 40% for 3 sec.</span><span id="hop4">4 Set: Increases Crit DMG of all allies by 20%. This effect multiplies by 2 for ranged type Heroes.</span><span id="hop5">4 Set: Recovers all allies Mana by 500 and reduces Cooldown of all Skills by 0.5 sec every 10 sec.</span><span id="hop6">4 Set: Increases all allies DMG dealt to enemies by 2%. After 30 sec, increases the effect of 1 ally who dealt the highest DMG to enemies by 4 times.</span><span id="hop7">4 Set: Increases Heal Rate of all allies by 6%. After 5 sec, increases Mana Recovery of all allies by 6%.</span><span id="aut1">4 Set: Increases own All Block Chance by 300. Upon successful Block, reduces Cooldown of all Skills by 1 sec. This effect activates only once every 2.5 sec.</span><span id="aut2">4 Set: Increases own Max HP by 30%. For 1 time only during the battle, recovers 30% of Max HP and permanently increases ATK Spd by 300 if own HP percentage falls below 50%.</span><span id="aut3">4 Set: Increases own DEF Penetration by 250 and DMG that ignores DEF by 12%. By killing an enemy, additionally increases DEF Penetration by 250 and DMG that ignores DEF by 12%.</span><span id="aut4">4 Set: Increases own ATK by 25%. At the beginning of each battle, this effect multiplies by 2 for 20 sec.</span><span id="aut5">4 Set: Increases own Crit Chance by 300. If own Crit Chance is over 1400, all hits becomes a Crit Hit.</span><span id="aut6">4 Set: After fully recovering Mana for the first time, increases Mana Recovery by 20% and ATK by 40%.</span><span id="aut7">4 Set: Increases ATK of all allies by 10%.</span></p></div></div>');
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

      $f = 0;$fr = 0;$p = 0;$d = 0;$la = 0;$le = 0;$ch = 0;$s = 0;$pr = 0;$dl = 0;$t = 0;$tmP = 0;$tmH = 0;$tmA = 0;
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
        else if ($(this).is(':contains("Perseverance")'))
          $tmP++;
        else if ($(this).is(':contains("Hope")'))
          $tmH++;
        else if ($(this).is(':contains("Authority")'))
          $tmA++;
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
      } else if ($f == 4) {
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
        $tCritDMG.text($sumCritD + '%' + ' (' + $statCritD.text() + '%+' + ($sumCritD - $statCritD.text()) + '%)');

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

      if ($tmP == 4)
        $setBonus.find('#per' + $heroClass).show();
      if ($tmH == 4)
        $setBonus.find('#hop' + $heroClass).show();
      if ($tmA == 4)
        $setBonus.find('#aut' + $heroClass).show();

      statSplit();
    };
    function heroImg() {
      $('.hero-img').children().hide();
      $heroImg = $('#calc_char_id').children('option:selected').val();
      $('.hero-img').find('.hero-' + $heroImg).css('display', 'block');
    };
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
    $('.heroPerk .c-sub .c-perk img').click(function() {
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
    $('.perk-tp #tp-r').click(function() {
      $('.perk-tp p').css('color', 'black').text(0);
      $('.c-perk-img').find('img').removeClass('pick');
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
    };
    function statOption() {
      $('.opt').find($statName).each(function() {
        $(this).parent().next().children().find('option').not('.q').hide();
        $st = $(this).children('option:selected').text();
        if (($st == 'ATK') || ($st == 'Max HP') || ($st == 'DEF'))
          $(this).parent().next().children().find('.q1').show();
        else if (($st == 'MP Recovery/Sec') || ($st == 'Mana Recovery upon taking DMG'))
          $(this).parent().next().children().find('.q2').show();
        else if (($st == 'Crit DMG') || ($st == 'P.DEF') || ($st == 'M.DEF') || ($st == 'Recovery'))
          $(this).parent().next().children().find('.q3').show();
        else if (($st == 'ATK Spd') || ($st == 'Crit') || ($st == 'Lifesteal') || ($st == 'ACC') || ($st == 'Debuff ACC') || ($st == 'CC Resist') || ($st == 'Block') || ($st == 'Crit Resistance') || ($st == 'P.Dodge') || ($st == 'M.Dodge') || ($st == 'P.Tough') || ($st == 'M.Tough') || ($st == 'P.Resistance') || ($st == 'M.Resistance') || ($st == 'DMG Reduction upon P.Block') || ($st == 'DMG Reduction upon M.Block') || ($st == 'P.Block DEF') || ($st == 'M.Block DEF'))
          $(this).parent().next().children().find('.q4').show();
        else if (($st == 'MP Recovery/Attack') || ($st == 'P.Block') || ($st == 'M.Block') || ($st == 'P.Crit Resistance') || ($st == 'M.Crit Resistance'))
          $(this).parent().next().children().find('.q5').show();
        else if ($st == 'Penetration')
          $(this).parent().next().children().find('.q6').show();
        else if (($st == 'Dodge') || ($st == 'Tough') || ($st == 'Resistance') || ($st == 'DMG Reduction upon Block'))
          $(this).parent().next().children().find('.q7').show();
        else
          $(this).parent().next().children().find('.q').show();
      });
    };
    function statEnchant() {
      $emchTier = $enchName.parent().prev().children().children('option:selected').val();
      $('.opt-ench').find($enchName).each(function() {
        $(this).parent().next().find('option').hide();
        $('.opt-ench').find($enchName).each(function() {
          $stEnch = $(this).children('option:selected').val();
          if (($stEnch == 'ATK') || ($stEnch == 'Max HP') || ($stEnch == 'Mana Recovery upon taking DMG') || ($stEnch == 'Recovery'))
            $(this).parent().next().children().find('.q1').show();
          else if (($stEnch == 'Crit DMG') || ($stEnch == 'P.DEF') || ($stEnch == 'M.DEF'))
            $(this).parent().next().children().find('.q2').show();
          else if (($stEnch == 'ATK Spd') || ($stEnch == 'Crit') || ($stEnch == 'Lifesteal') || ($stEnch == 'ACC') || ($stEnch == 'Debuff ACC') || ($stEnch == 'CC Resist') || ($stEnch == 'P.Crit Resistance') || ($stEnch == 'M.Crit Resistance') || ($stEnch == 'P.Dodge') || ($stEnch == 'M.Dodge') || ($stEnch == 'P.Resistance') || ($stEnch == 'M.Resistance') || ($stEnch == 'Penetration'))
            $(this).parent().next().children().find('.q3').show();
          else if (($stEnch == 'P.Block') || ($stEnch == 'M.Block') || ($stEnch == 'DMG Reduction upon P.Block') || ($stEnch == 'DMG Reduction upon M.Block'))
            $(this).parent().next().children().find('.q4').show();
          else
            $(this).parent().next().children().find('.q').show();
        });
      });
    };
    function statEnchantTM() {
      $('.opt-ench').find($enchTMName).each(function() {
        $(this).parent().next().find('option').hide();
        $('.opt-ench').find($enchTMName).each(function() {
          $stEnch = $(this).children('option:selected').val();
          $tmEnch = $(this).attr('name');
          if (($stEnch == 'ATK') || ($stEnch == 'Max HP'))
            $(this).parent().next().children().find('.q1').show();
          else if (($stEnch == 'Crit DMG') || ($stEnch == 'P.DEF') || ($stEnch == 'M.DEF'))
            $(this).parent().next().children().find('.q2').show();
          else if ($stEnch == 'MP Recovery/Sec')
            $(this).parent().next().children().find('.q3').show();
          else if (($stEnch == 'ATK Spd') || ($stEnch == 'Crit') || ($stEnch == 'Lifesteal') || ($stEnch == 'ACC') || ($stEnch == 'Debuff ACC') || ($stEnch == 'CC Resist') || ($stEnch == 'P.Dodge') || ($stEnch == 'M.Dodge') || ($stEnch == 'Penetration'))
            $(this).parent().next().children().find('.q4').show();
          else if (($stEnch == 'P.Block') || ($stEnch == 'M.Block') || ($stEnch == 'P.Crit Resistance') || ($stEnch == 'M.Crit Resistance') || ($stEnch == 'MP Recovery/Attack'))
            $(this).parent().next().children().find('.q5').show();
          else
            $(this).parent().next().children().find('.q').show();
          if (($('[name="' + $tmEnch + '"]').parents().eq(4).attr('id') == 'armor') && ($armorTM == true) && ($stEnch == 'P.DEF')) {
            $(this).parent().next().children().find('.q2').hide();
            $(this).parent().next().children().find('.q6').show();
          }
          if (($('[name="' + $tmEnch + '"]').parents().eq(4).attr('id') == 'secondary') && ($secondaryTM == true) && ($stEnch == 'M.DEF')) {
            $(this).parent().next().children().find('.q2').hide();
            $(this).parent().next().children().find('.q6').show();
          }
          if ((($('[name="' + $tmEnch + '"]').parents().eq(4).attr('id') == 'jewerly') && ($jTM == true) && ($jewelType == 'Bracelet') && ($stEnch == 'P.DEF')) || (($('[name="' + $tmEnch + '"]').parents().eq(4).attr('id') == 'jewerly') && ($jTM == true) && ($jewelType == 'Necklace') && ($stEnch == 'M.DEF'))) {
            $(this).parent().next().children().find('.q2').hide();
            $(this).parent().next().children().find('.q6').show();
          }
          if ((($('[name="' + $tmEnch + '"]').parents().eq(4).attr('id') == 'jewerly') && ($jTM == true) && ($jewelType == 'Earrings') && ($stEnch == 'ATK')) || (($('[name="' + $tmEnch + '"]').parents().eq(4).attr('id') == 'jewerly') && ($jTM == true) && ($jewelType == 'Ring') && ($stEnch == 'Max HP'))) {
            $(this).parent().next().children().find('.q1').hide();
            $(this).parent().next().children().find('.q2').show();
          }
          if (($('[name="' + $tmEnch + '"]').parents().eq(4).attr('id') == '_orb') && ($orbTM == true) && ($('[name="' + $tmEnch + '"]').children('option:selected').val() == 'Max HP')) {
            $(this).parent().next().children().find('.q1').hide();
            $(this).parent().next().children().find('.q2').show();
          }
        });
      });
    };
    function statTM() {
      $('.opt').find($statName).each(function() {
        $(this).parent().next().children().find('option').not('.q').hide();
        $st = $(this).children('option:selected').text();
        if (($st == 'ATK') || ($st == 'Max HP'))
          $(this).parent().next().children().find('.q1').show();
        else if (($st == 'Crit DMG') || ($st == 'P.DEF') || ($st == 'M.DEF'))
          $(this).parent().next().children().find('.q2').show();
        else if ($st == 'MP Recovery/Sec')
          $(this).parent().next().children().find('.q3').show();
        else if (($st == 'ATK Spd') || ($st == 'Crit') || ($st == 'Penetration') || ($st == 'Lifesteal') || ($st == 'ACC') || ($st == 'Debuff ACC') || ($st == 'CC Resist') || ($st == 'P.Dodge') || ($st == 'M.Dodge'))
          $(this).parent().next().children().find('.q4').show();
        else if (($st == 'MP Recovery/Attack') || ($st == 'P.Block') || ($st == 'M.Block') || ($st == 'P.Crit Resistance') || ($st == 'M.Crit Resistance'))
          $(this).parent().next().children().find('.q5').show();
        else
          $(this).parent().next().children().find('.q').show();
      });
    };
    function statOptionTreasure() {
      $('.opt').find($statName).each(function() {
        $(this).parent().next().children().find('option').not('.q').hide();
        $stTr = $(this).children('option:selected').text();
        if (($stTr == 'ATK') || ($stTr == 'Max HP') || ($stTr == 'DEF'))
          $(this).parent().next().children().find('.q1').show();
        else if (($stTr == 'MP Recovery/Sec') || ($stTr == 'Mana Recovery upon taking DMG'))
          $(this).parent().next().children().find('.q2').show();
        else if (($stTr == 'Crit DMG') || ($stTr == 'P.DEF') || ($stTr == 'M.DEF') || ($stTr == 'Recovery'))
          $(this).parent().next().children().find('.q3').show();
        else if (($stTr == 'ATK Spd') || ($stTr == 'Crit') || ($stTr == 'Lifesteal') || ($stTr == 'ACC') || ($stTr == 'Debuff ACC') || ($stTr == 'CC Resist') || ($stTr == 'Block') || ($stTr == 'Crit Resistance') || ($stTr == 'P.Dodge') || ($stTr == 'M.Dodge') || ($stTr == 'P.Tough') || ($stTr == 'M.Tough') || ($stTr == 'P.Resistance') || ($stTr == 'M.Resistance') || ($stTr == 'DMG Reduction upon P.Block') || ($stTr == 'DMG Reduction upon M.Block') || ($stTr == 'P.Block DEF') || ($stTr == 'M.Block DEF') || ($stTr == 'Penetration'))
          $(this).parent().next().children().find('.q4').show();
        else if (($stTr == 'MP Recovery/Attack') || ($stTr == 'P.Block') || ($stTr == 'M.Block') || ($stTr == 'P.Crit Resistance') || ($stTr == 'M.Crit Resistance'))
          $(this).parent().next().children().find('.q5').show();
        else if (($stTr == 'Dodge') || ($stTr == 'Tough') || ($stTr == 'Resistance') || ($stTr == 'DMG Reduction upon Block'))
          $(this).parent().next().children().find('.q6').show();
        else
          $(this).parent().next().children().find('.q').show();
      });
    };
    function option() {
      $sAtk=0;$sAspd=0;$sCr=0;$sCrD=0;$sMPa=0;$sMPs=0;$sPen=0;$sLif=0;$sAcc=0;$sDAcc=0;$sHP=0;$sCC=0;$sBl=0;$sPBl=0;$sMBl=0;$sCR=0;$sPCR=0;$sMCR=0;$sDef=0;$sPDef=0;$sMDef=0;$sDod=0;$sPDod=0;$sMDod=0;$sTgh=0;$sPTgh=0;$sMTgh=0;$sRec=0;$sMRec=0;$sDRB=0;$sDRPB=0;$sDRMB=0;
      var x = 0;
      var y = 0;
      $('.t-op p').empty();
      $opN = $('.opt .ax').serializeArray();
      $.each($opN, function(iN, n) {
        $opV = $('.opt .ay').serializeArray()[iN];
        $('.totalStat').find('p[name="' + n.value + '"]').text() == '' ? $('.totalStat').find('p[name="' + n.value + '"]').text(parseFloat($opV.value)) : $('.totalStat').find('p[name="' + n.value + '"]').text(parseFloat($opV.value) + parseFloat($('.totalStat').find('p[name="' + n.value + '"]').text()));
        if (n.value == 'Resistance') {
          $sTgh += Number(parseFloat($opV.value));
          $('.totalStat').find('p[name="Tough"]').text($sTgh);
        } else if (n.value == 'P.Resistance') {
          $sPTgh += Number(parseFloat($opV.value));
          $('.totalStat').find('p[name="P.Tough"]').text($sPTgh);
        } else if (n.value == 'M.Resistance') {
          $sMTgh += Number(parseFloat($opV.value));
          $('.totalStat').find('p[name="M.Tough"]').text($sMTgh);
        } else if (n.value == 'DMG Reduction upon Block') {
          $sDRB += Number(parseFloat($opV.value));
          $('.totalStat').find('p[name="Block DEF"]').text($sDRB);
        } else if (n.value == 'DMG Reduction upon P.Block') {
          $sDRPB += Number(parseFloat($opV.value));
          $('.totalStat').find('p[name="P.Block DEF"]').text($sDRPB);
        } else if (n.value == 'DMG Reduction upon M.Block') {
          $sDRMB += Number(parseFloat($opV.value));
          $('.totalStat').find('p[name="M.Block DEF"]').text($sDRMB);
        }
      });
      $enchN = $('.ench-n').serializeArray();
      $.each($enchN, function(iN, n) {
        $enchV = $('.ench-v').serializeArray()[iN];
        $('.totalStat').find('p[name="' + n.value + '"]').text() == '' ? $('.totalStat').find('p[name="' + n.value + '"]').text(parseFloat($enchV.value)) : $('.totalStat').find('p[name="' + n.value + '"]').text(parseFloat($enchV.value) + parseFloat($('.totalStat').find('p[name="' + n.value + '"]').text()));
        if (n.value == 'P.Resistance') {
          $sPTgh += Number(parseFloat($enchV.value));
          $('.totalStat').find('p[name="P.Tough"]').text($sPTgh);
        } else if (n.value == 'M.Resistance') {
          $sMTgh += Number(parseFloat($enchV.value));
          $('.totalStat').find('p[name="M.Tough"]').text($sMTgh);
        } else if (n.value == 'DMG Reduction upon P.Block') {
          $sDRPB += Number(parseFloat($enchV.value));
          $('.totalStat').find('p[name="P.Block DEF"]').text($sDRPB);
        } else if (n.value == 'DMG Reduction upon M.Block') {
          $sDRMB += Number(parseFloat($enchV.value));
          $('.totalStat').find('p[name="M.Block DEF"]').text($sDRMB);
        }
      });
      $tmN = $('.opt .ax-tm').serializeArray();
      $.each($tmN, function(iN, n) {
        $tmV = $('.opt .ay-tm').serializeArray()[iN];
        $('.totalStat').find('p[name="' + n.value + '"]').text() == '' ? $('.totalStat').find('p[name="' + n.value + '"]').text(parseFloat($tmV.value)) : $('.totalStat').find('p[name="' + n.value + '"]').text(parseFloat($tmV.value) + parseFloat($('.totalStat').find('p[name="' + n.value + '"]').text()));
      });
      $runN = $('.opt .ax-r').serializeArray();
      $.each($runN, function(iN, n) {
        $runV = $('.opt .ay-r').serializeArray()[iN];
        x = parseFloat($runV.value.split(' / ').shift());
        y = parseFloat($runV.value.split(' / ').pop());
        if ($('[name="' + n.name + '"]').children('option:selected').attr('class') == 'all') {
          $('.totalStat').find('p[name="' + n.value.split(' / ').shift() + '"]').text() == '' ? $('.totalStat').find('p[name="' + n.value.split(' / ').shift() + '"]').text(x) : $('.totalStat').find('p[name="' + n.value.split(' / ').shift() + '"]').text(x + parseFloat($('.totalStat').find('p[name="' + n.value.split(' / ').shift() + '"]').text()));
          $('.totalStat').find('p[name="' + n.value.split(' / ').pop() + '"]').text() == '' ? $('.totalStat').find('p[name="' + n.value.split(' / ').pop() + '"]').text(y) : $('.totalStat').find('p[name="' + n.value.split(' / ').pop() + '"]').text(y + parseFloat($('.totalStat').find('p[name="' + n.value.split(' / ').pop() + '"]').text()));
        } else
          $('.totalStat').find('p[name="' + n.value + '"]').text() == '' ? $('.totalStat').find('p[name="' + n.value + '"]').text(parseFloat($runV.value)) : $('.totalStat').find('p[name="' + n.value + '"]').text(parseFloat($runV.value) + parseFloat($('.totalStat').find('p[name="' + n.value + '"]').text()));
        if (n.value == 'MP Recovery/DMG') {
          $sMRec += Number(parseFloat($runV.value));
          $('.totalStat').find('p[name="Mana Recovery upon taking DMG"]').text($sMRec);
        }
      });
    };
    $('.rating label').click(function() {
      option();
      gearStat();
      gearSet();
    });
    $('#calc_role_id, #calc_char_id').change(function() {
      hideGearImage();
    });
    (function rangeSlider() {
      $('.range').each(function() {
        $('[name="range"], [name="add-atk"], [name="add-hp"]').on('input', function() {
          swStat();
        });
      });
    }).call(this);
    $('[name="range"], [name="add-atk"], [name="add-hp"]').change(function() {
      gearStat();
      gearSet();
    });
    function swStat() {
      $sw_atk = 0;
      $sw_hp = 0;
      $sw_atk_b = 0;
      $sw_hp_b = 0;
      var x = $('[name="range"]').val(),
          y = $('[name="add-atk"]').val(),
          z = $('[name="add-hp"]').val(),
          xDef = (100 - x);
      (xDef % 2 == 1) || (xDef % 2 == 0) ? xDef = xDef.toFixed(0) : xDef = xDef.toFixed(1);
      $('.range-ou1').html(x + '%');
      $('.range-ou2').html(xDef + '%');
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
      y > 0 ? $('#range-atk').html(Math.round($sw_atk + Math.trunc($sw_atk * (y / 100)))) : $('#range-atk').html(Math.round($sw_atk));
      z > 0 ? $('#range-hp').html(Math.round($sw_hp + Math.trunc($sw_hp * (z / 100)))) : $('#range-hp').html(Math.round($sw_hp));
    };
    function rangeC() {
      $('.range-ou1, .range-ou2').text('50%');
      $('[name="range"]').val(50);
      $('.range-ad1, .range-ad2').text('0%');
      $('[name="add-atk"], [name="add-hp"]').val(0);
    };
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
    statSplit();
    function checkShare() {
      $chk = 0;
      $('.img').each(function() {
        $chk += $(this).prop('selectedIndex');
      });
    };
    function disableGenerateButton() {
      $('#genLink').attr('disabled','disabled').css({
        'background': 'rgba(0, 0, 0, 0.2)',
        'text-decoration': 'line-through'
      });
    };
    $('#calc_role_id, #calc_char_id, #calc_gear_weapon, #calc_gear_treasure, #calc_gear_armor, #calc_gear_secondary, #calc_gear_jewelry, #calc_gear_orb, #calc_st_weapon, #calc_st_weapon_st, .ax, .ay, .ench-t, .ench-n, .ench-v, .ax-tm, .ay-tm, .ax-r, .ay-r').change(function() {
      option();
      gearStat();
      gearSet();
    });
  });
}).call(this);
