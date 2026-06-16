import * as crypto from 'crypto'

/**
 * Генерирует code_verifier для PKCE авторизации
 */
export function generateCodeVerifier(): string {
  return crypto
    .randomBytes(48)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
    .slice(0, 64)
}

/**
 * Генерирует code_challenge на основе code_verifier для PKCE авторизации
 */
export function generateCodeChallenge(codeVerifier: string): string {
  return crypto
    .createHash('sha256')
    .update(codeVerifier)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

/**
 * Генерирует случайную строку для параметра state в OAuth запросах
 */
export function generateState(): string {
  return crypto
    .randomBytes(24)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
    .slice(0, 32)
}
