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
    width: 240px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    background-color: ${({ theme }) => theme.colors.INFO};
`

export const StyledTouchableOpacityLogo = styled.TouchableOpacity`
    height: 50px;
    width: 240px;
    align-items: left;
    justify-content: center;
    margin-top: 20px;
    background-color: ${({ theme }) => theme.colors.BACKGROUND_SECUNDARY};
`

export const StyledViewLogo = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 12px;
`
export const StyledTextTitle = styled.Text`
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 50px;
    color: ${({ theme }) => theme.colors.TEXT_PRIMARY};
`

export const StyledText = styled.Text`
    color: ${({ theme }) => theme.colors.TEXT_PRIMARY};
`