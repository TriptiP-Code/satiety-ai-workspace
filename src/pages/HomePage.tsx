import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

function HomePage() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6">
      <div className="w-full max-w-3xl text-center">
        <h1 className="text-6xl font-bold">
          Satiety
        </h1>

        <p className="mt-4 text-lg text-slate-400">
          Your AI Workspace
        </p>

        <p className="mt-8 text-slate-500">
          How can I help you today?
        </p>

        <div className="mt-10 flex gap-4">
          <Input
            placeholder="Ask anything..."
          />

          <Button>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;