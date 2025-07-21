import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  const handleDashboardRedirect = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-base-200">
      <h1 className="text-4xl font-bold mb-4">Welcome to Expense Tracker</h1>
      <p className="mb-6 text-lg">Track and manage your expenses easily.</p>
      <button onClick={handleDashboardRedirect} className="btn btn-primary">
        Go to Dashboard
      </button>
    </div>
  );
};

export default Home;
