import { Controller } from "stimulus"
import { FetchRequest } from '@rails/request.js'

export default class extends Controller {
  static values = { url: String }

  async generate(e) {
    e.preventDefault();
    console.log(this.urlValue);
    const request = new FetchRequest('get', this.urlValue, {responseKind: 'turbo-stream'})
    const response = await request.perform()
    if (response.ok) {
      const body = await response.text
      console.log('Yeah!');
    }
  }
}
