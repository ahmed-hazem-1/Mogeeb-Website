# Markdown Renderer Component - Documentation

## Overview

The `MarkdownRenderer` component takes text responses from n8n webhook and renders them as formatted markdown with support for:
- **Bold text** (`**text**`)
- *Italic text* (`*text*`)
- `Inline code` (`` `code` ``)
- Code blocks (triple backticks)
- Headings (`#`, `##`, `###`)
- Lists (`-`, `*`)
- Block quotes (`>`)
- Links (`[text](url)`)

---

## Features

### Supported Markdown Syntax

| Syntax | Example | Result |
|--------|---------|--------|
| **Bold** | `**bold text**` | <strong>bold text</strong> |
| *Italic* | `*italic text*` | *italic text* |
| `Code` | `` `code` `` | `code` |
| Code Block | `` ```code``` `` | Code block with syntax highlight |
| Heading 1 | `# Heading` | Large heading |
| Heading 2 | `## Heading` | Medium heading |
| Heading 3 | `### Heading` | Smaller heading |
| List | `- item` | Bullet list |
| Quote | `> Quote text` | Block quote |
| Link | `[text](url)` | Clickable link |

---

## Usage

### Basic Usage in Components

```tsx
import MarkdownRenderer from '@/components/MarkdownRenderer'

export default function MyComponent() {
  const content = `
# Hello World

This is **bold** and *italic* text.

- List item 1
- List item 2

\`\`\`
code block
\`\`\`
  `

  return <MarkdownRenderer content={content} />
}
```

### In ChatbotDemo

The chat now automatically renders bot responses as markdown:

```tsx
<MarkdownRenderer content={message.text} className="arabic-text" />
```

---

## Component Props

### MarkdownRendererProps

```typescript
interface MarkdownRendererProps {
  content: string          // Markdown text to render
  className?: string       // Additional CSS classes
}
```

### Example with Custom Styling

```tsx
<MarkdownRenderer 
  content={botResponse}
  className="custom-style text-large"
/>
```

---

## How N8N Should Format Responses

### Example 1: Simple Response
```
مرحبا! كيف أساعدك اليوم؟
```

### Example 2: Response with Formatting
```
# الأسعار

## المشويات
- لحم شوي: 150 جنيه
- فرخة شوي: 120 جنيه
- كفتة: 100 جنيه

> ملاحظة: الأسعار قابلة للتغيير
```

### Example 3: Response with Code
```
## معلومات الطلب

رقم الطلب: \`#12345\`

تم تأكيد الطلب بنجاح!

**الإجمالي:** 500 جنيه
```

### Example 4: Response with Lists and Bold
```
## ملخص الطلب

**العناصر:**
- كيلو كفتة: 100 جنيه
- رز: 20 جنيه
- سلاطة: 30 جنيه

**الإجمالي:** 150 جنيه

شكراً لاختيارك مطعمنا! 🎉
```

---

## Inline Formatting Examples

### Bold Text
```
Input:  هذا **نص مهم** جداً
Output: هذا <strong>نص مهم</strong> جداً
```

### Italic Text
```
Input:  هذا *نص مائل* جداً
Output: هذا <em>نص مائل</em> جداً
```

### Code
```
Input:  استخدم أمر `npm start` لتشغيل التطبيق
Output: استخدم أمر <code>npm start</code> لتشغيل التطبيق
```

### Links
```
Input:  [زيارة موقعنا](https://example.com)
Output: <a href="https://example.com">زيارة موقعنا</a>
```

---

## Block Elements

### Headings
```markdown
# Heading 1
## Heading 2
### Heading 3
```

Renders with appropriate sizes and spacing.

### Lists
```markdown
- Item 1
- Item 2
  - Nested item (note: not supported, will be treated as regular item)
- Item 3
```

### Block Quotes
```markdown
> This is a quote
> It can span multiple lines
```

Renders with blue left border and background.

### Code Blocks
````markdown
```
function hello() {
  console.log("Hello World")
}
```
````

Renders with dark background and syntax highlighting.

---

## Styling

### CSS Classes Applied

