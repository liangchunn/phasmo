import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import {
  Box,
  ChakraProvider,
  Container,
  Divider,
  Grid,
  Link,
  Text,
} from '@chakra-ui/react'
import './index.css'
import App from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <StrictMode>
    <ChakraProvider>
      <Box textAlign="center" size="xl" marginTop={4}>
        <Container>
          <Box minHeight="100vh">
            <App />
          </Box>
          <Grid marginTop={4} marginBottom={4} gap={2}>
            <Divider />
            <Text size="sm">
              Phasmophobia Ghost Identifier is Copyright ©{' '}
              {new Date().getFullYear()} Liang Chun Wong (
              <Link href="https://github.com/liangchunn" target="_blank">
                @liangchunn
              </Link>
              ).{' '}
              <Link href="https://github.com/liangchunn/phasmo" target="_blank">
                View Source in GitHub
              </Link>
              . Not affiliated with, or endorsed by Kinetic Games.
            </Text>
          </Grid>
        </Container>
      </Box>
    </ChakraProvider>
  </StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
