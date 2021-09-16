import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import { Turbo } from "@hotwired/turbo-rails"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
import "controllers"

require("packs/gear")
require("packs/calc")
require("packs/stat")
require("packs/link")

window.Turbo = Turbo
Rails.start()
Turbolinks.start()
ActiveStorage.start()

console.log('Webpacker loaded')
