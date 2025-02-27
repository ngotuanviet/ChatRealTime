import { create } from "zustand"
import { axiosImstance } from "../lib/axios.js"
import toast from "react-hot-toast";
import { io } from "socket.io-client";


const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";
export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIng: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,
    checkAuth: async () => {
        try {
            const res = await axiosImstance.get("/auth/check")
            set({ authUser: res.data })
            get().connectSocket();
        } catch (error) {
            console.log("Error in checkAuth", error)
            set({ authUser: null })
        }
        finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosImstance.post("/auth/signup", data)
            toast.success("Tạo tài khoản thành công")
            set({ authUser: res.data })
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("error useAuthStore Sign Up" + error)
        } finally {
            set({ isSigningUp: false });
        }
    },
    logout: async () => {
        try {
            await axiosImstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Đăng xuất thành công");
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    login: async (data) => {
        set({ isLoggingIng: true });
        try {
            const res = await axiosImstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Đăng nhập thành công");
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggingIng: false })
        }
    },
    updateProfile: async (data) => {
        set({ isUpdatingProfile: true })
        try {
            const res = await axiosImstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Hồ sơ cập nhập thành công");

        } catch (error) {
            console.log("error in update profile: ", error);
            toast.error(error.response.data.message)
        } finally {
            set({ isUpdatingProfile: false })
        }
    },
    connectSocket: () => {
        const { authUser } = get()
        if (!authUser || get().socket?.connected) return;
        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            },

        })
        socket.connect();
        set({ socket: socket })
        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds })
        })
    },
    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    }
}));