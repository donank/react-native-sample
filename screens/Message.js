import React, { useEffect, useState, useCallback } from "react";
import { SafeAreaView, Image, StyleSheet, Text, View } from "react-native";
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat'

//https://heartbeat.fritz.ai/chat-app-with-react-native-part-4-create-chat-ui-screens-with-react-native-gifted-chat-7ef428a60d30

const Message = ({ navigation, route }) => {
    const [messages, setMessages] = useState([]);
    const { pfpurl, name } = route.params

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: name,
                    avatar: pfpurl,
                },
            },
        ])
    }, [])

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#549287'
                    }
                }}
                textStyle={{
                    right: {
                        color: '#fff'
                    }
                }}
            />
        );
    }

    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View style={{justifyContent: 'center', alignItems: 'center', padding: 10}}>
                    <Text style={{ color: '#549287', fontSize: 20 }}>Send</Text>
                </View>
            </Send>
        );
    }

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.giftedChatContainer}>
                <GiftedChat
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: 1,
                        avatar: pfpurl,
                    }}
                    renderBubble={renderBubble}
                    showUserAvatar
                    alwaysShowSend
                    renderSend={renderSend}
                    
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    giftedChatContainer: {
        flex: 1,
        marginTop: 40,
        marginBottom: 10
    }
});

export { Message };