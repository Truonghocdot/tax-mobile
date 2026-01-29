import { useState } from "react";
import { cn } from "@/lib/utils";
import trongDong from "@/assets/trongdong.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Check, CreditCard, User } from "lucide-react";

interface Bank {
  id: string;
  name: string;
  shortName: string;
  recommended?: boolean;
}

const banks: Bank[] = [
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
  { id: "seabank", name: "SeABank", shortName: "SeABank" },
  { id: "dongabank", name: "DongA Bank", shortName: "DongA Bank" },
  { id: "mbbank", name: "Ngân hàng Quân Đội", shortName: "MB Bank" },
  { id: "sacombank", name: "Sacombank", shortName: "Sacombank" },
  { id: "oceanbank", name: "OceanBank", shortName: "OceanBank" },
  { id: "bacabank", name: "Bac A Bank", shortName: "Bac A Bank" },
  {
    id: "lienvietpostbank",
    name: "LienVietPostBank",
    shortName: "LienVietPostBank",
  },
  { id: "vpbank", name: "VPBank", shortName: "VPBank" },
  { id: "agribank", name: "Agribank", shortName: "Agribank" },
  { id: "baovietbank", name: "BaoViet Bank", shortName: "BaoViet Bank" },
  { id: "bidv", name: "BIDV", shortName: "BIDV" },
  { id: "vietinbank", name: "VietinBank", shortName: "VietinBank" },
  { id: "acb", name: "ACB", shortName: "ACB" },
  { id: "hsbc", name: "HSBC", shortName: "HSBC" },
  { id: "abbank", name: "ABBank", shortName: "ABBank" },
  { id: "eximbank", name: "Eximbank", shortName: "Eximbank" },
  { id: "citibank", name: "Citibank", shortName: "Citibank" },
  { id: "gpbank", name: "GPBank", shortName: "GPBank" },
  { id: "cbbank", name: "CBBank", shortName: "CBBank" },
  { id: "pgbank", name: "PGBank", shortName: "PGBank" },
  { id: "hdbank", name: "HDBank", shortName: "HDBank" },
  { id: "namabank", name: "Nam A Bank", shortName: "Nam A Bank" },
  { id: "shinhanbank", name: "Shinhan Bank", shortName: "Shinhan Bank" },
  { id: "shb", name: "SHB", shortName: "SHB" },
  { id: "saigonbank", name: "Saigon Bank", shortName: "Saigon Bank" },
  { id: "scb", name: "SCB", shortName: "SCB" },
  { id: "vietabank", name: "VietABank", shortName: "VietABank" },
  { id: "vietbank", name: "VietBank", shortName: "VietBank" },
];

