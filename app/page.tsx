'use client'
import React, { useEffect, useState } from 'react';
import DependencyList from './components/DependencyList';
import Spinner from './components/Spinner';
import Navbar from './components/Navbar';
import UpdateButton from './components/UpdateButton';
import { Dependency } from './types';

export default function Home() {
  const [dependencies, setDependencies] = useState<Dependency[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchDependencies = async () => {
    try {
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            {
              dependencies {
                name
                version
                isDeprecated
                vulnerabilities {
                  id
                }
              }
            }
          `,
        }),
      });

      const data = await response.json();
      if (data.errors) {
        throw new Error('Failed to fetch dependencies');
      }

      setDependencies(data.data.dependencies);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDependencies();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-8 lg:p-24">
        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <>
            <DependencyList dependencies={dependencies} />
            <UpdateButton />
          </>
        )}
      </main>
    </div>
  );
}