import Vuex from 'vuex'
import Vue from 'vue'
import { IAppState } from '@/store/modules/app'

Vue.use(Vuex)

export interface IRootState {
  app: IAppState
}

export default new Vuex.Store<IRootState>({})
