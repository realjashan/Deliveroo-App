import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "tailwind-react-native-classnames";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
import sanityClient from "./sanity";

const FeaturedRow = (props) => {
  const [restaurants,setRestaurants] = useState([]);

  const { id, title, description, featuredCategory } = props;

  useEffect(() => {
    sanityClient
      .fetch(
        `
  *[_type =="featured" && _id==$id]{
  
    ...,
    
    restaurants[]->{
      ...,
      dishes[]->,
      type->{
        name
      }
 
    }
  }[0]
 
  
  `,
        { id }
      )
      .then((data) => {
        setRestaurants(data?.restaurants);
      });
  }, [id]);

 
  return (
    <View>
      <View style={tw`mt-4 px-4 flex-row justify-between items-center`}>
        <Text style={tw`font-bold text-lg`}>{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>

      <Text style={tw`text-xs px-4 text-gray-500`}>{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        style={tw`pt-4`}
      >

{restaurants?.map((restaurant)=>(
       <RestaurantCard
       key={restaurant._id}
       id={restaurant._id}
       imgUrl={restaurant.image}
       title={restaurant.name}
       rating={restaurant.rating}
       genre={restaurant.type?.name}
       address={restaurant.address}
       short_description={restaurant.short_description}
       dishes={restaurant.dishes}
       long={restaurant.long}
       lat={restaurant.lat}

       
     />

 

   
))}


 
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
