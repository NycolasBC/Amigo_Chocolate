import React from 'react';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../Screens/Home";
import { Login } from "../Screens/Login";
import { RecoverPassword } from "../Screens/RecoverPassword";
import { SignUp } from '../Screens/SignUp'
import { Footer } from "../Components/Footer";
import { useAuth, AuthProvider } from '../contexto/auth'; // Importar o contexto de autenticação
import { RegistrationGroup } from '../Screens/RegistrationGroup';

const routes = createNativeStackNavigator();
const tab = createBottomTabNavigator();

type RoutesNavigationType = {
    Home: undefined;
    Login: undefined;
    RecoverPassword: undefined;
    SignUp: undefined;
    RegistrationGroup: undefined;
}

export type routesType = NativeStackNavigationProp<RoutesNavigationType>

function TabNavigator() {
    return (
        <tab.Navigator screenOptions={{ headerShown: false }} tabBar={Footer}>
            <tab.Screen name="Home" component={Home} />   
            <tab.Screen name="RegistrationGroup" component={RegistrationGroup} />         
        </tab.Navigator>
    )
}

function AuthenticatedRoutes() {
    return (
        <routes.Navigator screenOptions={{ headerShown: false }}>
            <routes.Screen name="Tabs" component={TabNavigator} />
        </routes.Navigator>
    )
}

function GuestRoutes() {
    return (
        <routes.Navigator screenOptions={{ headerShown: false }}>
            <routes.Screen name="Login" component={Login} />
            <tab.Screen name="RecoverPassword" component={RecoverPassword} />
            <tab.Screen name="SignUp" component={SignUp} />
        </routes.Navigator>
    )
}

export function Routes() {
    const navigation = useNavigation<routesType>();
    const { user } = useAuth();

    return (
        <AuthProvider navigation={navigation}> 
            {user ? <AuthenticatedRoutes /> : <GuestRoutes />} 
        </AuthProvider>
    )
}
