import './Application.module.css'

import { ButtonDevelopment } from './component/button/ButtonDevelopment';

function App() {

  // _______________________________________________________________ Development

  return (
    <>
      <ButtonDevelopment label="Development Button" onClick={() => alert('Button Clicked!')} />
    </>
  )
}

export default App
