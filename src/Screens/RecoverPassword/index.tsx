import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import { routesType } from "../../Routes/routes";
import { Controller, useForm } from "react-hook-form";
import { StyledText, StyledTouchableOpacity, StyledView, TextInputStyle } from "./styles";

type RecoverPasswordType = {
    email: string;
}

export function RecoverPassword() {
    const navigation = useNavigation<routesType>();

    const { control, handleSubmit, formState: { errors } } = useForm<RecoverPasswordType>({
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
                rules={{ required: "É necessário preencher o email" }}
                render={({ field, fieldState: { error } }) => (
                    <View>
                        <TextInputStyle
                            placeholder="Digite seu e-mail"
                            value={field.value}
                            onChangeText={field.onChange}
                            onBlur={field.onBlur}
                        />
                        {error && <Text style={{color: 'red'}}>{error.message}</Text>}
                    </View>
                )}
            />

            <StyledTouchableOpacity onPress={handleSubmit(HandleOnClick)}>
                <Text>Enviar Email</Text>
            </StyledTouchableOpacity>

        </StyledView>
    )
}