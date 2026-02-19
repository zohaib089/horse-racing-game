import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import RaceProgram from '@/components/results/RacePrograms.vue'
import { createTestStore } from '../../helpers/testStore'

vi.mock('vuex', async () => {
  const actual = await vi.importActual('vuex')
  return {
    ...actual,
    useStore: () => store
  }
})

let store: any

describe('RaceProgram Component', () => {
  beforeEach(() => {
    store = createTestStore()
  })

  it('renders component title', () => {
    const wrapper = mount(RaceProgram, {
      global: {
        stubs: {
          BaseCard: { template: '<div><slot name="header"></slot><slot></slot></div>' },
          EmptyState: true
        }
      }
    })
    expect(wrapper.text()).toContain('Race Schedule')
  })

  it('shows empty state when no schedule', () => {
    const wrapper = mount(RaceProgram, {
      global: {
        stubs: {
          BaseCard: { template: '<div><slot></slot></div>' },
          EmptyState: true
        }
      }
    })
    expect(wrapper.findComponent({ name: 'EmptyState' }).exists()).toBe(true)
  })

  it('displays schedule rounds', () => {
    const horses = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `Horse ${i + 1}`,
      condition: 50,
      color: 'red'
    }))
    
    store.commit('race/setSchedule', [
      { id: 1, distance: 1200, horses },
      { id: 2, distance: 1400, horses }
    ])

    const wrapper = mount(RaceProgram, {
      global: {
        stubs: {
          BaseCard: { template: '<div><slot></slot></div>' },
          EmptyState: true
        }
      }
    })

    expect(wrapper.text()).toContain('Round 1')
    expect(wrapper.text()).toContain('Round 2')
  })

  it('displays round distances', () => {
    const horses = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `Horse ${i + 1}`,
      condition: 50,
      color: 'red'
    }))
    
    store.commit('race/setSchedule', [
      { id: 1, distance: 1200, horses }
    ])

    const wrapper = mount(RaceProgram, {
      global: {
        stubs: {
          BaseCard: { template: '<div><slot></slot></div>' },
          EmptyState: true
        }
      }
    })

    expect(wrapper.text()).toContain('1200')
  })

  it('displays horse count per round', () => {
    const horses = [
      { id: 1, name: 'Horse 1', condition: 50, color: 'red' },
      { id: 2, name: 'Horse 2', condition: 60, color: 'blue' }
    ]
    
    store.commit('race/setSchedule', [
      { id: 1, distance: 1200, horses }
    ])

    const wrapper = mount(RaceProgram, {
      global: {
        stubs: {
          BaseCard: { template: '<div><slot></slot></div>' },
          EmptyState: true
        }
      }
    })

    expect(wrapper.text()).toContain('2 horses racing')
  })
})
