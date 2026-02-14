/**
 * Simple Lexical JSON to HTML converter
 * Handles basic node types: paragraph, heading, text with formatting, links
 */

interface LexicalNode {
  type: string
  version?: number
  children?: LexicalNode[]
  text?: string
  format?: number
  url?: string
  tag?: string
  [key: string]: any
}

interface LexicalJSON {
  root: {
    children: LexicalNode[]
    [key: string]: any
  }
}

/**
 * Convert Lexical format flags to HTML tags
 * Format is a bitmask: 1=bold, 2=italic, 4=strikethrough, 8=underline, 16=code
 */
function formatText(text: string, format?: number): string {
  if (!format) return text

  let result = text

  if (format & 1) result = `<strong>${result}</strong>`
  if (format & 2) result = `<em>${result}</em>`
  if (format & 8) result = `<u>${result}</u>`
  if (format & 4) result = `<s>${result}</s>`
  if (format & 16) result = `<code>${result}</code>`

  return result
}

/**
 * Convert a single Lexical node to HTML
 */
function nodeToHtml(node: LexicalNode): string {
  // Text node
  if (node.type === 'text') {
    const text = node.text || ''
    return formatText(text, node.format)
  }

  // Link node
  if (node.type === 'link') {
    const url = node.url || '#'
    const children = node.children?.map(nodeToHtml).join('') || ''
    return `<a href="${url}">${children}</a>`
  }

  // Paragraph node
  if (node.type === 'paragraph') {
    const children = node.children?.map(nodeToHtml).join('') || ''
    return `<p>${children}</p>`
  }

  // Heading node
  if (node.type === 'heading') {
    const tag = node.tag || 'h2'
    const children = node.children?.map(nodeToHtml).join('') || ''
    return `<${tag}>${children}</${tag}>`
  }

  // List node
  if (node.type === 'list') {
    const tag = node.listType === 'number' ? 'ol' : 'ul'
    const children = node.children?.map(nodeToHtml).join('') || ''
    return `<${tag}>${children}</${tag}>`
  }

  // List item node
  if (node.type === 'listitem') {
    const children = node.children?.map(nodeToHtml).join('') || ''
    return `<li>${children}</li>`
  }

  // Linebreak node
  if (node.type === 'linebreak') {
    return '<br />'
  }

  // Fallback: render children if available
  if (node.children && node.children.length > 0) {
    return node.children.map(nodeToHtml).join('')
  }

  return ''
}

/**
 * Convert Lexical JSON to HTML string
 */
export function lexicalToHtml(lexicalContent: any): string {
  // Handle empty or invalid input
  if (!lexicalContent) return ''

  // If already a string, return as-is
  if (typeof lexicalContent === 'string') return lexicalContent

  try {
    // Parse if it's a JSON string
    const parsed: LexicalJSON =
      typeof lexicalContent === 'string'
        ? JSON.parse(lexicalContent)
        : lexicalContent

    // Check if it has the expected Lexical structure
    if (!parsed.root || !parsed.root.children) {
      return ''
    }

    return parsed.root.children.map(nodeToHtml).join('')
  } catch (error) {
    console.error('Error converting Lexical to HTML:', error)
    return ''
  }
}

/**
 * Extract plain text from Lexical JSON (for email text fallback)
 */
export function lexicalToPlainText(lexicalContent: any): string {
  const html = lexicalToHtml(lexicalContent)
  // Simple HTML tag removal
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}
