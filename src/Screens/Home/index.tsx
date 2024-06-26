import { ScrollView, ActivityIndicator, BackHandler, TouchableOpacity, Text } from 'react-native';
import { StyledTextEmpty, StyledView } from "./styles";
import { GroupCard } from "../../Components/GroupCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { IGrupo } from "../../Types/group";
import { useAuth } from "../../contexto/auth";
import { routesType } from '../../Routes/routes';
import { useIsFocused, useNavigation } from '@react-navigation/native';


export function Home() {
    const [grupos, setGrupos] = useState<IGrupo[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [allGroupsLoaded, setAllGroupsLoaded] = useState(false);

    const navigation = useNavigation<routesType>();


    const { user, logout } = useAuth();
    const isFocused = useIsFocused();

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", () => {
            return true;
        })

        // try {
        //     getGruposUsuario()
        // } catch (error) {
        //     console.log("Erro ao enviar os dados: ", error);
        // }
    }, [isFocused]);

    async function getGruposUsuario() {
        try {
            const apiUrl = `https://localhost:7278/grupousuario/${user.idUsuario}`;
            const resposta = await axios.get(apiUrl);

            setGrupos(resposta.data)
        } catch (err) {
            alert(`Erro ao enviar os dados: ${err}`);
        }
    };

    async function loadMoreGroups() {
        if (loading || allGroupsLoaded) return;

        try {
            setLoading(true);
            const nextPageUrl = `https://localhost:7278/grupousuario/${user.idUsuario}?page=${page + 1}`;
            const response = await axios.get(nextPageUrl);
            const newGroups = response.data;

            if (newGroups.length > 0) {
                setGrupos([...grupos, ...newGroups]);
                setPage(page + 1);
            } else {
                setAllGroupsLoaded(true);
            }
        } catch (error) {
            console.error("Erro ao carregar mais grupos:", error);
        } finally {
            setLoading(false);
        }
    };

    function isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }: any) {
        const paddingToBottom = 3;
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    };

    return (
        <StyledView>
            <TouchableOpacity onPress={() => logout()}>
                <Text style={{ color: "white" }}>sAIR</Text>
            </TouchableOpacity>
            {grupos.length === 0 ? (
                <StyledTextEmpty>Nenhum grupo disponível no momento.</StyledTextEmpty>
            ) : (
                <ScrollView
                    onScroll={({ nativeEvent }) => {
                        if (isCloseToBottom(nativeEvent) && !loading && !allGroupsLoaded) {
                            loadMoreGroups();
                        }
                    }}
                    scrollEventThrottle={10}
                >

                    {grupos.map((grupo) => (
                        <GroupCard
                            key={grupo.idGrupo}
                            data={grupo}
                        />
                    ))}
                    {loading && <ActivityIndicator size="large" />}
                </ScrollView>
            )}
        </StyledView>
    )
}