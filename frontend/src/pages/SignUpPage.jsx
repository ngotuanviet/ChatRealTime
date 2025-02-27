import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";



const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });
    const { signup, isSigningUp } = useAuthStore();
    const validateForm = () => {
        if (!formData.fullName.trim()) return toast.error("Bắt buộc nhập tên");
        if (!formData.email.trim()) return toast.error("Bắt buộc nhập email");
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Sai định dạng email!");
        if (!formData.password.trim()) return toast.error("Bắt buộc nhập mật khẩu")
        if (formData.password.length <= 6) return toast.error("Mật khẩu phải đặt tối thiểu 6 kí tự")
        return true
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const success = validateForm();
        if (success === true) signup(formData)
    };
    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* left side */}
            <div className="flex flex-col justify-center items-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <MessageSquare className="size-6 text-primary"></MessageSquare>
                            </div>
                            <h1 className="text-2xl fort-bold mt-2">Tạo tài khoản</h1>
                            <p className="text-base-content/60">Bắt đầu với tài khoản miễn phí của bạn</p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Họ và tên</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="size-5 text-base-content/40" />
                                </div>
                                <input type="text" className={`input input-bordered w-full pl-10`}
                                    placeholder="Nhập họ và tên"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="size-5 text-base-content/40" />
                                </div>
                                <input type="email" className={`input input-bordered w-full pl-10`}
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Mật khẩu</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="size-5 text-base-content/40" />
                                </div>
                                <input type={showPassword ? "text" : "password"} className={`input input-bordered w-full pl-10`}
                                    placeholder="********"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}>
                                    {
                                        showPassword ? (<EyeOff className="size-5 text-base-content/40" />) :
                                            (
                                                <Eye className="size-5 text-content/40" />
                                            )
                                    }
                                </button>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
                            {isSigningUp ? (<>
                                <Loader2 className="size-5 animate-spin" />
                                loading...
                            </>) : (
                                "Tạo tài khoản"
                            )}
                        </button>
                    </form>
                    <div className="text-center">
                        <p className="text-base-content/60">
                            Bạn đã có tài khoản?{" "}
                            <Link to="/login" className=" link-primary ">
                                Đăng nhập
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            {/* right side */}

            <AuthImagePattern title="Gia nhập cộng đồng"
                subtitle="Kết nối với bạn bè, chia sẻ thông tin"
            />

        </div>
    )
}

export default SignUpPage
