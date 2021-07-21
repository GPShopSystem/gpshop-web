import {useEffect, useState} from 'react'

type Subscriber = () => void

const subscribers = new Set<Subscriber>()

interface ResponsiveConfig {
  [key: string]: number
}
interface ResponsiveInfo {
  [key: string]: boolean
}

let responsiveConfig: ResponsiveConfig = {
  'xs': 320,
  'sm': 480,
  'md': 768,
  'lg': 1200,
  'xl': 1360,
}

export function configResponsive(config: ResponsiveConfig) {
  responsiveConfig = config
  calculate()
}

let info: ResponsiveInfo = {}

function calculate() {
  const width = window.innerWidth
  const newInfo = {} as ResponsiveInfo
  let shouldUpdate = false
  for (const key of Object.keys(responsiveConfig)) {
    newInfo[key] = width <= responsiveConfig[key]
    if (newInfo[key] !== info[key]) {
      shouldUpdate = true
    }
  }
  if (shouldUpdate) {
    info = newInfo
  }
}

if(typeof window !== 'undefined') {
  calculate()
  window.addEventListener('resize', () => {
    const oldInfo = info
    calculate()
    if (oldInfo === info) return
    for (const subscriber of subscribers) {
      subscriber()
    }
  })
}

export default function useResponsive() {
  const [state, setState] = useState<ResponsiveInfo>(info)

  useEffect(() => {
    const subscriber = () => {
      setState(info)
    }
    subscribers.add(subscriber)
    return () => {
      subscribers.delete(subscriber)
    }
  }, [])

  return state
}