import { useEffect, useState } from 'react';

const gql = String.raw;

const deetz = gql`
    name
    _id
    image {
      asset {
        url
        metadata {
          lqip
        }
      }
    }
`;

const useLatestData = () => {
  const [hotSlices, setHotSlices] = useState([]);
  const [slicemasters, setSlicemasters] = useState([]);

  // use side effect to fetch data from gql endpoint
  useEffect(() => {
    // when the component loads - fetch data
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              slicemaster {
                ${deetz}
              }
              hotSlices {
                ${deetz}
              }
            }
          }
        `,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setSlicemasters(response.data.StoreSettings.slicemaster);
        setHotSlices(response.data.StoreSettings.hotSlices);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);
  return {
    slicemasters,
    hotSlices,
  };
};

export default useLatestData;
