"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { User, UserProfile } from "@/types";

const DEFAULT_PROFILE: UserProfile = {
  fullName: "Tanvir Ahmed",
  headline: "Full Stack Engineer & NSU CSE Alumnus",
  degree: "B.S. in Computer Science & Engineering",
  department: "Computer Science & Engineering",
  cgpa: "3.84",
  batch: "20th Convocation",
  skills: "Python, FastAPI, Next.js, React, TypeScript, PostgreSQL, Docker, Redis",
  bio: "NSU CSE graduate passionate about building robust web platforms, microservices, and AI-driven applications.",
};

interface AuthContextType {
  user: User | null;
  profile: UserProfile;
  token: string | null;
  isLoading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: DEFAULT_PROFILE,
  token: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
  updateProfile: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from localStorage on mount (AUD-25)
  useEffect(() => {
    try {
      const storedUser = window.localStorage.getItem("careerSetuUser");
      const storedToken = window.localStorage.getItem("careerSetuToken");
      const storedProfile = window.localStorage.getItem("careerSetuProfile");

      if (storedUser && storedToken) {
        const parsedUser = JSON.parse(storedUser) as User;
        setUser(parsedUser);
        setToken(storedToken);

        if (storedProfile) {
          setProfile(JSON.parse(storedProfile) as UserProfile);
        } else {
          setProfile((prev) => ({
            ...prev,
            fullName: parsedUser.fullName || prev.fullName,
            department: parsedUser.department || prev.department,
          }));
        }
      }
    } catch {
      // Corrupted localStorage — clear safely (AUD-25)
      window.localStorage.removeItem("careerSetuUser");
      window.localStorage.removeItem("careerSetuToken");
      window.localStorage.removeItem("careerSetuProfile");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback((userData: User, accessToken: string) => {
    setUser(userData);
    setToken(accessToken);
    setProfile((prev) => {
      const updated = {
        ...prev,
        fullName: userData.fullName || prev.fullName,
        department: userData.department || prev.department,
      };
      try {
        window.localStorage.setItem("careerSetuProfile", JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save profile:", e);
      }
      return updated;
    });

    try {
      window.localStorage.setItem("careerSetuUser", JSON.stringify(userData));
      window.localStorage.setItem("careerSetuToken", accessToken);
    } catch (e) {
      console.error("Failed to save user session:", e);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    try {
      window.localStorage.removeItem("careerSetuUser");
      window.localStorage.removeItem("careerSetuToken");
      window.localStorage.removeItem("careerSetuProfile");
    } catch (e) {
      console.error("Failed to clear user session:", e);
    }
  }, []);

  const updateProfile = useCallback((data: Partial<UserProfile>) => {
    setProfile((prev) => {
      const updated = { ...prev, ...data };
      try {
        window.localStorage.setItem("careerSetuProfile", JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to update profile in localStorage:", e);
      }
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, token, isLoading, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
