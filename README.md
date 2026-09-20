# Observatório de Consumo

Painel HTML de registros e evolução histórica de preços, conectado ao projeto Supabase pessoal `ifbbyesevuvhndpndgmw`.

## Versão atual

- Login e cadastro por e-mail e senha no Supabase Auth.
- Upload de JPG, PNG ou PDF de até 15 MB em bucket privado `receipts`.
- Identificação de arquivos duplicados por SHA-256.
- Conferência dos itens por JSON e registro transacional pela função `record_receipt`.
- Consulta de produtos e gráficos filtrados por produto, loja e datas.
- Dados separados por usuário com RLS. O HTML contém somente chave publicável.

## Publicação

Em Settings → Pages, selecione Deploy from a branch, branch main e pasta /(root), e salve. Após publicação, configure o endereço do site e os redirecionamentos autorizados no Supabase Auth para os e-mails de confirmação. O cadastro requer a confirmação de e-mail se habilitada no projeto.

## Limitações conhecidas

A extração automática por IA ainda não foi implementada/configurada. O JSON deve conter loja (`store`), data (`date`, AAAA-MM-DD), total pago (`total`) e `items` com `name`, `category`, `unit`, `quantity`, `unit_price`. O preço deve considerar descontos; o total deve corresponder à soma arredondada dos itens. Frete e ajustes não têm campos próprios nesta versão.

As compras de demonstração e suas imagens não estão neste repositório público. A versão conectada foi entregue separadamente do protótipo original.

Verificados: sintaxe JavaScript, bucket privado, privilégios da função e auditoria de segurança do Supabase. Ainda pendente: teste completo com usuário autenticado, envio real, consulta de imagem e registro de compra. Um teste SQL com transação de escrita foi bloqueado pelo modo somente leitura do conector, sem criar dados de teste.

Não publicar cupons, senhas, tokens de sessão ou chaves privilegiadas no repositório.
