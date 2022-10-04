/**
 * This configuration is used to define
 * your project-specific style guide.
 */

import type { Shortcuts } from 'stacks'

/**
 * Shortcuts provide you with the ability to combine
 * utility names for reusability purposes.
 */
export const shortcuts: Shortcuts = [
  ['btn', 'inline-flex items-center px-4 py-2 ml-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer'],
]

/**
 * Use the `safelist` option to ensure the generation of
 * those utility classes. This is useful when certain
 * class names don’t exist in your content files.
 */
export const safelist = 'prose prose-sm m-auto text-left'

/**
 * The trigger defines the class name markup
 * you want to add into your components.
 */
export const trigger = ':stx:'

/**
 * When transforming all utility classes
 * into a single class, this prefix will
 * be added to the generated class.
 */
export const classPrefix = 'stx-'

/**
 * Define a standard of reset CSS stylesheets. By default,
 * the Tailwind reset styles are utilized. You may set
 * this value to `null` if you prefer not using any.
 *
 * @url https://www.npmjs.com/package/@unocss/reset
 */
export const reset = 'tailwind'

/**
 * Define any of the icon collections you like to use via "icons in pure css."
 * See https://stacks.ow3.org/config/icons for a list of available icon sets.
 * TODO: create automatic generator for this
 */
export const icons = {
  'heroicon-outline': () => import('@iconify-json/heroicons-outline/icons.json').then(i => i.default as any),
  'heroicon-solid': () => import('@iconify-json/heroicons-solid/icons.json').then(i => i.default as any),
}
