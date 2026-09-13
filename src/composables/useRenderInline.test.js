import { describe, it, expect } from 'vitest'
import { useRenderInline } from './useRenderInline.js'

const { renderInline } = useRenderInline()

// The three link shapes a changelog note or a rule can carry. The internal one is the reason
// this file exists: it must stay an <a> (copyable, keyboard-reachable) AND carry the class
// App.vue's global handler routes on — a plain href there reloads the whole app.
describe('renderInline — links', () => {
  it('renders an external link into a new tab, safely', () => {
    const html = renderInline('see [the rules](https://example.com/x) here')
    expect(html).toContain('<a href="https://example.com/x"')
    expect(html).toContain('target="_blank"')
    expect(html).toContain('rel="noopener noreferrer"')
  })

  it('renders a mailto link in place, without a new tab', () => {
    const html = renderInline('write to [me](mailto:a@b.c)')
    expect(html).toContain('<a href="mailto:a@b.c" class="ext-link">me</a>')
    expect(html).not.toContain('target="_blank"')
  })

  it('renders an in-app path as an int-link, for the router to pick up', () => {
    const html = renderInline('open [Support the project](/support) now')
    expect(html).toContain('<a href="/support" class="int-link">Support the project</a>')
    expect(html).not.toContain('target="_blank"')
  })

  it('leaves a bare path alone — only the markdown form is a link', () => {
    expect(renderInline('go to /support')).toBe('go to /support')
  })
})
