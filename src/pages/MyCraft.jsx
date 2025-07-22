import ResumeList from "../components/craft/ResumeList";

export default function MyCraft() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12 relative">
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">My Resumes</h1>
      <ResumeList />
    </section>
  );
}
