import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity, BarChart3, Bot, Box, Building2, CalendarDays, Check, ChevronDown,
  ClipboardCheck, FileText, Gauge, GraduationCap, Handshake, Leaf, Map,
  MapPin, Menu, PackageCheck, PanelLeftClose, Route, ShieldCheck, ShoppingCart,
  Sparkles, Target, Timer, TrendingUp, Truck, UserCheck, Users, X, Zap
} from 'lucide-react';
import './styles.css';

const months = ['May','Jun','Jul','Ago','Sep','Oct','Nov','Dic','Ene','Feb','Mar','Abr'];

const dashboards = [
  {
    id:'operativa', short:'Eficiencia operativa', icon:Bot,
    title:'Eficiencia Operativa, ERP, IA y Autogestión',
    subtitle:'Control de automatización, centralización y reducción de errores',
    filters:[['Período','Últimos 12 meses'],['Área','Todas'],['Tipo de trámite','Todas'],['Responsable','Todas'],['Sede','Todas']],
    kpis:[
      ['TEFEM','Tasa de errores en formularios enviados en el mes','1,6%','≤ 2,5%','ok',ClipboardCheck,[3.1,2.6,2.1,2.3,1.9,1.5,1.6,1.1,1.3,0.8,1.0,1.6]],
      ['PDIAM','Precisión de extracción de datos por IA en el mes','96,8%','≥ 95%','ok',Bot,[95,96,97,96.5,96.7,97.5,96.8,97.6,97.1,97,98.1,96.8]],
      ['TPPFF','Tiempo promedio de finalización de proyectos fotovoltaicos','16,3 días','≤ 18 días','ok',Timer,[15,12,12,9,8,9,8,7,7.5,8.5,7.3,9]],
      ['IAE','Índice de Autogestión Exitosa','88,7%','≥ 85%','ok',UserCheck,[77,78,78,79,83,87,89,88,88,89,90,88.7]],
      ['TAP','Tasa de Abandono del Proceso','7,2%','≤ 10%','warn',Route,[20,16,12,9,8,7,6,4,4,5,5,7.2]],
      ['IRPI','Índice de Resolución en el Primer Intento','83,1%','≥ 80%','ok',Check,[66,65,63,63,70,75,77,72,68,74,78,83.1]]
    ],
    sections:[
      {title:'1. Automatización interna',subtitle:'Menos errores manuales, IA más precisa y proyectos que se completan más rápido.', charts:[
        ['TEFEM · Errores en formularios','line',[3.1,2.6,2.1,2.3,1.9,1.5,1.6,1.1,1.3,0.8,1.0,1.6],'≤ 2,5%','green'],
        ['PDIAM · Precisión de IA','line',[95,96,97,96.5,96.7,97.5,96.8,97.6,97.1,97,98.1,96.8],'≥ 95%','green'],
        ['TPPFF · Finalización de proyectos','line',[15,12,12,9,8,9,8,7,7.5,8.5,7.3,9],'≤ 18 días','blue']]},
      {title:'2. Autogestión del cliente',subtitle:'Más autogestión exitosa, menos abandono y mejor resolución al primer intento.', charts:[
        ['Evolución del circuito de autogestión','multi',[[77,78,78,79,83,87,89,88,88,89,90,88.7],[20,16,12,9,8,7,6,4,4,5,5,7.2],[66,65,63,63,70,75,77,72,68,74,78,83.1]],'IAE · TAP · IRPI','green']]}
    ]
  },
  {
    id:'expansion', short:'Expansión territorial', icon:MapPin,
    title:'Expansión Territorial, Socios Instaladores y Autosuficiencia Corporativa',
    subtitle:'Seguimiento de escalabilidad operativa y posicionamiento sostenible',
    filters:[['Período','Mayo 2025'],['Zona','Todas'],['Nodo','Todos'],['Sede','Todas'],['Socio instalador','Todos']],
    kpis:[
      ['POD','Porcentaje de Obras Delegadas','37,2%','≥ 35%','ok',Users,[26,28,29,30,31,32,33,34,35,35.8,36.5,37.2]],
      ['TNCS','Tasa de No Conformidad en Socios','4,3%','< 5%','ok',ShieldCheck,[6.2,6,5.6,5.3,5.1,4.9,4.7,4.6,4.5,4.4,4.3,4.3]],
      ['PPANE','Proyectos abastecidos por nodos estratégicos','69,5%','≥ 70%','warn',Route,[58,61,63,65,67,68,66,69,70,68,69,69.5]],
      ['CAV','Cuota de Autoconsumo Verde','34,8%','≥ 40%','warn',Leaf,[26,27,28,29,30,31,32,33,32.5,33.4,34,34.8]]
    ],
    sections:[
      {title:'1. Expansión operativa',subtitle:'Red de nodos estratégicos en la provincia de Córdoba', charts:[
        ['POD · Evolución mensual','bar',[26,28,29,30,31,32,33,34,35,35.8,36.5,37.2],'Meta ≥ 35%','green'],
        ['TNCS · No conformidad','line',[6.2,6,5.6,5.3,5.1,4.9,4.7,4.6,4.5,4.4,4.3,4.3],'Meta < 5%','blue'],
        ['PPANE · Por nodo estratégico','bar',[82.3,67.5,58.7],'Meta ≥ 70%','amber']]},
      {title:'2. Autosuficiencia corporativa',subtitle:'Transición hacia una operación sustentable', charts:[
        ['CAV · Evolución mensual','gauge',34.8,'Meta ≥ 40%','green']]}
    ]
  },
  {
    id:'comercial', short:'Comercial digital', icon:ShoppingCart,
    title:'Comercial Digital y eCommerce', subtitle:'Seguimiento del portal web, simulador y venta online de insumos',
    filters:[['Período','Últimos 12 meses'],['Canal digital','Todos'],['Tipo de contenido','Todas'],['Categoría de producto','Todas']],
    kpis:[
      ['TIC','Interacción con el Contenido mensual','46,8%','≥ 40%','ok',FileText,[29,32,36,41,43,53,48,47,50,54,51,46.8]],
      ['PIIW','Insumos ingresados vía web en un mes','38,6%','≥ 30%','ok',ShoppingCart,[22,23,21,26,29,34,38,42,48,45,41,38.6]],
      ['ESAP','Adquisición de clientes por el simulador','52,7%','≥ 50%','ok',Gauge,[36,40,42,48,50,55,59,60,56,52,50,52.7]]
    ],
    sections:[
      {title:'1. Posicionamiento y contenido',subtitle:'TIC · Porcentaje de Interacción con el Contenido mensual',charts:[['Evolución mensual','line',[29,32,36,41,43,53,48,47,50,54,51,46.8],'Meta ≥ 40%','green']]},
      {title:'2. Canal de venta online',subtitle:'PIIW · Porcentaje de Insumos ingresados vía web',charts:[['Evolución mensual','bar',[22,23,21,26,29,34,38,42,48,45,41,38.6],'Meta ≥ 30%','green']]},
      {title:'3. Simulador y conversión a proyecto',subtitle:'ESAP · Porcentaje de eficiencia del simulador',charts:[['Evolución mensual','line',[36,40,42,48,50,55,59,60,56,52,50,52.7],'Meta ≥ 50%','blue'],['Flujo del simulador','funnel',[100,52.7,52.7],'Conversión a proyecto','green']]}
    ]
  },
  {
    id:'talento', short:'Talento y calidad', icon:GraduationCap,
    title:'Talento, Capacitación y Calidad Técnica', subtitle:'Seguimiento de formación, retención y conformidad regulatoria',
    filters:[['Trimestre','Último trimestre'],['Área técnica','Todas'],['Programa de formación','Todos'],['Sede','Todas']],
    kpis:[
      ['ANCT','Aumento en el número de capacitaciones trimestrales','18,4%','≥ 15%','ok',GraduationCap,[11,13,14,13,15,16,18,18.4]],
      ['TA','Tasa de Acreditación','87,2%','≥ 85%','ok',ClipboardCheck,[81,82,84,83,86,87,88,87.2]],
      ['IRT','Índice de Retención de Talento','91,6%','≥ 90%','ok',Users,[89,90,91,90,92,93,92,91.6]],
      ['ICE','Conformidad en Inspecciones EPEC','94,1%','≥ 95%','warn',ShieldCheck,[91,92,93,93,94,94,93.8,94.1]]
    ],
    sections:[
      {title:'1. Capacitación',subtitle:'Impulso al desarrollo de competencias técnicas',charts:[['Evolución trimestral','line',[11,14,17,19.5],'Meta ≥ 15%','blue'],['Acreditación por ciclo','bar',[92,87,82,80],'Acreditación','green']]},
      {title:'2. Retención',subtitle:'Fidelización del talento especializado',charts:[['Retención trimestral','line',[91,94,93.5,92.8],'Meta ≥ 90%','blue']]},
      {title:'3. Calidad técnica regulatoria',subtitle:'Aseguramiento de conformidad y cumplimiento normativo',charts:[['Conformidad regulatoria','gauge',94.1,'Meta ≥ 95%','green'],['Inspecciones EPEC','line',[91.8,93.5,94.1,93.7],'Meta ≥ 95%','blue']]}
    ]
  },
  {
    id:'logistica', short:'Logística y compras', icon:Truck,
    title:'Logística, Compras y Performance Técnica', subtitle:'Control de rechazos, roturas, trazabilidad y rendimiento instalado',
    filters:[['Período','Últimos 12 meses'],['Proveedor','Todos'],['Proyecto','Todos'],['Nodo','Todos'],['Sede','Todas'],['Responsable logístico','Todas']],
    kpis:[
      ['TRC','Tasa de Rechazo de Componentes en Recepción','1,9%','≤ 2,5%','ok',ClipboardCheck,[2,1.6,1.8,2.2,1.9,1.8,2.1,1.9,2.3,1.8,1.2,1.9]],
      ['PR','Índice de Rendimiento Técnico / Performance Ratio','86,3%','≥ 85%','ok',Zap,[86,86,86,86,84,84.5,87,88,90,89,87,86.3]],
      ['IPR','Índice de Pérdida por Roturas','2,8%','≤ 2%','critical',Box,[3.4,3.8,4.2,3.5,3.6,3.3,2.9,3,2.7,2.8,2.6,2.8]],
      ['TTL','Tasa de Trazabilidad Logística','94,2%','≥ 95%','warn',Truck,[88,89,88,90,89,91,92,91,94,95,94,94.2]]
    ],
    sections:[
      {title:'1. Calidad de componentes',subtitle:'Enfoque: TRC · Tasa de Rechazo de Componentes en Recepción',charts:[['TRC (%) · Evolución mensual','line',[2,1.6,1.8,2.2,1.9,1.8,2.1,1.9,2.3,1.8,1.2,1.9],'Meta ≤ 2,5%','blue']]},
      {title:'2. Rendimiento técnico de plantas',subtitle:'Enfoque: PR · Índice de Rendimiento Técnico',charts:[['PR (%) · Evolución mensual','line',[86,86,86,86,84,84.5,87,88,90,89,87,86.3],'Meta ≥ 85%','blue']]},
      {title:'3. Pérdidas por roturas',subtitle:'Enfoque: IPR · Índice de Pérdida por Roturas',charts:[['IPR (%) · Evolución mensual','line',[3.4,3.8,4.2,3.5,3.6,3.3,2.9,3,2.7,2.8,2.6,2.8],'Meta ≤ 2%','red']]},
      {title:'4. Trazabilidad logística',subtitle:'Enfoque: TTL · Tasa de Trazabilidad Logística',charts:[['TTL (%) · Evolución mensual','bar',[88,89,88,90,89,91,92,91,94,95,94,94.2],'Meta ≥ 95%','blue']]}
    ]
  }
];

