import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './store/store'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
