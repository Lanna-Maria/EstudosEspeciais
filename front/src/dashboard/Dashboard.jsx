import { useEffect, useState } from 'react';
import './Dashboard.css';

export default function Dashboard() {
  const [pedidos, setPedidos] = useState([]);

  const carregarPedidos = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/dashboard');
      const data = await res.json();

      if (Array.isArray(data)) {
        setPedidos(data);
      } else {
        setPedidos([]);
      }
    } catch (error) {
      console.error('Erro ao buscar pedidos', error);
      setPedidos([]);
    }
  };

  useEffect(() => {
    carregarPedidos();
    const interval = setInterval(carregarPedidos, 5000);
    return () => clearInterval(interval);
  }, []);

  const atualizarStatus = async (id, novoStatus) => {
    try {
      await fetch(`http://localhost:3000/api/dashboard/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: novoStatus }),
      });

      carregarPedidos();
    } catch (error) {
      console.error('Erro ao atualizar status', error);
    }
  };

  // FILTROS
  const pendentes = pedidos.filter(
    (p) => (p.status || 'Pendente') === 'Pendente',
  );

  const concluidos = pedidos.filter((p) => p.status === 'Concluído');

  const cancelados = pedidos.filter((p) => p.status === 'Cancelado');

  // HOJE
  const hoje = new Date().toDateString();

  const pedidosHoje = pedidos.filter(
    (p) => new Date(p.criadoEm).toDateString() === hoje,
  );

  // TOTAL
  const totalHoje = pedidosHoje
    .filter((p) => p.status === 'Concluído')
    .reduce((acc, p) => acc + (p.precoTotal || 0), 0);

  const totalPedidos = pedidosHoje.length || 1;

  const porcentagemConcluidos = (concluidos.length / totalPedidos) * 100;
  const porcentagemCancelados = (cancelados.length / totalPedidos) * 100;

  // CARD
  const renderCard = (pedido) => (
    <div
      className={`card ${pedido.status?.toLowerCase() || 'pendente'}`}
      key={pedido.id}
    >
      <div className="card-header">
        <h3>Pedido #{pedido.id}</h3>
        <span className={`badge ${pedido.status?.toLowerCase()}`}>
          {pedido.status || 'Pendente'}
        </span>
      </div>

      <p>
        <strong>Cliente:</strong> {pedido.nomeCliente}
      </p>
      <p>
        <strong>Mesa:</strong> {pedido.numeroMesa}
      </p>

      {/* Pagamento */}
      <p>
        <strong>Pagamento:</strong> {pedido.formaPagamento || 'Não informado'}
      </p>

      {/* 📦 Tipo */}
      <p>
        <strong>Tipo:</strong> {pedido.tipoPedido || 'Não informado'}
      </p>

      {/* Endereço */}
      {pedido.tipoPedido === 'entrega' && (
        <p>
          <strong>Endereço:</strong> {pedido.rua}, {pedido.numero} -{' '}
          {pedido.bairro}
        </p>
      )}

      {/* Troco */}
      {pedido.formaPagamento === 'dinheiro' && pedido.precisaTroco && (
        <p>
          <strong>Troco para:</strong> R$ {pedido.trocoPara}
        </p>
      )}

      {/* Observações */}
      {pedido.observacoes && (
        <p>
          <strong>Obs:</strong> {pedido.observacoes}
        </p>
      )}

      {/* Itens */}
      <ul className="items">
        {Array.isArray(pedido.itens) &&
          pedido.itens.map((item, i) => (
            <li key={i}>
              {item.name}
              <span>x{item.quantity}</span>
            </li>
          ))}
      </ul>

      <p className="total">
        Total: <strong>R$ {pedido.precoTotal?.toFixed(2)}</strong>
      </p>

      {(pedido.status || 'Pendente') === 'Pendente' && (
        <div className="actions">
          <button onClick={() => atualizarStatus(pedido.id, 'Concluído')}>
            Concluir
          </button>

          <button
            className="cancel"
            onClick={() => atualizarStatus(pedido.id, 'Cancelado')}
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="dashboard">
      <header className="topbar">
        <h2>Painel Administrativo</h2>
        <button
          onClick={() => {
            localStorage.removeItem('auth');
            window.location.href = '/admin/login';
          }}
        >
          Sair
        </button>
      </header>

      {/* RESUMO */}
      <div className="stats">
        <div className="stat-card">
          <h4>Pendentes</h4>
          <p>{pendentes.length}</p>
        </div>

        <div className="stat-card">
          <h4>Concluídos</h4>
          <p>{concluidos.length}</p>
        </div>

        <div className="stat-card">
          <h4>Cancelados</h4>
          <p>{cancelados.length}</p>
        </div>

        <div className="stat-card">
          <h4>Faturamento Hoje</h4>
          <p>R$ {totalHoje.toFixed(2)}</p>
        </div>
      </div>

      {/* BARRA */}
      <div className="progress">
        <div
          className="progress-bar concluido"
          style={{ width: `${porcentagemConcluidos}%` }}
        />
        <div
          className="progress-bar cancelado"
          style={{ width: `${porcentagemCancelados}%` }}
        />
      </div>

      {/* LISTAS */}
      <div className="kanban">
        <div className="column">
          <h2>🕒 Pendentes</h2>
          <div className="column-cards">{pendentes.map(renderCard)}</div>
        </div>

        <div className="column">
          <h2>✅ Concluídos</h2>
          <div className="column-cards">{concluidos.map(renderCard)}</div>
        </div>

        <div className="column">
          <h2>❌ Cancelados</h2>
          <div className="column-cards">{cancelados.map(renderCard)}</div>
        </div>
      </div>
    </div>
  );
}
