import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Leads() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await api.get("/leads");
      setLeads(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="main-content">

      <h1 className="page-title">
        👥 Lead Management
      </h1>

      <div className="lead-top">

        <div className="lead-card">
          <h3>Total Leads</h3>
          <h1>{leads.length}</h1>
        </div>

        <button
          className="dashboard-btn"
          onClick={() => navigate("/")}
        >
          🏠 Dashboard
        </button>

      </div>

      <div className="search-box">

        <input
          type="text"
          placeholder="🔍 Search by Name or Email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="table-container">

        <table className="lead-table">

          <thead>

            <tr>

              <th>Name</th>

              <th>Email</th>

              <th>Phone</th>

              <th>Company</th>

              <th>Source</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {filteredLeads.length === 0 ? (

              <tr>

                <td colSpan="6">

                  No Leads Found

                </td>

              </tr>

            ) : (

              filteredLeads.map((lead) => (

                <tr key={lead._id}>

                  <td>{lead.name}</td>

                  <td>{lead.email}</td>

                  <td>{lead.phone}</td>

                  <td>{lead.company}</td>

                  <td>{lead.source}</td>

                  <td>

                    <span
                      className={`status ${lead.status.toLowerCase()}`}
                    >
                      {lead.status}
                    </span>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Leads;