import { gsap, Power2 } from 'gsap'
import { calculateMinAngle } from './calculateAngleBetweenDots'
import { eventsProp } from '../Types'
import { getOpenStyles } from './getDotStyles'

import { animateDotShowTitle } from './dotAnimation'

export const rotateDotsAroundCenter = (
  data: eventsProp[],
  circleContainer: HTMLDivElement | null,
  openIndex: number | null,
  handleDotClick: (index: number) => void,
  dotRefs: React.MutableRefObject<HTMLDivElement | null>[],
) => {
  const lastElementIndex = data.length - 1
  if (!circleContainer) {
    console.error('Контейнер круга не найден или не смонтирован')
    return
  }

  const currentElement = openIndex
  const angleToLastDot = calculateMinAngle(
    currentElement,
    lastElementIndex,
    data,
  )
  console.log('${angleToLastDot}', angleToLastDot)

  gsap.to(circleContainer, {
    rotation: `${angleToLastDot}`,
    duration: 2,
    ease: Power2.easeInOut,

    onUpdate: () => {
      if (openIndex == currentElement) {
        applyStylesToElement(
          dotRefs[currentElement],
          getOpenStyles(currentElement, openIndex, lastElementIndex, data),
        )
      }
    },
    onComplete: () => {
      gsap.set(circleContainer, { rotation: angleToLastDot })
      handleDotClick(openIndex)
      animateDotShowTitle(openIndex)
    },
  })
}

export function applyStylesToElement(
  elementRef: React.MutableRefObject<HTMLDivElement | null>,
  styles: React.CSSProperties,
) {
  if (elementRef.current) {
    const numberElement = elementRef.current.querySelector(
      '.number',
    ) as HTMLDivElement
    const dotElement = elementRef.current.querySelector(
      '.dot',
    ) as HTMLDivElement
    if (numberElement && dotElement) {
      Object.assign(numberElement.style, dotElement.style, styles)
    }
  }
}
