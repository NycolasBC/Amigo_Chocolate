import React, { useEffect, useState } from 'react';
import { Modal, Text, Pressable, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useAuth } from '../../contexto/auth';
import axios from 'axios';
import { IConvite } from '../../Types/invite';
import { useNavigation } from '@react-navigation/native';
import { routesType } from '../../Routes/routes';

export function Invite() {
    const [visibilidadeModal, setVisibilidadeModal] = useState(false);
    const [convites, setConvites] = useState<IConvite[]>([]);

    const { user } = useAuth();
    const navigation = useNavigation<routesType>();

    useEffect(() => {
        try {
            getConvites()
        } catch (error) {
            console.log("Erro ao enviar os dados: ", error);
        }
    }, []);

    async function getConvites() {
        try {
            const apiUrl = `https://localhost:7278/usuario/convite/${user.email}`;
            const resposta = await axios.get(apiUrl);

            setConvites(resposta.data)
        } catch (err) {
            alert(`Erro ao enviar os dados: ${err}`);
        }
    };

    async function postConvites(decisao: number, data: IConvite) {
        try {
            const resposta = await axios.put(
                'https://localhost:7278/usuario/convite', {
                ConviteId: data.idConvite,
                Descricao: decisao === 1 ? "Convite aceito" : "Convite recusado",
                Id_Status: decisao === 1 ? 2 : 9
            });

            if (resposta.status === 201) {
                decisao === 1 ? alert(`Convite aceito`) : alert(`Convite recusado`);

                navigation.navigate("Invite");
            }
        } catch (err) {
            alert(`Erro ao enviar os dados: ${err}`);
        }
    };

    return (
        <View>
            {convites.length === 0 ? (
                <Text>Nenhum convite até o momento.</Text>
            ) : (
                <View>
                    {convites.map((convite) => (
                        <View>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={visibilidadeModal}
                                onRequestClose={() => { setVisibilidadeModal(!visibilidadeModal) }}
                            >
                                <View>
                                    <Pressable onPress={() => setVisibilidadeModal(!visibilidadeModal)}>
                                        <AntDesign name="close" size={16} color="red" />
                                    </Pressable>

                                    <Text>Deseja entrar para o grupo?</Text>

                                    <Pressable onPress={() => postConvites(1, convite)}>
                                        SIM
                                    </Pressable>

                                    <Pressable onPress={() => postConvites(2, convite)}>
                                        NÃO
                                    </Pressable>
                                </View>
                            </Modal>
                            <Pressable onPress={() => setVisibilidadeModal(true)}>
                                <Text>Você foi convidado para o grupo {convite.nomeGrupo}, do usuário {convite.nomeUsuario}</Text>
                            </Pressable>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
}