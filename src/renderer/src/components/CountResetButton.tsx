import Button from '@mui/material/Button'
import { useAtom } from 'jotai'
import { countWinAtom, countLoseAtom, countTieAtom } from '../atom'

import React from 'react'

const CountResetButton: React.FC = () => {
  const [_countWin, resetWinCount] = useAtom(countWinAtom) // eslint-disable-line @typescript-eslint/no-unused-vars
  const [_countLose, resetLoseCount] = useAtom(countLoseAtom) // eslint-disable-line @typescript-eslint/no-unused-vars
  const [_countTie, resetTieCount] = useAtom(countTieAtom) // eslint-disable-line @typescript-eslint/no-unused-vars

  const handleClick = (): void => {
    resetWinCount(0)
    resetLoseCount(0)
    resetTieCount(0)
  }

  return <Button onClick={handleClick}>Reset All</Button>
}

export default CountResetButton
