#!/usr/bin/env node
const path = require('path')
const semver = require('semver')
const { error } = require('@vue/cli-shared-utils')
const requiredVersion = require('@vue/cli-service/package.json').engines.node

if (!semver.satisfies(process.version, requiredVersion)) {
    error(
        `You are using Node ${process.version}, but vue-cli-service ` +
        `requires Node ${requiredVersion}.\nPlease upgrade your Node version.`
    )
    process.exit(1)
}

const Service = require('@vue/cli-service/lib/Service')
const service = new Service(process.env.VUE_CLI_CONTEXT || process.cwd())
const rawArgv = [process.argv[2]]
const target = process.argv[3]
process.env.VUE_APP_TITLE = target
process.env.VUE_CLI_CONTEXT = process.cwd()
process.env.WEBPACK_CONTEXT = path.join(process.cwd(), `./packages/${target}`)
const args = require('minimist')(rawArgv, {
    boolean: [
        // build
        'modern',
        'report',
        'report-json',
        'watch',
        // serve
        'open',
        'copy',
        'https',
        // inspect
        'verbose'
    ]
})
const command = args._[0]

service.run(command, args, rawArgv).catch(err => {
    error(err)
    process.exit(1)
})
