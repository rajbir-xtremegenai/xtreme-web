import Image from "next/image";

// OverviewItem Component
const OverviewItem = ({ iconSrc, label, value, alignment = 'left' }) => {
  if (!value && typeof value !== 'number') { // Allow 0 as a valid value
    return null;
  }

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center flex-shrink-0">
        <Image src={iconSrc} alt={`${label} icon`} width={32} height={32} className="h-6 w-6 sm:h-8 sm:w-8 text-[#405FF2]" />
      </div>
      <div className="flex flex-col items-start flex-1 min-w-0">
        <span className="text-sm font-medium text-gray-600">{label}</span>
        <span className={`text-gray-900 text-base ${alignmentClasses[alignment] || 'text-left'} break-words`}>{value}</span>
      </div>
    </div>
  );
};

export default OverviewItem;