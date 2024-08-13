import React from 'react';

interface Dependency {
  name: string;
  version: string;
  isDeprecated: boolean;
  isVulnerable: boolean;
}

interface DependencyListProps {
  dependencies: Dependency[];
}

export default function DependencyList ({ dependencies }) {
  return (
    <div className="w-full max-w-4xl mx-auto mt-4">
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
              <td className="border border-gray-300 p-2">{dependency.isVulnerable ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

