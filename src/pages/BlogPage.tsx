import Footer from "../section/Footer";
import Hero from "../section/Hero-blog";
import PostList from "../section/PostList";
import Join from "../section/Join";

export default function BlogPage() {
  return (
    <main id="blog">
      <Hero />
      <PostList />
      <Join />
      <Footer />
    </main>
  );
}
