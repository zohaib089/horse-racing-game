import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import HorsesList from '@/components/horses/HorsesList.vue'
import { createTestStore } from '../../helpers/testStore'

vi.mock('vuex', async () => {
  const actual = await vi.importActual('vuex')
  return {
    ...actual,
    useStore: () => store
  }
})

let store: any

describe('HorsesList Component', () => {
  beforeEach(() => {
    store = createTestStore()
  })

  it('renders component title', () => {
    const wrapper = mount(HorsesList, {
      global: {
        stubs: {
          BaseCard: { template: '<div><slot name="header"></slot><slot></slot></div>' },
          EmptyState: true
        }
      }
    })
    expect(wrapper.text()).toContain('Horses')
  })

  it('shows empty state when no horses', () => {
    const wrapper = mount(HorsesList, {
      global: {
        stubs: {
          BaseCard: { template: '<div><slot></slot></div>' },
          EmptyState: true
        }
      }
    })
    expect(wrapper.findComponent({ name: 'EmptyState' }).exists()).toBe(true)
  })

  it('displays horses when available', () => {
    const horses = [
      { id: 1, name: 'Horse 1', condition: 50, color: 'red' },
      { id: 2, name: 'Horse 2', condition: 75, color: 'blue' }
    ]
    store.commit('race/setHorses', horses)

    const wrapper = mount(HorsesList, {
      global: {
        stubs: {
          BaseCard: { template: '<div><slot></slot></div>' },
          EmptyState: true
        }
      }
    })

    expect(wrapper.text()).toContain('Horse 1')
    expect(wrapper.text()).toContain('Horse 2')
  })

  it('displays horse conditions', () => {
    const horses = [
      { id: 1, name: 'Horse 1', condition: 85, color: 'red' }
    ]
    store.commit('race/setHorses', horses)

    const wrapper = mount(HorsesList, {
      global: {
        stubs: {
          BaseCard: { template: '<div><slot></slot></div>' },
          EmptyState: true
        }
      }
    })

    expect(wrapper.text()).toContain('85')
  })

  it('displays horse colors', () => {
    const horses = [
      { id: 1, name: 'Horse 1', condition: 50, color: 'rgb(255, 0, 0)' }
    ]
    store.commit('race/setHorses', horses)

    const wrapper = mount(HorsesList, {
      global: {
        stubs: {
          BaseCard: { template: '<div><slot></slot></div>' },
          EmptyState: true
        }
      }
    })

    const colorElement = wrapper.find('[style*="rgb(255, 0, 0)"]')
    expect(colorElement.exists()).toBe(true)
  })
})
