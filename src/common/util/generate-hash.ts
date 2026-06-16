import crypto from 'node:crypto'

/**
 * Генерация псевдослучайной строки (алфавит из цифр и латиницы в разном регистре).
 */
export const generateHash = (length = 8) => {
  const symbols = 'aAbB0cCdC1eEfF2gGhHiI3jJkKlL4mMnNoO5pPqQrR6sStTuU7vVwW8xXyY9zZ'

  return Array.from(crypto.webcrypto.getRandomValues(new Uint32Array(length)))
    .map(x => symbols[x % symbols.length])
    .join('')
}
