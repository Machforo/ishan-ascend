/**
 * Rich text normalisation for CMS-authored content.
 *
 * The admin panel stores content produced by the Jodit editor. Depending on how a
 * field was created it can arrive here in one of four shapes:
 *
 *   1. Real HTML            -> "<p>Hello</p><ul><li>A</li></ul>"
 *   2. Escaped HTML         -> "&lt;p&gt;Hello&lt;/p&gt;"   (double-encoded on save)
 *   3. Plain text w/ breaks -> "Hello\n\nWorld"
 *   4. Empty / null
 *
 * `toRichHtml` turns all of them into safe, styled HTML so the frontend never shows
 * raw tags and never loses the admin's intended formatting.
 *
 * Pair the output with the `.rich-text` class (defined in index.css) which restores
 * paragraph spacing, list markers, heading scale and link styling inside CMS content.
 */

/** Tags kept as-is. Anything else is unwrapped (children preserved) or dropped. */
const ALLOWED_TAGS = new Set([
  'p', 'br', 'hr', 'span', 'div', 'section', 'article', 'figure', 'figcaption',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'ol', 'li', 'dl', 'dt', 'dd',
  'strong', 'b', 'em', 'i', 'u', 's', 'sub', 'sup', 'mark', 'small', 'code', 'pre', 'kbd',
  'blockquote', 'cite', 'q',
  'a', 'img', 'picture', 'source', 'video', 'audio', 'iframe',
  'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption', 'colgroup', 'col',
  // Admin section templates ship newsletter/enquiry blocks.
  'form', 'label', 'input', 'textarea', 'select', 'option', 'button', 'fieldset', 'legend',
]);

/** Tags removed together with their contents. */
const DROP_TAGS = new Set(['script', 'style', 'noscript', 'object', 'embed', 'link', 'meta', 'base']);

const GLOBAL_ATTRS = new Set(['class', 'id', 'title', 'dir', 'lang', 'colspan', 'rowspan', 'align', 'style']);

const TAG_ATTRS: Record<string, Set<string>> = {
  form: new Set(['action', 'method', 'target', 'name']),
  input: new Set(['type', 'name', 'value', 'placeholder', 'required', 'disabled', 'checked', 'min', 'max', 'step', 'pattern', 'autocomplete']),
  textarea: new Set(['name', 'placeholder', 'rows', 'cols', 'required', 'disabled']),
  select: new Set(['name', 'required', 'disabled', 'multiple']),
  option: new Set(['value', 'selected', 'disabled']),
  button: new Set(['type', 'name', 'value', 'disabled']),
  label: new Set(['for']),
  a: new Set(['href', 'target', 'rel', 'download']),
  img: new Set(['src', 'alt', 'width', 'height', 'loading', 'srcset', 'sizes']),
  source: new Set(['src', 'srcset', 'type', 'media', 'sizes']),
  video: new Set(['src', 'poster', 'controls', 'width', 'height', 'muted', 'loop', 'playsinline', 'autoplay', 'preload']),
  audio: new Set(['src', 'controls', 'loop', 'preload']),
  iframe: new Set(['src', 'width', 'height', 'allow', 'allowfullscreen', 'frameborder', 'loading', 'referrerpolicy']),
  col: new Set(['span', 'width']),
  colgroup: new Set(['span']),
};

