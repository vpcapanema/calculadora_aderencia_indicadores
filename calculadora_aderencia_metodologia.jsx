// Componente Calculadora de Aderência Metodológica — v2.0
// Melhorias: limiares eliminatórios, rubricas descritivas, justificativa obrigatória,
// análise de sensibilidade, exportação auditável
const { useState } = React;

const CRITERIOS = [
  { nome: 'Proximidade conceitual', peso: 30, chave: 'proximidade_conceitual', explicacao: 'Alinhamento entre o conceito e o que é medido.' },
  { nome: 'Mecanismo causal', peso: 20, chave: 'mecanismo_causal', explicacao: 'Força da relação causal entre fenômeno e métrica.' },
  { nome: 'Validade empírica', peso: 15, chave: 'validade_empirica', explicacao: 'Evidências empíricas e consistência estatística.' },
  { nome: 'Especificidade', peso: 10, chave: 'especificidade', explicacao: 'Isolamento do fenômeno alvo de variáveis externas.' },
  { nome: 'Sensibilidade', peso: 10, chave: 'sensibilidade', explicacao: 'Reatividade a variações reais no tempo/espaço.' },
  { nome: 'Mensurabilidade', peso: 10, chave: 'mensurabilidade', explicacao: 'Disponibilidade, precisão e replicabilidade dos dados.' },
  { nome: 'Custo-benefício', peso: 5, chave: 'custo_beneficio', explicacao: 'Relação entre esforço de coleta e valor analítico.' }
];

const LIMIARES_ELIMINATORIOS = [
  { criterioIndex: 0, minimo: 2, label: 'Proximidade Conceitual ≥ 2' },
  { criterioIndex: 1, minimo: 2, label: 'Mecanismo Causal ≥ 2' }
];

const NOTAS_EXIGEM_JUSTIFICATIVA = [0, 1, 5];

const RUBRICS = {
  proximidade_conceitual: {
    0: 'Nenhuma relação conceitual identificável entre indicador e fenômeno.',
    1: 'Relação conceitual muito fraca ou tangencial.',
    2: 'Relação conceitual parcial — captura aspecto secundário.',
    3: 'Relação conceitual moderada — captura aspecto relevante mas não central.',
    4: 'Relação conceitual forte — mede dimensão central do fenômeno.',
    5: 'Relação conceitual direta e inequívoca — indicador é expressão do fenômeno.'
  },
  mecanismo_causal: {
    0: 'Sem mecanismo causal plausível.',
    1: 'Mecanismo causal especulativo, sem suporte lógico claro.',
    2: 'Mecanismo plausível mas com múltiplas mediações não controladas.',
    3: 'Mecanismo causal identificável com algumas mediações.',
    4: 'Mecanismo causal bem estabelecido com poucas mediações.',
    5: 'Mecanismo causal direto, documentado e sem mediações relevantes.'
  },
  validade_empirica: {
    0: 'Sem evidência empírica de validade.',
    1: 'Evidência empírica anedótica ou contraditória.',
    2: 'Evidência empírica limitada a contextos muito específicos.',
    3: 'Evidência empírica moderada em contextos semelhantes.',
    4: 'Evidência empírica sólida e replicada.',
    5: 'Evidência empírica extensa, meta-análises ou consenso científico.'
  },
  especificidade: {
    0: 'Indicador responde a múltiplos fenômenos sem distinção.',
    1: 'Baixa especificidade — muitos fatores confundidores.',
    2: 'Especificidade limitada — alguns fatores confundidores relevantes.',
    3: 'Especificidade moderada — fatores confundidores identificáveis e parcialmente controláveis.',
    4: 'Alta especificidade — poucos fatores confundidores residuais.',
    5: 'Totalmente específico ao fenômeno alvo.'
  },
  sensibilidade: {
    0: 'Não reage a variações no fenômeno.',
    1: 'Reage apenas a variações extremas.',
    2: 'Detecta variações grandes com atraso ou ruído.',
    3: 'Detecta variações moderadas em tempo razoável.',
    4: 'Detecta variações pequenas com boa resolução temporal.',
    5: 'Altamente sensível — detecta variações sutis em tempo real.'
  },
  mensurabilidade: {
    0: 'Dado inexistente ou inacessível.',
    1: 'Dado existe mas com coleta muito custosa ou imprecisa.',
    2: 'Dado disponível com limitações significativas de precisão ou cobertura.',
    3: 'Dado disponível com precisão aceitável e cobertura parcial.',
    4: 'Dado prontamente disponível, preciso e com boa cobertura.',
    5: 'Dado público, padronizado, alta precisão e cobertura completa.'
  },
  custo_beneficio: {
    0: 'Custo proibitivo sem benefício analítico claro.',
    1: 'Custo muito alto para valor analítico marginal.',
    2: 'Custo alto — justificável apenas em contextos específicos.',
    3: 'Custo moderado com retorno analítico aceitável.',
    4: 'Custo baixo com bom retorno analítico.',
    5: 'Custo mínimo com alto valor analítico.'
  }
};

