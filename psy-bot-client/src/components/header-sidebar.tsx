const Header = () => {
  return (
    <div className="w-full flex items-center justify-between px-2 py-1">
      {/* Logo from /public/logo.png */}
      <div className="flex items-center space-x-2">
        <img src="/psy-logo.png" alt="Logo" className="h-8 w-auto" />
      </div>
    </div>
  );
};

export default Header;
