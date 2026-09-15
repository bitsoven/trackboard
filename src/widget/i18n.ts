export type Locale = 'en' | 'es' | 'de' | string

type Dict = Record<string, string>

const dictionaries: Record<string, Dict> = {
  en: {
    'widget.title': 'Report a bug',
    'widget.open': 'Report a bug',
    'widget.close': 'Close',
    'widget.submit': 'Send report',
    'widget.sending': 'Sending…',
    'widget.success': 'Thanks! Your report was sent.',
    'widget.error': 'Something went wrong. We will retry when you are back online.',
    'widget.emailLabel': 'Your email',
    'widget.emailPlaceholder': 'you@example.com',
    'widget.emailRequired': 'Email is required so we can follow up.',
    'widget.titleLabel': 'Summary',
    'widget.titlePlaceholder': 'Short summary of the issue',
    'widget.pinHint': 'Click to select an element on the page that shows the problem',
    'widget.pin': 'Pick element on page',
    'widget.pinned': 'Pinned: {selector}',
    'widget.screenshot': 'Attach a screenshot',
    'widget.screenshotNote': 'A screenshot helps us see the issue in context.',
    'widget.screenshotHint': 'A screenshot of this page will be attached automatically.',
    'widget.sectionDetails': 'Details',
    'widget.sectionContext': 'Context',
    'widget.sectionScreenshot': 'Screenshot',
    'widget.retry': 'Retry now',
    'widget.fieldRequired': 'This field is required',
    'widget.consentTitle': 'High-fidelity screenshot',
    'widget.consentBody':
      'Trackboard will ask to share your screen for a pixel-perfect capture. You can deny and we will use a standard capture instead.',
    'widget.consentAllow': 'Allow screen share',
    'widget.consentDeny': 'Use standard capture',
    'widget.captureModeLabel': 'Capture area',
    'widget.captureModeVisible': 'Visible area',
    'widget.captureModeFullpage': 'Full page',
    'widget.captureModeElement': 'Pinned element',
    'widget.screenshotTooLarge': 'Screenshot too large, recompressing…',
    'widget.verifySent':
      'We sent a confirmation email to {email}. Please check your inbox and click the link to verify your report.',
  },
  es: {
    'widget.title': 'Reportar un problema',
    'widget.open': 'Reportar un error',
    'widget.close': 'Cerrar',
    'widget.submit': 'Enviar reporte',
    'widget.sending': 'Enviando…',
    'widget.success': '¡Gracias! Tu reporte fue enviado.',
    'widget.error': 'Algo salió mal. Reintentaremos cuando recuperes la conexión.',
    'widget.emailLabel': 'Tu correo',
    'widget.emailPlaceholder': 'tu@ejemplo.com',
    'widget.emailRequired': 'El correo es obligatorio para dar seguimiento.',
    'widget.titleLabel': 'Resumen',
    'widget.titlePlaceholder': 'Breve resumen del problema',
    'widget.pinHint': 'Fija un elemento para resaltar qué está mal',
    'widget.pin': 'Elegir elemento',
    'widget.pinned': 'Fijado: {selector}',
    'widget.screenshot': 'Adjuntar una captura',
    'widget.retry': 'Reintentar ahora',
    'widget.fieldRequired': 'Este campo es obligatorio',
    'widget.consentTitle': 'Captura de alta fidelidad',
    'widget.consentBody':
      'Trackboard pedirá compartir tu pantalla para una captura perfecta. Puedes denegar y usaremos una captura estándar.',
    'widget.consentAllow': 'Permitir compartir pantalla',
    'widget.consentDeny': 'Usar captura estándar',
    'widget.captureModeLabel': 'Área de captura',
    'widget.captureModeVisible': 'Área visible',
    'widget.captureModeFullpage': 'Página completa',
    'widget.captureModeElement': 'Elemento fijado',
    'widget.screenshotTooLarge': 'Captura muy grande, recomprimiendo…',
    'widget.verifySent':
      'Enviamos un correo de confirmación a {email}. Revisa tu bandeja y haz clic en el enlace para verificar tu reporte.',
  },
  de: {
    'widget.title': 'Problem melden',
    'widget.open': 'Fehler melden',
    'widget.close': 'Schließen',
    'widget.submit': 'Bericht senden',
    'widget.sending': 'Wird gesendet…',
    'widget.success': 'Danke! Dein Bericht wurde gesendet.',
    'widget.error': 'Etwas ist schiefgelaufen. Wir versuchen es erneut, sobald du online bist.',
    'widget.emailLabel': 'Deine E-Mail',
    'widget.emailPlaceholder': 'du@beispiel.com',
    'widget.emailRequired': 'E-Mail ist nötig, um zu antworten.',
    'widget.titleLabel': 'Zusammenfassung',
    'widget.titlePlaceholder': 'Kurze Beschreibung des Problems',
    'widget.pinHint': 'Element markieren, um das Problem hervorzuheben',
    'widget.pin': 'Element wählen',
    'widget.pinned': 'Markiert: {selector}',
    'widget.screenshot': 'Screenshot anhängen',
    'widget.retry': 'Jetzt erneut versuchen',
    'widget.fieldRequired': 'Dieses Feld ist erforderlich',
    'widget.consentTitle': 'Hochauflösende Aufnahme',
    'widget.consentBody':
      'Trackboard wird um Bildschirmfreigabe bitten für eine pixelgenaue Aufnahme. Du kannst ablehnen und wir nutzen eine Standardaufnahme.',
    'widget.consentAllow': 'Bildschirmfreigabe erlauben',
    'widget.consentDeny': 'Standardaufnahme verwenden',
    'widget.captureModeLabel': 'Aufnahmebereich',
    'widget.captureModeVisible': 'Sichtbarer Bereich',
    'widget.captureModeFullpage': 'Gesamte Seite',
    'widget.captureModeElement': 'Angeheftetes Element',
    'widget.screenshotTooLarge': 'Screenshot zu groß, wird neu kodiert…',
    'widget.verifySent':
      'Wir haben eine Bestätigungs-E-Mail an {email} gesendet. Bitte prüfe dein Postfach und klicke auf den Link, um deinen Bericht zu bestätigen.',
  },
}

export class I18n {
  private dict: Dict
  readonly locale: Locale

  constructor(locale: Locale = 'en') {
    this.locale = locale
    this.dict = dictionaries[locale] ?? dictionaries.en
  }

  t(key: string, vars?: Record<string, string | number>): string {
    let value = this.dict[key] ?? dictionaries.en[key] ?? key
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        value = value.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v))
      }
    }
    return value
  }
}

export function detectLocale(hint?: string): Locale {
  if (hint && dictionaries[hint]) return hint
  if (typeof navigator !== 'undefined' && navigator.language) {
    const lang = navigator.language.slice(0, 2).toLowerCase()
    if (dictionaries[lang]) return lang
  }
  return 'en'
}
