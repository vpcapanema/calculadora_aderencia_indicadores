// Componente Calculadora de Aderência Metodológica
// Usar React e useState do escopo global
const { useState } = React;

export default function CalculadoraAderencia() {
  const [step, setStep] = useState(1);
  const [indicadores, setIndicadores] = useState([]);
  const [scores, setScores] = useState({});
  const criterios = [
    { nome: 'Proximidade conceitual', peso: 30, explicacao: 'Alinhamento entre o conceito e o que é medido.' },
    { nome: 'Mecanismo causal', peso: 20, explicacao: 'Força da relação causal entre fenômeno e métrica.' },
    { nome: 'Validade empírica', peso: 15, explicacao: 'Evidências empíricas e consistência estatística.' },
    { nome: 'Especificidade', peso: 10, explicacao: 'Isolamento do fenômeno alvo de variáveis externas.' },
    { nome: 'Sensibilidade', peso: 10, explicacao: 'Reatividade a variações reais no tempo/espaço.' },
    { nome: 'Mensurabilidade', peso: 10, explicacao: 'Disponibilidade, precisão e replicabilidade dos dados.' },
    { nome: 'Custo-benefício', peso: 5, explicacao: 'Relação entre esforço de coleta e valor analítico.' }
  ];

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
    setScores((prev) => ({
      ...prev,
      [indicadorIndex]: {
        ...(prev[indicadorIndex] || {}),
        [criterioIndex]: parseInt(valor)
      }
    }));
  };

  const calcularIA = (indicadorIndex) => {
    const s = scores[indicadorIndex] || {};
    const somaPesos = criterios.reduce((acc, c) => acc + c.peso, 0);
    const total = criterios.reduce((acc, c, i) => acc + (s[i] || 0) * c.peso, 0);
    return total / somaPesos;
  };

  const classificar = (ia) => {
    if (ia >= 4) return 'Direto';
    if (ia >= 3) return 'Proxy Forte';
    if (ia >= 2) return 'Proxy Moderado';
    return 'Incerto/Espúrio';
  };

  return (
    <div className="calculadora-container">
      {step === 1 && (
        <div className="calculadora-card">
          <h1 className="calculadora-title">Etapa 1 — Ficha mínima de indicadores</h1>
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
          {indicadores.map((ind, i) => (
            <div key={i} className="calculadora-indicador-card">
              <h3 className="calculadora-indicador-title">{ind.indicador || `Indicador ${i + 1}`}</h3>
              <table className="calculadora-table">
                <thead>
                  <tr>
                    <th>Critério</th>
                    <th>Explicação</th>
                    <th>Nível (0–5)</th>
                  </tr>
                </thead>
                <tbody>
                  {criterios.map((c, j) => (
                    <tr key={j}>
                      <td>{c.nome}</td>
                      <td>{c.explicacao}</td>
                      <td>
                        <div className="calculadora-radio-group">
                          {[0, 1, 2, 3, 4, 5].map((v) => (
                            <label key={v} className="calculadora-radio-item">
                              <input
                                type="radio"
                                name={`score-${i}-${j}`}
                                value={v}
                                checked={scores[i]?.[j] === v}
                                onChange={(e) => handleScoreChange(i, j, e.target.value)}
                              />
                              <span className="calculadora-radio-label">{v}</span>
                            </label>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          <div className="calculadora-navigation">
            <div className="calculadora-nav-left">
              <button onClick={() => setStep(1)} className="calculadora-btn secondary">Voltar</button>
              <button onClick={() => setScores({})} className="calculadora-btn secondary">Limpar seleção</button>
            </div>
            <div className="calculadora-nav-right">
              <button onClick={() => setStep(3)} className="calculadora-btn primary">Confirmar e calcular</button>
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
                    </tr>
                  </thead>
                  <tbody>
                    {indicadores.map((ind, i) => {
                      const ia = calcularIA(i).toFixed(2);
                      const classe = classificar(ia);
                      const badgeClass = classe.toLowerCase().replace(/[^a-z]/g, '-').replace('incerto-espúrio', 'incerto');
                      return (
                        <tr key={i}>
                          <td>{ind.indicador || `Indicador ${i + 1}`}</td>
                          <td>{ia}</td>
                          <td>
                            <span className={`calculadora-badge ${badgeClass}`}>
                              {classe}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
