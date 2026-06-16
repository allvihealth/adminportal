import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab } from '../store/slices/adminSlice';

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.admin.activeTab);
  const metrics = useSelector((state) => state.admin.metrics);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: '⊞', section: 'Platform' },
    { id: 'orgs', label: 'Organisations', icon: '🏥', section: 'Platform' },
    { id: 'patients', label: 'All Patients', icon: '👥', section: 'Platform' },
    { id: 'queue', label: 'Review Queue', icon: '📋', section: 'Clinical', badge: metrics.reviewQueueCount },
    { id: 'alerts', label: 'Alerts', icon: '⚠️', section: 'Clinical', badge: 3, badgeColor: 'red' },
    { id: 'compliance', label: 'Compliance', icon: '🔒', section: 'System' },
    { id: 'config', label: 'Configuration', icon: '⚙', section: 'System' },
    { id: 'audit', label: 'Audit Log', icon: '📜', section: 'System' },
  ];

  const sections = ['Platform', 'Clinical', 'System'];

  return (
    /* 🌟 Fixed: Changed top to 60px and height to -60px to sit perfectly under the Topbar without a gap */
    <aside 
      className="sidebar" 
      style={{
        position: 'sticky',
        top: '60px', 
        height: 'calc(100vh - 60px)',
        width: '220px',
        minWidth: '220px',
        background: '#1E293B',
        padding: '20px 0',
        overflowY: 'auto',
        flexShrink: 0
      }}
    >
      {sections.map((section) => (
        <React.Fragment key={section}>
          {/* Section Header Text */}
          <div style={{ padding: '14px 18px 5px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#475569' }}>
            {section}
          </div>

          {/* Nav Links falling under this section */}
          {navItems.filter(item => item.section === section).map((item) => {
            const isActive = activeTab === item.id || (item.id === 'orgs' && activeTab === 'org-create') || (item.id === 'patients' && activeTab === 'patient-enrol');
            
            return (
              <div
                key={item.id}
                onClick={() => dispatch(setActiveTab(item.id))}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 18px',
                  fontSize: '13px',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#7DD3DE' : '#94A3B8',
                  cursor: 'pointer',
                  borderLeft: '3px solid transparent',
                  borderLeftColor: isActive ? '#1A6B7C' : 'transparent',
                  background: isActive ? 'rgba(15, 76, 92, 0.3)' : 'transparent',
                  transition: 'all 0.15s'
                }}
              >
                <span style={{ fontSize: '15px', width: '20px', textAlign: 'center' }}>{item.icon}</span>
                {item.label}

                {/* Status Counter Badges */}
                {item.badge !== undefined && item.badge > 0 && (
                  <span style={{
                    marginLeft: 'auto',
                    background: item.badgeColor === 'red' ? '#9B2226' : '#C97B2E',
                    color: '#FFFFFF',
                    borderRadius: '10px',
                    padding: '1px 7px',
                    fontSize: '10px',
                    fontWeight: 700
                  }}>
                    {item.badge}
                  </span>
                )}
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </aside>
  );
};

export default AdminSidebar;