import { SiteClient } from   'datocms-client';

export default async function recebedorDeRequests (request, response) {

    if (request.method === 'POST') {
        const TOKEN = 'fa7b633728a4ab9ee1bb5e23882214';
        const client = new SiteClient(TOKEN);
        
        const registro_criado = await client.items.create({
            itemType: "973162", //ID do modelo de "Communities" criado pelo DatoCMS
            ...request.body,
            
        })

            
        response.json({
            dados: 'Algum dado qualquer',
            registro_criado: registro_criado,
        }) 
        return; 
    }

    response.status(404).json({
        message: 'Ainda não temos ada no GET, mas no POST tem!'
    })

}