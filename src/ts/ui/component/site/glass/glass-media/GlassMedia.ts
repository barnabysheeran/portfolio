export default class GlassMedia {
  // _______________________________________________________________ Constructor

  constructor() {
    console.log('GlassMedia: Constructor');
  }

  // ______________________________________________________________ External API

  onMediaShowProject(projectIndex?: number) {
    console.log('GlassMedia: onMediaShowProject', projectIndex);
  }

  onMediaClear() {
    console.log('GlassMedia: onMediaClear');
  }
}
