import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import './Pedidos.css';

function Pedidos() {
  const [pedido, setPedido] = useState({
    nomeCliente: '',
    itens: [],
    formaPagamento: '',
    tipoPedido: '',
    rua: '',
    numero: '',
    bairro: '',
    precisaTroco: false,
    trocoPara: '',
    observacoes: '',
  });

  const [menuItems, setMenuItems] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [categoriaAtual, setCategoriaAtual] = useState('');
  const [itemAtual, setItemAtual] = useState('');
  const [quantidadeAtual, setQuantidadeAtual] = useState(1);

  //  Buscar cardápio
  useEffect(() => {
    axios
      .get('http://localhost:4000/api/cardapio')
      .then((response) => {
        const categorias = {
          cafes: {},
          sobremesas: {},
          especiais: {},
          bebidasGeladas: {},
          chas: {},
        };

        response.data.forEach((item) => {
          if (categorias[item.categoria]) {
            categorias[item.categoria][item.nome] = item.preco;
          }
        });

        setMenuItems(categorias);
      })
      .catch((error) => {
        console.error('Erro ao buscar itens do menu:', error);
      });
  }, []);

  const handleCategoriaClick = (categoria) => {
    setCategoriaAtual(categoria);
    setItemAtual('');
    setQuantidadeAtual(1);
    setShowModal(true);
  };

  const handleAdicionarItem = () => {
    if (!itemAtual || quantidadeAtual <= 0) {
      alert('Selecione um item válido.');
      return;
    }

    const itensAtualizados = [...pedido.itens];

    const indexExistente = itensAtualizados.findIndex(
      (item) => item.nome === itemAtual && item.categoria === categoriaAtual,
    );

    if (indexExistente !== -1) {
      itensAtualizados[indexExistente].quantidade += quantidadeAtual;
    } else {
      itensAtualizados.push({
        categoria: categoriaAtual,
        nome: itemAtual,
        preco: menuItems[categoriaAtual][itemAtual],
        quantidade: quantidadeAtual,
      });
    }

    setPedido({ ...pedido, itens: itensAtualizados });
    setShowModal(false);
  };

  const calcularTotal = (itens) => {
    return itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pedido.formaPagamento || !pedido.tipoPedido) {
      alert('Preencha pagamento e tipo de pedido.');
      return;
    }

    if (
      pedido.formaPagamento === 'dinheiro' &&
      pedido.precisaTroco &&
      !pedido.trocoPara
    ) {
      alert('Informe o valor para troco.');
      return;
    }

    if (pedido.tipoPedido === 'entrega') {
      if (!pedido.rua || !pedido.numero || !pedido.bairro) {
        alert('Preencha o endereço completo.');
        return;
      }
    }

    //  CORREÇÃO DO TROCO
    const pedidoCorrigido = {
      ...pedido,
      trocoPara: pedido.precisaTroco ? Number(pedido.trocoPara) || 0 : null,
    };

    axios
      .post('http://localhost:4000/api/pedidos', pedidoCorrigido)
      .then(() => {
        alert('Pedido enviado com sucesso!');

        setPedido({
          nomeCliente: '',
          itens: [],
          formaPagamento: '',
          tipoPedido: '',
          rua: '',
          numero: '',
          bairro: '',
          precisaTroco: false,
          trocoPara: '',
          observacoes: '',
        });
      })
      .catch((error) => {
        console.error('Erro ao enviar pedido:', error);
      });
  };

  return (
    <div className="pedidos-container">
      <h2>Faça seu pedido</h2>

      <form onSubmit={handleSubmit}>
        {/* Nome */}
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            value={pedido.nomeCliente}
            onChange={(e) =>
              setPedido({ ...pedido, nomeCliente: e.target.value })
            }
            required
          />
        </div>

        {/* Pagamento */}
        <div className="form-group">
          <label>Forma de Pagamento:</label>
          <select
            value={pedido.formaPagamento}
            onChange={(e) =>
              setPedido({ ...pedido, formaPagamento: e.target.value })
            }
            required
          >
            <option value="">Selecione</option>
            <option value="dinheiro">Dinheiro</option>
            <option value="pix">Pix</option>
            <option value="debito">Débito</option>
            <option value="credito">Crédito</option>
          </select>
        </div>

        {/* Troco */}
        {pedido.formaPagamento === 'dinheiro' && (
          <>
            <div className="form-group">
              <label>Precisa de troco?</label>
              <select
                value={pedido.precisaTroco}
                onChange={(e) =>
                  setPedido({
                    ...pedido,
                    precisaTroco: e.target.value === 'true',
                    trocoPara:
                      e.target.value === 'true' ? pedido.trocoPara : '',
                  })
                }
              >
                <option value="false">Não</option>
                <option value="true">Sim</option>
              </select>
            </div>

            {pedido.precisaTroco && (
              <div className="form-group">
                <label>Troco para quanto?</label>
                <input
                  type="number"
                  value={pedido.trocoPara}
                  onChange={(e) =>
                    setPedido({
                      ...pedido,
                      trocoPara:
                        e.target.value === '' ? '' : Number(e.target.value),
                    })
                  }
                />
              </div>
            )}
          </>
        )}

        {/* Tipo */}
        <div className="form-group">
          <label>Tipo de Pedido:</label>
          <select
            value={pedido.tipoPedido}
            onChange={(e) =>
              setPedido({ ...pedido, tipoPedido: e.target.value })
            }
            required
          >
            <option value="">Selecione</option>
            <option value="retirada">Retirada</option>
            <option value="entrega">Entrega</option>
          </select>
        </div>

        {/* Endereço */}
        {pedido.tipoPedido === 'entrega' && (
          <>
            <div className="form-group">
              <label>Rua:</label>
              <input
                type="text"
                value={pedido.rua}
                onChange={(e) => setPedido({ ...pedido, rua: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Número:</label>
              <input
                type="text"
                value={pedido.numero}
                onChange={(e) =>
                  setPedido({ ...pedido, numero: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Bairro:</label>
              <input
                type="text"
                value={pedido.bairro}
                onChange={(e) =>
                  setPedido({ ...pedido, bairro: e.target.value })
                }
              />
            </div>
          </>
        )}

        {/* Observações */}
        <div className="form-group">
          <label>Observações:</label>
          <textarea
            value={pedido.observacoes}
            onChange={(e) =>
              setPedido({ ...pedido, observacoes: e.target.value })
            }
          />
        </div>

        {/* CARDÁPIO */}
        <div className="menu-category-list">
          {Object.keys(menuItems).map((categoria) => (
            <Button
              key={categoria}
              onClick={() => handleCategoriaClick(categoria)}
            >
              {categoria}
            </Button>
          ))}
        </div>

        {/* ITENS */}
        <div className="order-items">
          <h3>Seu Pedido:</h3>

          {pedido.itens.length === 0 ? (
            <p>Nenhum item adicionado</p>
          ) : (
            <ul>
              {pedido.itens.map((item, index) => (
                <li key={index}>
                  {item.nome} ({item.categoria}) x{item.quantidade} - R${' '}
                  {(item.preco * item.quantidade).toFixed(2)}
                  <button
                    type="button"
                    onClick={() => {
                      const novosItens = pedido.itens.filter(
                        (_, i) => i !== index,
                      );
                      setPedido({ ...pedido, itens: novosItens });
                    }}
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <h3>Total: R$ {calcularTotal(pedido.itens).toFixed(2)}</h3>

        <button type="submit">Enviar Pedido</button>
      </form>

      {/* MODAL */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar item</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <select
            value={itemAtual}
            onChange={(e) => setItemAtual(e.target.value)}
          >
            <option value="">Selecione</option>
            {Object.keys(menuItems[categoriaAtual] || {}).map((item) => (
              <option key={item} value={item}>
                {item} - R$ {menuItems[categoriaAtual][item].toFixed(2)}
              </option>
            ))}
          </select>

          <input
            type="number"
            value={quantidadeAtual}
            onChange={(e) => setQuantidadeAtual(parseInt(e.target.value))}
            min="1"
          />
        </Modal.Body>

        <Modal.Footer className="meu-footer-modal">
          <Button onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button onClick={handleAdicionarItem}>Adicionar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Pedidos;
