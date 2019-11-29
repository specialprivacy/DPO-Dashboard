import {cyan500, grey300, white, darkBlack, fullBlack} from "material-ui/styles/colors";
import {fade} from "material-ui/utils/colorManipulator";
import spacing from "material-ui/styles/spacing";

export default {
  background: "#2a2a2a",
  spacing: spacing,
  apiKey: "acadd8ae-1f8e-4148-9bb5-fe0d821e2a03",
  fontFamily: "'Maven Pro', sans serif",
  borderRadius: 2,
  palette: {
    primary1Color: "#0846a8",
    accent1Color: "#2a2a2a",
    textColor: darkBlack,
    secondaryTextColor: fade(darkBlack, 0.54),
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
};