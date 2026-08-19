import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>; // ✅ Ordem arrumada
  logout: () => void;
}

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      isLoggedIn: false,
      login: async (email, password) => {
        const userLocalStorage = localStorage.getItem("accessToken");
        if (userLocalStorage) {
          set({ isLoggedIn: true });
          return; // ✅ Removido o throw error bizarro daqui
        } else {
          const response = (await fetch("/api/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          }).then((res) => res.json())) as { success: boolean };

          if (response.success) {
            localStorage.setItem("accessToken", ":)");
            set({ isLoggedIn: true });
          } else {
            throw new Error("Credenciais inválidas");
          }
        }
      },
      logout: () => {
        set({ isLoggedIn: false });
        localStorage.clear();
      },
    }),
    {
      name: "userLoginStatus",
    }
  )
);

export default useAuthStore;
