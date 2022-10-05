/* eslint-disable no-console */
import type { CAC } from 'cac'
import consola from 'consola'
import * as ezSpawn from '@jsdevtools/ez-spawn'
import { resolve } from 'pathe'
import { bold, cyan, dim, link } from 'kolorist'
import { useOnline } from '@vueuse/core'
import { version } from '../../package.json'
import { isFolder } from '../../../core/utils/fs'
import { generate as generateAppKey } from '../scripts/key'
import { ExitCode } from './exit-code'

// the logic to run to create/scaffold a new stack
async function initCommands(artisan: CAC) {
  artisan
    .option('-n, --name <name>', 'Name of the stack')
    .option('-u, --ui', 'Are you building a UI?', { default: true }) // if no, disregard remainder of questions wrt UI
    .option('-c, --components', 'Are you building UI components?', { default: true }) // if no, -v and -w would be false
    .option('-w, --web-components', 'Automagically built optimized custom elements/web components?', { default: true })
    .option('-v, --vue', 'Automagically built a Vue component library?', { default: true })
    .option('-p, --pages', 'How about pages?', { default: true }) // pages need an HTTP server
    .option('-f, --functions', 'Are you developing functions/composables?', { default: true }) // if no, API would be false
    .option('-a, --api', 'Are you building an API?', { default: true }) // APIs need an HTTP server & assumes functions is true
    .option('-d, --database', 'Do you need a database?', { default: true })
    .option('--debug', 'Add additional debug logs', { default: false })
    // .option('--auth', 'Scaffold an authentication?', { default: true })

  artisan
    .command('')
    .action(async (args: any) => {
      const name = artisan.args[0] || args.name || '.'
      const path = resolve(process.cwd(), name)

      console.log()
      console.log(cyan(bold('Artisan CLI')) + dim(` v${version}`))
      console.log()

      if (await isFolder(path)) {
        consola.error(`Path ${path} already exists`)
        process.exit(ExitCode.FatalError)
      }

      const online = useOnline()
      if (!online) {
        consola.info('It appears you are disconnected from the internet. The Stacks setup requires a brief internet connection for setup.')
        process.exit(ExitCode.FatalError)
      }

      consola.info('Setting up your stack.')
      await ezSpawn.async(`giget stacks ${name}`, { stdio: args.debug ? 'inherit' : 'ignore' }) // todo: stdio should inherit when APP_DEBUG or debug flag is true
      consola.success(`Successfully scaffolded your project at ${cyan(path)}`)

      consola.info('Ensuring your environment is ready...')
      await ezSpawn.async('fnm use', { stdio: args.debug ? 'inherit' : 'ignore', cwd: path }) // todo: stdio should inherit when APP_DEBUG or debug flag is true
      consola.success('Environment is ready.')

      consola.info('Installing & setting up Stacks.')
      await ezSpawn.async('pnpm install', { stdio: args.debug ? 'inherit' : 'ignore', cwd: path }) // todo: stdio should inherit when APP_DEBUG or debug flag is true
      await ezSpawn.async('cp .env.example .env', { stdio: args.debug ? 'inherit' : 'ignore', cwd: path }) // todo: stdio should inherit when APP_DEBUG or debug flag is true
      await generateAppKey(path)
      await ezSpawn.async('git init', { stdio: args.debug ? 'inherit' : 'ignore', cwd: path }) // todo: stdio should inherit when APP_DEBUG or debug flag is true
      consola.success('Installed & set-up 🚀')

      console.log()
      consola.info(bold('Welcome to the Stacks Framework! ⚛️'))
      console.log(`cd ${link(path, `vscode://file/${path}:1`)} && code .`)
      console.log()
      consola.log('To learn more, visit https://stacksjs.dev')
    })
}

export { initCommands }
