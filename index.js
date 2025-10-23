// index.js - Arquivo principal para renderizar a aplicação React
const { StrictMode } = React;
const { createRoot } = ReactDOM;

// Aguardar que o componente seja carregado
function waitForComponent() {
    if (typeof CalculadoraAderencia === 'function') {
        renderApp();
    } else {
        console.log('Aguardando componente carregar...');
        setTimeout(waitForComponent, 100);
    }
}

// Função principal para renderizar a aplicação
function renderApp() {
    const container = document.getElementById('root');
    const root = createRoot(container);
    
    root.render(
        React.createElement(StrictMode, null,
            React.createElement(CalculadoraAderencia)
        )
    );
    
    console.log('📊 Calculadora de Aderência Metodológica PLI carregada com sucesso!');
}

// Aguardar o DOM estar pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForComponent);
} else {
    waitForComponent();
}