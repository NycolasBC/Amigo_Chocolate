import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { StyledView } from './styles';
import { Controller, useForm } from 'react-hook-form';
import { IConviteRegistration } from '../../Types/invite';
import axios from 'axios';
import { useAuth } from '../../contexto/auth';
import { IUser } from '../../Types/user';


export function EditGroup() {
    const [usuario, setUsuario] = useState<IUser[]>([])
    const { user } = useAuth();

    const { control, handleSubmit } = useForm<IConviteRegistration>({
        defaultValues: {
            idGrupo: 0,
            nomeGrupo: "",
            nomeUsuario: "",
            emailConvidado: "",
            descricao: "",
            id_Status: 0
        }
    });

    const route = useRoute();
    console.log("Parametros: ", route.params);
    console.log("Parametros nome: ", route.params.nome);
    console.log("Parametros e Parametros: ", route.params.params)

    useEffect(() => {
        try {
            getUsuariosGrupo()
        } catch (error) {
            console.log("Erro ao enviar os dados: ", error);
        }
    }, [])

    async function getUsuariosGrupo() {
        try {
            const apiUrl = `https://localhost:7278/grupousuario/usuario/${route.params.params.idGrupo}`;
            const resposta = await axios.get(apiUrl);

            setUsuario(resposta.data)
        } catch (err) {
            alert(`Erro ao enviar os dados: ${err}`);
        }
    };

    async function HandleOnClick(data: IConviteRegistration) {

        data.idGrupo = route.params.params.idGrupo
        data.nomeGrupo = route.params.params.nome
        data.nomeUsuario = user.nome
        data.descricao = "Aguardando resposta"
        data.id_Status = 1

        try {
            const resposta = await axios.post(
                'https://localhost:7278/usuario/convite', {
                IdGrupo: data.idGrupo,
                NomeGrupo: data.nomeGrupo,
                NomeUsuario: data.nomeUsuario,
                EmailConvidado: data.emailConvidado,
                Descricao: data.descricao,
                Id_Status: data.id_Status
            });

            if (resposta.status === 201) {
                alert(`Convite enviado com sucesso`);
            }
        } catch (err) {
            alert(`Erro ao enviar os dados: ${err}`);
        }
    }

    return (
        <StyledView>
            <View>
                <Text>{route.params.params.nome}</Text>

                {route.params.params.descricao ?
                    <Text>{route.params.params.descricao}</Text>
                    : null
                }
            </View>

            <View>
                <Controller
                    control={control}
                    name="emailConvidado"
                    rules={{ required: "É necessário preencher o email" }}
                    render={({ field, fieldState: { error } }) => (
                        <View>
                            <TextInput
                                placeholder="Digite o e-mail da pessoa a ser convidada"
                                value={field.value}
                                onChangeText={field.onChange}
                                onBlur={field.onBlur}
                            />
                            {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
                        </View>
                    )}
                />

                <Pressable onPress={handleSubmit(HandleOnClick)}>
                    <Text>Enviar Convite</Text>
                </Pressable>
            </View>

            <ScrollView>
                {usuario.map((usuarios) => (
                    <Text>{usuarios.nome}</Text>
                ))}
            </ScrollView>

        </StyledView>
    );
}