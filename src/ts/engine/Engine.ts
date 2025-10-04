export default class Engine {

    // static #applicationRunTimeMS: number = 0;
    static #applicationRunTimeSInt: number = 0;

    static #isInitialized: boolean  = false;
    static #isRunning: boolean = false;

    // _________________________________________________________________________

    static init() {
        // Initialize Once Only
        if (this.#isInitialized) return;

        // Start Main Loop
        requestAnimationFrame(this.#tick.bind(this));

        // Initialized
        this.#isInitialized = true;
    }

    // ______________________________________________________________ Start Stop

    static start(): void {
        this.#isRunning = true;
    }

    static stop(): void {
        this.#isRunning = false;
    }

    // ____________________________________________________________________ Tick

    static #tick(applicationRunTimeMS: number): void {
        // Loop
        requestAnimationFrame(this.#tick.bind(this));

        // Running ?
        if (!this.#isRunning) return;

        // Calculate Delta Time MS
        // const deltaTimeMS = applicationRunTimeMS - this.#applicationRunTimeMS;

        // console.log(`Engine Tick - Δ: ${deltaTimeMS}ms - T: ${applicationRunTimeMS}ms`);

        // New Second ?
        const newApplicationRunTimeSInt = this.#getIntegerSeconds(applicationRunTimeMS);

        if (newApplicationRunTimeSInt !== this.#applicationRunTimeSInt) {
            // console.log(`Engine Second - S: ${newApplicationRunTimeSInt}s`);
        }
        
        // Store
        // this.#applicationRunTimeMS = applicationRunTimeMS;
        this.#applicationRunTimeSInt = this.#getIntegerSeconds(applicationRunTimeMS);
    }

    // ____________________________________________________________________ Util

    static #getIntegerSeconds(timeMS: number): number {
        return Math.floor(timeMS / 1000);
    }
}