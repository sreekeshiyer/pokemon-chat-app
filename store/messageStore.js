import { useState, useEffect } from "react";
import { supabase } from "./config";

export const messageStore = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState(null);

    // Fetch All Messages
    useEffect(() => {
        fetchMessages((messages) => {
            setMessages(messages);
        });
    }, []);

    // Listen to new Messages i.e. Subscribe to INSERTs on the messages table
    useEffect(() => {
        const messageListener = supabase
            .from("messages")
            .on("INSERT", (payload) => setNewMessage(payload.new))
            .subscribe();

        return () => {
            messageListener.unsubscribe();
        };
    }, []);

    // Update Messages on any payload
    useEffect(() => {
        if (newMessage) {
            const handleNewMessage = () => {
                setMessages(messages.concat(newMessage));
            };
            handleNewMessage();
        }
    }, [newMessage]);

    return {
        messages: messages,
    };
};

// Add New Message
export const addMessage = async (user_id, message, username, avatar) => {
    try {
        let { error } = await supabase
            .from("messages")
            .insert([{ user_id, message, username, avatar }]);

        if (error) return error;
    } catch (error) {
        return error;
    }
};

// Fetch All Messages
const fetchMessages = async (setState) => {
    try {
        let { data, error } = await supabase
            .from("messages")
            .select("*")
            .order("created_at", { ascending: true });

        if (error) return error;
        if (setState) setState(data);
        return data;
    } catch (error) {
        return error;
    }
};
