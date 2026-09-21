// Extraction intentionally disabled: no external API calls or database writes.
Deno.serve((req) => {
 const headers = {'Access-Control-Allow-Origin':'https://adilsondiasgomes-sudo.github.io','Access-Control-Allow-Headers':'authorization, apikey, content-type, x-client-info','Access-Control-Allow-Methods':'POST, OPTIONS','Content-Type':'application/json'};
 if(req.method==='OPTIONS') return new Response(null,{status:204,headers});
 return new Response(JSON.stringify({message:'Leitura por API desativada. Use a conferência manual ou importe os dados preparados na conversa.'}),{status:410,headers});
});