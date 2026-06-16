import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab, enrollPatient } from '../store/slices/adminSlice';

const CreatePatientScreen = () => {
  const dispatch = useDispatch();
  const organisations = useSelector((state) => state.admin.organisations || []);
  const loading = useSelector((state) => state.admin.loading);
  const error = useSelector((state) => state.admin.error);

  // 🚀 Local Controlled Input States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedOrg, setSelectedOrg] = useState('');
  const [enrolmentType, setEnrolmentType] = useState('Direct (D2C)');
  const [condition, setCondition] = useState('Thyroid Disease');
  const [region, setRegion] = useState('🇬🇧 UK — eu-west-2');
  const [clinicianEmail, setClinicianEmail] = useState('');
  const [assignedAllviClinician, setAssignedAllviClinician] = useState('Auto-assign');

  // Form Submission Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email || !selectedOrg) {
      alert('Please fill out all required validation fields (*).');
      return;
    }

    // 🌟 Mapped to fit your exact backend parameters:
    // const { fullName, email, primaryCondition, referringClinician, treatingClinicianEmail } = req.body;
    const payload = {
      fullName,
      email,
      primaryCondition: condition, // ➔ mapped
      referringClinician: assignedAllviClinician, // ➔ mapped
      treatingClinicianEmail: clinicianEmail, // ➔ mapped
      // Included trailing tracking metadata just in case
      organization: selectedOrg,
      enrolmentType,
      region
    };

    // Dispatch payload request directly to backend route controller
    dispatch(enrollPatient(payload));
  };

  return (
    <div style={{ animation: 'fadeIn 0.15s ease-in-out' }}>
      
      {/* PAGE HEADER */}
      <div className="ph">
        <div>
          <button 
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
                placeholder="Full name" 
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
                <option>Direct (D2C)</option>
                <option>Clinic referral</option>
                <option>Admin referral</option>
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
                <option>Thyroid Disease</option>
                <option>PCOS</option>
                <option>Endometriosis</option>
                <option>Perimenopause</option>
                <option>Menopause</option>
              </select>
            </div>
            <div className="form-row">
              <label className="form-label">Data region <span style={{ color: '#DC2626' }}>*</span></label>
              <select 
                className="form-select"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option>🇬🇧 UK — eu-west-2</option>
                <option>🇺🇸 US — us-east-1</option>
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
              <option>Auto-assign</option>
              <option>Dr. Priya Mehta</option>
              <option>Dr. James Wilson</option>
            </select>
          </div>

          <div className="callout teal" style={{ marginTop: '20px' }}>
            <strong style={{ color: 'var(--teal)' }}>On submit:</strong> Patient receives a magic link invitation email. Data is created in the <strong>eu-west-2 (London)</strong> Supabase project. Patient appears in the All Patients panel with status: Invited.
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