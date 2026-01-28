import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Building2, User, Phone, MapPin, FileText, Lock, Eye, EyeOff } from "lucide-react";
import taxEmblem from "@/assets/tax-emblem.png";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const businessTypes = [
  { value: "tnhh_2tv", label: "Công Ty TNHH Hai Thành Viên Trở Lên" },
  { value: "tnhh_1tv", label: "Công Ty TNHH Một Thành Viên" },
  { value: "ho_kd", label: "Hộ Kinh Doanh" },
  { value: "co_phan", label: "Công Ty Cổ Phần" },
  { value: "hop_tac_xa", label: "Hợp Tác Xã" },
] as const;

const registerSchema = z
  .object({
    businessType: z.enum(["tnhh_2tv", "tnhh_1tv", "ho_kd", "co_phan", "hop_tac_xa"], {
      required_error: "Vui lòng chọn loại hình doanh nghiệp",
    }),
    gender: z.enum(["nam", "nu"], {
      required_error: "Vui lòng chọn giới tính",
    }),
    idNumber: z
      .string()
      .min(9, "Số CMND/CCCD phải có ít nhất 9 ký tự")
      .max(12, "Số CMND/CCCD không được quá 12 ký tự")
      .regex(/^\d+$/, "Số CMND/CCCD chỉ được chứa số"),
    phoneNumber: z
      .string()
      .min(10, "Số điện thoại phải có ít nhất 10 ký tự")
      .max(11, "Số điện thoại không được quá 11 ký tự")
      .regex(/^(0[3|5|7|8|9])\d{8}$/, "Số điện thoại không hợp lệ"),
    address: z.string().min(10, "Địa chỉ phải có ít nhất 10 ký tự").max(255, "Địa chỉ không được quá 255 ký tự"),
    password: z
      .string()
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .max(50, "Mật khẩu không được quá 50 ký tự")
      .regex(/[A-Z]/, "Mật khẩu phải chứa ít nhất 1 chữ in hoa")
      .regex(/[a-z]/, "Mật khẩu phải chứa ít nhất 1 chữ thường")
      .regex(/[0-9]/, "Mật khẩu phải chứa ít nhất 1 số"),
    confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu"),
    agreeTerms: z.boolean().refine((val) => val === true, {
      message: "Bạn phải đồng ý với điều khoản để tiếp tục",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      businessType: undefined,
      gender: undefined,
      idNumber: "",
      phoneNumber: "",
      address: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Registration data:", data);

      toast({
        title: "Đăng ký thành công!",
        description: "Tài khoản của bạn đã được tạo. Vui lòng đăng nhập.",
      });

      navigate("/login");
    } catch (error) {
      toast({
        title: "Đăng ký thất bại",
        description: "Đã có lỗi xảy ra. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen animate-fade-in">
      {/* Header with back button */}
      <div className="flex items-center px-4 py-2 sticky top-0 z-10">
        <button
          onClick={() => navigate("/login")}
          className="p-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="flex-1 text-center text-primary-foreground text-lg font-semibold pr-10">Đăng ký tài khoản</h1>
      </div>

      {/* Content */}
      <div className="flex flex-col px-4 pt-2 pb-8 overflow-y-auto flex-1">
        {/* Logo */}
        <div className="flex flex-col items-center mb-4">
          <img src={taxEmblem} alt="Thuế Điện Tử" className="w-16 h-16 mb-2" />
          <p className="text-primary-foreground/80 text-sm text-center">Quý khách vui lòng nhập thông tin cơ bản</p>
        </div>

        {/* Register form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Business Type */}
            <FormField
              control={form.control}
              name="businessType"
              render={({ field }) => (
                <FormItem className="bg-card/90 backdrop-blur rounded-xl p-4">
                  <FormLabel className="flex items-center gap-2 text-foreground font-medium mb-3">
                    <Building2 className="w-5 h-5 text-primary" />
                    Loại hình doanh nghiệp
                  </FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} value={field.value} className="space-y-2">
                      {businessTypes.map((type) => (
                        <label
                          key={type.value}
                          className="flex items-center gap-3 p-3 rounded-lg border border-border/50 
                                   hover:bg-muted/50 cursor-pointer transition-colors
                                   has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                        >
                          <RadioGroupItem value={type.value} />
                          <span className="text-sm text-foreground">{type.label}</span>
                        </label>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="bg-card/90 backdrop-blur rounded-xl p-4">
                  <FormLabel className="flex items-center gap-2 text-foreground font-medium mb-3">
                    <User className="w-5 h-5 text-primary" />
                    Giới tính
                  </FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-4">
                      <label
                        className="flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border border-border/50 
                                 hover:bg-muted/50 cursor-pointer transition-colors
                                 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                      >
                        <RadioGroupItem value="nam" />
                        <span className="text-sm text-foreground">Nam</span>
                      </label>
                      <label
                        className="flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border border-border/50 
                                 hover:bg-muted/50 cursor-pointer transition-colors
                                 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                      >
                        <RadioGroupItem value="nu" />
                        <span className="text-sm text-foreground">Nữ</span>
                      </label>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ID Number */}
            <FormField
              control={form.control}
              name="idNumber"
              render={({ field }) => (
                <FormItem className="bg-card/90 backdrop-blur rounded-xl p-4">
                  <FormLabel className="flex items-center gap-2 text-foreground font-medium mb-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Số CMND / CCCD
                  </FormLabel>
                  <p className="text-xs text-muted-foreground mb-3">
                    Số CMND / CCCD phải đúng với số đã đăng ký với Sở Kế Hoạch Và Đầu Tư
                  </p>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Nhập số CMND/CCCD"
                      className="bg-background/50 border-border/50"
                      maxLength={12}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Number */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="bg-card/90 backdrop-blur rounded-xl p-4">
                  <FormLabel className="flex items-center gap-2 text-foreground font-medium mb-2">
                    <Phone className="w-5 h-5 text-primary" />
                    Số điện thoại
                  </FormLabel>
                  <p className="text-xs text-muted-foreground mb-3">
                    Số điện thoại phải đúng với số đã đăng ký với Sở Kế Hoạch Và Đầu Tư
                  </p>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      placeholder="Nhập số điện thoại"
                      className="bg-background/50 border-border/50"
                      maxLength={11}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="bg-card/90 backdrop-blur rounded-xl p-4">
                  <FormLabel className="flex items-center gap-2 text-foreground font-medium mb-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Địa chỉ trụ sở đăng ký
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Nhập địa chỉ trụ sở"
                      className="bg-background/50 border-border/50"
                      maxLength={255}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="bg-card/90 backdrop-blur rounded-xl p-4">
                  <FormLabel className="flex items-center gap-2 text-foreground font-medium mb-2">
                    <Lock className="w-5 h-5 text-primary" />
                    Mật khẩu
                  </FormLabel>
                  <p className="text-xs text-muted-foreground mb-3">
                    Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số
                  </p>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Nhập mật khẩu"
                        className="bg-background/50 border-border/50 pr-10"
                        maxLength={50}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="bg-card/90 backdrop-blur rounded-xl p-4">
                  <FormLabel className="flex items-center gap-2 text-foreground font-medium mb-2">
                    <Lock className="w-5 h-5 text-primary" />
                    Xác nhận mật khẩu
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Nhập lại mật khẩu"
                        className="bg-background/50 border-border/50 pr-10"
                        maxLength={50}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Terms Agreement */}
            <FormField
              control={form.control}
              name="agreeTerms"
              render={({ field }) => (
                <FormItem className="bg-card/90 backdrop-blur rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-1" />
                    </FormControl>
                    <div className="flex-1">
                      <FormLabel className="text-sm text-foreground leading-relaxed cursor-pointer">
                        Tôi đã đọc, hiểu rõ và chấp nhận các điều khoản của nhà nước. Bằng việc xác nhận này, tôi đồng ý
                        đăng ký tài khoản Thuế Điện Tử
                      </FormLabel>
                      <FormMessage className="mt-1" />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Đang xử lý..." : "Đăng ký tài khoản"}
            </button>

            {/* Login link */}
            <p className="text-center text-primary-foreground/70 text-sm pb-4">
              Bạn đã có tài khoản?{" "}
              <Link to="/login" className="text-accent font-semibold hover:underline">
                Đăng nhập ngay
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Register;
