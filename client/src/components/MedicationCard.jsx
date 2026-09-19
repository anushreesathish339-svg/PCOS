import { useEffect, useState } from "react";
import API from "../services/api";

function MedicationCard() {

    const [medications, setMedications] = useState([]);

    useEffect(() => {
        fetchMedications();
    }, []);

    const fetchMedications = async () => {
        try {

            const res = await API.get("/medications");

            setMedications(res.data.data);

        } catch (error) {

            console.log(error);

        }
    };

    return (
        <div className="card">

            <h3>Medication Schedule</h3>

            {medications.length === 0 ? (

                <p>No Medication Added</p>

            ) : (

                medications.map((item) => (

                    <div
                        key={item._id}
                        className="list-card"
                    >

                        <h4>{item.medicineName}</h4>

                        <p>
                            Dosage :
                            {item.dosage}
                        </p>

                        <p>
                            Frequency :
                            {item.frequency}
                        </p>

                        <p>
                            Reminder :
                            {item.reminderTime}
                        </p>

                        <p>
                            Status :
                            {item.status}
                        </p>

                    </div>

                ))

            )}

        </div>
    );
}

export default MedicationCard;