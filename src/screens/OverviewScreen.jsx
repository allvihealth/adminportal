import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlatformOverview, setActiveTab } from '../store/slices/adminSlice';

const OverviewScreen = () => {
  const dispatch = useDispatch();
  const { metrics, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchPlatformOverview());
  }, [dispatch]);

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'var(--grey)', fontSize: '14px', fontStyle: 'italic' }}>
        🔄 Syncing platform telemetry matrices...
      </div>
    );
  }

  return (
    <div style={{ animation: 'fadeIn 0.15s ease-in-out' }}>
      <div className="ph" style={{ marginBottom: '24px' }}>
        <div>
          <h2 className="ph-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 600 }}>Platform Overview</h2>
          <div className="ph-sub" style={{ fontSize: '13px', color: 'var(--grey)', marginTop: '3px' }}>All organisations · All patients · Live data · June 2026</div>
        </div>
      </div>

      {/* KPI GRID CONTAINER */}
      <div className="g4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '22px' }}>
        <div className="kpi" style={{ background: 'var(--white)', borderRadius: 'var(--radius)', padding: '20px', boxShadow: 'var(--shadow-sm)', border: '1px solid rgba(15,76,92,0.06)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ content: "''", position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'var(--teal)' }} />
          <div className="kpi-label" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--grey)', marginBottom: '8px' }}>Total Patients</div>
          <div className="kpi-val" style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', color: 'var(--teal)' }}>{metrics.totalPatients}</div>
          <div className="kpi-sub" style={{ fontSize: '12px', color: 'var(--grey)', marginTop: '6px' }}>↑ 1 this month</div>
        </div>

        <div className="kpi" style={{ background: 'var(--white)', borderRadius: 'var(--radius)', padding: '20px', boxShadow: 'var(--shadow-sm)', border: '1px solid rgba(15,76,92,0.06)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ content: "''", position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'var(--green)' }} />
          <div className="kpi-label" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--grey)', marginBottom: '8px' }}>Active Organisations</div>
          <div className="kpi-val gr" style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', color: 'var(--green)' }}>{metrics.activeOrganisations}</div>
          <div className="kpi-sub" style={{ fontSize: '12px', color: 'var(--grey)', marginTop: '6px' }}>1 clinic · 1 D2C</div>
        </div>

        <div className="kpi" style={{ background: 'var(--white)', borderRadius: 'var(--radius)', padding: '20px', boxShadow: 'var(--shadow-sm)', border: '1px solid rgba(15,76,92,0.06)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ content: "''", position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'var(--amber)' }} />
          <div className="kpi-label" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--grey)', marginBottom: '8px' }}>Review Queue</div>
          <div className="kpi-val am" style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', color: 'var(--amber)' }}>{metrics.reviewQueueCount}</div>
          <div className="kpi-sub" style={{ fontSize: '12px', color: 'var(--grey)', marginTop: '6px' }}>3 high priority</div>
        </div>

        <div className="kpi" style={{ background: 'var(--white)', borderRadius: 'var(--radius)', padding: '20px', boxShadow: 'var(--shadow-sm)', border: '1px solid rgba(15,76,92,0.06)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ content: "''", position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'var(--red)' }} />
          <div className="kpi-label" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--grey)', marginBottom: '8px' }}>Active Red Flags</div>
          <div className="kpi-val rd" style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', color: 'var(--red)' }}>{metrics.activeRedFlags}</div>
          <div className="kpi-sub" style={{ fontSize: '12px', color: 'var(--grey)', marginTop: '6px' }}>2 amber · 0 red</div>
        </div>
      </div>

      {/* METRICS & ACTIVITIES SPLIT GRID */}
      <div className="g2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '22px' }}>
        <div className="card">
          <div className="card-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: '15px', fontWeight: 600, marginBottom: '14px' }}>Platform Health</div>
          <div className="stat-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', borderBottom: '1px solid #F1F5F9', fontSize: '13px' }}><span style={{ color: 'var(--grey)' }}>Avg check-in compliance (all patients)</span><span style={{ fontWeight: 700, color: 'var(--green)' }}>100%</span></div>
          <div className="stat-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', borderBottom: '1px solid #F1F5F9', fontSize: '13px' }}><span style={{ color: 'var(--grey)' }}>Avg time to protocol delivery</span><span style={{ fontWeight: 700 }}>8.2 days</span></div>
          <div className="stat-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', borderBottom: '1px solid #F1F5F9', fontSize: '13px' }}><span style={{ color: 'var(--grey)' }}>Avg weekly report turnaround</span><span style={{ fontWeight: 700 }}>6.4 hours</span></div>
          <div className="stat-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', borderBottom: '1px solid #F1F5F9', fontSize: '13px' }}><span style={{ color: 'var(--grey)' }}>Avg message response time</span><span style={{ fontWeight: 700 }}>4.1 hours</span></div>
          <div className="stat-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', borderBottom: '1px solid #F1F5F9', fontSize: '13px' }}><span style={{ color: 'var(--grey)' }}>Overdue review tasks</span><span style={{ fontWeight: 700, color: 'var(--amber)' }}>1</span></div>
          <div className="stat-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', borderBottom: 'none', fontSize: '13px' }}><span style={{ color: 'var(--grey)' }}>DPAs signed</span><span style={{ fontWeight: 700, color: 'var(--green)' }}>2 / 2</span></div>
        </div>

        <div className="card">
          <div className="card-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: '15px', fontWeight: 600, marginBottom: '14px' }}>Recent Activity</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '11px 0', borderBottom: '1px solid #F1F5F9', fontSize: '13px' }}><div style={{ fontSize: '11px', color: 'var(--grey)', minWidth: '110px' }}>Today, 09:14</div><div style={{ flex: 1 }}>AMD001RM submitted daily check-in · Day 77</div></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '11px 0', borderBottom: '1px solid #F1F5F9', fontSize: '13px' }}><div style={{ fontSize: '11px', color: 'var(--grey)', minWidth: '110px' }}>Today, 08:51</div><div style={{ flex: 1 }}>Week 12 report draft generated by AI</div></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '11px 0', borderBottom: '1px solid #F1F5F9', fontSize: '13px' }}><div style={{ fontSize: '11px', color: 'var(--grey)', minWidth: '110px' }}>Yesterday, 16:30</div><div style={{ flex: 1 }}>Clinician approved Week 11 report · AMD001RM</div></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '11px 0', borderBottom: 'none', fontSize: '13px' }}><div style={{ fontSize: '11px', color: 'var(--grey)', minWidth: '110px' }}>Yesterday, 14:02</div><div style={{ flex: 1 }}>Greenfield Endocrinology — DPA confirmed</div></div>
        </div>
      </div>

      {/* ORGANISATIONS TABLE SECTION */}
      <div className="card">
        <div className="card-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: '15px', fontWeight: 600, marginBottom: '14px' }}>Organisations at a Glance</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--grey)', padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #F1F5F9', background: '#F8FAFC' }}>Organisation</th>
                <th style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--grey)', padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #F1F5F9', background: '#F8FAFC' }}>Type</th>
                <th style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--grey)', padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #F1F5F9', background: '#F8FAFC' }}>Patients</th>
                <th style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--grey)', padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #F1F5F9', background: '#F8FAFC' }}>Compliance</th>
                <th style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--grey)', padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #F1F5F9', background: '#F8FAFC' }}>DPA</th>
                <th style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--grey)', padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #F1F5F9', background: '#F8FAFC' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ cursor: 'pointer', borderBottom: '1px solid #F1F5F9' }} onClick={() => dispatch(setActiveTab('orgs'))}>
                <td style={{ padding: '13px 14px', fontSize: '13px' }}><strong>Greenfield Endocrinology</strong></td>
                <td style={{ padding: '13px 14px', fontSize: '13px' }}>Private Clinic</td>
                <td style={{ padding: '13px 14px', fontSize: '13px' }}>1</td>
                <td style={{ padding: '13px 14px', fontSize: '13px', color: 'var(--green)', fontWeight: 700 }}>100%</td>
                <td style={{ padding: '13px 14px', fontSize: '13px' }}><span style={{ background: 'var(--green-bg)', color: 'var(--green)', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700 }}>✓ Signed</span></td>
                <td style={{ padding: '13px 14px', fontSize: '13px' }}><span style={{ background: 'var(--green-bg)', color: 'var(--green)', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700 }}>Active</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: '14px' }}>
          <button style={{ background: 'var(--teal)', color: 'var(--ivory)', border: 'none', padding: '5px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }} onClick={() => dispatch(setActiveTab('org-create'))}>+ Create Organisation</button>
        </div>
      </div>
    </div>
  );
};

export default OverviewScreen;