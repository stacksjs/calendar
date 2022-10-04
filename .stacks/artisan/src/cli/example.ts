import type { CAC } from 'cac'
import { runExample } from '../scripts/examples'

async function exampleCommands(artisan: CAC) {
  artisan
    .command('example', 'Test your libraries against your built bundle.')
    .option('-c, --components', 'Test your Vue component library')
    .option('-v, --vue', 'Test your Vue component library')
    .option('-w, --web-components', 'Test your web component library')
    .option('-e, --elements', 'An alias to the -w flag')
    .action(async (options) => {
      await runExample(options)
    })

  artisan
    .command('example:vue', 'Test your Vue component library.')
    .action(async () => {
      await runExample('vue')
    })

  artisan
    .command('example:web-components', 'Test your Web Component library.')
    .action(async () => {
      await runExample('web-components')
    })
}

export { exampleCommands }
