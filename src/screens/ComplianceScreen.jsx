import React from 'react';

const ComplianceScreen = () => {
  return (
    <div style={{ animation: 'fadeIn 0.15s ease-in-out' }}>
      
      {/* PAGE HEADER */}
      <div className="ph">
        <div>
          <h2 className="ph-title">Compliance</h2>
          <div className="ph-sub">UK GDPR · Data residency · Erasure requests · DPA/BAA status</div>
        </div>
      </div>

      {/* TOP GRIDS PANEL Workspace */}
      <div className="g2">
        
        {/* 📋 CARD 1: DATA RESIDENCY STATUS */}
        <div className="card">
          <div className="card-title">Data Residency Status</div>
          <div className="stat-row">
            <span className="stat-label">UK patients</span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--green)' }}>✓ eu-west-2 (London)</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">US patients</span>
            <span style={{ fontSize: '12px', color: 'var(--grey)' }}>No US patients yet</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">UK Supabase project</span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--green)' }}>✓ Provisioned · eu-west-2</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">US Supabase project</span>
            <span style={{ fontSize: '12px', color: 'var(--grey)' }}>Provisioned · us-east-1 (ready)</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Cross-region PHI transfer</span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--green)' }}>✓ None detected</span>
          </div>
        </div>

        {/* 📋 CARD 2: DPA / BAA STATUS */}
        <div className="card">
          <div className="card-title">DPA / BAA Status</div>
          <div className="stat-row">
            <span className="stat-label">Supabase DPA (UK)</span>
            <span className="badge green">✓ Signed</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Postmark DPA</span>
            <span className="badge green">✓ Signed</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Anthropic DPA</span>
            <span className="badge amber">⚠ Pending</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Stripe DPA</span>
            <span className="badge green">✓ Signed</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Supabase BAA (US)</span>
            <span className="badge grey">Not required yet</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Greenfield Endocrinology DPA</span>
            <span className="badge green">✓ Signed · 1 May 2026</span>
          </div>
        </div>
      </div>

      {/* 📋 CARD 3: GDPR ERASURE REQUESTS TABLE */}
      <div className="card" style={{ marginBottom: '22px' }}>
        <div className="card-title">GDPR Erasure Requests</div>
        <div style={{ overflowX: 'auto', margin: '0 -22px 14px', padding: '0 22px' }}>
          <table className="dt">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Requested</th>
                <th>Status</th>
                <th>Fields to Erase</th>
                <th>Retained (Legal)</th>
                <th>Due By</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', color: 'var(--grey)', padding: '24px' }}>
                  No erasure requests to date
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--grey)', lineHeight: '1.5' }}>
          UK GDPR Right to Erasure — 30-day SLA from request date. Audit log, consent records, and anonymised clinical data are retained per legal obligation.
        </p>
      </div>

      {/* 📋 CARD 4: CONSENT OVERVIEW */}
      <div className="card">
        <div className="card-title">Consent Overview</div>
        <div className="stat-row">
          <span className="stat-label">Patients with valid data processing consent</span>
          <span className="stat-val" style={{ color: 'var(--green)' }}>1 / 1 (100%)</span>
        </div>
        <div className="stat-row">
          <span className="stat-label">Patients with AI processing consent</span>
          <span className="stat-val" style={{ color: 'var(--green)' }}>1 / 1 (100%)</span>
        </div>
        <div className="stat-row">
          <span className="stat-label">Withdrawn consents (last 90 days)</span>
          <span className="stat-val">0</span>
        </div>
      </div>

    </div>
  );
};

export default ComplianceScreen;