const data = require("./data");
const _ = require('lodash');
const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')

const typeMaps = {
    LAA: 'loans',
    ODA: 'currentAccounts',
    SBA: 'savingAccounts'
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
    }).then(function (response) {
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
    }).then(function (response) {
        return response.json();
    });
}

function makeADeleteCall(url, headers) {
    return fetch(url, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...headers
        }
    });
}

async function loginUsers(username, password) {
    const response = await makeAPostCall(
        'https://sandboxapis.stanbic.com.gh:448/stanbicghana/internal/OCH/Authentication/login/self', {
            username,
            password
        }, {
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

async function deleteUser(username) {
    try {
        await makeADeleteCall(
            `https://sbg-legal-entity-http.stg.sbg.live.backbaseservices.com/legal-entity/${username}`,
            {'X-PRDL-BAAS': 'sbg-stg-b5d46a71-e33f-420c-8e10-e644ff61c0967'}
        )
    } catch (e) {

    }
}

async function ingestUser(payload) {
    return await makeAPostCall(
        'https://sbg-legal-entity-http.stg.sbg.live.backbaseservices.com/legal-entity',
        payload,
        {'X-PRDL-BAAS': 'sbg-stg-b5d46a71-e33f-420c-8e10-e644ff61c0967'}
    )
}

function getRandomArbitrary() {
    const max = 999999999, min = 100000000
    return Math.round(Math.random() * (max - min) + min);
}

function generatePayload(username, loginResp, accounts) {
    const json = data.payload(), email = `${username.toLowerCase()}@stanbic.com.gh`, phone = `233${getRandomArbitrary()}`
    _.set(json, 'name', `${loginResp.firstName} ${loginResp.lastName}`);
    _.set(json, 'externalId', loginResp.customerId);
    _.set(json, 'users[0].user.externalId', username);
    _.set(json, 'users[0].user.fullName', `${loginResp.firstName} ${loginResp.lastName}`);
    _.set(json, 'users[0].user.emailAddress.address', email);
    _.set(json, 'users[0].user.mobileNumber.number', phone);

    _.set(json, 'productGroups[0].name', `${username} datagroup`.toLowerCase());
    _.set(json, 'productGroups[0].users[0].user.externalId', username);
    _.set(json, 'productGroups[0].users[0].user.fullName', `${loginResp.firstName} ${loginResp.lastName}`);
    _.set(json, 'productGroups[0].users[0].user.emailAddress.address', email);
    _.set(json, 'productGroups[0].users[0].user.mobileNumber.number', phone);

    _.set(json, 'referenceJobRoles', data.userJobRoles())

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

async function admin(username) {
    const password = 'ZCNkZW1v';
    try {
        const payload = require(`./data/${username}.json`)
        _.set(payload, 'referenceJobRoles', data.adminJobRoles())

        await ingestUser(payload);
        console.log(username, "done");
        return null;
    } catch (e) {
        console.log(`=============================${username}\n\n\n\n`, e, `\n\n\n\n${username}============================`)
        return username;
    }
}

async function run(username) {
    const password = 'ZCNkZW1v';
    try {
        const [userDetails, accounts] = await Promise.all([
            loginUsers(username, password),
            getAccounts(username),
            deleteUser(username)
        ])
        const payload = generatePayload(username, userDetails, accounts);
        await ingestUser(payload);
        fs.writeFileSync(
            path.resolve('data', `${username}.json`), JSON.stringify(payload, null, 2)
        );
        console.log(username, "done");
        return null;
    } catch (e) {
        console.log(`=============================${username}\n\n\n\n`, e, `\n\n\n\n${username}============================`)
        return username;
    }
}

function listing() {
    return fs.readdirSync('./data').filter(d => d.endsWith(".json"))
        .map(d => path.basename(d, '.json'))
}

module.exports = {
    run, listing, admin
}
