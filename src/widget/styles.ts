export function widgetStyles(): string {
  return `
  :host { all: initial; }
  * { box-sizing: border-box; }
  .tb-root {
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    font-size: 14px;
    color: #1f2933;
    line-height: 1.4;
  }
  .tb-fab {
    width: 56px; height: 56px; border-radius: 50%;
    background: #2563eb; color: #fff; border: none; cursor: pointer;
    box-shadow: 0 6px 20px rgba(0,0,0,.25); font-size: 22px;
    display: flex; align-items: center; justify-content: center;
  }
  .tb-panel {
    width: 360px; max-width: calc(100vw - 32px); max-height: calc(100vh - 40px);
    overflow: auto; background: #fff; border-radius: 12px; padding: 16px;
    box-shadow: 0 12px 40px rgba(0,0,0,.28); border: 1px solid #e5e7eb;
  }
  .tb-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
  .tb-title { font-weight: 600; font-size: 16px; }
  .tb-close { background: none; border: none; cursor: pointer; font-size: 18px; color: #6b7280; }
  .tb-field { margin-bottom: 12px; display: block; }
  .tb-label { display: block; margin-bottom: 4px; font-weight: 500; }
  .tb-req { color: #dc2626; }
  .tb-input, .tb-select, .tb-textarea {
    width: 100%; padding: 8px 10px; border: 1px solid #cbd5e1; border-radius: 8px;
    font: inherit; background: #fff; color: inherit;
  }
  .tb-textarea { min-height: 72px; resize: vertical; }
  .tb-radio, .tb-check { display: flex; gap: 6px; align-items: center; margin: 4px 0; }
  .tb-scale { display: flex; gap: 6px; }
  .tb-scale button {
    flex: 1; padding: 8px 0; border: 1px solid #cbd5e1; border-radius: 8px; background: #fff; cursor: pointer;
  }
  .tb-scale button.active { background: #2563eb; color: #fff; border-color: #2563eb; }
  .tb-error { color: #dc2626; font-size: 12px; margin-top: 4px; }
  .tb-hint { color: #6b7280; font-size: 12px; margin: 6px 0; }
  .tb-pinned { color: #047857; font-size: 12px; margin-top: 4px; word-break: break-all; }
  .tb-submit {
    width: 100%; padding: 10px; border: none; border-radius: 8px; background: #2563eb; color: #fff;
    font-weight: 600; cursor: pointer; margin-top: 4px;
  }
  .tb-submit:disabled { opacity: .6; cursor: default; }
  .tb-success { color: #047857; font-weight: 600; }
  .tb-banner { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; padding: 8px; border-radius: 8px; margin-bottom: 10px; }
  .tb-pin-active .tb-highlight {
    outline: 2px dashed #2563eb !important; outline-offset: 2px;
    background: rgba(37,99,235,.08); cursor: crosshair;
  }
  `
}
