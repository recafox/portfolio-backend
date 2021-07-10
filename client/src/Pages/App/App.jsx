import Container from "../Common/Container";
import Routes from "./Routes";
import { ThemeProvider } from "styled-components";
import theme from "../../Theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Routes></Routes>
      </Container>
    </ThemeProvider>
  );
};

export default App;
