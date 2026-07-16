import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";
import {
    Colors,
    Radius,
    Shadows,
    Spacing,
    Typography,
} from "@/theme";

interface Props{
    title: string;
    createdAt: string;
}

export default function RecentVideo({
    title,
    createdAt,
}: Props){
    return(
        <View style={styles.card}>
            <Text style={styles.title}>
                📘{title}
            </Text>
            <Text style={styles.date}>
                {createdAt}
            </Text>
        </View>
        
    );
}

const styles = StyleSheet.create({
    card:{
        backgroundColor: Colors.white,
        padding: Spacing.lg,
        marginBottom: Spacing.md,
        borderRadius: Radius.lg,
        ...Shadows.card,
    },

    title:{
        ...Typography.body,
        fontWeight: "600",
        color: Colors.text,
    },
    date:{
        marginTop: 5,
        color: Colors.textSecondary,
    },
});