const palette={green:'#2ea612',blue:'#0756c9',amber:'#f2aa00',red:'#df1019'};
const filterOptions={
  'Período':['Últimos 12 meses','Últimos 6 meses','Año 2026','Mayo 2025'],
  'Trimestre':['Último trimestre','Q1 2026','Q4 2025','Q3 2025'],
  'Área':['Todas','Operaciones','Administración','Ingeniería'],
  'Área técnica':['Todas','Instalaciones','Mantenimiento','Ingeniería'],
  'Tipo de trámite':['Todas','Alta','Modificación','Seguimiento'],
  'Responsable':['Todas','Equipo Norte','Equipo Centro','Equipo Sur'],
  'Responsable logístico':['Todas','Coordinación central','Nodo Norte','Nodo Sur'],
  'Sede':['Todas','Central','Norte','Sur'],
  'Zona':['Todas','Norte','Centro','Sur'],
  'Nodo':['Todos','Almacén Central','Nodo Norte','Nodo Sur'],
  'Socio instalador':['Todos','Solar Córdoba','EcoVolt','Andes Energía'],
  'Canal digital':['Todos','Portal web','Simulador','eCommerce'],
  'Tipo de contenido':['Todas','Guías','Casos de éxito','Fichas técnicas'],
  'Categoría de producto':['Todas','Paneles','Inversores','Estructuras'],
  'Programa de formación':['Todos','Programa internacional','Montaje crítico','Seguridad eléctrica'],
  'Proveedor':['Todos','Proveedor A','Proveedor B','Proveedor C'],
  'Proyecto':['Todos','Parque Norte','Planta Centro','Complejo Sur']
};
function points(vals,w=280,h=95,p=12){const min=Math.min(...vals),max=Math.max(...vals),span=max-min||1;return vals.map((v,i)=>`${p+i*(w-2*p)/(vals.length-1)},${h-p-(v-min)*(h-2*p)/span}`).join(' ')}

