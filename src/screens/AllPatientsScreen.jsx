import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab } from '../store/slices/adminSlice';

const AllPatientsScreen = () => {
  const dispatch = useDispatch();
  
  // 🚀 Read dynamic baseline profiles straight from global Redux cache memory
  const patients = useSelector((state) => state.admin.patients || []);
  
  // Controlled Filter & Search inputs states
  const [selectedOrg, setSelectedOrg] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // 🌟 Compute unique contextual filter option sets based on available live rows
  const dynamicOrgs = ['All', ...new Set(patients.map(p => p.organization).filter(Boolean))];
  const dynamicConditions = ['All', ...new Set(patients.map(p => p.condition).filter(Boolean))];
  const dynamicRegions = ['All', ...new Set(patients.map(p => p.region).filter(Boolean))];

  // Pipeline Filter Logic Mapping Matrix
  const filteredPatients = patients.filter((patient) => {
    const matchesOrg = selectedOrg === 'All' || patient.organization === selectedOrg;
    const matchesCondition = selectedCondition === 'All' || patient.condition === selectedCondition;
    const matchesRegion = selectedRegion === 'All' || patient.region === selectedRegion;
    
    const normalizedQuery = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
      patient.name?.toLowerCase().includes(normalizedQuery) ||
      patient.id?.toLowerCase().includes(normalizedQuery);

    return matchesOrg && matchesCondition && matchesRegion && matchesSearch;
  });

  // Calculate top KPI metadata counters across the active scope
  const totalCount = filteredPatients.length;
  const activeCount = filteredPatients.filter(p => p.status?.toLowerCase() === 'active').length;
  const invitedCount = filteredPatients.filter(p => p.status?.toLowerCase() === 'invited').length;

  return (
    <div style={{ animation: 'fadeIn 0.15s ease-in-out' }}>
      
      {/* PAGE HEADER */}
      <div className="ph">
        <div>
          <h2 className="ph-title">All Patients</h2>
          <div className="ph-sub">
            {activeCount} active · {invitedCount} invited · 0 discharged · Across all organisations
          </div>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => dispatch(setActiveTab('patient-enrol'))}
        >
          + Enrol Patient
        </button>
      </div>

      {/* 🌟 REFERENCE MOCKUP FILTER CONTROL GRID BAR */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '18px', flexWrap: 'wrap' }}>
        <select 
          className="form-select" 
          style={{ width: 'auto', padding: '8px 32px 8px 14px', fontSize: '13px' }}
          value={selectedOrg}
          onChange={(e) => setSelectedOrg(e.target.value)}
        >
          <option value="All">All organisations</option>
          {dynamicOrgs.filter(o => o !== 'All').map(org => (
            <option key={org} value={org}>{org}</option>
          ))}
        </select>

        <select 
          className="form-select" 
          style={{ width: 'auto', padding: '8px 32px 8px 14px', fontSize: '13px' }}
          value={selectedCondition}
          onChange={(e) => setSelectedCondition(e.target.value)}
        >
          <option value="All">All conditions</option>
          {dynamicConditions.filter(c => c !== 'All').map(cond => (
            <option key={cond} value={cond}>{cond}</option>
          ))}
        </select>

        <select 
          className="form-select" 
          style={{ width: 'auto', padding: '8px 32px 8px 14px', fontSize: '13px' }}
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option value="All">All regions</option>
          {dynamicRegions.filter(r => r !== 'All').map(reg => (
            <option key={reg} value={reg}>{reg}</option>
          ))}
        </select>

        <input 
          type="text" 
          className="form-input"
          placeholder="Search by name or ID…" 
          style={{ flex: 1, minWidth: '200px', padding: '8px 14px', fontSize: '13px' }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* DYNAMIC COMPONENT RECORDS TABLE CARD CONTAINER */}
      <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
        <table className="dt">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Organisation</th>
              <th>Condition</th>
              <th>Region</th>
              <th>Streak</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => {
              const currentOrg = patient.organization || 'Independent Clinic';
              
              // Handle badge mapping variables dynamically per row state definition
              const isInvited = patient.status?.toLowerCase() === 'invited';
              const badgeClass = isInvited ? 'badge amber' : 'badge green';

              return (
                <tr key={patient.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>
                      {patient.id ? `${patient.id.substring(0, 8)}...` : 'Allvi-UUID'}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--grey)' }}>{patient.name}</div>
                  </td>
                  <td style={{ fontSize: '12px' }}>{currentOrg}</td>
                  <td style={{ fontSize: '12px' }}>{patient.condition}</td>
                  <td>
                    <span className="badge teal">
                      {patient.region || '🇬🇧 UK'}
                    </span>
                  </td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap', fontWeight: 600, color: 'var(--green)', fontSize: '13px' }}>
                      🔥 {patient.streak || 0}
                    </span>
                  </td>
                  <td>
                    <span className={badgeClass}>
                      {patient.status || 'Active'}
                    </span>
                  </td>
                </tr>
              );
            })}
            
            {filteredPatients.length === 0 && (
              <tr>
                <td colSpan="6" style={{ padding: '32px', textAlign: 'center', color: 'var(--grey)', fontSize: '13px' }}>
                  No historical patient records matched your active filter parameters.
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