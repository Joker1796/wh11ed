import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchModal from './SearchModal.vue'
import { useSearchHistory } from '../composables/useSearchHistory.js'

// The palette navigates through useRefNavigation → useRouter; nothing here needs a real router.
vi.mock('vue-router', () => ({ useRouter: () => ({ push: vi.fn().mockResolvedValue(undefined) }) }))

const { history, remember, clearHistory } = useSearchHistory()

let wrapper = null
beforeEach(() => { clearHistory(); localStorage.clear() })
afterEach(() => { wrapper?.unmount(); document.body.innerHTML = '' })

const open = () => (wrapper = mount(SearchModal, { attachTo: document.body }))

describe('SearchModal — recent searches', () => {
  it('shows the typing hint while there is nothing to recall', () => {
    open()
    expect(wrapper.find('.search-hint-text').exists()).toBe(true)
    expect(wrapper.findAll('.sh-row')).toHaveLength(0)
  })

  it('lists remembered queries instead of the hint, newest first', () => {
    remember('charge')
    remember('objective')
    open()
    expect(wrapper.find('.search-hint-text').exists()).toBe(false)
    expect(wrapper.findAll('.sh-pick').map((b) => b.text())).toEqual(['objective', 'charge'])
  })

  it('puts a picked query back in the input rather than navigating', async () => {
    remember('charge')
    open()
    await wrapper.find('.sh-pick').trigger('click')
    expect(wrapper.find('.search-input').element.value).toBe('charge')
    expect(wrapper.emitted('close')).toBeFalsy()
  })

  it('drops one query, and all of them', async () => {
    remember('charge')
    remember('objective')
    open()
    await wrapper.find('.sh-forget').trigger('click')
    expect(history.value).toEqual(['charge'])
    await wrapper.find('.sh-clear').trigger('click')
    expect(history.value).toEqual([])
    expect(wrapper.find('.search-hint-text').exists()).toBe(true)
  })

  // The point of writing on commit: half-typed prefixes never reach the list.
  it('remembers a query only once it has taken the user somewhere', async () => {
    open()
    await wrapper.find('.search-input').setValue('charge')
    expect(wrapper.findAll('.result-item').length).toBeGreaterThan(0)
    expect(history.value).toEqual([])
    await wrapper.find('.result-item').trigger('click')
    expect(history.value).toEqual(['charge'])
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
