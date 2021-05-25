import React, { useState, useRef, useEffect } from 'react'
import ResizeObserver from 'resize-observer-polyfill'
import { useSelector } from 'react-redux'

export function usePrevious(value) {
  const ref = useRef()
  useEffect(() => void (ref.current = value), [value])
  return ref.current
}

export function useMeasure() {
  const ref = useRef()
  const [bounds, set] = useState({ left: 0, top: 0, width: 0, height: 0 })
  const [ro] = useState(() => new ResizeObserver(([entry]) => set(entry.contentRect)))
  useEffect(() => {
    if (ref.current) ro.observe(ref.current)
    return () => ro.disconnect()
  }, [])
  return [{ ref }, bounds]
}

export const useTotalCartPrice = () => {
  const [total, setTotal] = useState(0)
  const selectCart = useSelector((e) => e.cart.list)

  useEffect(() => {
    const sum = selectCart.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0)
    setTotal(sum)
  }, [selectCart])

  return total
}

export const userCanOrder = () => {
  const totalPrice = useTotalCartPrice()
  return totalPrice >= 1000
}

export const createDataTree = dataset => {
  let hashTable = Object.create(null)
  dataset.forEach( aData => hashTable[aData.id] = { ...aData, children : [] } )
  let dataTree = []
  dataset.forEach( aData => {
    if( aData.parent_id ) hashTable[aData.parent_id].children.push(hashTable[aData.id])
    else dataTree.push(hashTable[aData.id])
  } )
  return dataTree
};