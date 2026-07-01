import { useEffect, useState } from "react";
import api from "../services/api";

function Analytics() {

  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    const res = await api.get("/leads");
    setLeads(res.data);
  };

  const total = leads.length;

  const contacted = leads.filter(
    l => l.status === "Contacted"
  ).length;

  const converted = leads.filter(
    l => l.status === "Converted"
  ).length;

  const newLeads = leads.filter(
    l => l.status === "New"
  ).length;

  return (

    <div className="main-content">

      <h1 className="analytics-title">CRM Analytics</h1>

      <div className="analytics-grid">

        <div className="analytics-card blue">
          <h3>Total Leads</h3>
          <p>{total}</p>
        </div>

        <div className="analytics-card green">
          <h3>Contacted</h3>
          <p>{contacted}</p>
        </div>

        <div className="analytics-card orange">
          <h3>Converted</h3>
          <p>{converted}</p>
        </div>

        <div className="analytics-card pink">
          <h3>New Leads</h3>
          <p>{newLeads}</p>
        </div>

      </div>

    </div>

  );
}

export default Analytics;