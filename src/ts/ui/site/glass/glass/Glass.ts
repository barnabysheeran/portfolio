import DataController from '../data/DataController.ts';
import ApplicationConfiguration from './application/ApplicationConfiguration.ts';
import ApplicationLogger from './application/ApplicationLogger.ts';

import Controller from './controller/Controller.ts';

export interface GlassCreationParameters {
  isDevelopment: boolean;
  assetPath: string;
  applicationContainer: HTMLElement;
}

export default class Glass {
  #CONTROLLER;

  #applicationRunTimeMS = 0;

  #LOG_LEVEL = 1;

  // _________________________________________________________________________

  constructor(creationParameters: GlassCreationParameters) {
    // Order Important

    // Initialise Application Logger
    ApplicationLogger.initialise(creationParameters.isDevelopment);

    ApplicationLogger.log('Glass', this.#LOG_LEVEL);

    // Initialise Application Configuration
    ApplicationConfiguration.initialise(creationParameters);

    // Create Controller
    this.#CONTROLLER = new Controller(this);

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

  // ______________________________________________________________ External API

  onMediaShowProject(projectIndex: number) {
    console.log('Glass onMediaShowProject', projectIndex);

    // Get Project Data
    const PROJECT_DATA_JSON = DataController.getProjectByIndex(projectIndex);

    console.log('PROJECT_DATA_JSON', PROJECT_DATA_JSON);

    // TODO Pass out through GlassHolder to SiteGlass
  }

  onMediaClear() {
    console.log('Glass onMediaClear');

    // TODO Pass out through GlassHolder to SiteGlass
  }
}
