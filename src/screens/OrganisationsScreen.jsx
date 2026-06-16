import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab } from '../store/slices/adminSlice';

const OrganisationsScreen = () => {
  const dispatch = useDispatch();
  const organisations = useSelector((state) => state.admin.organisations || []);
  const patients = useSelector((state) => state.admin.patients || []);

  const [selectedOrgId, setSelectedOrgId] = useState(organisations[0]?.id || null);
  const [activeSubTab, setActiveSubTab] = useState('details');

  const selectedOrg = organisations.find(o => o.id === selectedOrgId) || organisations[0];
  const activePatientsForOrg = patients.filter(p => p.organization === selectedOrg?.name);

  return (
    <div style={{ animation: 'fadeIn 0.15s ease-in-out' }}>
      
      {/* PH HEADER */}
      <div className="ph" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 className="ph-title">Organisations</h2>
          <div className="ph-sub">{organisations.length} active · 0 pending · 0 inactive</div>
        </div>
        <button className="btn btn-primary" onClick={() => dispatch(setActiveTab('org-create'))}>
          + Create Organisation
        </button>
      </div>

      {/* TOP MASTER ORGANISATIONS TABLE */}
      <div className="card" style={{ padding: 0, overflowX: 'auto', marginBottom: '20px' }}>
        <table className="dt">
          <thead>
            <tr>
              <th>Organisation</th>
              <th>Type</th>
              <th>Region</th>
              <th>Patients</th>
              <th>Pricing</th>
              <th>DPA</th>
              <th>BAA</th>
              <th>Contract End</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {organisations.map((org) => (
              <tr 
                key={org.id} 
                className="clickable" 
                onClick={() => setSelectedOrgId(org.id)}
                style={{ background: selectedOrgId === org.id ? 'var(--teal-light)' : 'transparent' }}
              >
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display', serif", fontSize: '14px', color: 'var(--ivory)', flexShrink: 0 }}>
                      {org.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600 }}>{org.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--grey)' }}>{org.id?.substring(0, 8)}...</div>
                    </div>
                  </div>
                </td>
                <td>{org.type || 'Private Clinic'}</td>
                <td><span className="badge teal">🇬🇧 UK</span></td>
                <td>{patients.filter(p => p.organization === org.name).length} active</td>
                <td style={{ fontSize: '12px' }}>£99/patient/mo<br/><span style={{ color: 'var(--grey)' }}>30% rev share</span></td>
                <td><span className="badge green">✓ Signed</span></td>
                <td><span className="badge grey">N/A</span></td>
                <td style={{ fontSize: '12px', color: 'var(--grey)' }}>31 Dec 2026</td>
                <td><span className="badge green">{org.status || 'Active'}</span></td>
                <td><button className="btn btn-ghost btn-sm">Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* BOTTOM MANAGEMENT TABBED CARD */}
      {selectedOrg && (
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '12px', background: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display', serif", fontSize: '24px', color: 'var(--ivory)' }}>
                {selectedOrg.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 600 }}>{selectedOrg.name}</div>
                <div style={{ fontSize: '13px', color: 'var(--grey)', marginTop: '2px' }}>{selectedOrg.type || 'Private Clinic'} · UK · eu-west-2 (London)</div>
                <span className="badge green" style={{ marginTop: '6px', display: 'inline-flex' }}>Active</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn btn-ghost btn-sm">Edit Details</button>
              <button className="btn btn-danger btn-sm">Deactivate</button>
            </div>
          </div>

          <div className="tabs">
            {['details', 'branding', 'members', 'billing'].map((tab) => (
              <div
                key={tab}
                className={`tab ${activeSubTab === tab ? 'on' : ''}`}
                onClick={() => setActiveSubTab(tab)}
              >
                {tab === 'members' ? 'Team Members' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </div>
            ))}
          </div>

          <div className="tab-content on">
            {/* 📋 PANEL 1: DETAILS */}
            {activeSubTab === 'details' && (
              <div>
                <div className="form-row-2">
                  <div className="form-row" style={{ marginBottom: 0 }}>
                    <label className="form-label">Organisation name</label>
                    <input className="form-input" defaultValue={selectedOrg.name} />
                  </div>
                  <div className="form-row" style={{ marginBottom: 0 }}>
                    <label className="form-label">Organisation type</label>
                    <select className="form-select" defaultValue={selectedOrg.type || "Private Clinic"}>
                      <option>Private Clinic</option>
                      <option>Health System</option>
                      <option>Health Plan</option>
                      <option>Employer</option>
                    </select>
                  </div>
                </div>
                <div className="form-row-2" style={{ marginTop: '16px' }}>
                  <div>
                    <label className="form-label">Region</label>
                    <select className="form-select">
                      <option>🇬🇧 UK — eu-west-2 (London)</option>
                      <option>🇺🇸 US — us-east-1 (N. Virginia)</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Pricing model</label>
                    <select className="form-select">
                      <option>Per Patient Per Month (PPPM)</option>
                      <option>Per Employee Per Month (PEPM)</option>
                      <option>D2C</option>
                    </select>
                  </div>
                </div>
                <div className="form-row-2" style={{ marginTop: '16px' }}>
                  <div>
                    <label className="form-label">Monthly rate (£)</label>
                    <input className="form-input" defaultValue="99" />
                  </div>
                  <div>
                    <label className="form-label">Revenue share (%)</label>
                    <input className="form-input" defaultValue="30" />
                  </div>
                </div>
                <div className="form-row-2" style={{ marginTop: '16px' }}>
                  <div>
                    <label className="form-label">DPA signed date</label>
                    <input className="form-input" type="date" defaultValue="2026-05-01" />
                  </div>
                  <div>
                    <label className="form-label">Contract end date</label>
                    <input className="form-input" type="date" defaultValue="2026-12-31" />
                  </div>
                </div>
                <div style={{ marginTop: '16px' }}>
                  <button className="btn btn-primary">Save Changes</button>
                </div>
              </div>
            )}

            {/* 🎨 PANEL 2: BRANDING */}
            {activeSubTab === 'branding' && (
              <div>
                <p style={{ fontSize: '13px', color: 'var(--grey)', marginBottom: '20px' }}>
                  Branding is applied to all patient-facing emails and the web app for patients enrolled under this organisation. The patient never sees the Allvi name — they see the clinic's brand.
                </p>
                <div className="form-row-2">
                  <div>
                    <label className="form-label">Clinic logo</label>
                    <div className="logo-upload">
                      <div className="logo-preview">{selectedOrg.name?.charAt(0).toUpperCase()}</div>
                      <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--teal)' }}>Click to upload new logo</div>
                      <div style={{ fontSize: '12px', color: 'var(--grey)', marginTop: '4px' }}>PNG or SVG · max 2MB · recommended 200×200px</div>
                    </div>
                  </div>
                  <div>
                    <div className="form-row"><label className="form-label">Display name (patient-facing)</label><input className="form-input" defaultValue={selectedOrg.name} /></div>
                    <div className="form-row"><label className="form-label">Sender name (emails from:)</label><input className="form-input" defaultValue={`${selectedOrg.name} Care Team`} /></div>
                    <div className="form-row"><label className="form-label">Primary colour (hex)</label><input className="form-input" defaultValue="#0F4C5C" placeholder="#0F4C5C" /></div>
                    <div className="form-row"><label className="form-label">Support email (patient replies go to)</label><input className="form-input" defaultValue="care@practice.com" type="email" /></div>
                  </div>
                </div>
                <div className="callout teal" style={{ marginTop: '8px' }}>
                  <strong style={{ color: 'var(--teal)' }}>Preview:</strong> Patients enrolled under this org will see "{selectedOrg.name} Care Team" as the sender name in all emails, with the Greenfield logo in the header. The Allvi name does not appear anywhere in the patient experience.
                </div>
                <button className="btn btn-primary" style={{ marginTop: '4px' }}>Save Branding</button>
              </div>
            )}

            {/* 👥 PANEL 3: MEMBERS */}
            {activeSubTab === 'members' && (
              <div>
                <table className="dt" style={{ marginBottom: '16px' }}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>MFA</th>
                      <th>Last Login</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Dr. Sarah Chen</strong></td>
                      <td style={{ fontSize: '12px' }}>sarah.chen@practice.com</td>
                      <td><span className="badge teal">Programme Manager</span></td>
                      <td><span className="badge green">✓</span></td>
                      <td style={{ fontSize: '12px', color: 'var(--grey)' }}>Today</td>
                      <td><span className="badge green">Active</span></td>
                      <td><button className="btn btn-ghost btn-sm">Edit</button></td>
                    </tr>
                    <tr>
                      <td><strong>Anthony H.</strong></td>
                      <td style={{ fontSize: '12px' }}>anthony@practice.com</td>
                      <td><span className="badge purple">Executive</span></td>
                      <td><span className="badge green">✓</span></td>
                      <td style={{ fontSize: '12px', color: 'var(--grey)' }}>Mon</td>
                      <td><span className="badge green">Active</span></td>
                      <td><button className="btn btn-ghost btn-sm">Edit</button></td>
                    </tr>
                  </tbody>
                </table>
                <button className="btn btn-ghost btn-sm">+ Invite Team Member</button>
              </div>
            )}

            {/* 💰 PANEL 4: BILLING */}
            {activeSubTab === 'billing' && (
              <div>
                <div className="g3">
                  <div className="kpi gr">
                    <div className="kpi-label">Revenue MTD</div>
                    <div className="kpi-val gr">£{activePatientsForOrg.length * 99 || 99}</div>
                    <div className="kpi-sub">{activePatientsForOrg.length || 1} patient × £99</div>
                  </div>
                  <div className="kpi">
                    <div className="kpi-label">Revenue YTD</div>
                    <div className="kpi-val">£198</div>
                    <div className="kpi-sub">2 months active</div>
                  </div>
                  <div className="kpi am">
                    <div className="kpi-label">Rev Share Due</div>
                    <div className="kpi-val am">£29.70</div>
                    <div className="kpi-sub">30% of £99</div>
                  </div>
                </div>
                <table className="dt" style={{ marginTop: '20px' }}>
                  <thead>
                    <tr>
                      <th>Month</th>
                      <th>Patients</th>
                      <th>Gross</th>
                      <th>Rev Share (30%)</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>June 2026</td>
                      <td>{activePatientsForOrg.length || 1}</td>
                      <td>£{activePatientsForOrg.length * 99 || 99}</td>
                      <td>£29.70</td>
                      <td><span className="badge amber">Pending</span></td>
                    </tr>
                    <tr>
                      <td>May 2026</td>
                      <td>1</td>
                      <td>£99</td>
                      <td>£29.70</td>
                      <td><span className="badge green">Paid</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganisationsScreen;