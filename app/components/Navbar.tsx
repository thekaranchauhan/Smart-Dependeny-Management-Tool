import React from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  return (
    <nav className="w-full bg-primary text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <span className="text-lg font-bold">Dependency Checker</span>
      </div>
      <ThemeToggle />
    </nav>
  );
}