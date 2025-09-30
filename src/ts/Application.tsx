import styles from './Application.module.css'

import { ButtonDevelopment } from './component/button/ButtonDevelopment';

export default function Application() {
  return (
    <div className={styles['application']}>
      <ButtonDevelopment label="Development Button" onClick={() => alert('Button Clicked!')} />
    </div>
  )
}