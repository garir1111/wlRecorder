import Button from '@mui/material/Button'
import { useAtom } from 'jotai'
import { countWinAtom, countLoseAtom, countTieAtom } from '../atom'

const sendMain = (str: 'w' | 'l' | 't'): void => {
  window.electron.ipcRenderer.send('upCount', str)
}

const CountUpButton = (result: { result: 'w' | 'l' | 't' }): JSX.Element => {
  const [_countWin, setCountWin] = useAtom(countWinAtom) // eslint-disable-line @typescript-eslint/no-unused-vars
  const [_countLose, setCountLose] = useAtom(countLoseAtom) // eslint-disable-line @typescript-eslint/no-unused-vars
  const [_countTie, setCountTie] = useAtom(countTieAtom) // eslint-disable-line @typescript-eslint/no-unused-vars

  const label = '+'

  const handleClick = (): void => {
    switch (result.result) {
      case 'w':
        setCountWin((prevCount: number) => prevCount + 1)
        break
      case 'l':
        setCountLose((prevCount: number) => prevCount + 1)
        break
      case 't':
        setCountTie((prevCount: number) => prevCount + 1)
        break
      default:
        break
    }
    sendMain(result.result)
  }

  return (
    <Button sx={{ fontSize: '2.5rem', color: 'dodgerblue' }} onClick={handleClick}>
      {label}
    </Button>
  )
}

export default CountUpButton
