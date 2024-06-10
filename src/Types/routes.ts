import { IGrupo } from "./group";

export type RoutesNavigationType = {
    Splash: undefined;
    Tabs: undefined;
    Login: undefined;
    RecoverPassword: undefined;
    SignUp: undefined;
    RegistrationGroup: undefined;
    EditGroup: { params: IGrupo };
}

export type BottomTabParamList = {
    Home: undefined;
    RegistrationGroup: undefined;
};