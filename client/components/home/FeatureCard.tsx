import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import {Colors, Radius, Spacing, Typography, Shadows} from "@/theme";

interface Props{
    icon: string;
    title: string;
    onPress: () => void;
}

export default function FeatureCard({
    icon,
    title,
    onPress,
}: Props){
    return(
        <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={onPress}
        >

        <Text style={styles.icon}>{icon}</Text>

        <Text style={styles.title}>{title}</Text>
       </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card:{
        flex: 1,
        backgroundColor: Colors.white,
        borderRadius: Radius.lg,
        padding: Spacing.lg,
        margin:6,
        alignItems: "center",
        justifyContent: "center",
        minHeight: 120,
        ...Shadows.card,
    },
    icon:{
        fontSize: 40,
        marginBottom: 12,
    },
    title: {
        ...Typography.body,
        fontWeight: "600",
        color: Colors.text,
        textAlign: "center",
    }
});