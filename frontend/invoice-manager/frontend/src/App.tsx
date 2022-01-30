import React from 'react';
import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import CreateClient from './Pages/ClientPage';
import NewInvoice from './Pages/NewInvoice';
import SignIn from './Pages/SignIn';
import { ToastContainer } from 'react-bootstrap';
import ClientList from './Pages/ClientList';
import Dashboard from './Pages/Dashboard';
import ViewDetails from './Pages/ViewDetails';

function App() {
  const [selectedCompany, setSelectedCompany] = useState('');
  return (
    <Router>
      <main>
        <Container>
          <Routes>
            <Route path='/newClient' element={<CreateClient />} />
            <Route path='/newInvoice' element={<NewInvoice />} />
            <Route path='/signIn' element={<SignIn />} />
            <Route
              path='/clientList'
              element={<ClientList setSelectedCompany={setSelectedCompany} />}
            />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route
              path='/viewDetails/:gstNum'
              element={<ViewDetails selectedCompany={selectedCompany} />}
            />
          </Routes>
        </Container>
        <ToastContainer position='top-center' />
      </main>
    </Router>
  );
}

export default App;
