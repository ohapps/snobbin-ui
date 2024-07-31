interface Props {
  message: string;
}

const ErrorPage = ({ message }: Props) => {
  return <div>Error: {message}</div>;
};

export default ErrorPage;
