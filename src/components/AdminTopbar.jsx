import React from 'react';
import { Menu, X } from 'lucide-react'; // 🌟 Importing clean lucide vectors directly inside top panel context

const AdminTopbar = ({ isMobileOpen, setIsMobileOpen }) => {
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
      zIndex: 100,
      width: '100%',
      boxSizing: 'border-box'
    }}>
      
      {/* LEFT BLOCK: TOGGLE BUTTON + IDENTITY HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        
        {/* 🌟 NEW TOPBAR INTEGRATED MOB MENU ICON TOGGLE BUTTON */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#F7F1E8',
            cursor: 'pointer',
            padding: '4px',
            display: 'none', // Handled responsively via classes inside index.css
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.85
          }}
          className="topbar-menu-toggle"
        >
          {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Brand Identity Branding Title */}
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', color: '#F7F1E8', flexShrink: 0 }}>
          Allvi 
          <span style={{ fontSize: '9px', fontFamily: "'DM Sans', sans-serif", fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(247,241,232,0.5)', display: 'block', marginTop: '-2px' }}>
            Admin Portal
          </span>
        </div>
      </div>

      {/* Admin User Information Badges */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
        <div 
          className="topbar-admin-badge"
          style={{ background: 'rgba(247,241,232,0.15)', borderRadius: '4px', padding: '3px 10px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#F7F1E8' }}
        >
          ADMIN
        </div>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(247,241,232,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: '#F7F1E8', flexShrink: 0 }}>
          RS
        </div>
      </div>
    </div>
  );
};

export default AdminTopbar;