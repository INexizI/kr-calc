(function() {
  $(document).on("turbolinks:load", function() {
    url = "https://krsharelink.herokuapp.com/api/v1/links";
    if ($('.links').text().length == 0) {
      $.get(url, function (data, textStatus, jqXHR) {
        var decData = function(url, key) {
          var C = CryptoJS;
          var Key = C.enc.Utf8.parse("6il7YCRSqIOB9NooY225lPKQ0KuAF/nkFX6cY3vJkS0=");
          var IV = C.enc.Utf8.parse("br2fg9b3e7fb12q");
          var dcT = C.AES.decrypt(data.data.text, Key, {
            iv: IV,
            mode: C.mode.CBC,
            padding: C.pad.Pkcs7
          });
          return JSON.parse(dcT.toString(CryptoJS.enc.Utf8));
        };
        shr = data.data
        u = document.URL.slice(-6);
        $.each(shr, function(i, n) {
          link = document.URL + '/' + n.slug;
          x = '<div class="link"><p id="text">' + n.text + '</p><a id="link" href="' + link + '">' + link + '</a></div><hr>';
          y = '<div class="link"><span>Raw Text</span><p id="text">' + n.text + '</p></div><hr>';
          u == n.slug ? $('body').append(y) : $('.links').append(x);
        });
      });
    };
  });
}).call(this);
