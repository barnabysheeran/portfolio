import ApplicationConfiguration from './application/ApplicationConfiguration.ts';
import ApplicationLogger from './application/ApplicationLogger.ts';

import Controller from './controller/Controller.ts';

import type { CreationParameters } from './types/types.ts';

export default class Glass {
  #CONTROLLER;

  #applicationRunTimeMS = 0;

  #LOG_LEVEL = 1;

  // _________________________________________________________________________

  constructor(creationParameters: CreationParameters) {
    // Order Important

    // Initialise Application Logger
    ApplicationLogger.initialise(creationParameters.isDebug);

    ApplicationLogger.log('Portfolio', this.#LOG_LEVEL);

    // Initialise Application Configuration
    ApplicationConfiguration.initialise(creationParameters);

    // Create Controller
    this.#CONTROLLER = new Controller();

    // Start Main Loop
    window.requestAnimationFrame(this.#tick.bind(this));
  }

  // _________________________________________________________________ Main Loop

  #tick(applicationRunTimeMS: number) {
    // Calculate Application Frame Delta MS
    const FRAME_DELTA_MS = applicationRunTimeMS - this.#applicationRunTimeMS;

    // Store Application Run Time
    this.#applicationRunTimeMS = applicationRunTimeMS;

    // Tick Controller
    this.#CONTROLLER.tick(FRAME_DELTA_MS);

    // Loop
    window.requestAnimationFrame(this.#tick.bind(this));
  }
}
