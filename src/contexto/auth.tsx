import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { IUser } from '../Types/user';
import { routesTabType, routesType } from '../Routes/routes';

interface AuthContextType {
    authenticated: boolean;
    user: IUser;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    signed: boolean;
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser>({
        idUsuario: 0,
        foto: "",
        nome: "",
        email: "",
        senha: "",
        id_Status: 0
    });
    const [signed, setSigned] = useState(false);
    const [loading, setLoading] = useState(true);
    // const navigation = useNavigation<routesTabType>();
    const navigation = useNavigation<routesType>();

    useEffect(() => {
        const loadUserFromStorage = async () => {
            const recoveredUser = await AsyncStorage.getItem("amigochocolate:user");

            if (recoveredUser) {
                setUser(JSON.parse(recoveredUser));
                setSigned(true);
            }

            setLoading(false);
        };

        loadUserFromStorage();
    }, []);

    const login = async (email: string, password: string) => {
        console.log("login email: ", email);
        console.log("login senha: ", password);
        try {
            const resposta = await axios.post(
                'https://localhost:7278/login', {
                Email: email,
                Senha: password
            });

            if (resposta.status === 200) {
                setUser(resposta.data);
                setSigned(true);

                await AsyncStorage.setItem("amigochocolate:user", JSON.stringify(resposta.data));
            }
        } catch (err) {
            console.log("Erro ao enviar os dados: ", err);
        }
    };

    const logout = async () => {
        setUser({
            idUsuario: 0,
            foto: "",
            nome: "",
            email: "",
            senha: "",
            id_Status: 0
        });
        setSigned(false);

        await AsyncStorage.removeItem("amigochocolate:user");
        navigation.navigate("Login");
    };

    useEffect(() => {
        const clearStorage = async () => {
            try {
                await logout();
            } catch (error) {
                console.log(error);
            }
        };

        const id = setInterval(() => {
            clearStorage();
        }, 43200000);

        return () => clearInterval(id);
    }, []);

    return (
        <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout, signed }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);