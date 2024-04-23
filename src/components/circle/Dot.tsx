// Dot.tsx
import * as React from 'react'
import { forwardRef } from 'react'

// Компонент точки на окружности
const Dot = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    // Рендерим точку
    <div
      ref={ref}
      style={{
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: 'red',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
      }}
    ></div>
  )
})

export default Dot
