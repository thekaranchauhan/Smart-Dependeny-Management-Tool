'use client';
import React, { useEffect, useState } from 'react';
import DependencyList from './components/DependencyList';
import Spinner from './components/Spinner';

interface Dependency {
  name: string;
  version: string;
  isDeprecated: boolean;
  isVulnerable: boolean;
}

export default function Home() {
  const [dependencies, setDependencies] = useState<Dependency[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDependencies = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/dependencies');
      const data = await response.json();
      setDependencies(data.dependencies);
    } catch (error) {
      console.error('Error fetching dependencies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDependencies();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold mb-4">Dependencies</h1>
      <button
        onClick={fetchDependencies}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {loading ? 'Refreshing...' : 'Refresh Dependencies'}
      </button>
      {loading ? <Spinner /> : <DependencyList dependencies={dependencies} />}
    </main>
  );
}
