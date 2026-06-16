import React from 'react';

const AlertsScreen = () => {
  return (
    <div style={{ animation: 'fadeIn 0.15s ease-in-out' }}>
      <div className="ph" style={{ marginBottom: '24px' }}>
        <div>
          <h2 className="ph-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 600 }}>Alerts & Risk Flags</h2>
          <div className="ph-sub" style={{ fontSize: '13px', color: 'var(--grey)', marginTop: '3px' }}>Active across all patients · Reviewed by Allvi clinical team before clinic notification</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '16px' }}>
        <div className="card-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: '15px', fontWeight: 600, marginBottom: '14px' }}>Active Flags</div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '14px 0', borderBottom: '1px solid #F1F5F9' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', background: 'var(--amber-bg)' }}>⚠️</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13px', fontWeight: 600 }}>AMD001RM — Iron & Ferritin — Amber</div>
            <div style={{ fontSize: '12px', color: 'var(--grey)' }}>Ferritin at 19 ng/mL. New 50mg protocol started. Recheck due 6–8 weeks. GI adjustment expected.</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
            <span style={{ background: 'var(--amber-bg)', color: 'var(--amber)', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700 }}>Amber</span>
            <span style={{ fontSize: '11px', color: 'var(--grey)' }}>Since 22 Apr</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsScreen;