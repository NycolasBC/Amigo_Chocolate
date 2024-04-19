import { Text, View } from "react-native";
import ImageDefault from "../../assets/favicon.png";
import {
    Card,
    CardTitles,
    StyledImage,
    StyledTouchableOpacity,
    StyledView,
    TextStyled,
    TextTitles
} from "./styles"
import { useNavigation } from "@react-navigation/native";
import { routesType } from "../../Routes/routes";


type GroupType = {
    image?: string;
    name: string;
}

export function GroupCard(data: GroupType) {
    const navigation = useNavigation<routesType>();

    return (
        <StyledView>
            <Card>
                <StyledImage source={{ uri: data.image == null || undefined || "" ? ImageDefault : data.image }} />
                <CardTitles>
                    <TextTitles>{data.name}</TextTitles>
                </CardTitles>
                <StyledTouchableOpacity
                    onPress={() => { navigation.navigate("RegistrationGroup") }}
                >
                    <TextStyled>Ver</TextStyled>
                </StyledTouchableOpacity>
            </Card>
        </StyledView>
    )
}