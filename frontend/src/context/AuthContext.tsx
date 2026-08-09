"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type User = {
  name: string;
  email: string;
  role: "alumni" | "employer" | "admin";
};

type ProfileData = {
  fullName: string;
  headline: string;
  degree: string;
  cgpa: string;
  skills: string;
  bio: string;
};

const defaultProfile: ProfileData = {
  fullName: "NSU Graduate Alumnus",
  headline: "NSU alumni seeking AI-driven career growth opportunities",
  degree: "BSc in Computer Science & Engineering",
  cgpa: "3.84",
  skills: "React.js, Next.js, TypeScript, Python, FastAPI, UI/UX",
  bio: "Computer Science graduate with a passion for building trustworthy software systems, micro-services, and AI-driven platforms.",
};

type AuthContextValue = {
  user: User | null;
  profile: ProfileData;
  login: (payload: User) => void;
  logout: () => void;
  updateProfile: (data: ProfileData) => void;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  profile: defaultProfile,
  login: () => {},
  logout: () => {},
  updateProfile: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);

  useEffect(() => {
    const storedUser = window.localStorage.getItem("careerSetuUser");
    const storedProfile = window.localStorage.getItem("careerSetuProfile");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

  const login = (payload: User) => {
    setUser(payload);
    window.localStorage.setItem("careerSetuUser", JSON.stringify(payload));
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem("careerSetuUser");
  };

  const updateProfile = (data: ProfileData) => {
    setProfile(data);
    window.localStorage.setItem("careerSetuProfile", JSON.stringify(data));
  };

  const value = useMemo(
    () => ({ user, profile, login, logout, updateProfile }),
    [user, profile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
