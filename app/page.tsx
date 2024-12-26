import { Header, Footer, Card } from './components';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Card 
          country="Brazil"
          capital="Brasilia"
          region="South America"
          population="216000000"
        />
      </main>
      <Footer />
    </>
  );
}
