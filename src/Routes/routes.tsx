import React from 'react';
import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../Screens/Home";
import { Login } from "../Screens/Login";
import { RecoverPassword } from "../Screens/RecoverPassword";
import { SignUp } from '../Screens/SignUp';
import { RegistrationGroup } from '../Screens/RegistrationGroup';
import { EditGroup } from '../Screens/EditGroup/EditGroup';
import { Footer } from "../Components/Footer";
import { useAuth, AuthProvider } from '../contexto/auth';
import { RoutesNavigationType } from '../Types/routes';
import { HomeButton } from '../Components/HomeButton';


const routes = createNativeStackNavigator();
const tab = createBottomTabNavigator();


export type routesType = NativeStackNavigationProp<RoutesNavigationType>

// function TabNavigator() {
//     return (
//         <tab.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }} tabBar={Footer}>
//             <tab.Screen name="Home" component={Home} />
//             <tab.Screen name="RegistrationGroup" component={RegistrationGroup} />
//         </tab.Navigator>
//     )
// }

// function AuthenticatedRoutes() {
//     return (
//         <routes.Navigator screenOptions={{ headerShown: false }}>
//             {/* <routes.Screen name="Tabs" component={TabNavigator} /> */}
//         </routes.Navigator>
//     )
// }

function GuestRoutes() {
    return (
        <routes.Navigator screenOptions={{ headerShown: true }}>
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
            <routes.Screen 
                name="Home" 
                component={Home} 
                options={{
                    headerRight: () => <HomeButton />,
                    headerTitle: 'Home'
                }}
            />
            <routes.Screen 
                name="RegistrationGroup" 
                component={RegistrationGroup} 
                options={{ headerTitle: 'Registration Group' }} 
            />
            <routes.Screen 
                name="EditGroup" 
                component={EditGroup} 
                options={{ headerTitle: 'Edit Group' }} 
            />
        </routes.Navigator>
    )
}

export function Routes() {
    const { user } = useAuth();

    return (
        <AuthProvider>
            {/* {user ? <AuthenticatedRoutes /> : <GuestRoutes />} */}
            <GuestRoutes />
        </AuthProvider>
    )
}
