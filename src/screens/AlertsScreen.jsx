import React from 'react';

const AlertsScreen = () => {
  return (
    <div style={{ animation: 'fadeIn 0.15s ease-in-out' }}>
      
      {/* PAGE HEADER */}
      <div className="ph">
        <div>
          <h2 className="ph-title">Alerts & Risk Flags</h2>
          <div className="ph-sub">Active across all patients · Reviewed by Allvi clinical team before clinic notification</div>
        </div>
      </div>

      {/* KPI METRICS BLOCK */}
      <div className="g3" style={{ marginBottom: '20px' }}>
        <div className="kpi rd">
          <div className="kpi-label">Red Flags</div>
          <div className="kpi-val rd">0</div>
          <div className="kpi-sub">No urgent escalations</div>
        </div>
        <div className="kpi am">
          <div className="kpi-label">Amber Flags</div>
          <div className="kpi-val am">2</div>
          <div className="kpi-sub">Monitoring · No immediate action</div>
        </div>
        <div className="kpi gr">
          <div className="kpi-label">Resolved (30 days)</div>
          <div className="kpi-val gr">1</div>
          <div className="kpi-sub">Sweating episode — resolved</div>
        </div>
      </div>

      {/* ACTIVE FLAGS CONTAINER CARD */}
      <div className="card" style={{ marginBottom: '16px' }}>
        <div className="card-title">Active Flags</div>
        
        {/* ROW 1: IRON & FERRITIN */}
        <div className="alert-row" style={{ flexWrap: 'wrap', gap: '14px' }}>
          <div className="alert-icon amber">⚠️</div>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <div className="alert-title">AMD001RM — Iron & Ferritin — Amber</div>
            <div className="alert-detail">
              Ferritin at 19 ng/mL. New 50mg protocol started. Recheck due 6–8 weeks. GI adjustment expected. Clinician monitoring.
            </div>
          </div>
          <div 
            style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}
            className="mobile-alert-actions"
          >
            <span className="badge amber" style={{ alignSelf: 'flex-end' }}>Amber</span>
            <span style={{ fontSize: '11px', color: 'var(--grey)', alignSelf: 'flex-end' }}>Since 22 Apr</span>
            <button className="btn btn-ghost btn-sm" style={{ marginTop: '4px' }}>Escalate to Clinic</button>
          </div>
        </div>

        {/* ROW 2: GUT FUNCTION */}
        <div className="alert-row" style={{ flexWrap: 'wrap', gap: '14px' }}>
          <div className="alert-icon amber">🔶</div>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <div className="alert-title">AMD001RM — Gut Function — Amber</div>
            <div className="alert-detail">
              3/5 BMs this week. Iron protocol driver. Magnesium buffer in place. Patient advised to increase hydration.
            </div>
          </div>
          <div 
            style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}
            className="mobile-alert-actions"
          >
            <span className="badge amber" style={{ alignSelf: 'flex-end' }}>Amber</span>
            <span style={{ fontSize: '11px', color: 'var(--grey)', alignSelf: 'flex-end' }}>Since 22 Apr</span>
            <button className="btn btn-ghost btn-sm" style={{ marginTop: '4px' }}>Escalate to Clinic</button>
          </div>
        </div>
      </div>

      {/* RESOLVED FLAGS HISTORY CARD */}
      <div className="card">
        <div className="card-title">Resolved Flags (Last 30 Days)</div>
        <div className="alert-row" style={{ opacity: 0.7, flexWrap: 'wrap', gap: '14px' }}>
          <div className="alert-icon" style={{ background: 'var(--green-bg)', color: 'var(--green)', fontWeight: 'bold' }}>✓</div>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <div className="alert-title" style={{ color: 'var(--grey)' }}>AMD001RM — Sweating episodes — Resolved</div>
            <div className="alert-detail">
              Reported 12–13 Apr. Resolved by 18 Apr (11 days clear). TSH confirmed not suppressed.
            </div>
          </div>
          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'center' }} className="mobile-alert-actions">
            <span className="badge green" style={{ alignSelf: 'flex-end' }}>Resolved</span>
            <div style={{ fontSpread: 'nowrap', fontSize: '11px', color: 'var(--grey)', marginTop: '4px', alignSelf: 'flex-end' }}>18 Apr 2026</div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AlertsScreen;