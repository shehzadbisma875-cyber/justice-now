import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// 1. Supabase Initialization
const SUPABASE_URL = 'https://nijpkyhlhmpggcimcxqr.supabase.co/auth/v1/callback'; // یہاں اپنا Supabase URL ڈالیں
const SUPABASE_ANON_KEY = 'sb_publishable_7J3qDUVInQNMdCXSy3GDsw_yN7rA5w-'; // یہاں اپنا Supabase Anon Key ڈالیں

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 2. Sign Up (ای میل اور پاس ورڈ سے نیا اکاؤنٹ بنانا)
export async function signUpUser(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    alert("Sign Up Error: " + error.message);
    return null;
  }
  alert("Sign up successful! Check your email for verification.");
  return data;
}

// 3. Sign In (ای میل اور پاس ورڈ سے لاگ ان کرنا)
export async function signInUser(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    alert("Login Error: " + error.message);
    return null;
  }
  alert("Login successful!");
  return data;
}

// 4. Google Sign-In (گوگل کے ذریعے لاگ ان کرنا)
export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin // لاگ ان کے بعد واپس اسی ویب سائٹ پر ری ڈائریکٹ کرے گا
    }
  });

  if (error) {
    alert("Google Sign-In Error: " + error.message);
    return null;
  }
  return data;
}

// 5. Forgot Password (پاس ورڈ ری سیٹ ای میل بھیجنا)
export async function resetPassword(email) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password.html`, // جہاں صارف نیا پاس ورڈ سیٹ کرے گا
  });

  if (error) {
    alert("Password Reset Error: " + error.message);
    return null;
  }
  alert("Password reset link sent to your email!");
  return data;
}

// 6. Sign Out (لاگ آؤٹ کرنا)
export async function signOutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    alert("Sign Out Error: " + error.message);
  } else {
    alert("Signed out successfully!");
  }
}