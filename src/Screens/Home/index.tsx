import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { routesType } from "../../Routes/routes";

export function Home() {
    const navigation = useNavigation<routesType>();

    function Handle() {
        navigation.navigate("Login");
    }


    return (
        <View>
            <Text>Home</Text>
            <TouchableOpacity
                onPress={Handle}
            >
                <Text>Sair</Text>
            </TouchableOpacity>
        </View>
    )
}