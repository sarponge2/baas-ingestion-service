
const express = require('express')
const data = require("./data");
const _ = require('lodash');
const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')

const app = express();
app.use(express.json());

const typeMaps = {
    LAA: 'loans',
    ODA: 'currentAccounts',
    SBA: 'savingAccounts',
    CCD: 'creditCards',
}

function makeAPostCall(url, data, headers) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify(data)
  }).then(function(response) {
    return response.json();
  });
}

function makeAGetCall(url, headers) {
  return fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...headers
    }
  }).then(function(response) {
    return response.json();
  });
}

async function loginUsers(username, password) {
  const response = await makeAPostCall(
      'https://sandboxapis.stanbic.com.gh:448/stanbicghana/internal/OCH/Authentication/login/self', { username, password }, {
      'X-IBM-Client-Secret': 'jE1yI1pS6rP0kX1xT2pP3hQ6bY7mX1jJ3rW2xR8lN0hM7wX7tH',
      'X-IBM-Client-Id': '25bea38f-8aa5-4f7b-b50b-b9ab6ea6c830'
  });
  if (response.hostHeader && response.hostHeader.responseCode == "0000") {
    return response.userDetails;
  }
  throw new Error(response.hostHeader.responseMessage);
}

async function getAccounts(username) {
    return await makeAGetCall(
        'https://sandboxapis.stanbic.com.gh:448/stanbicghana/internal/OCH/Connectors/Accounts/integration-api/v2/arrangements/summary', {
        'X-IBM-Client-Secret': 'jE1yI1pS6rP0kX1xT2pP3hQ6bY7mX1jJ3rW2xR8lN0hM7wX7tH',
        'X-IBM-Client-Id': '25bea38f-8aa5-4f7b-b50b-b9ab6ea6c830',
        username
    });
}

async function ingestUser(payload) {
    return await makeAPostCall(
        'https://sbg-legal-entity-http.stg.sbg.live.backbaseservices.com/legal-entity',
        payload,
        {'X-PRDL-BAAS': 'sbg-stg-b5d46a71-e33f-420c-8e10-e644ff61c0967' }
    )
}

function generatePayload(loginResp, accounts) {
    const json = data();
    _.set(json, 'name', `${loginResp.firstName} ${loginResp.lastName}`);
    _.set(json, 'externalId', loginResp.customerId);
    _.set(json, 'users[0].user.externalId', loginResp.username);
    _.set(json, 'users[0].user.fullName', `${loginResp.firstName} ${loginResp.lastName}`);
    _.set(json, 'users[0].user.emailAddress.address', loginResp.emailId);
    _.set(json, 'users[0].user.mobileNumber.number', loginResp.mobileNo);

    _.set(json, 'productGroups[0].name', `${loginResp.username} datagroup`.toLowerCase());
    _.set(json, 'productGroups[0].users[0].user.externalId', loginResp.username);
    _.set(json, 'productGroups[0].users[0].user.fullName', `${loginResp.firstName} ${loginResp.lastName}`);
    _.set(json, 'productGroups[0].users[0].user.emailAddress.address', loginResp.emailId);
    _.set(json, 'productGroups[0].users[0].user.mobileNumber.number', loginResp.mobileNo);

    accounts.reduce(formatAccount, _.get(json, 'productGroups[0]'));

    return json;
}

function formatAccount(acc, account) {
    const key = typeMaps[account.productId.split('_').shift()]
    if (!key) return acc;
    if (!acc[key]) acc[key] = [];
    acc[key].push({
        bban: account.bban,
        externalId: account.id,
        productTypeExternalId: account.productId,
        name: account.name,
        bankAlias: account.accountNickname,
        state: {
            externalStateId: account.stateId,
            state: account.state
        },
        currency: account.currency,
        bankBranchCode: account.bankBranchCode,
        creditAccount: account.creditAccount,
        debitAccount: account.debitAccount,
        number: account.number
    })
    return acc;
}

const username = 'FRANNY', password = 'ZCNkZW1v';

async function run(username, password) {
  try {
    const [userDetails, accounts] = await Promise.all([loginUsers(username, password), getAccounts(username)])
    const payload = generatePayload(userDetails, accounts);
    fs.writeFileSync(
        path.resolve('data', `${username}.json`), JSON.stringify(payload, null, 2)
    );
    await ingestUser(payload);
    return null;
  } catch(e) {
    return username;
  }
  console.log(username, "done");
}

// const users = [
//     'GPLANGE', 'CAROLINE1612', 'AMIYO', 'NKA'
// ]

// const users = [
//   'CYNDY77', 'ODETTEB', 'PQUANTSON10'
// ]

const users = [
  'DOMCY2000', 'KWEKU13', 'ABZ', 'CHEM2015'
]

app.post('/', async (req, res) => {
  const users = await Promise.all(req.body.users.map(u => run(u, 'ZCNkZW1v')));
  res.json({status: 'success', failed: users.filter(u => !!u)})
})

app.get('/', (req, res) => {
  res.json(
    fs.readdirSync('./data').map(d => path.basename(d, '.json'))
  );
})

app.listen(4000, () => console.log('listening'))