import React from "react";
import {View, Text, StyleSheet} from "react-native";
import {Colors, Typography, Spacing, Radius, Shadows} from "@/theme";

interface SummaryCardProps{
    title: string;
    summary: string;
}

export default function SummaryCard({
    title,
    summary,
}: SummaryCardProps){
    return(
        <View style={styles.container}> 
            <Text style={styles.badge}>📝 AI SUMMARY</Text>

            <Text style={styles.title}>{title}</Text>

            <Text style={styles.summary}>{summary}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        borderRadius: Radius.lg,
        padding: Spacing.xl,
        marginVertical: Spacing.md,
        ...Shadows.card,
    },

    badge: {
        fontSize: 13,
        color: Colors.primary,
        fontWeight: "700",
        marginBottom: Spacing.sm,
    },
    title:{
        ...Typography.h2,
        color: Colors.text,
        marginBottom: Spacing.md,

    },
    summary:{
        ...Typography.body,
        color: Colors.textSecondary,
        lineHeight: 24,
    },
});