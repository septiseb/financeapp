import "./App.css";

import Header from "./components/Header";
import CurrenciesRates from "./components/CurrenciesRates";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="flex">
          <Sidebar />
          <Switch>
            <Route exact path="/:currency" component={CurrenciesRates} />
          </Switch>
        </div>
      </Router>
    </>
  );
}
export default App;
