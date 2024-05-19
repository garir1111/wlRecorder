import Button from '@mui/material/Button'
import { useAtom } from 'jotai'
import { countWinAtom, countLoseAtom, countTieAtom } from '../atom'

const sendMain = (str: 'w' | 'l' | 't'): void => {
  window.electron.ipcRenderer.send('downCount', str)
}

const CountDownButton = (result: { result: 'w' | 'l' | 't' }): JSX.Element => {
  const [_countWin, setCountWin] = useAtom(countWinAtom) // eslint-disable-line @typescript-eslint/no-unused-vars
  const [_countLose, setCountLose] = useAtom(countLoseAtom) // eslint-disable-line @typescript-eslint/no-unused-vars
  const [_countTie, setCountTie] = useAtom(countTieAtom) // eslint-disable-line @typescript-eslint/no-unused-vars

  const label = '-'

  const handleClick = (): void => {
    let shouldSendMain = false

    switch (result.result) {
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
      sendMain(result.result)
    }
  }

  return (
    <Button sx={{ fontSize: '2.5rem', color: 'tomato' }} onClick={handleClick}>
      {label}
    </Button>
  )
}

export default CountDownButton
