(function() {
  $(document).on("turbolinks:load", function() {
//     urlS = "https://krsharelink.herokuapp.com/api/v1/links";
//     if ($('.links').text().length == 0) {
//       $.get(urlS, function (data, textStatus, jqXHR) {
//         var decD = function(urlS, key) {
//           var C = CryptoJS;
//           var Key = C.enc.Utf8.parse("6il7YCRSqIOB9NooY225lPKQ0KuAF/nkFX6cY3vJkS0=");
//           var IV = C.enc.Utf8.parse("br2fg9b3e7fb12q");
//           var dc = C.AES.decrypt(data.data.text, Key, {
//             iv: IV,
//             mode: C.mode.CBC,
//             padding: C.pad.Pkcs7
//           });
//           return JSON.parse(dc.toString(CryptoJS.enc.Utf8));
//         };
//         shrL = data.data
//         u = document.URL.slice(-6);
//         $.each(shrL, function(i, n) {
//           link = document.URL + '/' + n.slug;
//           x = '<div class="link"><p id="text">' + n.text + '</p><a id="link" href="' + link + '">' + link + '</a></div><hr>';
//           y = '<div class="link"><span>Raw Text</span><p id="text">' + n.text + '</p></div><hr>';
//           u == n.slug ? $('body').append(y) : $('.links').append(x);
//         });
//       });
//     };
    if ($('.links').text().length == 0)
      $('.links').append('<h1>Errors</h1><h2>Page Not Found</h2>');
  });
}).call(this);
