import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";

const passwordValidation = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, "Password should be at least 4 characters")
    .max(16, "Password should not be longer than 16 characters")
    .required("Password length is required"),
});

const App = () => {
  const [password, setPassword] = useState("");
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [lowercase, setLowercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const createPassword = (characters, passwordLength) => {
    let result = "";
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const generatePassword = (passwordLength) => {
    let charactersList = "";

    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numbersChars = "1234567890";
    const symbolsChars = "!@#$%^&*()_+";

    if (uppercase) {
      charactersList += uppercaseChars;
    }
    if (lowercase) {
      charactersList += lowercaseChars;
    }
    if (symbols) {
      charactersList += symbolsChars;
    }
    if (numbers) {
      charactersList += numbersChars;
    }
    if (charactersList.length === 0) {
      alert("Please select at least one character type");
      return;
    }

    const password = createPassword(charactersList, passwordLength);
    setPassword(password);
    setIsPasswordGenerated(true);
  };

  const resetPassword = (handleReset) => {
    setIsPasswordGenerated(false);
    setPassword("");
    setLowercase(false);
    setNumbers(false);
    setSymbols(false);
    setUppercase(false);
    handleReset(); // Resets the form values
  };

  return (
    <GestureHandlerRootView>
      <ScrollView keyboardShouldPersistTaps="handled">
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Welcome to Password Generator</Text>
          </View>

          <Formik
            initialValues={{ passwordLength: "" }}
            validationSchema={passwordValidation}
            onSubmit={(values) => {
              generatePassword(Number(values.passwordLength));
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              handleReset,
              isValid,
            }) => (
              <>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Password Length:</Text>
                  <TextInput
                    style={styles.input}
                    value={values.passwordLength}
                    onChangeText={handleChange("passwordLength")}
                    placeholder="Enter length (4-16)"
                    keyboardType="numeric"
                  />
                  {touched.passwordLength && errors.passwordLength && (
                    <Text style={styles.errorText}>{errors.passwordLength}</Text>
                  )}
                </View>

                <View style={styles.checkboxContainer}>
                  <BouncyCheckbox
                    isChecked={uppercase}
                    onPress={() => setUppercase(!uppercase)}
                    fillColor="#4CAF50"
                    text="Include Uppercase"
                    textStyle={styles.checkboxText}
                    disableBuiltInState // Prevents line-through
                    style={styles.checkbox}
                  />
                  <BouncyCheckbox
                    isChecked={lowercase}
                    onPress={() => setLowercase(!lowercase)}
                    fillColor="#4CAF50"
                    text="Include Lowercase"
                    textStyle={styles.checkboxText}
                    disableBuiltInState // Prevents line-through
                    style={styles.checkbox}
                  />
                  <BouncyCheckbox
                    isChecked={numbers}
                    onPress={() => setNumbers(!numbers)}
                    fillColor="#4CAF50"
                    text="Include Numbers"
                    textStyle={styles.checkboxText}
                    disableBuiltInState // Prevents line-through
                    style={styles.checkbox}
                  />
                  <BouncyCheckbox
                    isChecked={symbols}
                    onPress={() => setSymbols(!symbols)}
                    fillColor="#4CAF50"
                    text="Include Symbols"
                    textStyle={styles.checkboxText}
                    disableBuiltInState // Prevents line-through
                    style={styles.checkbox}
                  />
                </View>

                <TouchableOpacity
                  style={[
                    styles.button,
                    { backgroundColor: isValid ? "#4CAF50" : "#9E9E9E" },
                  ]}
                  onPress={handleSubmit}
                  disabled={!isValid}
                >
                  <Text style={styles.buttonText}>Generate Password</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#2196F3" }]}
                  onPress={() => resetPassword(handleReset)}
                >
                  <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>

                {isPasswordGenerated && (
                  <View style={styles.resultContainer}>
                    <Text style={styles.resultText}>Generated Password:</Text>
                    <Text style={styles.password}>{password}</Text>
                  </View>
                )}
              </>
            )}
          </Formik>
        </SafeAreaView>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  checkboxContainer: {
    marginBottom: 20,
  },
  checkbox: {
    marginBottom: 10,
  },
  checkboxText: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  resultContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  password: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
    marginTop: 10,
    textAlign: "center",
  },
});

export default App;
