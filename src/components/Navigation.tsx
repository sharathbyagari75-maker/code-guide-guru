const Navigation = () => {
  const navItems = [
    { label: "Home", href: "#" },
    { label: "Code Analysis", href: "#" },
    { label: "Exercises", href: "#" },
    { label: "Tutorials", href: "#" },
  ];

  return (
    <nav className="bg-nav text-nav-foreground py-4 px-6 shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-center gap-8">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="font-semibold text-nav-foreground hover:text-primary-glow transition-colors duration-200 py-2 px-4 rounded-md hover:bg-white/10"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;