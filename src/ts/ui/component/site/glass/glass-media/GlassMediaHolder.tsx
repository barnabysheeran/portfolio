import { forwardRef, useImperativeHandle } from 'react';

import styles from './GlassMediaHolder.module.css';

export interface GlassMediaHolderHandle {
  onMediaClear: () => void;
  onMediaShowProject: (projectIndex?: number) => void;
}

interface GlassMediaHolderProps {
  onMediaClear: () => void;
  onMediaShowProject: (projectIndex?: number) => void;
}

const GlassMediaHolder = forwardRef<
  GlassMediaHolderHandle,
  GlassMediaHolderProps
>((props, ref) => {
  const {
    onMediaClear: _onMediaClear,
    onMediaShowProject: _onMediaShowProject,
  } = props;

  void _onMediaClear;
  void _onMediaShowProject;

  // _______________________________________________________________ Glass Media

  useImperativeHandle(
    ref,
    () => ({
      onMediaClear: () => {
        console.log('GlassMediaHolder: onMediaClear');
      },
      onMediaShowProject: (projectIndex?: number) => {
        console.log('GlassMediaHolder: onMediaShowProject', projectIndex);
      },
    }),
    [],
  );

  // ____________________________________________________________________ Render

  return (
    <div className={styles['glass-media-holder']}>
      GlassMedia *****************
    </div>
  );
});

GlassMediaHolder.displayName = 'GlassMediaHolder';

export default GlassMediaHolder;
