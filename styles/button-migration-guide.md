# Guia de Migração - Sistema Unificado de Botões dos Cards

## 📋 Resumo

Criado sistema CSS unificado para controlar o estilo visual e comportamento dos botões de todos os 8 cards do sistema de filtros.

## 🎯 Arquivo Principal

**`unified-card-buttons.css`** - Sistema completo de estilização de botões

### Características Principais:

1. **Classes Unificadas**:
   - `.card-action-btn` - Base comum para todos os botões
   - `.card-action-btn.edit` - Botão de edição (lápis)
   - `.card-action-btn.confirm` - Botão de confirmação (check)
   - `.card-action-btn.done` - Estado visual concluído
   - `.card-action-buttons` - Container flex dos botões

2. **Estados dos Cards**:
   - `.card-locked` - Card bloqueado (botões desabilitados)
   - `.card-active` - Card em edição ativa
   - `.card-ready` - Card com dados confirmados
   - `.card-loading` - Card em carregamento
   - `.card-error` - Card com erro

3. **Recursos Avançados**:
   - Efeito ripple nos cliques
   - Animações de feedback visual
   - Suporte a modo escuro
   - Acessibilidade (focus rings, reduced motion)
   - Design responsivo
   - Alto contraste
   - Estilos para impressão

## 🔧 Implementação Atual

### Componentes que usam o sistema:

```tsx
// Todos os cards (Card1 a Card8) já utilizam as classes:
className="card-action-btn edit"
className="card-action-btn confirm"
className={`card-action-btn confirm ${card.status === 'READY' ? 'done' : ''}`}
```

### Importação do CSS:

```tsx
// Em SmartFiltersOrchestratorV2.tsx
import '../../styles/unified-card-buttons.css';
```

## 🎨 Estrutura Visual

### Botão Base (`.card-action-btn`):
- Tamanho: 36x36px
- Border radius: 8px
- Transições suaves (cubic-bezier)
- Efeito hover (elevação)
- Focus ring para acessibilidade
- Ripple effect no clique

### Botão Edit (`.edit`):
- Cor: `var(--sigma-secondary)` (cinza)
- Ícone: `<EditPencilIcon>` (React Icons - FaEdit)
- Background: transparente com tint

### Botão Confirm (`.confirm`):
- Cor: `var(--sigma-success)` (verde)
- Ícone: `<ConfirmCheckIcon>` (React Icons - FaCheck)
- Background: transparente com tint

### Estado Done (`.done`):
- Background sólido verde
- Ícone: `<ConfirmCheckIcon isConfirmed={true}>` (verde)
- Animação de sucesso

## 📱 Responsividade

### Tablet (≤768px):
- Botões: 32x32px
- Espaçamento reduzido

### Mobile (≤480px):
- Botões: 40x40px (área touch maior)
- Centralização em mobile
- Espaçamento otimizado

## ♿ Acessibilidade

### Recursos implementados:
- Focus rings visíveis
- Suporte a `prefers-reduced-motion`
- Suporte a `prefers-contrast: high`
- Área touch mínima 44px
- Semântica ARIA preservada

## 🔄 Estados de Card

### Card Locked:
```css
.card-locked .card-action-btn {
    opacity: 0.3;
    cursor: not-allowed;
    pointer-events: none;
    filter: grayscale(100%);
}
```

### Card Loading:
```css
.card-loading .card-action-btn {
    opacity: 0.6;
    cursor: wait;
    /* Spinner animado */
}
```

### Card Error:
```css
.card-error .card-action-btn {
    border-color: var(--sigma-danger);
    animation: errorShake 0.5s ease-in-out;
}
```

## 📊 Compatibilidade

### Browsers suportados:
- Chrome/Edge 88+
- Firefox 85+
- Safari 14+

### Funcionalidades progressivas:
- CSS Grid/Flexbox
- CSS Custom Properties
- CSS Animations
- Media Queries avançadas

## 🚀 Benefícios

1. **Consistência Visual**: Todos os 8 cards seguem o mesmo padrão
2. **Manutenibilidade**: Alterações centralizadas em um arquivo
3. **Performance**: CSS otimizado com animações eficientes
4. **Acessibilidade**: Conformidade com padrões WCAG
5. **Responsividade**: Funciona em todos os dispositivos
6. **Tema**: Suporte a modo escuro automático

## 🔧 Próximos Passos (Opcional)

1. **Deprecar CSS antigo**: Remover estilos duplicados de `cards.css`
2. **Variáveis CSS**: Centralizar mais cores no sistema de design
3. **Testes**: Implementar testes visuais automatizados
4. **Documentação**: Criar Storybook para os componentes

## 📝 Notas Técnicas

- Usa CSS nativo (sem dependências)
- Compatível com sistema de variáveis CSS existente
- Preserva a funcionalidade atual
- Não quebra componentes existentes
- Facilita futuras customizações

---

**Status**: ✅ Implementado e ativo
**Arquivo**: `frontend/src/styles/unified-card-buttons.css`
**Componente**: `SmartFiltersOrchestratorV2.tsx`