import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Inicio from './pages/Inicio';
import Cardapio from './pages/Cardapio';
import Pedidos from './pages/Pedidos';
import NotFound from './pages/NotFound';

import AdminLogin from './pages/AdminLogin';
import Dashboard from './dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute';

import 'bootstrap/dist/css/bootstrap.min.css';

//  Conteúdo principal (usa useLocation)
function AppContent() {
  const location = useLocation();

  //  só o dashboard NÃO terá header/footer
  const isDashboard = location.pathname.startsWith('/admin/dashboard');

  return (
    <>
      {/* HEADER */}
      {!isDashboard && <Header />}

      <Routes>
        {/* ROTAS PÚBLICAS */}
        <Route path="/" element={<Inicio />} />
        <Route path="/cardapio" element={<Cardapio />} />
        <Route path="/pedidos" element={<Pedidos />} />

        {/* LOGIN ADMIN (COM HEADER/FOOTER) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/*  DASHBOARD PROTEGIDO (SEM HEADER/FOOTER) */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/*  ROTA NÃO ENCONTRADA */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* FOOTER */}
      {!isDashboard && <Footer />}
    </>
  );
}

//  App principal (ativa o Router)
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
