import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CycleTracker.css";

function CycleTracker() {

    const [date,setDate]=useState(new Date());
    const periodDays = new Set(["2026-06-12", "2026-06-13", "2026-06-14", "2026-06-15", "2026-06-16"]);
    const fertileDays = new Set(["2026-06-22", "2026-06-23", "2026-06-24", "2026-06-26", "2026-06-27"]);
    const ovulationDay = "2026-06-25";
    const nextPeriodDay = "2026-07-10";

    const toDateKey = (value) => {
        const year = value.getFullYear();
        const month = String(value.getMonth() + 1).padStart(2, "0");
        const day = String(value.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const getTileClassName = ({ date, view }) => {
        if (view !== "month") return null;

        const key = toDateKey(date);
        if (periodDays.has(key)) return "cycle-day cycle-day-period";
        if (key === ovulationDay) return "cycle-day cycle-day-ovulation";
        if (fertileDays.has(key)) return "cycle-day cycle-day-fertile";
        if (key === nextPeriodDay) return "cycle-day cycle-day-next";
        return null;
    };

    const getTileContent = ({ date, view }) => {
        if (view !== "month") return null;

        const key = toDateKey(date);
        if (periodDays.has(key)) return <span className="cycle-dot period-dot" />;
        if (key === ovulationDay) return <span className="cycle-dot ovulation-dot" />;
        if (fertileDays.has(key)) return <span className="cycle-dot fertile-dot" />;
        if (key === nextPeriodDay) return <span className="cycle-dot next-dot" />;
        return null;
    };

    return(

        <div className="cycle-page">

            <div className="calendar-card">

                <div className="cycle-card-header">
                    <div>
                        <p className="cycle-eyebrow">Your monthly rhythm</p>
                        <h2>Cycle Calendar</h2>
                    </div>
                    <span className="cycle-pill">Day 22</span>
                </div>

                <Calendar

                    onChange={setDate}

                    value={date}

                    tileClassName={getTileClassName}

                    tileContent={getTileContent}

                    next2Label={null}

                    prev2Label={null}

                />

                <div className="cycle-legend">
                    <span><i className="legend-dot period-dot" /> Period</span>
                    <span><i className="legend-dot fertile-dot" /> Fertile window</span>
                    <span><i className="legend-dot ovulation-dot" /> Ovulation</span>
                    <span><i className="legend-dot next-dot" /> Predicted period</span>
                </div>

            </div>

            <div className="cycle-info">

                <div className="info-box period-card">

                    <h4>Last Period</h4>

                    <p>12 June 2026</p>

                    <span>5 days logged</span>

                </div>

                <div className="info-box next-card">

                    <h4>Next Period</h4>

                    <p>10 July 2026</p>

                    <span>Predicted in 7 days</span>

                </div>

                <div className="info-box length-card">

                    <h4>Cycle Length</h4>

                    <p>28 Days</p>

                    <span>Regular pattern</span>

                </div>

                <div className="info-box ovulation-card">

                    <h4>Ovulation</h4>

                    <p>25 June 2026</p>

                    <span>Peak fertility day</span>

                </div>

            </div>

        </div>

    )

}

export default CycleTracker;
