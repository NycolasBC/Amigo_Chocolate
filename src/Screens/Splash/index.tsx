import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { routesType } from "../../Routes/routes";

export function Splash() {
    const navigation = useNavigation<routesType>();

    return (
        <LottieView
            source={require("../../assets/splash.json")}
            style={{ width: "100%", height: "100%" }}
            autoPlay
            loop={false}
            speed={1.5}
            onAnimationFinish={() => navigation.navigate("Tabs")}
        />
    )
}