import { supabase, storageURL } from "./config";
import { useState, useEffect } from "react";

export const userStore = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        setAvatarList();
        let userData = supabase.auth.user();

        const fetchProfile = async (data) => setUser(await getProfile(data.id));

        userData && fetchProfile(userData);

        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (session?.user) {
                    setUser(await getProfile(session.user.id));
                } else {
                    setUser(null);
                }
            }
        );
        return () => {
            authListener.unsubscribe();
        };
    }, []);

    return { user };
};

/* Auth Functions */

const generator = () =>
    Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);

// Sign Up
export const signUp = async ({ username, email }) => {
    let pass = generator();

    let avatar = avatarList[(avatarList.length * Math.random()) | 0];

    let { data: usernames } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", username);

    if (usernames.length !== 0) {
        return { message: `Username ${username} Not available.` };
    }

    const { error } = await supabase.auth.signUp(
        {
            email: email,
            password: pass,
        },
        {
            data: {
                username: username,
                avatar: avatar,
            },
        }
    );

    if (error) return error;
};

// Sign In
export const signIn = async ({ email }) => {
    let { error } = await supabase.auth.signIn({ email });

    if (error) return error;
};

// Sign Out
export const signOut = async () => {
    let { error } = await supabase.auth.signOut();
    if (error) return error;
};

// Get User Profile
export const getProfile = async (id) => {
    let { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id);
    if (!error) return data[0];
};

/* Storage Functions */

// Get List of Avatars
const avatarList = [];
export const setAvatarList = async () => {
    let { data: allFiles, error } = await supabase.storage
        .from("avatars")
        .list("avatars");

    if (!error) {
        allFiles.map((img) => avatarList.push(storageURL + img.name));
    }
};

// Change Avatar
export const setRandomAvatar = async (currentAvatar) => {
    let avatar = avatarList.filter((avatar) => avatar !== currentAvatar)[
        (avatarList.length * Math.random()) | 0
    ];

    let { error: err1 } = await supabase
        .from("profiles")
        .update({ avatar: avatar });

    if (err1) return err1;

    let { error: err2 } = await supabase
        .from("messages")
        .update({ avatar: avatar });

    if (err2) return err2;

    return avatar;
};
