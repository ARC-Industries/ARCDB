console.info("loginHandler called")
// const { MongoClient } = require("mongodb")

module.exports.checkMongo = async function checkMongo(uname, passwd, MongoClient) {
        const uri = `mongodb+srv://${uname}:${passwd}@projectdb.fzsksa1.mongodb.net/?retryWrites=true&w=majority`;
        const client = new MongoClient(uri);
        console.info("checkMongo touched")
        try {
            // connect the client to the server 
            console.info('connecting')
            await client.connect()

            // establish and verify connection
            console.info('pinging srv')
            await client.db("admin").command({ ping: 1 });
            console.info('success')
            return 'authd'
        } catch(err) {
            // ensures that the client will close when you finish/error
            client.close();
            console.error(err)
            return 'error', err
        }
}