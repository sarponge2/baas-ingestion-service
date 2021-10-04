const commandLineArgs = require('command-line-args')
const commandLineUsage = require('command-line-usage')
const {admin, run} = require("./lib");
const {env} = require("fetch/.eslintrc");

const optionList = [
    {name: 'employee', alias: 'e', description: 'Whether the user to ingest is an employee', type: Boolean},
    {
        name: 'cluster',
        alias: 'c',
        defaultOption: 'dev',
        typeLabel: 'one of ({underline dev}, {underline stg}, {underline prd})',
        description: 'the cluster to ingest user into'
    },
    {name: 'user', alias: 'u', description: 'Username of user to ingest', defaultOption: true},
    {name: 'help', alias: 'h', description: 'Show this help', type: Boolean},
]

const options = commandLineUsage([
    {
        header: 'Backbase OCH User Ingestion',
        content: 'Backbase OCH User Ingestion utility script'
    },
    {
        header: 'Options',
        optionList
    }
])

args = commandLineArgs(optionList)

if (!Object.keys(args).length || args.help || !args.user)
    return console.log(options)

args.cluster = args.cluster || 'dev'

if (args.employee) admin(args.user, args.cluster)
else run(args.user, args.cluster)

console.log(args)
