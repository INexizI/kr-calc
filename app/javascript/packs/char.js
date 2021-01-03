(function() {
  $(document).on("turbolinks:load", function() {
    $('.h-title').click(function() {
      var cssVal = {
        'display':'flex',
        'flex-wrap':'wrap'
      }
      $(this).next('.h-main').fadeToggle('fast').css(cssVal);
    });
    $('.c-perk-img').mouseenter(function() {
      $left = 0;
      $top = 0;
      if ($(document).width() - $(this).offset().left < $(document).width() / 2)
        $left = -1;
      // if ($(document).height() - $(this).offset().top < $(document).height() / 2)
      //   $top = -1;
      $y = 10;
      $x = $left * 10 + $left * 400;
      $cs = {
        'top':$y,
        'left': $x,
        'display': 'grid'
      }
      $('.s-description', this).css($cs);
      $('.g-description', this).css($cs);
    }).mouseleave(function() {
      $('.s-description').hide();
      $('.g-description').hide();
    });
    $('.c-stat .r-stat').find('p').each(function() {
      $zeroStat = $(this).text();
      if ($zeroStat === '0')
        $(this).hide().prev('p').hide();
    });
    $('.char').css('background-image', 'url("/images/media/heroes/' + $('title').text() + '/Loading Screen.png")');
    $('.c-stat .r-stat').find('#s-val').each(function() {
      $zeroStat = $(this);
      $softcap = $($zeroStat).prev().text();
      $zeroStat.text() === '0' ? $(this).parent().css('height', 0).children().hide() : $(this).parent().css('height', '25px').children().show();
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
      else if ($softcap !== 'Crit DMG')
        $(this).next('#s-per').text($softn/10 + '%')
      else if ($softcap == 'Crit DMG')
        $(this).text($softn + '%')
      });
  });
}).call(this);
