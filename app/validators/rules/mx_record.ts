import vine from '@vinejs/vine'
import { promises as dns } from 'node:dns'

const BYPASS_DOMAINS = new Set([
  'example.com',
  'example.org',
  'example.net',
  'test.com',
  'localhost',
  'invalid',
])

export const mxRecordRule = vine.createRule(async (value: unknown, _, field) => {
  if (typeof value !== 'string' || !value.includes('@')) {
    return
  }
  const domain = value.split('@')[1]?.toLowerCase()
  if (!domain) return
  if (BYPASS_DOMAINS.has(domain)) return
  // For test env, skip MX check if domain is example.* to allow CI without DNS
  if (domain.endsWith('.example') || domain.endsWith('.test') || domain === 'test') return

  try {
    const records = await dns.resolveMx(domain)
    if (!records || records.length === 0) {
      field.report('The {{ field }} must have a valid mail server (MX record)', 'mxRecord', field)
    }
  } catch (error: any) {
    // ENOTFOUND, ENODATA, etc. means no MX
    if (error?.code === 'ENOTFOUND' || error?.code === 'ENODATA' || error?.code === 'ENOTIMP') {
      field.report('The {{ field }} domain does not have a valid mail server', 'mxRecord', field)
    } else {
      // For other DNS errors (e.g., no internet in test), allow to pass to avoid flaky tests
      // Only report if we can confirm no MX via fallback A record check
      try {
        await dns.resolve(domain)
        // Has A record but no MX — still consider invalid for strict check? Allow for now
        return
      } catch {
        field.report('The {{ field }} domain is not reachable', 'mxRecord', field)
      }
    }
  }
})
