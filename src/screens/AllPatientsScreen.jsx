import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab } from '../store/slices/adminSlice';

const AllPatientsScreen = () => {
  const dispatch = useDispatch();
  
  // 🚀 Read array and telemetry directly from the global Redux slice
  const patients = useSelector((state) => state.admin.patients || []);
  
  const totalCount = patients.length;
  const activeCount = patients.filter(p => p.status === 'Active' || parseInt(p.streak) > 0).length;
  const invitedCount = patients.filter(p => p.status === 'Invited').length;

  return (
    <div style={{ animation: 'fadeIn 0.15s ease-in-out' }}>
      <div className="ph" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 className="ph-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 600 }}>All Patients</h2>
          <div className="ph-sub" style={{ fontSize: '13px', color: 'var(--grey)' }}>
            {activeCount} active · {invitedCount} invited · 0 discharged · Across all organisations
          </div>
        </div>
        <button 
          style={{ background: 'var(--teal)', color: 'var(--ivory)', border: 'none', padding: '9px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }} 
          onClick={() => dispatch(setActiveTab('patient-enrol'))}
        >
          + Enrol Patient
        </button>
      </div>

      <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--grey)', padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #F1F5F9', background: '#F8FAFC' }}>Patient</th>
              <th style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--grey)', padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #F1F5F9', background: '#F8FAFC' }}>Organisation</th>
              <th style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--grey)', padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #F1F5F9', background: '#F8FAFC' }}>Condition</th>
              <th style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--grey)', padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #F1F5F9', background: '#F8FAFC' }}>Region</th>
              <th style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--grey)', padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #F1F5F9', background: '#F8FAFC' }}>Streak</th>
              <th style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--grey)', padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #F1F5F9', background: '#F8FAFC' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => {
              // Safely dig out the organisation name context from your controller structure
              const orgName = patient.organization || (patient.patient_enrolments?.[0]?.organisations?.name) || 'Independent Clinic';
              
              return (
                <tr key={patient.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '13px 14px', fontSize: '13px' }}>
                    <div style={{ fontWeight: 600 }}>{patient.id.substring(0, 8)}...</div>
                    <div style={{ fontSize: '11px', color: 'var(--grey)' }}>{patient.name}</div>
                  </td>
                  <td style={{ padding: '13px 14px', fontSize: '12px' }}>{orgName}</td>
                  <td style={{ padding: '13px 14px', fontSize: '12px' }}>{patient.condition}</td>
                  <td style={{ padding: '13px 14px', fontSize: '13px' }}>
                    <span style={{ background: 'var(--teal-light)', color: 'var(--teal)', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700 }}>
                      {patient.region || '🇬🇧 UK'}
                    </span>
                  </td>
                  <td style={{ padding: '13px 14px', fontSize: '13px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap', fontWeight: 600, color: 'var(--green)' }}>
                      🔥 {patient.streak || 0}
                    </span>
                  </td>
                  <td style={{ padding: '13px 14px', fontSize: '13px' }}>
                    <span style={{ 
                      background: patient.status === 'Invited' ? 'var(--amber-bg)' : 'var(--green-bg)', 
                      color: patient.status === 'Invited' ? 'var(--amber)' : 'var(--green)', 
                      padding: '3px 10px', 
                      borderRadius: '20px', 
                      fontSize: '11px', 
                      fontWeight: 700 
                    }}>
                      {patient.status || 'Active'}
                    </span>
                  </td>
                </tr>
              );
            })}
            
            {patients.length === 0 && (
              <tr>
                <td colSpan="6" style={{ padding: '24px', textAlign: 'center', color: 'var(--grey)', fontSize: '13px' }}>
                  No patient profiles detected in backend logs.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPatientsScreen;