import { useState } from 'react';

const ColorSelector: React.FC<{ onChange: (color: string) => void }> = ({ onChange }) => {
  const [selectedColor, setSelectedColor] = useState('');

  const colors = ['Red', 'Green', 'Blue', 'Yellow', 'Purple'];

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const colorName = e.target.value;
    setSelectedColor(colorName);
    onChange(colorName);
  };

  return (
    <select
      className="border p-2 rounded"
      value={selectedColor}
      onChange={handleColorChange}
    >
      <option value="">Select a color</option>
      {colors.map((color) => (
        <option key={color} value={color}>
          {color}
        </option>
      ))}
    </select>
  );
};

export default ColorSelector;
