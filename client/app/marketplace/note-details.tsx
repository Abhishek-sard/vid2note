import React from "react";

import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

import {
  useLocalSearchParams,
  router,
} from "expo-router";


import {
  Colors,
  Typography,
  Spacing,
  Radius,
  Shadows,
} from "@/theme";



export default function MarketplaceNoteDetails() {


  const { id } = useLocalSearchParams();



  // Temporary data
  // Later this will come from backend API

  const note = {

    title:
      "Complete React Hooks Notes",

    description:
      "Detailed AI generated notes covering React Hooks, examples, and interview questions.",


    creator:
      "Abhishek",

    price:
      "Rs. 199",


    pages:
      25,


    downloads:
      120


  };




  const buyNote = () => {


    Alert.alert(
      "Purchase",
      "Payment integration coming soon."
    );


  };




  return (

    <ScrollView

      style={styles.container}

      showsVerticalScrollIndicator={false}

    >



      <TouchableOpacity

        onPress={() =>
          router.back()
        }

      >

        <Text style={styles.back}>
          ← Back
        </Text>

      </TouchableOpacity>





      <View style={styles.headerCard}>


        <Text style={styles.title}>
          📘 {note.title}
        </Text>
        {id ? (
          <Text style={styles.noteId}>
            Note ID: {id}
          </Text>
        ) : null}


        <Text style={styles.creator}>
          Created by {note.creator}
        </Text>



        <Text style={styles.description}>
          {note.description}
        </Text>


      </View>







      <View style={styles.infoContainer}>


        <View style={styles.infoBox}>

          <Text style={styles.infoNumber}>
            {note.pages}
          </Text>

          <Text style={styles.infoLabel}>
            Pages
          </Text>

        </View>




        <View style={styles.infoBox}>

          <Text style={styles.infoNumber}>
            {note.downloads}
          </Text>

          <Text style={styles.infoLabel}>
            Downloads
          </Text>

        </View>





        <View style={styles.infoBox}>

          <Text style={styles.infoNumber}>
            ⭐ 4.8
          </Text>

          <Text style={styles.infoLabel}>
            Rating
          </Text>

        </View>



      </View>








      <View style={styles.previewCard}>


        <Text style={styles.sectionTitle}>
          Preview
        </Text>


        <Text style={styles.previewText}>
          • Introduction to React Hooks
        </Text>


        <Text style={styles.previewText}>
          • useState explanation
        </Text>


        <Text style={styles.previewText}>
          • useEffect examples
        </Text>


        <Text style={styles.previewText}>
          • Interview Questions
        </Text>


      </View>









      <View style={styles.priceCard}>


        <Text style={styles.price}>
          {note.price}
        </Text>



        <TouchableOpacity

          style={styles.buyButton}

          onPress={buyNote}

        >

          <Text style={styles.buyText}>
            Buy Notes
          </Text>


        </TouchableOpacity>



      </View>





    </ScrollView>

  );

}






const styles = StyleSheet.create({

container:{

flex:1,

backgroundColor:Colors.background,

padding:Spacing.lg

},



back:{

marginTop:45,

fontSize:16,

color:Colors.primary,

marginBottom:20

},



headerCard:{

backgroundColor:Colors.white,

padding:20,

borderRadius:Radius.lg,

...Shadows.card

},



title:{

...Typography.h2,

color:Colors.text

},



creator:{

marginTop:10,

color:Colors.primary,

fontWeight:"600"

},



description:{

marginTop:15,

color:Colors.textSecondary,

lineHeight:22

},




infoContainer:{

flexDirection:"row",

justifyContent:"space-between",

marginVertical:20

},




infoBox:{

backgroundColor:Colors.white,

padding:15,

borderRadius:Radius.md,

alignItems:"center",

width:"31%",

...Shadows.card

},



infoNumber:{

fontSize:18,

fontWeight:"700",

color:Colors.primary

},



infoLabel:{

marginTop:5,

fontSize:12,

color:Colors.textSecondary

},





previewCard:{

backgroundColor:Colors.white,

padding:20,

borderRadius:Radius.lg,

...Shadows.card

},



sectionTitle:{

...Typography.h3,

marginBottom:15,

color:Colors.text

},



previewText:{

marginBottom:10,

color:Colors.textSecondary

},





priceCard:{

marginTop:25,

backgroundColor:Colors.white,

padding:20,

borderRadius:Radius.lg,

alignItems:"center",

...Shadows.card

},



price:{

fontSize:28,

fontWeight:"800",

color:Colors.primary

},



buyButton:{

marginTop:15,

backgroundColor:Colors.primary,

paddingVertical:15,

paddingHorizontal:60,

borderRadius:Radius.md

},



buyText:{

color:"#fff",

fontWeight:"700",

fontSize:16

}



});