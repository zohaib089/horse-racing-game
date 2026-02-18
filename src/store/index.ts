import { createStore } from 'vuex'
import { raceModule } from './race/race.module'

export interface RootState {
    // Define any global state properties here if needed
}

export const store = createStore<RootState>({   
    modules:{
        race: raceModule
    }
})
