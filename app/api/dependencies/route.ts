// app/api/dependencies/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const dependencies = [
    {
      name: 'axios',
      version: '^1.7.3',
      isDeprecated: false,
      isVulnerable: false,
    },
    {
      name: 'express',
      version: '^4.19.2',
      isDeprecated: false,
      isVulnerable: false,
    },
    {
      name: 'express-graphql',
      version: '^0.12.0',
      isDeprecated: false,
      isVulnerable: false,
    },
    {
      name: 'graphql',
      version: '^16.9.0',
      isDeprecated: false,
      isVulnerable: false,
    },
    {
      name: 'npm-check',
      version: '^6.0.1',
      isDeprecated: false,
      isVulnerable: false,
    },
  ];

  return NextResponse.json({ dependencies });
}
