import React from 'react';

const AdminTopbar = () => {
  return (
    <div style={{
      background: '#0F4C5C',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* Brand Identity Branding Title */}
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', color: '#F7F1E8' }}>
        Allvi 
        <span style={{ fontSize: '9px', fontFamily: "'DM Sans', sans-serif", fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(247,241,232,0.5)', display: 'block', marginTop: '-2px' }}>
          Admin Portal
        </span>
      </div>

      {/* Admin User Information Badges */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ background: 'rgba(247,241,232,0.15)', borderRadius: '4px', padding: '3px 10px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#F7F1E8' }}>
          ADMIN
        </div>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(247,241,232,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: '#F7F1E8' }}>
          RS
        </div>
      </div>
    </div>
  );
};

export default AdminTopbar;