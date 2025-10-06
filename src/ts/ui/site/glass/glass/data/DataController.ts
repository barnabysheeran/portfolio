import DATA_JSON from './data.json';

import type { ImageDescriptions } from '../../../../../type/image';

interface DataJson {
  projects: DataProject[];
}

export interface DataCredit {
  text: string;
  url: string;
}

export interface DataProject {
  id: string;
  name: string;
  'name-short': string;
  images: ImageDescriptions;
  credit: DataCredit[];
}

export default class DataController {
  static #DATA_PROJECTS: DataProject[] = [];

  static initialise() {
    const dataJson = DATA_JSON as DataJson;
    this.#DATA_PROJECTS = dataJson.projects;
  }

  static getProjects(): DataProject[] {
    return this.#DATA_PROJECTS;
  }

  static getProjectById(projectId: string): DataProject {
    for (let i = 0; i < this.#DATA_PROJECTS.length; i += 1) {
      const project = this.#DATA_PROJECTS[i];
      if (project.id === projectId) {
        return project;
      }
    }
    return this.#DATA_PROJECTS[0];
  }

  static getProjectByIndex(index: number): DataProject {
    if (index >= 0 && index < this.#DATA_PROJECTS.length) {
      return this.#DATA_PROJECTS[index];
    }
    return this.#DATA_PROJECTS[0];
  }

  static getProjectImages(projectIndex: number): ImageDescriptions {
    const project = this.getProjectByIndex(projectIndex);
    if (project) {
      return project.images;
    }
    return [];
  }
}
