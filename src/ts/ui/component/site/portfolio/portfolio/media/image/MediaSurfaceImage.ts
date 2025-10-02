import MediaSurface from '../MediaSurface.ts';

export default class MediaSurfaceImage {
    #IMAGE_URL: string;
    #CALLBACK_ON_LOADED: (() => void) | null;

    #HOLDER: HTMLDivElement | null;
    #IMAGE: HTMLImageElement | null;

    #LERP_SLOW: number;
    #LERP_FAST: number;
    #LERP_MARGIN: number;
    #lerp: number;

    #opacity = 0;
    #opacityTarget = 0;

    #isStopping = false;

    // _________________________________________________________________________

    constructor(container: HTMLDivElement, imageURL: string, callbackOnLoaded?: () => void) {
        // Store
        this.#IMAGE_URL = imageURL;
        this.#CALLBACK_ON_LOADED = callbackOnLoaded || null;

        console.log('MediaSurfaceImage', this.#IMAGE_URL);

        // Set Lerp Values
        this.#LERP_SLOW = MediaSurface.LERP_SLOW;
        this.#LERP_FAST = MediaSurface.LERP_FAST;
        this.#LERP_MARGIN = MediaSurface.LERP_MARGIN;

        // Start Slow
        this.#lerp = this.#LERP_SLOW;

        // Create Holder
        this.#HOLDER = document.createElement('div');
        this.#HOLDER.classList.add('image');
        container.appendChild(this.#HOLDER);

        // Create Image
        this.#IMAGE = new Image();
        this.#IMAGE.onload = this.#onImageLoaded.bind(this);
        this.#IMAGE.onerror = this.#onImageLoadError.bind(this);

        // Initial Opacity
        this.#HOLDER.style.opacity = '0';

        // Load
        this.#IMAGE.src = this.#IMAGE_URL;
    }

    // ______________________________________________________________ Image Load

    #onImageLoaded() {
        console.log('MediaSurfaceImage loaded', this.#IMAGE_URL);

        // Set Image as Background of Holder
        if (this.#HOLDER) {
            this.#HOLDER.style.backgroundImage = `url(${this.#IMAGE_URL})`;
        }

        // Discard Image
        this.#IMAGE = null;

        // Callback
        if (this.#CALLBACK_ON_LOADED) {
            this.#CALLBACK_ON_LOADED();
        }
    }

    // ________________________________________________________ Image Load Error

    #onImageLoadError(error: ErrorEvent) {
        console.error('MediaSurfaceImage failed to load', this.#IMAGE_URL);
        console.error('Error event:', error);
    }

    // ____________________________________________________________________ Tick

    tick() {
        // Lerp Opacity
        this.#opacity += (this.#opacityTarget - this.#opacity) * this.#lerp;

        // Set Opacity
        if (this.#HOLDER) {
            this.#HOLDER.style.opacity = this.#opacity.toString();
        }

        // Stopping ?
        if (this.#isStopping && this.#opacity <= this.#LERP_MARGIN) {
            // Complete
            return true;
        }

        // Return Not Complete
        return false;
    }

    // ____________________________________________________________________ Show

    show() {
        this.#opacityTarget = 1.0;
    }

    hide() {
        this.#opacityTarget = 0;
    }

    // ____________________________________________________________________ Stop

    stop() {
        this.#isStopping = true;

        this.hide();
    }

    // ____________________________________________________________________ Lerp

    setLerpFast() {
        this.#lerp = this.#LERP_FAST;
    }

    setLerpSlow() {
        this.#lerp = this.#LERP_SLOW;
    }

    // __________________________________________________________________ Access

    getHolder() {
        return this.#HOLDER;
    }

    // _________________________________________________________________ Destroy

    destroy() {
        // Remove Holder
        if (this.#HOLDER && this.#HOLDER.parentNode) {
            this.#HOLDER.remove();
        }

        // Clear References
        this.#HOLDER = null;
        this.#IMAGE = null;
    }
}
