import { isValidElement } from 'react'
import type { ReactNode } from 'react'

export const stringifyReactNode = (node: ReactNode): string => {
  if (typeof node === 'string') {
    return node
  } else if (typeof node === 'number') {
    return node.toString()
  } else if (Array.isArray(node)) {
    return node.map(stringifyReactNode).join('')
  } else if (isValidElement(node)) {
    return stringifyReactNode(node.props.children)
  } else {
    return ''
  }
}

export const slugify = (str: string, separator = '-') =>
  str
    .normalize('NFD') // unicode normalization with canonical decomposition (https://unicode.org/reports/tr15/)
    .replace(/[\u0300-\u036f]/g, '') // remove all diacritics (we prevously separated them from the base char)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, '') // remove anything that is not a letter, number or space (we therefore don't handle languages that use non-latin characters)
    .replace(/\s+/g, separator)
