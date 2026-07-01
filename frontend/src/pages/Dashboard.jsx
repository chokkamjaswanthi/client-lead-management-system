import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard({ setToken }) {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  
  const [showModal, setShowModal] = useState(false);
  
  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    source: "Website",
    status: "New",
  });

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

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/leads/${id}`, { status });
      fetchLeads();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLead = async (id) => {
    const confirmDelete = window.confirm("Delete this lead?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/leads/${id}`);
      fetchLeads();
    } catch (error) {
      console.log(error);
    }
  };

  const addNote = async (id) => {
    const text = prompt("Enter follow-up note");

    if (!text) return;

    try {
      await api.post(`/leads/${id}/notes`, {
        text,
      });

      alert("Note Added");
      fetchLeads();
    } catch (error) {
      console.log(error);
    }
  };

  const saveLead = async () => {
    if (!newLead.name || !newLead.email) {
      alert("Name and Email are required.");
      return;
    }

    try {

      await api.post("/leads", newLead);

      alert("Lead Added Successfully!");

      setShowModal(false);

      setNewLead({
        name: "",
        email: "",
        phone: "",
        company: "",
        source: "Website",
        status: "New",
      });

      fetchLeads();

    } catch (error) {

      console.log(error);

      alert("Failed to add lead.");

    }

  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalLeads = leads.length;

  const contactedLeads = leads.filter(
    (lead) => lead.status === "Contacted"
  ).length;

  const convertedLeads = leads.filter(
    (lead) => lead.status === "Converted"
  ).length;

  const conversionRate =
    totalLeads === 0
      ? 0
      :Math.round((convertedLeads / totalLeads) * 100);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <>
      <div className="sidebar">
        <h2>Mini CRM</h2>

        <ul>
          <li onClick={() => navigate("/")}>
            📊 Dashboard
          </li>

          <li onClick={() => navigate("/leads")}>
            👥 Leads
          </li>

          <li onClick={() => navigate("/analytics")}>
            📈 Analytics
          </li>
          

          <li onClick={handleLogout}>
            🚪 Logout
          </li>
        </ul>
      </div>

      <div className="main-content">
        <h1 className="title">
          Client Lead Management System
        </h1>

        <div className="cards">
          <div className="card total">
            <h3>Total Leads</h3>
            <p>{totalLeads}</p>
          </div>

          <div className="card contacted">
            <h3>Contacted</h3>
            <p>{contactedLeads}</p>
          </div>

          <div className="card converted">
            <h3>Converted</h3>
            <p>{convertedLeads}</p>
          </div>

          <div className="card conversion">
            <h3>Conversion Rate</h3>
            <p>{conversionRate}%</p>
          </div>
        </div>

        <div className="search-container">
          <input
          type="text"
          placeholder="🔍 Search Leads..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="search-input"
         />
         <button
         className="add-btn"
         onClick={() => setShowModal(true)}
         >
          ➕ Add Lead
        </button>
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
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan="8">No Leads Found</td>
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
                      <select
                        value={lead.status}
                        onChange={(e) =>
                          updateStatus(
                            lead._id,
                            e.target.value
                          )
                        }
                      >
                        <option>New</option>
                        <option>Contacted</option>
                        <option>Converted</option>
                      </select>
                    </td>

                    <td>
                      {lead.notes?.length || 0}
                    </td>

                    <td>
                      <button
                        className="note-btn"
                        onClick={() =>
                          addNote(lead._id)
                        }
                      >
                        Add Note
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteLead(lead._id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              
              <h2>Add New Lead</h2>
              
              <input
              type="text"
              placeholder="Name"
              value={newLead.name}
              onChange={(e)=>
                setNewLead({
                  ...newLead,
                  name:e.target.value
                })
              }
            />
            
            <input
            type="email"
            placeholder="Email"
            value={newLead.email}
            onChange={(e)=>
              setNewLead({
                ...newLead,
                email:e.target.value
              })
            }
          />
          
          <input
            type="tel"
            placeholder="Phone Number"
            value={newLead.phone}
            maxLength={10}
            onChange={(e) => {
              
              const value = e.target.value.replace(/\D/g, "");

              if (value.length <= 10) {

                setNewLead({
                  ...newLead,
                  phone: value,
                });

              }

            }}
          />
        
        <input
          type="text"
          placeholder="Company"
          value={newLead.company}
          onChange={(e)=>
            setNewLead({
              ...newLead,
              company:e.target.value
            })
          }
        />
        
        <select
          value={newLead.source}
          onChange={(e)=>
            setNewLead({
              ...newLead,
              source:e.target.value
            })
          }
        >
          
          <option>Website</option>

          <option>LinkedIn</option>

          <option>Instagram</option>

          <option>Facebook</option>

          <option>Referral</option>

          <option>Walk-in</option>

        </select>

        <select
          value={newLead.status}
          onChange={(e)=>
            setNewLead({
              ...newLead,
              status:e.target.value
            })
          }
        >

          <option>New</option>

          <option>Contacted</option>

          <option>Converted</option>

        </select>
        
        <div className="modal-buttons">

          <button
            className="note-btn"
            onClick={saveLead}
          >
            Save Lead
          </button>

          <button
           className="delete-btn"
           onClick={() =>
            setShowModal(false)
           }
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )}

        <footer className="footer">
          
          <h3>Mini CRM</h3>

          <p>Client Lead Management System</p>

          <p>Built using React • Node.js • Express • MongoDB</p>

          <p>© 2026 All Rights Reserved</p>

        </footer>
      </div>
    </>
  );
}

export default Dashboard;