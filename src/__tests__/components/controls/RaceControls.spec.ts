import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import RaceControls from '@/components/controls/RaceControls.vue'
import { createTestStore } from '../../helpers/testStore'

vi.mock('vuex', async () => {
  const actual = await vi.importActual('vuex')
  return {
    ...actual,
    useStore: () => store
  }
})

let store: any

describe('RaceControls Component', () => {
  beforeEach(() => {
    store = createTestStore()
  })

  it('renders all control buttons', () => {
    const wrapper = mount(RaceControls, {
      global: {
        stubs: {
          BaseButton: { template: '<button><slot></slot></button>' }
        }
      }
    })
    
    expect(wrapper.text()).toContain('Generate Horses')
    expect(wrapper.text()).toContain('Generate Schedule')
    expect(wrapper.text()).toContain('Start Race')
    expect(wrapper.text()).toContain('Reset')
  })

  it('disables buttons based on race status', () => {
    store.commit('race/setStatus', 'running')
    
    const wrapper = mount(RaceControls, {
      global: {
        stubs: {
          BaseButton: { 
            template: '<button :disabled="disabled"><slot></slot></button>',
            props: ['disabled']
          }
        }
      }
    })
    
    const buttons = wrapper.findAll('button')
    const generateHorsesBtn = buttons.find(btn => btn.text().includes('Generate Horses'))
    expect(generateHorsesBtn?.attributes('disabled')).toBeDefined()
  })
})
