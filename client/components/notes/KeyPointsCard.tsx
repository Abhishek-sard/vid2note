import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import {Colors, Typography, Spacing, Radius, Shadows} from "@/theme";

interface Props{
    points: string[];

}

export default function KeyPointCard({points}: Props){
    return(
        <View style={styles.container}>
            <Text styles={styles.heading}>⭐ Key Points</Text>

            {points.map((point, index) => {
                <View key={index} style={styles.row}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.text}>{point}</Text>
                </View>
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.white,
        borderRadius: Radius.lg,
        padding: Spacing.xl,
        marginVertical: Spacing.md,
        ...Shadows.card,
    },

    heading:{
        flexDirection: "row",
        marginBottom: 12,
    },

    bullet:{
        fontSize: 18,
        color: Colors.primary,
        marginRight: 10,
    },
    text:{
        flex:1,
        ...Typography.body,
        color: Colors.textSecondary,
    },
});