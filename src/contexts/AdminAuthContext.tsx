import React, { createContext, useContext, useState, useEffect } from 'react';

interface Admin {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'super_admin';
  lastLogin: string;
}

interface AdminAuthContextType {
  admin: Admin | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if admin is already logged in (from localStorage)
    const savedAdmin = localStorage.getItem('admin');
    if (savedAdmin) {
      setAdmin(JSON.parse(savedAdmin));
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock admin authentication - in real app, this would be an API call
    const validAdmins = [
      { username: 'admin', password: 'admin123' },
      { username: 'superadmin', password: 'super123' }
    ];
    
    const validAdmin = validAdmins.find(a => a.username === username && a.password === password);
    
    if (validAdmin) {
      const mockAdmin: Admin = {
        id: '1',
        username: validAdmin.username,
        email: `${validAdmin.username}@careerai.com`,
        role: validAdmin.username === 'superadmin' ? 'super_admin' : 'admin',
        lastLogin: new Date().toISOString()
      };
      
      setAdmin(mockAdmin);
      localStorage.setItem('admin', JSON.stringify(mockAdmin));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('admin');
  };

  return (
    <AdminAuthContext.Provider value={{ admin, login, logout, isLoading }}>
      {children}
    </AdminAuthContext.Provider>
  );
};