exports = async function(uname, passwd) {
    
    console.log('foo')
    define(async function (require) {
        const { MongoClient } = require('mongodb');

        const uri = `mongodb+srv://${uname}:${passwd}@projectdb.fzsksa1.mongodb.net/?retryWrites=true&w=majority`;
        const client = new MongoClient(uri);
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
    })
}