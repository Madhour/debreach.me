/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDebreach = /* GraphQL */ `
  query GetDebreach($id: ID!) {
    getDebreach(id: $id) {
      id
      pwhash
    }
  }
`;
export const listDebreaches = /* GraphQL */ `
  query ListDebreaches(
    $filter: ModelDebreachFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDebreaches(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        pwhash
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getHash = /* GraphQL */ `
  query GetHash(
    $pwhash: String
    $sortDirection: ModelSortDirection
    $filter: ModelDebreachFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getHash(
      pwhash: $pwhash
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        pwhash
      }
      nextToken
    }
  }
`;
