import './App.css';
import { LoginContentProvider } from './contexts/login-context';
import Home from './pages/home';

function App() {

  return (
    <LoginContentProvider>
      <div className="App">
        <Home />
      </div>
    </LoginContentProvider>
  );
}

export default App;
