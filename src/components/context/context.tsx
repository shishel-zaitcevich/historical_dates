import { animateDotEnter } from '../utils/dotAnimation'
import * as React from 'react'
import { ReactNode, createContext, useContext, useState } from 'react'

interface ActivePageContextType {
  activePage: number
  setActivePage: React.Dispatch<React.SetStateAction<number>>
}

export const ActivePageContext = createContext<
  ActivePageContextType | undefined
>(undefined)

export const useActivePage = () => {
  const context = useContext(ActivePageContext)
  if (!context) {
    throw new Error('useActivePage must be used within an ActivePageProvider')
  }
  return context
}

export const ActivePageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activePage, setActivePage] = useState<number>(0)

  return (
    <ActivePageContext.Provider value={{ activePage, setActivePage }}>
      {children}
    </ActivePageContext.Provider>
  )
}
