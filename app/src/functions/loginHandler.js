console.info("loginHandler called")
const { MongoClient } = require("mongodb")

module.exports.checkMongo = async function checkMongo(uname, passwd) {
        const uri = `mongodb+srv://${uname}:${passwd}@projectdb.fzsksa1.mongodb.net/?authMechanism=DEFAULT`;
        const client = new MongoClient(uri);
        console.info("checkMongo touched");
        // async function run() {
        //     try {
        //         console.info("test")
        //         // connect the client to the server 
        //         // console.info('connecting');
        //         // await client.connect()
        //         // establish and verify connection
        //         console.info('pinging srv');
        //         await client.db("admin").command({ ping: 1 });
        //         console.info('likely success');
        //         // return 'authd';
        //     } finally {
        //         console.info('closing client');
        //         await client.close();
        //         console.info('client closed')
        //         return 'authd';
        //     }
            
        //     /*catch(err) {
        //         // ensures that the client will close when you finish/error
        //         client.close()
        //         console.error(err)
        //         return 'error: ', err
        //     }*/
        // }
        // run().catch(console.dir)
}