import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useActivePage } from '../context/context'
import { eventsProp } from '../Types'

interface IntervalAnimationProps {
  eventsData: eventsProp[]
}

const IntervalAnimation: React.FC<IntervalAnimationProps> = ({
  eventsData,
}) => {
  const { activePage } = useActivePage()
  const [currentYearIndex, setCurrentYearIndex] = useState(0)
  const [yearsToAnimate, setYearsToAnimate] = useState<number[]>([])
  const [prevYearsToAnimate, setPrevYearsToAnimate] = useState<number[]>([])
  const [showAnimatedStart, setShowAnimatedStart] = useState(true)
  const [prevActivePage, setPrevActivePage] = useState<number | null>(null)

  useEffect(() => {
    if (activePage !== null && activePage !== prevActivePage) {
      const currentEvent = eventsData[activePage]
      const currentYears = currentEvent.details.map((detail) => detail.year)
      setYearsToAnimate(currentYears)
      setCurrentYearIndex(0)

      if (
        (prevActivePage !== null && activePage < prevActivePage) ||
        (prevActivePage !== null && activePage > prevActivePage)
      ) {
        setShowAnimatedStart(true)
      }
    }
  }, [activePage, prevActivePage, eventsData])

  useEffect(() => {
    if (yearsToAnimate.length > 0) {
      const animation = gsap.timeline({ repeat: -1, repeatDelay: 0.1 }).to(
        {},

        {
          duration: 0.1,
          ease: 'power2.inOut',
          onComplete: () => {
            setCurrentYearIndex((prevIndex) => {
              if (prevIndex === yearsToAnimate.length - 1) {
                setPrevActivePage(activePage)
                setPrevYearsToAnimate(yearsToAnimate)
                animation.kill()
                setShowAnimatedStart(false)
              }
              return prevIndex + 1
            })
          },
        },
      )
      return () => {
        animation.kill()
      }
    }
  }, [yearsToAnimate])
  // console.log('activePage1:', activePage)
  // console.log('prevActiveP1:', prevActivePage)
  // console.log('prevYearsToAnimate:', prevYearsToAnimate)
  // console.log('yearsToAnimate:', yearsToAnimate)

  return (
    <div
      key={activePage}
      className={`intervals ${activePage === prevActivePage ? 'active' : ''}`}
    >
      <span className="interval_start">
        {showAnimatedStart && activePage > prevActivePage
          ? currentYearIndex < prevYearsToAnimate.length
            ? prevYearsToAnimate[currentYearIndex]
            : yearsToAnimate[0]
          : currentYearIndex < yearsToAnimate.length
            ? yearsToAnimate[yearsToAnimate.length - 1 - currentYearIndex]
            : yearsToAnimate[0]}
      </span>
      <span className="interval_last">
        {showAnimatedStart && activePage > prevActivePage
          ? currentYearIndex < yearsToAnimate.length
            ? yearsToAnimate[currentYearIndex]
            : yearsToAnimate[yearsToAnimate.length - 1]
          : currentYearIndex < prevYearsToAnimate.length
            ? prevYearsToAnimate[
                prevYearsToAnimate.length - 1 - currentYearIndex
              ]
            : prevYearsToAnimate[prevYearsToAnimate.length - 1]}
      </span>
    </div>
  )
}

export default IntervalAnimation
