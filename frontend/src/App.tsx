import { LayoutProvider } from './providers/layoutprovider';
import { AlertProvider } from './providers/alertprovider';
import { QueryProvider } from './providers/queryprovider';
import routes from './providers/routes';

function App() {
  console.log(routes);

  return (
    <LayoutProvider>
      <AlertProvider>
        <QueryProvider>
           {routes}
        </QueryProvider>
      </AlertProvider>
    </LayoutProvider>
  );
}

export default App;
