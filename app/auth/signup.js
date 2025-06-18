import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { AuthContext } from "../_layout";
import { router, Link } from "expo-router";
import axios from "axios";
import Ionicons from '@expo/vector-icons/Ionicons';

const API_URL = "https://site--marvel-backend--t29qzrn4njwx.code.run";

export default function Signup() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    let newErrors = {};
    if (!username.trim()) newErrors.username = "Username required";
    if (!email.trim()) newErrors.email = "Email required";
    if (!password) newErrors.password = "Password required";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    setErrors({});
    console.log("EMAIL ENVOYÉ :", email.trim());
    try {
      const response = await axios.post(`${API_URL}/user/signup`, {
        username: username.trim(),
        email: email.trim(),
        password,
      });
      console.log("REPONSE BACKEND :", response.data);
      setLoading(false);
      if (response.data && response.data.data && response.data.data.token) {
        setSuccess(true);
        login(response.data.data.token);
        setTimeout(() => {
          router.replace("/");
        }, 1000);
      } else {
        setErrors({ api: response.data.message || "Registration failed. Please try again." });
      }
    } catch (error) {
      setLoading(false);
      if (error.response?.data?.message) {
        setErrors({ api: error.response.data.message });
      } else {
        setErrors({ api: "Registration failed. Please try again." });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.form}>
        <TextInput
          style={[styles.input, errors.username && styles.inputError]}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        {errors.username && <Text style={styles.error}>{errors.username}</Text>}
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, errors.password && styles.inputError, { flex: 1 }]}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="#e62429" style={styles.toggleEye} />
          </TouchableOpacity>
        </View>
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, errors.confirmPassword && styles.inputError, { flex: 1 }]}
            placeholder="Confirm password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={24} color="#e62429" style={styles.toggleEye} />
          </TouchableOpacity>
        </View>
        {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}
        {errors.api && <Text style={styles.error}>{errors.api}</Text>}
        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign Up</Text>}
        </TouchableOpacity>
        {success && <Text style={styles.success}>Account created successfully!</Text>}
      </View>
      <View style={styles.bottomSection}>
        <Text>Already have an account? </Text>
        <Link href="/auth/login" style={styles.switchLink}>Log in</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#e62429",
    marginBottom: 24,
    textAlign: "center",
  },
  form: {
    width: "100%",
    maxWidth: 400,
    gap: 10,
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 2,
  },
  inputError: {
    borderColor: "#e62429",
  },
  error: {
    color: "#e62429",
    fontSize: 13,
    marginBottom: 4,
  },
  button: {
    backgroundColor: "#e62429",
    borderRadius: 6,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  success: {
    color: "#2ecc71",
    textAlign: "center",
    marginTop: 8,
    fontWeight: "500",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  toggleEye: {
    fontSize: 20,
    marginLeft: 8,
  },
  bottomSection: {
    flexDirection: "row",
    marginTop: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  switchLink: {
    color: "#e62429",
    fontWeight: "bold",
    marginLeft: 4,
  },
}); 