import { useState } from 'react';
import TabSwitch from '@/components/TabSwitch';

const TaxPayment = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ['Tất cả', 'Lệ phí trước bạ'];

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
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Mã hồ sơ <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                placeholder="Nhập mã hồ sơ"
                className="input-field"
              />
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

export default TaxPayment;