const BankRegistration = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"new" | "registered">("new");
  const [selectedBankKey, setSelectedBankKey] = useState<string | null>(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [registeredBanks, setRegisteredBanks] = useState<string[]>([
    "tpbank",
    "vietcombank",
  ]);

  const handleRegister = () => {
    if (!accountNumber || !accountHolder) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng nhập đầy đủ số tài khoản và tên chủ thẻ",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Thành công",
      description: "Đăng ký tài khoản ngân hàng thành công",
    });

    if (selectedBankKey) {
      setRegisteredBanks([...registeredBanks, selectedBankKey]);
      setSelectedBankKey(null);
      setAccountNumber("");
      setAccountHolder("");
      setActiveTab("registered");
    }
  };

  const recommendedBanks = banks.filter((b) => b.recommended);
  const otherBanks = banks.filter((b) => !b.recommended);

  const displayedBanks =
    activeTab === "registered"
      ? banks.filter((b) => registeredBanks.includes(b.id))
      : banks;

  return (
    <div className="min-h-screen relative z-10">
      {/* Decorative header background */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-primary -z-10" />

      <div className="px-4 pt-4 pb-8">
        {/* Tab Buttons */}
        <div className="flex relative gap-2 mb-4">
          <button
            onClick={() => setActiveTab("new")}
            className={cn(
              "flex-1 py-2.5 rounded-lg font-medium transition-colors",
              activeTab === "new"
                ? "bg-primary text-primary-foreground"
                : "bg-accent text-accent-foreground",
            )}
          >
            Đăng ký mới
          </button>
          <button
            onClick={() => setActiveTab("registered")}
            className={cn(
              "flex-1 py-2.5 rounded-lg font-medium transition-colors",
              activeTab === "registered"
                ? "bg-primary text-primary-foreground"
                : "bg-accent text-accent-foreground",
            )}
          >
            Đã đăng ký
          </button>
        </div>

        <div
          className="rounded-xl"
          style={{
            backgroundImage: `url(${trongDong})`,
            opacity: 2,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {activeTab === "new" && (
            <>
              {selectedBankKey ? (
                // Bank Linking Form
                <div className="bg-card rounded-xl p-4 shadow-sm border border-border animate-fade-in">
                  <button
                    onClick={() => setSelectedBankKey(null)}
                    className="flex items-center text-sm text-muted-foreground mb-4 hover:text-foreground transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Chọn ngân hàng khác
                  </button>

                  <div className="flex items-center gap-3 mb-6 p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border shadow-sm">
                      <span className="font-bold text-primary text-xs">
                        {banks.find((b) => b.id === selectedBankKey)?.shortName}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {banks.find((b) => b.id === selectedBankKey)?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Liên kết tài khoản
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="accNum">Số tài khoản</Label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="accNum"
                          placeholder="Nhập số tài khoản"
                          className="pl-9"
                          value={accountNumber}
                          onChange={(e) => setAccountNumber(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="accHolder">Tên chủ tài khoản</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="accHolder"
                          placeholder="NHAP TEN KHONG DAU"
                          className="pl-9 uppercase"
                          value={accountHolder}
                          onChange={(e) =>
                            setAccountHolder(e.target.value.toUpperCase())
                          }
                        />
                      </div>
                      <p className="text-[10px] text-muted-foreground">
                        * Vui lòng nhập tên không dấu, in hoa
                      </p>
                    </div>

                    <Button onClick={handleRegister} className="w-full mt-2">
                      Liên kết ngay
                    </Button>
                  </div>
                </div>
              ) : (
                // Bank Selection List
                <>
                  {/* Recommended Banks */}
                  <div className=" relative rounded-xl p-4 mb-4 shadow-sm border border-border">
                    <h3 className="text-primary font-semibold mb-3">
                      Đề xuất cao
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {recommendedBanks.map((bank) => (
                        <button
                          key={bank.id}
                          onClick={() => setSelectedBankKey(bank.id)}
                          className={cn(
                            "p-3 rounded-lg border-2 transition-all text-center",
                            selectedBankKey === bank.id
                              ? "border-primary bg-primary/5"
                              : "border-transparent bg-muted hover:border-primary/30",
                          )}
                        >
                          <span className="text-xs font-medium text-foreground">
                            {bank.shortName}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* All Banks */}
                  <div className=" rounded-xl p-4 shadow-sm border border-border relative overflow-hidden">
                    {/* Watermark background */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none">
                      <div className="absolute right-0 bottom-0 w-64 h-64">
                        <div className="w-full h-full rounded-full border-8 border-accent" />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 relative z-10">
                      {otherBanks.map((bank) => (
                        <button
                          key={bank.id}
                          onClick={() => setSelectedBankKey(bank.id)}
                          className={cn(
                            "p-3 rounded-lg transition-all text-center",
                            selectedBankKey === bank.id
                              ? "bg-primary/10 ring-2 ring-primary"
                              : "hover:bg-muted",
                          )}
                        >
                          <span className="text-xs font-medium text-foreground">
                            {bank.shortName}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          {activeTab === "registered" && (
            <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
              {displayedBanks.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Chưa có ngân hàng nào được đăng ký
                </p>
              ) : (
                <div className="space-y-3">
                  {displayedBanks.map((bank) => (
                    <div
                      key={bank.id}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg"
                    >
                      <span className="font-medium text-foreground">
                        {bank.shortName}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Đã liên kết
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BankRegistration;
