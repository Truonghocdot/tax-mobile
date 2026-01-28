import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, User, Lock, HelpCircle, Share2, Wrench, Fingerprint } from "lucide-react";
import taxEmblem from "@/assets/tax-emblem.png";

const Login = () => {
  const navigate = useNavigate();
  const [taxCode, setTaxCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center px-6 pt-8 pb-8 animate-fade-in min-h-screen">
      {/* Logo */}
      <div className="mb-6">
        <img src={taxEmblem} alt="Thuế Điện Tử" className="w-24 h-24" />
      </div>
      <h1 className="text-primary-foreground text-2xl font-bold mb-8">Thuế Điện Tử</h1>

      {/* Login form */}
      <form onSubmit={handleLogin} className="w-full space-y-4 flex-1">
        {/* Tax code input */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
            <User className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Mã số thuế"
            value={taxCode}
            onChange={(e) => setTaxCode(e.target.value)}
            className="input-field pl-12 bg-card/90 backdrop-blur"
          />
        </div>

        {/* Password input */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Lock className="w-5 h-5" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field pl-12 pr-12 bg-card/90 backdrop-blur"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        {/* Forgot password links */}
        <div className="flex justify-between text-sm">
          <button type="button" className="text-accent hover:underline">
            Quên tài khoản (mã số thuế)?
          </button>
          <button type="button" className="text-accent hover:underline">
            Quên mật khẩu?
          </button>
        </div>

        {/* Login button */}
        <button type="submit" className="btn-primary w-full text-lg py-4">
          Đăng nhập
        </button>

        {/* Alternative login */}
        <button
          type="button"
          className="w-full py-3 px-6 rounded-full border border-primary/50 text-primary-foreground font-medium
                   flex items-center justify-center gap-3 active:bg-primary/10 transition-colors"
        >
          <Fingerprint className="w-5 h-5" />
          Đăng nhập bằng tài khoản Định danh điện tử
        </button>

        {/* Register link */}
        <p className="text-center text-primary-foreground/70 text-sm">
          Bạn chưa có tài khoản?{" "}
          <Link to="/register" className="text-accent font-semibold hover:underline">
            Đăng ký ngay
          </Link>
        </p>
      </form>

      {/* Bottom navigation shortcuts */}
      <div className="flex justify-around py-4 px-6 safe-bottom w-full mt-auto">
        <button className="flex flex-col items-center gap-1 text-primary-foreground/60">
          <Wrench className="w-6 h-6" />
          <span className="text-xs">Tiện ích</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-primary-foreground/60">
          <HelpCircle className="w-6 h-6" />
          <span className="text-xs">Hỗ trợ</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-primary-foreground/60">
          <Share2 className="w-6 h-6" />
          <span className="text-xs">Chia sẻ</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
