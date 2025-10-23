# 📊 PLI SIGMA - Calculadora de Aderência Metodológica

![PLI SIGMA](https://img.shields.io/badge/PLI-SIGMA-blue?style=for-the-badge)
![Versão](https://img.shields.io/badge/versão-1.0.0-green?style=for-the-badge)
![Status](https://img.shields.io/badge/status-ativo-success?style=for-the-badge)

## 🎯 Sobre o Projeto

A **Calculadora de Aderência Metodológica PLI SIGMA** é uma ferramenta web desenvolvida para avaliar o grau de aderência de indicadores a objetos de estudo, seguindo a metodologia científica estabelecida pelo sistema PLI SIGMA.

### 🔬 Metodologia

O sistema avalia cada indicador através de **7 critérios metodológicos** com pesos específicos:

| Critério | Peso | Descrição |
|----------|------|-----------|
| **Proximidade Conceitual** | 30% | Alinhamento entre o conceito e o que é medido |
| **Mecanismo Causal** | 20% | Força da relação causal entre fenômeno e métrica |
| **Validade Empírica** | 15% | Evidências empíricas e consistência estatística |
| **Especificidade** | 10% | Isolamento do fenômeno alvo de variáveis externas |
| **Sensibilidade** | 10% | Reatividade a variações reais no tempo/espaço |
| **Mensurabilidade** | 10% | Disponibilidade, precisão e replicabilidade dos dados |
| **Custo-benefício** | 5% | Relação entre esforço de coleta e valor analítico |

### 📈 Classificação dos Resultados

- **🟢 Direto** (IA ≥ 4,0): Alta aderência metodológica
- **🔵 Proxy Forte** (3,0 ≤ IA < 4,0): Boa aderência, proxy confiável
- **🟡 Proxy Moderado** (2,0 ≤ IA < 3,0): Aderência moderada, uso limitado
- **🔴 Incerto/Espúrio** (IA < 2,0): Baixa aderência, necessita revisão

## 🚀 Funcionalidades

### ✨ Principais Recursos

- **📥 Upload de CSV**: Importação de indicadores via template padronizado
- **📋 Template Automático**: Download do template pré-configurado
- **⚡ Avaliação em Tempo Real**: Salvamento automático durante a avaliação
- **📊 Resultados Detalhados**: Análise completa com gráficos e métricas
- **📄 Exportação**: Relatórios em CSV para análise posterior
- **🖨️ Impressão**: Layout otimizado para documentação física
- **📱 Responsivo**: Interface adaptável para diferentes dispositivos

### 🔄 Fluxo de Trabalho

```mermaid
graph LR
    A[📥 Upload/Entrada] --> B[📊 Avaliação]
    B --> C[📈 Resultados]
    C --> D[📄 Exportação]
```

1. **Entrada de Dados**: Upload de CSV ou inserção manual de indicadores
2. **Avaliação**: Atribuição de níveis (0-5) para cada critério
3. **Cálculo**: Processamento automático do Índice de Aderência (IA)
4. **Resultados**: Visualização detalhada e classificação final

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Framework**: React 18 (via CDN)
- **Estilização**: CSS Custom Properties (Variáveis CSS)
- **Persistência**: LocalStorage API
- **Build**: Vanilla (sem bundlers)
- **Deploy**: GitHub Pages

## 📁 Estrutura do Projeto

```
📦 PLI-SIGMA-Calculadora/
├── 📄 index.html                 # Redirecionamento para home
├── 📄 home.html                  # Página principal
├── 📄 atribuicao-niveis.html     # Avaliação dos critérios
├── 📄 resultados.html            # Exibição dos resultados
├── 📄 guia-template.html         # Guia de uso do template
├── 📄 calculadora-react.html     # Versão React do componente
├── 📂 styles/                    # Arquivos CSS
│   ├── 🎨 global.css            # Variáveis e layout global
│   ├── 🎨 calculadora-aderencia.css # Estilos específicos
│   ├── 🎨 cards.css             # Componentes de card
│   ├── 🎨 components.css        # Componentes reutilizáveis
│   ├── 🎨 filters.css           # Filtros e interações
│   ├── 🎨 map.css               # Estilos para mapas (futuro)
│   └── 🎨 WelcomeSection_PLI.css # Seção de boas-vindas
├── ⚛️ calculadora_aderencia_metodologia.jsx # Componente React
├── 📋 .gitignore                # Exclusões do Git
└── 📖 README.md                 # Esta documentação
```

## 🌐 Como Usar

### 🔗 Acesso Online
Acesse a aplicação em: **[PLI SIGMA Calculator](https://vpcapanema.github.io/pli-sigma-calculadora)**

### 💻 Execução Local

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/vpcapanema/pli-sigma-calculadora.git
   cd pli-sigma-calculadora
   ```

2. **Inicie um servidor local**:
   ```bash
   # Python 3
   python -m http.server 3005
   
   # Python 2
   python -m SimpleHTTPServer 3005
   
   # Node.js (se tiver instalado)
   npx serve . -p 3005
   ```

3. **Acesse no navegador**:
   ```
   http://localhost:3005
   ```

### 📋 Template CSV

O sistema utiliza um template CSV específico com as seguintes colunas:

```csv
indicador,descricao,area,unidade_medida,fonte
"Taxa de Crescimento Populacional","Mede o crescimento anual da população","Demografia","%","IBGE"
```

**Instruções**:
1. Baixe o template na página inicial
2. Preencha os dados dos indicadores
3. Faça upload do arquivo preenchido
4. Proceda com a avaliação

## 🎨 Design System

### 🎨 Paleta de Cores

```css
--sigma-primary: #0f203e;      /* Azul institucional */
--sigma-secondary: #113d69;    /* Azul médio */
--sigma-accent: #e3eefd;       /* Azul claro */
--sigma-success: #092000;      /* Verde institucional */
--sigma-warning: #eb950c;      /* Amarelo */
--sigma-error: #8e1608;        /* Vermelho */
```

### 📏 Sistema de Espaçamento

- **XS**: 4px (0.25rem)
- **SM**: 8px (0.5rem)
- **MD**: 16px (1rem)
- **LG**: 24px (1.5rem)
- **XL**: 32px (2rem)
- **2XL**: 40px (2.5rem)

## 🧪 Desenvolvimento

### 🔧 Estrutura de Classes CSS

```css
/* Layout padronizado */
.pli-main-container          /* Container principal */
.pli-content-container       /* Container de conteúdo */
.pli-card                    /* Cards padronizados */
.pli-grid                    /* Sistema de grid */

/* Componentes específicos */
.calculadora-btn             /* Botões do sistema */
.calculadora-table           /* Tabelas */
.calculadora-radio-group     /* Grupos de radio buttons */
```

### 📱 Responsividade

- **Desktop**: ≥ 1200px
- **Tablet**: 768px - 1199px
- **Mobile**: ≤ 767px

## 🤝 Contribuição

### 🔀 Como Contribuir

1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra** um Pull Request

### 📝 Padrões de Código

- Use **nomenclatura em português** para variáveis relacionadas ao domínio
- Mantenha **consistência** com o design system PLI SIGMA
- **Documente** funções complexas
- **Teste** em diferentes navegadores

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Equipe

**Desenvolvido com ❤️ pela equipe técnica PLI SIGMA**

- 🏗️ **Arquitetura**: Sistema de avaliação multicritério
- 🎨 **Design**: Interface baseada no design system SIGMA
- ⚡ **Performance**: Otimizado para web e mobile
- 🔬 **Metodologia**: Baseado em evidências científicas

## 📞 Suporte

Para dúvidas, sugestões ou reportar problemas:

- 📧 **Email**: vpcapanema@outlook.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/vpcapanema/pli-sigma-calculadora/issues)
- 📖 **Documentação**: [Wiki do Projeto](https://github.com/vpcapanema/pli-sigma-calculadora/wiki)

---

<div align="center">

**⭐ Se este projeto foi útil, considere dar uma estrela!**

[![GitHub stars](https://img.shields.io/github/stars/vpcapanema/pli-sigma-calculadora?style=social)](https://github.com/vpcapanema/pli-sigma-calculadora/stargazers)

</div>