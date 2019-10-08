import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import History from './pages/History';
import Home from './pages/Home';
import './AppRouter.css';

function AppRouter() {
  return (
    <Router>
        <nav>
          <ul class="menu">
            <li><NavLink className="navlink" to="/">Home</NavLink></li>
            <li><NavLink className="navlink" to="/history/">History</NavLink></li>
            <li><NavLink className="navlink" to="#!">Program</NavLink></li>
            <li><NavLink className="navlink" to="#!">Faq</NavLink></li>
          </ul>
        </nav>
        <Route path="/" exact component={Home} />
        <Route path="/history/" component={History} />
    </Router>
  );
}

export default AppRouter;