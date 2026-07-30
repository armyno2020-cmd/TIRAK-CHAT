# AGENTS.md - MANDATORY PROJECT & DESIGN SYSTEM SPECIFICATION

## System Instructions & Strict Design Lock
All AI coding agents MUST strictly adhere to the locked theme, brand identity, typography, and architectural rules defined in this document. Any code generated, modified, or converted must strictly conform to these specifications.

---

### Theme Specification: Liquid Formalist

```yaml
name: Liquid Formalist
colors:
  surface: '#fcf8fb'
  surface-dim: '#dcd9dc'
  surface-bright: '#fcf8fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f5'
  surface-container: '#f0edef'
  surface-container-high: '#eae7ea'
  surface-container-highest: '#e4e2e4'
  on-surface: '#1b1b1d'
  on-surface-variant: '#45474a'
  inverse-surface: '#303032'
  inverse-on-surface: '#f3f0f2'
  outline: '#76777b'
  outline-variant: '#c6c6ca'
  surface-tint: '#5d5e63'
  primary: '#5d5e63'
  on-primary: '#ffffff'
  primary-container: '#f2f2f7'
  on-primary-container: '#6d6e72'
  inverse-primary: '#c6c6cb'
  secondary: '#5d5e63'
  on-secondary: '#ffffff'
  secondary-container: '#e0dfe4'
  on-secondary-container: '#626267'
  tertiary: '#7e5356'
  on-tertiary: '#ffffff'
  tertiary-container: '#ffefef'
  on-tertiary-container: '#8f6265'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e7'
  primary-fixed-dim: '#c6c6cb'
  on-primary-fixed: '#1a1c1f'
  on-primary-fixed-variant: '#45474b'
  secondary-fixed: '#e3e2e7'
  secondary-fixed-dim: '#c6c6cb'
  on-secondary-fixed: '#1a1b1f'
  on-secondary-fixed-variant: '#46464b'
  tertiary-fixed: '#ffdadb'
  tertiary-fixed-dim: '#f0b9bc'
  on-tertiary-fixed: '#311215'
  on-tertiary-fixed-variant: '#633c3f'
  background: '#fcf8fb'
  on-background: '#1b1b1d'
  surface-variant: '#e4e2e4'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 34px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.4'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  margin-mobile: 20px
  margin-desktop: 64px
  gutter: 16px
  layer-gap: 24px
```

---

## 1. Brand & Style Principles
- **Design Concept:** Rooted in "Liquid Glass" architecture, prioritizing authority, transparency, depth, and military-grade privacy.
- **Materiality:** High glassmorphism + minimalism (`glass-panel`, `glass-surface`, backdrop blur 20–30px).
- **Default Language & Locale:** ภาษาไทย (Thai) เป็นภาษาหลักและภาษาบังคับสำหรับทุกหน้าจอและส่วนแสดงผลของแอปพลิเคชัน (เว็บเปิดใช้งานในประเทศไทย Default Location: Thailand / 'th').
- **Typography Lock (Font Prompt):** ต้องใช้ Google Font 'Prompt' เป็นฟอนต์หลักกับทุกหน้าทุกส่วนเกี่ยวกับตัวหนังสืออย่างสมบูรณ์ ร่วมกับ Kanit & Sarabun.
- **Privacy & Pre-Auth State:** ห้ามแสดงรูปโปรไฟล์หรือข้อมูลส่วนตัวของผู้ใช้ หากยังไม่ได้สมัครสมาชิกหรือเข้าสู่ระบบ.
- **Color Palette Lock:** The color palette above is STRICTLY LOCKED. Do NOT change hex codes or introduce arbitrary colors.
- **Code Conversion Policy:** Whenever any user submits snippet code, templates, or UI markup, the AI MUST automatically convert and re-theme it into this exact Liquid Formalist design system.

---

## 2. Layout & Architecture Rules
1. **Floating Layers:** Toolbars, header bars, and floating action sheets must be floating capsules with backdrop blur (`blur(20px)` or `blur(30px)`).
2. **Zero Hard Dividers:** Never use harsh 1px black/gray solid borders. Use subtle translucency, `glass-border`, or whitespace.
3. **Typography Scaling:** Left-aligned headings with Plus Jakarta Sans and Kanit. Clean body text with Inter and Sarabun.
4. **Squircle & Pill Radii:** All interactive buttons and inputs must use soft rounded or pill-shaped geometries (`rounded-full`, `rounded-2xl`, `rounded-3xl`).

---

## 3. กฎเหล็กแห่งการออกแบบ (IRONCLAD UI/UX DESIGN RULES)
1. **Design System Lock (ห้ามแก้ไขเด็ดขาด):** ชุด font ภาษา, ชุดสี, ชุดปุ่ม, และชุดสไตล์ต่างๆ ของ UI ทั้งหมดถูกล็อกไว้ตามค่าของหน้าแรก (Welcome Screen) อย่างสมบูรณ์ ห้ามเปลี่ยนแปลง แก้ไข หรือดัดแปลงโดยเด็ดขาด 
2. **UI Consistency:** การสร้างหน้าใหม่หรือแก้ไข UI จะต้องทำให้เป็นไปตามรูปแบบดีไซน์เหมือนหน้าแรกเสมอ (ไม่ว่าจะเป็นขนาดปุ่ม สัดส่วน ความโค้งมน การจัดวาง และความรู้สึก) ห้ามใช้ดีไซน์อื่นที่หลุดกรอบจากหน้าแรก
3. **No Unrequested UI Changes:** Do NOT change the frontend UI design at all unless explicitly asked.

