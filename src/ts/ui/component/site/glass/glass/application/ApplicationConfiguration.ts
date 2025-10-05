import ApplicationLogger from './ApplicationLogger.ts';

import type { CreationParameters } from '../types/types.ts';

export default class ApplicationConfiguration {
  static #applicationContainer: HTMLElement;
  static #assetPath: string;
  static #isDevelopment = false;

  static #LOG_LEVEL = -1;

  // ________________________________________________________________ Initialise

  static initialise(creationParameters: CreationParameters) {
    ApplicationLogger.log('ApplicationConfiguration', this.#LOG_LEVEL);

    // Store
    this.#applicationContainer = creationParameters.applicationContainer;
    this.#assetPath = creationParameters.assetPath;
    this.#isDevelopment = creationParameters.isDevelopment;
  }

  // _____________________________________________________ Application Container

  static getApplicationContainer() {
    return this.#applicationContainer;
  }

  // ________________________________________________________________ Asset Path

  static getAssetPath() {
    return this.#assetPath;
  }

  // ____________________________________________________________ Is Development

  static set isDevelopment(value) {
    this.#isDevelopment = value;
  }

  static get isDevelopment() {
    return this.#isDevelopment;
  }
}
