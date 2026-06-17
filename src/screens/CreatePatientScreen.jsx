import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab, enrollPatient } from '../store/slices/adminSlice';

const CreatePatientScreen = () => {
  const dispatch = useDispatch();
  const organisations = useSelector((state) => state.admin.organisations || []);
  const loading = useSelector((state) => state.admin.loading);
  const error = useSelector((state) => state.admin.error);

  // 🚀 Local Controlled Input States - Clean placeholders and empty defaults
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedOrg, setSelectedOrg] = useState('');
  const [enrolmentType, setEnrolmentType] = useState('Direct (D2C)');
  const [condition, setCondition] = useState('Thyroid Disease');
  const [region, setRegion] = useState('GB');
  const [clinicianEmail, setClinicianEmail] = useState('');
  const [assignedAllviClinician, setAssignedAllviClinician] = useState('Auto-assign');

  // Form Submission Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email || !selectedOrg) {
      alert('Please fill out all required validation fields (*).');
      return;
    }

    const payload = {
      fullName,
      email,
      primaryCondition: condition, 
      referringClinician: assignedAllviClinician, 
      treatingClinicianEmail: clinicianEmail || null, 
      organization: selectedOrg,
      enrolmentType,
      region
    };

    // 🌟 Chaining .unwrap() redirects to the All Patients directory panel instantly on success
    dispatch(enrollPatient(payload))
      .unwrap()
      .then(() => {
        dispatch(setActiveTab('patients'));
      })
      .catch((err) => {
        console.error("❌ Patient enrolment request rejected:", err);
      });
  };

  return (
    <div style={{ animation: 'fadeIn 0.15s ease-in-out' }}>
      
      {/* PAGE HEADER */}
      <div className="ph">
        <div>
          <button 
            type="button"
            onClick={() => dispatch(setActiveTab('patients'))} 
            style={{ fontSize: '13px', color: 'var(--grey)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: '8px' }}
          >
            ← Back to Patients
          </button>
          <h2 className="ph-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 600 }}>Enrol a Patient</h2>
          <div className="ph-sub">For D2C patients or admin-initiated referrals. Clinic-initiated enrolments go through the clinic dashboard.</div>
        </div>
      </div>

      {/* CORE ENROLMENT FORM CARD */}
      <div className="card">
        {error && (
          <div className="callout red" style={{ color: 'var(--red)', fontWeight: 600 }}>
            ⚠️ Error: {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* ROW 1: NAME & EMAIL */}
          <div className="form-row-2">
            <div className="form-row">
              <label className="form-label">Patient full name <span style={{ color: '#DC2626' }}>*</span></label>
              <input 
                className="form-input" 
                placeholder="e.g. Jane Doe" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="form-row">
              <label className="form-label">Email address <span style={{ color: '#DC2626' }}>*</span></label>
              <input 
                className="form-input" 
                type="email" 
                placeholder="patient@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* ROW 2: ORGANISATION & ENROLMENT TYPE */}
          <div className="form-row-2">
            <div className="form-row">
              <label className="form-label">Organisation <span style={{ color: '#DC2626' }}>*</span></label>
              <select 
                className="form-select"
                value={selectedOrg}
                onChange={(e) => setSelectedOrg(e.target.value)}
              >
                <option value="">Select an organisation…</option>
                {organisations.map((org) => (
                  <option key={org.id} value={org.name}>{org.name}</option>
                ))}
              </select>
            </div>
            <div className="form-row">
              <label className="form-label">Enrolment type</label>
              <select 
                className="form-select"
                value={enrolmentType}
                onChange={(e) => setEnrolmentType(e.target.value)}
              >
                <option value="Direct (D2C)">Direct (D2C)</option>
                <option value="Clinic referral">Clinic referral</option>
                <option value="Admin referral">Admin referral</option>
              </select>
            </div>
          </div>

          {/* ROW 3: CONDITIONS & REGIONAL RESIDENCY */}
          <div className="form-row-2">
            <div className="form-row">
              <label className="form-label">Primary condition(s)</label>
              <select 
                className="form-select"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              >
                <option value="Thyroid Disease">Thyroid Disease</option>
                <option value="PCOS">PCOS</option>
                <option value="Endometriosis">Endometriosis</option>
                <option value="Perimenopause">Perimenopause</option>
                <option value="Menopause">Menopause</option>
              </select>
            </div>
            <div className="form-row">
              <label className="form-label">Data region <span style={{ color: '#DC2626' }}>*</span></label>
              <select 
                className="form-select"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value="GB">🇬🇧 UK — eu-west-2</option>
                <option value="US">🇺🇸 US — us-east-1</option>
              </select>
            </div>
          </div>

          {/* ROW 4: CLINICIAN META ROUTING CHANNELS */}
          <div className="form-row">
            <label className="form-label">Treating clinician email (for pre-appointment summaries)</label>
            <input 
              className="form-input" 
              type="email" 
              placeholder="clinician@practice.com" 
              value={clinicianEmail}
              onChange={(e) => setClinicianEmail(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label className="form-label">Assigned Allvi clinician</label>
            <select 
              className="form-select"
              value={assignedAllviClinician}
              onChange={(e) => setAssignedAllviClinician(e.target.value)}
            >
              <option value="Auto-assign">Auto-assign</option>
              <option value="Dr. Priya Mehta">Dr. Priya Mehta</option>
              <option value="Dr. James Wilson">Dr. James Wilson</option>
            </select>
          </div>

          <div className="callout teal" style={{ marginTop: '20px' }}>
            <strong style={{ color: 'var(--teal)' }}>On submit:</strong> Patient receives a magic link invitation email. Data is created in the correct database region project. Patient appears in the All Patients panel with status: Invited.
          </div>

          {/* FORM DEPLOYMENT FOOTER ACTIONS */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={loading}
            >
              {loading ? 'Sending Request...' : 'Send Invitation →'}
            </button>
            <button 
              type="button" 
              className="btn btn-ghost" 
              onClick={() => dispatch(setActiveTab('patients'))}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default CreatePatientScreen;