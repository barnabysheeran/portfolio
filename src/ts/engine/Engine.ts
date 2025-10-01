export default class Engine {

    static #applicationRunTimeMS = 0;

    static #isInitialized = false;
    static #isRunning = false;

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

    static start() {
        this.#isRunning = true;
    }

    static stop() {
        this.#isRunning = false;
    }

    // ____________________________________________________________________ Tick

    static #tick(applicationRunTimeMS: number) {
        // Loop
        requestAnimationFrame(this.#tick.bind(this));

        // Running ?
        if (!this.#isRunning) return;

        // Calculate Delta Time MS
        const deltaTimeMS = applicationRunTimeMS - this.#applicationRunTimeMS;

        // console.log(`Engine Tick - Δ: ${deltaTimeMS}ms - T: ${applicationRunTimeMS}ms`);
        
        // Store
        this.#applicationRunTimeMS = applicationRunTimeMS;
    }
}