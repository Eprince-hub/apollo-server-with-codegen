import { gql } from '@apollo/client';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { NextRequest } from 'next/server';

const animals = [
  {
    id: 1,
    firstName: 'Fido',
    type: 'dog',
    accessory: 'collar',
  },
  {
    id: 2,
    firstName: 'Whiskers',
    type: 'cat',
    accessory: 'bowtie',
  },
  {
    id: 3,
    firstName: 'Bubbles',
    type: 'fish',
    accessory: 'bowl',
  },
];

const typeDefs = gql`
  type Animal {
    id: ID!
    firstName: String!
    type: String!
    accessory: String
  }

  type Query {
    animals: [Animal]
  }
`;

const resolvers = {
  Query: {
    animals: () => {
      return animals;
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const apolloServer = new ApolloServer({
  schema,
});

const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer);

export async function GET(req: NextRequest) {
  return await handler(req);
}

export async function POST(req: NextRequest) {
  return await handler(req);
}
// export async function GET(req: NextRequest): Promise<NextResponse<any>> {
//   return (await handler(req)) as NextResponse<any>;
// }

// export async function POST(req: NextRequest): Promise<NextResponse<any>> {
//   return (await handler(req)) as NextResponse<any>;
// }
