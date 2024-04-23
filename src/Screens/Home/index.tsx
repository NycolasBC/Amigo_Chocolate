import { useNavigation, useRoute } from "@react-navigation/native";
import { routesType } from "../../Routes/routes";
import { StyledText, StyledTouchableOpacity, StyledView } from "./styles";
import { GroupCard } from "../../Components/GroupCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { IGrupo } from "../../Types/group";


export function Home() {
    const [grupos, setGrupos] = useState<IGrupo[]>([]);

    const route = useRoute();

    const navigation = useNavigation<routesType>();

    useEffect(() => {
        try {
            getGruposUsuario()
        } catch (error) {
            console.log("Erro ao enviar os dados: ", error);
        }
    }, [])

    async function getGruposUsuario() {
        try {
            const apiUrl = `https://localhost:7278/api/GrupoUsuario/buscarporid/${route.params.idUsuario}`;
            const resposta = await axios.get(apiUrl);

            setGrupos(resposta.data)
            console.log("Grupos: ", grupos);
            console.log("Grupos response: ", resposta.data);
        } catch (err) {
            console.log("Erro ao enviar os dados: ", err);
        }
    }

    return (
        <StyledView>
            <StyledTouchableOpacity
                onPress={() => { navigation.navigate("RegistrationGroup") }}
            >
                <StyledText>Cadastrar Grupo</StyledText>
            </StyledTouchableOpacity>

            {grupos.map((grupo) => {
                return (
                    <GroupCard key={grupo.IdGrupo} data={grupo} />
                )
            })}
        </StyledView>
    )
}