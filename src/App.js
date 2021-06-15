import { BrowserRouter as Router, Route} from 'react-router-dom';
import HealthCard from './HealthCard';
import SMARTLauncher from './SMARTLauncher';
import Login from './Login';

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
