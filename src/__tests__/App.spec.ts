import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import App from '../App.vue'
import { raceModule } from '../store/race/race.module'

describe('App', () => {
  it('mounts and renders properly', () => {
    const store = createStore({
      modules: {
        race: raceModule
      }
    })

    const wrapper = mount(App, {
      global: {
        plugins: [store],
        stubs: {
          RouterView: true
        }
      }
    })
    
    expect(wrapper.exists()).toBe(true)
  })
})
