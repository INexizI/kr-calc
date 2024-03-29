import { Controller } from 'stimulus'
import { FetchRequest } from '@rails/request.js'

export default class extends Controller {
  async generate() {
    event.preventDefault()

    const form = $('form.calc .form-check').serializeArray()
    var check = 0
    $.each(form, function(i, n) {
      if (n.value != "- - - - - - - - - -")
        check++
    })

    if (check !== 0) {
      $('.share-main, .btn-gen').remove()

      var jName = $('[name="calc[gear_jewelry]"').children().children('option:selected').parent().attr('label')
      var lk = $('form.calc select')
      var lk_sl = []
      lk_sl.push({ name :'calc[jewelry_type]', value: jName })
      $(lk.serializeArray()).each(function(i, n) {
        if ((this.value !== '0') && (this.value !== '') && (this.value !== '- - - - - - - - - -'))
          lk_sl.push(n)
        if (this.name == 'calc[char_id]') {
          $(`.hero-${this.value} #perk-t1`).find('img').each(function() {
            if ($(this).attr('class') == 'pick')
              lk_sl.push({ name: 'perk-t1', value: $(this).attr('id') })
          })
          $(`.hero-${this.value} #perk-t2`).find('img').each(function() {
            if ($(this).attr('class') == 'pick')
              lk_sl.push({ name: 'perk-t2', value: $(this).attr('id') })
          })
          $(`.hero-${this.value} #perk-t3`).find('img').each(function() {
            if ($(this).attr('class') == 'pick')
              lk_sl.push({ name: 'perk-t3', value: $(this).attr('id') })
          })
          $(`.hero-${this.value} #perk-t5`).find('img').each(function() {
            if ($(this).attr('class') == 'pick')
              lk_sl.push({ name: 'perk-t5', value: $(this).attr('id') })
          })
        }
        if (this.name == 'calc[st_weapon_st]') {
          lk_sl.push(
            { name: 'range', value: $(`[name="range"]`).val() },
            { name: 'add-atk', value: $(`[name="add-atk"]`).val() },
            { name: 'add-hp', value: $(`[name="add-hp"]`).val() }
          )
        }
        if (this.name == 'calc[gear_artifact]')
          lk_sl.push(
            { name: 'weapon', value: $('#we').find('.active').next('input').val() },
            { name: 'armor', value: $('#ar').find('.active').next('input').val() },
            { name: 'secondary', value: $('#se').find('.active').next('input').val() },
            { name: 'treasure', value: $('#tr').find('.active').next('input').val() },
            { name: 'jewelry', value: $('#je').find('.active').next('input').val() },
            { name: 'orb', value: $('#or').find('.active').next('input').val() }
          )
      })
      function encData(raw) {
        const CryptoJS = require("crypto-js");
        var Key = process.env.CRYPTO_KEY;
        var IV = process.env.CRYPTO_IV;
        var enT = CryptoJS.AES.encrypt(JSON.stringify(raw), Key, {
          iv: IV,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        });
        return enT.toString(CryptoJS.format.Base64);
      }
      var encryptData = encData(lk_sl)

      const request = new FetchRequest('POST', window.location.origin + '/links', { body: JSON.stringify({ text: encryptData }) })
      const response = await request.perform()

      if (response.ok) {
        const body = await response.json
        $('#this-link').text(window.location.origin + '/links/' + body.data.slug).show()
      }
    } else
      this.message('Create a Build!')
  }

  async copy() {
    event.preventDefault()

    const form = $('form.calc .form-check').serializeArray()
    var check = 0
    $.each(form, function(i, n) {
      if (n.value != "- - - - - - - - - -")
        check++
    })

    if (check == 0)
      this.message('Create a Build!')
    else if ($('#this-link').text() == '')
      this.message('Generate Link!')
    else {
      this.message('Copied!')
      let tmp = $('<input>')
      $('body').append(tmp)
      tmp.val($('#this-link').text()).select()
      document.execCommand('copy')
      tmp.remove()
    }
  }

  async message(msg) {
    $('.msg').html(msg)
      .fadeIn(function() {
        $(this).show()
      })
      .fadeOut(250, function() {
        $(this).empty().hide()
        $('#clip').html('<img src="/images/clipboard.svg"><span>Copy</span>')
      })
  }
}
