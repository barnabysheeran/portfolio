import ApplicationLogger from '../application/ApplicationLogger.ts';
import Display from '../display/Display.ts';
import styles from './InteractiveSurface.module.css';

export class IdData {
  public id: number;

  constructor(id: number) {
    this.id = id;
  }
}

type ClickCallback = (id: IdData) => void;

export default class InteractiveSurface {
    static #CONTAINER: HTMLDivElement;
    static #ELEMENTS = new Map<string, HTMLDivElement>();
    static #PIXEL_BORDER = 10;
    static #LOG_LEVEL = 2;

    // _________________________________________________________________________

    static initialise(width: number, height: number): void {
        ApplicationLogger.log('Interactive', this.#LOG_LEVEL);

        // Create Holder
        this.#CONTAINER = document.createElement('div');
        this.#CONTAINER.classList.add(styles['interactive-surface']);

        // Append Holder to Display Holder
        Display.getDisplayHolder().appendChild(this.#CONTAINER);

        // Set Initial Size
        this.setSize(width, height);
    }

    // _______________________________________________________________ Add Block

    static createBlock(
        x: number,
        y: number,
        width: number,
        height: number,
        callbackClick: ClickCallback | null,
        callbackRollOver: ClickCallback | null,
        callbackRollOut: ClickCallback | null,
        clickData: IdData,
    ): string {
        // Create UUID
        const uuid = crypto.randomUUID();

        // Add Pixel Border
        x -= this.#PIXEL_BORDER;
        y -= this.#PIXEL_BORDER;
        width += this.#PIXEL_BORDER * 2;
        height += this.#PIXEL_BORDER * 2;

        // Create Element
        const ELEMENT = document.createElement('div');
        ELEMENT.id = uuid;
        ELEMENT.classList.add(styles['interactive-block']);
        ELEMENT.style.left = `${x}px`;
        ELEMENT.style.top = `${y}px`;
        ELEMENT.style.width = `${width}px`;
        ELEMENT.style.height = `${height}px`;
        this.#CONTAINER.appendChild(ELEMENT);

        // Development - Add Visible Border
        // ELEMENT.style.border = `1px solid #00ff00`;

        // Set Click Data
        ELEMENT.dataset.clickData = JSON.stringify(clickData);

        // Add Event Listeners
        if (callbackClick) {
            ELEMENT.addEventListener('click', (event: MouseEvent) =>
                this.#onClick(event, callbackClick),
            );
        }

        if (callbackRollOver) {
            ELEMENT.addEventListener('mouseover', (event: MouseEvent) =>
                this.#onRollOver(event, callbackRollOver),
            );
        }

        if (callbackRollOut) {
            ELEMENT.addEventListener('mouseout', (event: MouseEvent) =>
                this.#onRollOut(event, callbackRollOut),
            );
        }

        // Store
        this.#ELEMENTS.set(uuid, ELEMENT);

        // Return uuid
        return uuid;
    }

    // ____________________________________________________________ Remove Block

    static removeBlock(uuid: string): void { // Added return type
        const element = this.#ELEMENTS.get(uuid);

        if (element) {
            element.remove();
            this.#ELEMENTS.delete(uuid);
        }
    }

    // __________________________________________________________ Event Handlers

    static #onClick(event: MouseEvent, callback: ClickCallback): void { // Added types
        const clickDataString = (event.currentTarget as HTMLElement).dataset.clickData;
        const clickData: IdData = clickDataString ? JSON.parse(clickDataString) : { id: '' };
        callback(clickData);
    }

    static #onRollOver(event: MouseEvent, callback: ClickCallback): void { // Added types
        const clickDataString = (event.currentTarget as HTMLElement).dataset.clickData;
        const clickData: IdData = clickDataString ? JSON.parse(clickDataString) : { id: '' };
        callback(clickData);
    }

    static #onRollOut(event: MouseEvent, callback: ClickCallback): void { // Added types
        const clickDataString = (event.currentTarget as HTMLElement).dataset.clickData;
        const clickData: IdData = clickDataString ? JSON.parse(clickDataString) : { id: '' };
        callback(clickData);
    }

    // ___________________________________________________________________ Clear

    static clear(): void {
        ApplicationLogger.log('Interactive clear', this.#LOG_LEVEL);

        // Clear Blocks
        this.#ELEMENTS.clear();

        // Clear Holder
        this.#CONTAINER.innerHTML = '';
    }

    // ____________________________________________________________________ Size

    static setSize(width: number, height: number): void {
        this.#CONTAINER.style.width = `${width}px`;
        this.#CONTAINER.style.height = `${height}px`;
    }
}
