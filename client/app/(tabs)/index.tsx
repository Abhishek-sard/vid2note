import React, { useState } from "react";

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";

import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

import FeatureCard from "@/components/home/FeatureCard";
import RecentVideo from "@/components/home/RecentVideo";

import {
  Colors,
  Typography,
  Spacing,
} from "@/theme";

import { useVideoStore } from "@/store/videoStore";

export default function HomeScreen() {

  const [youtubeUrl, setYoutubeUrl] = useState("");

  const createNotes =
    useVideoStore(
      (state) => state.createNotes
    );

  const loading =
    useVideoStore(
      (state) => state.loading
    );

  const generate = async () => {

    try{

      await createNotes(

        youtubeUrl,

        "Temporary Transcript",

        "YouTube Video"

      );

      Alert.alert(
        "Success",
        "Notes Generated!"
      );

    }catch{

      Alert.alert(
        "Error",
        "Generation Failed"
      );

    }

  };

  return (

    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

      <Text style={styles.greeting}>
        👋 Good Morning
      </Text>

      <Text style={styles.heading}>
        Learn Smarter with AI
      </Text>

      <View style={styles.hero}>

        <Text style={styles.heroTitle}>
          Turn YouTube Videos
        </Text>

        <Text style={styles.heroSubtitle}>
          into summaries,
          flashcards and quizzes
          in seconds.
        </Text>

      </View>

      <Input
        placeholder="Paste YouTube URL..."
        value={youtubeUrl}
        onChangeText={setYoutubeUrl}
      />

      <Button
        title="Generate AI Notes"
        loading={loading}
        onPress={generate}
      />

      <Text style={styles.section}>
        Quick Features
      </Text>

      <View style={styles.grid}>

        <FeatureCard
          icon="📄"
          title="Summary"
          onPress={()=>{}}
        />

        <FeatureCard
          icon="🧠"
          title="Flashcards"
          onPress={()=>{}}
        />

      </View>

      <View style={styles.grid}>

        <FeatureCard
          icon="❓"
          title="MCQs"
          onPress={()=>{}}
        />

        <FeatureCard
          icon="🗺"
          title="Mind Map"
          onPress={()=>{}}
        />

      </View>

      <Text style={styles.section}>
        Recent Notes
      </Text>

      <RecentVideo
        title="Binary Search"
        createdAt="Today"
      />

      <RecentVideo
        title="React Hooks"
        createdAt="Yesterday"
      />

      <RecentVideo
        title="Operating System"
        createdAt="2 Days Ago"
      />

    </ScrollView>

  );

}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:Colors.background,
padding:Spacing.lg
},

greeting:{
...Typography.h3,
marginTop:40
},

heading:{
...Typography.h1,
marginBottom:20
},

hero:{
backgroundColor:Colors.primary,
padding:20,
borderRadius:20,
marginBottom:20
},

heroTitle:{
fontSize:24,
fontWeight:"700",
color:"white"
},

heroSubtitle:{
marginTop:10,
fontSize:16,
color:"white"
},

section:{
...Typography.h3,
marginTop:25,
marginBottom:15
},

grid:{
flexDirection:"row"
}

});