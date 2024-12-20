import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from '../src/queryClient'
import ShoppingListApp from "./components/ShoppingListApp";
import './App.css'

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
          <ShoppingListApp />
    </QueryClientProvider>
  );
};

export default App;