function MiniTrend({values,status,id}){const c=status==='critical'?palette.red:status==='warn'?palette.amber:palette.green;const gradientId=`trend-${id}`;const trendPoints=points(values,150,58,8);return <svg className="mini" viewBox="0 0 150 58" aria-hidden="true"><defs><linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={c} stopOpacity=".24"/><stop offset="1" stopColor={c} stopOpacity="0"/></linearGradient></defs><polygon className="mini-area" points={`8,50 ${trendPoints} 142,50`} fill={`url(#${gradientId})`}/><polyline className="mini-line" points={trendPoints} fill="none" stroke={c} strokeWidth="2.3"/><g fill={c}>{values.map((_,i)=>{const [x,y]=trendPoints.split(' ')[i].split(',');return <circle className="mini-dot" style={{animationDelay:`${.45+i*.035}s`}} key={i} cx={x} cy={y} r="2.5"/>})}</g></svg>}

function Chart({spec}){const [title,type,data,meta,colorName]=spec,c=palette[colorName]||palette.green;if(type==='gauge'){const value=data;return <div className="chart"><div className="chart-title">{title}</div><div className="gauge" style={{'--value':`${value*1.8}deg`,'--gauge':c}}><div><strong>{String(value).replace('.',',')}%</strong><span>{meta}</span></div></div></div>}
 if(type==='funnel')return <div className="chart funnel-chart"><div className="chart-title">{title}</div><div className="funnel"><div>Simulaciones iniciadas <b>100%</b></div><div>Simulaciones completadas <b>52,7%</b></div><div>Conversión a proyecto <b>52,7%</b></div></div></div>;
 const series=type==='multi'?data:[data];return <div className="chart"><div className="chart-head"><span className="chart-title">{title}</span><span className="meta">{meta}</span></div><svg viewBox="0 0 300 145" className="chart-svg" role="img" aria-label={title}>{[30,65,100,135].map(y=><line key={y} x1="18" x2="286" y1={y} y2={y} stroke="#dce5f1" strokeWidth="1"/>)}{type==='bar'?data.map((v,i)=>{const max=Math.max(...data)*1.12;const h=105*v/max;const x=22+i*260/data.length;const width=Math.max(8,260/data.length-7);return <rect className="chart-bar" style={{animationDelay:`${i*.055}s`,transformOrigin:`${x+width/2}px 132px`}} key={i} x={x} y={132-h} width={width} height={h} rx="2" fill={c}/>}):series.map((s,idx)=><g key={idx}><polyline className="chart-line" style={{animationDelay:`${idx*.16}s`}} points={points(s,290,120,18)} transform="translate(0 11)" fill="none" stroke={[palette.green,palette.amber,palette.blue][idx]||c} strokeWidth="3"/><g fill={[palette.green,palette.amber,palette.blue][idx]||c}>{s.map((_,i)=>{const [x,y]=points(s,290,120,18).split(' ')[i].split(',');return <circle className="chart-dot" style={{animationDelay:`${.55+idx*.14+i*.035}s`}} key={i} cx={x} cy={Number(y)+11} r="3"/>})}</g></g>)}</svg><div className="axis">{(data.length<=4?['Q2','Q3','Q4','Q1']:months).slice(0,Array.isArray(data[0])?12:data.length).map(x=><span key={x}>{x}</span>)}</div></div>}

