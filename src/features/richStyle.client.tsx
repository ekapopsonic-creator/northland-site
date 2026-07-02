'use client'

/**
 * Custom rich-text toolbar (แบบ word processor) สำหรับ Payload Lexical
 * เพิ่มปุ่ม: ฟอนต์ / ขนาด / สีข้อความ / ไฮไลต์ / ล้างรูปแบบ / เปลี่ยนตัวพิมพ์
 * เก็บสไตล์เป็น inline `style` มาตรฐานของ Lexical (node.style) → หน้าเว็บ render ผ่าน text converter
 * (ปุ่ม B / I / U / S ใช้ของ Payload เดิม ผ่าน FixedToolbarFeature)
 */

import * as React from 'react'
import { createClientFeature } from '@payloadcms/richtext-lexical/client'
import type { LexicalEditor } from '@payloadcms/richtext-lexical/lexical'
import {
  $getSelection,
  $isRangeSelection,
  $getRoot,
  $createParagraphNode,
  $isElementNode,
  UNDO_COMMAND,
  REDO_COMMAND,
} from '@payloadcms/richtext-lexical/lexical'
import {
  $patchStyleText,
  $getSelectionStyleValueForProperty,
  $forEachSelectedTextNode,
} from '@payloadcms/richtext-lexical/lexical/selection'
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@payloadcms/richtext-lexical/lexical/html'
import { ALL_FONTS } from '../lib/fonts'

// ---- ตัวเลือก ----
const FONTS = ALL_FONTS.map((f) => ({ label: f.label, family: f.family }))
const SIZES = [12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64]
// สีด่วน (แบรนด์ + พื้นฐาน) — คลิกใช้ได้ทันที นอกเหนือจาก color picker
const QUICK_COLORS = ['#1E3644', '#00ADEF', '#C9A24B', '#111111', '#58595B', '#ffffff', '#D23B3B', '#2E9E5B']
const QUICK_HL = ['#FFF3A0', '#CFEFFF', '#D6F5DD', '#FFD9E2', '#1E3644']

type CtrlProps = { editor: LexicalEditor }

// อ่านค่าสไตล์ปัจจุบันจาก selection (ไว้โชว์ในกล่อง)
function useSelectionStyle(editor: LexicalEditor, prop: string): string {
  const [val, setVal] = React.useState('')
  React.useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const sel = $getSelection()
        if ($isRangeSelection(sel)) setVal($getSelectionStyleValueForProperty(sel, prop, ''))
      })
    })
  }, [editor, prop])
  return val
}

function applyStyle(editor: LexicalEditor, patch: Record<string, string | null>) {
  editor.update(() => {
    const sel = $getSelection()
    if ($isRangeSelection(sel)) $patchStyleText(sel, patch)
  })
}

// ===== ฟอนต์ =====
const FontControl: React.FC<CtrlProps> = ({ editor }) => {
  const cur = useSelectionStyle(editor, 'font-family')
  return (
    <select
      className="rt-ctrl rt-font"
      value={cur || ''}
      title="ฟอนต์"
      onChange={(e) => applyStyle(editor, { 'font-family': e.target.value || null })}
    >
      <option value="">ฟอนต์</option>
      {FONTS.map((f) => (
        <option key={f.family} value={f.family} style={{ fontFamily: f.family }}>
          {f.label}
        </option>
      ))}
    </select>
  )
}

