import './App.css';
import "./style/App.scss";
import IndexMobile from './views/IndexMobile';
import IndexPC from './views/IndexPC';

function App() {

  const isMobile = () => {
    const userAgent = window.navigator.userAgent;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  }

  return (
    <div className="App">
      {
        isMobile() ? 
        <IndexMobile />
        :
        <IndexPC />
      }
    </div>
  );
}

export default App;
