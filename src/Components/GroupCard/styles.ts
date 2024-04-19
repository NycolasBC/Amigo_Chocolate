import styled from "styled-components/native";


export const StyledView = styled.View`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.BACKGROUND_PRIMARY};
`

export const Card = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;

  width: 360px;
  height: 140px;
  padding: 32px 24px;
  
  background-color: ${({ theme }) => theme.colors.ICON};
  border-radius: 12px;

  color: ${({ theme }) => theme.colors.TEXT_PRIMARY};
  text-decoration: none;
`

export const CardTitles = styled.View`
  color: ${({ theme }) => theme.colors.TEXT_PRIMARY};
  text-align: center;
`

export const TextStyled = styled.Text`
  color: ${({ theme }) => theme.colors.TEXT_PRIMARY};
  font-size: 24px;
  line-height: 38px;
  margin-bottom: 4px;
`

export const TextTitles = styled.Text`
  font-size: 24px;
  line-height: 38px;
  margin-bottom: 4px;
  font-weight: bold;
`

export const TextSubtitle = styled.Text`
  font-size: 14px;
  line-height: 18px;
  margin: 0;
`

export const StyledImage = styled.Image`
  color: ${({ theme }) => theme.colors.TEXT_SECUNDARY};
  border-radius: 50px;
  width: 100px;
  height: 100px;
`

export const StyledTouchableOpacity = styled.TouchableOpacity`
    height: 50px;
    width: 100px;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.BACKGROUND_PRIMARY};
    padding: 32px 24px;
`