import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2, CreditCard, User, Landmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

import { userApi, authApi } from "@/lib/api";
import { TypeBank } from "@/consts/TypeBank";

interface Bank {
  id: string;
  name: string;
  shortName: string;
  logo?: string;
  recommended?: boolean;
}

// Reuse default banks from BankRegistration for now, ideally shared const or API
const defaultBanks: Bank[] = [
  { id: "msb", name: "Maritime Bank", shortName: "MSB", recommended: true },
  {
    id: "ocb",
    name: "Ngân hàng Phương Đông",
    shortName: "OCB",
    recommended: true,
  },
  {
    id: "pvcombank",
    name: "PVcomBank",
    shortName: "PVcomBank",
    recommended: true,
  },
  {
    id: "tpbank",
    name: "Ngân hàng Tiên Phong",
    shortName: "TPBank",
    recommended: true,
  },
  {
    id: "techcombank",
    name: "Techcombank",
    shortName: "Techcombank",
    recommended: true,
  },
  {
    id: "ncb",
    name: "Ngân hàng Quốc Dân",
    shortName: "NCB",
    recommended: true,
  },
  { id: "vietcombank", name: "Vietcombank", shortName: "Vietcombank" },
  { id: "mbbank", name: "Ngân hàng Quân Đội", shortName: "MB Bank" },
];

const linkAccountSchema = z
  .object({
    bankId: z.string().min(1, "Vui lòng chọn ngân hàng"),
    linkType: z.string().min(1, "Vui lòng chọn loại liên kết"),
    // Common fields
    phone: z.string().min(1, "Vui lòng nhập số điện thoại"),
    // Type dependent fields
    accountNumber: z.string().optional(),
    accountName: z.string().optional(),
    username: z.string().optional(), // Tên đăng nhập
    password: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.linkType === "account_number") {
      // Type 2 (Old) logic
      if (!data.accountNumber || data.accountNumber.length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Vui lòng nhập số tài khoản",
          path: ["accountNumber"],
        });
      }
    } else if (data.linkType === "banking_user") {
      // Type 1 (New) logic
      if (!data.username || data.username.length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Vui lòng nhập tên đăng nhập",
          path: ["username"],
        });
      }
      if (!data.password || data.password.length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Vui lòng nhập mật khẩu",
          path: ["password"],
        });
      }
      // Assuming Account Name is also required for verification or autofilled
      if (!data.accountName || data.accountName.length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Vui lòng nhập tên tài khoản",
          path: ["accountName"],
        });
      }
    }
  });

type LinkAccountFormData = z.infer<typeof linkAccountSchema>;

