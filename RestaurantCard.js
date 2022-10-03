import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { StarIcon } from "react-native-heroicons/solid";
import { LocationMarkerIcon } from "react-native-heroicons/outline";
import { urlFor } from "./sanity";
import { useNavigation } from "@react-navigation/native";

const RestaurantCard = (props) => {
  const {
    id,
    imgUrl,
    title,
    rating,
    genre,
    address,
    short_description,
    dishes,
    long,
    lat,
  } = props;



  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {

        //sending props via url to restaurant screen//
        navigation.navigate("Restaurant", {
          id,
          imgUrl,
          title,
          rating,
          genre,
          address,
          short_description,
          dishes,
          long,
          lat,

        });
      }}

   
      style={tw`bg-white mr-3 shadow`}
    >
      <Image
        source={{
          uri: urlFor(imgUrl).url(),
        }}
        style={tw`h-36 w-64 rounded-sm`}
      />

      <View style={tw`px-3 pb-4`}>
        <Text style={tw`text-lg font-bold pt-2`}>{title}</Text>

        <View style={tw`flex-row items-center ml-1`}>
          <StarIcon color="green" opacity={0.5}></StarIcon>

          <Text style={tw`text-xs text-gray-500`}>
            <Text style={tw`text-green-500`}>{rating}</Text>-{genre}
          </Text>
        </View>

        <View style={tw`flex-row items-center ml-1`}>
          <LocationMarkerIcon color="gray" opacity={0.4} size={22} />
          <Text style={tw`text-xs text-gray-500`}>Nearby -{address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
