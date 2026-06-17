import React, { useState } from 'react';

const ConfigScreen = () => {
  const [activeTab, setActiveTab] = useState('risk');

  return (
    <div style={{ animation: 'fadeIn 0.15s ease-in-out' }}>
      
      {/* PAGE HEADER */}
      <div className="ph">
        <div>
          <h2 className="ph-title">Platform Configuration</h2>
          <div className="ph-sub">Risk thresholds · AI model settings · Notification rules · Prompt versions</div>
        </div>
      </div>

      {/* CORE CONFIGURATION TABS CONTROL PANEL */}
      <div className="tabs" style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '20px' }}>
        {['risk', 'ai', 'notifications'].map((t) => (
          <div
            key={t}
            className={`tab ${activeTab === t ? 'on' : ''}`}
            onClick={() => setActiveTab(t)}
            style={{ cursor: 'pointer' }}
          >
            {t === 'risk' ? 'Risk Thresholds' : t === 'ai' ? 'AI Model' : 'Notifications'}
          </div>
        ))}
      </div>

      {/* 📋 SUB-TAB PANEL 1: RISK THRESHOLDS */}
      {activeTab === 'risk' && (
        <div className="tab-content on">
          <div className="card">
            <div className="card-title">Risk Flag Thresholds — Thyroid Disease</div>
            <p style={{ fontSize: '13px', color: 'var(--grey)', marginBottom: '16px', lineHeight: '1.5' }}>
              These thresholds determine when a Green flag becomes Amber, and when Amber escalates to Red. Applied to all Thyroid patients. Can be overridden per patient by the Allvi clinical team.
            </p>
            
            {/* Responsive Table Wrapper */}
            <div style={{ overflowX: 'auto', margin: '0 -22px', padding: '0 22px' }}>
              <table className="dt" style={{ minWidth: '600px' }}>
                <thead>
                  <tr>
                    <th>Domain</th>
                    <th>Amber Trigger</th>
                    <th>Red Trigger</th>
                    <th>Action on Red</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Medication Response</strong></td>
                    <td style={{ fontSize: '12px' }}>Sweating returns or TSH suppressed &lt;0.3</td>
                    <td style={{ fontSize: '12px' }}>Palpitations, tremor, or chest tightness reported</td>
                    <td style={{ fontSize: '12px' }}>Alert clinic immediately</td>
                  </tr>
                  <tr>
                    <td><strong>Iron & Ferritin</strong></td>
                    <td style={{ fontSize: '12px' }}>GI symptoms on iron protocol</td>
                    <td style={{ fontSize: '12px' }}>GI symptoms &gt;2 weeks or rectal bleeding</td>
                    <td style={{ fontSize: '12px' }}>Escalate to treating clinician</td>
                  </tr>
                  <tr>
                    <td><strong>Gut Function</strong></td>
                    <td style={{ fontSize: '12px' }}>BM frequency &lt;3/5 days for 2 weeks</td>
                    <td style={{ fontSize: '12px' }}>Blood present or severe pain reported</td>
                    <td style={{ fontSize: '12px' }}>Alert clinic immediately</td>
                  </tr>
                  <tr>
                    <td><strong>Mood & Mental Health</strong></td>
                    <td style={{ fontSize: '12px' }}>Unexplained mood dip &gt;2 consecutive days</td>
                    <td style={{ fontSize: '12px' }}>Low mood &gt;5 consecutive days or PTSD symptoms</td>
                    <td style={{ fontSize: '12px' }}>Clinical escalation + safety check</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <button className="btn btn-primary btn-sm" style={{ marginTop: '14px' }}>
              Save Thresholds
            </button>
          </div>
        </div>
      )}

      {/* 🤖 SUB-TAB PANEL 2: AI MODEL CONFIGURATION */}
      {activeTab === 'ai' && (
        <div className="tab-content on">
          <div className="card">
            <div className="card-title">AI Model Configuration</div>
            
            <div className="form-row-2">
              <div className="form-row">
                <label className="form-label">Active model</label>
                <input className="form-input" value="claude-sonnet-4-20250514" readOnly style={{ background: '#F8FAFC', color: 'var(--grey)' }} />
              </div>
              <div className="form-row">
                <label className="form-label">Prompt template version</label>
                <input className="form-input" value="v2.3" readOnly style={{ background: '#F8FAFC', color: 'var(--grey)' }} />
              </div>
            </div>

            <div className="stat-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F1F5F9', flexWrap: 'wrap', gap: '8px' }}>
              <span className="stat-label">AI outputs generated (last 30 days)</span>
              <span className="stat-val" style={{ fontWeight: 600 }}>14</span>
            </div>
            <div className="stat-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F1F5F9', flexWrap: 'wrap', gap: '8px' }}>
              <span className="stat-label">Clinician approval rate</span>
              <span className="stat-val" style={{ color: 'var(--green)', fontWeight: 600 }}>100%</span>
            </div>
            <div className="stat-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F1F5F9', flexWrap: 'wrap', gap: '8px' }}>
              <span className="stat-label">Clinician edit rate</span>
              <span className="stat-val" style={{ fontWeight: 600 }}>43%</span>
            </div>
            <div className="stat-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', flexWrap: 'wrap', gap: '8px' }}>
              <span className="stat-label">Rejections (last 30 days)</span>
              <span className="stat-val" style={{ fontWeight: 600 }}>0</span>
            </div>

            <div className="callout teal" style={{ marginTop: '16px' }}>
              <strong style={{ color: 'var(--teal)' }}>Model updates</strong> require engineering deployment. Contact engineering team to update the active model or prompt template version.
            </div>
          </div>
        </div>
      )}

      {/* 🔔 SUB-TAB PANEL 3: NOTIFICATION RULES */}
      {activeTab === 'notifications' && (
        <div className="tab-content on">
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div className="card-title">Notification Rules</div>
            
            <div className="stat-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F1F5F9', flexWrap: 'wrap', gap: '12px' }}>
              <span className="stat-label">Daily check-in reminder</span>
              <span className="stat-val" style={{ fontSize: '13px', fontWeight: 500 }}>Email · Patient's chosen time</span>
            </div>
            <div className="stat-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F1F5F9', flexWrap: 'wrap', gap: '12px' }}>
              <span className="stat-label">Weekly report delivery</span>
              <span className="stat-val" style={{ fontSize: '13px', fontWeight: 500 }}>Email + In-platform · Every 7 days</span>
            </div>
            <div className="stat-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F1F5F9', flexWrap: 'wrap', gap: '12px' }}>
              <span className="stat-label">Advocacy doc ready</span>
              <span className="stat-val" style={{ fontSize: '13px', fontWeight: 500 }}>Email + In-platform · On approval</span>
            </div>
            <div className="stat-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F1F5F9', flexWrap: 'wrap', gap: '12px' }}>
              <span className="stat-label">Amber flag to clinic</span>
              <span className="stat-val" style={{ fontSize: '13px', fontWeight: 500 }}>Email · After Allvi clinical review</span>
            </div>
            <div className="stat-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F1F5F9', flexWrap: 'wrap', gap: '12px' }}>
              <span className="stat-label">Red flag to clinic</span>
              <span className="stat-val" style={{ fontSize: '13px', fontWeight: 500 }}>Email · Immediate after review</span>
            </div>
            <div className="stat-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F1F5F9', flexWrap: 'wrap', gap: '12px' }}>
              <span className="stat-label">Pre-appointment summary to clinician</span>
              <span className="stat-val" style={{ fontSize: '13px', fontWeight: 500 }}>Email PDF · 5 days before appointment</span>
            </div>
            <div className="stat-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', flexWrap: 'wrap', gap: '12px' }}>
              <span className="stat-label">Advocacy doc trigger</span>
              <span className="stat-val" style={{ fontSize: '13px', fontWeight: 500 }}>7 days before appointment date</span>
            </div>

            <div className="callout teal" style={{ marginTop: '16px' }}>
              <strong style={{ color: 'var(--teal)' }}>Phase 2:</strong> Push notifications, SMS, and WhatsApp delivery will be added here with per-patient configuration.
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ConfigScreen;