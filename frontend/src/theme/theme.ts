import { createMuiTheme, ThemeOptions } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

const theme: ThemeOptions = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
});

export default theme;
