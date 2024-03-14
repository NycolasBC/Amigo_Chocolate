import { NavigationContainer } from "@react-navigation/native";
import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../Screens/Home";
import { Login } from "../Screens/Login";
import { RecoverPassword } from "../Screens/RecoverPassword";
import { Footer } from "../Components/Footer";

const routes = createNativeStackNavigator();
const tab = createBottomTabNavigator();

type RoutesNavigationType = {
    Home: undefined;
    Login: undefined;
    RecoverPassword: undefined;
}

export type routesType = NativeStackNavigationProp<RoutesNavigationType>


export function TabNavigator() {
    return (
        <tab.Navigator screenOptions={{ headerShown: false }} tabBar={Footer}>
            <tab.Screen name="Login" component={Login} />
            <tab.Screen name="Home" component={Home} />
            <tab.Screen name="RecoverPassword" component={RecoverPassword} />
        </tab.Navigator>
    )
}

export function Routes() {
    return (
        <NavigationContainer>
            <routes.Navigator screenOptions={{ headerShown: false }}>
                <routes.Screen name="Tabs" component={TabNavigator} />
            </routes.Navigator>
        </NavigationContainer>
    )
}