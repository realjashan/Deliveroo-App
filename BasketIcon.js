import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { selectBasketItems, selectBasketTotal } from './features/basketSlice'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import tw from "tailwind-react-native-classnames";
import Currency from 'react-currency-formatter'

const BasketIcon = () => {
const items=useSelector(selectBasketItems);
const navigation=useNavigation();
const basketTotal=useSelector(selectBasketTotal);

if(items.length==0) return null;

  return (
    <View style={tw`absolute bottom-10 z-50 w-full`}>

            <TouchableOpacity onPress={()=>navigation.navigate("Basket")} style={[tw`mx-4 p-4 rounded-lg flex-row items-center`,
        {
            backgroundColor:'#00CCBB'
        }
        ]}>
            
<Text style={tw`bg-green-500 text-white text-lg font-extrabold py-1 px-2`}>{items.length}</Text>
<Text style={tw`font-extrabold flex-1 text-center text-white text-lg`}>View Basket</Text>
<Text style={tw`text-lg text-white font-extrabold`}>
    <Currency quantity={basketTotal} currency='EUR'/>
</Text>
</TouchableOpacity>
 
      
    </View>
  )
}

export default BasketIcon

 
 

 
 