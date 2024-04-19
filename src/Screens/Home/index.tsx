import { useNavigation } from "@react-navigation/native";
import { routesType } from "../../Routes/routes";
import { StyledText, StyledTouchableOpacity, StyledView } from "./styles";
import { GroupCard } from "../../Components/GroupCard";

export function Home() {
    const navigation = useNavigation<routesType>();

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