import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab, createOrganisation } from '../store/slices/adminSlice';

const CreateOrgScreen = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.admin.loading);
  const error = useSelector((state) => state.admin.error);

  // 🚀 Initial layout placeholders (Empty state elements)
  const [name, setName] = useState('');
  const [type, setType] = useState('private_clinic');
  const [region, setRegion] = useState('GB');
  const [ehrSystem, setEhrSystem] = useState('');
  const [contractStart, setContractStart] = useState('');
  const [contractEnd, setContractEnd] = useState('');
  const [pricingModel, setPricingModel] = useState('pppm');
  const [rate, setRate] = useState('');
  const [revShare, setRevShare] = useState('');

  // Branding Whitelabel
  const [displayName, setDisplayName] = useState('');
  const [senderName, setSenderName] = useState('');
  const [primaryColour, setPrimaryColour] = useState('#0F4C5C');

  // Admin User Provisioning 
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminRole, setAdminRole] = useState('org_admin');

  // Compliance Flags
  const [dpaSignedAt, setDpaSignedAt] = useState('');
  const [baaSignedAt, setBaaSignedAt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !type || !adminName || !adminEmail) {
      alert('Please complete all required validation parameters (*).');
      return;
    }

    const payload = {
      name,
      type,
      country_code: region,
      contract_start: contractStart || null,
      contract_end: contractEnd || null,
      pricing_model: pricingModel,
      pricing_rate: rate ? parseFloat(rate) : 0,
      dpa_signed_at: dpaSignedAt || null,
      baa_signed_at: baaSignedAt || null,
      whitelabel_brand: {
        displayName: displayName || name,
        senderName: senderName || `${name} Care Team`,
        primaryColour: primaryColour,
        ehrSystem: ehrSystem
      },
      adminUser: {
        fullName: adminName,
        email: adminEmail,
        role: adminRole // ➔ Sends 'org_admin' directly to backend matching check constraints
      }
    };

    // Chaining unwrap to gracefully catch success response vectors and route tab transitions
    dispatch(createOrganisation(payload))
      .unwrap()
      .then(() => {
        dispatch(setActiveTab('orgs'));
      })
      .catch((err) => {
        console.error("❌ Organisation setup validation rejected:", err);
      });
  };

  const sectionHeaderStyle = {
    fontSize: '15px',
    fontWeight: 600,
    color: 'var(--teal)',
    marginBottom: '16px',
    paddingBottom: '10px',
    borderBottom: '1px solid #F1F5F9',
  };

  return (
    <div style={{ animation: 'fadeIn 0.15s ease-in-out' }}>
      
      {/* PAGE HEADER */}
      <div className="ph" style={{ marginBottom: '24px' }}>
        <div>
          <button
            type="button"
            onClick={() => dispatch(setActiveTab('orgs'))}
            style={{ fontSize: '13px', color: 'var(--grey)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: '8px' }}
          >
            ← Back to Organisations
          </button>
          <h2 className="ph-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 600 }}>Create Organisation</h2>
          <div className="ph-sub">Creates the org account, configures branding, and sends login credentials to the admin.</div>
        </div>
      </div>

      <div className="card">
        {error && <div className="callout red">⚠️ Error: {error}</div>}

        <form onSubmit={handleSubmit}>
          {/* SECTION 1: ORGANISATION DETAILS */}
          <h3 style={sectionHeaderStyle}>1. Organisation Details</h3>
          <div className="form-row-2">
            <div className="form-row">
              <label className="form-label">Organisation name <span style={{ color: '#DC2626' }}>*</span></label>
              <input className="form-input" placeholder="e.g. Greenfield Endocrinology" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-row">
              <label className="form-label">Organisation type <span style={{ color: '#DC2626' }}>*</span></label>
              <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="private_clinic">Private Clinic</option>
                <option value="health_system">Health System</option>
                <option value="health_plan">Health Plan</option>
                <option value="employer">Employer</option>
              </select>
            </div>
          </div>
          <div className="form-row-2">
            <div className="form-row">
              <label className="form-label">Data region <span style={{ color: '#DC2626' }}>*</span></label>
              <select className="form-select" value={region} onChange={(e) => setRegion(e.target.value)}>
                <option value="GB">🇬🇧 UK — eu-west-2 (London)</option>
                <option value="US">🇺🇸 US — us-east-1 (N. Virginia)</option>
              </select>
            </div>
            <div className="form-row">
              <label className="form-label">EHR / patient system</label>
              <input className="form-input" placeholder="e.g. Semble, Epic, None" value={ehrSystem} onChange={(e) => setEhrSystem(e.target.value)} />
            </div>
          </div>
          <div className="form-row-2">
            <div className="form-row">
              <label className="form-label">Contract start date</label>
              <input className="form-input" type="date" value={contractStart} onChange={(e) => setContractStart(e.target.value)} />
            </div>
            <div className="form-row">
              <label className="form-label">Contract end date</label>
              <input className="form-input" type="date" value={contractEnd} onChange={(e) => setContractEnd(e.target.value)} />
            </div>
          </div>
          <div className="form-row-2">
            <div className="form-row">
              <label className="form-label">Pricing model <span style={{ color: '#DC2626' }}>*</span></label>
              <select className="form-select" value={pricingModel} onChange={(e) => setPricingModel(e.target.value)}>
                <option value="pppm">Per Patient Per Month (PPPM)</option>
                <option value="pepm">Per Employee Per Month (PEPM)</option>
                <option value="d2c">D2C</option>
              </select>
            </div>
            <div className="form-row">
              <label className="form-label">Rate (£ or $)</label>
              <input className="form-input" placeholder="e.g. 99" value={rate} onChange={(e) => setRate(e.target.value)} />
            </div>
          </div>
          <div className="form-row">
            <label className="form-label">Revenue share %</label>
            <input className="form-input" placeholder="e.g. 30" style={{ width: '120px' }} value={revShare} onChange={(e) => setRevShare(e.target.value)} />
          </div>

          {/* SECTION 2: BRANDING (WHITELABEL) */}
          <h3 style={{ ...sectionHeaderStyle, marginTop: '24px' }}>2. Branding (Whitelabel)</h3>
          <div className="form-row-2">
            <div>
              <label className="form-label">Clinic logo</label>
              <div className="logo-upload">
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>📁</div>
                <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--teal)' }}>Upload logo</div>
                <div style={{ fontSize: '12px', color: 'var(--grey)', marginTop: '4px' }}>PNG or SVG · max 2MB</div>
              </div>
            </div>
            <div>
              <div className="form-row"><label className="form-label">Display name (patient-facing)</label><input className="form-input" placeholder="e.g. Greenfield Endocrinology" value={displayName} onChange={(e) => setDisplayName(e.target.value)} /></div>
              <div className="form-row"><label className="form-label">Sender name (from: in emails)</label><input className="form-input" placeholder="e.g. Greenfield Care Team" value={senderName} onChange={(e) => setSenderName(e.target.value)} /></div>
              <div className="form-row"><label className="form-label">Primary colour (hex)</label><input className="form-input" placeholder="#0F4C5C" value={primaryColour} onChange={(e) => setPrimaryColour(e.target.value)} /></div>
            </div>
          </div>

          {/* SECTION 3: ADMIN ACCOUNT (FIRST USER) */}
          <h3 style={{ ...sectionHeaderStyle, marginTop: '24px' }}>3. Admin Account (First User)</h3>
          <p style={{ fontSize: '13px', color: 'var(--grey)', marginBottom: '16px' }}>
            An account will be created for this person. They will receive an email with a temporary password and instructions to log in and set up the rest of the team.
          </p>
          <div className="form-row-2">
            <div className="form-row">
              <label className="form-label">Admin full name <span style={{ color: '#DC2626' }}>*</span></label>
              <input className="form-input" placeholder="e.g. Dr. Sarah Chen" value={adminName} onChange={(e) => setAdminName(e.target.value)} />
            </div>
            <div className="form-row">
              <label className="form-label">Admin email <span style={{ color: '#DC2626' }}>*</span></label>
              <input className="form-input" type="email" placeholder="sarah.chen@clinic.com" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} />
            </div>
          </div>
          <div className="form-row">
            <label className="form-label">Admin role</label>
            <select
              className="form-select"
              style={{ maxWidth: '280px' }}
              value={adminRole}
              onChange={(e) => setAdminRole(e.target.value)}
            >
              <option value="org_admin">Programme Manager (Org Admin)</option>
              <option value="org_admin">Executive (Org Admin)</option>
            </select>
          </div>

          <div className="callout teal" style={{ marginTop: '16px' }}>
            <strong style={{ color: 'var(--teal)' }}>What happens on submit:</strong> Org account is created in the correct Supabase region (eu-west-2 for UK). Admin receives a welcome email with their login link and temporary password.
          </div>

          {/* SECTION 4: COMPLIANCE */}
          <h3 style={{ ...sectionHeaderStyle, marginTop: '24px' }}>4. Compliance</h3>
          <div className="form-row-2">
            <div className="form-row">
              <label className="form-label">DPA signed date</label>
              <input className="form-input" type="date" value={dpaSignedAt} onChange={(e) => setDpaSignedAt(e.target.value)} />
            </div>
            <div className="form-row">
              <label className="form-label">BAA signed date (US only)</label>
              <input className="form-input" type="date" disabled={region !== 'US'} style={{ opacity: region === 'US' ? 1 : 0.5 }} value={baaSignedAt} onChange={(e) => setBaaSignedAt(e.target.value)} />
            </div>
          </div>

          {/* FORM ACTIONS */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Processing...' : 'Create Organisation & Send Credentials →'}
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => dispatch(setActiveTab('orgs'))} disabled={loading}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOrgScreen;