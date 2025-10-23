# 📋 Guia de Uso do Template CSV - Ficha de Indicadores PLI

## 📥 **Como baixar e usar o template**

### 1. **Download do Template**
- Na página inicial da Calculadora PLI, clique no botão **"📋 Baixar Template CSV"**
- O arquivo `template-ficha-indicadores-PLI.csv` será baixado automaticamente

### 2. **Estrutura do Template**
O template possui 5 colunas obrigatórias:

| Coluna | Descrição | Exemplo |
|--------|-----------|---------|
| **indicador** | Nome do indicador | "Taxa de Crescimento Populacional" |
| **descricao** | Descrição detalhada | "Mede o crescimento anual da população em percentual" |
| **area** | Área de aplicação | "Demografia" |
| **unidade_medida** | Unidade de medida | "%" |
| **fonte** | Fonte dos dados | "IBGE" |

### 3. **Instruções de Preenchimento**

#### ✅ **Boas Práticas:**
- Use **aspas duplas** para textos que contenham vírgulas
- Mantenha o **cabeçalho** (primeira linha) sem alterações
- Preencha **uma linha por indicador**
- **Remova as linhas de comentário** (que começam com #) antes do upload

#### ❌ **Evite:**
- Alterar os nomes das colunas
- Deixar a coluna "indicador" vazia
- Usar caracteres especiais problemáticos (ç, acentos em excesso)
- Salvar em formato diferente de CSV

### 4. **Exemplo de Preenchimento Correto**

```csv
indicador,descricao,area,unidade_medida,fonte
"Taxa de Crescimento Populacional","Mede o crescimento anual da população em percentual","Demografia","%","IBGE"
"Densidade Rodoviária","Extensão de rodovias por área territorial","Transporte","km/km²","DNIT"
"PIB Per Capita","Produto Interno Bruto por habitante","Economia","R$","IBGE/Contas Regionais"
"Índice de Cobertura Vegetal","Percentual de área coberta por vegetação nativa","Meio Ambiente","%","INPE/MapBiomas"
```

### 5. **Áreas Sugeridas**
- **Demografia**: População, crescimento, densidade
- **Transporte**: Modal rodoviário, ferroviário, aquaviário
- **Logística**: Terminais, armazenagem, distribuição
- **Economia**: PIB, renda, custos, investimentos
- **Meio Ambiente**: Cobertura vegetal, emissões, sustentabilidade
- **Infraestrutura**: Rodovias, portos, aeroportos, ferrovias

### 6. **Fontes de Dados Comuns**
- **IBGE**: Instituto Brasileiro de Geografia e Estatística
- **ANTT**: Agência Nacional de Transportes Terrestres
- **ANTAQ**: Agência Nacional de Transportes Aquaviários
- **DNIT**: Departamento Nacional de Infraestrutura de Transportes
- **INPE**: Instituto Nacional de Pesquisas Espaciais
- **IPEA**: Instituto de Pesquisa Econômica Aplicada

### 7. **Upload do Arquivo**
1. Após preencher o template, **salve o arquivo** em formato CSV
2. Na página da Calculadora PLI, **arraste o arquivo** para a área de upload ou **clique para selecionar**
3. O sistema validará automaticamente e carregará os dados
4. Você será direcionado para a próxima etapa (Avaliação por Critérios)

### 8. **Resolução de Problemas**

#### **Erro: "Arquivo deve conter pelo menos um cabeçalho"**
- Verifique se a primeira linha contém: `indicador,descricao,area,unidade_medida,fonte`

#### **Erro: "Arquivo não reconhecido"**
- Certifique-se de salvar como CSV (não Excel .xlsx)
- Use separador por vírgula, não ponto e vírgula

#### **Dados não aparecem na tabela**
- Verifique se há pelo menos o nome do indicador preenchido
- Remova linhas de comentário (que começam com #)

---

## 📞 **Suporte**

Se encontrar dificuldades:
1. Verifique se seguiu todas as instruções acima
2. Teste com o arquivo de exemplo fornecido
3. Entre em contato com a equipe técnica do PLI-SIGMA

**Arquivo gerado automaticamente pelo Sistema PLI-SIGMA**