import { useNavigation } from "@react-navigation/native";
import { routesType } from "../../Routes/routes";
import { StyledText, StyledTouchableOpacity, StyledView } from "./styles";
import { GroupCard } from "../../Components/GroupCard";
import { useEffect, useState } from "react";
import axios from "axios";

export function Home() {
    const [gruposUsuario, setGruposUsuario] = useState();
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
          const apiUrl = `https://localhost:7278/api/GrupoUsuario/buscarporid/{1}`;
          const resposta = await axios.get(apiUrl);
    
          setGruposUsuario(resposta.data)
    
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

            <GroupCard image="" name="Grupo 1" />
            <GroupCard image="" name="Grupo 2" />
            <GroupCard image="" name="Grupo 3" />
        </StyledView>
    )
}