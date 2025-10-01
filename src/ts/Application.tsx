import { useEffect } from 'react';

import styles from './Application.module.css'

import Engine from './engine/Engine';

import UI from './ui/UI';

export default function Application() {

  // ____________________________________________________________________ Engine

  // Initialise Engine Once
  useEffect(() => {
    Engine.init();
    Engine.start();

    return () => {
      Engine.stop();
    }
  }, []);

  // ____________________________________________________________________ Layout

  return (
    <div className={styles['application']}>
      <UI />
    </div>
  )
}
