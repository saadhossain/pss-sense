import { useContext } from 'react';
import { DataContext, DataContextType } from '../../context/AuthProvider';
import useUser from '../../hooks/useUser';

const Dashboard = () => {
  const { user, loading } = useContext(DataContext) as DataContextType;
  const { loggedInUser, userLoading } = useUser(user?.email);
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard