interface Props {
  mode: "parent" | "child";
  onChange: (mode: "parent" | "child") => void;
}

export default function ModeSwitcher({ mode, onChange }: Props) {
  return (
    <div className="mode-switcher">
      <button type="button" className={mode === "parent" ? "active" : ""} onClick={() => onChange("parent")}>Родитель</button>
      <button type="button" className={mode === "child" ? "active" : ""} onClick={() => onChange("child")}>Ребенок</button>
    </div>
  );
}
