

import ApplicationConfiguration from './application/ApplicationConfiguration.js';
import ApplicationLogger from './application/ApplicationLogger.js';

import Controller from './controller/Controller.js';

export default class Portfolio {
	#CONTROLLER;

	#applicationRunTimeMS = 0;

	#LOG_LEVEL = 1;

	// _________________________________________________________________________

	constructor(creationParameters) {
		// Order Important

		// Initialise Application Logger
		ApplicationLogger.initialise(creationParameters.isDebug);

		// Initialise Application Configuration
		ApplicationConfiguration.initialise(creationParameters);

		// Create Controller
		this.#CONTROLLER = new Controller();

		// Start Main Loop
		window.requestAnimationFrame(this.#tick.bind(this));
	}

	// _______________________________________________________________ Main Loop

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
