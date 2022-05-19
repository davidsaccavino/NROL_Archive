import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {Route, Link, Routes} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import AddLaunch from './components/add-launch.component.js';
import LaunchList from './components/launch-list.component.js';
import Launch from './components/launch.component.js';
import Login from './components/auth/login.component.js';
import Register from './components/auth/register.component.js';

export let history = createBrowserHistory();


export default function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          OnivaLabs
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/launches/list" className="nav-link">
              Launches
            </Link>
          </li>
          <li className="nav-item">
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
            <Route exact path="/add" component={<AddLaunch />} />
            <Route path={"/"} element={<LaunchList />} />
            <Route path={"/launches/list"} element={<LaunchList />} />
            <Route path="/launches/:id" element={<Launch />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}


