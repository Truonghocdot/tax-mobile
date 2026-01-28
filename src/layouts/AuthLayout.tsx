import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="mobile-container min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      {/* Content */}
      <div className="relative z-10 h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
