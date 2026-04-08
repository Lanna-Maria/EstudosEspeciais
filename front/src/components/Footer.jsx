import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <p> © {currentYear} copy café gourmet. Todos os direitos reservados</p>
      </div>
    </footer>
  );
}

export default Footer;
