/* eslint-disable vue/one-component-per-file -- test doubles for a dialog and its host */
import { describe, it, expect, vi, afterEach } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { useBackToClose } from './useBackToClose.js'

// jsdom runs history traversal (back/forward/go) asynchronously and fires popstate on landing.
const settle = () => new Promise((r) => setTimeout(r, 20))

const Dialog = defineComponent({
  props: { onClose: Function },
  setup(props) {
    useBackToClose(props.onClose)
    return () => h('div', 'dialog')
  },
})

// A host that shows the dialog while `show` is true — the way BaseModal is used behind a v-if.
function host() {
  const show = ref(false)
  const close = vi.fn(() => { show.value = false })
  const wrapper = mount(defineComponent({
    setup: () => () => (show.value ? h(Dialog, { onClose: close }) : null),
  }))
  return { show, close, wrapper }
}

let wrapper
afterEach(async () => {
  wrapper?.unmount()
  wrapper = null
  await settle()
})

describe('useBackToClose', () => {
  it('opening pushes a copy of the current entry; Back pops it and closes the dialog', async () => {
    const before = history.length
    const { show, close, wrapper: w } = host()
    wrapper = w
    show.value = true
    await nextTick()
    expect(history.length).toBe(before + 1)
    expect(history.state.whDialog).toBeTruthy()

    history.back()
    await settle()
    expect(close).toHaveBeenCalledTimes(1)
    expect(show.value).toBe(false)
    expect(history.state?.whDialog).toBeFalsy()
  })

  it('closing by other means pops the copy itself, so Back afterwards leaves the page', async () => {
    history.pushState({ position: 7 }, '', '/page')
    const { show, wrapper: w } = host()
    wrapper = w
    show.value = true
    await nextTick()
    expect(history.state).toMatchObject({ position: 7, whDialog: expect.any(Number) })

    show.value = false // the X
    await nextTick()
    await settle()
    expect(history.state).toEqual({ position: 7 })
  })

  it('nested dialogs: one Back closes only the top one', async () => {
    const a = host()
    const b = host()
    wrapper = { unmount() { a.wrapper.unmount(); b.wrapper.unmount() } }
    a.show.value = true
    await nextTick()
    b.show.value = true
    await nextTick()

    history.back()
    await settle()
    expect(b.close).toHaveBeenCalledTimes(1)
    expect(a.close).not.toHaveBeenCalled()

    history.back()
    await settle()
    expect(a.close).toHaveBeenCalledTimes(1)
  })

  it('a dead copy left behind by close-and-navigate is stepped over on the way back', async () => {
    history.pushState({ position: 1 }, '', '/a')
    const { show, wrapper: w } = host()
    wrapper = w
    show.value = true
    await nextTick()
    // The dialog closes and, before its deferred self-pop runs, the router pushes a new entry
    // (the closing search palette navigating to its result) — the copy is now buried.
    show.value = false
    history.pushState({ position: 2 }, '', '/b')
    await nextTick()
    await settle()
    expect(location.pathname).toBe('/b')

    history.back() // lands on the dead copy of /a …
    await settle()
    // … and is carried on to /a itself: one Back, one page.
    expect(location.pathname).toBe('/a')
    expect(history.state).toEqual({ position: 1 })

    history.forward() // Forward bounces the other way: over the copy, onto /b
    await settle()
    expect(location.pathname).toBe('/b')
    expect(history.state).toEqual({ position: 2 })
  })
})

describe('useBackToCloseWhile', () => {
  it('follows a ref: opening pushes, Back closes, closing by hand pops', async () => {
    const { useBackToCloseWhile } = await import('./useBackToClose.js')
    const isOpen = ref(false)
    const w = mount(defineComponent({
      setup() {
        useBackToCloseWhile(isOpen, () => { isOpen.value = false })
        return () => h('div')
      },
    }))
    wrapper = w
    history.pushState({ position: 3 }, '', '/drawer')
    isOpen.value = true
    expect(history.state.whDialog).toBeTruthy()
    history.back()
    await settle()
    expect(isOpen.value).toBe(false)
    expect(history.state).toEqual({ position: 3 })

    isOpen.value = true
    isOpen.value = false
    await settle()
    expect(history.state).toEqual({ position: 3 })
  })
})
