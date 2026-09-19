function DietCard() {
  return (
    <div className="card shadow border-0 p-4">

      <h3 className="text-center mb-4">
        Personalized Diet Plan
      </h3>

      <div className="row text-center mb-4">

        <div className="col">
          <h5>Calories</h5>
          <p>1800 kcal</p>
        </div>

        <div className="col">
          <h5>Protein</h5>
          <p>90 g</p>
        </div>

        <div className="col">
          <h5>Carbs</h5>
          <p>220 g</p>
        </div>

        <div className="col">
          <h5>Fats</h5>
          <p>55 g</p>
        </div>

      </div>

      <div className="list-group">

        <div className="list-group-item">
          🥣 <strong>Breakfast</strong><br />
          Oats + Milk + Banana
        </div>

        <div className="list-group-item">
          🍛 <strong>Lunch</strong><br />
          Brown Rice + Grilled Chicken + Salad
        </div>

        <div className="list-group-item">
          🍎 <strong>Snacks</strong><br />
          Apple + Almonds
        </div>

        <div className="list-group-item">
          🥗 <strong>Dinner</strong><br />
          Chapati + Paneer + Vegetables
        </div>

      </div>

      <div className="mt-4 text-center">

        <h5>💧 Water Intake</h5>

        <h4>2.5 Litres</h4>

      </div>

    </div>
  );
}

export default DietCard;