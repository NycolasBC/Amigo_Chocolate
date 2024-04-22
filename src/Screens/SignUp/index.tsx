import { View, Text, Button, Image } from "react-native";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { routesType } from "../../Routes/routes";
import * as ImagePicker from 'expo-image-picker';
import {
    StyledImage,
    StyledTextTitle,
    StyledTouchableOpacity,
    StyledView,
    StyledViewImage,
    TextInputStyle
} from "./styles";
import axios from "axios";


type UserSignUpType = {
    image: string;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}


export function SignUp() {
    const [newImage, setNewImage] = useState('');

    const navigation = useNavigation<routesType>();

    const { control, handleSubmit } = useForm<UserSignUpType>({
        defaultValues: {
            image: '',
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    });

    async function HandleOnClick(data: UserSignUpType) {
        console.log("Data :", data);

        data.image = newImage;

        console.log("Data :", data);

        if (data.password.toString != data.confirmPassword.toString) {
            alert("A senha de confrimação está incorreta")
        }
        else {
            try {
                const resposta = await axios.post(
                    'https://localhost:7278/api/Usuario/adicionar', {
                    Foto: data.image,
                    Nome: data.name,
                    Email: data.email,
                    Senha: data.password,
                    Id_Status: 1
                });

                if (resposta.status === 200) {
                    navigation.navigate("Login");
                }
            } catch (err) {
                console.log("Erro ao enviar os dados: ", err);
            }
        }
    }

    async function pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setNewImage(result.assets[0].uri);
        }
    };

    return (
        <StyledView>
            <StyledTextTitle>Novo Cadastro</StyledTextTitle>

            <Controller
                control={control}
                name="image"
                render={({ field }) => (
                    <StyledViewImage>
                        {newImage && <StyledImage source={{ uri: newImage }} />}
                        <Button title="Selecione uma imagem da galeria" onPress={pickImage} />
                    </StyledViewImage>
                )}
            />

            <Controller
                control={control}
                name="name"
                rules={{ required: "É necessário preencher o nome" }}
                render={({ field, fieldState: { error } }) => (
                    <View>
                        <TextInputStyle
                            placeholder="Digite seu nome"
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
                name="email"
                rules={{ required: "É necessário preencher o email", }}
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

            <Controller
                control={control}
                name="confirmPassword"
                rules={{ required: "É necessário confirmar a senha" }}
                render={({ field, fieldState: { error } }) => (
                    <View>
                        <TextInputStyle
                            placeholder="Confirme sua senha"
                            value={field.value}
                            onChangeText={field.onChange}
                            onBlur={field.onBlur}
                        />
                        {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
                    </View>
                )}
            />

            <StyledTouchableOpacity onPress={handleSubmit(HandleOnClick)}>
                <Text>Cadastrar</Text>
            </StyledTouchableOpacity>
        </StyledView>
    )
}