import React from "react";
import{
    ScrollView,
    StyleSheet,
    Text,
}from "react-native";

import MCQCard, {
    MCQ,
} from "@/components/notes/MCQCard";
import{
    Colors,
    Typography,
    Spacing,
} from "@/theme";

const demoQuestions: MCQ[] = [
    {
        question:
        "Which Hook manages state in React?",
        options:[
            "useMemo",
            "useState",
            "useEffect",
            "useRef",
        ],
        correctAnswer: "useState",
    },
    {
        question:
        "Binary Search requires the array to be?",
        options:[
            "Random",
            "Sorted",
            "Circular",
            "Linked",
        ],
        correctAnswer: "Sorted",
    },

    {
        question:
        "Which company created React?",
        options:[
            "Google",
            "Apple",
            "Meta",
            "Amazon",
        ],
        correctAnswer: "Meta",
    },
];

export default function MCQScreen(){
    return(
        <ScrollView
        style={StyleSheet.container}
        showsVerticalScrollIndicator={false}>
            <Text style={StyleSheet.title}>
                AI Practice Quiz
            </Text>

            <Text style={styles.subtitle}>
                Test your understanding.
            </Text>

            {demoQuestions.map((item, index) => (
                <MCQCard
                key={index}
                data={item}
                />
            ))}

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
         flex:1,
        backgroundColor: Colors.background,
        padding: Spacing.lg,

    }, 
    title:{
        ...Typography.h2,
        marginTop: 50,
        color: Colors.text,
    },
    subtitle:{
        ...Typography.body,
        marginBottom: 20,
        color: Colors.textSecondary,
    },
       
    
});