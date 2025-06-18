import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { AuthContext } from "../_layout";
import { router, Link } from "expo-router";
import axios from "axios";

const API_URL = "https://site--marvel-backend--t29qzrn4njwx.code.run";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    let newErrors = {};
    if (!email.trim()) newErrors.email = "Email required";
    if (!password) newErrors.password = "Password required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    setErrors({});
    try {
      const response = await axios.post(`${API_URL}/user/login`, {
        email: email.trim(),
        password,
      });
      setLoading(false);
      if (response.data && response.data.data && response.data.data.token) {
        setSuccess(true);
        login(response.data.data.token);
        setTimeout(() => {
          router.replace("/");
        }, 1000);
      } else {
        setErrors({ api: response.data.message || "Login failed. Please try again." });
      }
    } catch (error) {
      setLoading(false);
      if (error.response?.data?.message) {
        setErrors({ api: error.response.data.message });
      } else {
        setErrors({ api: "Login failed. Please try again." });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <View style={styles.form}>
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
            <Text style={styles.toggleEye}>{showPassword ? "🙈" : "👁️"}</Text>
          </TouchableOpacity>
        </View>
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}
        {errors.api && <Text style={styles.error}>{errors.api}</Text>}
        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Log In</Text>}
        </TouchableOpacity>
        {success && <Text style={styles.success}>Login successful!</Text>}
      </View>
      <View style={styles.bottomSection}>
        <Text>Don't have an account? </Text>
        <Link href="/auth/signup" style={styles.switchLink}>Sign up</Link>
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