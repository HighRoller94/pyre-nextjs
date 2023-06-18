import Header from "@/components/Header";

export const revalidate = 120;

interface SearchProps {
  searchParams: {
    id: string;
  };
}

export default async function ArtistPage({ searchParams }: SearchProps) {
  return (
    <div className="flex flex-col bg-neutral-900 rounded-lg h-screen w-full overflow overlow-y-auto">
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">Artist</h1>
        </div>
      </Header>
    </div>
  );
}
