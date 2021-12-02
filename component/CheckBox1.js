import * as React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Checkbox } from 'react-native-paper';


function CheckBox1({ label, status, onPress, checked }) {
  return (
    <TouchableOpacity onPress={onPress}>
      
    <View style={{ flexDirection: 'row', alignItems: 'center' , paddingRight: 50}}>
    <Checkbox
    status={status}
    color='#2e3f6e'
    position='trailing'
    checked={checked}
    />
    <Text>{label}</Text>
    </View>
      
    </TouchableOpacity>
  );
}

export default CheckBox1;
