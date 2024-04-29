import { useState } from 'react';

const TimeSelector: React.FC<{ onChange: (time: string) => void }> = ({ onChange }) => {
  const [hour, setHour] = useState('00');
  const [minute, setMinute] = useState('00');

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHour(e.target.value);
    onChange(`${e.target.value}:${minute}`);
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMinute(e.target.value);
    onChange(`${hour}:${e.target.value}`);
  };

  return (
    <div className="flex space-x-2 col-span-2">
      <select
        className="border p-2 rounded"
        value={hour}
        onChange={handleHourChange}
      >
        {hours.map((h) => (
          <option key={h} value={h}>
            {h}
          </option>
        ))}
      </select>
      <span className="self-center">:</span>
      <select
        className="border p-2 rounded"
        value={minute}
        onChange={handleMinuteChange}
      >
        {minutes.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimeSelector;
