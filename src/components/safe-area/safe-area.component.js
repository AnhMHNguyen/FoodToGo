import { StatusBar, SafeAreaView } from "react-native";
import { COLORS } from "../../theme";


const SafeArea = ({ children }) => (
  <SafeAreaView
    style={{
      flex: 1,
      marginTop: StatusBar.currentHeight && StatusBar.currentHeight,
      backgroundColor: COLORS.lightGray
    }}
  >
    { children }
  </SafeAreaView>
);

export default SafeArea;