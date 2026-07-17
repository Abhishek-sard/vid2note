import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import {
    Colors,
    Radius,
    Spacing,
    Typography,
} from "@/theme";
interface HeroProps{
    youtubeUrl: string;
    setYoutubeUrl: (text: string) => void;
    onGenerate: () => void;
    loading: boolean;
}

export default function HeroCard({
    youtubeUrl,
    setYoutubeUrl,
    onGenerate,
    loading,
}: HeroProps) {
    return(
        <View style={styles.card}>
            <Text style={styles.title}>🎥AI Video Notes</Text>

            <Text style={styles.subtitle}>Paste any Youtube link and generate:</Text>

            <Text style={styles.feature}>.Summary</Text>
            <Text style={styles.feature}>.Flashcards</Text>
             <Text style={styles.feature}>.MCQs</Text>
            <Text style={styles.feature}>.Mind Maps</Text>

            <View style={{marginTop:20}}>
                <Input placeholder="Paste YouTube URL..."   value={youtubeUrl}
                onChangeText={setYoutubeUrl}/>

                <Button
                title="Generate Notes"
                loading={loading}
                onPress={onGenerate}
                />
              
            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    card:{
        backgroundColor: Colors.primary,
        borderRadius: Radius.lg,
        padding: Spacing.xl,
    },
    title:{
        ...Typography.h2,
        color: Colors.white,
    },
    subtitle:{
        color: Colors.white,
        marginTop:10,
        marginBottom: 15,
    },
    feature:{
        color: Colors.white,
        marginBottom: 5,
    }
})