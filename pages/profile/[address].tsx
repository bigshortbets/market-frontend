import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';
import { ProfileContainer } from '@/components/Profile/ProfileContainer';
import { GetServerSidePropsContext } from 'next';
import { apolloClient } from '@/requests/graphql';
import { USER_OPEN_POSITIONS_QUERY } from '@/requests/queries';
import { isAddress } from '@polkadot/util-crypto';

const inter = Inter({ subsets: ['latin'] });

export default function ProfilePage() {
  return (
    <main className={`${inter.className} text-white`}>
      <Head>
        <title>bigshortbet$ P2P Market | Profile</title>
      </Head>
      <ProfileContainer />
      <Toaster position='top-center' />
    </main>
  );
}

/* export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context;
  const address = params?.address;
  const isValid = isAddress(address as string);

  try {
    // Fetch user data using Apollo Client
    const { data } = await apolloClient.query({
      query: USER_OPEN_POSITIONS_QUERY,
      variables: { address },
    });

    // Return params and fetched data as props
    return {
      props: {
        params: params || {},
        positions: data.positions || [],
        isValid: isValid, // Handle empty data
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        params: params || {},
        positions: [],
        isValid: isValid, // Handle error case
      },
    };
  } */
/* } */
