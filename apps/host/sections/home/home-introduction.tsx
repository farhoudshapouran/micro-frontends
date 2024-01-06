export default function HomeIntroduction() {
  return (
    <section className="py-8">
      <div className="container flex flex-col items-center text-center gap-4">
        <h2 className="text-2xl font-bold leading-tight tracking-tighter md:text-3xl mb-1">
          What is Micro Frontends?
        </h2>
        <p className="max-w-3xl text-lg text-muted-foreground">
          Micro Frontends is an architectural approach to building web
          applications by breaking them down into smaller, loosely coupled, and
          independently deployable parts. This methodology extends the
          principles of microservices to the frontend, allowing different teams
          to work on separate parts of the user interface independently.
        </p>
      </div>
    </section>
  );
}