function Header(){return <header className="brandbar"><div className="brand"><span>Solar</span><b>Tech</b><i><Sparkles size={14}/></i></div><div className="promise"><strong>SolarTech: Impulsando el Futuro</strong><span>Estrategias de mejora continua para la transición energética.</span></div><div className="header-item"><Building2/><span><b>SolarTech: Ingeniería</b>y servicios B2B (Industrias y Agro).</span></div><div className="header-item"><Target/><span><b className="lime">Misión</b>Transición hacia una matriz energética sostenible.</span></div><div className="header-item"><TrendingUp/><span><b className="lime">Visión 2030</b>Líder técnico regional en integración fotovoltaica.</span></div><div className="sun"><span>☀</span><Zap/></div></header>}

function Sidebar({open,setOpen,current,onNavigate}){return <><button className="menu-btn" onClick={()=>setOpen(!open)} aria-label={open?'Cerrar menú':'Abrir menú'}>{open?<PanelLeftClose/>:<Menu/>}<span>Tableros</span></button>{open?<button className="scrim" onClick={()=>setOpen(false)} aria-label="Cerrar menú"/>:null}<aside className={`sidebar ${open?'open':''}`} aria-hidden={!open}><div className="side-head"><div className="side-logo"><Zap/>SolarTech</div><button onClick={()=>setOpen(false)} aria-label="Cerrar"><X/></button></div><p>Tableros estratégicos</p><nav>{dashboards.map((d,i)=>{const Icon=d.icon;return <button key={d.id} className={current===i?'active':''} onClick={()=>{onNavigate(i);setOpen(false);window.scrollTo({top:0,behavior:'smooth'})}}><span className="nav-icon"><Icon/></span><span><small>0{i+1}</small>{d.short}</span></button>})}</nav><div className="side-foot"><Leaf/><span>Transición energética<br/><b>SolarTech 2030</b></span></div></aside></>}

