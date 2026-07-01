const Lead = require("../models/Lead");

// Create Lead
exports.createLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Leads
exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find();
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Lead
exports.updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Lead
exports.deleteLead = async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);

    res.json({
      message: "Lead Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add Note
exports.addNote = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    lead.notes.push({
      text: req.body.text,
    });

    await lead.save();

    res.json(lead);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};