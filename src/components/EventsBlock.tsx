import * as React from 'react'
import { useRef } from 'react'
import { eventsProp } from './Types'
import Slider from './events/slider/Slider'
import PaginationComponent from './utils/PaginationComponent'
import { rotateDotsAroundCenter } from '../components/utils/rotateDotsAroundCenter'
import { animateDotLeave } from './utils/dotAnimation'
import SwiperCore from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'
import '../assets/styles/swiperStyles.scss'
import '../assets/styles/style.scss'
import { Interval } from './intervals/Interval'

import { useActivePage } from './context/context'

SwiperCore.use([Pagination, Navigation])

interface EventsBlokProps {
  data: eventsProp[]
}

export function EventsBlock({ data }: EventsBlokProps, ref) {
  const eventsBlockRef = useRef<HTMLDivElement>(null)
  const circleContainerRef = useRef<HTMLDivElement>(null)
  const dotRefs = useRef<Array<React.MutableRefObject<HTMLDivElement | null>>>(
    Array(data.length)
      .fill(null)
      .map(() => useRef<HTMLDivElement | null>(null)),
  )
  const { activePage, setActivePage } = useActivePage()

  // console.log('eventsBlockRef', eventsBlockRef)

  const setCircleContainerRef = (ref: React.RefObject<HTMLDivElement>) => {
    circleContainerRef.current = ref.current
  }

  const handlePageChange = (index: number) => {
    setActivePage(index)
  }

  const onPageClick = (index: number) => {
    setActivePage(index)
  }

  const handlePrev = () => {
    setActivePage((prevPage) => {
      const currentNumberElement = document.querySelector(
        `#dot-${prevPage - 1} .number`,
      ) as HTMLDivElement

      if (currentNumberElement) {
        currentNumberElement.style.visibility = 'visible'
      }

      rotateDotsAroundCenter(
        data,
        circleContainerRef.current,
        prevPage - 1,
        () => {
          onPageClick(prevPage - 1)
        },
        dotRefs.current,
      )
      if (activePage == prevPage) {
        animateDotLeave(activePage)
      }
      return Math.max(prevPage - 1, 0)
    })
  }

  const handleNext = () => {
    setActivePage((prevPage) => {
      const currentNumberElement = document.querySelector(
        `#dot-${prevPage + 1} .number`,
      ) as HTMLDivElement

      rotateDotsAroundCenter(
        data,
        circleContainerRef.current,
        prevPage + 1,
        () => {
          onPageClick(prevPage + 1)
        },
        dotRefs.current,
      )

      if (activePage !== prevPage + 1) {
        animateDotLeave(activePage)
      }

      return Math.min(prevPage + 1, data.length - 1)
    })
  }

  return (
    <div className="container">
      <div className="block">
        <div className="horizontal_line"></div>
        <div className="vertical_line"></div>
        <div className="color_line"></div>
        <h1 className="title">Исторические даты</h1>
        <Interval
          data={data}
          setCircleContainerRef={setCircleContainerRef}
          onPageClick={handlePageChange}
          forwardedRef={eventsBlockRef}
          dotRefs={dotRefs.current}
        />
        <div className="swiper__wrapper">
          <div className="pagination">
            <PaginationComponent
              totalSlides={data.length}
              activePage={activePage}
              onPageClick={handlePageChange}
              data={data}
            />
            <div className="buttons">
              <button
                onClick={handlePrev}
                className="pagination__button-prev"
                disabled={activePage === 0}
              ></button>
              <button
                onClick={handleNext}
                className="pagination__button-next"
                disabled={activePage === data.length - 1}
              ></button>
            </div>
          </div>

          {data.map((event, index) => (
            <div
              className="slider"
              key={event.id}
              style={{
                display: index === activePage ? 'block' : 'none',
              }}
            >
              {index === activePage && (
                <Slider
                  sliderData={event.details}
                  isMobileScreen={false}
                  activePage={activePage}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}