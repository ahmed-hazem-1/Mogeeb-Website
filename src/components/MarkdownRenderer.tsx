import React from 'react'
import { AlertCircle, CheckCircle, Info } from 'lucide-react'

interface MarkdownRendererProps {
  content: string
  className?: string
}

/**
 * MarkdownRenderer - Renders markdown-style text with basic formatting
 * Supports: **bold**, *italic*, `code`, > quotes, - lists, # headings
 */
export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  if (!content) return null

  // Split content into lines for processing
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let currentList: string[] = []
  let currentQuote: string[] = []
  let inCodeBlock = false
  let codeBlockContent = ''

  const renderInline = (text: string) => {
    const parts: React.ReactNode[] = []
    let lastIndex = 0

    // Regex patterns for inline formatting
    const boldRegex = /\*\*(.+?)\*\*/g
    const italicRegex = /\*(.+?)\*/g
    const codeRegex = /`(.+?)`/g
    const linkRegex = /\[(.+?)\]\((.+?)\)/g

    // Process all inline patterns
    let match
    const matches: Array<{ type: string; start: number; end: number; content: string; href?: string }> = []

    // Bold
    while ((match = boldRegex.exec(text)) !== null) {
      matches.push({ type: 'bold', start: match.index, end: match.index + match[0].length, content: match[1] })
    }

    // Code (inline)
    codeRegex.lastIndex = 0
    while ((match = codeRegex.exec(text)) !== null) {
      matches.push({ type: 'code', start: match.index, end: match.index + match[0].length, content: match[1] })
    }

    // Italic
    italicRegex.lastIndex = 0
    while ((match = italicRegex.exec(text)) !== null) {
      matches.push({ type: 'italic', start: match.index, end: match.index + match[0].length, content: match[1] })
    }

    // Links
    linkRegex.lastIndex = 0
    while ((match = linkRegex.exec(text)) !== null) {
      matches.push({
        type: 'link',
        start: match.index,
        end: match.index + match[0].length,
        content: match[1],
        href: match[2]
      })
    }

    // Sort by start position
    matches.sort((a, b) => a.start - b.start)

    // Remove overlapping matches
    const filtered = matches.filter((m, i, arr) => {
      if (i === 0) return true
      const prev = arr[i - 1]
      return m.start >= prev.end
    })

    // Render with formatting
    filtered.forEach((m) => {
      // Add text before this match
      if (m.start > lastIndex) {
        parts.push(text.substring(lastIndex, m.start))
      }

      // Add formatted content
      switch (m.type) {
        case 'bold':
          parts.push(
            <strong key={`${m.start}-bold`} className="font-bold text-gray-900">
              {m.content}
            </strong>
          )
          break
        case 'italic':
          parts.push(
            <em key={`${m.start}-italic`} className="italic text-gray-800">
              {m.content}
            </em>
          )
          break
        case 'code':
          parts.push(
            <code key={`${m.start}-code`} className="bg-orange-100 px-1.5 py-0.5 rounded font-mono text-xs text-orange-700">
              {m.content}
            </code>
          )
          break
        case 'link':
          parts.push(
            <a
              key={`${m.start}-link`}
              href={m.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-orange hover:underline"
            >
              {m.content}
            </a>
          )
          break
      }

      lastIndex = m.end
    })

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex))
    }

    return parts.length > 0 ? parts : text
  }

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="list-disc list-inside ml-4 space-y-1 my-2">
          {currentList.map((item, idx) => (
            <li key={idx} className="text-gray-700">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      )
      currentList = []
    }
  }

  const flushQuote = () => {
    if (currentQuote.length > 0) {
      elements.push(
        <blockquote
          key={`quote-${elements.length}`}
          className="border-l-4 border-blue-500 pl-4 my-2 italic text-gray-600 bg-blue-50 py-2 pr-2"
        >
          {currentQuote.map((line, idx) => (
            <div key={idx}>{renderInline(line)}</div>
          ))}
        </blockquote>
      )
      currentQuote = []
    }
  }

  // Process each line
  lines.forEach((line, index) => {
    // Code blocks (triple backticks)
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        // End code block
        elements.push(
          <pre key={`code-${elements.length}`} className="bg-gray-900 text-gray-100 p-4 rounded my-2 overflow-x-auto">
            <code className="font-mono text-sm">{codeBlockContent}</code>
          </pre>
        )
        codeBlockContent = ''
        inCodeBlock = false
      } else {
        // Start code block
        inCodeBlock = true
      }
      return
    }

    if (inCodeBlock) {
      codeBlockContent += line + '\n'
      return
    }

    // Headings
    if (line.startsWith('## ')) {
      flushList()
      flushQuote()
      const text = line.substring(3)
      elements.push(
        <h2 key={`h2-${elements.length}`} className="text-xl font-bold text-gray-900 mt-4 mb-2">
          {renderInline(text)}
        </h2>
      )
      return
    }

    if (line.startsWith('# ')) {
      flushList()
      flushQuote()
      const text = line.substring(2)
      elements.push(
        <h1 key={`h1-${elements.length}`} className="text-2xl font-bold text-gray-900 mt-4 mb-2">
          {renderInline(text)}
        </h1>
      )
      return
    }

    if (line.startsWith('### ')) {
      flushList()
      flushQuote()
      const text = line.substring(4)
      elements.push(
        <h3 key={`h3-${elements.length}`} className="text-lg font-bold text-gray-900 mt-3 mb-1">
          {renderInline(text)}
        </h3>
      )
      return
    }

    // Blockquotes
    if (line.startsWith('> ')) {
      const quoteText = line.substring(2)
      currentQuote.push(quoteText)
      return
    } else if (currentQuote.length > 0) {
      flushQuote()
    }

    // Lists
    if (line.startsWith('- ') || line.startsWith('* ')) {
      const item = line.substring(2)
      currentList.push(item)
      return
    } else if (currentList.length > 0 && line.trim() !== '') {
      flushList()
    }

    // Empty lines - add more space
    if (line.trim() === '') {
      elements.push(<div key={`space-${elements.length}`} className="h-3" />)
      return
    }

    // Regular paragraphs
    flushList()
    flushQuote()
    
    // Detect if this looks like a menu item with dash and price separator
    const isDashSeparated = line.includes(' - ')
    
    if (isDashSeparated) {
      // Split by dash and render as structured item
      const parts = line.split(' - ').map(p => p.trim())
      elements.push(
        <div key={`menu-${elements.length}`} className="flex justify-between items-center py-1.5 px-2 rounded hover:bg-orange-50 transition">
          <div className="flex-1">
            <p className="text-gray-800 text-sm leading-relaxed font-medium">
              {renderInline(parts[0])}
            </p>
          </div>
          {parts.length > 1 && (
            <span className="text-brand-orange font-bold text-sm ml-2 whitespace-nowrap">
              {renderInline(parts[1])}
            </span>
          )}
        </div>
      )
    } else {
      // Regular paragraph
      elements.push(
        <p key={`p-${elements.length}`} className="text-gray-700 text-sm mb-2" style={{ lineHeight: '2.0' }}>
          {renderInline(line)}
        </p>
      )
    }
  })

  // Flush any remaining blocks
  flushList()
  flushQuote()

  return (
    <div className={`markdown-content space-y-1 ${className}`} dir="auto" style={{ lineHeight: '2.0', whiteSpace: 'pre-wrap' }}>
      {elements.length > 0 ? (
        elements
      ) : (
        <p className="text-gray-700 leading-relaxed" style={{ lineHeight: '2.0', whiteSpace: 'pre-wrap' }}>
          {content}
        </p>
      )}
    </div>
  )
}

/**
 * Utility function to detect if content is markdown-style
 */
export function isMarkdownContent(text: string): boolean {
  return /^[#*-`>]|[\*\*`\*]|\[.+\]\(.+\)/.test(text)
}
