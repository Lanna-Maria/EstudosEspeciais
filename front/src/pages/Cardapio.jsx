import React, { useState, useEffect } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import './Cardapio.css';
import axios from 'axios';

import coffe1 from '../assets/imagens/cafe.png';
import coffe2 from '../assets/imagens/sobremesa.png';
import coffe3 from '../assets/imagens/salgados.png';
import coffe4 from '../assets/imagens/bebidaGelada.png';
import coffe5 from '../assets/imagens/cha.png';

function Cardapio() {
  const [currentImage, setCurrentImage] = useState(coffe1);
  const [menuItems, setMenuItems] = useState({
    cafes: [],
    sobremesas: [],
    especiais: [],
    bebidasGeladas: [],
    chas: [],
  });

  // Buscar dados do backend ao montar o componente
  useEffect(() => {
    axios
      .get('http://localhost:4000/api/cardapio')
      .then((response) => {
        const categories = {
          cafes: [],
          sobremesas: [],
          especiais: [],
          bebidasGeladas: [],
          chas: [],
        };
        response.data.forEach((item) => {
          if (categories[item.categoria]) {
            categories[item.categoria].push(item);
          }
        });
        setMenuItems(categories);
      })
      .catch((error) => {
        console.error('Erro ao buscar os itens do menu:', error);
      });
  }, []);

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1>Café Gourmet</h1>
      </div>
      <div className="menu-content">
        <div className="menu-image">
          <img src={currentImage} alt="Menu" />
        </div>
        <div className="menu-tabs">
          <Tabs
            defaultActiveKey="cafes"
            id="styled-menu-tabs"
            className="mb-3"
            onSelect={(key) => {
              switch (key) {
                case 'cafes':
                  setCurrentImage(coffe1);
                  break;
                case 'sobremesas':
                  setCurrentImage(coffe2);
                  break;
                case 'especiais':
                  setCurrentImage(coffe3);
                  break;
                case 'bebidas-geladas':
                  setCurrentImage(coffe4);
                  break;
                case 'chas':
                  setCurrentImage(coffe5);
                  break;
                default:
                  setCurrentImage(coffe1);
              }
            }}
          >
            <Tab eventKey="cafes" title="Cafés">
              <ul className="menu-list">
                {menuItems.cafes.map((item) => (
                  <li key={item.id}>
                    {item.nome} <span>R${item.preco.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </Tab>
            <Tab eventKey="sobremesas" title="Sobremesas">
              <ul className="menu-list">
                {menuItems.sobremesas.map((item) => (
                  <li key={item.id}>
                    {item.nome} <span>R${item.preco.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </Tab>
            <Tab eventKey="especiais" title="Especiais">
              <ul className="menu-list">
                {menuItems.especiais.map((item) => (
                  <li key={item.id}>
                    {item.nome} <span>R${item.preco.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </Tab>
            <Tab eventKey="bebidas-geladas" title="Bebidas Geladas">
              <ul className="menu-list">
                {menuItems.bebidasGeladas.map((item) => (
                  <li key={item.id}>
                    {item.nome} <span>R${item.preco.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </Tab>
            <Tab eventKey="chas" title="Chás">
              <ul className="menu-list">
                {menuItems.chas.map((item) => (
                  <li key={item.id}>
                    {item.nome} <span>R${item.preco.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Cardapio;
