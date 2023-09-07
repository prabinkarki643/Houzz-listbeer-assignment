import React from 'react'

interface TabPanelProps {
    name: string
  currentName: string
  children: JSX.Element
}

export default function TabPanel({name, currentName, children}: TabPanelProps) {
  return (
    <div style={{ display: name === currentName ? 'block' : 'none' }}>
    {children}
  </div>
  )
}