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
  { label: 'Motos no estoque', value: '42', change: '+12%', icon: 'bike', foot: '35 disponíveis · 7 reservadas' },
  { label: 'Faturamento no mês', value: 'R$ 384 mil', change: '+23%', icon: 'chart', foot: 'Vendas concluídas · Junho/2026' },
  { label: 'Leads e contatos', value: '187', change: '+35%', icon: 'users', foot: 'Oportunidades geradas' },
  { label: 'Vendas no mês', value: '16', change: '+23%', icon: 'check', foot: 'Negócios concluídos · Junho/2026' },
];
const categories = [
  { label: 'Trail / Aventura', value: 36, color: '#d71920' },
  { label: 'Street / Urbana', value: 33, color: '#22252b' },
  { label: 'Scooter / Elétrica', value: 19, color: '#888e99' },
  { label: 'Outras', value: 12, color: '#d9dce2' },
];

const currency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value);
const illustrativeSales = [
  { month: 'Jan', units: 8, revenue: 192000 },
  { month: 'Fev', units: 9, revenue: 216000 },
  { month: 'Mar', units: 10, revenue: 240000 },
  { month: 'Abr', units: 12, revenue: 288000 },
  { month: 'Mai', units: 13, revenue: 312000 },
  { month: 'Jun', units: 16, revenue: 384000 },
];
const illustrativeStock = [
  { model: 'Honda XRE 300', category: 'Trail / Aventura', year: 2023, price: 28900, quantity: 15, reserved: 3 },
  { model: 'Honda CG 160', category: 'Street / Urbana', year: 2025, price: 18900, quantity: 14, reserved: 3 },
  { model: 'Yamaha NMAX 160', category: 'Scooter / Elétrica', year: 2025, price: 22900, quantity: 8, reserved: 1 },
  { model: 'Kawasaki Ninja 400', category: 'Outras', year: 2024, price: 34900, quantity: 3, reserved: 0 },
  { model: 'Royal Enfield Meteor 350', category: 'Outras', year: 2025, price: 24900, quantity: 2, reserved: 0 },
];

