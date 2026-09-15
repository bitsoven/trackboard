# Content Security Policy (CSP) for self-hosters

When you embed the Trackboard widget on a third-party website, that site's
Content-Security-Policy (CSP) controls which external resources the page is
allowed to load and talk to. Because the widget is served from **your
Trackboard domain** (not the embedded site), the host page must explicitly
allow-list that origin.

## What the widget needs

| Directive     | Why                                                          | Example value                        |
| ------------- | ------------------------------------------------------------ | ------------------------------------ |
| `script-src`  | Load the widget bundle (`/widget/v1/widget.js`)              | `https://bugs.example.com`           |
| `connect-src` | `fetch`/XHR calls to the Trackboard API and screenshot proxy | `https://bugs.example.com`           |
| `img-src`     | Screenshot uploads to your S3/MinIO bucket + `data:`/`blob:` | `https://s3.example.com data: blob:` |

The widget mounts inside a **closed Shadow DOM**, so its internal styles,
fonts and markup are isolated from the host page. You do **not** need to relax
`style-src` / `font-src` for the widget itself — those only affect the host
page's own content.

## Example header

If Trackboard is served from `https://bugs.example.com` and screenshots live
on `https://trackboard-screenshots.s3.amazonaws.com`:

```http
Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://bugs.example.com;
  connect-src 'self' https://bugs.example.com;
  img-src 'self' https://trackboard-screenshots.s3.amazonaws.com data: blob:;
```

## Notes

- The host must also be added to the project's **allowed origins** in
  Trackboard (the origin-check middleware rejects anything else). See
  [embedding.md](./embedding.md).
- If you serve the widget from a CDN in front of Trackboard, allow-list the
  CDN origin instead.
- Prefer `script-src` over `'unsafe-inline'` — the widget ships as a single
  external file, so no inline scripts are required on the host page.
