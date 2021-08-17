const express = require('express')
const {listing, run} = require("./lib");

const app = express();
app.use(express.json());

app.post('/', async ({body: {users}}, res) => {
    const results = await Promise.all(users.map(run));
    res.json({status: 'success', failed: results.filter(u => !!u)})
})

app.get('/', (req, res) => res.json(listing()))

app.listen(4000, () => console.log('listening'))