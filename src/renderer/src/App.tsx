import Box from '@mui/material/Box'
import CountDownButton from './components/CountDownButton'
import CountUpButton from './components/CountUpButton'
import CountResetButton from './components/CountResetButton'
import TieDisplaySwitch from './components/TieDisplaySwitch'
import { useAtom } from 'jotai'
import { displayTieAtom, countWinAtom, countTieAtom, countLoseAtom } from './atom'

function App(): JSX.Element {
  // displayTieAtom のアトムから showTie の状態を取得
  const [showTie] = useAtom(displayTieAtom)
  const [countWin] = useAtom(countWinAtom)
  const [countLose] = useAtom(countLoseAtom)
  const [countTie] = useAtom(countTieAtom)

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <CountResetButton />
      <TieDisplaySwitch />
      <Box display="flex" flexDirection="row" justifyContent="center">
        <Box textAlign="center" border={1} p={2} m={1} width={150} sx={{ borderRadius: 8 }}>
          <CountUpButton result="w" />
          <div className="text">Win: {countWin}</div>
          <CountDownButton result="w" />
        </Box>
        {showTie && (
          <Box textAlign="center" border={1} p={2} m={1} width={150} sx={{ borderRadius: 8 }}>
            <CountUpButton result="t" />
            <div className="text">Tie: {countTie}</div>
            <CountDownButton result="t" />
          </Box>
        )}
        <Box textAlign="center" border={1} p={2} m={1} width={150} sx={{ borderRadius: 8 }}>
          <CountUpButton result="l" />
          <div className="text">Lose: {countLose}</div>
          <CountDownButton result="l" />
        </Box>
      </Box>
    </Box>
  )
}

export default App
