export interface ColorPreviewProps {
  colors: string[];
  limit?: number;
}

export default function ColorPreview({
  colors = [],
  limit = 3,
}: ColorPreviewProps) {
  const renderColors = colors.slice(0, limit);

  const remainingColor = colors.length - limit;

  return (
    <span className="flex flex-row items-center ml-1">
      {renderColors.map((color, index) => (
        <div
          key={color + index}
          className="-ml-1.5 w-4 h-4 rounded-full border-2 border-secondary"
          style={{ backgroundColor: color }}
        />
      ))}
      {colors.length > limit && (
        <span className="text-xs ml-1">{`+${remainingColor}`}</span>
      )}
    </span>
  );
}
