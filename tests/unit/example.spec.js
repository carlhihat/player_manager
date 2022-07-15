import { shallowMount } from '@vue/test-utils'
import Player from '@/components/Player.vue'
const props = {
  player_info:{
    name:"Benny"
  }
}
describe('Player.vue', () => {
  it('renders player name passed as prop', () => {

    const wrapper = shallowMount(Player, {
      propsData: props
    })
    expect(wrapper.text()).toContain(props.player_info.name)
  })

  it('shows input only when editing', async () => {


    const wrapper = shallowMount(Player, {
      propsData: props
    })
    expect(wrapper.find("input").isVisible()).toBe(false)

    await wrapper.setData({ edit_mode: true })

    expect(wrapper.find("input").isVisible()).toBe(true)


  })
})


