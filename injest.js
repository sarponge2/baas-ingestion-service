
const {run} = require("./lib");

// const users = [
//     'DOMCY2000', 'KWEKU13', 'ABZ', 'CHEM2015', 'CYNDY77', 'ODETTEB', 'PQUANTSON10', 'GPLANGE',
// ]

// 'CAROLINE1612', 'AMIYO', 'NKA'

const users = [
    'FRANNY'
]

Promise.all(users.map(run));
