import { useEffect, useState } from 'react';
import { buscarPedidos, atualizarStatusPedido } from '../../services/dashboardService';
import OrderCard from '../../components/OrderCard/OrderCard';
import AddItemModal from '../../components/AddItemModal/AddItemModal';

import './Dashboard.css';

function Dashboard() {
  const [pedidos, setPedidos] = useState([]);
  const [showAddItem, setShowAddItem] = useState(false);

  const carregarPedidos = async () => {
    try {
      const data = await buscarPedidos();
      setPedidos(data);
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
      await atualizarStatusPedido(id, novoStatus);
      carregarPedidos();
    } catch (error) {
      console.error('Erro ao atualizar status', error);
    }
  };

  const pendentes = pedidos.filter(
    (p) => (p.status || 'Pendente') === 'Pendente',
  );

  const concluidos = pedidos.filter((p) => p.status === 'Concluído');
  const cancelados = pedidos.filter((p) => p.status === 'Cancelado');
  const hoje = new Date().toDateString();

  const pedidosHoje = pedidos.filter(
    (p) => new Date(p.criadoEm).toDateString() === hoje,
  );

  const totalHoje = pedidosHoje
    .filter((p) => p.status === 'Concluído')
    .reduce((acc, p) => acc + (p.precoTotal || 0), 0);

  const totalPedidos = pedidosHoje.length || 1;
  const porcentagemConcluidos = (concluidos.length / totalPedidos) * 100;
  const porcentagemCancelados = (cancelados.length / totalPedidos) * 100;

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
      <div className="hero-menu">
        <h1>Dashboard de Faturamento</h1>
        <p>  Acompanhe o faturamento, pedidos concluídos, pendentes e demais indicadores do estabelecimento.</p>
      </div>
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
      <div className="kanban">
        <div className="column">
          <h2>Pendentes</h2>
          <div className="column-cards">
          {pendentes.map((pedido) => (
            <OrderCard
              key={pedido.id}
              pedido={pedido}
              atualizarStatus={atualizarStatus}
            />
          ))}
        </div>
        </div>
        <div className="column">
          <h2>Concluídos</h2>
          <div className="column-cards">
            {concluidos.map((pedido) => (
              <OrderCard
                key={pedido.id}
                pedido={pedido}
                atualizarStatus={atualizarStatus}
              />
            ))}
          </div>
        </div>
        <div className="column">
          <h2>Cancelados</h2>
          <div className="column-cards">
            {cancelados.map((pedido) => (
              <OrderCard
                key={pedido.id}
                pedido={pedido}
                atualizarStatus={atualizarStatus}
              />
            ))}
          </div>
        </div>
      </div>
      <button
        className="fab-add-item"
        onClick={() => setShowAddItem(true)}
        title="Adicionar item ao cardápio"
        aria-label="Adicionar item ao cardápio"
      >
        +
      </button>
      <AddItemModal
        isOpen={showAddItem}
        onClose={() => setShowAddItem(false)}
      />
    </div>
  );
}

export default Dashboard;