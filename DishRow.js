import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import tw from "tailwind-react-native-classnames";
import Currency from "react-currency-formatter";
import { urlFor } from "./sanity";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketItemsWithId } from "./features/basketSlice";
import { useSelector } from "react-redux";

const DishRow = (props) => {
  const { id, name, description, price, image } = props;
  const [isPressed, setIsPresses] = useState(false);
  const dispatch=useDispatch();

  const items=useSelector(state=>selectBasketItemsWithId(state,id));

const addItemToBasket=()=>{
    dispatch(addToBasket({id,name,description,price,image}));
}
const removeItemFromBasket=()=>{
if(!items.length >0) return;

    dispatch(removeFromBasket({id}));
}
  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPresses(!isPressed)}
        style={tw`bg-white border p-4 border-gray-200 ${isPressed && 'border-b-0'}`}
      >
        <View style={tw`flex-row`}>
          <View style={tw`flex-1 pr-2`}>
            <Text style={tw`text-lg mb-1`}>{name}</Text>
            <Text style={tw`text-gray-400`}>{description}</Text>
            <Text style={tw`text-gray-400 mt-2`}>
              <Currency quantity={price} currency="EUR" />
            </Text>
          </View>

          <View>
            <Image
              source={{
                uri: urlFor(image).url(),
              }}
              style={tw`h-20 w-20 p-4 bg-gray-200`}
            />
          </View>
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View style={tw`bg-white px-4`}>
          <View style={tw`flex-row items-center  pb-3`}>
            <TouchableOpacity  disabled={!items.length} onPress={removeItemFromBasket}>
              <MinusCircleIcon color={items.length > 0 ?'#00CCBB':'gray'} size={40} />
            </TouchableOpacity>
            <Text>{items.length}</Text>
            <TouchableOpacity  onPress={addItemToBasket}>
              <PlusCircleIcon size={40} color="#00CCBB"/>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
