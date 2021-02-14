import React from 'react';
import { wrapper, circle } from './RingSpinner.module.css'

export function RingSpinner() {
  return <div className={wrapper}><div className={circle}></div></div>
}
