import React from 'react';
import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../Screens/Home";
import { Login } from "../Screens/Login";
import { RecoverPassword } from "../Screens/RecoverPassword";
import { SignUp } from '../Screens/SignUp';
import { RegistrationGroup } from '../Screens/RegistrationGroup';
import { EditGroup } from '../Screens/EditGroup/EditGroup';
import { useAuth, AuthProvider } from '../contexto/auth';
import { BottomTabParamList, RoutesNavigationType } from '../Types/routes';
import { HomeButton } from '../Components/HomeButton';
import { Feather, AntDesign } from '@expo/vector-icons';
import { Splash } from '../Screens/Splash';


const routes = createNativeStackNavigator();
const tab = createBottomTabNavigator();


export type routesType = NativeStackNavigationProp<RoutesNavigationType>
export type routesTabType = NativeStackNavigationProp<BottomTabParamList>

function TabNavigator() {
    return (
        <tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#000000',
                    height: 100
                },
                tabBarActiveTintColor: '#1D90F5',
                tabBarLabelStyle: {
                    fontSize: 16
                }
            }}>
            <tab.Screen
                name="Home"
                component={Home}
                options={{
                    headerRight: () => <HomeButton />,
                    tabBarLabel: "Home",
                    tabBarIcon: () => {
                        return (
                            <Feather name="home" size={30} color="white" />
                        );
                    },
                }}
            />
            <tab.Screen
                name="RegistrationGroup"
                component={RegistrationGroup}
                options={{
                    tabBarLabel: 'Cadastrar Grupo',
                    tabBarIcon: () => {
                        return (
                            <AntDesign name="addusergroup" size={30} color="white" />
                        );
                    },
                }}
            />
        </tab.Navigator>
    )
}

function AuthenticatedRoutes() {
    return (
        <routes.Navigator screenOptions={{ headerShown: false }}>
            <routes.Screen
                name="Splash"
                component={Splash}
                options={{ headerShown: false }}
            />
            <routes.Screen
                name="Tabs"
                component={TabNavigator}
            />
            <routes.Screen
                name="EditGroup"
                component={EditGroup}
            />
        </routes.Navigator>
    )
}

function GuestRoutes() {
    return (
        <routes.Navigator initialRouteName='Login' screenOptions={{ headerShown: true }}>
            <routes.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
            <routes.Screen
                name="RecoverPassword"
                component={RecoverPassword}
                options={{ headerShown: false }}
            />
            <routes.Screen
                name="SignUp"
                component={SignUp}
                options={{ headerShown: false }}
            />
        </routes.Navigator>
    )
}

function AuthRoutes() {
    const { signed } = useAuth();

    const routes = signed ? <AuthenticatedRoutes /> : <GuestRoutes />

    return routes
}

export function Routes() {
    return (
        <AuthProvider>
            <AuthRoutes />
        </AuthProvider>
    )
}