function KPI({kpi,index}){const [code,label,value,goal,status,Icon,values]=kpi;return <article className={`kpi ${status}`} style={{animationDelay:`${index*.07}s`}}><div className="kpi-icon"><Icon/></div><div className="kpi-main"><h3><b>{code}</b> · {label}</h3><strong className="kpi-value">{value}</strong><div className="kpi-meta"><span>META: <b>{goal}</b></span><span className="state"><i>{status==='critical'?'!':status==='warn'?'!':'✓'}</i>{status==='critical'?'Crítico':status==='warn'?'Atención':'Cumple'}</span></div></div><MiniTrend id={code} values={values} status={status}/></article>}

function Filter({item,index,value,isOpen,onToggle,onSelect}){const icons=[CalendarDays,MapPin,Route,Building2,Users,PackageCheck];const Icon=icons[index%icons.length];const options=filterOptions[item[0]]||[item[1],'Opción A','Opción B'];return <div className={`filter ${isOpen?'open':''}`}><span><Icon/>{item[0]}</span><button className="filter-trigger" type="button" aria-expanded={isOpen} onClick={onToggle}><span>{value}</span><ChevronDown/></button>{isOpen?<div className="filter-menu" role="listbox" aria-label={item[0]}>{options.map(option=><button type="button" role="option" aria-selected={option===value} className={option===value?'selected':''} onClick={()=>onSelect(option)} key={option}><span>{option}</span>{option===value?<Check/>:null}</button>)}</div>:null}</div>}

