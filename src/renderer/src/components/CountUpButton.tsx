import Button from '@mui/material/Button'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { countWinAtom, countLoseAtom, countTieAtom } from '../atom'

const CountUpButton = (result: { result: 'w' | 't' | 'l' }): JSX.Element => {
  const [countWin, setCountWin] = useAtom(countWinAtom)
  const [countTie, setCountTie] = useAtom(countTieAtom)
  const [countLose, setCountLose] = useAtom(countLoseAtom)

  const sendMain = (str: 'w' | 't' | 'l'): void => {
    window.electron.ipcRenderer.send('upCount', str)
  }

  useEffect(() => {
    window.electron.ipcRenderer.send('rewriteFile', countWin, countTie, countLose)
  }, [countWin, countTie, countLose])

  const handleClick = (): void => {
    switch (result.result) {
      case 'w':
        setCountWin((prevCount: number) => prevCount + 1)
        break
      case 't':
        setCountTie((prevCount: number) => prevCount + 1)
        break
      case 'l':
        setCountLose((prevCount: number) => prevCount + 1)
        break
      default:
        break
    }
    sendMain(result.result)
  }

  return (
    <Button sx={{ fontSize: '2.5rem', color: 'dodgerblue' }} onClick={handleClick}>
      +
    </Button>
  )
}

export default CountUpButton
