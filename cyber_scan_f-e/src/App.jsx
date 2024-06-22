
import './App.css';

import { BrowserRouter, Link, Routes, Router } from 'react-router-dom';
import { Route } from 'react-router-dom';

import Home from './pages/Home';
import Root from './pages/Root';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';

export default function App() {
  return (
    <BrowserRouter>
    <Router>
      <Routes>
        <Route exact path="/" component={Root} />
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/about" component={About} />
      </Routes>
    </Router>
    </BrowserRouter>
  );
}
