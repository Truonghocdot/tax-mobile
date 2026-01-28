import { useState } from 'react';
import { Search } from 'lucide-react';

const TaxLookup = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      {/* Search */}
      <div className="px-4 py-4 animate-fade-in">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm theo mã hồ sơ, tên..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-12"
          />
        </div>
      </div>

      {/* Empty state */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 animate-slide-up">
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
          <Search className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-foreground mb-2">Chưa có dữ liệu</h3>
        <p className="text-sm text-muted-foreground text-center">
          Nhập thông tin tìm kiếm để tra cứu hồ sơ khai thuế của bạn
        </p>
      </div>
    </>
  );
};

export default TaxLookup;