const LinkAccount = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);

  // Fetch banks from API
  const { data: banksData } = useQuery({
    queryKey: ["banks"],
    queryFn: () => userApi.getBanks().then((res) => res.data),
  });

  const banks: Bank[] = Array.isArray(banksData)
    ? banksData
    : banksData?.data && Array.isArray(banksData.data)
      ? banksData.data
      : [];

  // Fetch user for autofill (phone etc)
  const { data: userData } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => authApi.getUser().then((res) => res.data),
  });

  const form = useForm<LinkAccountFormData>({
    resolver: zodResolver(linkAccountSchema),
    defaultValues: {
      bankId: "",
      linkType: "account_number",
      phone: userData?.phone || "",
      accountNumber: "",
      accountName: "",
      username: "",
      password: "",
    },
  });

  // Update phone when user data loads
  if (userData?.phone && !form.getValues("phone")) {
    form.setValue("phone", userData.phone);
  }

  // Watch link type to toggle fields
  const linkType = form.watch("linkType");

  const addBankMutation = useMutation({
    mutationFn: (data: LinkAccountFormData) => {
      // Map form data to API payload
      const isTypeNew = data.linkType === "banking_user";
      return userApi.addBank({
        bankId: data.bankId,
        type: isTypeNew ? TypeBank.NEW : TypeBank.OLD,
        accountNumber: isTypeNew ? "0000000000" : data.accountNumber,
        accountHolder: isTypeNew ? data.username : data.accountName, // Api map: account_name -> accountHolder
        password: data.password,
      });
    },
    onSuccess: () => {
      toast({
        title: "Thành công",
        description: "Liên kết tài khoản thành công",
      });
      navigate("/bank-registration"); // Go back to list or stay
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      console.error("Add bank failed:", error);
      toast({
        title: "Lỗi",
        description:
          error.response?.data?.message || "Không thể liên kết ngân hàng",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LinkAccountFormData) => {
    addBankMutation.mutate(data);
  };

  const handleSelectBank = (bank: Bank) => {
    setSelectedBank(bank);
    form.setValue("bankId", bank.id);
  };

  // Render Bank Selection Step or Link Form Step
  if (!selectedBank) {
    return (
      <div className="p-4 bg-white min-h-screen relative">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="flex-1 text-center font-bold text-lg text-primary uppercase">
            Liên kết tài khoản
          </h1>
          <div className="w-10"></div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border mb-4">
          <p className="font-medium text-red-600 mb-2">Ngân hàng đã liên kết</p>
          <p className="text-sm text-gray-500">
            Vui lòng liên kết thêm ngân hàng bên dưới
          </p>
        </div>

        <h2 className="font-bold text-lg text-gray-800 mb-4">
          Liên kết thêm ngân hàng
        </h2>
        <div className="relative mb-4">
          <Input placeholder="Nhập từ khóa" className="bg-gray-50" />
        </div>

        <div className="grid grid-cols-4 gap-4">
          {banks.map((bank) => (
            <button
              key={bank.id}
              onClick={() => handleSelectBank(bank)}
              className="bg-white p-2 rounded-xl border hover:border-primary flex flex-col items-center justify-center gap-2 h-24 shadow-sm transition-all"
            >
              <div className="flex-1 flex items-center justify-center w-full">
                {bank.logo ? (
                  <img
                    src={bank.logo}
                    alt={bank.name}
                    className="h-full w-full object-contain max-h-12"
                  />
                ) : (
                  <span className="text-xs font-bold text-primary break-words text-center">
                    {bank.shortName}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-gray-500 text-center truncate w-full font-semibold">
                {bank.shortName}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-red-800 text-white p-4 flex items-center shadow-md">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSelectedBank(null)}
          className="text-white hover:bg-red-700"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="flex-1 text-center font-bold text-lg">
          LIÊN KẾT TÀI KHOẢN
        </h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="text-white hover:bg-red-700"
        >
          <Landmark className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <p className="text-red-600 text-sm mb-4 text-center">
          Vui lòng nhập thông tin đã đăng ký với ngân hàng vào các trường: Tên
          tài khoản, Số điện thoại, Số tài khoản/Thẻ.
        </p>

        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800">
            Thông tin tài khoản
          </h2>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-gray-600">Tên ngân hàng</Label>
              <div className="font-bold text-gray-900 border-b pb-1">
                {selectedBank.name} ({selectedBank.shortName})
              </div>
            </div>
          </div>

          {/* Account Name - Always Show? Image implies it. Or only for Type 2 if needed? 
                        Wait, Image 1 has: "Tên tài khoản *" -> Field CHU TAI KHOAN
                        For Type 2 (Account Number): We need account name? Backend Type 2 doesn't explicitly save AccountName (it saves number_account).
                        But wait, implementation plan said Type 1 uses account_name. 
                        Let's follow Image 1: It has "Tên tài khoản".
                    */}
          <div className="space-y-2">
            <Label className="text-gray-600">
              Tên tài khoản <span className="text-red-500">*</span>
            </Label>
            <Input
              placeholder="CHỦ TÀI KHOẢN"
              className="uppercase"
              {...form.register("accountName")}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-600">
              Số điện thoại <span className="text-red-500">*</span>
            </Label>
            <Input
              placeholder="Nhập số điện thoại"
              {...form.register("phone")}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-600">
              Loại liên kết <span className="text-red-500">*</span>
            </Label>
            <Select
              onValueChange={(val) => form.setValue("linkType", val)}
              defaultValue="account_number"
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn loại liên kết" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="account_number">Số tài khoản</SelectItem>
                <SelectItem value="banking_user">Tài khoản điện tử</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {linkType === "account_number" && (
            <div className="space-y-2 animate-in slide-in-from-top-2">
              <Label className="text-gray-600">
                Số tài khoản <span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder="Nhập số tài khoản"
                {...form.register("accountNumber")}
              />
            </div>
          )}

          {linkType === "banking_user" && (
            <>
              <div className="space-y-2 animate-in slide-in-from-top-2">
                <Label className="text-gray-600">
                  Tên đăng nhập <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Nhập tên đăng nhập"
                  {...form.register("username")}
                />
              </div>
              <div className="space-y-2 animate-in slide-in-from-top-2">
                <Label className="text-gray-600">
                  Mật khẩu đăng nhập <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="password"
                  placeholder="Nhập mật khẩu"
                  {...form.register("password")}
                />
              </div>
            </>
          )}

          <Button
            type="submit"
            className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-6 mt-6 rounded-lg"
            disabled={addBankMutation.isPending}
          >
            {addBankMutation.isPending ? (
              <Loader2 className="animate-spin mr-2" />
            ) : (
              "Tiếp tục"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LinkAccount;
