# AGENTS.md - AceitaTempo

## Panorama rápido do projeto

- **AceitaTempo** é uma extensão Chrome que converte preço em tempo de trabalho.
- O fluxo principal roda em páginas de produto, listagem e carrinho/checkout.
- A base do comportamento está em:
  - `src/content.js` — injeta badges, tooltips e lógica de página.
  - `src/site-config.js` — seletores e regras específicas por site.
  - `src/price-utils.js` — parsing de preço, câmbio e cálculo de duração.
- O projeto prioriza cobertura em marketplaces e lojas grandes, como Amazon, Mercado Livre, Magazine Luiza, eBay, AliExpress, Steam, GOG, Epic Games, Shopee, SHEIN, Americanas, Casas Bahia, KaBuM!, Netshoes, Walmart, Target, Etsy, Temu e Best Buy.
- Há testes de smoke com Playwright em `tests/`, principalmente:
  - `npm run smoke:sites`
  - `npm run smoke:cart`
  - `npm run smoke:aliexpress`
  - `npm run smoke:games`

## Regras globais

- **Nunca** adicionar Codex como co-author em commits.
- Mensagens de commit devem ser limpas, sem menção a Codex ou Anthropic.

## Memória do MCP Engram

- **Sempre** consulte o MCP Engram antes de trabalhar neste projeto.
- Antes de começar qualquer tarefa, recupere o contexto relevante do projeto e o panorama atual do que já foi feito.
- Durante o trabalho, salve no Engram qualquer decisão, bug corrigido, descoberta, padrão, preferência ou ajuste de configuração que possa ajudar depois.
- Ao finalizar, registre um resumo da sessão no Engram.
- Se surgir qualquer aprendizado útil, gotcha ou comportamento não óbvio, atualize a memória imediatamente.
- **Mantenha a memória e este arquivo atualizados**: sempre que o projeto mudar de forma relevante, registre o novo contexto no Engram e revise este AGENTS.md.

## Escopo de trabalho

- Preserve o comportamento existente da extensão quando alterar código.
- Prefira mudanças pequenas e diretas.
- Se a alteração afetar uso, instalação, sites suportados ou testes, atualize a documentação.
- Use este arquivo para reduzir voltas: comece pelo panorama do projeto, depois consulte o Engram, e só então abra arquivos específicos.
