import { addKeyword, createBot, createFlow, createProvider, MemoryDB } from "@bot-whatsapp/bot";
import { BaileysProvider, handleCtx } from "@bot-whatsapp/provider-baileys"

const flowBienvenida = addKeyword('hola').addAnswer('Bienvenido!!')

const main = async () => {

    const provider = createProvider(BaileysProvider)

    provider.initHttpServer(3002)

    provider.http?.server.post('/send-massage', handleCtx(async (bot, req, res) => {
        const body = req.body
 
        const phone = body.phone
        const incidenceID = body.incidenceID
        const techName = body.techName

        const message = "Se creó la incidencia "+ incidenceID +" la cual fue asignada al técnico "+ techName;

       // const mediaUrl = body.mediaUrl
       // console.log(body)
        
        await bot.sendMessage(phone, message, {})
        res.end('Mensaje Enviado!')
    }))

    await createBot({
        flow: createFlow([flowBienvenida]), 
        database: new MemoryDB(), 
        provider
    })
}

main()