export default function CalculadoraAderencia() {
  const [step, setStep] = useState(1);
  const [indicadores, setIndicadores] = useState([]);
  const [scores, setScores] = useState({});
  const [justificativas, setJustificativas] = useState({});
  const [avaliador, setAvaliador] = useState('');
  const [objetoEstudo, setObjetoEstudo] = useState('');
  const [hoveredRubric, setHoveredRubric] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const linhas = text.split('\n').filter((l) => l.trim() !== '');
      const cabecalho = linhas[0].split(',');
      const dados = linhas.slice(1).map((l) => {
        const valores = l.split(',');
        const obj = {};
        cabecalho.forEach((c, i) => (obj[c.trim()] = valores[i]?.trim() || ''));
        return obj;
      });
      setIndicadores(dados);
    };
    reader.readAsText(file);
  };

  const handleScoreChange = (indicadorIndex, criterioIndex, valor) => {
    const nota = parseInt(valor);
    setScores((prev) => ({
      ...prev,
      [indicadorIndex]: {
        ...(prev[indicadorIndex] || {}),
        [criterioIndex]: nota
      }
    }));
  };

  const handleJustificativaChange = (indicadorIndex, criterioIndex, texto) => {
    setJustificativas((prev) => ({
      ...prev,
      [`${indicadorIndex}_${criterioIndex}`]: texto
    }));
  };

  const calcularIA = (indicadorIndex) => {
    const s = scores[indicadorIndex] || {};
    const somaPesos = CRITERIOS.reduce((acc, c) => acc + c.peso, 0);
    const total = CRITERIOS.reduce((acc, c, i) => acc + (s[i] || 0) * c.peso, 0);
    return total / somaPesos;
  };

  const verificarLimiares = (indicadorIndex) => {
    const s = scores[indicadorIndex] || {};
    const violacoes = [];
    LIMIARES_ELIMINATORIOS.forEach((lim) => {
      const nota = s[lim.criterioIndex];
      if (nota !== undefined && nota < lim.minimo) {
        violacoes.push(lim.label);
      }
    });
    return violacoes;
  };

  const classificar = (ia, indicadorIndex) => {
    const violacoes = verificarLimiares(indicadorIndex);
    if (violacoes.length > 0) {
      return { classe: 'Incerto/Espúrio', penalizado: true, violacoes };
    }
    let classe;
    if (ia >= 4) classe = 'Direto';
    else if (ia >= 3) classe = 'Proxy Forte';
    else if (ia >= 2) classe = 'Proxy Moderado';
    else classe = 'Incerto/Espúrio';
    return { classe, penalizado: false, violacoes: [] };
  };

  const calcularSensibilidade = (indicadorIndex) => {
    const s = scores[indicadorIndex] || {};
    const iaBase = calcularIA(indicadorIndex);
    let iaMin = iaBase;
    let iaMax = iaBase;
    CRITERIOS.forEach((c, j) => {
      const notaOriginal = s[j] || 0;
      const somaPesos = CRITERIOS.reduce((acc, cr) => acc + cr.peso, 0);
      if (notaOriginal > 0) {
        const totalMenos = CRITERIOS.reduce((acc, cr, k) => acc + (k === j ? (notaOriginal - 1) : (s[k] || 0)) * cr.peso, 0);
        iaMin = Math.min(iaMin, totalMenos / somaPesos);
      }
      if (notaOriginal < 5) {
        const totalMais = CRITERIOS.reduce((acc, cr, k) => acc + (k === j ? (notaOriginal + 1) : (s[k] || 0)) * cr.peso, 0);
        iaMax = Math.max(iaMax, totalMais / somaPesos);
      }
    });
    const classeBase = classificar(iaBase, indicadorIndex).classe;
    const classeMin = classificar(iaMin, indicadorIndex).classe;
    const classeMax = classificar(iaMax, indicadorIndex).classe;
    const estavel = (classeMin === classeBase && classeMax === classeBase);
    return { iaMin: iaMin.toFixed(2), iaMax: iaMax.toFixed(2), estavel };
  };

  const justificativasPendentes = () => {
    const pendentes = [];
    indicadores.forEach((_, i) => {
      const s = scores[i] || {};
      CRITERIOS.forEach((c, j) => {
        const nota = s[j];
        if (nota !== undefined && NOTAS_EXIGEM_JUSTIFICATIVA.includes(nota)) {
          const chave = `${i}_${j}`;
          if (!justificativas[chave] || justificativas[chave].trim() === '') {
            pendentes.push({ indicador: i, criterio: j, nota });
          }
        }
      });
    });
    return pendentes;
  };

  const exportarCSV = () => {
    let csv = 'Indicador;IA;Classificação;Penalizado;Sensibilidade';
    CRITERIOS.forEach((c) => { csv += ';' + c.nome; });
    csv += '\n';
    indicadores.forEach((ind, i) => {
      const ia = calcularIA(i).toFixed(2);
      const resultado = classificar(parseFloat(ia), i);
      const sens = calcularSensibilidade(i);
      const s = scores[i] || {};
      csv += `${ind.indicador || 'Indicador ' + (i + 1)};${ia};${resultado.classe};${resultado.penalizado ? 'Sim' : 'Não'};${sens.estavel ? 'Estável' : 'Sensível (' + sens.iaMin + '-' + sens.iaMax + ')'}`;
      CRITERIOS.forEach((_, j) => { csv += ';' + (s[j] !== undefined ? s[j] : ''); });
      csv += '\n';
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resultados_aderencia.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportarJSON = () => {
    const dados = {
      versao: '2.0',
      dataAvaliacao: new Date().toISOString(),
      avaliador: avaliador || '(não informado)',
      objetoEstudo: objetoEstudo || '(não informado)',
      configuracao: {
        criterios: CRITERIOS.map((c) => ({ nome: c.nome, peso: c.peso })),
        limiaresEliminatorios: LIMIARES_ELIMINATORIOS.map((l) => l.label),
        notasExigemJustificativa: NOTAS_EXIGEM_JUSTIFICATIVA
      },
      indicadores: indicadores.map((ind, i) => {
        const ia = calcularIA(i);
        const resultado = classificar(ia, i);
        const sens = calcularSensibilidade(i);
        const s = scores[i] || {};
        const justifs = {};
        CRITERIOS.forEach((c, j) => {
          const chave = `${i}_${j}`;
          if (justificativas[chave]) justifs[c.chave] = justificativas[chave];
        });
        return {
          nome: ind.indicador || 'Indicador ' + (i + 1),
          ia: parseFloat(ia.toFixed(4)),
          classificacao: resultado.classe,
          penalizado: resultado.penalizado,
          violacoes: resultado.violacoes,
          sensibilidade: { iaMin: parseFloat(sens.iaMin), iaMax: parseFloat(sens.iaMax), estavel: sens.estavel },
          notas: CRITERIOS.reduce((acc, c, j) => { acc[c.chave] = s[j] !== undefined ? s[j] : null; return acc; }, {}),
          justificativas: justifs
        };
      })
    };
    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resultados_aderencia_auditavel.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const pendentes = justificativasPendentes();

  return (
    <div className="calculadora-container">
      {step === 1 && (
        <div className="calculadora-card">
          <h1 className="calculadora-title">Etapa 1 — Identificação e ficha de indicadores</h1>

          <div style={{marginBottom: '1.5rem'}}>
            <h3 style={{marginBottom: '0.5rem'}}>Identificação da Avaliação</h3>
            <div style={{marginBottom: '0.75rem'}}>
              <label style={{display: 'block', fontWeight: 'bold', marginBottom: '0.25rem'}}>Nome do avaliador</label>
              <input type="text" value={avaliador} onChange={(e) => setAvaliador(e.target.value)}
                placeholder="Ex.: João Silva" className="calculadora-text-input" />
            </div>
            <div style={{marginBottom: '0.75rem'}}>
              <label style={{display: 'block', fontWeight: 'bold', marginBottom: '0.25rem'}}>Objeto de estudo</label>
              <input type="text" value={objetoEstudo} onChange={(e) => setObjetoEstudo(e.target.value)}
                placeholder="Ex.: Bacia do Rio Paranapanema" className="calculadora-text-input" />
            </div>
          </div>

          <h3 style={{marginBottom: '0.5rem'}}>Upload do CSV de indicadores</h3>
          <input type="file" accept=".csv" onChange={handleUpload} className="calculadora-file-input" />
          <button
            disabled={indicadores.length === 0}
            onClick={() => setStep(2)}
            className="calculadora-btn primary"
          >
            Prosseguir para atribuição de níveis
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="calculadora-card wide">
          <h2 className="calculadora-subtitle">Etapa 2 — Atribuição de níveis (0–5)</h2>

          {pendentes.length > 0 && (
            <div className="calculadora-alert warning">
              ⚠️ {pendentes.length} justificativa(s) pendente(s) para notas extremas (0, 1 ou 5).
            </div>
          )}

          {indicadores.map((ind, i) => (
            <div key={i} className="calculadora-indicador-card">
              <h3 className="calculadora-indicador-title">{ind.indicador || `Indicador ${i + 1}`}</h3>
              <table className="calculadora-table">
                <thead>
                  <tr>
                    <th>Critério</th>
                    <th>Explicação</th>
                    <th>Nível (0–5)</th>
                    <th>Rubrica</th>
                  </tr>
                </thead>
                <tbody>
                  {CRITERIOS.map((c, j) => {
                    const nota = scores[i]?.[j];
                    const isEliminatorio = LIMIARES_ELIMINATORIOS.some((l) => l.criterioIndex === j);
                    const violado = isEliminatorio && nota !== undefined && nota < 2;
                    const exigeJustificativa = nota !== undefined && NOTAS_EXIGEM_JUSTIFICATIVA.includes(nota);
                    const justChave = `${i}_${j}`;
                    const rubricText = nota !== undefined ? RUBRICS[c.chave]?.[nota] : null;
                    return (
                      <React.Fragment key={j}>
                        <tr className={violado ? 'calculadora-row-violado' : ''}>
                          <td>
                            {c.nome}
                            {isEliminatorio && <span className="calculadora-badge-small eliminatorio" title="Critério eliminatório: nota mínima 2">★</span>}
                          </td>
                          <td>{c.explicacao}</td>
                          <td>
                            <div className="calculadora-radio-group">
                              {[0, 1, 2, 3, 4, 5].map((v) => (
                                <label key={v} className="calculadora-radio-item"
                                  onMouseEnter={() => setHoveredRubric(`${i}_${j}_${v}`)}
                                  onMouseLeave={() => setHoveredRubric(null)}
                                  title={RUBRICS[c.chave]?.[v] || ''}>
                                  <input
                                    type="radio"
                                    name={`score-${i}-${j}`}
                                    value={v}
                                    checked={nota === v}
                                    onChange={(e) => handleScoreChange(i, j, e.target.value)}
                                  />
                                  <span className="calculadora-radio-label">{v}</span>
                                </label>
                              ))}
                            </div>
                            {violado && <div className="calculadora-eliminatorio-warning">⛔ Abaixo do limiar eliminatório (mín. 2)</div>}
                          </td>
                          <td className="calculadora-rubric-cell">
                            {rubricText && <em>{rubricText}</em>}
                          </td>
                        </tr>
                        {exigeJustificativa && (
                          <tr>
                            <td colSpan="4">
                              <div className="calculadora-justificativa-box">
                                <label>📝 Justificativa obrigatória para nota {nota}:</label>
                                <textarea
                                  rows="2"
                                  value={justificativas[justChave] || ''}
                                  onChange={(e) => handleJustificativaChange(i, j, e.target.value)}
                                  placeholder={`Justifique a nota ${nota} para ${c.nome}...`}
                                  className="calculadora-textarea"
                                />
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ))}

          <div className="calculadora-navigation">
            <div className="calculadora-nav-left">
              <button onClick={() => setStep(1)} className="calculadora-btn secondary">Voltar</button>
              <button onClick={() => { setScores({}); setJustificativas({}); }} className="calculadora-btn secondary">Limpar seleção</button>
            </div>
            <div className="calculadora-nav-right">
              <button
                onClick={() => setStep(3)}
                disabled={pendentes.length > 0}
                title={pendentes.length > 0 ? 'Preencha todas as justificativas pendentes antes de calcular' : ''}
                className="calculadora-btn primary"
              >
                Confirmar e calcular
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="calculadora-card wide">
          <h2 className="calculadora-subtitle">Etapa 3 — Cálculo e resultados</h2>

          <div className="calculadora-results-section">
            <div className="calculadora-summary-card">
              <h3 className="calculadora-summary-title">Resumo</h3>
              {avaliador && <p><strong>Avaliador:</strong> {avaliador}</p>}
              {objetoEstudo && <p><strong>Objeto de estudo:</strong> {objetoEstudo}</p>}
              <ul className="calculadora-summary-list">
                {indicadores.map((ind, i) => (
                  <li key={i} className="calculadora-summary-item">
                    {ind.indicador || `Indicador ${i + 1}`} — {Object.keys(scores[i] || {}).length}/7 critérios preenchidos
                  </li>
                ))}
              </ul>
            </div>

            <div className="calculadora-summary-card">
              <h3 className="calculadora-summary-title">Resultados</h3>
              <div className="calculadora-table-wrapper">
                <table className="calculadora-table">
                  <thead>
                    <tr>
                      <th>Indicador</th>
                      <th>IA (0–5)</th>
                      <th>Classificação</th>
                      <th>Sensibilidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {indicadores.map((ind, i) => {
                      const ia = calcularIA(i);
                      const iaStr = ia.toFixed(2);
                      const resultado = classificar(ia, i);
                      const sens = calcularSensibilidade(i);
                      const badgeClass = resultado.classe.toLowerCase().replace(/[^a-z]/g, '-').replace('incerto-espúrio', 'incerto');
                      return (
                        <tr key={i}>
                          <td>{ind.indicador || `Indicador ${i + 1}`}</td>
                          <td>{iaStr}</td>
                          <td>
                            <span className={`calculadora-badge ${badgeClass}`}>
                              {resultado.classe}
                            </span>
                            {resultado.penalizado && (
                              <div className="calculadora-penalizado-detail">
                                ⛔ Rebaixado por: {resultado.violacoes.join(', ')}
                              </div>
                            )}
                          </td>
                          <td>
                            {sens.estavel
                              ? <span className="calculadora-badge estavel">✅ Estável</span>
                              : <span className="calculadora-badge sensivel">⚠️ Sensível ({sens.iaMin}–{sens.iaMax})</span>
                            }
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="calculadora-export-section">
              <h3 className="calculadora-summary-title">Exportar</h3>
              <button onClick={exportarCSV} className="calculadora-btn secondary">📊 Exportar CSV</button>
              <button onClick={exportarJSON} className="calculadora-btn primary">📋 Exportar JSON auditável</button>
            </div>
          </div>

          <div className="calculadora-navigation">
            <button onClick={() => setStep(2)} className="calculadora-btn secondary">Voltar para atribuição</button>
          </div>
        </div>
      )}
    </div>
  );
}
