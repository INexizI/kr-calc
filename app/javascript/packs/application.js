import Rails from "@rails/ujs"
// require("@rails/ujs").start()
require("turbolinks").start()
import { Turbo } from "@hotwired/turbo-rails"
// require("@rails/activestorage").start()
import * as ActiveStorage from "@rails/activestorage"
// require("channels")
import "channels"
import "controllers"
// require("jquery-ui")
require("packs/gear")
require("packs/calc")
require("packs/stat")
require("packs/link")

window.Turbo = Turbo
Rails.start()
ActiveStorage.start()

console.log('Webpacker loaded')
