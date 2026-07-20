import React from "react";

import {
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";

import {
  Colors,
  Typography,
  Spacing,
  Radius,
  Shadows,
} from "@/theme";


interface NodeProps {
  title: string;
  description?: string;
}


function MindNode({
  title,
  description,
}: NodeProps) {

  return (
    <View style={styles.node}>

      <Text style={styles.nodeTitle}>
        {title}
      </Text>

      {
        description &&
        <Text style={styles.nodeDescription}>
          {description}
        </Text>
      }

    </View>
  );
}



export default function MindMapScreen() {


  return (

    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

      <Text style={styles.heading}>
        🗺 AI Mind Map
      </Text>


      <Text style={styles.subtitle}>
        Visual representation of your video concepts
      </Text>



      {/* Main Topic */}

      <View style={styles.centerContainer}>

        <MindNode
          title="React Hooks"
          description="Main Concept"
        />

      </View>



      {/* Connection Line */}

      <View style={styles.line}/>



      {/* Child Nodes */}

      <View style={styles.row}>


        <MindNode
          title="useState"
          description="Manage State"
        />


        <MindNode
          title="useEffect"
          description="Side Effects"
        />


      </View>



      <View style={styles.line}/>



      <View style={styles.row}>


        <MindNode
          title="useMemo"
          description="Optimization"
        />


        <MindNode
          title="Custom Hooks"
          description="Reusable Logic"
        />


      </View>



      <View style={styles.section}>

        <Text style={styles.sectionTitle}>
          AI Generated Structure
        </Text>


        <Text style={styles.text}>
          • Main Topic
        </Text>

        <Text style={styles.text}>
          • Important Concepts
        </Text>

        <Text style={styles.text}>
          • Relationships
        </Text>


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


heading:{
...Typography.h2,
marginTop:50,
color:Colors.text
},


subtitle:{
...Typography.body,
marginTop:10,
marginBottom:30,
color:Colors.textSecondary
},


centerContainer:{
alignItems:"center"
},


row:{
flexDirection:"row",
justifyContent:"space-around",
marginVertical:20
},


node:{
backgroundColor:Colors.white,
width:140,
minHeight:90,
borderRadius:Radius.lg,
padding:15,
justifyContent:"center",
alignItems:"center",
...Shadows.card
},


nodeTitle:{
fontSize:17,
fontWeight:"700",
color:Colors.primary,
textAlign:"center"
},


nodeDescription:{
fontSize:12,
marginTop:8,
color:Colors.textSecondary,
textAlign:"center"
},


line:{
height:40,
width:2,
backgroundColor:Colors.primary,
alignSelf:"center"
},


section:{
marginTop:30,
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


text:{
...Typography.body,
marginBottom:8,
color:Colors.textSecondary
}


});