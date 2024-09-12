import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function Input() {
  const [text, setText] = useState("");
  return (
    <View>
     <TextInput 
        placeholder='Type sth' 
        keyboardType='default' 
        style={{borderBottomColor: 'purple', borderBottomWidth: 2}}
        value={text}
        onChangeText={function (changedText) {
          setText(changedText);
        }}
      />
    </View>
  )
}