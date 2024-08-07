import { CounterClientComponent } from "@/components/ClientComponent";
import { ElectronCheck } from "@/components/ElectronCheck";
import { ServerPokemonComponent } from "@/components/ServerComponent";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-around p-24 flex-row">
      <ElectronCheck />

      <ServerPokemonComponent />

      <CounterClientComponent />
    </main>
  );
}
