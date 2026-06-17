import React from 'react';

const ReviewQueueScreen = () => {
  return (
    <div style={{ animation: 'fadeIn 0.15s ease-in-out' }}>
      
      {/* PAGE HEADER */}
      <div className="ph">
        <div>
          <h2 className="ph-title">Clinician Review Queue</h2>
          <div className="ph-sub">7 pending · 1 overdue · AI outputs requiring human validation review</div>
        </div>
      </div>

      {/* OVERDUE TASK ALERT SLA CALLOUT */}
      <div className="callout amber" style={{ marginBottom: '16px' }}>
        <strong>1 overdue task</strong> — AMD001RM advocacy document requested 26 hours ago. Target SLA is 24 hours.
      </div>

      {/* PENDING TASKS MAIN CONTAINER CARD */}
      <div className="card">
        <div className="card-title">Pending Tasks — Sorted by Priority</div>
        
        {/* TASK ROW 1: URGENT RED FLAG */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '14px', 
            padding: '16px', 
            border: '1px solid rgba(15,76,92,0.08)', 
            borderRadius: '8px', 
            background: 'var(--red-bg)', 
            borderLeft: '3px solid var(--red)', 
            marginBottom: '10px',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ fontSize: '16px' }}>🔴</div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ fontSize: '13px', fontWeight: 600 }}>Risk Flag Review — AMD001RM</div>
            <div style={{ fontSize: '12px', color: 'var(--grey)', marginTop: '2px' }}>
              Iron & Ferritin — new Amber flag raised. Allvi clinician review required before clinic notification.
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '120px', justifyContent: 'flex-end' }} className="mobile-queue-actions">
            <span className="badge red">Urgent</span>
            <button className="btn btn-ghost btn-sm">Review</button>
          </div>
        </div>

        {/* TASK ROW 2: OVERDUE ADVOCACY DOC */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '14px', 
            padding: '16px', 
            border: '1px solid rgba(15,76,92,0.08)', 
            borderRadius: '8px', 
            background: 'var(--amber-bg)', 
            borderLeft: '3px solid var(--amber)', 
            marginBottom: '10px',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ fontSize: '16px' }}>📄</div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ fontSize: '13px', fontWeight: 600 }}>Advocacy Document — AMD001RM</div>
            <div style={{ fontSize: '12px', color: 'var(--grey)', marginTop: '2px' }}>
              Pre-appointment summary for endo consultation. Appointment in 5 days. OVERDUE.
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '120px', justifyContent: 'flex-end' }} className="mobile-queue-actions">
            <span className="badge amber">Overdue</span>
            <button className="btn btn-ghost btn-sm">Review</button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ReviewQueueScreen;