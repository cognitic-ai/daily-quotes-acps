import { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Pressable,
  useColorScheme,
} from "react-native";
import * as Haptics from "expo-haptics";
import * as AC from "@bacons/apple-colors";

const QUOTES = [
  {
    id: 1,
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    id: 2,
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
  },
  {
    id: 3,
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
  },
  {
    id: 4,
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    id: 5,
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
  },
  {
    id: 6,
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
  },
  {
    id: 7,
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
  },
  {
    id: 8,
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
];

export default function IndexRoute() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);
  const colorScheme = useColorScheme();

  const currentQuote = QUOTES[currentIndex];
  const isFavorite = favorites.includes(currentQuote.id);

  const handleNext = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCurrentIndex((prev) => (prev + 1) % QUOTES.length);
  };

  const handlePrevious = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCurrentIndex((prev) => (prev - 1 + QUOTES.length) % QUOTES.length);
  };

  const handleToggleFavorite = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setFavorites((prev) =>
      prev.includes(currentQuote.id)
        ? prev.filter((id) => id !== currentQuote.id)
        : [...prev, currentQuote.id]
    );
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{
        flex: 1,
        backgroundColor: AC.systemBackground as any,
      }}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 24,
          paddingTop: 60,
          paddingBottom: 40,
          gap: 32,
          minHeight: 600,
        }}
      >
        <View
          style={{
            backgroundColor: AC.secondarySystemBackground as any,
            borderRadius: 24,
            borderCurve: "continuous",
            padding: 32,
            gap: 24,
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            minHeight: 300,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 28,
              lineHeight: 38,
              fontWeight: "500",
              color: AC.label as any,
              textAlign: "center",
            }}
          >
            {currentQuote.text}
          </Text>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: AC.secondaryLabel as any,
              textAlign: "center",
            }}
          >
            — {currentQuote.author}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 12,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pressable
            onPress={handlePrevious}
            style={({ pressed }) => ({
              backgroundColor: pressed
                ? (AC.tertiarySystemBackground as any)
                : (AC.secondarySystemBackground as any),
              width: 64,
              height: 64,
              borderRadius: 32,
              borderCurve: "continuous",
              justifyContent: "center",
              alignItems: "center",
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Text style={{ fontSize: 28, color: AC.systemBlue as any }}>←</Text>
          </Pressable>

          <Pressable
            onPress={handleToggleFavorite}
            style={({ pressed }) => ({
              backgroundColor: isFavorite
                ? (AC.systemRed as any)
                : (AC.secondarySystemBackground as any),
              width: 72,
              height: 72,
              borderRadius: 36,
              borderCurve: "continuous",
              justifyContent: "center",
              alignItems: "center",
              opacity: pressed ? 0.7 : 1,
              boxShadow: isFavorite ? "0 4px 12px rgba(255,59,48,0.3)" : "none",
            })}
          >
            <Text style={{ fontSize: 32 }}>{isFavorite ? "❤️" : "🤍"}</Text>
          </Pressable>

          <Pressable
            onPress={handleNext}
            style={({ pressed }) => ({
              backgroundColor: pressed
                ? (AC.tertiarySystemBackground as any)
                : (AC.secondarySystemBackground as any),
              width: 64,
              height: 64,
              borderRadius: 32,
              borderCurve: "continuous",
              justifyContent: "center",
              alignItems: "center",
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Text style={{ fontSize: 28, color: AC.systemBlue as any }}>→</Text>
          </Pressable>
        </View>

        <View
          style={{
            alignItems: "center",
            gap: 8,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: AC.tertiaryLabel as any,
              fontWeight: "500",
            }}
          >
            {currentIndex + 1} of {QUOTES.length}
          </Text>

          <View
            style={{
              flexDirection: "row",
              gap: 6,
            }}
          >
            {QUOTES.map((_, index) => (
              <View
                key={index}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  borderCurve: "continuous",
                  backgroundColor:
                    index === currentIndex
                      ? (AC.systemBlue as any)
                      : (AC.tertiarySystemFill as any),
                }}
              />
            ))}
          </View>
        </View>

        {favorites.length > 0 && (
          <View
            style={{
              gap: 12,
              marginTop: 16,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                color: AC.label as any,
                paddingHorizontal: 8,
              }}
            >
              Favorites ({favorites.length})
            </Text>

            {QUOTES.filter((q) => favorites.includes(q.id)).map((quote) => (
              <Pressable
                key={quote.id}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setCurrentIndex(QUOTES.findIndex((q) => q.id === quote.id));
                }}
                style={({ pressed }) => ({
                  backgroundColor: AC.secondarySystemBackground as any,
                  borderRadius: 16,
                  borderCurve: "continuous",
                  padding: 16,
                  gap: 8,
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: AC.label as any,
                    fontWeight: "500",
                  }}
                  numberOfLines={2}
                >
                  {quote.text}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: AC.secondaryLabel as any,
                  }}
                >
                  — {quote.author}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
