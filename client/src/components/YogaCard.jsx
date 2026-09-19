function YogaCard() {
  return (
    <div className="card shadow border-0 p-4">

      <h3 className="text-center mb-4">
        Daily Yoga Recommendation
      </h3>

      <div className="list-group">

        <div className="list-group-item">
          <h5>🧘 Surya Namaskar</h5>
          <p>Duration: 10 Minutes</p>
          <p>Improves metabolism and hormonal balance.</p>
        </div>

        <div className="list-group-item">
          <h5>🦋 Butterfly Pose</h5>
          <p>Duration: 5 Minutes</p>
          <p>Improves pelvic circulation and flexibility.</p>
        </div>

        <div className="list-group-item">
          <h5>🐍 Cobra Pose</h5>
          <p>Duration: 5 Minutes</p>
          <p>Strengthens the abdomen and reduces stress.</p>
        </div>

        <div className="list-group-item">
          <h5>👶 Child's Pose</h5>
          <p>Duration: 5 Minutes</p>
          <p>Relaxes the body and reduces anxiety.</p>
        </div>

      </div>

    </div>
  );
}

export default YogaCard;