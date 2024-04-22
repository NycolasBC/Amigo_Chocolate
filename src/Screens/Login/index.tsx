import { Text, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { routesType } from "../../Routes/routes";
import { MaterialCommunityIcons, FontAwesome6 } from '@expo/vector-icons';
import { useAuth } from "../../contexto/auth";
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
    const { login } = useAuth();
    const navigation = useNavigation<routesType>();

    const { control, handleSubmit } = useForm<UserLoginType>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    async function HandleOnClick(data: UserLoginType) {
        try {
            await login(data.email, data.password)
        } catch (erro) {
            console.log('Erro ao enviar dados: ', erro);
        }
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
                rules={{ required: "É necessário preencher o email" }}
                render={({ field, fieldState: { error } }) => (
                    <View>
                        <TextInputStyle
                            placeholder="Digite seu e-mail"
                            value={field.value}
                            onChangeText={field.onChange}
                            onBlur={field.onBlur}
                        />
                        {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
                    </View>
                )}
            />

            <Controller
                control={control}
                name="password"
                rules={{ required: "É necessário preencher a senha" }}
                render={({ field, fieldState: { error } }) => (
                    <View>
                        <TextInputStyle
                            placeholder="Digite sua senha"
                            value={field.value}
                            onChangeText={field.onChange}
                            onBlur={field.onBlur}
                        />
                        {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
                    </View>
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

            <StyledText onPress={() => navigation.navigate("SignUp")}>
                Não possui acesso? Se cadastre aqui
            </StyledText>
        </StyledView>
    )
}