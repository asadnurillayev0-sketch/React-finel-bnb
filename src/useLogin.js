import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useLogin = create()(
    persist((set) => (
        ({
            accessToken: null,
            user: null,
            setAccesToken: (token) =>
                 set((state) => ({ ...state, accessToken:token })),
            setUser:(user) => set((state) => ({ ...state, user })),
        })
    ),
    {name: 'loginAuth'}
),
)
