import React from 'react';
import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { routesType } from "../../Routes/routes";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import {
    StyledImage,
    StyledImageBorder,
    StyledTextTitle,
    StyledTouchableOpacity,
    StyledView,
    StyledViewImage,
    TextInputStyle
} from "./styles";
import axios from 'axios';
import { GroupRegistrationType } from '../../Types/group';
import { useAuth } from '../../contexto/auth';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from 'date-fns';


export function RegistrationGroup() {
    const [newImage, setNewImage] = useState('');
    const [date, setDate] = useState("");
    const [showPicker, setShowPicker] = useState(false);

    const { user } = useAuth();

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

    async function HandleOnClick(data: GroupRegistrationType) {
        console.log("Data: ", data.dtReveal)

        const partesData: string[] = data.dtReveal.split('/');

        const datas: Date = new Date(Number(partesData[2]), Number(partesData[1]) - 1, Number(partesData[0]));

        const dataFormatada: string = datas.toISOString();
        console.log("Data formatada: ", dataFormatada)
        try {

            const resposta = await axios.post(
                `https://localhost:7278/grupo`, {
                Id: user.idUsuario,
                NovoGrupo: {
                    Imagem: data.image,
                    Nome: data.name,
                    QtdUsuario: data.qtdUsers,
                    Valor: data.amount,
                    DataRevelacao: dataFormatada,
                    Descricao: data.description,
                    Id_Status: 1
                }
            });

            if (resposta.status === 201) {
                alert(`Grupo criado com sucesso`);
                navigation.navigate("Home");
            }
        } catch (err) {
            alert(`Erro ao enviar os dados: ${err}`);
        }
    }

    async function pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            // const base64 = await convertToBase64(newImage);

            setValue('image', newImage);
            setNewImage(result.assets[0].uri);
        }
    }

    async function convertToBase64(uri: any) {
        const fileUri = FileSystem.cacheDirectory + 'tempImage.jpg';
        await FileSystem.copyAsync({
            from: uri,
            to: fileUri,
        });
        const base64 = await FileSystem.readAsStringAsync(fileUri, {
            encoding: FileSystem.EncodingType.Base64,
        });
        return base64;
    }

    function toggleDatePicker() {
        setShowPicker(!showPicker)
    }

    // function onChangeDatePicker({ type }, selectDate){
    //     if(type == "set"){
    //         const currentDate = selectDate;
    //         setDate(currentDate);
    //     } else{
    //         toggleDatePicker();
    //     }
    // }

    return (
        <StyledView>
            <StyledTextTitle>Cadastrar Novo Grupo</StyledTextTitle>

            <StyledImageBorder>
                <Controller
                    control={control}
                    name="image"
                    render={({ field }) => (
                        <StyledViewImage>
                            {/* {newImage && <StyledImage source={{ uri: newImage }} />}
                            <Button title="Selecione uma imagem da galeria" onPress={pickImage} /> */}
                            {newImage ? <StyledImage source={{ uri: newImage }} /> : <MaterialCommunityIcons name="image-plus" size={24} color="black" onPress={pickImage} />}
                        </StyledViewImage>
                    )}
                />
            </StyledImageBorder>

            <Controller
                control={control}
                name="name"
                rules={{ required: "É necessário preencher o nome" }}
                render={({ field, fieldState: { error } }) => (
                    <View>
                        <TextInputStyle
                            placeholder="Digite o nome do grupo"
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
                        {/* {!showPicker && (
                            <Pressable onPress={toggleDatePicker}> */}
                        <TextInputStyle
                            placeholder="Informe a data de revelação"
                            value={field.value}
                            onChangeText={field.onChange}
                            onBlur={field.onBlur}
                        // editable={false}
                        />
                        {/* </Pressable>
                        )} */}
                        {/* {showPicker && (
                            <DateTimePicker
                                mode='date'
                                display='spinner'
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )} */}
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
