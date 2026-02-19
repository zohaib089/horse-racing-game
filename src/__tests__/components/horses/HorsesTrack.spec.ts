import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import HorsesTrack from '@/components/horses/HorsesTrack.vue'
import { createTestStore } from '../../helpers/testStore'

vi.mock('vuex', async () => {
  const actual = await vi.importActual('vuex')
  return {
    ...actual,
    useStore: () => store
  }
})

let store: any

describe('HorsesTrack Component', () => {
  beforeEach(() => {
    store = createTestStore()
  })

  it('renders track title', () => {
    const wrapper = mount(HorsesTrack, {
      global: {
        stubs: {
          EmptyState: true
        }
      }
    })
    expect(wrapper.find('.track-title').text()).toBe('Race Track')
  })

  it('shows empty state when no current round', () => {
    const wrapper = mount(HorsesTrack, {
      global: {
        stubs: {
          EmptyState: true
        }
      }
    })
    expect(wrapper.findComponent({ name: 'EmptyState' }).exists()).toBe(true)
  })

  it('shows track when current round exists', () => {
    const horses = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `Horse ${i + 1}`,
      condition: 50,
      color: `hsl(${i * 18}, 70%, 50%)`
    }))

    store.commit('race/setSchedule', [{
      id: 1,
      distance: 1200,
      horses
    }])

    const wrapper = mount(HorsesTrack, {
      global: {
        stubs: {
          EmptyState: true
        }
      }
    })

    expect(wrapper.find('.track').exists()).toBe(true)
  })

  it('renders correct number of lanes', () => {
    const horses = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `Horse ${i + 1}`,
      condition: 50,
      color: `hsl(${i * 18}, 70%, 50%)`
    }))

    store.commit('race/setSchedule', [{
      id: 1,
      distance: 1200,
      horses
    }])

    const wrapper = mount(HorsesTrack, {
      global: {
        stubs: {
          EmptyState: true
        }
      }
    })

    expect(wrapper.findAll('.lane')).toHaveLength(10)
  })

  it('displays horse names in lanes', () => {
    const horses = Array.from({ length: 3 }, (_, i) => ({
      id: i + 1,
      name: `Horse ${i + 1}`,
      condition: 50,
      color: `hsl(${i * 18}, 70%, 50%)`
    }))

    store.commit('race/setSchedule', [{
      id: 1,
      distance: 1200,
      horses
    }])

    const wrapper = mount(HorsesTrack, {
      global: {
        stubs: {
          EmptyState: true
        }
      }
    })

    const horseNames = wrapper.findAll('.horse-name')
    expect(horseNames).toHaveLength(3)
    expect(horseNames[0]?.text()).toBe('Horse 1')
    expect(horseNames[1]?.text()).toBe('Horse 2')
    expect(horseNames[2]?.text()).toBe('Horse 3')
  })

  it('displays lane numbers', () => {
    const horses = Array.from({ length: 3 }, (_, i) => ({
      id: i + 1,
      name: `Horse ${i + 1}`,
      condition: 50,
      color: `hsl(${i * 18}, 70%, 50%)`
    }))

    store.commit('race/setSchedule', [{
      id: 1,
      distance: 1200,
      horses
    }])

    const wrapper = mount(HorsesTrack, {
      global: {
        stubs: {
          EmptyState: true
        }
      }
    })

    const laneNumbers = wrapper.findAll('.lane-number')
    expect(laneNumbers).toHaveLength(3)
    expect(laneNumbers[0]?.text()).toBe('1')
    expect(laneNumbers[1]?.text()).toBe('2')
    expect(laneNumbers[2]?.text()).toBe('3')
  })

  it('applies horse colors to circles', () => {
    const horses = [{
      id: 1,
      name: 'Horse 1',
      condition: 50,
      color: 'rgb(255, 0, 0)'
    }]

    store.commit('race/setSchedule', [{
      id: 1,
      distance: 1200,
      horses
    }])

    const wrapper = mount(HorsesTrack, {
      global: {
        stubs: {
          EmptyState: true
        }
      }
    })

    const horseCircle = wrapper.find('.horse-circle')
    expect(horseCircle.attributes('style')).toContain('rgb(255, 0, 0)')
  })

  it('shows race info when status is running', () => {
    const horses = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `Horse ${i + 1}`,
      condition: 50,
      color: `hsl(${i * 18}, 70%, 50%)`
    }))

    store.commit('race/setSchedule', [{
      id: 1,
      distance: 1200,
      horses
    }])
    store.commit('race/setStatus', 'running')

    const wrapper = mount(HorsesTrack, {
      global: {
        stubs: {
          EmptyState: true
        }
      }
    })

    expect(wrapper.find('.race-info').exists()).toBe(true)
    expect(wrapper.text()).toContain('Racing Now')
  })

  it('shows race info when status is between_rounds', () => {
    const horses = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `Horse ${i + 1}`,
      condition: 50,
      color: `hsl(${i * 18}, 70%, 50%)`
    }))

    store.commit('race/setSchedule', [{
      id: 1,
      distance: 1200,
      horses
    }])
    store.commit('race/setStatus', 'between_rounds')

    const wrapper = mount(HorsesTrack, {
      global: {
        stubs: {
          EmptyState: true
        }
      }
    })

    expect(wrapper.find('.race-info').exists()).toBe(true)
    expect(wrapper.text()).toContain('Round Complete')
  })

  it('displays correct round information', () => {
    const horses = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `Horse ${i + 1}`,
      condition: 50,
      color: `hsl(${i * 18}, 70%, 50%)`
    }))

    store.commit('race/setSchedule', [
      { id: 1, distance: 1200, horses },
      { id: 2, distance: 1400, horses }
    ])
    store.commit('race/setStatus', 'running')

    const wrapper = mount(HorsesTrack, {
      global: {
        stubs: {
          EmptyState: true
        }
      }
    })

    expect(wrapper.text()).toContain('Round 1 / 2')
    expect(wrapper.text()).toContain('1200m')
  })

  it('renders finish line', () => {
    const horses = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `Horse ${i + 1}`,
      condition: 50,
      color: `hsl(${i * 18}, 70%, 50%)`
    }))

    store.commit('race/setSchedule', [{
      id: 1,
      distance: 1200,
      horses
    }])

    const wrapper = mount(HorsesTrack, {
      global: {
        stubs: {
          EmptyState: true
        }
      }
    })

    expect(wrapper.find('.finish-line').exists()).toBe(true)
  })

  it('applies galloping class when racing', () => {
    const horses = [{
      id: 1,
      name: 'Horse 1',
      condition: 50,
      color: 'red'
    }]

    store.commit('race/setSchedule', [{
      id: 1,
      distance: 1200,
      horses
    }])
    store.commit('race/setStatus', 'running')

    const wrapper = mount(HorsesTrack, {
      global: {
        stubs: {
          EmptyState: true
        }
      }
    })

    expect(wrapper.find('.horse.galloping').exists()).toBe(true)
  })
})
