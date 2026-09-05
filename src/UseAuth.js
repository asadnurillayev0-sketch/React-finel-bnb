import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuth = create()(
    persist((set) => (
        ({
            accesToken: null,
            user: null,
            setAccesToken: (token) =>
                set((state) => ({ ...state, accesToken: token })),
            setUser: (user) => set((state) => ({ ...state, user })),
            
        })
    ),
        { name: 'auth' }
    ),
)
