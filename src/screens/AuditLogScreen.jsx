import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const AuditLogScreen = () => {
  // 🚀 Read dynamic log records array straight out of the shared Redux slice 
  const logs = useSelector((state) => state.admin.auditLogs || []);

  // Filter States
  const [actionType, setActionType] = useState('All');
  const [actorRole, setActorRole] = useState('All');
  const [filterDate, setFilterDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // 🌟 Extract unique action names and roles for dynamic filter selectors
  const uniqueActions = ['All', ...new Set(logs.map(log => log.action))];
  const uniqueRoles = ['All', ...new Set(logs.map(log => log.actor_role))];

  // Pipeline Filter Logic
  const filteredLogs = logs.filter(log => {
    const matchesAction = actionType === 'All' || log.action === actionType;
    const matchesRole = actorRole === 'All' || log.actor_role === actorRole;
    
    const matchesDate = !filterDate || (log.event_time && log.event_time.startsWith(filterDate));
    
    const normalizedQuery = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
      (log.action && log.action.toLowerCase().includes(normalizedQuery)) ||
      (log.resource_type && log.resource_type.toLowerCase().includes(normalizedQuery)) ||
      (log.id && String(log.id).includes(normalizedQuery)) ||
      (log.patient_id && log.patient_id.toLowerCase().includes(normalizedQuery));

    return matchesAction && matchesRole && matchesDate && matchesSearch;
  });

  return (
    <div style={{ animation: 'fadeIn 0.15s ease-in-out' }}>
      
      {/* PAGE HEADER */}
      <div className="ph">
        <div>
          <h2 className="ph-title">Audit Log</h2>
          <div className="ph-sub">Immutable · Append-only · All platform actions · Required for UK GDPR and HIPAA</div>
        </div>
        <button className="btn btn-ghost">Export CSV</button>
      </div>

      {/* SYSTEM CALLOUT BANNER (Bypasses updates via DB trigger) */}
      <div className="callout teal">
        <strong style={{ color: 'var(--teal)' }}>Immutable record:</strong> Audit log entries cannot be edited or deleted — not even by admins. This is enforced at the database level via a trigger that rejects any UPDATE or DELETE on the audit_log table.
      </div>

      {/* FILTER CONTROLS workspace BAR */}
      <div style={{ display: 'flex', gap: '10px', margin: '16px 0', flexWrap: 'wrap' }}>
        <select 
          className="form-select" 
          style={{ width: 'auto', padding: '8px 32px 8px 14px' }}
          value={actionType}
          onChange={(e) => setActionType(e.target.value)}
        >
          <option value="All">All action types</option>
          {uniqueActions.filter(a => a !== 'All').map(act => (
            <option key={act} value={act}>{act}</option>
          ))}
        </select>

        <select 
          className="form-select" 
          style={{ width: 'auto', padding: '8px 32px 8px 14px' }}
          value={actorRole}
          onChange={(e) => setActorRole(e.target.value)}
        >
          <option value="All">All actors</option>
          {uniqueRoles.filter(r => r !== 'All').map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>

        <input 
          type="date" 
          className="form-input" 
          style={{ width: 'auto', padding: '8px 14px' }}
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />

        <input 
          type="text" 
          className="form-input"
          placeholder="Search patient ID or resource…" 
          style={{ flex: 1, minWidth: '200px', padding: '8px 14px' }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* IMMUTABLE RECORDS DATA TABLE */}
      <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
        <table className="dt">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Actor ID</th>
              <th>Role</th>
              <th>Action</th>
              <th>Patient Reference</th>
              <th>Resource Trace</th>
              <th style={{ textAlign: 'center' }}>GDPR</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => {
              // Format Timestamp cleanly to mirror reference mockup layout values
              const formattedTime = log.event_time 
                ? new Date(log.event_time).toISOString().replace('T', ' ').substring(0, 19)
                : '2026-06-16 00:00:00';

              // Assign custom matching background badge colors per role metadata
              let roleBadgeClass = 'grey';
              if (log.actor_role?.toLowerCase() === 'patient') roleBadgeClass = 'teal';
              if (log.actor_role?.toLowerCase() === 'clinician') roleBadgeClass = 'purple';
              if (log.actor_role?.toLowerCase() === 'admin') roleBadgeClass = 'red';

              return (
                <tr key={log.id}>
                  <td style={{ fontSize: '11px', color: 'var(--grey)', whiteSpace: 'nowrap' }}>
                    {formattedTime}
                  </td>
                  <td style={{ fontWeight: 600, fontSize: '12px' }}>
                    {log.actor_id ? `${log.actor_id.substring(0, 8)}...` : 'System Engine'}
                  </td>
                  <td>
                    <span className={`badge ${roleBadgeClass}`} style={{ fontSize: '10px' }}>
                      {log.actor_role || 'System'}
                    </span>
                  </td>
                  <td style={{ fontSize: '12px' }}>{log.action}</td>
                  <td style={{ fontSize: '12px' }}>
                    {log.patient_id ? `${log.patient_id.substring(0, 8)}...` : '—'}
                  </td>
                  <td style={{ fontSize: '11px', color: 'var(--grey)' }}>
                    {log.resource_type} {log.resource_id ? `#${log.resource_id.substring(0, 4)}` : ''}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {log.gdpr_relevant ? (
                      <span style={{ color: 'var(--amber)', fontWeight: 700 }}>Y</span>
                    ) : (
                      <span style={{ color: 'var(--grey)' }}>N</span>
                    )}
                  </td>
                </tr>
              );
            })}

            {filteredLogs.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textalign: 'center', color: 'var(--grey)', padding: '24px' }}>
                  No historical append-only logs matched the chosen search parameters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--grey)' }}>
        Showing {filteredLogs.length} of {logs.length} entries · Retained for {logs[0]?.retention_years || 10} years minimum per UK GDPR Art. 5(2)
      </div>

    </div>
  );
};

export default AuditLogScreen;