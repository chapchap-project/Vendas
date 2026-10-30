
import { Link } from "react-router";

type CategoryPageProps = {
  category: string;
};

const productsByCategory: Record<
  string,
  { name: string; price: number; image: string }[]
> = {
  Shoes: [
    {
      name: "Classic Sneakers",
      price: 2500,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
    },
    {
      name: "Casual Loafers",
      price: 2000,
      image:
        "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&auto=format&fit=crop&q=80",
    },
    {
      name: "Flat Sandals",
      price: 1200,
      image:
        "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=600&auto=format&fit=crop&q=80",
    },
    {
      name: "Running Shoes",
      price: 3000,
      image:
        "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&auto=format&fit=crop&q=80",
    },
  ],
  Electronics: [
    {
      name: "Wireless Headphones",
      price: 2500,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    },
    {
      name: "Smart Watch",
      price: 3500,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
    },
    {
      name: "Digital Camera",
      price: 8500,
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80",
    },
    {
      name: "Portable Speaker",
      price: 2000,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop&q=80",
    },
  ],
  Furniture: [
    {
      name: "Modern Chair",
      price: 4500,
      image:
        "https://images.unsplash.com/photo-1503602642458-232111445657?w=600&auto=format&fit=crop&q=80",
    },
    {
      name: "Wooden Table",
      price: 6500,
      image:
        "https://images.unsplash.com/photo-1499933374294-4584851497cc?w=600&auto=format&fit=crop&q=80",
    },
    {
      name: "Comfortable Sofa",
      price: 18000,
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80",
    },
    {
      name: "Bedside Table",
      price: 3500,
      image:
        "https://images.unsplash.com/photo-1499933374294-4584851497cc?w=600&auto=format&fit=crop&q=80",
    },
  ],
  Clothing: [
    {
      name: "Casual T-Shirt",
      price: 800,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop&q=80",
    },
    {
      name: "Denim Jacket",
      price: 2500,
      image:
        "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=600&auto=format&fit=crop&q=80",
    },
    {
      name: "Classic Hoodie",
      price: 1800,
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80",
    },
    {
      name: "Casual Shirt",
      price: 1500,
      image:
        "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&auto=format&fit=crop&q=80",
    },
  ],
};

export default function CategoryPage({
  category,
}: CategoryPageProps) {
  const products = productsByCategory[category] ?? [];

  return (
    <main className="min-h-screen bg-[#eef1eb] px-5 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/"
          className="inline-block font-medium text-[#2f7657] no-underline transition-colors hover:text-[#19352a]"
        >
          ← Back to Vendas
        </Link>

        <div className="mt-8 mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#2f7657]">
            Explore Vendas
          </p>

          <h1 className="mt-2 text-4xl font-black text-[#19352a] sm:text-5xl">
            {category}
          </h1>

          <p className="mt-3 text-[#55675d]">
            Discover products in our {category.toLowerCase()} collection.
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {products.map((product) => (
              <article
                key={product.name}
                className="group overflow-hidden rounded-2xl border border-[#19352a]/10 bg-[#f8f9f5] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="aspect-square overflow-hidden bg-white">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-3 sm:p-5">
                  <h2 className="font-bold text-[#19352a]">
                    {product.name}
                  </h2>

                  <p className="mt-2 text-lg font-extrabold text-[#2f7657]">
                    KSh {product.price.toLocaleString("en-KE")}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-[#55675d]">
            No sample products are available for this category yet.
          </p>
        )}

        <p className="mt-8 text-xs text-[#55675d]">
          Sample products and prices for demonstration only.
        </p>
      </div>
    </main>
  );
}
