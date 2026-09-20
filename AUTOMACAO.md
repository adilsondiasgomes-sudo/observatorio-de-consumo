# Leitura automática de cupons

A função `extract-receipt` foi implantada no projeto `ifbbyesevuvhndpndgmw`, com verificação de JWT habilitada. O frontend chama a função ao enviar um novo cupom ou usar **Ler com IA** / **Ler cupons pendentes**.

## Ativação

No Supabase, abra Edge Functions → Secrets: https://supabase.com/dashboard/project/ifbbyesevuvhndpndgmw/functions/secrets

Cadastre `OPENAI_API_KEY` com uma chave de projeto da API da OpenAI. Nunca cole a chave no HTML, em commits ou no chat. A conta da API precisa ter acesso ao modelo e faturamento disponível. O modelo padrão é `gpt-4.1-mini-2025-04-14`; opcionalmente configure `OPENAI_RECEIPT_MODEL` no servidor.

## Fluxo

1. O upload preserva o original no bucket privado receipts.
2. A função verifica a sessão com Supabase Auth e consulta o cupom com o JWT do usuário e RLS. Não utiliza service_role.
3. O original JPG, PNG ou PDF (até 15 MB) é enviado à API OpenAI para extração estruturada, com `store:false`. Isso não é uma garantia de retenção zero pelo provedor.
4. A leitura é salva como conferência. Campos ilegíveis ficam vazios; avisos e diferenças nos totais são apresentados.
5. O usuário confere e clica Registrar preços. A função existente record_receipt grava a compra e atualiza o histórico, sem duplicar uma compra já registrada para aquele cupom.

## Recuperação e concorrência

Leituras já salvas são reaproveitadas. Uma reserva com identificador de tarefa impede chamadas simultâneas para o mesmo cupom. Após interrupção, é possível retomar depois de três minutos. Uma conferência alterada durante a leitura não é sobrescrita pelo resultado. Ao falhar, o original permanece guardado. O processamento em lote é sequencial e para na primeira falha; os resultados anteriores permanecem salvos.

## Verificação

Testes locais com serviços simulados verificaram rejeição sem autenticação, cupom de outra conta, leitura em andamento, chave ausente, resultado em cache, imagem, PDF, totais divergentes e erro do provedor. A sintaxe do frontend e referências aos elementos foram verificadas. A execução real com documento, chave de API e sessão autenticada ainda precisa ser validada após ativar a chave. Não considerar a leitura de produção homologada antes desse teste.

Documentação: https://supabase.com/docs/guides/functions/auth-headers ; https://developers.openai.com/api/docs/guides/structured-outputs ; https://developers.openai.com/api/docs/guides/file-inputs
