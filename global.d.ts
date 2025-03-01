/* eslint-disable no-var */
import { Store } from '@reduxjs/toolkit'

import { RootState } from './src/store'

declare global {
  var store: Store<RootState>
}

export {}
