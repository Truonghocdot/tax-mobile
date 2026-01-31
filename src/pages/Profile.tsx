import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import trongDongImage from "@/assets/trong.png";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi, userApi } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const profileSchema = z.object({
  // Text fields - only letters and spaces (Vietnamese characters allowed)
  businessName: z
    .string()
    .min(1, "Vui lòng nhập tên doanh nghiệp")
    .regex(
      /^[a-zA-ZÀ-ỹ\s]+$/u,
      "Tên doanh nghiệp chỉ được chứa chữ cái và khoảng trắng",
    ),

  // Tax code - 10 or 13 digits
  taxCode: z
    .string()
    .min(1, "Vui lòng nhập mã số thuế")
    .regex(/^\d{10}$|^\d{13}$/, "Mã số thuế phải có 10 hoặc 13 chữ số"),

  // Representative name - only letters and spaces
  representative: z
    .string()
    .min(1, "Vui lòng nhập người đại diện")
    .regex(
      /^[a-zA-ZÀ-ỹ\s]+$/u,
      "Tên người đại diện chỉ được chứa chữ cái và khoảng trắng",
    ),

  // Address - alphanumeric with Vietnamese characters
  address: z
    .string()
    .min(1, "Vui lòng nhập địa chỉ trụ sở")
    .min(10, "Địa chỉ phải có ít nhất 10 ký tự"),

  phone: z
    .string()
    .min(1, "Vui lòng nhập số điện thoại")
    .regex(/^0\d{9}$/, "Số điện thoại phải có 10 chữ số và bắt đầu bằng 0"),

  // Capital - numeric only (VND)
  capital: z
    .string()
    .optional()
    .refine((val) => !val || /^\d+$/.test(val), "Vốn điều lệ chỉ được chứa số"),

  // Founding date - DD/MM/YYYY format
  foundingDate: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val || /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(val),
      "Ngày thành lập phải có định dạng DD/MM/YYYY",
    ),

  // Main business - text field
  mainBusiness: z.string().optional(),

  // Bank name - text only
  bankName: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[a-zA-ZÀ-ỹ\s]+$/u.test(val),
      "Tên ngân hàng chỉ được chứa chữ cái và khoảng trắng",
    ),

  // Bank account - numeric only
  bankAccount: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\d+$/.test(val),
      "Số tài khoản chỉ được chứa số",
    ),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const Profile = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch user profile
  const { data: userData, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => authApi.getUser().then((res) => res.data),
  });

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      businessName: "",
      taxCode: "",
      representative: "",
      address: "",
      phone: "",
      capital: "",
      foundingDate: "",
      mainBusiness: "",
      bankName: "",
      bankAccount: "",
    },
  });

  // Populate form when data is loaded
  useEffect(() => {
    const profile = userData?.data || userData;
    if (profile) {
      form.reset({
        businessName: profile.business_name || "",
        taxCode: profile.tax_code || "",
        representative: profile.representative || "",
        address: profile.address || "",
        phone: profile.phone || "",
        capital: profile.capital || "",
        foundingDate: profile.founding_date || "",
        mainBusiness: profile.main_business || "",
        bankName: profile.bank_name || "",
        bankAccount: profile.bank_account || "",
      });
    }
  }, [userData, form]);

  const updateProfileMutation = useMutation({
    mutationFn: (data: ProfileFormData) => userApi.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      navigate("/loading");
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      navigate("/loading");
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    updateProfileMutation.mutate(data);
  };

  const formFields = [
    {
      name: "businessName" as const,
      label: "Tên doanh nghiệp",
      type: "text",
      placeholder: "VD: Công ty TNHH ABC",
    },
    {
      name: "taxCode" as const,
      label: "Mã số thuế",
      type: "text",
      placeholder: "VD: 0123456789 hoặc 0123456789012",
    },
    {
      name: "representative" as const,
      label: "Người đại diện",
      type: "text",
      placeholder: "VD: Nguyễn Văn A",
    },
    {
      name: "address" as const,
      label: "Địa chỉ trụ sở",
      type: "text",
      placeholder: "VD: 123 Đường ABC, Quận 1, TP.HCM",
    },
    {
      name: "phone" as const,
      label: "Số điện thoại",
      type: "tel",
      placeholder: "VD: 0901234567",
    },
    {
      name: "capital" as const,
      label: "Vốn điều lệ (VNĐ)",
      type: "text",
      placeholder: "VD: 1000000000",
    },
    {
      name: "foundingDate" as const,
      label: "Ngày thành lập",
      type: "text",
      placeholder: "DD/MM/YYYY",
    },
    {
      name: "mainBusiness" as const,
      label: "Ngành nghề chính",
      type: "text",
      placeholder: "VD: Kinh doanh thương mại",
    },
    {
      name: "bankName" as const,
      label: "Tên ngân hàng",
      type: "text",
      placeholder: "VD: Vietcombank",
    },
    {
      name: "bankAccount" as const,
      label: "Số tài khoản",
      type: "text",
      placeholder: "VD: 1234567890",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Decorative header background */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-primary -z-10" />

      {/* Watermark decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute right-0 top-1/4 w-64 h-64 opacity-10">
          <div className="w-full h-full rounded-full border-8 border-accent" />
        </div>
        <div className="absolute left-0 bottom-1/4 w-48 h-48 opacity-10">
          <div className="w-full h-full rounded-full border-8 border-accent" />
        </div>
      </div>

      {/* Form Card */}
      <div className="px-4 pt-4 pb-8">
        <div
          className="bg-card rounded-2xl p-5 shadow-lg"
          style={{
            backgroundImage: `url(${trongDongImage})`,
            backgroundSize: "fill",
            backgroundPosition: "center",
          }}
        >
          <h2 className="text-lg font-semibold text-foreground mb-6">
            Thông tin doanh nghiệp
          </h2>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {formFields.map((field) => (
              <div key={field.name} className="space-y-1">
                <label className="text-sm font-medium text-foreground">
                  {field.label}
                </label>
                <Input
                  {...form.register(field.name)}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="h-11 bg-background border-border rounded-lg"
                />
                {form.formState.errors[field.name] && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors[field.name]?.message}
                  </p>
                )}
              </div>
            ))}

            <Button
              type="submit"
              disabled={updateProfileMutation.isPending}
              className="w-full h-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold mt-6"
            >
              {updateProfileMutation.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Cập nhật"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
