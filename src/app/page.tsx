import { CounterClientComponent } from "@/components/ClientComponent";
import { ElectronCheck } from "@/components/ElectronCheck";
import { ServerPokemonComponent } from "@/components/ServerComponent";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ElectronCheck />

      <ServerPokemonComponent />

      <CounterClientComponent />
    </main>
  );
}
