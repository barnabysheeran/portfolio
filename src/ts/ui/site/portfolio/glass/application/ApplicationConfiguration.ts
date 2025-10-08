import ApplicationLogger from './ApplicationLogger.ts';

import type { GlassCreationParameters } from '../Glass.ts';

export default class ApplicationConfiguration {
  static #applicationContainer: HTMLElement;
  static #isDevelopment = false;

  static #LOG_LEVEL = -1;

  // ________________________________________________________________ Initialise

  static initialise(creationParameters: GlassCreationParameters) {
    ApplicationLogger.log('ApplicationConfiguration', this.#LOG_LEVEL);

    // Store
    this.#applicationContainer = creationParameters.applicationContainer;
    this.#isDevelopment = creationParameters.isDevelopment;
  }

  // _____________________________________________________ Application Container

  static getApplicationContainer() {
    return this.#applicationContainer;
  }

  // ____________________________________________________________ Is Development

  static get isDevelopment() {
    return this.#isDevelopment;
  }
}
