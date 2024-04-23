import * as React from 'react'
import './app.scss'
import { EventsBlock } from './components/EventsBlock'
import { useRef } from 'react'
import { eventsData } from './assets/eventsData'
import { eventsProp } from './components/Types'
import CircleWithDots from './components/circle/CircleWithDots'
import { ActivePageProvider } from './components/context/context'

const App: React.FC = () => {
  return (
    <ActivePageProvider>
      <div>
        <EventsBlock data={eventsData} />
      </div>
    </ActivePageProvider>
  )
}

export default App