function BusinessOverview() {
  const [stockQuery, setStockQuery] = useState('');
  const [category, setCategory] = useState('Todas');
  const [salesView, setSalesView] = useState<'revenue' | 'units'>('revenue');
  const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
  const filteredStock = illustrativeStock.filter(item => (category === 'Todas' || item.category === category) && normalize(item.model).includes(normalize(stockQuery.trim())));
  const currentMonth = illustrativeSales[illustrativeSales.length - 1];
  const target = 480000;
  const progress = Math.round(currentMonth.revenue / target * 100);
  const stockValue = illustrativeStock.reduce((total, item) => total + item.price * item.quantity, 0);
  const chartMaximum = Math.max(...illustrativeSales.map(item => item[salesView]));
  return <div className="mb-6 space-y-4 text-foreground">
    <section id="jb-sales-overview" tabIndex={-1} className="jb-panel scroll-mt-6" aria-labelledby="jb-sales-title">
      <div className="jb-panel-heading flex flex-wrap gap-3"><div><p className="jb-kicker">RESULTADOS DO NEGÓCIO</p><h2 id="jb-sales-title">Resumo de vendas</h2></div><span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-800">Junho de 2026 · Ilustrativo</span></div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4"><p className="text-xs text-slate-600">Ticket médio por moto</p><strong className="mt-2 block text-2xl font-bold tracking-tight">{currency(currentMonth.revenue / currentMonth.units)}</strong><span className="text-xs text-slate-500">Faturamento dividido por 16 vendas</span></div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4"><p className="text-xs text-slate-600">Valor do estoque a preço de venda</p><strong className="mt-2 block text-2xl font-bold tracking-tight">{currency(stockValue)}</strong><span className="text-xs text-slate-500">42 motos, incluindo as reservadas</span></div>
        <div className="rounded-lg border border-red-100 bg-red-50 p-4"><div className="flex items-center justify-between gap-2 text-xs text-red-900"><span>Meta de faturamento</span><strong>{progress}%</strong></div><strong className="mt-2 block text-2xl font-bold tracking-tight">{currency(target)}</strong><div className="my-2 h-2 overflow-hidden rounded-full bg-red-100" role="progressbar" aria-label="Meta mensal de faturamento" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><div className="h-full rounded-full bg-red-700" style={{ width: `${progress}%` }} /></div><span className="text-xs text-red-900">Faltam {currency(target - currentMonth.revenue)} para a meta</span></div>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3"><div><h3 className="text-sm font-bold">Evolução das vendas</h3><p className="jb-muted">Janeiro a junho de 2026 · Valores demonstrativos</p></div><div className="jb-segment" role="group" aria-label="Indicador do gráfico de vendas"><button type="button" aria-pressed={salesView === 'revenue'} onClick={() => setSalesView('revenue')}>Faturamento</button><button type="button" aria-pressed={salesView === 'units'} onClick={() => setSalesView('units')}>Motos vendidas</button></div></div>
      <div className="mt-4 overflow-x-auto"><div className="grid min-w-[360px] grid-cols-6 gap-3" role="list" aria-label={salesView === 'revenue' ? 'Faturamento mensal em reais' : 'Quantidade de motos vendidas por mês'}>{illustrativeSales.map(item => <div key={item.month} role="listitem" className="text-center"><span className="block text-xs font-bold text-slate-700">{salesView === 'revenue' ? currency(item.revenue) : `${item.units} motos`}</span><div className="mt-2 flex h-32 items-end justify-center border-b border-slate-200 bg-slate-50" aria-hidden="true"><div className={`w-3/5 rounded-t-md ${item.month === 'Jun' ? 'bg-red-700' : 'bg-slate-700'}`} style={{ height: `${item[salesView] / chartMaximum * 100}%` }} /></div><span className="mt-2 block text-xs text-slate-600">{item.month}</span></div>)}</div></div>
    </section>
    <section id="jb-stock-overview" tabIndex={-1} className="jb-panel scroll-mt-6" aria-labelledby="jb-stock-title">
      <div className="jb-panel-heading flex flex-wrap gap-3"><div><p className="jb-kicker">INVENTÁRIO DA LOJA</p><h2 id="jb-stock-title">Estoque de motos</h2></div><span className="text-xs font-semibold text-slate-600">35 disponíveis / 7 reservadas</span></div>
      <div className="my-5 flex flex-wrap items-end gap-3"><label className="flex min-w-0 flex-1 flex-col gap-2 text-xs font-semibold text-slate-600">Buscar modelo<input type="search" className="min-h-11 w-full rounded-md border border-slate-300 bg-background px-3 text-sm text-foreground" placeholder="Ex.: Honda, NMAX..." value={stockQuery} onChange={event => setStockQuery(event.target.value)} /></label><label className="flex w-full flex-col gap-2 text-xs font-semibold text-slate-600 sm:w-auto">Categoria<select className="min-h-11 rounded-md border border-slate-300 bg-background px-3 text-sm text-foreground" value={category} onChange={event => setCategory(event.target.value)}><option value="Todas">Todas as categorias</option>{categories.map(item => <option key={item.label} value={item.label}>{item.label}</option>)}</select></label></div>
      <div className="overflow-x-auto rounded-lg border border-slate-200"><table className="w-full min-w-[720px] border-collapse text-left text-sm"><caption className="sr-only">Estoque ilustrativo agrupado por modelo. Preços por unidade; o total inclui as reservas.</caption><thead className="bg-slate-50 text-xs text-slate-600"><tr>{['Modelo / categoria', 'Ano', 'Preço unitário', 'Total', 'Disponíveis', 'Reservadas'].map(label => <th key={label} scope="col" className="whitespace-nowrap px-4 py-3 font-semibold">{label}</th>)}</tr></thead><tbody>{filteredStock.map(item => <tr key={item.model} className="border-t border-slate-200 hover:bg-slate-50"><th scope="row" className="px-4 py-4 font-semibold"><span className="block">{item.model}</span><span className="block text-xs font-normal text-slate-500">{item.category}</span></th><td className="px-4 py-4 text-slate-600">{item.year}</td><td className="whitespace-nowrap px-4 py-4 font-semibold">{currency(item.price)}</td><td className="px-4 py-4 tabular-nums">{item.quantity}</td><td className="px-4 py-4"><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">{item.quantity - item.reserved}</span></td><td className="px-4 py-4 tabular-nums text-slate-600">{item.reserved}</td></tr>)}</tbody></table>{filteredStock.length === 0 && <div className="flex flex-col items-center justify-center gap-3 p-8 text-center" role="status"><p className="text-sm text-slate-600">Nenhuma moto encontrada com estes filtros.</p><button type="button" className="jb-button jb-button-secondary" onClick={() => { setStockQuery(''); setCategory('Todas'); }}>Limpar filtros</button></div>}</div>
      <p className="mt-3 text-xs text-slate-500" role="status">{filteredStock.length} modelos · {filteredStock.reduce((total, item) => total + item.quantity, 0)} motos na seleção. Estoque e preços fictícios.</p>
    </section>
  </div>;
}

function DashboardPreview() {
  const [drawer, setDrawer] = useState(false);
  const [query, setQuery] = useState('');
  const [period, setPeriod] = useState<'week' | 'month'>('week');
  const [referenceUnavailable, setReferenceUnavailable] = useState(false);
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
    const sectionId = title === 'Estoque de motos' ? 'jb-stock-overview' : title === 'Relatórios' ? 'jb-sales-overview' : null;
    if (sectionId) {
      if (drawerDialog.current?.open) drawerDialog.current.close();
      const section = document.getElementById(sectionId);
      section?.scrollIntoView({ block: 'start' });
      section?.focus({ preventScroll: true });
      return;
    }
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
        <div className="jb-review-strip flex flex-wrap items-center justify-between gap-3"><span><strong>JB SELECT / PRÉVIA INTERATIVA</strong> Explore os módulos e os gráficos com dados demonstrativos.</span><button type="button" onClick={() => setModal({ title: 'Referência aprovada', reference: true })}>Ver referência <Icon name="arrow" /></button></div>
        <section className="jb-heading flex flex-wrap items-end justify-between gap-5" aria-labelledby="jb-page-title"><div><p className="jb-kicker">JB MOTOS / PAINEL ADMINISTRATIVO</p><h1 id="jb-page-title">Visão geral<span>.</span></h1><p className="jb-muted">Controle da operação. Clareza para acelerar.</p></div><button type="button" className="jb-button jb-button-primary" onClick={() => showModule(actions[0].label, actions[0].detail)}><Icon name="plus" /> Cadastrar moto <Icon name="arrow" /></button></section>
        <section className="jb-metrics grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-4" aria-label="Indicadores demonstrativos">
          {metrics.map((metric, index) => <article key={metric.label} className="jb-metric"><div className="flex items-center justify-between"><span className="jb-metric-label">{metric.label}</span><Icon name={metric.icon} /></div><div className="jb-metric-reading"><strong>{metric.value}</strong><span className="jb-positive">↗ {metric.change}</span></div><div className="jb-metric-footer"><span>{metric.foot}</span><span>0{index + 1}</span></div></article>)}
        </section>
        <p className="jb-data-note">Variações ilustrativas em relação ao período anterior. Resumo comercial de junho de 2026.</p>
        <BusinessOverview />
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
    <dialog ref={dialog} className={`jb-dialog ${modal?.reference ? 'jb-reference-dialog' : ''}`} aria-labelledby="jb-modal-title" onCancel={() => setModal(null)} onClose={() => setModal(null)}><div className="jb-dialog-heading"><h2 id="jb-modal-title">{modal?.title}</h2><button type="button" className="jb-icon-button" aria-label="Fechar" onClick={() => setModal(null)}><Icon name="close" /></button></div>{modal?.reference ? <div className="bg-background text-foreground">{referenceUnavailable ? <div className="flex min-h-48 flex-col items-center justify-center gap-3 p-8 text-center" role="status"><Icon name="image" /><p className="text-sm">A imagem de referência não está disponível neste endereço.</p><button type="button" className="jb-button jb-button-secondary" onClick={() => setReferenceUnavailable(false)}>Tentar novamente</button></div> : <img src="/uploads/Painel_Administrativo_JB_Motos_1_.png" alt="Referência aprovada do painel JB MOTOS: sidebar preta, indicadores, banner vermelho de motocicleta, ações rápidas, gráficos e últimos leads." className="jb-reference-image" onError={() => setReferenceUnavailable(true)} />}</div> : <div className="jb-dialog-body"><span className="jb-kicker">PRÉVIA DE INTERFACE</span><p>{modal?.detail || 'Este módulo mantém sua posição na navegação proposta. Seus fluxos administrativos não foram substituídos nesta prévia.'}</p><div className="jb-dialog-notice"><Icon name="shield" /><span>Esta é uma demonstração da interface. O banco conectado ainda não possui tabelas para as operações administrativas. Nenhum cadastro, publicação ou contato será gravado nesta prévia.</span></div><div className="jb-dialog-actions"><button type="button" className="jb-button jb-button-secondary" onClick={() => setModal(null)}>Voltar à prévia</button></div></div>}</dialog>
  </div>;
}