const HAS_REAL_TAG = /<\/?[a-z][a-z0-9]*\b[^>]*>/i;
const HAS_ESCAPED_TAG = /&(?:lt|#60|#x3c);\/?[a-z]/i;
const UNSAFE_URL = /^\s*(?:javascript|vbscript|data:text\/html)/i;

function decodeEntities(input: string): string {
  if (typeof document === 'undefined') {
    return input
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
      .replace(/&quot;/gi, '"')
      .replace(/&#0?39;|&apos;/gi, "'")
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&');
  }
  const el = document.createElement('textarea');
  el.innerHTML = input;
  return el.value;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Turns "para one\n\npara two\nsame para" into proper paragraphs and line breaks. */
function plainTextToHtml(input: string): string {
  return input
    .split(/\n\s*\n+/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => `<p>${escapeHtml(block).replace(/\n/g, '<br />')}</p>`)
    .join('');
}

function sanitizeWithDom(html: string): string {
  const doc = new DOMParser().parseFromString(`<body>${html}</body>`, 'text/html');

  doc.body.querySelectorAll(Array.from(DROP_TAGS).join(',')).forEach((node) => node.remove());
  doc.body.querySelectorAll('*').forEach((el) => {
    const tag = el.tagName.toLowerCase();

    if (!ALLOWED_TAGS.has(tag)) {
      // Keep the text, lose the unknown wrapper.
      el.replaceWith(...Array.from(el.childNodes));
      return;
    }

    Array.from(el.attributes).forEach((attr) => {
      const name = attr.name.toLowerCase();
      const allowed = GLOBAL_ATTRS.has(name) || TAG_ATTRS[tag]?.has(name);
      if (!allowed || name.startsWith('on')) {
        el.removeAttribute(attr.name);
        return;
      }
      if ((name === 'href' || name === 'src' || name === 'srcset') && UNSAFE_URL.test(attr.value)) {
        el.removeAttribute(attr.name);
      }
      if (name === 'style' && /expression\(|javascript:|@import/i.test(attr.value)) {
        el.removeAttribute(attr.name);
      }
    });

    // Links opened in a new tab must not hand the opener over.
    if (tag === 'a' && el.getAttribute('target') === '_blank') {
      el.setAttribute('rel', 'noopener noreferrer');
    }
  });

  return doc.body.innerHTML;
}

/** Fallback used when there is no DOM (tests / SSR). Strips the dangerous parts only. */
function sanitizeWithRegex(html: string): string {
  return html
    .replace(/<\s*(script|style|noscript|object|embed|iframe)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, '')
    .replace(/\son[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/(href|src)\s*=\s*(?:"\s*javascript:[^"]*"|'\s*javascript:[^']*')/gi, '');
}

/**
 * Normalises any CMS text value into safe display HTML.
 * Returns "" for empty values so callers can skip rendering the wrapper.
 */
export function toRichHtml(value: unknown): string {
  if (value === null || value === undefined) return '';

  if (Array.isArray(value)) {
    return value.map((v) => toRichHtml(v)).join('');
  }

  if (typeof value !== 'string') {
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);
    return '';
  }

  let text = value.trim();
  if (!text) return '';

  // Content saved through an over-eager encoder arrives with escaped tags like "&lt;strong&gt;" or "&lt;p&gt;".
  let guard = 0;
  while (HAS_ESCAPED_TAG.test(text) && guard < 3) {
    text = decodeEntities(text).trim();
    guard += 1;
  }

  if (!HAS_REAL_TAG.test(text)) {
    return plainTextToHtml(text);
  }

  const sanitized = typeof DOMParser === 'undefined' ? sanitizeWithRegex(text) : sanitizeWithDom(text);

  // Jodit can emit a bare run of text plus <br> with no block wrapper; give it one
  // so paragraph spacing from `.rich-text` applies consistently.
  if (!/<\s*(p|div|ul|ol|h[1-6]|table|blockquote|section|figure|pre)\b/i.test(sanitized)) {
    return `<p>${sanitized}</p>`;
  }

  return sanitized;
}

/** Short alias — used by the inline `dangerouslySetInnerHTML` call sites. */
export const rt = toRichHtml;

/** True when a CMS value has anything worth rendering. */
export function hasRichText(value: unknown): boolean {
  return toRichHtml(value).replace(/<[^>]*>/g, '').trim().length > 0;
}

/** Plain-text projection of CMS content — for alt text, meta tags and truncation. */
export function richTextToPlain(value: unknown): string {
  const html = toRichHtml(value);
  if (!html) return '';
  if (typeof document === 'undefined') {
    return decodeEntities(html.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
  }
  const el = document.createElement('div');
  el.innerHTML = html;
  return (el.textContent || '').replace(/\s+/g, ' ').trim();
}
