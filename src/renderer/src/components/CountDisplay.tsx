import React from 'react'
import { useAtom } from 'jotai'
import { countWinAtom, countLoseAtom, countTieAtom, displayTieAtom } from '../atom'

const CountDisplay: React.FC = () => {
  const [countWin] = useAtom(countWinAtom)
  const [countLose] = useAtom(countLoseAtom)
  const [countTie] = useAtom(countTieAtom)
  const [displayTie] = useAtom(displayTieAtom)

  const str = displayTie
    ? `Win: ${countWin}, Tie: ${countTie}, Lose: ${countLose}`
    : `Win: ${countWin}, Lose: ${countLose}`

  return (
    <div>
      <p style={{ fontSize: '20px' }}>{str}</p>
    </div>
  )
}

export default CountDisplay
