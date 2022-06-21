import { RouterElement } from './routes'
import VConsole from 'vconsole';
process.env.NODE_ENV === 'development' && new VConsole();

const App = () => {
  return RouterElement()
}

export default App
