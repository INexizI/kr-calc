import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import { Turbo } from "@hotwired/turbo-rails"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
import "controllers"
// import "src/stylesheets/application"
import jquery from "jquery"
window.jQuery = jquery
window.$ = jquery

window.addEventListener('load', () => {
  navigator.serviceWorker.register('/service-worker.js').then(registration => {
    console.log('ServiceWorker registered: ', registration);

    var serviceWorker;
    if (registration.installing) {
      serviceWorker = registration.installing;
      console.log('Service worker installing.');
    } else if (registration.waiting) {
      serviceWorker = registration.waiting;
      console.log('Service worker installed & waiting.');
    } else if (registration.active) {
      serviceWorker = registration.active;
      console.log('Service worker active.');
    }
  }).catch(registrationError => {
    console.log('Service worker registration failed: ', registrationError);
  });
});

require("packs/gear")
require("packs/calc")

window.Turbo = Turbo
Rails.start()
Turbolinks.start()
ActiveStorage.start()

console.log('Webpacker loaded')
