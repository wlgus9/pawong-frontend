import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { stopTokenRefresh } = useAuth();

  const handleLogout = async () => {
    await auth.clearTokens();
    stopTokenRefresh();
    // 로그아웃 후 처리 (리다이렉트 등)
  };

  // ... existing code ...
}; 