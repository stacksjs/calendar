import type { PickierConfig } from 'pickier'

const config: PickierConfig = {
  ignores: [
    '**/node_modules/**',
    '**/dist/**',
    '**/.git/**',
    '**/.stacks/**',
    '**/apps/**',
    '**/components/**',
    '**/config/**',
    '**/functions/**',
    '**/lang/**',
    '**/routes/**',
    '**/CHANGELOG.md',
    '**/bun.lock',
  ],
  lint: {
    extensions: ['ts', 'js', 'md'],
    reporter: 'stylish',
    cache: false,
    maxWarnings: -1,
  },
  format: {
    extensions: ['ts', 'js', 'json', 'md', 'yaml', 'yml'],
    finalNewline: 'one',
    indent: 2,
    quotes: 'single',
    semi: false,
  },
  rules: {
    noConsole: 'off',
    noDebugger: 'error',
  },
  pluginRules: {
    'ts/no-top-level-await': 'off',
    'markdown/no-inline-html': 'off',
    'markdown/reference-links-images': 'off',
    'markdown/single-title': 'off',
  },
}

export default config
