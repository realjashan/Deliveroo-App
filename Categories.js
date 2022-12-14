import { ScrollView, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'
import FeaturedRow from './FeaturedRow'
import  sanityClient, { urlFor }  from './sanity'
 

const Categories = () => {

const [categories, setCategories] = useState([]);

useEffect(() => {
 sanityClient.fetch(`
 *[_type =="category" ]
 
 `).then((data)=>{
  setCategories(data);
 })
}, [])


  return (
  <ScrollView horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={{
    paddingHorizontal:15,
    paddingTop:10
  }}
  >

{categories.map((category)=>(
  <CategoryCard imgUrl={urlFor(category.image).url()} title={category.name} key={category._id}/>

))

}


 


{/* featured row */}

 
 

 

  </ScrollView>
  )
}

export default Categories

 