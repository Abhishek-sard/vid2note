import React from "react";
import {View, Text, StyleSheet} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {Colors, Typography} from "@/theme";

interface GreetingCardProps{
    username?:string;
}

export default function GreetingCard({
    username = "Abhishek",

}: GreetingCardProps){
    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>👋 Welcome Back</Text>

                <Text style={styles.username}>{username}</Text>

                <Text style={styles.subtitle}>
                    Turn Videos into AI-Powered study notes.
                </Text>
            </View>

            <View style={styles.avatar}>
                <Ionicons name="person" size={30} color={Colors.white}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 45,
        marginBottom: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    greeting: {
        ...Typography.body,
        color: Colors.textSecondary,
    },

    username: {
        ...Typography.h2,
        color: Colors.text,
        marginTop:5,
    },
    subtitle:{
        marginTop: 5,
        color: Colors.textSecondary,
    },
    avatar:{
        width: 55,
        height: 55,
        borderRadius: 30,
        backgroundColor: Colors.primary,
        justifyContent: "center",
        alignContent: "center",
    },
});