| Element | Class |
|---------|-------|
| Bold | `font-bold text-gray-900` |
| Italic | `italic text-gray-800` |
| Inline Code | `bg-gray-100 px-2 py-1 rounded font-mono text-sm text-red-600` |
| Links | `text-blue-600 hover:underline` |
| Lists | `list-disc list-inside ml-4 space-y-1` |
| List Items | `text-gray-700` |
| Block Quotes | `border-l-4 border-blue-500 pl-4 italic text-gray-600 bg-blue-50` |
| Code Blocks | `bg-gray-900 text-gray-100 p-4 rounded` |
| H1 | `text-2xl font-bold text-gray-900` |
| H2 | `text-xl font-bold text-gray-900` |
| H3 | `text-lg font-bold text-gray-900` |
| Paragraphs | `text-gray-700 leading-relaxed` |

### Customizing Styles

The component uses Tailwind CSS classes. To customize, modify the className strings in the component:

```tsx
// Example: Change heading color
<h2 className="text-xl font-bold text-blue-900 mt-4 mb-2">
  {renderInline(text)}
</h2>
```

---

## RTL Support (Arabic)

The component works with RTL (right-to-left) languages:

```tsx
<div dir="rtl">
  <MarkdownRenderer content={arabicContent} />
</div>
```

All formatting works correctly with Arabic text, including proper text direction for links, code, etc.

---

## Utility Function

### isMarkdownContent()

Check if text contains markdown formatting:

```typescript
import { isMarkdownContent } from '@/components/MarkdownRenderer'

const text = "هذا **نص مهم**"
if (isMarkdownContent(text)) {
  // Use MarkdownRenderer
} else {
  // Use plain text
}
```

---

## Performance Considerations

- The component processes markdown on render
- For very long texts (>10KB), consider memoization:

```tsx
const MemoizedRenderer = React.memo(MarkdownRenderer)
```

- Inline pattern matching uses RegExp which is efficient for typical chat messages

---

## Edge Cases

### Overlapping Patterns
The component handles overlapping markdown patterns by:
1. Collecting all matches
2. Sorting by position
3. Removing overlaps (first match wins)

### Unclosed Patterns
```markdown
**unclosed bold
*unclosed italic
```

These render as-is without special formatting.

### Escaped Characters
Currently no escape sequence support. If you need to display literal `**`, you need to avoid the pattern.

### Empty Content
Returns null if content is empty or undefined.

---

## N8N Webhook Integration

### Modify N8N Workflow

To send markdown-formatted responses:

1. In N8N workflow, prepare response text with markdown
2. Return response as plain text string (not JSON)
3. System will render it automatically

### Example N8N Response

```javascript
// Return from N8N:
return `
## Your Order

**Items:**
- Item 1: Price 1
- Item 2: Price 2

**Total:** Price

Thank you!
`
```

---

## Browser Support

- Chrome/Edge: Full support ✅
- Firefox: Full support ✅
- Safari: Full support ✅
- Mobile browsers: Full support ✅

---

## Future Enhancements

Potential features for future updates:

- [ ] Escape sequence support (`\*` for literal asterisk)
- [ ] Strikethrough (`~~text~~`)
- [ ] Tables (`| col1 | col2 |`)
- [ ] Nested lists
- [ ] Horizontal rules (`---`)
- [ ] Task lists (`- [x] Task`)
- [ ] Emoji support (`:smile:`)
- [ ] Custom theme support

---

## Troubleshooting

### Markdown not rendering
- Check that content is passed correctly
- Verify markdown syntax is correct
- Check browser console for errors

### Text direction issues
- Ensure parent div has `dir="rtl"` for Arabic
- Component respects parent directionality

### Styling looks wrong
- Verify Tailwind CSS is loaded
- Check for CSS conflicts with other styles
- Inspect element to see applied classes

---

## Code Example: N8N Response

Here's how your N8N workflow should format responses:

```javascript
// N8N JavaScript node
const message = $input.all()[0].json.message

// Process message and generate response
const response = `
## رد الخادم

**أحمد:** ${message}

**المساعد:**
- سأساعدك الآن
- اترك الأمر علي

> دائماً في خدمتك!

\`\`\`
Order ID: #12345
Status: Processing
\`\`\`

اضغط هنا لمزيد من المعلومات: [تفاصيل الطلب](https://example.com)
`

return response
```

---

## Files Modified

- ✅ **Created:** `src/components/MarkdownRenderer.tsx`
- ✅ **Updated:** `src/components/ChatbotDemo.tsx`
  - Added import for MarkdownRenderer
  - Updated message rendering to use markdown

---

**Status:** ✅ Complete and ready to use
**Last Updated:** November 6, 2025
