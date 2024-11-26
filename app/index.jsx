import { View, Text } from 'react-native'
import React, {useState} from 'react'
import * as Yup from "yup"
import { Formik } from 'formik'
import BouncyCheckbox from "react-native-bouncy-checkbox";

const passwordValidation = Yup.object().shape({
  passwordLength: Yup.number()
  .min(4, "password should be atleast of 4 characters")
  .max(16, "password should be not longer than 16 characters")
  .required("length is required")
})

const App = () => {

 const [password, setPassword] = useState("");
 const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
 const [uppercase, setUppercase] = useState(false);
 const [lowercase, setLowercase] = useState(true);
 const [numbers, setNumbers] = useState(false);
 const [symbols, setSymbols] = useState(false);

 const createPassword = (characters, passswordLength) => {
  let result = "";
  for (let i = 0; i < passswordLength; i++) {
     const characterIndex = Math.round(Math.random() * characters.length)
     result += characters.charAt(characterIndex)
  }
  return result;
 }

 
  return (
    <View>
      <Text>
      Welcome to Password Generator App!
      </Text>
    </View>
  )
}

export default App