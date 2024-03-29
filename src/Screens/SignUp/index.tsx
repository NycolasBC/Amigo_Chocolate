import { View, Text, Button, Image } from "react-native";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { routesType } from "../../Routes/routes";
import * as ImagePicker from 'expo-image-picker';
import { 
    StyledImage,
    StyledTextTitle, 
    StyledTouchableOpacity, 
    StyledView, 
    StyledViewImage, 
    TextInputStyle 
} from "./styles";


type UserSignUpType = {
    image: string;
    nome: string;
    email: string;
    password: string;
    confirmPassword: string;
}


export function SignUp(){
    const [image, setImage] = useState('');
    
    const navigation = useNavigation<routesType>();
    
    const { control, handleSubmit, formState: { errors } } = useForm<UserSignUpType>({
        defaultValues: {
            image: '',
            nome: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    });

    function HandleOnClick(data: UserSignUpType) {
        console.log("Data :", data);
        
        if(data.password.toString != data.confirmPassword.toString){
            alert("A senha de confrimação está incorreta")
        }
        else{
        navigation.navigate("Login");

        }
    }

    async function pickImage(){
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };

    return(
        <StyledView>
            <StyledTextTitle>Novo Cadastro</StyledTextTitle>

            <Controller
                control={control}
                name="image"
                render={({ field, fieldState: { error } }) => (
                    <StyledViewImage>
                        {image && <StyledImage source={{ uri: image }} />}
                        <Button title="Selecione uma imagem da galeria" onPress={pickImage} />
                    </StyledViewImage>
                )}
            />

            <Controller
                control={control}
                name="nome"
                rules={{ required: "É necessário preencher o nome" }}
                render={({ field, fieldState: { error } }) => (
                    <View>
                        <TextInputStyle
                            placeholder="Digite seu nome"
                            value={field.value}
                            onChangeText={field.onChange}
                            onBlur={field.onBlur}
                        />
                        {error && <Text style={{color: 'red'}}>{error.message}</Text>}
                    </View>
                )}
            />

            <Controller
                control={control}
                name="email"
                rules={{ required: "É necessário preencher o email",  }}
                render={({ field, fieldState: { error } }) => (
                    <View>
                        <TextInputStyle
                            placeholder="Digite seu e-mail"
                            value={field.value}
                            onChangeText={field.onChange}
                            onBlur={field.onBlur}
                        />
                        {error && <Text style={{color: 'red'}}>{error.message}</Text>}
                    </View>
                )}
            />

            <Controller
                control={control}
                name="password"
                rules={{ required: "É necessário preencher a senha" }}
                render={({ field, fieldState: { error } }) => (
                    <View>
                        <TextInputStyle
                            placeholder="Digite sua senha"
                            value={field.value}
                            onChangeText={field.onChange}
                            onBlur={field.onBlur}
                        />
                        {error && <Text style={{color: 'red'}}>{error.message}</Text>}
                    </View>
                )}
            />

            <Controller
                control={control}
                name="confirmPassword"
                rules={{ required: "É necessário confirmar a senha" }}
                render={({ field, fieldState: { error } }) => (
                    <View>
                        <TextInputStyle
                            placeholder="Confirme sua senha"
                            value={field.value}
                            onChangeText={field.onChange}
                            onBlur={field.onBlur}
                        />
                        {error && <Text style={{color: 'red'}}>{error.message}</Text>}
                    </View>
                )}
            />
            
            <StyledTouchableOpacity onPress={handleSubmit(HandleOnClick)}>
                <Text>Cadastrar</Text>
            </StyledTouchableOpacity>
        </StyledView>
    )
}