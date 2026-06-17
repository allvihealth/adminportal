import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AdminTopbar from './components/AdminTopbar';
import AdminSidebar from './components/AdminSidebar';

// Screen Module Imports
import OverviewScreen from './screens/OverviewScreen';
import OrganisationsScreen from './screens/OrganisationsScreen';
import CreateOrgScreen from './screens/CreateOrgScreen';
import AllPatientsScreen from './screens/AllPatientsScreen';
import CreatePatientScreen from './screens/CreatePatientScreen';
import ReviewQueueScreen from './screens/ReviewQueueScreen';
import AlertsScreen from './screens/AlertsScreen';
import ComplianceScreen from './screens/ComplianceScreen';
import ConfigScreen from './screens/ConfigScreen';
import AuditLogScreen from './screens/AuditLogScreen';

function App() {
  const activeTab = useSelector((state) => state.admin.activeTab);
  const isFormScreen = activeTab === 'org-create' || activeTab === 'patient-enrol';

  // 🚀 Mobile Drawer State Shared Pipeline
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* 🌟 Linked Mobile Sync States down as Props */}
      <AdminTopbar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* 🌟 FIXED: Added explicit flex layout behavior directly to the element container */}
      <div className="layout" style={{ display: 'flex', flex: 1, width: '100%' }}>
        
        {/* 🌟 Linked Mobile Sync States down as Props */}
        <AdminSidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

        <main 
          className="main" 
          style={{ 
            flex: 1, 
            padding: '28px 32px', 
            background: '#F1F5F9',
            maxWidth: isFormScreen ? '700px' : 'none',
            boxSizing: 'border-box'
          }}
        >
          {activeTab === 'overview' && <OverviewScreen />}
          {activeTab === 'orgs' && <OrganisationsScreen />}
          {activeTab === 'org-create' && <CreateOrgScreen />}
          {activeTab === 'patients' && <AllPatientsScreen />}
          {activeTab === 'patient-enrol' && <CreatePatientScreen />}
          {activeTab === 'queue' && <ReviewQueueScreen />}
          {activeTab === 'alerts' && <AlertsScreen />}
          {activeTab === 'compliance' && <ComplianceScreen />}
          {activeTab === 'config' && <ConfigScreen />}
          {activeTab === 'audit' && <AuditLogScreen />}
        </main>
      </div>
    </div>
  );
}

export default App;