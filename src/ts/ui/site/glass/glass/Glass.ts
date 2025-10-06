import DataController from './data/DataController';
import ApplicationConfiguration from './application/ApplicationConfiguration';
import ApplicationLogger from './application/ApplicationLogger';

import type { ImageDescriptions } from '../../../../type/image';

import Controller from './controller/Controller';

export interface GlassCreationParameters {
  applicationContainer: HTMLElement;
  onMediaShowProject: (imageDescriptions: ImageDescriptions) => void;
  onMediaClear: () => void;
  isDevelopment: boolean;
}

export default class Glass {
  #CONTROLLER;

  #applicationRunTimeMS = 0;

  #LOG_LEVEL = 1;

  #onMediaShowProjectCallback?: (imageDescriptions: ImageDescriptions) => void;
  #onMediaClearCallback?: () => void;

  // _________________________________________________________________________

  constructor(creationParameters: GlassCreationParameters) {
    // Order Important

    // Initialise Application Logger
    ApplicationLogger.initialise(creationParameters.isDevelopment);
    ApplicationLogger.log('Glass', this.#LOG_LEVEL);

    // Initialise Application Configuration
    ApplicationConfiguration.initialise(creationParameters);

    // Store Callbacks
    this.#onMediaShowProjectCallback = creationParameters.onMediaShowProject;
    this.#onMediaClearCallback = creationParameters.onMediaClear;

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
    const PROJECT_IMAGE_DESCRIPTIONS: ImageDescriptions =
      DataController.getProjectImages(projectIndex);

    console.log('PROJECT_IMAGE_DESCRIPTIONS', PROJECT_IMAGE_DESCRIPTIONS);

    this.#onMediaShowProjectCallback?.(PROJECT_IMAGE_DESCRIPTIONS);
  }

  onMediaClear() {
    console.log('Glass onMediaClear');

    this.#onMediaClearCallback?.();
  }
}
