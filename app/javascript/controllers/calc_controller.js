import { Controller } from 'stimulus'
import { FetchRequest } from '@rails/request.js'

export default class extends Controller {
  async generate(event) {
    event.preventDefault()

    console.log("GENERATE CONTROLLER");

    const form = $('form.calc').find('.img').serializeArray()
    var check = 0
    $.each(form, function(i, n) {
      if (n.value != "- - - - - - - - - -") {
        check++
      }
    })

    if (check > 0) {
      var jName = $('[name="calc[gear_jewelry]"').children().children('option:selected').parent().attr('label');
      var lk = $('.calc form');
      var lk_sl = [];
      lk_sl.push({name :'calc[jewelry_type]', value: jName});
      $(lk.serializeArray().slice(1)).each(function(i, n) {
        if ((this.value !== '0') && (this.value !== '') && (this.value !== '- - - - - - - - - -'))
          lk_sl.push(n);
        if (this.name == 'calc[gear_treasure]')
          lk_sl.push(
            {name: 'uw', value: $('#uw').find('.active').next('input').val()},
            {name: 'ar', value: $('#ar').find('.active').next('input').val()},
            {name: 'sg', value: $('#sg').find('.active').next('input').val()},
            {name: 'ut', value: $('#ut').find('.active').next('input').val()},
            {name: 'ac', value: $('#ac').find('.active').next('input').val()},
            {name: 'or', value: $('#or').find('.active').next('input').val()}
          );
        if (this.name == 'calc[char_id]') {
          $('.hero-' + this.value + ' #perk-t1').find('img').each(function() {
            if ($(this).attr('class') == 'pick')
            lk_sl.push({name: 'perk-t1', value: $(this).attr('id')})
          });
          $('.hero-' + this.value + ' #perk-t2').find('img').each(function() {
            if ($(this).attr('class') == 'pick')
            lk_sl.push({name: 'perk-t2', value: $(this).attr('id')})
          });
          $('.hero-' + this.value + ' #perk-t3').find('img').each(function() {
            if ($(this).attr('class') == 'pick')
            lk_sl.push({name: 'perk-t3', value: $(this).attr('id')})
          });
          $('.hero-' + this.value + ' #perk-t5').find('img').each(function() {
            if ($(this).attr('class') == 'pick')
            lk_sl.push({name: 'perk-t5', value: $(this).attr('id')})
          });
        }
      });
      function encData(lk_sl) {
        var Key = CryptoJS.enc.Utf8.parse("6il7YCRSqIOB9NooY225lPKQ0KuAF/nkFX6cY3vJkS0=");
        var IV = CryptoJS.enc.Utf8.parse("br2fg9b3e7fb12q");
        var enT = CryptoJS.AES.encrypt(JSON.stringify(lk_sl), Key, {
          iv: IV,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        });
        return enT.toString(CryptoJS.format.Base64);
      };
      var encryptData = encData(lk_sl);

      const request = new FetchRequest('post', window.location.origin + '/links', { body: JSON.stringify({ text: encryptData }) })
      const response = await request.perform()

      if (response.ok) {
        const body = await response.json
        // console.log(window.location.origin + '/links/' + body.data.slug)
        $('#this-link').text(window.location.origin + '/links/' + body.data.slug).show()
      }
    }
  }

  async load(event) {
    event.preventDefault();

    console.log("LOAD CONTROLLER");

    const shr = $('#share_link').val().toString();
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
                  $('#char, .form-input div select').show(),
                  $('#calc_char_id, #calc_gear_weapon, #calc_gear_treasure, #calc_gear_armor, #calc_gear_secondary, #calc_gear_jewelry, #calc_gear_orb, #calc_gear_artifact,').parent().show(),
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
            if ((x.slice(0, -3) + ']' == 'calc[st_rune]') || (x.slice(0, -3) + ']' == 'calc[st_rune_w]') || (x.slice(0, -3) + ']' == 'calc[st_rune_tm]')) {
              $('[name="' + x + '"]')
                .children().hide().end()
                .prop('selectedIndex', 0)
                .find('[name="' + $r + '"]')
                .prop('selected', true).show().end()
                .children('.q').show().end()
                .children('[value="' + y + '"]').prop('selected', true);
            }
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
          $msg = "Enter valid link/code!\n" + errorThrown;
          messgeBox();
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
          // console.log(decData(shr));
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
                  $('#char, .form-input div select').show(),
                  $('#calc_char_id, #calc_gear_weapon, #calc_gear_treasure, #calc_gear_armor, #calc_gear_secondary, #calc_gear_jewelry, #calc_gear_orb, #calc_gear_artifact').parent().show(),
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
            if (x == 'calc[st_armor_op]')
              $('#propAr').text(y);
            if (x == 'calc[st_secondary_op]')
              $('#propScnd').text(y);
            if (x == 'calc[st_jewerly_op]')
              $('#propAcs').text(y);
            if (x == 'calc[st_orb_op]')
              $('#propOrb').text(y);
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
            if ((x.slice(0, -3) + ']' == 'calc[st_rune]') || (x.slice(0, -3) + ']' == 'calc[st_rune_w]') || (x.slice(0, -3) + ']' == 'calc[st_rune_tm]')) {
              $('[name="' + x + '"]')
                .children().hide().end()
                .prop('selectedIndex', 0)
                .find('[name="' + $r + '"]')
                .prop('selected', true).show().end()
                .children('.q').show().end()
                .children('[value="' + y + '"]').prop('selected', true);
            }
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
          $msg = "Enter valid link/code!\n" + errorThrown;
          messgeBox();
        });
    } else {
        $msg = "Enter valid link!";
        messgeBox();
      }
  }
}
