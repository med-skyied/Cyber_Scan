import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';

// the app pages
import Home from './pages/Home';
import Root from './pages/Root';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Nopage from './pages/Nopage';
import Contact from './pages/Contact';
import ResetPassword from './pages/Reset_password';

// the app services
import FindMyIP from './services/Find_my_ip';
import CVEsSearch from './services/CVEs_pages';
import DnsLookUp from './services/Dns_lookup';
import IpHistory from './services/Ipaddress_history';
import HostInfoGather from './services/Host_info_gather';
import HttpHeaders from './services/Http_headers';
import SecurityLevel from './services/Security_level';
import PortScanner from './services/Port_scanning';

export default function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route>
          <Route index element={<Root />} />
          <Route path='/home' element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path='/reset_password' element={<ResetPassword />} />
          <Route path="*" element={<Nopage />} />

          <Route path='/find_my_ip' element={<FindMyIP />} />
          <Route path='/cve_search' element={<CVEsSearch />}/>
          <Route path='/dns_lookup' element={<DnsLookUp />} />
          <Route path='/ipaddress_history' element={<IpHistory />} />
          <Route path='/host_gather_info' element={<HostInfoGather />} />
          <Route path='/http_headers' element={<HttpHeaders />} />
          <Route path='/security_check' element={<SecurityLevel />} />
          <Route path='/scan_ports' element={<PortScanner />} />

        </Route>
      </Routes>

    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
