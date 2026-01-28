interface TabSwitchProps {
  tabs: string[];
  activeTab: number;
  onChange: (index: number) => void;
}

const TabSwitch = ({ tabs, activeTab, onChange }: TabSwitchProps) => {
  return (
    <div className="flex gap-2 p-1 bg-muted rounded-full">
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => onChange(index)}
          className={`flex-1 py-2.5 px-4 rounded-full text-sm font-medium transition-all duration-200 ${
            activeTab === index
              ? 'tab-active shadow-soft'
              : 'tab-inactive'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabSwitch;
