import { useMemo, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

const foods = [
  { name: "Oats, cooked", serving: "1 cup", calories: 154 },
  { name: "Milk, low fat", serving: "1 cup", calories: 102 },
  { name: "Banana", serving: "1 medium", calories: 105 },
  { name: "Apple", serving: "1 medium", calories: 95 },
  { name: "Boiled egg", serving: "1 egg", calories: 78 },
  { name: "Brown rice, cooked", serving: "1 cup", calories: 216 },
  { name: "Chapati", serving: "1 medium", calories: 120 },
  { name: "Dal, cooked", serving: "1 cup", calories: 230 },
  { name: "Paneer", serving: "100 g", calories: 265 },
  { name: "Grilled chicken", serving: "100 g", calories: 165 },
  { name: "Mixed vegetables", serving: "1 cup", calories: 90 },
  { name: "Curd, plain", serving: "1 cup", calories: 149 },
  { name: "Almonds", serving: "10 almonds", calories: 70 },
  { name: "Idli", serving: "1 piece", calories: 58 },
  { name: "Dosa, plain", serving: "1 medium", calories: 168 },
];

function CalorieCounter() {
  const [foodIndex, setFoodIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [entries, setEntries] = useState([]);
  const dailyTarget = 1800;
  const selectedFood = foods[foodIndex];
  const total = useMemo(() => entries.reduce((sum, item) => sum + item.total, 0), [entries]);
  const percentage = Math.min(100, Math.round((total / dailyTarget) * 100));

  const addFood = () => {
    const safeQuantity = Math.max(0.25, Number(quantity) || 1);
    setEntries((current) => [...current, {
      id: `${Date.now()}-${foodIndex}`,
      ...selectedFood,
      quantity: safeQuantity,
      total: Math.round(selectedFood.calories * safeQuantity),
    }]);
  };

  return (
    <section className="health-card calorie-counter">
      <div className="calorie-heading"><div><p className="health-kicker">DAILY FOOD LOG</p><h2>Calorie counter</h2>
        <p>Choose a food and number of servings to estimate your intake.</p></div>
        <div className="calorie-total"><strong>{total}</strong><span>/ {dailyTarget} kcal</span></div>
      </div>
      <div className="calorie-progress"><span style={{ width: `${percentage}%` }} /></div>

      <div className="food-picker">
        <label>Food<select value={foodIndex} onChange={(event) => setFoodIndex(Number(event.target.value))}>
          {foods.map((food, index) => <option value={index} key={food.name}>{food.name} — {food.serving} ({food.calories} kcal)</option>)}
        </select></label>
        <label>Servings<input type="number" min="0.25" step="0.25" value={quantity}
          onChange={(event) => setQuantity(event.target.value)} /></label>
        <button type="button" onClick={addFood}><FaPlus /> Add food</button>
      </div>

      <div className="food-log">
        {entries.length === 0 ? <p className="health-empty">No food added yet.</p> : entries.map((item) => (
          <article key={item.id}>
            <div><strong>{item.name}</strong><span>{item.quantity} × {item.serving}</span></div>
            <b>{item.total} kcal</b>
            <button type="button" aria-label={`Remove ${item.name}`}
              onClick={() => setEntries((current) => current.filter((entry) => entry.id !== item.id))}><FaTrash /></button>
          </article>
        ))}
      </div>
      <p className="calorie-disclaimer">Calories are estimates and vary by ingredients and preparation. Your ideal intake depends on age, body size, activity, and medical needs.</p>
    </section>
  );
}

export default CalorieCounter;
