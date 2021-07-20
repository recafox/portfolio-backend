import Container from "../Common/Container";
import Routes from "./Routes";
import { ThemeProvider } from "styled-components";
import theme from "../../Theme";
import Alert from "../Common/Alert";
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Alert></Alert>
        <Routes></Routes>
      </Container>
    </ThemeProvider>
  );
};

export default App;
