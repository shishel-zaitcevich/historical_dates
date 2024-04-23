import * as React from 'react'
import { eventsProp } from '../../components/Types'
import '../../assets/styles/intervalStyles.scss'
import { Dot } from '../../components/circle/Dot2'
import { useContext, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ActivePageContext } from '../context/context'
import IntervalAnimation from './IntervalAnimation'
import { eventsData } from '../../assets/eventsData'

interface IntervalProp {
  data: eventsProp[]
  forwardedRef: React.Ref<HTMLDivElement>
  onPageClick: (index: number) => void
  dotRefs: Array<React.MutableRefObject<HTMLDivElement | null>>

  setCircleContainerRef: (ref: React.RefObject<HTMLDivElement>) => void
}

export const Interval: React.FC<IntervalProp> = ({
  data,
  setCircleContainerRef,
  onPageClick,
  dotRefs,
}) => {
  const { activePage, setActivePage } = useContext(ActivePageContext)

  const handlePageChange = (index: number) => {
    setActivePage(index)
  }

  return (
    <div className="interval_container">
      <Dot
        data={data}
        setCircleContainerRef={setCircleContainerRef}
        onPageClick={handlePageChange}
        forwardedRef={undefined}
        dotRefs={dotRefs}
      />
      <IntervalAnimation eventsData={eventsData} />
    </div>
  )
}
