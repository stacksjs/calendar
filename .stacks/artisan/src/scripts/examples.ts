import { resolve } from 'pathe'
import Prompts from 'prompts'
import consola from 'consola'
import { hasFiles } from '../../../core/utils/fs'
import { NpmScript } from '../../../core/types/cli'
import { ExitCode } from '../cli/exit-code'
import { runNpmScript } from './run-npm-script'

const { prompts } = Prompts

export async function testComponentExample() {
  if (hasFiles(resolve(process.cwd(), './components'))) {
    try {
      await runNpmScript(NpmScript.ExampleVue)
      consola.success('Your component library was built successfully.')
    }
    catch (error) {
      consola.error('There was an error building your component library.')
      consola.error(error)
    }
  }
  else {
    consola.info('No components found.')
  }
}

export async function testWebComponentExample() {
  consola.info('Building your Web Component library...')

  if (hasFiles(resolve(process.cwd(), './components'))) {
    try {
      await runNpmScript(NpmScript.BuildWebComponents)
      consola.success('Your Web Component library was built successfully.')
    }
    catch (error) {
      consola.error('There was an error building your Web Component library.')
      consola.error(error)
    }
  }
  else {
    consola.info('No components found.')
  }
}

export async function runExample(options: any) {
  if (options.components || options === 'components' || options === 'vue') {
    await testComponentExample()
  }

  else if (options.webComponents || options.elements || options === 'web-components' || options === 'elements') {
    await testWebComponentExample()
  }

  else {
    const answer = await prompts.select({
      type: 'select',
      name: 'example',
      message: 'Which example are you trying to view?',
      choices: [
        { title: 'Components', value: 'components' },
        { title: 'Web Components', value: 'web-components' },
      ],
      initial: 0,
    })

    // @ts-expect-error the answer object type expects to return a void type but it returns a string
    if (answer === 'components')
      await testComponentExample()

    // @ts-expect-error the answer object type expects to return a void type but it returns a string
    if (answer === 'web-components')
      await testWebComponentExample()

    else process.exit(ExitCode.InvalidArgument)
  }
}