// ===== ขนาด =====
const SizeControl: React.FC<CtrlProps> = ({ editor }) => {
  const cur = useSelectionStyle(editor, 'font-size') // เช่น "24px"
  const num = cur ? String(parseInt(cur, 10)) : ''
  return (
    <select
      className="rt-ctrl rt-size"
      value={num}
      title="ขนาดตัวอักษร"
      onChange={(e) => applyStyle(editor, { 'font-size': e.target.value ? `${e.target.value}px` : null })}
    >
      <option value="">ขนาด</option>
      {SIZES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  )
}

// ===== สีข้อความ =====
const ColorControl: React.FC<CtrlProps> = ({ editor }) => {
  const cur = useSelectionStyle(editor, 'color') || '#111111'
  return (
    <span className="rt-ctrl rt-color" title="สีข้อความ">
      <span className="rt-color-a" style={{ borderBottomColor: cur }}>
        A
      </span>
      <input
        type="color"
        value={/^#([0-9a-f]{6})$/i.test(cur) ? cur : '#111111'}
        onChange={(e) => applyStyle(editor, { color: e.target.value })}
        aria-label="เลือกสีข้อความ"
      />
      <span className="rt-swatches">
        {QUICK_COLORS.map((c) => (
          <button
            key={c}
            type="button"
            className="rt-swatch"
            style={{ background: c }}
            title={c}
            onMouseDown={(ev) => {
              ev.preventDefault()
              applyStyle(editor, { color: c })
            }}
          />
        ))}
      </span>
    </span>
  )
}

// ===== ไฮไลต์ (พื้นหลังข้อความ) =====
const HighlightControl: React.FC<CtrlProps> = ({ editor }) => {
  const cur = useSelectionStyle(editor, 'background-color') || '#FFF3A0'
  return (
    <span className="rt-ctrl rt-color" title="ไฮไลต์ / สีพื้นหลังข้อความ">
      <span className="rt-color-a rt-hl-a" style={{ background: /^#([0-9a-f]{6})$/i.test(cur) ? cur : '#FFF3A0' }}>
        H
      </span>
      <input
        type="color"
        value={/^#([0-9a-f]{6})$/i.test(cur) ? cur : '#FFF3A0'}
        onChange={(e) => applyStyle(editor, { 'background-color': e.target.value })}
        aria-label="เลือกสีไฮไลต์"
      />
      <span className="rt-swatches">
        {QUICK_HL.map((c) => (
          <button
            key={c}
            type="button"
            className="rt-swatch"
            style={{ background: c }}
            title={c}
            onMouseDown={(ev) => {
              ev.preventDefault()
              applyStyle(editor, { 'background-color': c })
            }}
          />
        ))}
        <button
          type="button"
          className="rt-swatch rt-swatch-none"
          title="เอาไฮไลต์ออก"
          onMouseDown={(ev) => {
            ev.preventDefault()
            applyStyle(editor, { 'background-color': null })
          }}
        >
          ✕
        </button>
      </span>
    </span>
  )
}

// ===== ล้างรูปแบบ =====
const ClearControl: React.FC<CtrlProps> = ({ editor }) => (
  <button
    type="button"
    className="rt-ctrl rt-btn"
    title="ล้างรูปแบบทั้งหมด"
    onMouseDown={(ev) => {
      ev.preventDefault()
      editor.update(() => {
        const sel = $getSelection()
        if (!$isRangeSelection(sel)) return
        $patchStyleText(sel, {
          'font-family': null,
          'font-size': null,
          color: null,
          'background-color': null,
          'font-weight': null,
        })
        $forEachSelectedTextNode((n) => n.setFormat(0))
      })
    }}
  >
    <span style={{ textDecoration: 'line-through' }}>tt</span>
  </button>
)

// ===== เปลี่ยนตัวพิมพ์ (UPPER → lower → Title) =====
function toTitle(s: string) {
  return s.replace(/\b([a-zก-๙])([a-zA-Zก-๙]*)/g, (_, a, b) => a.toUpperCase() + b)
}
const CaseControl: React.FC<CtrlProps> = ({ editor }) => (
  <button
    type="button"
    className="rt-ctrl rt-btn"
    title="เปลี่ยนตัวพิมพ์ใหญ่/เล็ก"
    onMouseDown={(ev) => {
      ev.preventDefault()
      editor.update(() => {
        const sel = $getSelection()
        if (!$isRangeSelection(sel)) return
        const t = sel.getTextContent()
        if (!t) return
        let next: string
        if (t === t.toUpperCase() && t !== t.toLowerCase()) next = t.toLowerCase()
        else if (t === toTitle(t.toLowerCase())) next = t.toUpperCase()
        else next = toTitle(t.toLowerCase())
        sel.insertText(next)
      })
    }}
  >
    TT
  </button>
)

// ===== CSS ของ toolbar (inject ครั้งเดียว) =====
const TOOLBAR_CSS = `
.rt-ctrl{display:inline-flex;align-items:center;height:30px;margin:2px;font-size:12px;
  border:1px solid var(--theme-elevation-150);border-radius:5px;background:var(--theme-input-bg);
  color:var(--theme-elevation-800);cursor:pointer;vertical-align:middle}
.rt-ctrl.rt-font{min-width:96px;max-width:150px;padding:0 4px}
.rt-ctrl.rt-size{width:64px;padding:0 4px}
select.rt-ctrl{appearance:auto}
.rt-color{gap:2px;padding:0 4px}
.rt-color-a{font-weight:800;line-height:1;padding-bottom:2px;border-bottom:3px solid #111}
.rt-hl-a{border:none;border-radius:3px;padding:1px 4px;color:#111}
.rt-color input[type=color]{width:22px;height:20px;padding:0;border:none;background:none;cursor:pointer}
.rt-swatches{display:inline-flex;align-items:center;gap:2px;margin-left:2px}
.rt-swatch{width:14px;height:14px;padding:0;border:1px solid rgba(0,0,0,.2);border-radius:3px;cursor:pointer;font-size:9px;line-height:1;display:inline-flex;align-items:center;justify-content:center}
.rt-swatch-none{background:#fff;color:#888}
.rt-btn{padding:0 9px;font-weight:700;justify-content:center}
.rt-btn:hover,.rt-swatch:hover{filter:brightness(.95)}
.rt-primary{background:var(--theme-success-500,#1e8e3e);color:#fff;border-color:transparent}
/* เต็มจอ */
.rt-fullscreen{position:fixed !important;inset:0 !important;z-index:9999 !important;margin:0 !important;
  padding:12px !important;background:var(--theme-bg,#fff) !important;max-width:none !important;overflow:auto !important}
/* modal ซอร์สโค้ด */
.rt-modal-bg{position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center}
.rt-modal{width:min(760px,92vw);max-height:82vh;display:flex;flex-direction:column;gap:10px;
  background:var(--theme-bg,#fff);color:var(--theme-elevation-800);border-radius:8px;padding:16px;box-shadow:0 10px 40px rgba(0,0,0,.3)}
.rt-modal-h{font-weight:700;font-size:14px}
.rt-modal-ta{flex:1;min-height:300px;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:12px;line-height:1.5;
  padding:10px;border:1px solid var(--theme-elevation-150);border-radius:6px;background:var(--theme-input-bg);color:var(--theme-elevation-800);resize:vertical}
.rt-modal-f{display:flex;justify-content:flex-end;gap:8px}
.rt-modal-f .rt-btn{height:32px;padding:0 14px}
`
const StyleInjector: React.FC = () => (
  <style dangerouslySetInnerHTML={{ __html: TOOLBAR_CSS }} />
)

// ===== พิมพ์ (Print) — พิมพ์เฉพาะเนื้อหาในกล่อง =====
const PrintControl: React.FC<CtrlProps> = ({ editor }) => (
  <button
    type="button"
    className="rt-ctrl rt-btn"
    title="พิมพ์เนื้อหา"
    onMouseDown={(ev) => {
      ev.preventDefault()
      const root = editor.getRootElement()
      const html = root ? root.innerHTML : ''
      const w = window.open('', '_blank', 'width=820,height=640')
      if (!w) return
      w.document.write(
        `<!doctype html><html><head><meta charset="utf-8"><title>พิมพ์เนื้อหา</title>` +
          `<link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap" rel="stylesheet">` +
          `<style>body{font-family:"Kanit",sans-serif;padding:36px;line-height:1.7;color:#111}img{max-width:100%}</style>` +
          `</head><body>${html}</body></html>`,
      )
      w.document.close()
      w.focus()
      w.setTimeout(() => w.print(), 300)
    }}
  >
    🖨
  </button>
)

// ===== Undo / Redo =====
const UndoControl: React.FC<CtrlProps> = ({ editor }) => (
  <button
    type="button"
    className="rt-ctrl rt-btn"
    title="ย้อนกลับ (Undo)"
    onMouseDown={(ev) => {
      ev.preventDefault()
      editor.dispatchCommand(UNDO_COMMAND, undefined)
    }}
  >
    ↶
  </button>
)
const RedoControl: React.FC<CtrlProps> = ({ editor }) => (
  <button
    type="button"
    className="rt-ctrl rt-btn"
    title="ทำซ้ำ (Redo)"
    onMouseDown={(ev) => {
      ev.preventDefault()
      editor.dispatchCommand(REDO_COMMAND, undefined)
    }}
  >
    ↷
  </button>
)

// ===== เต็มจอ (Fullscreen) — ขยายกล่อง editor เต็มหน้าจอ =====
const FullscreenControl: React.FC<CtrlProps> = ({ editor }) => (
  <button
    type="button"
    className="rt-ctrl rt-btn"
    title="เต็มจอ"
    onMouseDown={(ev) => {
      ev.preventDefault()
      const root = editor.getRootElement()
      const box =
        (root?.closest('[class*="rich-text-lexical"]') as HTMLElement | null) ||
        (root?.closest('.field-type') as HTMLElement | null) ||
        (root?.parentElement as HTMLElement | null)
      if (box) box.classList.toggle('rt-fullscreen')
    }}
  >
    ⛶
  </button>
)

// ===== Source code (HTML) — ดู/แก้ HTML แล้วนำกลับเข้า editor =====
const SourceControl: React.FC<CtrlProps> = ({ editor }) => {
  const [open, setOpen] = React.useState(false)
  const [html, setHtml] = React.useState('')
  const openIt = () => {
    let out = ''
    editor.getEditorState().read(() => {
      out = $generateHtmlFromNodes(editor, null)
    })
    setHtml(out)
    setOpen(true)
  }
  const apply = () => {
    editor.update(() => {
      const dom = new DOMParser().parseFromString(html, 'text/html')
      const nodes = $generateNodesFromDOM(editor, dom)
      const root = $getRoot()
      root.clear()
      for (const n of nodes) {
        if ($isElementNode(n)) root.append(n)
        else {
          const p = $createParagraphNode()
          p.append(n)
          root.append(p)
        }
      }
    })
    setOpen(false)
  }
  return (
    <>
      <button
        type="button"
        className="rt-ctrl rt-btn"
        title="ซอร์สโค้ด HTML"
        onMouseDown={(ev) => {
          ev.preventDefault()
          openIt()
        }}
      >
        {'</>'}
      </button>
      {open ? (
        <div className="rt-modal-bg" onMouseDown={() => setOpen(false)}>
          <div className="rt-modal" onMouseDown={(e) => e.stopPropagation()}>
            <div className="rt-modal-h">ซอร์สโค้ด HTML</div>
            <textarea
              className="rt-modal-ta"
              value={html}
              spellCheck={false}
              onChange={(e) => setHtml(e.target.value)}
            />
            <div className="rt-modal-f">
              <button
                type="button"
                className="rt-ctrl rt-btn"
                onMouseDown={(e) => {
                  e.preventDefault()
                  setOpen(false)
                }}
              >
                ยกเลิก
              </button>
              <button
                type="button"
                className="rt-ctrl rt-btn rt-primary"
                onMouseDown={(e) => {
                  e.preventDefault()
                  apply()
                }}
              >
                ใช้ HTML นี้
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

// wrapper: item.Component ได้ props { editor } จาก Payload
const wrap =
  (C: React.FC<CtrlProps>) =>
  (props: { editor: LexicalEditor }) =>
    React.createElement(C, { editor: props.editor })

export const RichStyleFeatureClient = createClientFeature(() => ({
  plugins: [{ Component: StyleInjector, position: 'normal' as const }],
  toolbarFixed: {
    groups: [
      {
        type: 'buttons' as const,
        key: 'richStyleFont',
        order: 25,
        items: [
          { key: 'rt-font', Component: wrap(FontControl) },
          { key: 'rt-size', Component: wrap(SizeControl) },
        ],
      },
      {
        type: 'buttons' as const,
        key: 'richStyleColor',
        order: 26,
        items: [
          { key: 'rt-color', Component: wrap(ColorControl) },
          { key: 'rt-highlight', Component: wrap(HighlightControl) },
        ],
      },
      {
        type: 'buttons' as const,
        key: 'richStyleUtil',
        order: 27,
        items: [
          { key: 'rt-clear', Component: wrap(ClearControl) },
          { key: 'rt-case', Component: wrap(CaseControl) },
          { key: 'rt-print', Component: wrap(PrintControl) },
        ],
      },
      {
        type: 'buttons' as const,
        key: 'richStyleTools',
        order: 40,
        items: [
          { key: 'rt-source', Component: wrap(SourceControl) },
          { key: 'rt-fullscreen', Component: wrap(FullscreenControl) },
          { key: 'rt-undo', Component: wrap(UndoControl) },
          { key: 'rt-redo', Component: wrap(RedoControl) },
        ],
      },
    ],
  },
}))
