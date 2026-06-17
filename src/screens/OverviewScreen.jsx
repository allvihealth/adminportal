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
      
      {/* PAGE HEADER */}
      <div className="ph">
        <div>
          <h2 className="ph-title">Platform Overview</h2>
          <div className="ph-sub">All organisations · All patients · Live data · June 2026</div>
        </div>
      </div>

      {/* KPI GRID CONTAINER */}
      <div className="g4" style={{ marginBottom: '22px' }}>
        {/* TOTAL PATIENTS */}
        <div className="kpi" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'var(--teal)' }} />
          <div className="kpi-label">Total Patients</div>
          <div className="kpi-val" style={{ color: 'var(--teal)' }}>{metrics.totalPatients}</div>
          <div className="kpi-sub">↑ 1 this month</div>
        </div>

        {/* ACTIVE ORGANISATIONS */}
        <div className="kpi" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'var(--green)' }} />
          <div className="kpi-label">Active Organisations</div>
          <div className="kpi-val gr">{metrics.activeOrganisations}</div>
          <div className="kpi-sub">1 clinic · 1 D2C</div>
        </div>

        {/* REVIEW QUEUE */}
        <div className="kpi" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'var(--amber)' }} />
          <div className="kpi-label">Review Queue</div>
          <div className="kpi-val am">{metrics.reviewQueueCount}</div>
          <div className="kpi-sub">3 high priority</div>
        </div>

        {/* ACTIVE RED FLAGS */}
        <div className="kpi" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'var(--red)' }} />
          <div className="kpi-label">Active Red Flags</div>
          <div className="kpi-val rd">{metrics.activeRedFlags}</div>
          <div className="kpi-sub">2 amber · 0 red</div>
        </div>
      </div>

      {/* METRICS & ACTIVITIES SPLIT GRID */}
      <div className="g2" style={{ marginBottom: '22px' }}>
        {/* PLATFORM HEALTH */}
        <div className="card">
          <div className="card-title">Platform Health</div>
          <div className="stat-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', borderBottom: '1px solid #F1F5F9', fontSize: '13px' }}><span style={{ color: 'var(--grey)' }}>Avg check-in compliance (all patients)</span><span style={{ fontWeight: 700, color: 'var(--green)' }}>100%</span></div>
          <div className="stat-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', borderBottom: '1px solid #F1F5F9', fontSize: '13px' }}><span style={{ color: 'var(--grey)' }}>Avg time to protocol delivery</span><span style={{ fontWeight: 700 }}>8.2 days</span></div>
          <div className="stat-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', borderBottom: '1px solid #F1F5F9', fontSize: '13px' }}><span style={{ color: 'var(--grey)' }}>Avg weekly report turnaround</span><span style={{ fontWeight: 700 }}>6.4 hours</span></div>
          <div className="stat-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', borderBottom: '1px solid #F1F5F9', fontSize: '13px' }}><span style={{ color: 'var(--grey)' }}>Avg message response time</span><span style={{ fontWeight: 700 }}>4.1 hours</span></div>
          <div className="stat-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', borderBottom: '1px solid #F1F5F9', fontSize: '13px' }}><span style={{ color: 'var(--grey)' }}>Overdue review tasks</span><span style={{ fontWeight: 700, color: 'var(--amber)' }}>1</span></div>
          <div className="stat-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', fontSize: '13px' }}><span style={{ color: 'var(--grey)' }}>DPAs signed</span><span style={{ fontWeight: 700, color: 'var(--green)' }}>2 / 2</span></div>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="card">
          <div className="card-title">Recent Activity</div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '11px 0', borderBottom: '1px solid #F1F5F9', fontSize: '13px', flexWrap: 'wrap' }}><div style={{ fontSize: '11px', color: 'var(--grey)', minWidth: '90px' }}>Today, 09:14</div><div style={{ flex: 1 }}>AMD001RM submitted daily check-in · Day 77</div></div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '11px 0', borderBottom: '1px solid #F1F5F9', fontSize: '13px', flexWrap: 'wrap' }}><div style={{ fontSize: '11px', color: 'var(--grey)', minWidth: '90px' }}>Today, 08:51</div><div style={{ flex: 1 }}>Week 12 report draft generated by AI</div></div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '11px 0', borderBottom: '1px solid #F1F5F9', fontSize: '13px', flexWrap: 'wrap' }}><div style={{ fontSize: '11px', color: 'var(--grey)', minWidth: '90px' }}>Yesterday, 16:30</div><div style={{ flex: 1 }}>Clinician approved Week 11 report · AMD001RM</div></div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '11px 0', fontSize: '13px', flexWrap: 'wrap' }}><div style={{ fontSize: '11px', color: 'var(--grey)', minWidth: '90px' }}>Yesterday, 14:02</div><div style={{ flex: 1 }}>Greenfield Endocrinology — DPA confirmed</div></div>
        </div>
      </div>

      {/* ORGANISATIONS TABLE SECTION */}
      <div className="card">
        <div className="card-title">Organisations at a Glance</div>
        <div style={{ overflowX: 'auto', margin: '0 -22px', padding: '0 22px' }}>
          <table className="dt">
            <thead>
              <tr>
                <th>Organisation</th>
                <th>Type</th>
                <th>Patients</th>
                <th>Compliance</th>
                <th>DPA</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="clickable" onClick={() => dispatch(setActiveTab('orgs'))}>
                <td><strong>Greenfield Endocrinology</strong></td>
                <td>Private Clinic</td>
                <td>1</td>
                <td style={{ color: 'var(--green)', fontWeight: 700 }}>100%</td>
                <td><span className="badge green">✓ Signed</span></td>
                <td><span className="badge green">Active</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: '16px' }}>
          <button className="btn btn-teal btn-sm" onClick={() => dispatch(setActiveTab('org-create'))}>
            + Create Organisation
          </button>
        </div>
      </div>

    </div>
  );
};

export default OverviewScreen;