import React from 'react';

const ReviewQueueScreen = () => {
  return (
    <div style={{ animation: 'fadeIn 0.15s ease-in-out' }}>
      <div className="ph" style={{ marginBottom: '24px' }}>
        <div>
          <h2 className="ph-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 600 }}>Clinician Review Queue</h2>
          <div className="ph-sub" style={{ fontSize: '13px', color: 'var(--grey)', marginTop: '3px' }}>7 pending · 1 overdue · AI outputs requiring human validation review</div>
        </div>
      </div>

      <div style={{ padding: '14px 16px', borderRadius: '10px', background: 'var(--amber-bg)', borderLeft: '3px solid var(--amber)', marginBottom: '16px', fontSize: '13px' }}>
        <strong style={{ color: 'var(--amber)' }}>1 overdue task</strong> — AMD001RM advocacy document requested 26 hours ago. Target SLA is 24 hours.
      </div>

      <div className="card">
        <div className="card-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: '15px', fontWeight: 600, marginBottom: '14px' }}>Pending Tasks — Sorted by Priority</div>
        
        {/* TASK ROW ITEMS LIST SEED BLOCK */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px', border: '1px solid rgba(15,76,92,0.08)', borderRadius: '8px', background: 'var(--red-bg)', borderLeft: '3px solid var(--red)', marginBottom: '10px' }}>
          <div style={{ fontSize: '16px' }}>🔴</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13px', fontWeight: 600 }}>Risk Flag Review — AMD001RM</div>
            <div style={{ fontSize: '12px', color: 'var(--grey)' }}>Iron & Ferritin — new Amber flag raised. Allvi clinician review required before clinic notification.</div>
          </div>
          <div style={{ textAlign: 'right' }}><span style={{ background: 'var(--red-bg)', color: 'var(--red)', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700 }}>Urgent</span></div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px', border: '1px solid rgba(15,76,92,0.08)', borderRadius: '8px', background: 'var(--amber-bg)', borderLeft: '3px solid var(--amber)', marginBottom: '10px' }}>
          <div style={{ fontSize: '16px' }}>📄</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13px', fontWeight: 600 }}>Advocacy Document — AMD001RM</div>
            <div style={{ fontSize: '12px', color: 'var(--grey)' }}>Pre-appointment summary for endo consultation. Appointment in 5 days. OVERDUE.</div>
          </div>
          <div style={{ textAlign: 'right' }}><span style={{ background: 'var(--amber-bg)', color: 'var(--amber)', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700 }}>Overdue</span></div>
        </div>
      </div>
    </div>
  );
};

export default ReviewQueueScreen;