import neo4j from 'neo4j-driver'
import express from 'express'

const app = express()
const driver = neo4j.driver(
    'neo4j://neo4j'
)

app.get('/', async(req, res, next) => {
    try{
        const query = req.query?.query
        const session = driver.session({
            database: 'neo4j',
            defaultAccessMode: neo4j.session.READ
        })
        const result = await session.run(query)
        await session.close()
        return res.send(result)
    }
    catch(err){
        console.log(err)
        return res.sendStatus(400)
    }
})

app.listen(8080, () => {
    console.log('started')
})

process.on('SIGTERM', async () => {
    console.info('SIGTERM signal received.')
    await driver.close()
    }
)