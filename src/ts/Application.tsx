import styles from './Application.module.css'

import UI from './ui/UI';

export default function Application() {
  return (
    <div className={styles['application']}>
      <UI />
    </div>
  )
}
