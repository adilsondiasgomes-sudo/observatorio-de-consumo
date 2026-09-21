# Registro manual e assistido

A extração por API foi desativada a pedido do usuário. A função extract-receipt retorna 410, sem chamadas à OpenAI ou alterações no banco. A interface não chama mais a função, inclusive durante uploads.

## Fluxo

1. Salve o original em Importar nota.
2. Envie o cupom na conversa para extrair os campos.
3. Em Notas fiscais → Conferir itens, carregue o arquivo JSON preparado na conversa ou cole os dados e clique em Aplicar dados. Também é possível preencher manualmente.
4. Confira loja, data, quantidades, preços líquidos e total. Clique em Registrar preços.

Cupons, rascunhos e registros existentes foram preservados. A importação de dados não substitui o original anexado.

A chave OPENAI_API_KEY deixou de ser utilizada por este sistema. Pode ser removida dos segredos do Supabase e revogada na OpenAI se não atender a outro uso. Nenhuma chave foi lida ou revogada nesta alteração.
