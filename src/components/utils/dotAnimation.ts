import gsap from 'gsap'

export function animateDotEnter(index: number) {

  const dotSelector = `#dot-${index}`
  const numberSelector = `#dot-${index} .number`
  
  // console.log('numberSelector', numberSelector)

  gsap.to(dotSelector, {
    duration: 0.6,
    width: 56,
    height: 56,
    backgroundColor: 'white',
    border: '1px solid #42567a',
    ease: 'power2.inOut',
  })

  gsap.to(numberSelector, {
    opacity: 1,
    // duration: 0.6,
    // ease: 'power2.inOut',
  })

}

export function animateDotShowTitle(index: number) {
  const labelSelector = `#dot-${index} .label`
  // console.log('labelSelector', labelSelector)
  gsap.to(`${labelSelector}`, {
    opacity: 1,
    duration: 0.1,
    ease: 'power2.inOut',
    // delay: 0.001,
  })
}

export function animateDotLeave(index: number) {
  const dotSelector = `#dot-${index}`
  const numberAndTitleSelector = `${dotSelector} .number, ${dotSelector} .title`

  const initialStyles = {
    width: 6,
    height: 6,
    backgroundColor: '#42567a',
    border: 'none',
  }

  gsap.to(dotSelector, {
    duration: 0.5,
    ...initialStyles,
    ease: 'power2.inOut',
    onComplete: () => {
      gsap.to(numberAndTitleSelector, {
        opacity: 0,
        x: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      })

      gsap.to(dotSelector, {
        duration: 0.5,
        ...initialStyles,
        ease: 'power2.inOut',
      })
    },
  })
}
