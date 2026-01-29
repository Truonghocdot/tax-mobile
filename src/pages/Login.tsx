import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { User, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  phoneNumber: z.string().min(10, "Số điện thoại không hợp lệ"),
  password: z.string().min(1, "Vui lòng nhập mật khẩu"),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const isLoginTab = location.pathname === "/login";

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Login data:", data);
    toast({
      title: "Đăng nhập thành công",
      description: "Chào mừng bạn quay trở lại!",
    });
    navigate("/");
  };

  return (
    <div className="px-6 animate-fade-in">
      {/* Tabs */}
      <div className="flex justify-center gap-8 mb-8">
        <Link
          to="/login"
          className={cn(
            "pb-2 font-medium transition-all",
            isLoginTab
              ? "text-primary-foreground border-b-2 border-primary-foreground"
              : "text-primary-foreground/50"
          )}
        >
          Đăng nhập
        </Link>
        <Link
          to="/register"
          className={cn(
            "pb-2 font-medium transition-all",
            !isLoginTab
              ? "text-primary-foreground border-b-2 border-primary-foreground"
              : "text-primary-foreground/50"
          )}
        >
          Đăng ký
        </Link>
      </div>

      {/* Form */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* Phone Number */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
            <User size={18} />
          </div>
          <Input
            {...form.register("phoneNumber")}
            placeholder="Số điện thoại"
            className="pl-12 h-12 bg-transparent border-0 border-b border-muted-foreground/30 rounded-none text-primary-foreground placeholder:text-muted-foreground/50 focus-visible:ring-0 focus-visible:border-primary-foreground"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Lock size={18} />
          </div>
          <Input
            {...form.register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="MST + Mật khẩu"
            className="pl-12 pr-12 h-12 bg-transparent border-0 border-b border-muted-foreground/30 rounded-none text-primary-foreground placeholder:text-muted-foreground/50 focus-visible:ring-0 focus-visible:border-primary-foreground"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Remember & Forgot */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox
              id="rememberMe"
              checked={form.watch("rememberMe")}
              onCheckedChange={(checked) =>
                form.setValue("rememberMe", checked as boolean)
              }
              className="border-muted-foreground/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <label
              htmlFor="rememberMe"
              className="text-sm text-primary-foreground/70"
            >
              Lưu thông tin đăng nhập
            </label>
          </div>
          <Link
            to="/forgot-password"
            className="text-sm text-primary-foreground/50 hover:text-primary-foreground/70 underline"
          >
            Quên mật khẩu?
          </Link>
        </div>

        {/* Submit Button */}
        <div className="flex items-center gap-3 pt-4">
          <Button
            type="submit"
            className="flex-1 h-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            Đăng nhập
          </Button>
          <button
            type="button"
            className="w-12 h-12 rounded-lg border border-muted-foreground/30 flex items-center justify-center text-primary-foreground/70 hover:bg-white/5 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" />
              <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" />
              <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" />
              <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </form>

      {/* Alternative Login */}
      <div className="mt-8">
        <button className="w-full py-4 px-4 rounded-xl bg-card/10 border border-muted-foreground/20 flex items-center justify-between hover:bg-card/20 transition-colors">
          <div className="flex flex-col items-start">
            <span className="text-primary-foreground font-medium">
              Đăng nhập bằng tài khoản
            </span>
            <span className="text-primary-foreground/60 text-sm">
              Định danh điện tử
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <ShieldCheck size={20} className="text-green-600" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Login;
