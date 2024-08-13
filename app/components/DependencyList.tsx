import React from 'react';
import { Dependency } from '../types';

interface DependencyListProps {
  dependencies: Dependency[];
}

export default function DependencyList({ dependencies }: DependencyListProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mt-4 overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Version</th>
            <th className="border border-gray-300 p-2">Deprecated</th>
            <th className="border border-gray-300 p-2">Vulnerable</th>
          </tr>
        </thead>
        <tbody>
          {dependencies.map((dependency) => (
            <tr key={dependency.name}>
              <td className="border border-gray-300 p-2">{dependency.name}</td>
              <td className="border border-gray-300 p-2">{dependency.version}</td>
              <td className="border border-gray-300 p-2">{dependency.isDeprecated ? 'Yes' : 'No'}</td>
              <td className="border border-gray-300 p-2">{dependency.vulnerabilities.length > 0 ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}