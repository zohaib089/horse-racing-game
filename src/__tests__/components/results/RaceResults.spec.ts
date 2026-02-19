import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import RaceResults from '@/components/results/RaceResults.vue'
import { createTestStore } from '../../helpers/testStore'

vi.mock('vuex', async () => {
  const actual = await vi.importActual('vuex')
  return {
    ...actual,
    useStore: () => store
  }
})

let store: any

describe('RaceResults Component', () => {
  beforeEach(() => {
    store = createTestStore()
  })

  it('renders component title', () => {
    const wrapper = mount(RaceResults, {
      global: {
        stubs: {
          BaseCard: { template: '<div><slot name="header"></slot><slot></slot></div>' },
          EmptyState: true
        }
      }
    })
    expect(wrapper.text()).toContain('Race Results')
  })

  it('shows empty state when no results', () => {
    const wrapper = mount(RaceResults, {
      global: {
        stubs: {
          BaseCard: { template: '<div><slot></slot></div>' },
          EmptyState: true
        }
      }
    })
    expect(wrapper.findComponent({ name: 'EmptyState' }).exists()).toBe(true)
  })

  it('displays round results', () => {
    const horses = [
      { id: 1, name: 'Horse 1', condition: 90, color: 'red' },
      { id: 2, name: 'Horse 2', condition: 80, color: 'blue' },
      { id: 3, name: 'Horse 3', condition: 70, color: 'green' }
    ]
    
    store.commit('race/setSchedule', [{ id: 1, distance: 1200, horses }])
    store.commit('race/setResults', { roundId: 1, standings: horses })

    const wrapper = mount(RaceResults, {
      global: {
        stubs: {
          BaseCard: { template: '<div><slot></slot></div>' },
          EmptyState: true
        }
      }
    })

    expect(wrapper.text()).toContain('Round 1')
    expect(wrapper.text()).toContain('1200m')
  })

  it('displays top 3 horses with medals', () => {
    const horses = [
      { id: 1, name: 'Horse 1', condition: 90, color: 'red' },
      { id: 2, name: 'Horse 2', condition: 80, color: 'blue' },
      { id: 3, name: 'Horse 3', condition: 70, color: 'green' }
    ]
    
    store.commit('race/setSchedule', [{ id: 1, distance: 1200, horses }])
    store.commit('race/setResults', { roundId: 1, standings: horses })

    const wrapper = mount(RaceResults, {
      global: {
        stubs: {
          BaseCard: { template: '<div><slot></slot></div>' },
          EmptyState: true
        }
      }
    })

    expect(wrapper.text()).toContain('🥇')
    expect(wrapper.text()).toContain('🥈')
    expect(wrapper.text()).toContain('🥉')
  })

  it('displays horse names in results', () => {
    const horses = [
      { id: 1, name: 'Winner Horse', condition: 90, color: 'red' }
    ]
    
    store.commit('race/setSchedule', [{ id: 1, distance: 1200, horses }])
    store.commit('race/setResults', { roundId: 1, standings: horses })

    const wrapper = mount(RaceResults, {
      global: {
        stubs: {
          BaseCard: { template: '<div><slot></slot></div>' },
          EmptyState: true
        }
      }
    })

    expect(wrapper.text()).toContain('Winner Horse')
  })

  it('displays horse conditions', () => {
    const horses = [
      { id: 1, name: 'Horse 1', condition: 95, color: 'red' }
    ]
    
    store.commit('race/setSchedule', [{ id: 1, distance: 1200, horses }])
    store.commit('race/setResults', { roundId: 1, standings: horses })

    const wrapper = mount(RaceResults, {
      global: {
        stubs: {
          BaseCard: { template: '<div><slot></slot></div>' },
          EmptyState: true
        }
      }
    })

    expect(wrapper.text()).toContain('95')
  })
})
