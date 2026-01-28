import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h4 className="mb-4 text-2xl font-bold">
          Tính năng này chưa phát triển
        </h4>
        <p className="mb-4 text-xl text-muted-foreground">
          Vui lòng quay lại sau
        </p>
        <Link to="/" className="text-primary underline hover:text-primary/90">
          Trở về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
