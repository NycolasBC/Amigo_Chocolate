import styled from "styled-components/native";

export const StyledView = styled.View`
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;

    width: 100%;
    height: 7%;

    background-color: ${({ theme }) => theme.colors.BACKGROUND_PRIMARY};
`

export const StyledText1 = styled.Text`
    font-size: 5px;
    color: ${({ theme }) => theme.colors.TEXT_PRIMARY};
`

export const StyledText2 = styled.Text`
    font-size: 5px;
    color: ${({ theme }) => theme.colors.TEXT_PRIMARY};
`