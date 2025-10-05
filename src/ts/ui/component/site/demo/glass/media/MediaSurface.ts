import ApplicationLogger from '../application/ApplicationLogger.ts';
import DataController from '../data/DataController.ts';
import type { DataProjectMedia } from '../data/DataController.ts';

import Display from '../display/Display.ts';

import MediaSurfaceVimeo from './video/MediaSurfaceVimeo.ts';
import MediaSurfaceImageGallery from './image/MediaSurfaceImageGallery.ts';
import type MediaSurfaceItem from './MediaSurfaceItem.ts';

import styles from './MediaSurface.module.css';

export default class MediaSurface {
  static #CONTAINER: HTMLDivElement;

  static #MEDIA_ITEMS: MediaSurfaceItem[] = [];

  static #width: number;
  static #height: number;

  static LERP_SLOW = 0.05; // 0.015;
  static LERP_FAST = 0.1;
  static LERP_MARGIN = 0.01;

  static #LOG_LEVEL = -1; // 2

  // _________________________________________________________________________

  static initialise(width: number, height: number) {
    ApplicationLogger.log('MediaSurface', this.#LOG_LEVEL);

    // Create Holder
    this.#CONTAINER = document.createElement('div');
    this.#CONTAINER.className = styles['media-surface'];

    // Append Holder to Display Holder
    Display.getDisplayHolder().appendChild(this.#CONTAINER);

    // Set Initial Size
    this.setSize(width, height);
  }

  // ____________________________________________________________________ Tick

  static tick(frameDeltaMS: number) {
    // Tick Media Items
    for (let i = 0; i < this.#MEDIA_ITEMS.length; i++) {
      // Tick Media Item
      const IS_COMPLETE = this.#MEDIA_ITEMS[i].tick(frameDeltaMS);

      // Remove if Complete
      if (IS_COMPLETE) {
        // Destroy Media Item
        this.#MEDIA_ITEMS[i].destroy();

        // Remove from Array
        this.#MEDIA_ITEMS.splice(i, 1);
        i--; // Adjust index after removal
      }
    }
  }

  // ____________________________________________________________ Show Project

  static showProject(projectIndex: number) {
    ApplicationLogger.log(`MediaSurface showProject`, this.#LOG_LEVEL);

    // Clear Container
    this.clear();

    // Get Project Data
    const DATA_PROJECT_MEDIA: DataProjectMedia[] | undefined =
      DataController.getMediaByIndex(projectIndex);

    if (!DATA_PROJECT_MEDIA) {
      return;
    }

    console.log(' - Data Project Media', DATA_PROJECT_MEDIA);

    // Through the media data
    const imageUrls: string[] = [];

    for (let i = 0; i < DATA_PROJECT_MEDIA.length; i++) {
      const MEDIA_DATA: DataProjectMedia = DATA_PROJECT_MEDIA[i];

      const VIMEO_ID: string | undefined = MEDIA_DATA['vimeo-id'];
      const URL: string | undefined = MEDIA_DATA.url;

      switch (MEDIA_DATA.type) {
        case 'vimeo':
          console.log(' - Vimeo ID', VIMEO_ID);

          // Vimeo - Add Vimeo Player
          if (VIMEO_ID) {
            this.#addVideoPlayer(VIMEO_ID);
          }

          break;

        case 'image':
          console.log(' - Image URL', URL);

          // Image - Store URL
          if (URL) {
            imageUrls.push(URL);
          }

          break;

        default:
          ApplicationLogger.warn(
            `MediaSurface showProject: Unknown media type`,
            this.#LOG_LEVEL,
          );
          break;
      }
    }

    // Create Image Gallery ?
    if (imageUrls.length > 0) {
      ApplicationLogger.log(
        ` - Creating Image Gallery with ${imageUrls.length} images`,
        this.#LOG_LEVEL,
      );

      console.log(' - Image URLs', imageUrls);

      // Create Image Gallery
      this.#addImageGallery(imageUrls);
    }
  }

  // ___________________________________________________________________ Vimeo

  static #addVideoPlayer(vimeoId: string) {
    ApplicationLogger.log(
      `MediaSurface addVideoPlayer ${vimeoId}`,
      this.#LOG_LEVEL,
    );

    // Create Vimeo Player Instance
    this.#MEDIA_ITEMS.push(
      new MediaSurfaceVimeo(
        this.#CONTAINER,
        vimeoId,
        this.#width,
        this.#height,
      ),
    );
  }

  // ___________________________________________________________________ Image

  static #addImageGallery(imageUrls: string[]) {
    ApplicationLogger.log(
      `MediaSurface addImage ${imageUrls}`,
      this.#LOG_LEVEL,
    );

    // Create Image Gallery Instance
    this.#MEDIA_ITEMS.push(
      new MediaSurfaceImageGallery(this.#CONTAINER, imageUrls),
    );
  }

  // ___________________________________________________________________ Clear

  static clear() {
    ApplicationLogger.log('MediaSurface clear', this.#LOG_LEVEL);

    // Stop Media Items
    for (let i = 0; i < this.#MEDIA_ITEMS.length; i++) {
      this.#MEDIA_ITEMS[i].stop();
    }
  }

  // ____________________________________________________________________ Size

  static setSize(width: number, height: number) {
    // Container
    this.#CONTAINER.style.width = `${width}px`;
    this.#CONTAINER.style.height = `${height}px`;

    // Media Items
    for (let i = 0; i < this.#MEDIA_ITEMS.length; i++) {
      this.#MEDIA_ITEMS[i].setSize(width, height);
    }

    // Store
    this.#width = width;
    this.#height = height;
  }
}
