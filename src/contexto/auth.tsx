import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

interface AuthContextType {
    authenticated: boolean;
    user: any;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}


export const AuthContext = createContext<AuthContextType>({
    authenticated: false,
    user: null,
    loading: true,
    login: async () => {},
    logout: () => {}
});

export const AuthProvider = ({ children, navigation }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // const recoveredUser = localStorage.getItem("amigochocolate:user");

        // if (recoveredUser) {
        //     setUser(JSON.parse(recoveredUser));
        // }

        setLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const resposta = await axios.post(
                'https://localhost:7278/api/Login/autenticar', {
                Email: email,
                Senha: password 
            });

            if (resposta.status === 200) {
                setUser(resposta.data);
                // localStorage.setItem("amigochocolate:user", JSON.stringify(resposta.data));
                navigation.navigate("Home");
            }
        } catch (err) {
            console.log("Erro ao enviar os dados: ", err);
        }
    };

    const logout = () => {
        // localStorage.removeItem("amigochocolate:user");
        setUser(null);
        navigation.navigate("Login");
    };

    useEffect(() => {
        const clearStorage = () => {
            try {
                logout();
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
        <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
