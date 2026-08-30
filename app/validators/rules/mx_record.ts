import vine from '@vinejs/vine'

// Reserved TLDs per RFC 2606/6761 that can never have MX records. We reject
// these deterministically without touching DNS so behaviour is stable offline.
const RESERVED_TLDS = ['.invalid', '.example', '.test', '.localhost']

/**
 * The reporter email is used to contact the reporter, not to verify
 * deliverability, so we only reject a couple of clearly-unroutable cases:
 * malformed addresses (handled by the `email` rule) and reserved TLDs. We do
 * NOT do a live MX lookup — that would reject legitimate test/LAN/company
 * domains and break the widget for real reporters.
 */
export const mxRecordRule = vine.createRule(async (value: unknown, _options: unknown, field) => {
  if (typeof value !== 'string' || !value.includes('@')) {
    return
  }
  const domain = value.split('@')[1]?.toLowerCase()
  if (!domain) return

  if (RESERVED_TLDS.some((tld) => domain.endsWith(tld))) {
    field.report('The {{ field }} domain does not have a valid mail server', 'mxRecord', field)
    return
  }
})
