export interface Vulnerability {
  id: string;
  title: string;
  severity: string;
  path: string[];
  from: string[];
}

export interface Dependency {
  name: string;
  version: string;
  isDeprecated: boolean;
  vulnerabilities: Vulnerability[];
}
