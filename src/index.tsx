import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {
  Box,
  Container,
  Text,
  ChakraProvider,
  Link,
  Divider,
  Grid,
} from '@chakra-ui/react'

ReactDOM.render(
  <StrictMode>
    <ChakraProvider>
      <Box textAlign="center" size="xl" marginTop={4}>
        <Container>
          <Box minHeight="100vh">
            <App />
          </Box>
          <Grid marginBottom={4} gap={2}>
            <Divider />
            <Text>
              Copyright © {new Date().getFullYear()} Liang Chun Wong (
              <Link href="https://github.com/liangchunn" target="_blank">
                @liangchunn
              </Link>
              ). Not affiliated with, or endorsed by Kinetic Games.
            </Text>
          </Grid>
        </Container>
      </Box>
    </ChakraProvider>
  </StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
