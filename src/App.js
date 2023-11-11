import Assortiment from "./components/sections/assortiment/Assortiment";
import {BrowserRouter} from 'react-router-dom'
import './styles/common.scss'

function App() {
  return (
    <BrowserRouter>
    <div className="app__wrapper">
    
    <div className="container">
      <Assortiment />
    </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
