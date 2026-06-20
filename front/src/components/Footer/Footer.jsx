import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
        <p> © {currentYear} Café Gourmet. Todos os direitos reservados</p>
    </footer>
  );
}

export default Footer;
