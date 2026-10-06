export default function AboutHero() {
  return (
    <div className="relative bg-[url(/fashion1.jpg)] bg-cover h-screen pt-8 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex h-full items-center justify-center">
        <h1 className="text-4xl sm:text-6xl font-bold text-white">
          About <span className="text-primary">Havanix</span>
        </h1>
      </div>
    </div>
  );
}
