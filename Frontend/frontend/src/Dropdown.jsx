import "./Dropdown.css";

function Dropdown({ onSelect, currentMode }) {
  const modes = [
    "Default",
    "Deep Think",
    "Code Assistant",
    "Creative",
  ];

  return (
    <div className="dropdown">
      {modes.map((mode) => (
        <div
          key={mode}
          className={`dropdown-item ${
            currentMode === mode ? "active" : ""
          }`}
          onClick={() => onSelect(mode)}
        >
          {mode}
        </div>
      ))}
    </div>
  );
}

export default Dropdown;