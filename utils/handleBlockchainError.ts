import toast from 'react-hot-toast';

interface ErrorMappings {
  [key: string]: string;
}

const blockchainErrorMappings: ErrorMappings = {
  MarketDoesNotExist:
    'Sorry, but this market does not exist, or is already closed.',
  MarketIsClosed: 'This market is already closed!',
};

export const handleBlockchainError = (error: string) => {
  const errorMessageRegex = /message: Some\("(.*?)"\)/;
  const match = errorMessageRegex.exec(error);
  if (match && match[1]) {
    const readableErrorMessage = blockchainErrorMappings[match[1]] || 'Error';
    toast.error(readableErrorMessage, {
      duration: 4000,
    });
  } else {
    toast.error('Error!', {
      duration: 4000,
    });
  }
};
