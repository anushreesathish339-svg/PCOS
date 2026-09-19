import { FaExchangeAlt, FaLeaf, FaUtensils } from "react-icons/fa";

const swaps = [
  { instead: "Fruit juice", choose: "Whole fruit + a few nuts", why: "More fibre and a slower glucose rise" },
  { instead: "Large white-rice portion", choose: "Smaller rice portion + dal + vegetables", why: "Adds protein and fibre" },
  { instead: "Sugary cereal", choose: "Oats + seeds + unsweetened curd", why: "Less added sugar and more staying power" },
  { instead: "Biscuits or sweets", choose: "Roasted chana, nuts, or curd", why: "Protein-rich snack options" },
  { instead: "Refined-flour bread", choose: "Whole-grain roti or bread", why: "Higher-fibre carbohydrate" },
];

function InsulinFoodGuide() {
  return (
    <section className="health-card insulin-guide">
      <div className="insulin-guide-heading">
        <div><p className="health-kicker">INSULIN-SUPPORTIVE EATING</p>
          <h2>Build meals for a steadier glucose response</h2>
          <p>Food cannot “cure” insulin resistance, but balanced meals can support blood glucose control and insulin sensitivity.</p>
        </div>
        <FaLeaf />
      </div>

      <div className="plate-method">
        <div className="plate-visual" aria-label="Plate divided into vegetables, protein, and quality carbohydrates">
          <span className="plate-veg">½<small>Vegetables</small></span>
          <span className="plate-protein">¼<small>Protein</small></span>
          <span className="plate-carbs">¼<small>Quality carbs</small></span>
        </div>
        <div className="plate-copy">
          <h3><FaUtensils /> Use the plate method</h3>
          <ul>
            <li><strong>½ non-starchy vegetables:</strong> spinach, beans, cauliflower, cucumber, tomato, okra.</li>
            <li><strong>¼ protein:</strong> dal, chana, eggs, fish, chicken, tofu, or paneer.</li>
            <li><strong>¼ quality carbs:</strong> brown rice, millet, oats, whole-grain roti, or sweet potato.</li>
            <li>Choose water or an unsweetened drink.</li>
          </ul>
        </div>
      </div>

      <h3 className="swap-title"><FaExchangeAlt /> Simple food swaps</h3>
      <div className="insulin-swaps">
        {swaps.map((swap) => (
          <article key={swap.instead}>
            <span><small>Instead of</small>{swap.instead}</span>
            <FaExchangeAlt />
            <span><small>Try</small>{swap.choose}<em>{swap.why}</em></span>
          </article>
        ))}
      </div>

      <div className="insulin-tips">
        <p><strong>Pair carbohydrates.</strong> Add protein, healthy fat, or fibre instead of eating carbohydrates alone.</p>
        <p><strong>Keep meals regular.</strong> Avoid extreme restriction, especially if you use glucose-lowering medicine.</p>
        <p><strong>Increase fibre gradually.</strong> Include water and increase slowly if your current intake is low.</p>
      </div>

      <p className="calorie-disclaimer">If you have diabetes, take insulin or glucose-lowering medicine, are pregnant, or experience low blood sugar, ask your clinician or dietitian for an individualized meal plan.</p>
    </section>
  );
}

export default InsulinFoodGuide;
