import { createMuiTheme, ThemeOptions } from "@material-ui/core/styles";
import cyan from "@material-ui/core/colors/cyan";
import lime from "@material-ui/core/colors/lime";

const theme: ThemeOptions = createMuiTheme({
  palette: {
    type: "dark",
    primary: cyan,
    secondary: lime,
  },
});

export default theme;
