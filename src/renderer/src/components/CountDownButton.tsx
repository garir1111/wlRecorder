import Button from '@mui/material/Button'
import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { countWinAtom, countLoseAtom, countTieAtom } from '../atom'

const CountDownButton = ({ result }: { result: 'w' | 't' | 'l' }): JSX.Element => {
  const [countWin, setCountWin] = useAtom(countWinAtom)
  const [countTie, setCountTie] = useAtom(countTieAtom)
  const [countLose, setCountLose] = useAtom(countLoseAtom)

  useEffect(() => {
    window.electron.ipcRenderer.send('rewriteFile', countWin, countTie, countLose)
  }, [countWin, countTie, countLose])

  const sendMain = (str: 'w' | 't' | 'l'): void => {
    window.electron.ipcRenderer.send('downCount', str)
  }

  const label = '-'

  const handleClick = (): void => {
    let shouldSendMain = false

    switch (result) {
      case 'w':
        setCountWin((prevCount: number) => {
          if (prevCount > 0) {
            shouldSendMain = true
            return prevCount - 1
          }
          return prevCount
        })
        break
      case 'l':
        setCountLose((prevCount: number) => {
          if (prevCount > 0) {
            shouldSendMain = true
            return prevCount - 1
          }
          return prevCount
        })
        break
      case 't':
        setCountTie((prevCount: number) => {
          if (prevCount > 0) {
            shouldSendMain = true
            return prevCount - 1
          }
          return prevCount
        })
        break
      default:
        break
    }

    if (shouldSendMain) {
      sendMain(result)
    }
  }

  return (
    <Button sx={{ fontSize: '2.5rem', color: 'tomato' }} onClick={handleClick}>
      {label}
    </Button>
  )
}

export default CountDownButton
