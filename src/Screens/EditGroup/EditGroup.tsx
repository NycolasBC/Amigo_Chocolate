import React from 'react';
import { useRoute } from '@react-navigation/native';
import { StyledView } from './styles';


export function EditGroup() {
    const route = useRoute();
    console.log("Parametros: ", route.params);
    console.log("Parametros nome: ", route.params.nome);
    console.log("Parametros e Parametros: ", route.params.params)

    return (
        <StyledView>

        </StyledView>
    );
}