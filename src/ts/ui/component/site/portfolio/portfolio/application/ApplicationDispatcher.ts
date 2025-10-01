import ApplicationDispatcherEvent from './ApplicationDispatcherEvent.ts';

export default class ApplicationDispatcher {
  static #EVENTS: Record<string, ApplicationDispatcherEvent> = {};

  static #VALID_EVENT_NAMES = [
    // View
    'project-menu-open',
    'project-menu-close',
    'view-project-menu-select', // { projectId: string }
  ];

  static dispatch(eventName: string, data: object): void {
    const EVENT = this.#EVENTS[eventName];
    if (EVENT !== undefined) {
      EVENT.fire(data);
    }
  }

  static on(eventName: string, callback: (data: object) => void): void {
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }
    this.#getOrCreateEvent(eventName).registerCallback(callback);
  }

  static off(eventName: string, callback: (data: object) => void): void {
    const EVENT = this.#EVENTS[eventName];
    if (EVENT) {
      EVENT.unregisterCallback(callback);
      if (EVENT.CALLBACKS.length === 0) {
        delete this.#EVENTS[eventName];
      }
    }
  }

  static #getOrCreateEvent(eventName: string): ApplicationDispatcherEvent {
    if (this.#EVENTS[eventName] === undefined) {
      if (!this.#VALID_EVENT_NAMES.includes(eventName)) {
        throw new Error(`${eventName} is an invalid event name`);
      }
      this.#EVENTS[eventName] = new ApplicationDispatcherEvent(eventName);
    }
    return this.#EVENTS[eventName];
  }
}
