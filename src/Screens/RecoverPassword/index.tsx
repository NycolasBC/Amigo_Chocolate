import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";
import { routesType } from "../../Routes/routes";
import { Controller, useForm } from "react-hook-form";
import { StyledText, StyledTouchableOpacity, StyledView, TextInputStyle } from "./styles";

type RecoverPasswordType = {
    email: string;
}

export function RecoverPassword() {
    const navigation = useNavigation<routesType>();

    const { control, handleSubmit, register } = useForm<RecoverPasswordType>({
        defaultValues: {
            email: ''
        }
    });

    function HandleOnClick(data: RecoverPasswordType) {
        navigation.navigate("Login");
    }

    return (
        <StyledView>
            <StyledText>Esqueci a senha</StyledText>
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

            <StyledTouchableOpacity onPress={handleSubmit(HandleOnClick)}>
                <Text>Enviar Email</Text>
            </StyledTouchableOpacity>

        </StyledView>
    )
}