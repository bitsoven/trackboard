import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import ReportService from '#services/report_service'
import ReportTransformer from '#transformers/report_transformer'
import ApiKey from '#models/api_key'
import ReportVerificationException from '#exceptions/report_verification_exception'
import { readFile } from 'node:fs/promises'

@inject()
export default class PublicReportsController {
  constructor(protected reportService: ReportService) {}

  async store({ request, response }: HttpContext) {
    const rawKey =
      (request.qs().key as string) ||
      request.header('x-api-key') ||
      (request.input('key') as string)
    if (!rawKey) {
      return response.unauthorized({ message: 'Missing API key' })
    }

    const project = await ApiKey.findProjectByKey(rawKey)
    if (!project) {
      return response.unauthorized({ message: 'Invalid API key' })
    }

    // Collect payload — supports JSON and multipart
    const payload: Record<string, unknown> = { ...request.all() }

    // Handle screenshot file upload (multipart)
    const screenshotFile = request.file('screenshot', {
      size: '10mb',
      extnames: ['png', 'jpg', 'jpeg', 'webp'],
    })
    let screenshotBase64: string | undefined
    if (screenshotFile && screenshotFile.tmpPath) {
      // Read file buffer and convert to base64 for service
      const buffer = await readFile(screenshotFile.tmpPath)
      screenshotBase64 = `data:${(screenshotFile.headers as any)['content-type'] ?? 'image/png'};base64,${buffer.toString('base64')}`
    } else if (
      typeof payload.screenshot === 'string' &&
      (payload.screenshot as string).startsWith('data:image')
    ) {
      screenshotBase64 = payload.screenshot as string
      delete payload.screenshot
    } else if (
      typeof payload.screenshotUrl === 'string' &&
      (payload.screenshotUrl as string).startsWith('data:image')
    ) {
      screenshotBase64 = payload.screenshotUrl as string
      delete payload.screenshotUrl
    }

    // fieldValues may be JSON string when sent as multipart
    if (typeof payload.fieldValues === 'string') {
      try {
        payload.fieldValues = JSON.parse(payload.fieldValues as string)
      } catch {}
    }
    if (typeof payload.browserInfo === 'string') {
      try {
        payload.browserInfo = JSON.parse(payload.browserInfo as string)
      } catch {}
    }
    if (typeof payload.consoleErrors === 'string') {
      try {
        payload.consoleErrors = JSON.parse(payload.consoleErrors as string)
      } catch {}
    }
    if (typeof payload.networkErrors === 'string') {
      try {
        payload.networkErrors = JSON.parse(payload.networkErrors as string)
      } catch {}
    }

    try {
      const baseUrl = `${request.protocol()}://${request.host()}`
      const report = await this.reportService.ingest(project, payload, {
        screenshotBase64,
        baseUrl,
      })
      return response.created({ data: new ReportTransformer(report as any).toObject() })
    } catch (error: any) {
      if (error?.code === 'E_VALIDATION_ERROR' || error?.status === 422) {
        return response.status(422).send({ errors: error.messages ?? [{ message: error.message }] })
      }
      throw error
    }
  }

  async presign({ request, response }: HttpContext) {
    const rawKey =
      (request.qs().key as string) ||
      request.header('x-api-key') ||
      (request.input('key') as string)
    if (!rawKey) {
      return response.unauthorized({ message: 'Missing API key' })
    }
    const project = await ApiKey.findProjectByKey(rawKey)
    if (!project) {
      return response.unauthorized({ message: 'Invalid API key' })
    }

    const filename = (request.input('filename') as string) || 'screenshot.png'
    const result = await this.reportService.generateUploadUrl(project.id, filename)
    return response.json({ data: result })
  }

  async proxyImage({ request, response }: HttpContext) {
    const url = request.qs().url as string
    if (!url) {
      return response.badRequest({ message: 'Missing url param' })
    }
    try {
      const res = await fetch(url)
      if (!res.ok) {
        return response.status(res.status).send({ message: 'Failed to fetch image' })
      }
      const contentType = res.headers.get('content-type') || 'image/png'
      const buffer = Buffer.from(await res.arrayBuffer())
      response.header('Content-Type', contentType)
      response.header('Access-Control-Allow-Origin', '*')
      return response.send(buffer)
    } catch (error: any) {
      return response.status(500).send({ message: 'Proxy error', error: error.message })
    }
  }

  async verify({ params, response }: HttpContext) {
    try {
      const report = await this.reportService.verify(params.token as string)
      return response.json({ data: new ReportTransformer(report as any).toObject() })
    } catch (error) {
      if (error instanceof ReportVerificationException) {
        return response.status(error.status).send({ message: error.message, code: error.code })
      }
      throw error
    }
  }

  /**
   * Human-facing verification page shown when a reporter clicks the magic link
   * in their email. Renders a simple success/error screen instead of raw JSON.
   */
  async verifyPage({ params, inertia }: HttpContext) {
    try {
      const report = await this.reportService.verify(params.token as string)
      return inertia.render(
        'verify_report' as any,
        {
          status: 'success',
          title: report.title,
        } as any
      )
    } catch (error) {
      const message =
        error instanceof ReportVerificationException
          ? error.message
          : 'This verification link is invalid or has expired.'
      return inertia.render(
        'verify_report' as any,
        {
          status: 'error',
          message,
        } as any
      )
    }
  }
}
