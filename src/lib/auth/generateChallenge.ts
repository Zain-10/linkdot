import type {
  ChallengeQuery,
  ChallengeQueryVariables,
} from "@/graphql/generated";
import { ChallengeDocument } from "@/graphql/generated";

import { fetcher } from "../../graphql/auth-fetcher";

export default async function generateChallenge(address: string) {
  const challenge = await fetcher<ChallengeQuery, ChallengeQueryVariables>(
    ChallengeDocument,
    {
      request: {
        address,
      },
    }
  );
  return challenge;
}
