import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
} from "react-native";
import Header from "@/components/common/Header";
import Flashcard from "@/components/notes/Flashcard";

import {
    Colors,
    Typography,
    Spacing,
}from "@/theme";
import { useVideoStore } from "@/store/videoStore";

export default function FlashcardScreen(){
    const flashcards = useVideoStore(
        (state) => state.flashcards
    );

    return(
        <ScrollView style={styles.container} showsHorizontalScrollIndicator={false}>
            <Header title="Flashcards"/>

            <Text style={styles.title}>
                AI Generated Flashcards
            </Text>
            {
                flashcards.length > 0 ? (
                    flashcards.map((card, index) => (
                        <Flashcard
                        
                        key={index}
                        question={card.question}
                        answer={card.answer}/>
                    ))
                ):(
                    <>
                    <Flashcard
                    question="What is React?"
                    answer="React is a javascript library used to build user interfaces."
                    />

                    <Flashcard
                    question="What is useState?"
                    answer="A React Hook used to manage component state."
                    />

                    <Flashcard
                    
                    question="What is Binary Search?"
                    answer="A Searching algorithm that works on sorted arrays with 0(log n) components"/>
                    </>
                )
            }

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
           flex: 1,
        backgroundColor: Colors.background,
        padding: Spacing.lg,

    },
     

    title:{
        ...Typography.h2,
        marginVertical: Spacing.lg,
        color: Colors.text,
    },
});