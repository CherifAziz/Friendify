import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import validator from "validator";

const Login_user = (props) => {
  const { navigation } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

  const onEmailChanged = (email) => {
    setEmail(() => email);
  };

  const onPasswordChanged = (password) => {
    setPassword(() => password);
  };

  const isUserCredentialsValid = (email, password) => {
    return validator.isEmail(email) && password;
  };

  const showMessage = (title, message) => {
    Alert.alert(title, message);
  };

  const login = async () => {
    if (isUserCredentialsValid(email, password)) {
      setIsLoading(true);
      try {
        const res = await fetch("http://192.168.1.19:8080/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
        const response = await res.json();
        if (response.user === null)
          showMessage("Error", "Your username or password is not correct");
        else navigation.navigate("Home");
      } catch (error) {
        throw new Error("Issue with Register", error.message);
      }
    } else {
      setIsLoading(false);
      showMessage("Error", "Your username or password is not correct");
    }
  };

  const register = () => {
    navigation.navigate("SignUp");
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo1.png")} />
      </View>
      <TextInput
        autoCapitalize="none"
        onChangeText={onEmailChanged}
        placeholder="Email"
        placeholderTextColor="#ccc"
        style={styles.input}
      />
      <TextInput
        autoCapitalize="none"
        onChangeText={onPasswordChanged}
        placeholder="Password"
        placeholderTextColor="#ccc"
        secureTextEntry
        style={styles.input}
      />
      <Text style={styles.password} onPress={console.log("aa")}>
        Mot de passe oublié ?
      </Text>
      <TouchableOpacity style={styles.login} onPress={login}>
        <Text style={styles.loginLabel}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.register} onPress={register}>
        <Text style={styles.registerLabel}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  logoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
  },
  input: {
    borderColor: "#ccc",
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 16,
    marginHorizontal: 24,
    marginVertical: 8,
    padding: 12,
  },
  password: {
    color: "#108CFF",
    textAlign: "right",
    marginHorizontal: 24,
    marginVertical: 8,
  },
  login: {
    backgroundColor: "#3B82F6",
    borderRadius: 10,
    fontSize: 16,
    marginHorizontal: 24,
    marginVertical: 8,
    padding: 16,
  },
  loginLabel: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
  register: {
    backgroundColor: "#fff",
    fontSize: 16,
    marginHorizontal: 24,
    marginVertical: 8,
    padding: 16,
  },
  registerLabel: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
});

export default Login_user;
