export default class ApplicationDispatcherEvent {
  #CALLBACKS: Array<(data: unknown) => void> = [];

  #EVENT_NAME: string;

  constructor(eventName: string) {
    this.#EVENT_NAME = eventName;
  }

  registerCallback(callback: (data: unknown) => void): void {
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }
    this.#CALLBACKS.push(callback);
  }

  unregisterCallback(callback: (data: unknown) => void): void {
    const INDEX = this.#CALLBACKS.indexOf(callback);
    if (INDEX !== -1) {
      this.#CALLBACKS.splice(INDEX, 1);
    }
  }

  fire(data: unknown): void {
    this.#CALLBACKS.forEach((callback) => {
      callback(data);
    });
  }

  get EVENT_NAME(): string {
    return this.#EVENT_NAME;
  }

  get CALLBACKS(): Array<(data: unknown) => void> {
    return this.#CALLBACKS;
  }
}
