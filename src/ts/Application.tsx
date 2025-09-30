import styles from './Application.module.css'

import { UI } from './ui/UI';

import { ButtonDevelopment } from './ui/component/button/ButtonDevelopment';

export default function Application() {
  return (
    <div className={styles['application']}>
      <ButtonDevelopment label="Development Button" onClick={() => alert('Button Clicked!')} />
      <UI />
    </div>
  )
}
