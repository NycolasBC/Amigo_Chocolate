import { styled } from 'styled-components/native'

export const StyledView = styled.View`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background-color: ${({ theme }) => theme.colors.BACKGROUND_PRIMARY};
`

export const StyledViewButton = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
`

export const TextInputStyle = styled.TextInput`
    height: 40px;
    width: 300px;
    text-align: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.BACKGROUND_SECUNDARY};
    color: ${({ theme }) => theme.colors.TEXT_SECUNDARY};
`

export const StyledTouchableOpacity = styled.TouchableOpacity`
    height: 50px;
    width: 200px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    background-color: ${({ theme }) => theme.colors.INFO};
`

export const StyledText = styled.Text`
    color: ${({ theme }) => theme.colors.TEXT_PRIMARY};
`