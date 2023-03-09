import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
  Image,
  Platform,
} from "react-native";
import validator from "validator";

const SignUp = (props) => {
  const { navigation } = props;
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const onFullnameChanged = (fullname) => {
    setFullname(() => fullname);
  };

  const onEmailChanged = (email) => {
    setEmail(() => email);
  };

  const onPasswordChanged = (password) => {
    setPassword(() => password);
  };

  const onConfirmPasswordChanged = (confirmPassword) => {
    setConfirmPassword(() => confirmPassword);
  };

  const showMessage = (title, message) => {
    Alert.alert(title, message);
  };

  const isSignupValid = ({ fullname, email, password, confirmPassword }) => {
    if (validator.isEmpty(fullname)) {
      showMessage("Error", "Please input your full name");
      return false;
    }
    if (validator.isEmpty(email) || !validator.isEmail(email)) {
      showMessage("Error", "Please input your email");
      return false;
    }
    if (validator.isEmpty(password)) {
      showMessage("Error", "Please input your password");
      return false;
    }
    if (validator.isEmpty(confirmPassword)) {
      showMessage("Error", "Please input your confirm password");
      return false;
    }
    if (password !== confirmPassword) {
      showMessage(
        "Error",
        "Your confirm password must be matched with your password"
      );
      return false;
    }
    return true;
  };

  const register = async () => {
    // if (isSignupValid({ fullname, email, password, confirmPassword })) {
    //   setIsLoading(true);
    try {
      console.log(fullname);
      console.log(email);
      console.log(password);
      const res = await fetch("http://192.168.1.19:8080/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullname,
          email: email,
          password: password,
        }),
      });
      const response = await res.json();
      console.log("response:", response);
      if (response.msg === "Something went wrong")
        showMessage("Error", response.error);
      else navigation.navigate("Home");
    } catch (error) {
      console.error("Issue with Register", error);
      throw new Error("Issue with Register", error.msg);
    }
    // }
  };

  const handleRegister = async () => {
    try {
      await register();
    } catch (error) {
      console.error("Unhandled promise rejection:", error);
      // Affichez ici un message d'erreur à l'utilisateur ou
      // traitez l'erreur d'une autre manière si nécessaire
    }
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
      <TextInput
        autoCapitalize="none"
        onChangeText={onFullnameChanged}
        placeholder="Full name"
        placeholderTextColor="#ccc"
        style={styles.input}
      />
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
      <TextInput
        autoCapitalize="none"
        onChangeText={onConfirmPasswordChanged}
        placeholder="Confirm Password"
        placeholderTextColor="#ccc"
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity style={styles.register} onPress={handleRegister}>
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
  input: {
    borderColor: "#ccc",
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    marginHorizontal: 24,
    marginVertical: 8,
    padding: 12,
  },
  register: {
    backgroundColor: "#3B82F6",
    borderRadius: 8,
    fontSize: 16,
    marginHorizontal: 24,
    marginVertical: 8,
    padding: 16,
  },
  registerLabel: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
});

export default SignUp;
