import BaseButton from '@/components/common/BaseButton.vue'
import BaseCard from '@/components/common/BaseCard.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('BaseButton Component', () => {
  it('renders button with text', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Click Me'
      }
    })
    expect(wrapper.text()).toBe('Click Me')
  })

  it('emits click event', async () => {
    const wrapper = mount(BaseButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('can be disabled', () => {
    const wrapper = mount(BaseButton, {
      props: {
        disabled: true
      }
    })
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('applies variant classes', () => {
    const wrapper = mount(BaseButton, {
      props: {
        variant: 'primary'
      }
    })
    expect(wrapper.classes()).toContain('btn-primary')
  })
})

describe('BaseCard Component', () => {
  it('renders card with content', () => {
    const wrapper = mount(BaseCard, {
      slots: {
        default: 'Card Content'
      }
    })
    expect(wrapper.text()).toContain('Card Content')
  })

  it('renders header slot', () => {
    const wrapper = mount(BaseCard, {
      slots: {
        header: 'Card Header'
      }
    })
    expect(wrapper.text()).toContain('Card Header')
  })

  it('applies elevated class when prop is true', () => {
    const wrapper = mount(BaseCard, {
      props: {
        elevated: true
      }
    })
    expect(wrapper.classes()).toContain('card-elevated')
  })

  it('renders both header and content', () => {
    const wrapper = mount(BaseCard, {
      slots: {
        header: 'Header',
        default: 'Content'
      }
    })
    expect(wrapper.text()).toContain('Header')
    expect(wrapper.text()).toContain('Content')
  })
})

describe('EmptyState Component', () => {
  it('renders message', () => {
    const wrapper = mount(EmptyState, {
      props: {
        message: 'No data available'
      }
    })
    expect(wrapper.text()).toContain('No data available')
  })

  it('renders icon', () => {
    const wrapper = mount(EmptyState, {
      props: {
        message: 'Empty',
        icon: '📭'
      }
    })
    expect(wrapper.text()).toContain('📭')
  })

  it('renders without icon', () => {
    const wrapper = mount(EmptyState, {
      props: {
        message: 'Empty'
      }
    })
    expect(wrapper.text()).toContain('Empty')
  })

  it('has empty-state class', () => {
    const wrapper = mount(EmptyState, {
      props: {
        message: 'Test'
      }
    })
    expect(wrapper.classes()).toContain('empty-state')
  })
})
