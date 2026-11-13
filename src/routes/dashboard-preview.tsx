import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import './dashboard-preview.css';

export const Route = createFileRoute('/dashboard-preview')({
  head: () => ({
    meta: [{ title: 'JB MOTOS | Prévia do painel' }],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&family=Manrope:wght@400;500;600;700;800&display=swap' },
    ],
  }),
  component: DashboardPreview,
});

type IconName = 'grid' | 'bike' | 'layers' | 'users' | 'chart' | 'gear' | 'shield' | 'arrow' | 'plus' | 'folder' | 'bolt' | 'image' | 'star' | 'link' | 'search' | 'menu' | 'close' | 'eye' | 'check';
const paths: Record<IconName, string> = {
  grid: 'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',
  bike: 'M8 17a4 4 0 1 1-8 0 4 4 0 0 1 8 0 M24 17a4 4 0 1 1-8 0 4 4 0 0 1 8 0 M4 17l5-9h7l4 9 M9 8l4 9H4 M14 4h3l3 13 M6 8h5',
  layers: 'M12 3l10 6-10 6L2 9z M2 13l10 6 10-6 M2 17l10 6 10-6',
  users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0 M17 4a4 4 0 0 1 0 8 M22 21v-2a4 4 0 0 0-3-3.9',
  chart: 'M4 20V12h4v8 M10 20V7h4v13 M16 20V3h4v17',
  gear: 'M9 3h6l1 4 4 1v8l-4 1-1 4H9l-1-4-4-1V8l4-1z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
  shield: 'M12 3l9 4v6c0 5-9 9-9 9s-9-4-9-9V7z M8 12l3 3 5-6',
  arrow: 'M5 12h14 M13 6l6 6-6 6',
  plus: 'M12 5v14 M5 12h14',
  folder: 'M3 20V5h6l3 3h9v12z',
  bolt: 'M13 2L4 14h7l-1 8 10-13h-7z',
  image: 'M3 3h18v18H3z M3 17l6-6 4 4 3-3 5 5 M8 7h.01',
  star: 'M12 3l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z',
  link: 'M10 13a5 5 0 0 0 7 0l4-4a5 5 0 0 0-7-7l-3 3 M14 11a5 5 0 0 0-7 0l-4 4a5 5 0 0 0 7 7l3-3',
  search: 'M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0 M15 15l6 6',
  menu: 'M3 6h18 M3 12h18 M3 18h18',
  close: 'M6 6l12 12 M18 6L6 18',
  eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7 M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
  check: 'M5 12l4 4L19 6',
};
function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  return <svg className={className} width="20" height="20" viewBox={name === 'bike' ? '-1 0 26 24' : '0 0 24 24'} fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}
const navigation: { label: string; icon: IconName }[] = [
  { label: 'Visão geral', icon: 'grid' }, { label: 'Estoque de motos', icon: 'bike' },
  { label: 'Publicações', icon: 'layers' }, { label: 'Funcionários', icon: 'users' },
  { label: 'Clientes e leads', icon: 'users' }, { label: 'Financiamentos', icon: 'link' },
  { label: 'Relatórios', icon: 'chart' }, { label: 'Marketing', icon: 'bolt' },
  { label: 'Personalização', icon: 'image' }, { label: 'Configurações', icon: 'gear' },
  { label: 'Segurança e logs', icon: 'shield' }, { label: 'Backup e restauração', icon: 'folder' },
];
const actions: { label: string; icon: IconName; detail: string }[] = [
  { label: 'Cadastrar moto', icon: 'plus', detail: 'Cadastro de veículos com informações técnicas, fotos e publicação no catálogo.' },
  { label: 'Importar por pastas', icon: 'folder', detail: 'Organização e importação de imagens para o estoque.' },
  { label: 'FAST POST', icon: 'bolt', detail: 'Criação assistida de publicações a partir do estoque.' },
  { label: 'Nova publicação', icon: 'image', detail: 'Composição de conteúdo para os canais da concessionária.' },
  { label: 'Gerenciar destaques', icon: 'star', detail: 'Seleção dos veículos que ocupam o banner principal.' },
  { label: 'Compartilhar catálogo', icon: 'link', detail: 'Compartilhamento do catálogo público com clientes.' },
];
const metrics: { label: string; value: string; change: string; icon: IconName; foot: string }[] = [
  { label: 'Motos no estoque', value: '42', change: '+12%', icon: 'bike', foot: 'Inventário disponível' },
  { label: 'Visualizações', value: '5.268', change: '+28%', icon: 'eye', foot: 'Alcance do catálogo' },
  { label: 'Leads e contatos', value: '187', change: '+35%', icon: 'users', foot: 'Oportunidades geradas' },
  { label: 'Vendas no mês', value: '16', change: '+23%', icon: 'check', foot: 'Negócios concluídos' },
];
const categories = [
  { label: 'Trail / Aventura', value: 36, color: '#d71920' },
  { label: 'Street / Urbana', value: 33, color: '#22252b' },
  { label: 'Scooter / Elétrica', value: 19, color: '#888e99' },
  { label: 'Outras', value: 12, color: '#d9dce2' },
];

