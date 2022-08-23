import { createContext, useState } from "react";

interface User {
  username: string;
  token: string;
  id: number;
}

interface AuthContextInterface {
  user?: User;
  setUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface
);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | undefined>();

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
