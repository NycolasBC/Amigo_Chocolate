import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Text } from "react-native";

export function HomeButton() {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={{ marginRight: 10 }}
        >
            <Text>Home</Text>
        </TouchableOpacity>
    );
}