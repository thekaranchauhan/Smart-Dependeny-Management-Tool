// Import necessary modules
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const fs = require('fs');
const path = require('path');
const npmCheck = require('npm-check');
const { exec } = require('child_process');

// Initialize an Express application
const app = express();

// Define the GraphQL schema
const schema = buildSchema(`
  type Vulnerability {
    id: String
    title: String
    severity: String
    path: [String]
    from: [String]
  }

  type Dependency {
    name: String
    version: String
    isDeprecated: Boolean
    vulnerabilities: [Vulnerability]
  }

  type Query {
    dependencies: [Dependency]
  }
`);

// Function to check for vulnerabilities using npm audit
const checkVulnerabilities = () => {
  return new Promise((resolve) => {
    exec('npm audit --json', (error, stdout) => {
      if (error) {
        console.error('Error executing npm audit:', error);
        resolve([]); // Resolve with an empty array if an error occurs
        return;
      }

      // Parse the audit result JSON
      const auditResult = JSON.parse(stdout);
      const vulnerabilities = auditResult.advisories || {};

      // Extract details of vulnerabilities
      const vulnerabilityDetails = Object.values(vulnerabilities).map((vuln) => ({
        id: vuln.id,
        title: vuln.title,
        severity: vuln.severity,
        path: vuln.findings.map((finding) => finding.path),
        from: vuln.findings.map((finding) => finding.version),
      }));

      resolve(vulnerabilityDetails); // Resolve with the vulnerability details
    });
  });
};

// Root resolver for GraphQL queries
const root = {
  // Resolver to fetch dependencies information
  dependencies: async () => {
    // Read the package.json file to access dependencies
    const packageJsonPath = path.join(__dirname, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

    // Use npm-check to get the current status of dependencies
    const currentPackage = await npmCheck({ cwd: __dirname });
    const dependenciesInfo = await currentPackage.all(); // Fetch all dependency info

    // Check for vulnerabilities in dependencies
    const vulnerabilities = await checkVulnerabilities();

    const dependencies = []; // Array to hold formatted dependency information

    // Iterate over dependencies defined in package.json
    for (const [name, version] of Object.entries(packageJson.dependencies || {})) {
      const pkg = dependenciesInfo[name]; // Get the package info from npm-check
      const isDeprecated = pkg ? pkg.isDeprecated : false; // Check if the package is deprecated

      // Filter vulnerabilities for the specific package
      const packageVulnerabilities = vulnerabilities.filter(vuln => 
        vuln.path.some(p => p.includes(name)) // Check if the package is listed in the path
      );

      // Push the formatted dependency data into the array
      dependencies.push({ name, version, isDeprecated, vulnerabilities: packageVulnerabilities });
    }

    return dependencies; // Return the array of dependencies
  },
};

// Set up the GraphQL endpoint with middleware
app.use('/graphql', graphqlHTTP({
  schema: schema, // Use the defined schema
  rootValue: root, // Set the root resolver
  graphiql: true, // Enable the GraphiQL interface for testing
}));

// Start the server on a specified port
const PORT = process.env.PORT || 4000; // Default to port 4000 if not set
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`); // Log server status
});
