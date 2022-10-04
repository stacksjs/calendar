/**
 * The following configuration references local aliases.
 */

import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'pathe'

const _dirname = typeof __dirname !== 'undefined'
  ? __dirname
  : dirname(fileURLToPath(import.meta.url))

const r = (p: string) => resolve(_dirname, p)

const alias: Record<string, string> = {
  '~/': r('../../..'),
  'stacks': r('../index.ts'),
  'stacks/*': r('../../*'),
  'functions/*': r('../../../functions/*'),
  'components/*': r('../../../components/*'),
  'config': r('./config.ts'),
}

export default alias
