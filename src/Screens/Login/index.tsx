import { Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { routesType } from "../../Routes/routes";
import { MaterialCommunityIcons, FontAwesome6 } from '@expo/vector-icons';
import {
    StyledView,
    StyledTouchableOpacity,
    TextInputStyle,
    StyledText,
    StyledTouchableOpacityLogo,
    StyledViewLogo,
    StyledTextTitle
} from "./styles";


type UserLoginType = {
    email: string;
    password: string;
}


export function Login() {
    const navigation = useNavigation<routesType>();

    const { control, handleSubmit } = useForm<UserLoginType>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    function HandleOnClick(data: UserLoginType) {
        navigation.navigate("Home");
    }

    return (
        <StyledView>
            <StyledTextTitle>
                Amigo Chocolate
                <MaterialCommunityIcons name="cookie-outline" size={30} color="white" />
            </StyledTextTitle>

            <Controller
                control={control}
                name="email"
                rules={{ required: true }}
                render={({ field }) => (
                    <TextInputStyle
                        placeholder="Digite seu e-mail"
                        value={field.value}
                        onChangeText={field.onChange}
                        onBlur={field.onBlur}
                    />
                )}
            />

            <Controller
                control={control}
                name="password"
                rules={{ required: true }}
                render={({ field }) => (
                    <TextInputStyle
                        placeholder="Digite sua senha"
                        value={field.value}
                        onChangeText={field.onChange}
                        onBlur={field.onBlur}
                    />
                )}
            />

            <StyledText onPress={() => navigation.navigate("RecoverPassword")}>
                Esqueceu a senha?
            </StyledText>

            <StyledTouchableOpacity onPress={handleSubmit(HandleOnClick)}>
                <Text>Entrar</Text>
            </StyledTouchableOpacity>

            <StyledTouchableOpacityLogo onPress={handleSubmit(HandleOnClick)} activeOpacity={0.7}>
                <StyledViewLogo>
                    <Text>Entrar com Google</Text>
                    <FontAwesome6 name="google" size={26} color="black" />
                </StyledViewLogo>
            </StyledTouchableOpacityLogo>
        </StyledView>
    )
}