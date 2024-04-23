import * as React from 'react'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { DotsPositionCalculate } from '../utils/dotsPositionCalculate'
import Dot from './Dot'
import gsap from 'gsap'
import { eventsData } from '../../assets/eventsData'

const CircleWithDots: React.FC = () => {
  const circleRef = useRef<HTMLDivElement>(null)
  const dots = useSelector((state: RootState) => state.dots) // Получаем точки из хранилища
  const numDots = eventsData.length // Количество точек равно количеству элементов в массиве данных
  const circleRadius = 200 // Задаем радиус окружности

  useEffect(() => {
    if (circleRef.current) {
      // Получаем ссылку на DOM-элемент окружности
      const circle = circleRef.current
      // Получаем размеры и координаты окружности
      const circleRect = circle.getBoundingClientRect()
      const center = {
        x: circleRect.left + circleRect.width / 2,
        y: circleRect.top + circleRect.height / 2,
      }

      // Создаем анимацию вращения точек с использованием GSAP
      const tl = gsap.timeline({ repeat: -1, ease: 'none' })

      dots.forEach((dot, index) => {
        // Вычисляем угол для текущей точки
        const angle = (360 / numDots) * index
        const radianAngle = (angle * Math.PI) / 180
        const x = center.x + Math.cos(radianAngle) * circleRadius
        const y = center.y + Math.sin(radianAngle) * circleRadius

        // Добавляем анимацию движения точек
        tl.to(dot.ref.current, { duration: 2, x, y }, 'start')
      })

      tl.play() // Запускаем анимацию
    }
  }, [dots, numDots, circleRadius])

  return (
    // Рендерим окружность и точки на ней
    <div
      ref={circleRef}
      style={{
        width: '500px',
        height: '500px',
        border: '1px solid black',
        position: 'relative',
      }}
    >
      {eventsData.map((event, index) => (
        <Dot key={event.id} ref={dots[index].ref} />
      ))}
    </div>
  )
}

export default CircleWithDots