function DashboardPreview() {
  const [drawer, setDrawer] = useState(false);
  const [query, setQuery] = useState('');
  const [period, setPeriod] = useState<'week' | 'month'>('week');
  const [modal, setModal] = useState<{ title: string; detail?: string; reference?: boolean } | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const drawerDialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (modal && !dialog.current?.open) dialog.current?.showModal();
    if (!modal && dialog.current?.open) dialog.current.close();
  }, [modal]);
  useEffect(() => {
    if (drawer && !drawerDialog.current?.open) drawerDialog.current?.showModal();
    if (!drawer && drawerDialog.current?.open) drawerDialog.current.close();
  }, [drawer]);
  const showModule = (title: string, detail?: string) => {
    setDrawer(false);
    setModal({ title, detail });
  };
  const matchingModules = navigation.filter(item => item.label.toLocaleLowerCase('pt-BR').includes(query.toLocaleLowerCase('pt-BR')));
  const navContent = <>
    <div className="jb-brand" aria-label="JB MOTOS Concessionária"><span><b>JB</b> MOTOS<i /></span><small>CONCESSIONÁRIA</small></div>
    <div className="jb-sidebar-caption">CENTRAL DE GESTÃO <span>01</span></div>
    <nav aria-label="Módulos administrativos" className="flex flex-col gap-1">
      {navigation.map((item, index) => <button key={item.label} type="button" className={`jb-nav-item ${index === 0 ? 'is-active' : ''}`} aria-current={index === 0 ? 'page' : undefined} onClick={() => index === 0 ? setDrawer(false) : showModule(item.label)}><Icon name={item.icon} /><span>{item.label}</span>{index === 0 && <span className="jb-nav-dot" />}</button>)}
    </nav>
    <div className="jb-sidebar-bottom"><span className="jb-kicker">PRECISÃO EM CADA DECISÃO.</span><p>Seu próximo movimento<br /><strong>começa aqui.</strong></p><div className="jb-preview-status"><span /> Ambiente de prévia</div></div>
  </>;
  const chartPoints = period === 'week' ? '30,149 90,125 150,106 210,101 270,68 330,58 390,26' : '30,152 90,136 150,142 210,87 270,94 330,49 390,26';
  return <div className="jb-dashboard-preview min-h-screen bg-background text-foreground">
    <aside className="jb-sidebar hidden xl:flex">{navContent}</aside>
    <dialog ref={drawerDialog} className="jb-mobile-drawer" onCancel={() => setDrawer(false)} onClose={() => setDrawer(false)} aria-label="Menu administrativo"><button type="button" className="jb-icon-button jb-drawer-close" aria-label="Fechar menu" onClick={() => setDrawer(false)}><Icon name="close" /></button>{navContent}</dialog>
    <div className="jb-workspace min-w-0">
      <header className="jb-topbar flex items-center justify-between gap-4">
        <button type="button" className="jb-icon-button xl:hidden" aria-label="Abrir menu" onClick={() => setDrawer(true)}><Icon name="menu" /></button>
        <div className="jb-breadcrumb hidden sm:flex"><span>Workspace</span><span>/</span><strong>Visão geral</strong></div>
        <div className="jb-topbar-right flex items-center gap-4"><span className="jb-mode-label">PRÉVIA VISUAL</span><div className="jb-profile"><span className="jb-avatar">JB</span><div className="hidden sm:block"><strong>Administrador</strong><small>JB MOTOS · Perfil ilustrativo</small></div></div></div>
      </header>
      <main className="jb-main">
        <div className="jb-review-strip flex flex-wrap items-center justify-between gap-3"><span><strong>Direção de arte / 01</strong> Dados demonstrativos. Nenhuma alteração no sistema real.</span><button type="button" onClick={() => setModal({ title: 'Referência aprovada', reference: true })}>Ver referência <Icon name="arrow" /></button></div>
        <section className="jb-heading flex flex-wrap items-end justify-between gap-5" aria-labelledby="jb-page-title"><div><p className="jb-kicker">JB MOTOS / PAINEL ADMINISTRATIVO</p><h1 id="jb-page-title">Visão geral<span>.</span></h1><p className="jb-muted">Controle da operação. Clareza para acelerar.</p></div><button type="button" className="jb-button jb-button-primary" onClick={() => showModule(actions[0].label, actions[0].detail)}><Icon name="plus" /> Cadastrar moto <Icon name="arrow" /></button></section>
        <section className="jb-metrics grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-4" aria-label="Indicadores demonstrativos">
          {metrics.map((metric, index) => <article key={metric.label} className="jb-metric"><div className="flex items-center justify-between"><span className="jb-metric-label">{metric.label}</span><Icon name={metric.icon} /></div><div className="jb-metric-reading"><strong>{metric.value}</strong><span className="jb-positive">↗ {metric.change}</span></div><div className="jb-metric-footer"><span>{metric.foot}</span><span>0{index + 1}</span></div></article>)}
        </section>
        <p className="jb-data-note">Variações ilustrativas em relação ao período anterior.</p>
        <div className="jb-feature-grid grid gap-4">
          <section className="jb-feature" aria-labelledby="jb-feature-title"><div className="jb-feature-top"><span className="jb-light-label"><i /> DESTAQUE DO ESTOQUE</span><span>01 / 03</span></div><div className="jb-feature-copy"><p>HONDA · ADVENTURE</p><h2 id="jb-feature-title">XRE 300<span>2026</span></h2><p className="jb-feature-description">Presença que impõe respeito.<br />Liberdade para ir além.</p><button type="button" className="jb-button jb-button-light" onClick={() => showModule('Editar destaque', 'Prévia da posição editorial do destaque de estoque. A fotografia do veículo será mantida na integração com o painel existente.')}><Icon name="image" /> Editar destaque <Icon name="arrow" /></button></div><div className="jb-instrument" aria-hidden="true"><div className="jb-instrument-ring" /><div className="jb-instrument-core"><span>ADVENTURE</span><strong>300</strong><small>JB / SELECT</small></div></div><div className="jb-feature-footer"><span>CURADORIA JB MOTOS</span><span>COMPOSIÇÃO EDITORIAL / PRÉVIA</span></div></section>
          <section className="jb-panel jb-quick" aria-labelledby="jb-quick-title"><div className="jb-panel-heading"><h2 id="jb-quick-title"><Icon name="bolt" /> Ações rápidas</h2><span className="jb-section-index">02</span></div><p className="jb-muted jb-panel-subtitle">Menos etapas. Mais resultado.</p><div className="jb-actions grid grid-cols-2 gap-2 sm:grid-cols-3">{actions.map(action => <button type="button" key={action.label} onClick={() => showModule(action.label, action.detail)}><Icon name={action.icon} /><span>{action.label}</span></button>)}</div></section>
        </div>
        <div className="jb-analytics-grid grid gap-4">
          <section className="jb-panel jb-chart-panel" aria-labelledby="jb-chart-title"><div className="jb-panel-heading"><h2 id="jb-chart-title">Desempenho do catálogo</h2><Icon name="chart" /></div><div className="jb-chart-summary flex flex-wrap items-center justify-between gap-3"><div><strong>{period === 'week' ? '5.268' : '18.420'}</strong><span> visualizações ilustrativas</span></div><div className="jb-segment" role="group" aria-label="Período do gráfico"><button type="button" aria-pressed={period === 'week'} onClick={() => setPeriod('week')}>7 dias</button><button type="button" aria-pressed={period === 'month'} onClick={() => setPeriod('month')}>30 dias</button></div></div><svg className="jb-line-chart" viewBox="0 0 420 190" role="img" aria-label={period === 'week' ? 'Gráfico demonstrativo de crescimento semanal: 600, 1.600, 2.400, 2.600, 4.000, 4.400 e 5.268 visualizações.' : 'Gráfico demonstrativo mensal, com tendência de crescimento e duas quedas intermediárias.'}><defs><linearGradient id="jb-preview-chart-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#d71920" stopOpacity=".16" /><stop offset="100%" stopColor="#d71920" stopOpacity="0" /></linearGradient></defs>{[35, 80, 125, 170].map(y => <line key={y} x1="30" x2="390" y1={y} y2={y} stroke="#e4e6eb" strokeDasharray="3 5" />)}<polygon points={`30,170 ${chartPoints} 390,170`} fill="url(#jb-preview-chart-fill)" /><polyline points={chartPoints} fill="none" stroke="#d71920" strokeWidth="3" strokeLinejoin="round" /><circle cx="390" cy="26" r="5" fill="#d71920" stroke="white" strokeWidth="3" />{(period === 'week' ? ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'] : ['01', '05', '10', '15', '20', '25', '30']).map((day, index) => <text key={day} x={30 + index * 60} y="188" textAnchor="middle" fill="#626976" fontSize="11">{day}</text>)}</svg></section>
          <section className="jb-panel" aria-labelledby="jb-category-title"><div className="jb-panel-heading"><h2 id="jb-category-title">Motos por categoria</h2><span className="jb-section-index">03</span></div><div className="jb-donut-wrap"><div className="jb-donut" role="img" aria-label="42 motos demonstrativas: Trail 36%, Street 33%, Scooter 19% e outras 12%"><div><strong>42</strong><span>MOTOS</span></div></div></div><ul className="jb-legend">{categories.map(category => <li key={category.label}><span><i style={{ backgroundColor: category.color }} />{category.label}</span><strong>{category.value}%</strong></li>)}</ul></section>
          <section className="jb-panel" aria-labelledby="jb-leads-title"><div className="jb-panel-heading"><h2 id="jb-leads-title">Últimos leads</h2><button type="button" className="jb-text-button" onClick={() => showModule('Clientes e leads')}>Ver todos <Icon name="arrow" /></button></div><p className="jb-muted jb-panel-subtitle">Contatos fictícios para avaliação visual</p><div className="jb-leads">{[{ initials: 'JS', name: 'João Silva', bike: 'XRE 300', time: '12 min' }, { initials: 'MO', name: 'Maria Oliveira', bike: 'Start 160', time: '28 min' }, { initials: 'CD', name: 'Carlos Dantas', bike: 'Sahara 300', time: '47 min' }].map(lead => <button key={lead.initials} type="button" onClick={() => showModule(lead.name, 'Contato fictício. Na integração, os detalhes deverão seguir as permissões já existentes.')}><span className="jb-lead-avatar">{lead.initials}</span><span className="jb-lead-info"><strong>{lead.name}</strong><small>Interesse: {lead.bike}</small></span><span className="jb-lead-time">{lead.time}<Icon name="arrow" /></span></button>)}</div><div className="jb-leads-foot"><span className="jb-static-dot" /> Atendimento próximo. Gestão precisa.</div></section>
        </div>
        <section className="jb-modules" aria-labelledby="jb-modules-title"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="jb-kicker">CONTROLE DA OPERAÇÃO</p><h2 id="jb-modules-title">Seu painel, em movimento.</h2></div><label className="jb-search"><Icon name="search" /><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Buscar módulos..." aria-label="Buscar módulos da prévia" /></label></div><div className="jb-module-list grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">{matchingModules.filter(item => item.label !== 'Visão geral').map(item => <button type="button" key={item.label} onClick={() => showModule(item.label)}><Icon name={item.icon} /><span>{item.label}</span><Icon name="arrow" /></button>)}</div>{matchingModules.filter(item => item.label !== 'Visão geral').length === 0 && <p className="jb-empty" role="status">Nenhum módulo encontrado para esta busca.</p>}</section>
        <footer className="jb-footer flex flex-wrap items-center justify-between gap-3"><span><strong>JB MOTOS</strong> / Gestão com personalidade.</span><span>Prévia para aprovação · Sem conexão a dados operacionais</span></footer>
      </main>
    </div>
    <dialog ref={dialog} className={`jb-dialog ${modal?.reference ? 'jb-reference-dialog' : ''}`} aria-labelledby="jb-modal-title" onCancel={() => setModal(null)} onClose={() => setModal(null)}><div className="jb-dialog-heading"><h2 id="jb-modal-title">{modal?.title}</h2><button type="button" className="jb-icon-button" aria-label="Fechar" onClick={() => setModal(null)}><Icon name="close" /></button></div>{modal?.reference ? <img src="/uploads/Painel_Administrativo_JB_Motos_1_.png" alt="Referência aprovada do painel JB MOTOS: sidebar preta, indicadores, banner vermelho de motocicleta, ações rápidas, gráficos e últimos leads." className="jb-reference-image" /> : <div className="jb-dialog-body"><span className="jb-kicker">PRÉVIA DE INTERFACE</span><p>{modal?.detail || 'Este módulo mantém sua posição na navegação proposta. Seus fluxos administrativos não foram substituídos nesta prévia.'}</p><div className="jb-dialog-notice"><Icon name="shield" /><span>Operações, permissões e integrações serão preservadas na aplicação ao painel existente. Nenhum dado será enviado por esta tela.</span></div><div className="jb-dialog-actions"><button type="button" className="jb-button jb-button-secondary" onClick={() => setModal(null)}>Voltar à prévia</button><button type="button" className="jb-button jb-button-primary" disabled title="Indisponível no modo de prévia">Operação indisponível</button></div></div>}</dialog>
  </div>;
}
