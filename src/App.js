import { BrowserRouter as Router, Route} from 'react-router-dom';
import HealthCard from './components/HealthCard';
import SMARTLauncher from './components/SMARTLauncher';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Route exact path="/app" component={HealthCard} />
      <Route exact path="/launch" component={SMARTLauncher} />
      <Route exact path="/" component={Login} /> 
    </Router>
  );
}

export default App;
