import './App.css'

import { ButtonDevelopment } from './ts/component/button/ButtonDevelopment';

function App() {

  // _______________________________________________________________ Development

  return (
    <>
      <ButtonDevelopment label="Development Button" onClick={() => alert('Button Clicked!')} />
    </>
  )
}

export default App
