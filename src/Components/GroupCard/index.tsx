import ImageDefault from "../../assets/favicon.png";
import { useNavigation } from "@react-navigation/native";
import { routesType } from "../../Routes/routes";
import {
    Card,
    CardTitles,
    StyledImage
} from "./styles"
import { TouchableOpacityProps } from "react-native";
import { IGrupo } from "../../Types/group";

interface GrupCardProps extends TouchableOpacityProps {
    data: IGrupo
}

export function GroupCard({ data, ...props }: GrupCardProps) {
    const navigation = useNavigation<routesType>();
    return (
        <Card {...props} onPress={() => { navigation.navigate("EditGroup", { params: data }) }}>
            <StyledImage source={{ uri: data.imagem == null || undefined || "" ? ImageDefault : data.imagem }} />
            <CardTitles>
                {data.nome}
            </CardTitles>
        </Card>
    )
}