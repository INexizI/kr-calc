(function() {
  $(document).on("turbolinks:load", function() {
    $input = $("[data-behavior='autocomplete']");
    $options = {
      getValue: "name",
      url: function(phrase) {
        return "/search.json?q=" + phrase;
      },
      categories: [
        {
          listLocation: "chars",
          header: "<strong>Hero</strong>",
        },
        // {
        //   listLocation: "roles",
        //   header: "<strong>Class</strong>",
        // },
        {
          listLocation: "perks",
          header: "<strong>Perk</strong>"
        },
        {
          listLocation: "gears",
          header: "<strong>Gear</strong>",
        },
        {
          listLocation: "skills",
          header: "<strong>Skill</strong>",
        }
      ],
      list: {
        onChooseEvent: function() {
          $url = $input.getSelectedItemData().url
          $input.val("")
          Turbolinks.visit($url)
        }
      }
    };
    $("#srch").easyAutocomplete($options);
  });
}).call(this);
