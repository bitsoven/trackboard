# Embedding the widget

Add the bug-report widget to any page with a single `<script>` tag. It mounts a
floating "Report a bug" button and opens an inline form (rendered in an isolated
Shadow DOM so it won't clash with your site's styles).

## Snippet

```html
<script
  async
  src="https://bugs.example.com/widget/v1/widget.js"
  data-project-key="tb_xxxxxxxxxxxxxxxxxxxxxxxx"
></script>
```

Replace `https://bugs.example.com` with the domain where Trackboard is hosted,
and `tb_xxx…` with the project's API key (generate one in the admin console
under **Integrations → API Tokens**).

## Data attributes

| Attribute           | Required | Description                                                              |
| ------------------- | -------- | ------------------------------------------------------------------------ |
| `data-project-key`  | yes      | API key that ties submissions to a project.                              |
| `src`               | yes      | URL of `widget.js` on your Trackboard domain.                            |
| `data-api-base`     | no       | Override the API base URL (defaults to the `src` origin).                |
| `data-locale`       | no       | Force a locale (`en`, `es`, `de`, …). Defaults to the browser language.  |

Example with options:

```html
<script
  async
  src="https://bugs.example.com/widget/v1/widget.js"
  data-project-key="tb_xxx"
  data-locale="es"
></script>
```

##Allowed origins

The widget sends the page's `Origin`/`Referer` with every request. Trackboard's
origin-check middleware rejects requests from origins that are **not** listed
under the project's allowed origins. Add the embedding site's origin in the
admin console (or via the `allowed_origins` table) before going live.

## CSP

If the embedding site uses a Content-Security-Policy, allow-list the Trackboard
domain for `script-src` / `connect-src` (and `img-src` for screenshots). See
[csp.md](./csp.md).
