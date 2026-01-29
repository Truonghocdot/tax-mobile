import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import trongDongImage from "@/assets/trong.png";

const profileSchema = z.object({
  businessName: z.string().min(1, "Vui lòng nhập tên doanh nghiệp"),
  taxCode: z.string().min(1, "Vui lòng nhập mã số thuế"),
  representative: z.string().min(1, "Vui lòng nhập người đại diện"),
  address: z.string().min(1, "Vui lòng nhập địa chỉ trụ sở"),
  phone: z.string().min(10, "Số điện thoại không hợp lệ"),
  capital: z.string().optional(),
  foundingDate: z.string().optional(),
  mainBusiness: z.string().optional(),
  bankName: z.string().optional(),
  bankAccount: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const Profile = () => {
  const { toast } = useToast();

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

  const onSubmit = (data: ProfileFormData) => {
    console.log("Profile data:", data);
    toast({
      title: "Cập nhật thành công",
      description: "Thông tin doanh nghiệp đã được cập nhật!",
    });
  };

  const formFields = [
    { name: "businessName" as const, label: "Tên doanh nghiệp" },
    { name: "taxCode" as const, label: "Mã số thuế" },
    { name: "representative" as const, label: "Người đại diện" },
    { name: "address" as const, label: "Địa chỉ trụ sở" },
    { name: "phone" as const, label: "Số điện thoại" },
    { name: "capital" as const, label: "Vốn điều lệ" },
    { name: "foundingDate" as const, label: "Ngày thành lập" },
    { name: "mainBusiness" as const, label: "Ngành nghề chính" },
    { name: "bankName" as const, label: "Tên ngân hàng" },
    { name: "bankAccount" as const, label: "Số tài khoản" },
  ];

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
            backgroundSize: "cover",
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
                  placeholder=""
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
              className="w-full h-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold mt-6"
            >
              Cập nhật
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
