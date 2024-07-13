import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './App.css';
import {
  useUserControllerFindOne,
  useUserControllerMe,
} from './api/apiComponents';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      placeholderData: true,
      refetchOnReconnect: true,
      gcTime: 1e4 * 60,
    },
    mutations: {
      retry: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <User />
    </QueryClientProvider>
  );
}

function User() {
  const { data } = useUserControllerFindOne({
    pathParams: { id: '123' },
  });
  const { data: me } = useUserControllerMe({
    queryParams: { relations: { profile: true } },
  });
  return (
    <pre>
      <code>{JSON.stringify(data ?? {}, null, 2)}</code>
      <br />
      <code>{JSON.stringify(me ?? {}, null, 2)}</code>
    </pre>
  );
}

export default App;
