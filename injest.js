
const {run} = require("./lib");

const users = [
    'DOMCY2000', 'KWEKU13', 'ABZ', 'CHEM2015', 'CYNDY77', 'PQUANTSON10',
]

// 'CAROLINE1612', 'AMIYO', 'NKA', 'ODETTEB', 'GPLANGE',

// const users = [
//     'ABZ'
// ]

Promise.all(users.map(run));
