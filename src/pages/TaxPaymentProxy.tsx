import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import TabSwitch from '@/components/TabSwitch';

const TaxPaymentProxy = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [paymentType, setPaymentType] = useState('Tất cả');

  const tabs = ['Theo mã số thuế của người được nộp thay', 'Theo khoản nộp/Lệ phí trước bạ'];

  return (
    <>
      {/* Tab Switch */}
      <div className="px-4 py-4 animate-fade-in">
        <TabSwitch tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      {/* Content */}
      <div className="px-4 animate-slide-up">
        {activeTab === 0 ? (
          <div className="space-y-4">
            {/* Payment type selector */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Chọn loại thanh toán <span className="text-destructive">*</span>
              </label>
              <button className="input-field flex items-center justify-between text-left">
                <span>{paymentType}</span>
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Info card */}
            <div className="card-elevated">
              <h4 className="font-semibold text-foreground mb-3">
                Thông tin người phải nộp thuế
              </h4>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Mã số thuế của người được nộp thay
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập mã số thuế của người được nộp thay"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Người được nộp thay
                  </label>
                  <input
                    type="text"
                    placeholder="Tên người được nộp thay"
                    className="input-field"
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Số tờ khai/Số quyết định/Số thông báo/ID khoản nộp/ Mã phí nông nghiệp (Mã thửa đất)
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập số tờ khai/số quyết định/số thông báo..."
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-muted rounded-xl p-4">
              <h5 className="font-semibold text-foreground mb-2">Lưu ý:</h5>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>
                  - Nhập mã phí nông nghiệp vào cột 'Số tờ khai/Số quyết định/Số thông báo/ID khoản nộp/Mã phí nông nghiệp (Mã thửa đất)' đối với tiểu mục thuế đất phi nông nghiệp 1601, 1602, 1603, 1649
                </li>
                <li>- Hệ thống hỗ trợ tối đa 2 khoản nộp.</li>
              </ul>
            </div>

            <button className="btn-primary w-full">Tra cứu</button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Mã hồ sơ lệ phí trước bạ <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                placeholder="Nhập mã hồ sơ lệ phí trước bạ"
                className="input-field"
              />
            </div>

            <button className="btn-primary w-full">Tra cứu</button>
          </div>
        )}
      </div>
    </>
  );
};

export default TaxPaymentProxy;
