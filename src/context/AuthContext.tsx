import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";
import { auth } from "../config/firebase";

interface AuthContextI {
  user: User | null;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string) => Promise<UserCredential | undefined>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextI>({
  user: null,
  signIn: () => Promise.resolve(),
  signUp: () => Promise.resolve(undefined),
  logOut: () => Promise.resolve(),
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      alert("User created successfully");
      return user;
    } catch (error : any) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == "auth/weak-password") {
        alert("The password is too weak.");
      } else {
        alert(errorMessage);
      }
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
        .then(function (user) {
          alert("User Signed in successfully");
          (window as Window).location = "/crops";
          // ...
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === "auth/wrong-password") {
            alert("Wrong password.");
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = async () => {
    setUser(null);
    await signOut(auth);
  };

  const values: AuthContextI = { user, signIn, signUp, logOut };

  return (
    <AuthContext.Provider value={values}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
