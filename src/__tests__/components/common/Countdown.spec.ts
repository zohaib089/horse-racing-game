import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Countdown from '@/components/common/Countdown.vue'

describe('Countdown Component', () => {
  it('renders when show is true', () => {
    const wrapper = mount(Countdown, {
      props: { show: true }
    })
    expect(wrapper.find('.countdown-overlay').exists()).toBe(true)
  })

  it('does not render when show is false', () => {
    const wrapper = mount(Countdown, {
      props: { show: false }
    })
    expect(wrapper.find('.countdown-overlay').exists()).toBe(false)
  })

  it('displays countdown number starting at 3', () => {
    const wrapper = mount(Countdown, {
      props: { show: true }
    })
    expect(wrapper.find('.countdown-number').text()).toBe('3')
  })

  it('displays custom message when provided', () => {
    const wrapper = mount(Countdown, {
      props: { 
        show: true,
        message: 'Race Starting...'
      }
    })
    expect(wrapper.find('.countdown-message').text()).toBe('Race Starting...')
  })

  it('does not display message when not provided', () => {
    const wrapper = mount(Countdown, {
      props: { show: true }
    })
    expect(wrapper.find('.countdown-message').exists()).toBe(false)
  })

  it('applies correct CSS classes', () => {
    const wrapper = mount(Countdown, {
      props: { show: true }
    })
    
    expect(wrapper.find('.countdown-overlay').exists()).toBe(true)
    expect(wrapper.find('.countdown-content').exists()).toBe(true)
    expect(wrapper.find('.countdown-number').exists()).toBe(true)
  })

  it('handles multiple message types', async () => {
    const wrapper = mount(Countdown, {
      props: { 
        show: true,
        message: 'Round 1 Starting...'
      }
    })
    
    expect(wrapper.find('.countdown-message').text()).toBe('Round 1 Starting...')
    
    await wrapper.setProps({ message: 'Round 2 Starting...' })
    expect(wrapper.find('.countdown-message').text()).toBe('Round 2 Starting...')
  })

  it('has countdown content structure', () => {
    const wrapper = mount(Countdown, {
      props: { show: true, message: 'Test Message' }
    })
    
    const overlay = wrapper.find('.countdown-overlay')
    expect(overlay.exists()).toBe(true)
    expect(overlay.find('.countdown-content').exists()).toBe(true)
    expect(overlay.find('.countdown-message').exists()).toBe(true)
    expect(overlay.find('.countdown-number').exists()).toBe(true)
  })
})
