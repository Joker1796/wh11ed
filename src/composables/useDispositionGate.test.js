import { describe, it, expect, vi } from 'vitest'
import { ref, computed } from 'vue'
import { useDispositionGate } from './useDispositionGate.js'
import { ui } from '../i18n/ui.js'

const labels = computed(() => ui.en)
const undeclared = { code: 'dispositionUndeclared', level: 'warn', params: { options: 'Take and Hold, Purge the Foe' } }

describe('useDispositionGate', () => {
  it('saves straight away when the disposition is declared', () => {
    const save = vi.fn()
    const g = useDispositionGate(ref({ issues: [] }), labels)
    g.guard(save)
    expect(save).toHaveBeenCalledOnce()
    expect(g.open.value).toBe(false)
  })

  it('asks first when it is not, and saves only on "save anyway"', () => {
    const save = vi.fn()
    const g = useDispositionGate(ref({ issues: [undeclared] }), labels)
    g.guard(save)
    expect(save).not.toHaveBeenCalled()
    expect(g.open.value).toBe(true)
    expect(g.message.value).toContain('Take and Hold, Purge the Foe')
    g.confirm()
    expect(save).toHaveBeenCalledOnce()
    expect(g.open.value).toBe(false)
  })

  it('"choose it" (or Escape) closes without saving', () => {
    const save = vi.fn()
    const g = useDispositionGate(ref({ issues: [undeclared] }), labels)
    g.guard(save)
    g.close()
    g.confirm()
    expect(save).not.toHaveBeenCalled()
  })
})
