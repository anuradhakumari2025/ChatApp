import { toast } from "react-toastify";
import { supabase } from "../config/supabaseClient";

// Sign-up Function
export const signup = async (username, email, password) => {
  try {
    // Sign up the user
    const { data: user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    // Save user details in the database
    const { error: userError } = await supabase.from('users').insert([
      {
        id: user.user.id,
        username: username.toLowerCase(),
        email,
        name: '',
        avatar: '',
        bio: 'Hey, There I am using chat app',
        lastSeen: new Date().toISOString(),
      },
    ]);

    if (userError) throw userError;

    // Initialize an empty chat for the user
    const { error: chatError } = await supabase.from('chats').insert([
      {
        user_id: user.user.id,
        chatdata: [], // Empty chat data array
      },
    ]);

    if (chatError) throw chatError;

    console.log('User signed up successfully!');
    toast.success('Signup successful!');
  } catch (error) {
    console.error('Signup error:', error.message);
    toast.error(error.message);
  }
};

// Login Function
export const login = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data.user;
  } catch (error) {
    console.error("Login failed:", error);
    toast.error('Invalid Credentials');
    return null;
  }
};

// Logout Function
export const logOut = async () => {
  try {
    await supabase.auth.signOut();
    // console.log("Logged out successfully");
  } catch (error) {
    console.error("Logout failed:", error);
    toast.error(error.message)
  }
};

// Get Current User
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();
  if (error) {
    console.error("Failed to fetch user data:", error.message);
    return null;
  }
  return data;
};

export const setupAuthListener = (setUser) => {
  // Listen for auth state changes
  const authListener = supabase.auth.onAuthStateChange((event, session) => {
    // console.log('Auth event:', event);  // e.g., 'SIGNED_IN', 'SIGNED_OUT'
    // console.log('Session:', session);   // User session data

    if (event === 'SIGNED_IN') {
      // console.log('User signed in:', session.user);
      setUser(session.user);  // Update the user state in your app
    } else if (event === 'SIGNED_OUT') {
      // console.log('User signed out');
      setUser(null);  // Set user state to null
    }
  });

  // Return the unsubscribe function directly
  return authListener.unsubscribe;
};
