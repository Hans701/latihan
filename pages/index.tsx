import Image from "next/image";
import { get } from "lodash";
import Link from "next/link";
import { getDataFromTree } from "@apollo/client/react/ssr";
import withApollo from "../lib/withApollo";
import { CharactersQuery, useCharactersQuery } from "../generated";

function Home() {
  const { data } = useCharactersQuery();

  const characters = get(
    data,
    "characters.results",
    []
  ) as CharactersQuery["characters"]["results"];

  const graphqlQuery = `
  query characters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        image
        name
        gender
        species
        episode {
          id
          episode
          air_date
        }
        origin {
          dimension
          id
        }
      }
    }
  }
`;

  fetch("https://rickandmortyapi.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: graphqlQuery,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error fetching GraphQL data:", error));

  return <div>{JSON.stringify(data)}</div>;
}

export default withApollo(Home, { getDataFromTree });
