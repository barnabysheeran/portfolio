export default class ApplicationDispatcherEvent {
  #CALLBACKS: Array<(data: object) => void> = [];

  #EVENT_NAME: string;

  constructor(eventName: string) {
    this.#EVENT_NAME = eventName;
  }

  registerCallback(callback: (data: object) => void): void {
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }
    this.#CALLBACKS.push(callback);
  }

  unregisterCallback(callback: (data: object) => void): void {
    const INDEX = this.#CALLBACKS.indexOf(callback);
    if (INDEX !== -1) {
      this.#CALLBACKS.splice(INDEX, 1);
    }
  }

  fire(data: object): void {
    this.#CALLBACKS.forEach((callback) => {
      callback(data);
    });
  }

  get EVENT_NAME(): string {
    return this.#EVENT_NAME;
  }
}
