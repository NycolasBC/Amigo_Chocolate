import styled from "styled-components/native";


export const Card = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;

  width: 360px;
  height: 140px;
  padding: 32px 24px;
  
  background-color: ${({ theme }) => theme.colors.ICON};
  border-radius: 12px;

  color: ${({ theme }) => theme.colors.TEXT_PRIMARY};
  text-decoration: none;
`

export const CardTitles = styled.Text`
  color: ${({ theme }) => theme.colors.TEXT_SECUNDARY};
  font-size: 24px;
  text-align: center;
`

export const TextTitles = styled.Text`
  font-size: 24px;
  line-height: 38px;
  margin-bottom: 4px;
  font-weight: bold;
`

export const StyledImage = styled.Image`
  border-radius: 50px;
  width: 100px;
  height: 100px;
`