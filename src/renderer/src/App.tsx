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

  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

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

      {/* <div className="actions">
        <div className="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            ドキュメント
          </a>
        </div>
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
            IPC を送信する
          </a>
        </div>
      </div> */}
    </Box>
  )
}

export default App
