import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import sanityClient from "../sanity";

import {
  AdjustmentsIcon,
  SearchIcon,
  SparklesIcon as SparklesIconOutline,
  UserIcon,
} from "react-native-heroicons/outline";
import { ChevronDownIcon } from "react-native-heroicons/outline";
import Categories from "../Categories";
import FeaturedRow from "../FeaturedRow";

const HomeScreen = () => {
  const navigation = useNavigation();

  const [featuredCategories, setFeaturedCategories] = useState([]);

  // to remove the header// when ui loads//
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  //use Effect works when components load//
  useEffect(() => {
    sanityClient
      .fetch(
        `
*[_type =="featured"]{
  
    ...,
    
    restaurants[]->{
      ...,
      dishes[]->,
 
    }
  }
  

`
      ).then((data) => {
        setFeaturedCategories(data);
      });
  }, []);
 

  return (
    <SafeAreaView className="bg-white pt-5">
      <Text>
        <View className="flex-row pb-3 mx-4 space-x-2 items-center px-4">
          <Image
            source={{
              uri: "https://links.papareact.com/wru",
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />

          <View className="flex-1">
            <Text className="font-bold text-gray-400 text-xs">Deliver Now</Text>
            <Text className="font-bold text-xl">
              Current Location
              <ChevronDownIcon size={20} color="#00CCBB" />
            </Text>
          </View>

          <UserIcon size={35} color="#00CCBB" />
        </View>

        <View className="flex-row items-center space-x-2 pb-2 mx-4 px-4">
          <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
            <SearchIcon />
            <TextInput
              placeholder="Restaurants and Cuisines"
              keyboardType="default"
            />
          </View>
          <AdjustmentsIcon color="#00CCBB" />
        </View>
      </Text>
      {/* body */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {/* categories */}
        <Categories />

        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
