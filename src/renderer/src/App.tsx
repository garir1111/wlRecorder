import Box from '@mui/material/Box'
import CountDownButton from './components/CountDownButton'
import CountUpButton from './components/CountUpButton'
import CountDisplay from './components/CountDisplay'
import CountResetButton from './components/CountResetButton'
import TieDisplaySwitch from './components/TieDisplaySwitch'
import { useAtom } from 'jotai'
import { displayTieAtom } from './atom'

function App(): JSX.Element {
  // displayTieAtom のアトムから showTie の状態を取得
  const [showTie] = useAtom(displayTieAtom)

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <TieDisplaySwitch />
      <Box display="flex" flexDirection="row" justifyContent="center">
        <Box textAlign="center" border={1} p={2} m={1} width={150} sx={{ borderRadius: 8 }}>
          <CountUpButton result="w" />
          <div className="text">Win</div>
          <CountDownButton result="w" />
        </Box>
        {showTie && (
          <Box textAlign="center" border={1} p={2} m={1} width={150} sx={{ borderRadius: 8 }}>
            <CountUpButton result="t" />
            <div className="text">Tie</div>
            <CountDownButton result="t" />
          </Box>
        )}
        <Box textAlign="center" border={1} p={2} m={1} width={150} sx={{ borderRadius: 8 }}>
          <CountUpButton result="l" />
          <div className="text">Lose</div>
          <CountDownButton result="l" />
        </Box>
      </Box>

      <CountDisplay />
      <CountResetButton />
    </Box>
  )
}

export default App
