export function widgetStyles(): string {
  return `
  :host { all: initial; }
  * { box-sizing: border-box; }
  .tb-root {
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 2147483647;
    font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    color: #1f2933;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }
  .tb-fab {
    width: 56px; height: 56px; border-radius: 50%;
    background: #4338ca; color: #fff; border: none; cursor: pointer;
    box-shadow: 0 6px 20px rgba(0,0,0,.25); font-size: 22px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
    font-weight: 700;
    transition: background .15s;
  }
  .tb-fab:hover { background: #6366f1; }
  .tb-panel {
    width: 360px; max-width: calc(100vw - 32px); max-height: calc(100vh - 40px);
    overflow: auto; background: #fff; border-radius: 12px; padding: 16px;
    box-shadow: 0 12px 40px rgba(0,0,0,.28); border: 1px solid #e5e7eb;
  }
  .tb-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; padding-bottom: 12px; border-bottom: 1px solid #f1f5f9; }
  .tb-title { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; font-weight: 700; font-size: 16px; color: #1e293b; letter-spacing: -0.01em; }
  .tb-close { background: #f8fafc; border: 1px solid #e2e8f0; cursor: pointer; font-size: 18px; color: #64748b; width: 28px; height: 28px; border-radius: 6px; display: flex; align-items: center; justify-content: center; }
  .tb-close:hover { background: #f1f5f9; color: #334155; }
  .tb-section { margin-bottom: 14px; }
  .tb-section-title { font-size: 12px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; color: #64748b; margin-bottom: 8px; }
  .tb-field { margin-bottom: 12px; display: block; }
  .tb-label { display: block; margin-bottom: 4px; font-weight: 500; font-size: 13px; color: #334155; }
  .tb-req { color: #dc2626; }
  .tb-input, .tb-select, .tb-textarea {
    width: 100%; padding: 8px 10px; border: 1px solid #cbd5e1; border-radius: 8px;
    font: inherit; background: #fff; color: inherit; font-size: 13px;
  }
  .tb-input:focus, .tb-select:focus, .tb-textarea:focus { outline: none; border-color: #4338ca; box-shadow: 0 0 0 2px rgba(67,56,202,.12); }
  .tb-textarea { min-height: 72px; resize: vertical; }
  .tb-radio, .tb-check { display: flex; gap: 6px; align-items: center; margin: 4px 0; }
  .tb-scale { display: flex; gap: 6px; }
  .tb-scale button {
    flex: 1; padding: 8px 0; border: 1px solid #cbd5e1; border-radius: 8px; background: #fff; cursor: pointer;
  }
  .tb-scale button.active { background: #4338ca; color: #fff; border-color: #4338ca; }
  .tb-error { color: #dc2626; font-size: 12px; margin-top: 4px; }
  .tb-hint { color: #64748b; font-size: 12px; margin: 6px 0; line-height: 1.4; }
  .tb-pinned { color: #0d9488; font-size: 12px; margin-top: 4px; word-break: break-all; background: #f0fdfa; border: 1px solid #ccfbf1; border-radius: 6px; padding: 6px 8px; }
  .tb-pin-btn {
    width: 100%; padding: 8px 10px; border: 1px dashed #cbd5e1; border-radius: 8px; background: #f8fafc; color: #475569; font-weight: 500; cursor: pointer; font-size: 13px;
  }
  .tb-pin-btn:hover { border-color: #4338ca; color: #4338ca; background: #eef2ff; }
  .tb-submit {
    width: 100%; padding: 10px; border: none; border-radius: 8px; background: #4338ca; color: #fff;
    font-weight: 600; cursor: pointer; margin-top: 8px; font-family: inherit; font-size: 14px;
  }
  .tb-submit:hover { background: #6366f1; }
  .tb-submit:disabled { opacity: .6; cursor: default; }
  .tb-screenshot-note { color: #64748b; font-size: 11px; margin-top: 8px; text-align: center; line-height: 1.4; }
  .tb-success { color: #0d9488; font-weight: 600; background: #f0fdfa; border: 1px solid #ccfbf1; border-radius: 8px; padding: 12px; text-align: center; }
  .tb-banner { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; padding: 8px; border-radius: 8px; margin-bottom: 10px; }
  .tb-verify { background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; padding: 8px; border-radius: 8px; margin-bottom: 10px; font-size: 13px; line-height: 1.5; }
  .tb-consent { background: #eff6ff; border: 1px solid #bfdbfe; padding: 12px; border-radius: 8px; margin-bottom: 12px; }
  .tb-consent-title { font-weight: 600; font-size: 13px; margin-bottom: 6px; color: #1e3a8a; }
  .tb-consent-body { font-size: 12px; color: #334155; margin-bottom: 10px; line-height: 1.5; }
  .tb-consent-actions { display: flex; gap: 8px; }
  .tb-btn { padding: 6px 12px; border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer; border: 1px solid transparent; }
  .tb-btn-primary { background: #4338ca; color: #fff; border-color: #4338ca; }
  .tb-btn-primary:hover { background: #6366f1; }
  .tb-btn-secondary { background: #fff; color: #334155; border-color: #cbd5e1; }
  .tb-pin-active .tb-highlight {
    outline: 2px dashed #4338ca !important; outline-offset: 2px;
    background: rgba(67,56,202,.08); cursor: crosshair;
  }
  `
}