function Dashboard({data,selections,onFilterChange}){const [openFilter,setOpenFilter]=useState(null);useEffect(()=>setOpenFilter(null),[data.id]);return <main className="dashboard"><section className="title-row"><div><h1>{data.title}</h1><p>{data.subtitle}</p></div><div className="filters">{data.filters.map((f,i)=><Filter item={f} index={i} value={selections[i]||f[1]} isOpen={openFilter===i} onToggle={()=>setOpenFilter(openFilter===i?null:i)} onSelect={value=>{setOpenFilter(null);onFilterChange(i,value)}} key={f[0]}/>)}</div></section><section className={`kpi-grid k${data.kpis.length}`}>{data.kpis.map((k,i)=><KPI kpi={k} index={i} key={k[0]}/>)}</section><section className={`sections s${data.sections.length}`}>{data.sections.map((section,i)=><article className="panel" style={{animationDelay:`${.18+i*.09}s`}} key={section.title}><div className="panel-head"><span className="panel-icon">{React.createElement(data.icon)}</span><div><h2>{section.title}</h2><p>{section.subtitle}</p></div></div><div className={`charts c${section.charts.length}`}>{section.charts.map((chart,j)=><Chart spec={chart} key={j}/>)}</div><div className="insight"><span><Check/></span><p>{i===0?'Los indicadores mantienen una evolución consistente y alineada con los objetivos estratégicos.':'El seguimiento integrado permite anticipar desvíos y sostener la mejora continua.'}</p></div></article>)}</section><section className="value-chain"><div><Activity/><span><b>Resumen estratégico</b>Cadena de valor y estado consolidado</span></div>{data.kpis.slice(0,4).map(k=><div key={k[0]}><span className={`dot ${k[4]}`}/><span><b>{k[0]}</b>{k[2]}</span></div>)}</section></main>}

function DashboardLoading(){return <main className="dashboard loading-dashboard" aria-label="Cargando tablero"><div className="loading-title"><i/><i/></div><div className="loading-filters">{[0,1,2,3].map(i=><i key={i}/>)}</div><div className="loading-kpis">{[0,1,2,3,4,5].map(i=><i key={i}/>)}</div><div className="loading-panels"><i/><i/></div><div className="loading-label"><span/><b>Actualizando indicadores</b></div></main>}

function App(){const [current,setCurrent]=useState(0),[open,setOpen]=useState(false),[loading,setLoading]=useState(true),[revision,setRevision]=useState(0),[selections,setSelections]=useState({});const timerRef=useRef();const startLoading=(duration=620)=>{window.clearTimeout(timerRef.current);setLoading(true);timerRef.current=window.setTimeout(()=>{setLoading(false);setRevision(value=>value+1)},duration)};useEffect(()=>{startLoading(850);return()=>window.clearTimeout(timerRef.current)},[]);const navigate=index=>{if(index===current){return}setCurrent(index);startLoading()};const changeFilter=(index,value)=>{setSelections(previous=>({...previous,[dashboards[current].id]:{...(previous[dashboards[current].id]||{}),[index]:value}}));startLoading(480)};return <><Header/><Sidebar open={open} setOpen={setOpen} current={current} onNavigate={navigate}/>{loading?<DashboardLoading/>:<Dashboard key={`${dashboards[current].id}-${revision}`} data={dashboards[current]} selections={selections[dashboards[current].id]||{}} onFilterChange={changeFilter}/>}</>}

createRoot(document.getElementById('root')).render(<App/>);
