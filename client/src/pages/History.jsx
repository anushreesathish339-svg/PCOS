import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
    getPredictionHistory,
    deletePrediction
} from "../services/historyService";

function History() {

    const [predictions, setPredictions] = useState([]);

    useEffect(() => {

        loadHistory();

    }, []);

    const loadHistory = async () => {

        try {

            const res = await getPredictionHistory();

            setPredictions(res.data.data);

        } catch (error) {

            console.log(error);

        }

    };

    const removePrediction = async (id) => {

        if (!window.confirm("Delete this prediction?"))
            return;

        try {

            await deletePrediction(id);

            loadHistory();

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <DashboardLayout>

            <h2 className="mb-4">

                Prediction History

            </h2>

            <div className="table-responsive">

                <table className="table table-bordered table-hover">

                    <thead className="table-dark">

                        <tr>

                            <th>Date & Time</th>

                            <th>Prediction</th>

                            <th>Risk (%)</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            predictions.length === 0 ?

                                <tr>

                                    <td colSpan="4">

                                        No Prediction History

                                    </td>

                                </tr>

                                :

                                predictions.map((item) => (

                                    <tr key={item._id}>

                                        <td>

                                            {
                                                new Date(item.createdAt).toLocaleString(undefined, {
                                                    dateStyle: "medium",
                                                    timeStyle: "short"
                                                })
                                            }

                                        </td>

                                        <td>

                                            {item.prediction}

                                        </td>

                                        <td>

                                            {item.probability}%

                                        </td>

                                        <td>

                                            <button

                                                className="btn btn-danger btn-sm"

                                                onClick={() =>
                                                    removePrediction(item._id)
                                                }

                                            >

                                                Delete

                                            </button>

                                        </td>

                                    </tr>

                                ))

                        }

                    </tbody>

                </table>

            </div>

        </DashboardLayout>

    );

}

export default History;