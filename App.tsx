import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import PostDetail from './PostDetail';
import Tags from './Tags';
import About from './About';
import Typing from './Typing';
import NotFound from './NotFound';
import ErrorBoundary from './ErrorBoundary';
import { ThemeProvider } from './ThemeContext';
import { Route, Router, Switch } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--background)' }}>
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Typing} />
      <Route path="/home" component={() => <Layout><Home /></Layout>} />
      <Route path="/posts/:slug" component={() => <Layout><PostDetail /></Layout>} />
      <Route path="/tags" component={() => <Layout><Tags /></Layout>} />
      <Route path="/tags/:tag" component={() => <Layout><Tags /></Layout>} />
      <Route path="/about" component={() => <Layout><About /></Layout>} />
      <Route path="/404" component={() => <Layout><NotFound /></Layout>} />
      <Route component={() => <Layout><NotFound /></Layout>} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" switchable>
        <Router hook={useHashLocation}>
          <AppRoutes />
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
