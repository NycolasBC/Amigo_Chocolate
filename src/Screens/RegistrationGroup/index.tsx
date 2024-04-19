import React from 'react';
import { View, Text, Button } from "react-native";
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

type GroupRegistrationType = {
    image?: string;
    name: string;
    qtdUsers: string;
    amount: string;
    dtReveal: string;
    description?: string;
}

export function RegistrationGroup() {
    const [newImage, setNewImage] = useState('');

    const navigation = useNavigation<routesType>();

    const { control, handleSubmit, setValue } = useForm<GroupRegistrationType>({
        defaultValues: {
            image: '',
            name: '',
            qtdUsers: '',
            amount: '',
            dtReveal: '',
            description: ''
        }
    });

    async function pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log("IMAGEMMMMMMMMMMMMMMM                              ", result);

        if (!result.canceled) {
            setValue('image', result.assets[0].uri);
            setNewImage(result.assets[0].uri);
        }
    };

    function HandleOnClick(data: GroupRegistrationType) {
        console.log("Data :", data);
        navigation.navigate("Home");
    }

    return (
        <StyledView>
            <StyledTextTitle>Cadastrar Novo Grupo</StyledTextTitle>

            <Controller
                control={control}
                name="image"
                render={() => (
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
                name="qtdUsers"
                rules={{ required: "É necessário informar uma quantidade", }}
                render={({ field, fieldState: { error } }) => (
                    <View>
                        <TextInputStyle
                            placeholder="Informe a quantidade de pessoas"
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
                name="amount"
                rules={{ required: "É necessário informar um valor" }}
                render={({ field, fieldState: { error } }) => (
                    <View>
                        <TextInputStyle
                            placeholder="Informe o valor minimo de dinheiro"
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
                name="dtReveal"
                rules={{ required: "É necessário informar uma data" }}
                render={({ field, fieldState: { error } }) => (
                    <View>
                        <TextInputStyle
                            placeholder="Informe a data de revelação"
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
                name="description"
                render={({ field }) => (
                    <View>
                        <TextInputStyle
                            placeholder="Informe uma descrição"
                            value={field.value}
                            onChangeText={field.onChange}
                            onBlur={field.onBlur}
                        />
                    </View>
                )}
            />

            <StyledTouchableOpacity onPress={handleSubmit(HandleOnClick)}>
                <Text>Cadastrar Grupo</Text>
            </StyledTouchableOpacity>
        </StyledView>
    )
}
