import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import History from './pages/History';
import Home from './pages/Home';

function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/history/">History</Link>
            </li>
          </ul>
        </nav>
        <Route path="/" exact component={Home} />
        <Route path="/history/" component={History} />

      </div>
    </Router>
  );
}

export default AppRouter;