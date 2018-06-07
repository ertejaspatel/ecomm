import reazy from "reazy";
import mobx from "./src/services/mobx";
import reactNative from "./src/services/react-native";
import routerActions from "reazy-native-router-actions";

const app = reazy();

app.use(mobx(), "state");
app.use(routerActions(), "routerActions");
app.use(reactNative(), "reactNative");
export default app.get("reactNative");
