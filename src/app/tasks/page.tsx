import WavesSVG from "@/components/waves-svg";
import Tasks from "./_compoents/tasks";

export default function TasksPage() {
  return (
    <main className="space-y-6">
      <section className="space-y-4">
        <h1 className="text-center text-4xl font-bold text-primary">
          Manage Your Tasks
        </h1>
        <WavesSVG />
      </section>

      <Tasks />
    </main>
  );
}
