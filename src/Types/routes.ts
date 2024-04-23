import { IGrupo } from "./group";

export type RoutesNavigationType = {
    Home: undefined;
    Login: undefined;
    RecoverPassword: undefined;
    SignUp: undefined;
    RegistrationGroup: undefined;
    EditGroup: { params: IGrupo };
}