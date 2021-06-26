import { Controller } from 'stimulus'
import { FetchRequest } from '@rails/request.js'

export default class extends Controller {
  async generate(event) {
    event.preventDefault()

    var jName = $('[name="calc[gear_jewelry]"').children().children('option:selected').parent().attr('label');
    var lk = $('.calc form');
    var lk_sl = [];
    $(lk_sl).push({name :'calc[jewelry_type]', value: jName});
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

    const request = new FetchRequest('post', 'http://localhost:3000/links', { body: JSON.stringify({ text: encryptData }) })
    const response = await request.perform()

    if (response.ok) {
      const body = await response.json
      console.log(window.location.origin + '/links/' + body.data.slug)
      $('#this-link').text(window.location.origin + '/links/' + body.data.slug).show()
    }
  }
}
