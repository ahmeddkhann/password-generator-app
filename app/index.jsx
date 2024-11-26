import { View, Text } from 'react-native'
import React, {useState} from 'react'
import * as Yup from "yup"
import { Formik } from 'formik'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { SafeAreaView } from 'react-native-safe-area-context';

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

const generatePassword = (passswordLength) => {
  let charactersList = "";

  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numbersChars = "1234567890";
  const symbolsChars = "!@#$%^&*()_+"

  if (uppercase){
    charactersList += uppercaseChars
  }
  if (lowercase){
    charactersList += lowercaseChars
  }
  if (symbols){
    charactersList += symbolsChars
  }
  if (numbers){
    charactersList += numbersChars
  }
  const password = createPassword(charactersList, passswordLength)
  setPassword(password);
  setIsPasswordGenerated(true);

}

const resetPassword = () => {
  setIsPasswordGenerated(false)
  setPassword("")
  setLowercase(true)
  setNumbers(false)
  setSymbols(false)
  setUppercase(false)
}
 
  return (
    <SafeAreaView>
      <View>
        <Text> Welcome to Password Generator App</Text>
      </View>
    </SafeAreaView>
  )
}

export default App