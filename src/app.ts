import { addKeyword, createBot, createFlow, createProvider, MemoryDB } from "@bot-whatsapp/bot";
import { BaileysProvider, handleCtx } from "@bot-whatsapp/provider-baileys"

const flowBienvenida = addKeyword('hola').addAnswer('2Pacß!!')

const main = async () => {

    const provider = createProvider(BaileysProvider)

    provider.initHttpServer(3002)

    provider.http?.server.post('/send-massage', handleCtx(async (bot, req, res) => {
        const body = req.body
 
        const phone = body.phone
        const message = body.message
        const mediaUrl = body.mediaUrl
        console.log(body)

        // 5218110609863

        await bot.sendMessage(phone, message, {
            media:mediaUrl
        })
        res.end('Mensaje Enviado!')
    }))

    await createBot({
        flow: createFlow([flowBienvenida]), 
        database: new MemoryDB(), 
        provider
    })
}

main()
